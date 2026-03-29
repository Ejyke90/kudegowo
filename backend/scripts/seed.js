require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Import models
const User = require('../models/User');
const SchoolProfile = require('../models/SchoolProfile');
const Child = require('../models/Child');
const ScheduledPayment = require('../models/ScheduledPayment');
const Quiz = require('../models/Quiz');
const KudiCoin = require('../models/KudiCoin');
const Achievement = require('../models/Achievement');
const Menu = require('../models/Menu');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/kudegowo';

// Demo credentials
const DEMO_PASSWORD = 'Demo123!';

// Demo data
const demoUsers = [
  {
    email: 'ada.okonkwo@demo.com',
    firstName: 'Ada',
    lastName: 'Okonkwo',
    phone: '+2348012345678',
    role: 'parent',
    balance: 500000,
  },
  {
    email: 'chidi.eze@demo.com',
    firstName: 'Chidi',
    lastName: 'Eze',
    phone: '+2348023456789',
    role: 'parent',
    balance: 750000,
  },
  {
    email: 'admin@greensprings.demo.com',
    firstName: 'School',
    lastName: 'Admin',
    phone: '+2348034567890',
    role: 'school_admin',
    balance: 0,
  },
  {
    email: 'tutor@demo.com',
    firstName: 'Demo',
    lastName: 'Tutor',
    phone: '+2348045678901',
    role: 'tutor',
    balance: 0,
  },
];

const demoSchools = [
  {
    name: 'Greensprings School',
    address: '10 Greensprings Road, Lekki',
    city: 'Lagos',
    state: 'Lagos',
    schoolType: 'combined',
    contactEmail: 'info@greensprings.demo.com',
    contactPhone: '+2341234567890',
  },
  {
    name: 'Corona Secondary School',
    address: '25 Corona Drive, Agbara',
    city: 'Lagos',
    state: 'Lagos',
    schoolType: 'secondary',
    contactEmail: 'info@corona.demo.com',
    contactPhone: '+2341234567891',
  },
  {
    name: 'Loyola Jesuit College',
    address: '15 Loyola Road, Gwarinpa',
    city: 'Abuja',
    state: 'FCT',
    schoolType: 'secondary',
    contactEmail: 'info@loyola.demo.com',
    contactPhone: '+2341234567892',
  },
  {
    name: 'Hillcrest School',
    address: '8 Hillcrest Avenue, GRA',
    city: 'Port Harcourt',
    state: 'Rivers',
    schoolType: 'primary',
    contactEmail: 'info@hillcrest.demo.com',
    contactPhone: '+2341234567893',
  },
  {
    name: 'International School Ibadan',
    address: '20 University Road',
    city: 'Ibadan',
    state: 'Oyo',
    schoolType: 'combined',
    contactEmail: 'info@isi.demo.com',
    contactPhone: '+2341234567894',
  },
];

// =============================================================================
// CHRISLAND SCHOOLS DEMO DATA (Beta Tester)
// =============================================================================
const chrislandUsers = [
  {
    email: 'amaka.obi@chrisland.demo.com',
    firstName: 'Amaka',
    lastName: 'Obi',
    phone: '+2348034567890',
    role: 'parent',
    balance: 285000,
  },
  {
    email: 'tunde.adeyemi@chrisland.demo.com',
    firstName: 'Tunde',
    lastName: 'Adeyemi',
    phone: '+2348056789012',
    role: 'parent',
    balance: 420000,
  },
  {
    email: 'funke.williams@chrisland.demo.com',
    firstName: 'Funke',
    lastName: 'Williams',
    phone: '+2348078901234',
    role: 'parent',
    balance: 175000,
  },
  {
    email: 'admin@chrisland.demo.com',
    firstName: 'School',
    lastName: 'Administrator',
    phone: '+2349012345678',
    role: 'school_admin',
    balance: 0,
  },
];

