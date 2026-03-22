'use client';

import { useState, useEffect } from 'react';
import { 
  Coins, 
  Target, 
  Trophy, 
  BookOpen,
  TrendingUp,
  Star,
  ChevronRight,
  Plus,
  RefreshCw
} from 'lucide-react';

interface Child {
  _id: string;
  firstName: string;
  lastName: string;
}

interface KudiCoinData {
  balance: number;
  totalEarned: number;
  totalSpent: number;
}

interface SavingsGoal {
  _id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  progressPercentage: number;
  status: string;
}

interface Achievement {
  _id: string;
  type: string;
  name: string;
  description: string;
  badge: string;
  earnedAt: string;
}

interface Quiz {
  _id: string;
  title: string;
  category: string;
  difficulty: string;
  kudiCoinReward: number;
  questionCount: number;
}

export default function FinancialLiteracyPage() {
  const [children, setChildren] = useState<Child[]>([]);
  const [selectedChild, setSelectedChild] = useState<string | null>(null);
  const [kudiCoins, setKudiCoins] = useState<KudiCoinData | null>(null);
  const [savingsGoals, setSavingsGoals] = useState<SavingsGoal[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'savings' | 'quizzes' | 'achievements'>('overview');

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    fetchChildren();
  }, []);

  useEffect(() => {
    if (selectedChild) {
      fetchChildData(selectedChild);
    }
  }, [selectedChild]);

  const fetchChildren = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/children`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      
      if (data.status && data.data) {
        setChildren(data.data);
        if (data.data.length > 0) {
          setSelectedChild(data.data[0]._id);
        }
      }
    } catch (error) {
      console.error('Fetch children error:', error);
    }
  };

  const fetchChildData = async (childId: string) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      
      // Fetch all data with timeout and error handling
      const fetchWithTimeout = async (url: string, timeout = 3000) => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);
        try {
          const response = await fetch(url, {
            headers: { Authorization: `Bearer ${token}` },
            signal: controller.signal,
          });
          clearTimeout(timeoutId);
          return response.ok ? await response.json() : null;
        } catch (error) {
          clearTimeout(timeoutId);
          return null;
        }
      };

      // Fetch all in parallel with fallbacks
      const [kudiData, goalsData, achieveData, quizData] = await Promise.all([
        fetchWithTimeout(`${API_URL}/kudi-coins/child/${childId}`),
        fetchWithTimeout(`${API_URL}/savings-goals/child/${childId}`),
        fetchWithTimeout(`${API_URL}/achievements/child/${childId}/recent?limit=5`),
        fetchWithTimeout(`${API_URL}/quizzes`),
      ]);

      if (kudiData?.status) setKudiCoins(kudiData.data);
      if (goalsData?.status) setSavingsGoals(goalsData.data);
      if (achieveData?.status) setAchievements(achieveData.data);
      if (quizData?.status) setQuizzes(quizData.data);
    } catch (error) {
      console.error('Fetch child data error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const selectedChildData = children.find(c => c._id === selectedChild);

  if (isLoading && !kudiCoins) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="w-8 h-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Financial Literacy</h1>
          <p className="text-gray-600">Learn, save, and earn KudiCoins</p>
        </div>
      </div>

      {/* Child Selector */}
      {children.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {children.map(child => (
            <button
              key={child._id}
              onClick={() => setSelectedChild(child._id)}
              className={`px-4 py-2 rounded-full whitespace-nowrap ${
                selectedChild === child._id
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {child.firstName} {child.lastName}
            </button>
          ))}
        </div>
      )}

      {/* KudiCoin Balance Card */}
      {kudiCoins && (
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-amber-100 text-sm">KudiCoin Balance</p>
              <div className="flex items-center gap-2 mt-1">
                <Coins className="w-8 h-8" />
                <span className="text-4xl font-bold">{kudiCoins.balance.toLocaleString()}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-amber-100">
                <div>Earned: {kudiCoins.totalEarned.toLocaleString()}</div>
                <div>Spent: {kudiCoins.totalSpent.toLocaleString()}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 border-b">
        {(['overview', 'savings', 'quizzes', 'achievements'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-medium capitalize ${
              activeTab === tab
                ? 'text-emerald-600 border-b-2 border-emerald-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Savings Goals Summary */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-emerald-600" />
                <h3 className="font-semibold">Savings Goals</h3>
              </div>
              <span className="text-sm text-gray-500">{savingsGoals.length} active</span>
            </div>
            
            {savingsGoals.slice(0, 2).map(goal => (
              <div key={goal._id} className="mb-3">
                <div className="flex justify-between text-sm mb-1">
                  <span>{goal.name}</span>
                  <span className="text-gray-500">{Math.round(goal.progressPercentage)}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 transition-all"
                    style={{ width: `${goal.progressPercentage}%` }}
                  />
                </div>
              </div>
            ))}
            
            <button
              onClick={() => setActiveTab('savings')}
              className="flex items-center gap-1 text-sm text-emerald-600 hover:text-emerald-700 mt-2"
            >
              View all <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Recent Achievements */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="w-5 h-5 text-amber-500" />
              <h3 className="font-semibold">Recent Achievements</h3>
            </div>
            
            {achievements.length > 0 ? (
              <div className="space-y-3">
                {achievements.slice(0, 3).map(achievement => (
                  <div key={achievement._id} className="flex items-center gap-3">
                    <span className="text-2xl">{achievement.badge}</span>
                    <div>
                      <div className="font-medium text-sm">{achievement.name}</div>
                      <div className="text-xs text-gray-500">{achievement.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No achievements yet. Keep learning!</p>
            )}
            
            <button
              onClick={() => setActiveTab('achievements')}
              className="flex items-center gap-1 text-sm text-emerald-600 hover:text-emerald-700 mt-3"
            >
              View all <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Available Quizzes */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-5 h-5 text-blue-500" />
              <h3 className="font-semibold">Learn & Earn</h3>
            </div>
            
            {quizzes.slice(0, 2).map(quiz => (
              <div key={quiz._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-2">
                <div>
                  <div className="font-medium text-sm">{quiz.title}</div>
                  <div className="text-xs text-gray-500">{quiz.category} • {quiz.difficulty}</div>
                </div>
                <div className="flex items-center gap-1 text-amber-600">
                  <Coins className="w-4 h-4" />
                  <span className="text-sm font-medium">+{quiz.kudiCoinReward}</span>
                </div>
              </div>
            ))}
            
            <button
              onClick={() => setActiveTab('quizzes')}
              className="flex items-center gap-1 text-sm text-emerald-600 hover:text-emerald-700 mt-2"
            >
              Take a quiz <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {activeTab === 'savings' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">Savings Goals</h3>
            <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
              <Plus className="w-4 h-4" />
              New Goal
            </button>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            {savingsGoals.map(goal => (
              <div key={goal._id} className="bg-white rounded-xl shadow-sm border p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold">{goal.name}</h4>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    goal.status === 'completed' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {goal.status}
                  </span>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span>₦{goal.currentAmount.toLocaleString()}</span>
                    <span className="text-gray-500">₦{goal.targetAmount.toLocaleString()}</span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 transition-all"
                      style={{ width: `${goal.progressPercentage}%` }}
                    />
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button className="flex-1 px-3 py-2 bg-emerald-600 text-white rounded-lg text-sm hover:bg-emerald-700">
                    Add Money
                  </button>
                  <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                    Details
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {savingsGoals.length === 0 && (
            <div className="bg-white rounded-xl shadow-sm border p-12 text-center">
              <Target className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Savings Goals Yet</h3>
              <p className="text-gray-600 mb-4">
                Create a savings goal to start teaching financial responsibility
              </p>
              <button className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
                <Plus className="w-4 h-4" />
                Create First Goal
              </button>
            </div>
          )}
        </div>
      )}

      {activeTab === 'quizzes' && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quizzes.map(quiz => (
            <div key={quiz._id} className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  quiz.difficulty === 'easy' 
                    ? 'bg-green-100 text-green-800'
                    : quiz.difficulty === 'medium'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {quiz.difficulty}
                </span>
                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                  {quiz.category}
                </span>
              </div>
              
              <h4 className="font-semibold mb-2">{quiz.title}</h4>
              
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span>{quiz.questionCount} questions</span>
                <div className="flex items-center gap-1 text-amber-600">
                  <Coins className="w-4 h-4" />
                  <span className="font-medium">+{quiz.kudiCoinReward}</span>
                </div>
              </div>
              
              <button className="w-full px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
                Start Quiz
              </button>
            </div>
          ))}
          
          {quizzes.length === 0 && (
            <div className="col-span-full bg-white rounded-xl shadow-sm border p-12 text-center">
              <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Quizzes Available</h3>
              <p className="text-gray-600">Check back later for new financial literacy quizzes</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'achievements' && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map(achievement => (
            <div key={achievement._id} className="bg-white rounded-xl shadow-sm border p-6 flex items-center gap-4">
              <div className="text-4xl">{achievement.badge}</div>
              <div>
                <h4 className="font-semibold">{achievement.name}</h4>
                <p className="text-sm text-gray-500">{achievement.description}</p>
                <p className="text-xs text-gray-400 mt-1">
                  Earned {new Date(achievement.earnedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
          
          {achievements.length === 0 && (
            <div className="col-span-full bg-white rounded-xl shadow-sm border p-12 text-center">
              <Trophy className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Achievements Yet</h3>
              <p className="text-gray-600">Complete quizzes and savings goals to earn achievements</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
