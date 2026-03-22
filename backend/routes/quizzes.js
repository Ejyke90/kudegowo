const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');
const QuizAttempt = require('../models/QuizAttempt');
const KudiCoin = require('../models/KudiCoin');
const Achievement = require('../models/Achievement');
const Child = require('../models/Child');
const { authenticateToken } = require('../middleware/auth');
const notificationService = require('../services/notifications');

// Get all active quizzes
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { category, difficulty } = req.query;
    
    const query = { isActive: true };
    if (category) query.category = category;
    if (difficulty) query.difficulty = difficulty;
    
    const quizzes = await Quiz.find(query)
      .select('-questions.correctAnswer')
      .sort({ createdAt: -1 });
    
    res.json({ status: true, data: quizzes });
  } catch (error) {
    console.error('Get quizzes error:', error);
    res.status(500).json({ status: false, message: error.message });
  }
});

// Get quiz by ID (for taking)
router.get('/:quizId', authenticateToken, async (req, res) => {
  try {
    const { quizId } = req.params;
    
    const quiz = await Quiz.findById(quizId);
    
    if (!quiz || !quiz.isActive) {
      return res.status(404).json({
        status: false,
        message: 'Quiz not found',
      });
    }
    
    // Remove correct answers for client
    const quizData = quiz.toObject();
    quizData.questions = quizData.questions.map(q => ({
      question: q.question,
      options: q.options,
    }));
    
    res.json({ status: true, data: quizData });
  } catch (error) {
    console.error('Get quiz error:', error);
    res.status(500).json({ status: false, message: error.message });
  }
});

// Submit quiz answers
router.post('/:quizId/submit', authenticateToken, async (req, res) => {
  try {
    const { quizId } = req.params;
    const { childId, answers, timeSpent } = req.body;
    
    if (!childId || !answers || !Array.isArray(answers)) {
      return res.status(400).json({
        status: false,
        message: 'Child ID and answers are required',
      });
    }
    
    const quiz = await Quiz.findById(quizId);
    
    if (!quiz || !quiz.isActive) {
      return res.status(404).json({
        status: false,
        message: 'Quiz not found',
      });
    }
    
    // Grade the quiz
    let correctCount = 0;
    const gradedAnswers = answers.map((answer, index) => {
      const question = quiz.questions[index];
      const isCorrect = question && answer === question.correctAnswer;
      if (isCorrect) correctCount++;
      
      return {
        questionIndex: index,
        selectedAnswer: answer,
        isCorrect,
        timeSpent: 0,
      };
    });
    
    const score = Math.round((correctCount / quiz.questions.length) * 100);
    const passed = score >= quiz.passingScore;
    
    // Calculate KudiCoins earned
    let kudiCoinsEarned = 0;
    if (passed) {
      kudiCoinsEarned = quiz.kudiCoinReward;
      // Bonus for perfect score
      if (score === 100) {
        kudiCoinsEarned += Math.round(quiz.kudiCoinReward * 0.5);
      }
    } else {
      // Participation reward
      kudiCoinsEarned = Math.round(quiz.kudiCoinReward * 0.2);
    }
    
    // Create attempt record
    const attempt = await QuizAttempt.create({
      childId,
      quizId,
      answers: gradedAnswers,
      score,
      correctAnswers: correctCount,
      totalQuestions: quiz.questions.length,
      passed,
      kudiCoinsEarned,
      timeSpent: timeSpent || 0,
    });
    
    // Award KudiCoins
    let kudiCoin = await KudiCoin.findOne({ childId });
    if (!kudiCoin) {
      kudiCoin = new KudiCoin({ childId, balance: 0 });
    }
    
    await kudiCoin.addCoins(
      kudiCoinsEarned,
      `Quiz: ${quiz.title} (${score}%)`,
      'quiz',
      attempt._id
    );
    
    // Check for quiz master achievement
    const attemptCount = await QuizAttempt.countDocuments({
      childId,
      passed: true,
      score: { $gte: 80 },
    });
    
    if (attemptCount >= 10) {
      const existingAchievement = await Achievement.findOne({
        childId,
        type: 'quiz_master',
      });
      
      if (!existingAchievement) {
        const def = Achievement.DEFINITIONS.quiz_master;
        await Achievement.create({
          childId,
          type: 'quiz_master',
          name: def.name,
          description: def.description,
          badge: def.badge,
          kudiCoinsAwarded: def.kudiCoins,
        });
        
        await kudiCoin.addCoins(def.kudiCoins, 'Achievement: Quiz Master', 'behavior');
      }
    }
    
    // Send notification to parent
    const child = await Child.findById(childId).populate('parentId');
    if (child && child.parentId) {
      await notificationService.sendFromTemplate(
        'quizCompleted',
        {
          childName: `${child.firstName} ${child.lastName}`,
          quizTitle: quiz.title,
          score,
          kudiCoinsEarned,
        },
        ['push'],
        child.parentId
      );
    }
    
    res.json({
      status: true,
      message: passed ? 'Quiz passed!' : 'Quiz completed',
      data: {
        score,
        correctAnswers: correctCount,
        totalQuestions: quiz.questions.length,
        passed,
        kudiCoinsEarned,
        answers: gradedAnswers.map((a, i) => ({
          ...a,
          correctAnswer: quiz.questions[i].correctAnswer,
          explanation: quiz.questions[i].explanation,
        })),
      },
    });
  } catch (error) {
    console.error('Submit quiz error:', error);
    res.status(500).json({ status: false, message: error.message });
  }
});

// Get quiz attempts for a child
router.get('/child/:childId/attempts', authenticateToken, async (req, res) => {
  try {
    const { childId } = req.params;
    const { limit = 20 } = req.query;
    
    const attempts = await QuizAttempt.find({ childId })
      .populate('quizId', 'title category difficulty')
      .sort({ completedAt: -1 })
      .limit(parseInt(limit));
    
    res.json({ status: true, data: attempts });
  } catch (error) {
    console.error('Get quiz attempts error:', error);
    res.status(500).json({ status: false, message: error.message });
  }
});

// Get quiz statistics for a child
router.get('/child/:childId/stats', authenticateToken, async (req, res) => {
  try {
    const { childId } = req.params;
    
    const stats = await QuizAttempt.aggregate([
      { $match: { childId: require('mongoose').Types.ObjectId(childId) } },
      {
        $group: {
          _id: null,
          totalAttempts: { $sum: 1 },
          totalPassed: { $sum: { $cond: ['$passed', 1, 0] } },
          averageScore: { $avg: '$score' },
          totalKudiCoins: { $sum: '$kudiCoinsEarned' },
        },
      },
    ]);
    
    const result = stats[0] || {
      totalAttempts: 0,
      totalPassed: 0,
      averageScore: 0,
      totalKudiCoins: 0,
    };
    
    result.passRate = result.totalAttempts > 0
      ? (result.totalPassed / result.totalAttempts) * 100
      : 0;
    
    res.json({ status: true, data: result });
  } catch (error) {
    console.error('Get quiz stats error:', error);
    res.status(500).json({ status: false, message: error.message });
  }
});

module.exports = router;