const chrislandSchools = [
  {
    name: 'Chrisland Nursery School VGC',
    address: 'VGC Estate, Lekki-Epe Expressway',
    city: 'Lagos',
    state: 'Lagos',
    schoolType: 'nursery',
    contactEmail: 'nursery.vgc@chrisland.demo.com',
    contactPhone: '+2348172013114',
  },
  {
    name: 'Chrisland Primary School VGC',
    address: 'VGC Estate, Lekki-Epe Expressway',
    city: 'Lagos',
    state: 'Lagos',
    schoolType: 'primary',
    contactEmail: 'primary.vgc@chrisland.demo.com',
    contactPhone: '+2348172013145',
  },
  {
    name: 'Chrisland High School VGC',
    address: 'VGC Estate, Lekki-Epe Expressway',
    city: 'Lagos',
    state: 'Lagos',
    schoolType: 'secondary',
    contactEmail: 'high.vgc@chrisland.demo.com',
    contactPhone: '+2348130101818',
  },
  {
    name: 'Chrisland School Lekki',
    address: 'Lekki Phase 1, Lagos',
    city: 'Lagos',
    state: 'Lagos',
    schoolType: 'combined',
    contactEmail: 'lekki@chrisland.demo.com',
    contactPhone: '+2347088088408',
  },
];

const chrislandChildren = [
  // Parent 1 (Amaka Obi) children
  { firstName: 'Chukwuemeka', lastName: 'Obi', className: 'Primary 5', dateOfBirth: '2014-03-15', parentIndex: 0, schoolIndex: 1 },
  { firstName: 'Adaeze', lastName: 'Obi', className: 'KG 2', dateOfBirth: '2019-07-22', parentIndex: 0, schoolIndex: 0 },
  // Parent 2 (Tunde Adeyemi) children
  { firstName: 'Oluwaseun', lastName: 'Adeyemi', className: 'SS 2', dateOfBirth: '2008-11-08', parentIndex: 1, schoolIndex: 2 },
  { firstName: 'Temiloluwa', lastName: 'Adeyemi', className: 'JSS 3', dateOfBirth: '2011-05-30', parentIndex: 1, schoolIndex: 2 },
  { firstName: 'Ayomide', lastName: 'Adeyemi', className: 'Primary 3', dateOfBirth: '2016-09-12', parentIndex: 1, schoolIndex: 1 },
  // Parent 3 (Funke Williams) children
  { firstName: 'David', lastName: 'Williams', className: 'Primary 4', dateOfBirth: '2015-04-18', parentIndex: 2, schoolIndex: 3 },
  { firstName: 'Grace', lastName: 'Williams', className: 'Primary 1', dateOfBirth: '2018-08-05', parentIndex: 2, schoolIndex: 3 },
  { firstName: 'Emmanuel', lastName: 'Williams', className: 'Crèche', dateOfBirth: '2022-02-14', parentIndex: 2, schoolIndex: 0 },
];

// =============================================================================
// RIVERSIDE SCHOOLS DEMO DATA (Beta Tester)
// =============================================================================
const riversideUsers = [
  {
    email: 'bola.johnson@riverside.demo.com',
    firstName: 'Bola',
    lastName: 'Johnson',
    phone: '+2348023456789',
    role: 'parent',
    balance: 195000,
  },
  {
    email: 'kemi.adekunle@riverside.demo.com',
    firstName: 'Kemi',
    lastName: 'Adekunle',
    phone: '+2348045678901',
    role: 'parent',
    balance: 320000,
  },
  {
    email: 'segun.bakare@riverside.demo.com',
    firstName: 'Segun',
    lastName: 'Bakare',
    phone: '+2348067890123',
    role: 'parent',
    balance: 145000,
  },
  {
    email: 'admin@riverside.demo.com',
    firstName: 'School',
    lastName: 'Administrator',
    phone: '+2347059695895',
    role: 'school_admin',
    balance: 0,
  },
];

const riversideSchools = [
  {
    name: 'Riverside Elementary School',
    address: 'Plot 8, Channels TV Avenue, OPIC Estate, Isheri',
    city: 'Isheri',
    state: 'Ogun',
    schoolType: 'primary',
    contactEmail: 'elementary@riverside.demo.com',
    contactPhone: '+2347059695895',
  },
  {
    name: 'Riverside College',
    address: 'Plot 8, Channels TV Avenue, OPIC Estate, Isheri',
    city: 'Isheri',
    state: 'Ogun',
    schoolType: 'secondary',
    contactEmail: 'college@riverside.demo.com',
    contactPhone: '+2349030009520',
  },
];

const riversideChildren = [
  // Parent 1 (Bola Johnson) children
  { firstName: 'Oluwafemi', lastName: 'Johnson', className: 'Grade 4', dateOfBirth: '2015-06-20', parentIndex: 0, schoolIndex: 0 },
  { firstName: 'Oluwadamilola', lastName: 'Johnson', className: 'Grade 1', dateOfBirth: '2018-09-15', parentIndex: 0, schoolIndex: 0 },
  // Parent 2 (Kemi Adekunle) children
  { firstName: 'Adeola', lastName: 'Adekunle', className: 'SS 1', dateOfBirth: '2009-03-12', parentIndex: 1, schoolIndex: 1 },
  { firstName: 'Adebayo', lastName: 'Adekunle', className: 'JSS 2', dateOfBirth: '2012-07-25', parentIndex: 1, schoolIndex: 1 },
  { firstName: 'Adetola', lastName: 'Adekunle', className: 'Grade 5', dateOfBirth: '2014-11-08', parentIndex: 1, schoolIndex: 0 },
  // Parent 3 (Segun Bakare) children
  { firstName: 'Tolulope', lastName: 'Bakare', className: 'Grade 3', dateOfBirth: '2016-04-30', parentIndex: 2, schoolIndex: 0 },
  { firstName: 'Tobiloba', lastName: 'Bakare', className: 'Reception', dateOfBirth: '2019-12-10', parentIndex: 2, schoolIndex: 0 },
];

const feeCategories = [
  { type: 'tuition', name: 'Tuition Fee', amount: 450000, frequency: 'termly' },
  { type: 'meals', name: 'Meal Fee', amount: 35000, frequency: 'termly' },
  { type: 'transport', name: 'Transport Fee', amount: 50000, frequency: 'termly' },
  { type: 'uniform', name: 'Uniform Fee', amount: 25000, frequency: 'yearly' },
  { type: 'books', name: 'Books & Materials', amount: 15000, frequency: 'termly' },
  { type: 'trips', name: 'Excursion Fee', amount: 20000, frequency: 'termly' },
];

const childrenData = [
  { firstName: 'Chioma', lastName: 'Okonkwo', className: 'Primary 4', dateOfBirth: '2015-03-15' },
  { firstName: 'Emeka', lastName: 'Okonkwo', className: 'Primary 2', dateOfBirth: '2017-07-22' },
  { firstName: 'Adaeze', lastName: 'Okonkwo', className: 'JSS 1', dateOfBirth: '2012-11-08' },
  { firstName: 'Chukwuemeka', lastName: 'Eze', className: 'Primary 5', dateOfBirth: '2014-05-30' },
  { firstName: 'Ngozi', lastName: 'Eze', className: 'Primary 3', dateOfBirth: '2016-09-12' },
  { firstName: 'Obinna', lastName: 'Eze', className: 'SSS 1', dateOfBirth: '2009-01-25' },
  { firstName: 'Amara', lastName: 'Nwosu', className: 'Primary 1', dateOfBirth: '2018-04-18' },
  { firstName: 'Kelechi', lastName: 'Okoro', className: 'Primary 6', dateOfBirth: '2013-08-05' },
  { firstName: 'Uchenna', lastName: 'Agu', className: 'JSS 2', dateOfBirth: '2011-12-20' },
  { firstName: 'Chiamaka', lastName: 'Obi', className: 'Primary 4', dateOfBirth: '2015-06-10' },
  { firstName: 'Tochukwu', lastName: 'Eze', className: 'JSS 3', dateOfBirth: '2010-02-14' },
  { firstName: 'Adanna', lastName: 'Nwachukwu', className: 'Primary 5', dateOfBirth: '2014-10-28' },
  { firstName: 'Ikenna', lastName: 'Okafor', className: 'SSS 2', dateOfBirth: '2008-07-03' },
  { firstName: 'Oluchi', lastName: 'Eze', className: 'Primary 2', dateOfBirth: '2017-03-17' },
  { firstName: 'Chinedu', lastName: 'Nnamdi', className: 'Primary 3', dateOfBirth: '2016-11-22' },
];

async function clearDatabase() {
  console.log('🗑️  Clearing existing demo data...');
  
  // Delete demo users
  await User.deleteMany({ email: { $regex: /demo\.com$/ } });
  
  // Delete demo schools
  await SchoolProfile.deleteMany({ contactEmail: { $regex: /demo\.com$/ } });
  
  // Delete children linked to demo schools
  const demoSchoolIds = await SchoolProfile.find({ contactEmail: { $regex: /demo\.com$/ } }).select('_id');
  await Child.deleteMany({ schoolId: { $in: demoSchoolIds.map(s => s._id) } });
  
  // Delete scheduled payments for demo children
  await ScheduledPayment.deleteMany({});
  
  // Clear Financial Literacy data
  await Quiz.deleteMany({});
  await KudiCoin.deleteMany({});
  await Achievement.deleteMany({});
  
  // Clear Meal Management data
  await Menu.deleteMany({});
  
  console.log('✅ Demo data cleared');
}

async function seedUsers() {
  console.log('👤 Seeding demo users...');
  
  const users = [];
  
  for (const userData of demoUsers) {
    const user = await User.create({
      ...userData,
      password: DEMO_PASSWORD, // Will be hashed by pre-save hook
    });
    users.push(user);
    console.log(`   Created user: ${userData.email}`);
  }
  
  return users;
}

async function seedSchools(users) {
  console.log('🏫 Seeding demo schools...');
  
  const parentUsers = users.filter(u => u.role === 'parent');
  const schools = [];
  
  for (let i = 0; i < demoSchools.length; i++) {
    const schoolData = demoSchools[i];
    const createdBy = parentUsers[i % parentUsers.length]._id;
    
    const school = await SchoolProfile.create({
      ...schoolData,
      createdBy,
    });
    schools.push(school);
    console.log(`   Created school: ${schoolData.name}`);
  }
  
  return schools;
}

async function seedChildren(users, schools) {
  console.log('👧 Seeding demo children...');
  
  const parentUsers = users.filter(u => u.role === 'parent');
  const children = [];
  
  for (let i = 0; i < childrenData.length; i++) {
    const childData = childrenData[i];
    const parent = parentUsers[i % parentUsers.length]._id;
    const schoolProfile = schools[i % schools.length]._id;
    
    const child = await Child.create({
      firstName: childData.firstName,
      lastName: childData.lastName,
      grade: childData.className,
      parent,
      schoolProfile,
      dateOfBirth: new Date(childData.dateOfBirth),
    });
    children.push(child);
    console.log(`   Created child: ${childData.firstName} ${childData.lastName}`);
  }
  
  return children;
}

async function seedTransactions(children, schools) {
  console.log('💳 Seeding demo transactions...');
  
  const statuses = ['completed', 'completed', 'completed', 'pending', 'failed'];
  const feeTypes = ['tuition', 'meals', 'transport', 'books'];
  const amounts = [450000, 35000, 50000, 15000];
  const transactions = [];
  
  // Generate 50+ transactions over the last 6 months
  for (let i = 0; i < 55; i++) {
    const child = children[i % children.length];
    const school = schools[i % schools.length];
    const feeType = feeTypes[i % feeTypes.length];
    const status = statuses[i % statuses.length];
    const amount = amounts[i % amounts.length];
    
    // Random date in last 6 months
    const daysAgo = Math.floor(Math.random() * 180);
    const transactionDate = new Date();
    transactionDate.setDate(transactionDate.getDate() - daysAgo);
    
    const payment = await ScheduledPayment.create({
      parent: child.parent,
      child: child._id,
      schoolProfile: school._id,
      feeType,
      amount,
      status,
      dueDate: transactionDate,
      processedAt: status === 'completed' ? transactionDate : null,
      recurrence: 'once',
    });
    transactions.push(payment);
  }
  
  console.log(`   Created ${transactions.length} transactions`);
  return transactions;
}

async function seedQuizzes() {
  console.log('📚 Seeding quizzes...');
  
  const quizzes = [
    {
      title: 'Saving Basics',
      description: 'Learn the fundamentals of saving money',
      category: 'savings',
      difficulty: 'easy',
      kudiCoinReward: 10,
      passingScore: 70,
      timeLimit: 5,
      questions: [
        {
          question: 'What is the main purpose of saving money?',
          options: ['To spend it all at once', 'To prepare for future needs', 'To show off to friends', 'To make parents happy'],
          correctAnswer: 1,
          explanation: 'Saving helps you prepare for future needs and emergencies.',
        },
        {
          question: 'Where is the safest place to keep your savings?',
          options: ['Under your pillow', 'In a bank account', 'In your pocket', 'Give it to a friend'],
          correctAnswer: 1,
          explanation: 'Banks keep your money safe and can even help it grow with interest.',
        },
        {
          question: 'If you save ₦100 every week, how much will you have after 4 weeks?',
          options: ['₦100', '₦200', '₦400', '₦500'],
          correctAnswer: 2,
          explanation: '₦100 × 4 weeks = ₦400',
        },
      ],
    },
    {
      title: 'Smart Spending',
      description: 'Learn how to spend money wisely',
      category: 'spending',
      difficulty: 'easy',
      kudiCoinReward: 10,
      passingScore: 70,
      timeLimit: 5,
      questions: [
        {
          question: 'What should you do before buying something?',
          options: ['Buy it immediately', 'Think if you really need it', 'Ask friends to buy it for you', 'Wait for someone to give it to you'],
          correctAnswer: 1,
          explanation: 'Always think about whether you need something before spending money.',
        },
        {
          question: 'What is the difference between a need and a want?',
          options: ['They are the same thing', 'Needs are essential, wants are extras', 'Wants are more important', 'Needs are always expensive'],
          correctAnswer: 1,
          explanation: 'Needs are things you must have (food, shelter), wants are nice to have but not essential.',
        },
        {
          question: 'Which is a smarter choice?',
          options: ['Buying the most expensive item', 'Comparing prices before buying', 'Buying everything you see', 'Never buying anything'],
          correctAnswer: 1,
          explanation: 'Comparing prices helps you get the best value for your money.',
        },
      ],
    },
    {
      title: 'Budgeting for Kids',
      description: 'Learn how to create and follow a budget',
      category: 'budgeting',
      difficulty: 'medium',
      kudiCoinReward: 15,
      passingScore: 70,
      timeLimit: 8,
      questions: [
        {
          question: 'What is a budget?',
          options: ['A type of bank', 'A plan for how to use your money', 'A way to borrow money', 'A type of savings account'],
          correctAnswer: 1,
          explanation: 'A budget is a plan that helps you decide how to spend and save your money.',
        },
        {
          question: 'If you have ₦500 and want to save 20%, how much should you save?',
          options: ['₦50', '₦100', '₦200', '₦250'],
          correctAnswer: 1,
          explanation: '20% of ₦500 = ₦500 × 0.20 = ₦100',
        },
        {
          question: 'What should you do if you spend more than your budget allows?',
          options: ['Ignore it', 'Borrow more money', 'Adjust your spending next time', 'Stop using a budget'],
          correctAnswer: 2,
          explanation: 'Learning from overspending helps you make better choices next time.',
        },
        {
          question: 'Which expense should come first in your budget?',
          options: ['Toys and games', 'Snacks', 'Savings', 'Movies'],
          correctAnswer: 2,
          explanation: 'Pay yourself first! Saving should be a priority in any budget.',
        },
      ],
    },
    {
      title: 'Earning Money',
      description: 'Learn different ways to earn money responsibly',
      category: 'earning',
      difficulty: 'medium',
      kudiCoinReward: 15,
      passingScore: 70,
      timeLimit: 8,
      questions: [
        {
          question: 'What is one way kids can earn money at home?',
          options: ['Taking money from parents wallet', 'Doing extra chores', 'Selling school supplies', 'Skipping school'],
          correctAnswer: 1,
          explanation: 'Doing extra chores is a responsible way to earn money.',
        },
        {
          question: 'Why is it important to earn money honestly?',
          options: ['It is not important', 'To build trust and good character', 'To get more money faster', 'Because adults say so'],
          correctAnswer: 1,
          explanation: 'Honesty builds trust and helps you develop good character.',
        },
        {
          question: 'What skill can help you earn more money in the future?',
          options: ['Watching TV', 'Learning new things', 'Sleeping more', 'Playing games all day'],
          correctAnswer: 1,
          explanation: 'Learning new skills increases your ability to earn in the future.',
        },
      ],
    },
    {
      title: 'Introduction to Investing',
      description: 'Basic concepts about growing your money',
      category: 'investing',
      difficulty: 'hard',
      kudiCoinReward: 25,
      passingScore: 70,
      timeLimit: 10,
      questions: [
        {
          question: 'What does investing mean?',
          options: ['Spending all your money', 'Putting money to work to grow over time', 'Hiding money under your bed', 'Giving money away'],
          correctAnswer: 1,
          explanation: 'Investing means using your money in ways that can help it grow over time.',
        },
        {
          question: 'What is interest?',
          options: ['A type of game', 'Money the bank pays you for keeping your money there', 'A fee you pay to save', 'A type of currency'],
          correctAnswer: 1,
          explanation: 'Interest is money earned on your savings or investments.',
        },
        {
          question: 'Why is it good to start saving and investing early?',
          options: ['It is not important when you start', 'Your money has more time to grow', 'You can spend more later', 'Adults will be impressed'],
          correctAnswer: 1,
          explanation: 'Starting early gives your money more time to grow through compound interest.',
        },
        {
          question: 'What is risk in investing?',
          options: ['A game you play', 'The chance that you might lose some money', 'A guaranteed way to make money', 'Something only adults worry about'],
          correctAnswer: 1,
          explanation: 'Risk means there is a chance you could lose some of your investment.',
        },
      ],
    },
  ];

  for (const quizData of quizzes) {
    await Quiz.create(quizData);
  }
  
  console.log(`   Created ${quizzes.length} quizzes`);
  return quizzes;
}

async function seedKudiCoins(children) {
  console.log('🪙 Seeding KudiCoins...');
  
  for (const child of children) {
    const balance = Math.floor(Math.random() * 500) + 50;
    const totalEarned = balance + Math.floor(Math.random() * 200);
    
    await KudiCoin.create({
      childId: child._id,
      balance,
      totalEarned,
      totalSpent: totalEarned - balance,
      transactions: [
        { type: 'bonus', amount: 50, reason: 'Welcome bonus', referenceType: 'behavior' },
        { type: 'earn', amount: 25, reason: 'Quiz: Saving Basics', referenceType: 'quiz' },
        { type: 'earn', amount: 15, reason: 'Quiz: Smart Spending', referenceType: 'quiz' },
      ],
    });
  }
  
  console.log(`   Created KudiCoin accounts for ${children.length} children`);
}

async function seedMenus(schools) {
  console.log('🍽️ Seeding menus...');
  
  const menuItems = {
    breakfast: [
      { name: 'Akara & Pap', description: 'Bean cakes with corn porridge', price: 500, category: 'breakfast' },
      { name: 'Bread & Egg', description: 'Toast bread with fried egg', price: 450, category: 'breakfast' },
      { name: 'Pancakes', description: 'Fluffy pancakes with syrup', price: 600, category: 'breakfast' },
    ],
    lunch: [
      { name: 'Jollof Rice & Chicken', description: 'Nigerian party-style jollof with grilled chicken', price: 1500, category: 'lunch' },
      { name: 'Fried Rice & Fish', description: 'Vegetable fried rice with fried fish', price: 1400, category: 'lunch' },
      { name: 'Spaghetti Bolognese', description: 'Pasta with meat sauce', price: 1200, category: 'lunch' },
      { name: 'Beans & Plantain', description: 'Stewed beans with fried plantain', price: 800, category: 'lunch' },
    ],
    snack: [
      { name: 'Meat Pie', description: 'Savory pastry with meat filling', price: 400, category: 'snack' },
      { name: 'Chin Chin', description: 'Crunchy fried dough snack', price: 200, category: 'snack' },
      { name: 'Puff Puff', description: 'Sweet fried dough balls', price: 250, category: 'snack' },
    ],
    drink: [
      { name: 'Zobo', description: 'Hibiscus drink', price: 200, category: 'drink' },
      { name: 'Chapman', description: 'Nigerian cocktail mocktail', price: 350, category: 'drink' },
      { name: 'Fresh Orange Juice', description: 'Freshly squeezed orange juice', price: 400, category: 'drink' },
    ],
  };

  const today = new Date();
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - today.getDay());
  weekStart.setHours(0, 0, 0, 0);
  
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekEnd.getDate() + 6);
  weekEnd.setHours(23, 59, 59, 999);

  for (const school of schools) {
    const days = [];
    
    for (let day = 1; day <= 5; day++) { // Monday to Friday
      const items = [
        ...menuItems.breakfast.slice(0, 2),
        ...menuItems.lunch.slice(0, 3),
        ...menuItems.snack.slice(0, 2),
        ...menuItems.drink.slice(0, 2),
      ].map(item => ({ ...item, available: true, allergens: [] }));
      
      days.push({ dayOfWeek: day, items });
    }
    
    await Menu.create({
      schoolId: school._id,
      weekStart,
      weekEnd,
      days,
      isActive: true,
    });
  }
  
  console.log(`   Created menus for ${schools.length} schools`);
}

async function seedScheduledPayments(children, schools) {
  console.log('📅 Seeding scheduled payments...');
  
  const payments = [];
  const today = new Date();
  
  // Create upcoming scheduled payments
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    const school = schools.find(s => s._id.toString() === child.schoolId.toString());
    
    // Tuition due in 2 weeks
    const tuitionDue = new Date(today);
    tuitionDue.setDate(tuitionDue.getDate() + 14);
    
    const tuitionFee = school.fees.find(f => f.type === 'tuition');
    if (tuitionFee) {
      const payment = await ScheduledPayment.create({
        parentId: child.parentId,
        childId: child._id,
        schoolId: school._id,
        feeType: 'tuition',
        amount: tuitionFee.amount,
        status: 'pending',
        dueDate: tuitionDue,
        recurrence: 'termly',
      });
      payments.push(payment);
    }
    
    // Meals due in 3 days (some overdue)
    const mealsDue = new Date(today);
    mealsDue.setDate(mealsDue.getDate() + (i % 3 === 0 ? -2 : 3)); // Some overdue
    
    const mealsFee = school.fees.find(f => f.type === 'meals');
    if (mealsFee) {
      const payment = await ScheduledPayment.create({
        parentId: child.parentId,
        childId: child._id,
        schoolId: school._id,
        feeType: 'meals',
        amount: mealsFee.amount,
        status: 'pending',
        dueDate: mealsDue,
        recurrence: 'termly',
      });
      payments.push(payment);
    }
  }
  
  console.log(`   Created ${payments.length} scheduled payments`);
  return payments;
}

async function seedChrislandData() {
  console.log('\n🏫 Seeding Chrisland Schools data (Beta Tester)...');
  
  // Seed Chrisland users
  const users = [];
  for (const userData of chrislandUsers) {
    const user = await User.create({
      ...userData,
      password: DEMO_PASSWORD,
    });
    users.push(user);
    console.log(`   Created Chrisland user: ${userData.email}`);
  }
  
  // Seed Chrisland schools
  const adminUser = users.find(u => u.role === 'school_admin');
  const schools = [];
  for (const schoolData of chrislandSchools) {
    const school = await SchoolProfile.create({
      ...schoolData,
      createdBy: adminUser._id,
    });
    schools.push(school);
    console.log(`   Created Chrisland school: ${schoolData.name}`);
  }
  
  // Seed Chrisland children
  const parentUsers = users.filter(u => u.role === 'parent');
  for (const childData of chrislandChildren) {
    const parent = parentUsers[childData.parentIndex]._id;
    const schoolProfile = schools[childData.schoolIndex]._id;
    
    await Child.create({
      firstName: childData.firstName,
      lastName: childData.lastName,
      grade: childData.className,
      parent,
      schoolProfile,
      dateOfBirth: new Date(childData.dateOfBirth),
    });
    console.log(`   Created Chrisland child: ${childData.firstName} ${childData.lastName}`);
  }
  
  return { users, schools };
}

async function seedRiversideData() {
  console.log('\n🏫 Seeding Riverside Schools data (Beta Tester)...');
  
  // Seed Riverside users
  const users = [];
  for (const userData of riversideUsers) {
    const user = await User.create({
      ...userData,
      password: DEMO_PASSWORD,
    });
    users.push(user);
    console.log(`   Created Riverside user: ${userData.email}`);
  }
  
  // Seed Riverside schools
  const adminUser = users.find(u => u.role === 'school_admin');
  const schools = [];
  for (const schoolData of riversideSchools) {
    const school = await SchoolProfile.create({
      ...schoolData,
      createdBy: adminUser._id,
    });
    schools.push(school);
    console.log(`   Created Riverside school: ${schoolData.name}`);
  }
  
  // Seed Riverside children
  const parentUsers = users.filter(u => u.role === 'parent');
  for (const childData of riversideChildren) {
    const parent = parentUsers[childData.parentIndex]._id;
    const schoolProfile = schools[childData.schoolIndex]._id;
    
    await Child.create({
      firstName: childData.firstName,
      lastName: childData.lastName,
      grade: childData.className,
      parent,
      schoolProfile,
      dateOfBirth: new Date(childData.dateOfBirth),
    });
    console.log(`   Created Riverside child: ${childData.firstName} ${childData.lastName}`);
  }
  
  return { users, schools };
}

async function seed() {
  try {
    console.log('🌱 Starting KudEgOwo seed process...\n');
    console.log(`📦 Connecting to MongoDB: ${MONGODB_URI}\n`);
    
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');
    
    // Clear existing demo data
    await clearDatabase();
    
    // Seed default demo data
    const users = await seedUsers();
    const schools = await seedSchools(users);
    const children = await seedChildren(users, schools);
    await seedQuizzes();
    await seedKudiCoins(children);
    await seedMenus(schools);
    
    // Seed Beta Tester schools
    const chrislandData = await seedChrislandData();
    const riversideData = await seedRiversideData();
    
    // Seed menus for beta tester schools
    await seedMenus(chrislandData.schools);
    await seedMenus(riversideData.schools);
    
    console.log('\n🎉 Seed completed successfully!\n');
    console.log('═══════════════════════════════════════════════════════════════');
    console.log('                        DEMO CREDENTIALS                        ');
    console.log('═══════════════════════════════════════════════════════════════');
    console.log('\n📚 DEFAULT DEMO (Greensprings):');
    console.log('───────────────────────────────────────────────────────────────');
    console.log('| Parent 1     | ada.okonkwo@demo.com              | Demo123! |');
    console.log('| Parent 2     | chidi.eze@demo.com                | Demo123! |');
    console.log('| School Admin | admin@greensprings.demo.com       | Demo123! |');
    console.log('| Tutor        | tutor@demo.com                    | Demo123! |');
    console.log('\n🏫 CHRISLAND SCHOOLS (Beta Tester):');
    console.log('───────────────────────────────────────────────────────────────');
    console.log('| Parent 1     | amaka.obi@chrisland.demo.com      | Demo123! |');
    console.log('| Parent 2     | tunde.adeyemi@chrisland.demo.com  | Demo123! |');
    console.log('| Parent 3     | funke.williams@chrisland.demo.com | Demo123! |');
    console.log('| School Admin | admin@chrisland.demo.com          | Demo123! |');
    console.log('\n🏫 RIVERSIDE SCHOOLS (Beta Tester):');
    console.log('───────────────────────────────────────────────────────────────');
    console.log('| Parent 1     | bola.johnson@riverside.demo.com   | Demo123! |');
    console.log('| Parent 2     | kemi.adekunle@riverside.demo.com  | Demo123! |');
    console.log('| Parent 3     | segun.bakare@riverside.demo.com   | Demo123! |');
    console.log('| School Admin | admin@riverside.demo.com          | Demo123! |');
    console.log('═══════════════════════════════════════════════════════════════\n');
    
  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('📦 Disconnected from MongoDB');
  }
}

seed();
