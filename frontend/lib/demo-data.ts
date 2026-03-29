// Demo mock data for Kudegowo
// This provides realistic data for demo mode without requiring backend

import { FeeType, PaymentStatus, SchoolType, RecurrenceFrequency } from './api';

// --- Demo Users ---
export const DEMO_USERS = {
  ada: {
    _id: 'demo-user-ada',
    email: 'ada.okonkwo@demo.com',
    firstName: 'Ada',
    lastName: 'Okonkwo',
    role: 'parent' as const,
    phone: '+234 801 234 5678',
    balance: 125000,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-03-20T14:30:00Z',
  },
  chidi: {
    _id: 'demo-user-chidi',
    email: 'chidi.eze@demo.com',
    firstName: 'Chidi',
    lastName: 'Eze',
    role: 'parent' as const,
    phone: '+234 802 345 6789',
    balance: 85000,
    createdAt: '2024-02-01T09:00:00Z',
    updatedAt: '2024-03-18T11:00:00Z',
  },
  admin: {
    _id: 'demo-user-admin',
    email: 'admin@greensprings.edu.ng',
    firstName: 'School',
    lastName: 'Administrator',
    role: 'admin' as const,
    phone: '+234 803 456 7890',
    balance: 0,
    createdAt: '2024-01-01T08:00:00Z',
    updatedAt: '2024-03-22T09:00:00Z',
  },
};

// --- Demo Schools ---
export const DEMO_SCHOOLS = [
  {
    _id: 'demo-school-1',
    name: 'Greensprings School',
    address: '15 Admiralty Way, Lekki Phase 1',
    city: 'Lagos',
    state: 'Lagos',
    schoolType: SchoolType.COMBINED,
    contactEmail: 'info@greensprings.edu.ng',
    contactPhone: '+234 1 234 5678',
    createdBy: 'demo-user-ada',
    isActive: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-03-20T14:30:00Z',
  },
  {
    _id: 'demo-school-2',
    name: 'Corona Secondary School',
    address: '10 Gbagada Express',
    city: 'Lagos',
    state: 'Lagos',
    schoolType: SchoolType.SECONDARY,
    contactEmail: 'info@corona.edu.ng',
    contactPhone: '+234 1 345 6789',
    createdBy: 'demo-user-ada',
    isActive: true,
    createdAt: '2024-02-01T09:00:00Z',
    updatedAt: '2024-03-18T11:00:00Z',
  },
  {
    _id: 'demo-school-admin',
    name: 'Greensprings School',
    address: '15 Admiralty Way, Lekki Phase 1',
    city: 'Lagos',
    state: 'Lagos',
    schoolType: SchoolType.COMBINED,
    contactEmail: 'admin@greensprings.edu.ng',
    contactPhone: '+234 1 234 5678',
    createdBy: 'demo-user-admin',
    isActive: true,
    createdAt: '2024-01-01T08:00:00Z',
    updatedAt: '2024-03-22T09:00:00Z',
  },
];

// --- Demo Children ---
export const DEMO_CHILDREN = [
  {
    _id: 'demo-child-1',
    firstName: 'Chisom',
    lastName: 'Okonkwo',
    parent: 'demo-user-ada',
    schoolProfile: DEMO_SCHOOLS[0],
    schoolId: 'demo-school-1',
    schoolName: 'Greensprings School',
    className: 'Primary 4',
    grade: 'Primary 4',
    studentId: 'GS-2024-001',
    dateOfBirth: '2015-05-12',
    isActive: true,
    createdAt: '2024-01-20T10:00:00Z',
    updatedAt: '2024-03-20T14:30:00Z',
  },
  {
    _id: 'demo-child-2',
    firstName: 'Emeka',
    lastName: 'Okonkwo',
    parent: 'demo-user-ada',
    schoolProfile: DEMO_SCHOOLS[0],
    schoolId: 'demo-school-1',
    schoolName: 'Greensprings School',
    className: 'Primary 2',
    dateOfBirth: '2017-08-23',
    grade: 'Primary 2',
    studentId: 'GS-2024-002',
    isActive: true,
    createdAt: '2024-01-20T10:00:00Z',
    updatedAt: '2024-03-20T14:30:00Z',
  },
  {
    _id: 'demo-child-3',
    firstName: 'Adaeze',
    lastName: 'Eze',
    parent: 'demo-user-chidi',
    schoolProfile: DEMO_SCHOOLS[1],
    schoolId: 'demo-school-2',
    schoolName: 'Corona Secondary School',
    className: 'JSS 2',
    grade: 'JSS 2',
    studentId: 'CS-2024-015',
    dateOfBirth: '2012-03-15',
    isActive: true,
    createdAt: '2024-02-05T09:00:00Z',
    updatedAt: '2024-03-18T11:00:00Z',
  },
  // Students for admin's school
  {
    _id: 'demo-child-admin-1',
    firstName: 'Hope',
    lastName: 'Sola',
    parent: 'demo-user-ada', // Assigned to Ada for demo purposes
    schoolProfile: DEMO_SCHOOLS[2],
    schoolId: 'demo-school-admin',
    schoolName: 'Greensprings School',
    className: 'Primary 4',
    grade: 'Primary 4',
    studentId: 'GS-2024-001',
    dateOfBirth: '2015-05-12',
    isActive: true,
    createdAt: '2024-01-20T10:00:00Z',
    updatedAt: '2024-03-20T14:30:00Z',
  },
  {
    _id: 'demo-child-admin-2',
    firstName: 'David',
    lastName: 'Okafor',
    parent: 'demo-user-chidi', // Assigned to Chidi for demo purposes
    schoolProfile: DEMO_SCHOOLS[2],
    schoolId: 'demo-school-admin',
    schoolName: 'Greensprings School',
    className: 'Primary 2',
    grade: 'Primary 2',
    studentId: 'GS-2024-002',
    dateOfBirth: '2017-08-23',
    isActive: true,
    createdAt: '2024-01-20T10:00:00Z',
    updatedAt: '2024-03-20T14:30:00Z',
  },
];

// --- Demo Scheduled Payments ---
const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);
const nextWeek = new Date(today);
nextWeek.setDate(nextWeek.getDate() + 7);
const lastWeek = new Date(today);
lastWeek.setDate(lastWeek.getDate() - 7);

export const DEMO_SCHEDULED_PAYMENTS = [
  {
    _id: 'demo-payment-1',
    parent: 'demo-user-ada',
    child: DEMO_CHILDREN[0],
    schoolProfile: DEMO_SCHOOLS[0],
    feeType: FeeType.TUITION,
    description: 'Third Term Tuition Fee',
    amount: 450000,
    currency: 'NGN',
    scheduledDate: lastWeek.toISOString(),
    dueDate: lastWeek.toISOString(),
    isRecurring: true,
    recurrenceRule: {
      frequency: RecurrenceFrequency.TERMLY,
      startDate: '2024-01-15T00:00:00Z',
    },
    status: PaymentStatus.PENDING,
    retryCount: 0,
    isAutoGenerated: false,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-03-20T14:30:00Z',
  },
  {
    _id: 'demo-payment-2',
    parent: 'demo-user-ada',
    child: DEMO_CHILDREN[0],
    schoolProfile: DEMO_SCHOOLS[0],
    feeType: FeeType.MEALS,
    description: 'March Meal Plan',
    amount: 35000,
    currency: 'NGN',
    scheduledDate: tomorrow.toISOString(),
    dueDate: tomorrow.toISOString(),
    isRecurring: true,
    recurrenceRule: {
      frequency: RecurrenceFrequency.MONTHLY,
      startDate: '2024-01-01T00:00:00Z',
    },
    status: PaymentStatus.PENDING,
    retryCount: 0,
    isAutoGenerated: false,
    createdAt: '2024-03-01T10:00:00Z',
    updatedAt: '2024-03-20T14:30:00Z',
  },
  {
    _id: 'demo-payment-3',
    parent: 'demo-user-ada',
    child: DEMO_CHILDREN[1],
    schoolProfile: DEMO_SCHOOLS[0],
    feeType: FeeType.TRANSPORT,
    description: 'School Bus - March',
    amount: 25000,
    currency: 'NGN',
    scheduledDate: nextWeek.toISOString(),
    dueDate: nextWeek.toISOString(),
    isRecurring: true,
    recurrenceRule: {
      frequency: RecurrenceFrequency.MONTHLY,
      startDate: '2024-01-01T00:00:00Z',
    },
    status: PaymentStatus.PENDING,
    retryCount: 0,
    isAutoGenerated: false,
    createdAt: '2024-03-01T10:00:00Z',
    updatedAt: '2024-03-20T14:30:00Z',
  },
  {
    _id: 'demo-payment-4',
    parent: 'demo-user-ada',
    child: DEMO_CHILDREN[0],
    schoolProfile: DEMO_SCHOOLS[0],
    feeType: FeeType.BOOKS,
    description: 'Third Term Books',
    amount: 15000,
    currency: 'NGN',
    scheduledDate: '2024-03-01T00:00:00Z',
    dueDate: '2024-03-01T00:00:00Z',
    isRecurring: false,
    status: PaymentStatus.COMPLETED,
    retryCount: 0,
    isAutoGenerated: false,
    createdAt: '2024-02-15T10:00:00Z',
    updatedAt: '2024-03-01T09:00:00Z',
  },
];

export const DEMO_PAYMENT_SUMMARY = {
  pendingCount: 3,
  pendingAmount: 510000,
  failedCount: 0,
  completedCount: 5,
};

// --- Demo Passphrases ---
const generatePassphrase = () => {
  const words = ['LION', 'TIGER', 'EAGLE', 'HAWK', 'BEAR', 'WOLF', 'STAR', 'MOON', 'SUN', 'RAIN'];
  const numbers = ['123', '456', '789', '321', '654', '987'];
  return `${words[Math.floor(Math.random() * words.length)]}-${numbers[Math.floor(Math.random() * numbers.length)]}`;
};

const todayStart = new Date();
todayStart.setHours(7, 0, 0, 0);
const todayEnd = new Date();
todayEnd.setHours(18, 0, 0, 0);

export const DEMO_PASSPHRASES: Record<string, {
  childId: string;
  code: string;
  validFrom: string;
  validUntil: string;
  isUsed: boolean;
}> = {
  'demo-child-1': {
    childId: 'demo-child-1',
    code: 'EAGLE-456',
    validFrom: todayStart.toISOString(),
    validUntil: todayEnd.toISOString(),
    isUsed: false,
  },
  'demo-child-2': {
    childId: 'demo-child-2',
    code: 'LION-789',
    validFrom: todayStart.toISOString(),
    validUntil: todayEnd.toISOString(),
    isUsed: false,
  },
  'demo-child-3': {
    childId: 'demo-child-3',
    code: 'STAR-321',
    validFrom: todayStart.toISOString(),
    validUntil: todayEnd.toISOString(),
    isUsed: true,
  },
  // Passphrases for admin's students
  'demo-child-admin-1': {
    childId: 'demo-child-admin-1',
    code: 'TIGER-123',
    validFrom: todayStart.toISOString(),
    validUntil: todayEnd.toISOString(),
    isUsed: false,
  },
  'demo-child-admin-2': {
    childId: 'demo-child-admin-2',
    code: 'BEAR-456',
    validFrom: todayStart.toISOString(),
    validUntil: todayEnd.toISOString(),
    isUsed: false,
  },
};

// --- Demo Attendance ---
const generateAttendanceRecords = (childId: string, days: number = 7) => {
  const records = [];
  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    // Skip weekends
    if (date.getDay() === 0 || date.getDay() === 6) continue;
    
    const checkInTime = new Date(date);
    checkInTime.setHours(7, 30 + Math.floor(Math.random() * 30), 0, 0);
    
    const checkOutTime = new Date(date);
    checkOutTime.setHours(14, 30 + Math.floor(Math.random() * 60), 0, 0);
    
    const isToday = i === 0;
    const status = isToday ? 'checked_in' : 'checked_out';
    
    records.push({
      _id: `demo-attendance-${childId}-${i}`,
      childId,
      date: date.toISOString(),
      checkInTime: checkInTime.toISOString(),
      checkOutTime: isToday ? null : checkOutTime.toISOString(),
      status,
    });
  }
  return records;
};

export const DEMO_ATTENDANCE: Record<string, ReturnType<typeof generateAttendanceRecords>> = {
  'demo-child-1': generateAttendanceRecords('demo-child-1'),
  'demo-child-2': generateAttendanceRecords('demo-child-2'),
  'demo-child-3': generateAttendanceRecords('demo-child-3'),
  // Attendance for admin's students
  'demo-child-admin-1': generateAttendanceRecords('demo-child-admin-1'),
  'demo-child-admin-2': generateAttendanceRecords('demo-child-admin-2'),
};

// --- Demo KudiCoins ---
export const DEMO_KUDICOINS: Record<string, {
  balance: number;
  totalEarned: number;
  totalSpent: number;
}> = {
  'demo-child-1': {
    balance: 1250,
    totalEarned: 2500,
    totalSpent: 1250,
  },
  'demo-child-2': {
    balance: 850,
    totalEarned: 1200,
    totalSpent: 350,
  },
  'demo-child-3': {
    balance: 2100,
    totalEarned: 3500,
    totalSpent: 1400,
  },
  // KudiCoins for admin's students
  'demo-child-admin-1': {
    balance: 950,
    totalEarned: 1800,
    totalSpent: 850,
  },
  'demo-child-admin-2': {
    balance: 650,
    totalEarned: 1000,
    totalSpent: 350,
  },
};

// --- Demo Savings Goals ---
export const DEMO_SAVINGS_GOALS: Record<string, Array<{
  _id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  progressPercentage: number;
  status: string;
}>> = {
  'demo-child-1': [
    {
      _id: 'demo-goal-1',
      name: 'New Bicycle',
      targetAmount: 50000,
      currentAmount: 32500,
      progressPercentage: 65,
      status: 'active',
    },
    {
      _id: 'demo-goal-2',
      name: 'Birthday Party Fund',
      targetAmount: 25000,
      currentAmount: 25000,
      progressPercentage: 100,
      status: 'completed',
    },
  ],
  'demo-child-2': [
    {
      _id: 'demo-goal-3',
      name: 'Video Game',
      targetAmount: 30000,
      currentAmount: 12000,
      progressPercentage: 40,
      status: 'active',
    },
  ],
  'demo-child-3': [
    {
      _id: 'demo-goal-4',
      name: 'Laptop Fund',
      targetAmount: 150000,
      currentAmount: 75000,
      progressPercentage: 50,
      status: 'active',
    },
    {
      _id: 'demo-goal-5',
      name: 'School Trip',
      targetAmount: 45000,
      currentAmount: 45000,
      progressPercentage: 100,
      status: 'completed',
    },
  ],
};

// --- Demo Achievements ---
export const DEMO_ACHIEVEMENTS: Record<string, Array<{
  _id: string;
  type: string;
  name: string;
  description: string;
  badge: string;
  earnedAt: string;
}>> = {
  'demo-child-1': [
    {
      _id: 'demo-achieve-1',
      type: 'savings',
      name: 'First Saver',
      description: 'Created your first savings goal',
      badge: '🎯',
      earnedAt: '2024-02-15T10:00:00Z',
    },
    {
      _id: 'demo-achieve-2',
      type: 'quiz',
      name: 'Quiz Master',
      description: 'Completed 5 financial quizzes',
      badge: '🧠',
      earnedAt: '2024-03-01T14:30:00Z',
    },
    {
      _id: 'demo-achieve-3',
      type: 'savings',
      name: 'Goal Crusher',
      description: 'Completed a savings goal',
      badge: '🏆',
      earnedAt: '2024-03-10T09:00:00Z',
    },
  ],
  'demo-child-2': [
    {
      _id: 'demo-achieve-4',
      type: 'savings',
      name: 'First Saver',
      description: 'Created your first savings goal',
      badge: '🎯',
      earnedAt: '2024-03-05T11:00:00Z',
    },
  ],
  'demo-child-3': [
    {
      _id: 'demo-achieve-5',
      type: 'quiz',
      name: 'Quiz Champion',
      description: 'Scored 100% on a quiz',
      badge: '⭐',
      earnedAt: '2024-02-20T15:00:00Z',
    },
    {
      _id: 'demo-achieve-6',
      type: 'savings',
      name: 'Super Saver',
      description: 'Saved over ₦50,000',
      badge: '💰',
      earnedAt: '2024-03-15T10:00:00Z',
    },
  ],
};

// --- Demo Quizzes ---
export const DEMO_QUIZZES = [
  {
    _id: 'demo-quiz-1',
    title: 'Money Basics',
    category: 'Basics',
    difficulty: 'easy',
    kudiCoinReward: 50,
    questionCount: 5,
  },
  {
    _id: 'demo-quiz-2',
    title: 'Saving Smart',
    category: 'Savings',
    difficulty: 'easy',
    kudiCoinReward: 75,
    questionCount: 8,
  },
  {
    _id: 'demo-quiz-3',
    title: 'Budget Builder',
    category: 'Budgeting',
    difficulty: 'medium',
    kudiCoinReward: 100,
    questionCount: 10,
  },
  {
    _id: 'demo-quiz-4',
    title: 'Investment Intro',
    category: 'Investing',
    difficulty: 'hard',
    kudiCoinReward: 150,
    questionCount: 12,
  },
  {
    _id: 'demo-quiz-5',
    title: 'Needs vs Wants',
    category: 'Basics',
    difficulty: 'easy',
    kudiCoinReward: 50,
    questionCount: 5,
  },
  {
    _id: 'demo-quiz-6',
    title: 'Compound Interest',
    category: 'Investing',
    difficulty: 'hard',
    kudiCoinReward: 200,
    questionCount: 15,
  },
];

// --- Demo Menu Items ---
export const DEMO_MENU_ITEMS = [
  {
    _id: 'demo-menu-1',
    name: 'Jollof Rice with Chicken',
    description: 'Classic Nigerian jollof rice served with grilled chicken',
    price: 1500,
    category: 'Main',
    allergens: [],
    available: true,
  },
  {
    _id: 'demo-menu-2',
    name: 'Fried Rice with Fish',
    description: 'Vegetable fried rice with crispy fried fish',
    price: 1800,
    category: 'Main',
    allergens: ['fish'],
    available: true,
  },
  {
    _id: 'demo-menu-3',
    name: 'Spaghetti Bolognese',
    description: 'Pasta with rich meat sauce',
    price: 1200,
    category: 'Main',
    allergens: ['gluten'],
    available: true,
  },
  {
    _id: 'demo-menu-4',
    name: 'Chicken Sandwich',
    description: 'Grilled chicken with lettuce and mayo on whole wheat',
    price: 800,
    category: 'Snack',
    allergens: ['gluten', 'dairy'],
    available: true,
  },
  {
    _id: 'demo-menu-5',
    name: 'Fruit Salad',
    description: 'Fresh seasonal fruits',
    price: 500,
    category: 'Snack',
    allergens: [],
    available: true,
  },
  {
    _id: 'demo-menu-6',
    name: 'Moi Moi',
    description: 'Steamed bean pudding with egg',
    price: 600,
    category: 'Side',
    allergens: ['egg'],
    available: true,
  },
  {
    _id: 'demo-menu-7',
    name: 'Zobo Drink',
    description: 'Refreshing hibiscus drink',
    price: 300,
    category: 'Drink',
    allergens: [],
    available: true,
  },
  {
    _id: 'demo-menu-8',
    name: 'Orange Juice',
    description: 'Freshly squeezed orange juice',
    price: 400,
    category: 'Drink',
    allergens: [],
    available: true,
  },
];

// Generate weekly menu
export const DEMO_WEEKLY_MENU = [1, 2, 3, 4, 5].map(dayOfWeek => ({
  dayOfWeek,
  items: DEMO_MENU_ITEMS.filter((_, index) => {
    // Rotate items by day
    return (index + dayOfWeek) % 3 !== 0;
  }),
}));

// --- Demo Meal Orders ---
const orderDate1 = new Date();
orderDate1.setDate(orderDate1.getDate() - 1);
const orderDate2 = new Date();
orderDate2.setDate(orderDate2.getDate() - 3);

export const DEMO_MEAL_ORDERS: Record<string, Array<{
  _id: string;
  childId: string;
  orderDate: string;
  items: { name: string; price: number; quantity: number }[];
  totalAmount: number;
  status: string;
}>> = {
  'demo-child-1': [
    {
      _id: 'demo-order-1',
      childId: 'demo-child-1',
      orderDate: orderDate1.toISOString(),
      items: [
        { name: 'Jollof Rice with Chicken', price: 1500, quantity: 1 },
        { name: 'Orange Juice', price: 400, quantity: 1 },
      ],
      totalAmount: 1900,
      status: 'delivered',
    },
    {
      _id: 'demo-order-2',
      childId: 'demo-child-1',
      orderDate: orderDate2.toISOString(),
      items: [
        { name: 'Fried Rice with Fish', price: 1800, quantity: 1 },
        { name: 'Zobo Drink', price: 300, quantity: 2 },
      ],
      totalAmount: 2400,
      status: 'delivered',
    },
  ],
  'demo-child-2': [
    {
      _id: 'demo-order-3',
      childId: 'demo-child-2',
      orderDate: orderDate1.toISOString(),
      items: [
        { name: 'Spaghetti Bolognese', price: 1200, quantity: 1 },
        { name: 'Fruit Salad', price: 500, quantity: 1 },
      ],
      totalAmount: 1700,
      status: 'delivered',
    },
  ],
  'demo-child-3': [],
};

// --- Demo Notifications ---
export const DEMO_NOTIFICATIONS = [
  {
    _id: 'demo-notif-1',
    user: 'demo-user-ada',
    type: 'payment_overdue',
    title: 'Payment Overdue',
    message: 'Third Term Tuition Fee for Chisom is overdue',
    metadata: {
      scheduledPaymentId: 'demo-payment-1',
      childId: 'demo-child-1',
      amount: 450000,
      feeType: FeeType.TUITION,
    },
    isRead: false,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: 'demo-notif-2',
    user: 'demo-user-ada',
    type: 'payment_due',
    title: 'Payment Due Tomorrow',
    message: 'March Meal Plan for Chisom is due tomorrow',
    metadata: {
      scheduledPaymentId: 'demo-payment-2',
      childId: 'demo-child-1',
      amount: 35000,
      feeType: FeeType.MEALS,
    },
    isRead: false,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: 'demo-notif-3',
    user: 'demo-user-ada',
    type: 'payment_completed',
    title: 'Payment Successful',
    message: 'Third Term Books payment completed successfully',
    metadata: {
      scheduledPaymentId: 'demo-payment-4',
      childId: 'demo-child-1',
      amount: 15000,
      feeType: FeeType.BOOKS,
    },
    isRead: true,
    readAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

// =============================================================================
// CHRISLAND SCHOOLS DEMO DATA
// =============================================================================

export const CHRISLAND_USERS = {
  parent1: {
    _id: 'chrisland-user-parent1',
    email: 'amaka.obi@chrisland.demo.com',
    firstName: 'Amaka',
    lastName: 'Obi',
    role: 'parent' as const,
    phone: '+234 803 456 7890',
    balance: 285000,
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-03-25T14:30:00Z',
  },
  parent2: {
    _id: 'chrisland-user-parent2',
    email: 'tunde.adeyemi@chrisland.demo.com',
    firstName: 'Tunde',
    lastName: 'Adeyemi',
    role: 'parent' as const,
    phone: '+234 805 678 9012',
    balance: 420000,
    createdAt: '2024-01-15T09:00:00Z',
    updatedAt: '2024-03-22T11:00:00Z',
  },
  parent3: {
    _id: 'chrisland-user-parent3',
    email: 'funke.williams@chrisland.demo.com',
    firstName: 'Funke',
    lastName: 'Williams',
    role: 'parent' as const,
    phone: '+234 807 890 1234',
    balance: 175000,
    createdAt: '2024-02-01T08:00:00Z',
    updatedAt: '2024-03-20T09:00:00Z',
  },
  parent4: {
    _id: 'chrisland-user-parent4',
    email: 'abubakar.sani@chrisland.demo.com',
    firstName: 'Abubakar',
    lastName: 'Sani',
    role: 'parent' as const,
    phone: '+234 809 123 4567',
    balance: 320000,
    createdAt: '2024-01-20T08:00:00Z',
    updatedAt: '2024-03-22T09:00:00Z',
  },
  admin: {
    _id: 'chrisland-user-admin',
    email: 'admin@chrisland.demo.com',
    firstName: 'School',
    lastName: 'Administrator',
    role: 'admin' as const,
    phone: '+234 901 234 5678',
    balance: 0,
    createdAt: '2024-01-01T08:00:00Z',
    updatedAt: '2024-03-25T09:00:00Z',
  },
};

export const CHRISLAND_SCHOOLS = [
  {
    _id: 'chrisland-school-nursery-vgc',
    name: 'Chrisland Nursery School VGC',
    address: 'VGC Estate, Lekki-Epe Expressway',
    city: 'Lagos',
    state: 'Lagos',
    schoolType: SchoolType.NURSERY,
    contactEmail: 'nursery.vgc@chrislandschools.com',
    contactPhone: '+234 817 201 3114',
    createdBy: 'chrisland-user-admin',
    isActive: true,
    createdAt: '2024-01-01T08:00:00Z',
    updatedAt: '2024-03-25T09:00:00Z',
  },
  {
    _id: 'chrisland-school-primary-vgc',
    name: 'Chrisland Primary School VGC',
    address: 'VGC Estate, Lekki-Epe Expressway',
    city: 'Lagos',
    state: 'Lagos',
    schoolType: SchoolType.PRIMARY,
    contactEmail: 'primary.vgc@chrislandschools.com',
    contactPhone: '+234 817 201 3145',
    createdBy: 'chrisland-user-admin',
    isActive: true,
    createdAt: '2024-01-01T08:00:00Z',
    updatedAt: '2024-03-25T09:00:00Z',
  },
  {
    _id: 'chrisland-school-high-vgc',
    name: 'Chrisland High School VGC',
    address: 'VGC Estate, Lekki-Epe Expressway',
    city: 'Lagos',
    state: 'Lagos',
    schoolType: SchoolType.SECONDARY,
    contactEmail: 'high.vgc@chrislandschools.com',
    contactPhone: '+234 813 010 1818',
    createdBy: 'chrisland-user-admin',
    isActive: true,
    createdAt: '2024-01-01T08:00:00Z',
    updatedAt: '2024-03-25T09:00:00Z',
  },
  {
    _id: 'chrisland-school-lekki',
    name: 'Chrisland School Lekki',
    address: 'Lekki Phase 1, Lagos',
    city: 'Lagos',
    state: 'Lagos',
    schoolType: SchoolType.COMBINED,
    contactEmail: 'lekki@chrislandschools.com',
    contactPhone: '+234 708 808 8408',
    createdBy: 'chrisland-user-admin',
    isActive: true,
    createdAt: '2024-01-01T08:00:00Z',
    updatedAt: '2024-03-25T09:00:00Z',
  },
];

export const CHRISLAND_CHILDREN = [
  // Parent 1 (Amaka Obi) children
  {
    _id: 'chrisland-child-1',
    firstName: 'Chukwuemeka',
    lastName: 'Obi',
    parent: 'chrisland-user-parent1',
    schoolProfile: CHRISLAND_SCHOOLS[1], // Primary VGC
    schoolId: 'chrisland-school-primary-vgc',
    schoolName: 'Chrisland Primary School VGC',
    className: 'Primary 5',
    grade: 'Primary 5',
    studentId: 'CPS-VGC-2024-001',
    dateOfBirth: '2014-03-15',
    isActive: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-03-25T14:30:00Z',
  },
  {
    _id: 'chrisland-child-2',
    firstName: 'Adaeze',
    lastName: 'Obi',
    parent: 'chrisland-user-parent1',
    schoolProfile: CHRISLAND_SCHOOLS[0], // Nursery VGC
    schoolId: 'chrisland-school-nursery-vgc',
    schoolName: 'Chrisland Nursery School VGC',
    className: 'KG 2',
    grade: 'KG 2',
    studentId: 'CNS-VGC-2024-015',
    dateOfBirth: '2019-07-22',
    isActive: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-03-25T14:30:00Z',
  },
  // Parent 2 (Tunde Adeyemi) children
  {
    _id: 'chrisland-child-3',
    firstName: 'Oluwaseun',
    lastName: 'Adeyemi',
    parent: 'chrisland-user-parent2',
    schoolProfile: CHRISLAND_SCHOOLS[2], // High School VGC
    schoolId: 'chrisland-school-high-vgc',
    schoolName: 'Chrisland High School VGC',
    className: 'SS 2',
    grade: 'SS 2',
    studentId: 'CHS-VGC-2024-042',
    dateOfBirth: '2008-11-08',
    isActive: true,
    createdAt: '2024-01-20T09:00:00Z',
    updatedAt: '2024-03-22T11:00:00Z',
  },
  {
    _id: 'chrisland-child-4',
    firstName: 'Temiloluwa',
    lastName: 'Adeyemi',
    parent: 'chrisland-user-parent2',
    schoolProfile: CHRISLAND_SCHOOLS[2], // High School VGC
    schoolId: 'chrisland-school-high-vgc',
    schoolName: 'Chrisland High School VGC',
    className: 'JSS 3',
    grade: 'JSS 3',
    studentId: 'CHS-VGC-2024-078',
    dateOfBirth: '2011-05-30',
    isActive: true,
    createdAt: '2024-01-20T09:00:00Z',
    updatedAt: '2024-03-22T11:00:00Z',
  },
  {
    _id: 'chrisland-child-5',
    firstName: 'Ayomide',
    lastName: 'Adeyemi',
    parent: 'chrisland-user-parent2',
    schoolProfile: CHRISLAND_SCHOOLS[1], // Primary VGC
    schoolId: 'chrisland-school-primary-vgc',
    schoolName: 'Chrisland Primary School VGC',
    className: 'Primary 3',
    grade: 'Primary 3',
    studentId: 'CPS-VGC-2024-089',
    dateOfBirth: '2016-09-12',
    isActive: true,
    createdAt: '2024-01-20T09:00:00Z',
    updatedAt: '2024-03-22T11:00:00Z',
  },
  // Parent 3 (Funke Williams) children
  {
    _id: 'chrisland-child-6',
    firstName: 'David',
    lastName: 'Williams',
    parent: 'chrisland-user-parent3',
    schoolProfile: CHRISLAND_SCHOOLS[3], // Lekki
    schoolId: 'chrisland-school-lekki',
    schoolName: 'Chrisland School Lekki',
    className: 'Primary 4',
    grade: 'Primary 4',
    studentId: 'CSL-2024-023',
    dateOfBirth: '2015-04-18',
    isActive: true,
    createdAt: '2024-02-05T08:00:00Z',
    updatedAt: '2024-03-20T09:00:00Z',
  },
  {
    _id: 'chrisland-child-7',
    firstName: 'Grace',
    lastName: 'Williams',
    parent: 'chrisland-user-parent3',
    schoolProfile: CHRISLAND_SCHOOLS[3], // Lekki
    schoolId: 'chrisland-school-lekki',
    schoolName: 'Chrisland School Lekki',
    className: 'Primary 1',
    grade: 'Primary 1',
    studentId: 'CSL-2024-056',
    dateOfBirth: '2018-08-05',
    isActive: true,
    createdAt: '2024-02-05T08:00:00Z',
    updatedAt: '2024-03-20T09:00:00Z',
  },
  {
    _id: 'chrisland-child-8',
    firstName: 'Emmanuel',
    lastName: 'Williams',
    parent: 'chrisland-user-parent3',
    schoolProfile: CHRISLAND_SCHOOLS[0], // Nursery VGC
    schoolId: 'chrisland-school-nursery-vgc',
    schoolName: 'Chrisland Nursery School VGC',
    className: 'Crèche',
    grade: 'Crèche',
    studentId: 'CNS-VGC-2024-034',
    dateOfBirth: '2022-02-14',
    isActive: true,
    createdAt: '2024-02-05T08:00:00Z',
    updatedAt: '2024-03-20T09:00:00Z',
  },
  // Parent 4 (Abubakar Sani - Hausa name) children
  {
    _id: 'chrisland-child-9',
    firstName: 'Musa',
    lastName: 'Sani',
    parent: 'chrisland-user-parent4',
    schoolProfile: CHRISLAND_SCHOOLS[2], // High School VGC
    schoolId: 'chrisland-school-high-vgc',
    schoolName: 'Chrisland High School VGC',
    className: 'SS 1',
    grade: 'SS 1',
    studentId: 'CHS-VGC-2024-095',
    dateOfBirth: '2009-08-15',
    isActive: true,
    createdAt: '2024-01-22T08:00:00Z',
    updatedAt: '2024-03-22T09:00:00Z',
  },
  {
    _id: 'chrisland-child-10',
    firstName: 'Fatima',
    lastName: 'Sani',
    parent: 'chrisland-user-parent4',
    schoolProfile: CHRISLAND_SCHOOLS[1], // Primary VGC
    schoolId: 'chrisland-school-primary-vgc',
    schoolName: 'Chrisland Primary School VGC',
    className: 'Primary 4',
    grade: 'Primary 4',
    studentId: 'CPS-VGC-2024-102',
    dateOfBirth: '2015-03-20',
    isActive: true,
    createdAt: '2024-01-22T08:00:00Z',
    updatedAt: '2024-03-22T09:00:00Z',
  },
  {
    _id: 'chrisland-child-11',
    firstName: 'Ibrahim',
    lastName: 'Sani',
    parent: 'chrisland-user-parent4',
    schoolProfile: CHRISLAND_SCHOOLS[0], // Nursery VGC
    schoolId: 'chrisland-school-nursery-vgc',
    schoolName: 'Chrisland Nursery School VGC',
    className: 'KG 1',
    grade: 'KG 1',
    studentId: 'CNS-VGC-2024-045',
    dateOfBirth: '2020-11-10',
    isActive: true,
    createdAt: '2024-01-22T08:00:00Z',
    updatedAt: '2024-03-22T09:00:00Z',
  },
];

// Chrisland Fee Structure (Premium Lagos Private School)
export const CHRISLAND_FEE_AMOUNTS = {
  nursery: {
    tuition: 650000,
    meals: 75000,
    transport: 80000,
    uniform: 45000,
    books: 35000,
    tech: 25000,
  },
  primary: {
    tuition: 850000,
    meals: 85000,
    transport: 90000,
    uniform: 50000,
    books: 45000,
    tech: 30000,
  },
  secondary: {
    tuition: 1200000,
    meals: 95000,
    transport: 120000,
    uniform: 55000,
    books: 55000,
    tech: 35000,
  },
};

// Chrisland Scheduled Payments
const chrislandToday = new Date();
const chrislandLastWeek = new Date(chrislandToday);
chrislandLastWeek.setDate(chrislandLastWeek.getDate() - 7);
const chrislandNextWeek = new Date(chrislandToday);
chrislandNextWeek.setDate(chrislandNextWeek.getDate() + 7);

export const CHRISLAND_SCHEDULED_PAYMENTS = [
  {
    _id: 'chrisland-payment-1',
    parent: 'chrisland-user-parent1',
    child: CHRISLAND_CHILDREN[0],
    schoolProfile: CHRISLAND_SCHOOLS[1],
    feeType: FeeType.TUITION,
    description: 'Third Term Tuition - Primary 5',
    amount: 850000,
    currency: 'NGN',
    scheduledDate: chrislandLastWeek.toISOString(),
    dueDate: chrislandLastWeek.toISOString(),
    isRecurring: true,
    recurrenceRule: { frequency: RecurrenceFrequency.TERMLY, startDate: '2024-01-15T00:00:00Z' },
    status: PaymentStatus.PENDING,
    retryCount: 0,
    isAutoGenerated: false,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-03-25T14:30:00Z',
  },
  {
    _id: 'chrisland-payment-2',
    parent: 'chrisland-user-parent2',
    child: CHRISLAND_CHILDREN[2],
    schoolProfile: CHRISLAND_SCHOOLS[2],
    feeType: FeeType.TUITION,
    description: 'Third Term Tuition - SS 2',
    amount: 1200000,
    currency: 'NGN',
    scheduledDate: chrislandNextWeek.toISOString(),
    dueDate: chrislandNextWeek.toISOString(),
    isRecurring: true,
    recurrenceRule: { frequency: RecurrenceFrequency.TERMLY, startDate: '2024-01-20T00:00:00Z' },
    status: PaymentStatus.PENDING,
    retryCount: 0,
    isAutoGenerated: false,
    createdAt: '2024-01-20T09:00:00Z',
    updatedAt: '2024-03-22T11:00:00Z',
  },
  {
    _id: 'chrisland-payment-3',
    parent: 'chrisland-user-parent1',
    child: CHRISLAND_CHILDREN[1],
    schoolProfile: CHRISLAND_SCHOOLS[0],
    feeType: FeeType.MEALS,
    description: 'March Meal Plan - KG 2',
    amount: 75000,
    currency: 'NGN',
    scheduledDate: chrislandToday.toISOString(),
    dueDate: chrislandToday.toISOString(),
    isRecurring: true,
    recurrenceRule: { frequency: RecurrenceFrequency.MONTHLY, startDate: '2024-01-01T00:00:00Z' },
    status: PaymentStatus.PENDING,
    retryCount: 0,
    isAutoGenerated: false,
    createdAt: '2024-03-01T10:00:00Z',
    updatedAt: '2024-03-25T14:30:00Z',
  },
  {
    _id: 'chrisland-payment-4',
    parent: 'chrisland-user-parent3',
    child: CHRISLAND_CHILDREN[5],
    schoolProfile: CHRISLAND_SCHOOLS[3],
    feeType: FeeType.TRANSPORT,
    description: 'School Bus - March',
    amount: 90000,
    currency: 'NGN',
    scheduledDate: '2024-03-01T00:00:00Z',
    dueDate: '2024-03-01T00:00:00Z',
    isRecurring: true,
    recurrenceRule: { frequency: RecurrenceFrequency.MONTHLY, startDate: '2024-01-01T00:00:00Z' },
    status: PaymentStatus.COMPLETED,
    retryCount: 0,
    isAutoGenerated: false,
    createdAt: '2024-02-15T10:00:00Z',
    updatedAt: '2024-03-01T09:00:00Z',
  },
  // Parent 4 (Abubakar Sani) payments
  {
    _id: 'chrisland-payment-5',
    parent: 'chrisland-user-parent4',
    child: CHRISLAND_CHILDREN[8], // Musa Sani
    schoolProfile: CHRISLAND_SCHOOLS[2],
    feeType: FeeType.TUITION,
    description: 'Third Term Tuition - SS 1',
    amount: 1200000,
    currency: 'NGN',
    scheduledDate: chrislandLastWeek.toISOString(),
    dueDate: chrislandLastWeek.toISOString(),
    isRecurring: true,
    recurrenceRule: { frequency: RecurrenceFrequency.TERMLY, startDate: '2024-01-22T00:00:00Z' },
    status: PaymentStatus.PENDING,
    retryCount: 0,
    isAutoGenerated: false,
    createdAt: '2024-01-22T08:00:00Z',
    updatedAt: '2024-03-22T09:00:00Z',
  },
  {
    _id: 'chrisland-payment-6',
    parent: 'chrisland-user-parent4',
    child: CHRISLAND_CHILDREN[9], // Fatima Sani
    schoolProfile: CHRISLAND_SCHOOLS[1],
    feeType: FeeType.TUITION,
    description: 'Third Term Tuition - Primary 4',
    amount: 850000,
    currency: 'NGN',
    scheduledDate: chrislandNextWeek.toISOString(),
    dueDate: chrislandNextWeek.toISOString(),
    isRecurring: true,
    recurrenceRule: { frequency: RecurrenceFrequency.TERMLY, startDate: '2024-01-22T00:00:00Z' },
    status: PaymentStatus.PENDING,
    retryCount: 0,
    isAutoGenerated: false,
    createdAt: '2024-01-22T08:00:00Z',
    updatedAt: '2024-03-22T09:00:00Z',
  },
  {
    _id: 'chrisland-payment-7',
    parent: 'chrisland-user-parent4',
    child: CHRISLAND_CHILDREN[10], // Ibrahim Sani
    schoolProfile: CHRISLAND_SCHOOLS[0],
    feeType: FeeType.MEALS,
    description: 'March Meal Plan - KG 1',
    amount: 75000,
    currency: 'NGN',
    scheduledDate: chrislandToday.toISOString(),
    dueDate: chrislandToday.toISOString(),
    isRecurring: true,
    recurrenceRule: { frequency: RecurrenceFrequency.MONTHLY, startDate: '2024-01-01T00:00:00Z' },
    status: PaymentStatus.PENDING,
    retryCount: 0,
    isAutoGenerated: false,
    createdAt: '2024-03-01T10:00:00Z',
    updatedAt: '2024-03-22T09:00:00Z',
  },
];

// Chrisland Passphrases
const chrislandTodayStart = new Date();
chrislandTodayStart.setHours(7, 0, 0, 0);
const chrislandTodayEnd = new Date();
chrislandTodayEnd.setHours(18, 0, 0, 0);

export const CHRISLAND_PASSPHRASES: Record<string, { childId: string; code: string; validFrom: string; validUntil: string; isUsed: boolean }> = {
  'chrisland-child-1': { childId: 'chrisland-child-1', code: 'EAGLE-789', validFrom: chrislandTodayStart.toISOString(), validUntil: chrislandTodayEnd.toISOString(), isUsed: false },
  'chrisland-child-2': { childId: 'chrisland-child-2', code: 'LION-456', validFrom: chrislandTodayStart.toISOString(), validUntil: chrislandTodayEnd.toISOString(), isUsed: false },
  'chrisland-child-3': { childId: 'chrisland-child-3', code: 'STAR-123', validFrom: chrislandTodayStart.toISOString(), validUntil: chrislandTodayEnd.toISOString(), isUsed: true },
  'chrisland-child-4': { childId: 'chrisland-child-4', code: 'HAWK-654', validFrom: chrislandTodayStart.toISOString(), validUntil: chrislandTodayEnd.toISOString(), isUsed: false },
  'chrisland-child-5': { childId: 'chrisland-child-5', code: 'MOON-321', validFrom: chrislandTodayStart.toISOString(), validUntil: chrislandTodayEnd.toISOString(), isUsed: false },
  'chrisland-child-6': { childId: 'chrisland-child-6', code: 'WOLF-987', validFrom: chrislandTodayStart.toISOString(), validUntil: chrislandTodayEnd.toISOString(), isUsed: false },
  'chrisland-child-7': { childId: 'chrisland-child-7', code: 'BEAR-159', validFrom: chrislandTodayStart.toISOString(), validUntil: chrislandTodayEnd.toISOString(), isUsed: false },
  'chrisland-child-8': { childId: 'chrisland-child-8', code: 'RAIN-753', validFrom: chrislandTodayStart.toISOString(), validUntil: chrislandTodayEnd.toISOString(), isUsed: false },
  // Abubakar Sani's children
  'chrisland-child-9': { childId: 'chrisland-child-9', code: 'KANO-456', validFrom: chrislandTodayStart.toISOString(), validUntil: chrislandTodayEnd.toISOString(), isUsed: false },
  'chrisland-child-10': { childId: 'chrisland-child-10', code: 'ZARIA-789', validFrom: chrislandTodayStart.toISOString(), validUntil: chrislandTodayEnd.toISOString(), isUsed: false },
  'chrisland-child-11': { childId: 'chrisland-child-11', code: 'SOKOTO-123', validFrom: chrislandTodayStart.toISOString(), validUntil: chrislandTodayEnd.toISOString(), isUsed: false },
};

// Chrisland KudiCoins
export const CHRISLAND_KUDICOINS: Record<string, { balance: number; totalEarned: number; totalSpent: number }> = {
  'chrisland-child-1': { balance: 1850, totalEarned: 3200, totalSpent: 1350 },
  'chrisland-child-2': { balance: 650, totalEarned: 900, totalSpent: 250 },
  'chrisland-child-3': { balance: 2450, totalEarned: 4100, totalSpent: 1650 },
  'chrisland-child-4': { balance: 1200, totalEarned: 2000, totalSpent: 800 },
  'chrisland-child-5': { balance: 980, totalEarned: 1500, totalSpent: 520 },
  'chrisland-child-6': { balance: 1100, totalEarned: 1800, totalSpent: 700 },
  // Abubakar Sani's children
  'chrisland-child-9': { balance: 1650, totalEarned: 2800, totalSpent: 1150 },
  'chrisland-child-10': { balance: 920, totalEarned: 1400, totalSpent: 480 },
  'chrisland-child-11': { balance: 350, totalEarned: 500, totalSpent: 150 },
  'chrisland-child-7': { balance: 450, totalEarned: 600, totalSpent: 150 },
  'chrisland-child-8': { balance: 200, totalEarned: 250, totalSpent: 50 },
};

// =============================================================================
// RIVERSIDE SCHOOLS DEMO DATA
// =============================================================================

export const RIVERSIDE_USERS = {
  parent1: {
    _id: 'riverside-user-parent1',
    email: 'bola.johnson@riverside.demo.com',
    firstName: 'Bola',
    lastName: 'Johnson',
    role: 'parent' as const,
    phone: '+234 802 345 6789',
    balance: 195000,
    createdAt: '2024-01-12T10:00:00Z',
    updatedAt: '2024-03-24T14:30:00Z',
  },
  parent2: {
    _id: 'riverside-user-parent2',
    email: 'kemi.adekunle@riverside.demo.com',
    firstName: 'Kemi',
    lastName: 'Adekunle',
    role: 'parent' as const,
    phone: '+234 804 567 8901',
    balance: 320000,
    createdAt: '2024-01-18T09:00:00Z',
    updatedAt: '2024-03-21T11:00:00Z',
  },
  parent3: {
    _id: 'riverside-user-parent3',
    email: 'segun.bakare@riverside.demo.com',
    firstName: 'Segun',
    lastName: 'Bakare',
    role: 'parent' as const,
    phone: '+234 806 789 0123',
    balance: 145000,
    createdAt: '2024-02-03T08:00:00Z',
    updatedAt: '2024-03-19T09:00:00Z',
  },
  admin: {
    _id: 'riverside-user-admin',
    email: 'admin@riverside.demo.com',
    firstName: 'School',
    lastName: 'Administrator',
    role: 'admin' as const,
    phone: '+234 705 969 5895',
    balance: 0,
    createdAt: '2024-01-01T08:00:00Z',
    updatedAt: '2024-03-24T09:00:00Z',
  },
};

export const RIVERSIDE_SCHOOLS = [
  {
    _id: 'riverside-school-elementary',
    name: 'Riverside Elementary School',
    address: 'Plot 8, Channels TV Avenue, OPIC Estate, Isheri',
    city: 'Isheri',
    state: 'Ogun',
    schoolType: SchoolType.PRIMARY,
    contactEmail: 'elementary@riversideschools.com.ng',
    contactPhone: '+234 705 969 5895',
    createdBy: 'riverside-user-admin',
    isActive: true,
    createdAt: '2024-01-01T08:00:00Z',
    updatedAt: '2024-03-24T09:00:00Z',
  },
  {
    _id: 'riverside-school-college',
    name: 'Riverside College',
    address: 'Plot 8, Channels TV Avenue, OPIC Estate, Isheri',
    city: 'Isheri',
    state: 'Ogun',
    schoolType: SchoolType.SECONDARY,
    contactEmail: 'college@riversideschools.com.ng',
    contactPhone: '+234 903 000 9520',
    createdBy: 'riverside-user-admin',
    isActive: true,
    createdAt: '2024-01-01T08:00:00Z',
    updatedAt: '2024-03-24T09:00:00Z',
  },
];

export const RIVERSIDE_CHILDREN = [
  // Parent 1 (Bola Johnson) children
  {
    _id: 'riverside-child-1',
    firstName: 'Oluwafemi',
    lastName: 'Johnson',
    parent: 'riverside-user-parent1',
    schoolProfile: RIVERSIDE_SCHOOLS[0], // Elementary
    schoolId: 'riverside-school-elementary',
    schoolName: 'Riverside Elementary School',
    className: 'Grade 4',
    grade: 'Grade 4',
    studentId: 'RES-2024-012',
    dateOfBirth: '2015-06-20',
    isActive: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-03-24T14:30:00Z',
  },
  {
    _id: 'riverside-child-2',
    firstName: 'Oluwadamilola',
    lastName: 'Johnson',
    parent: 'riverside-user-parent1',
    schoolProfile: RIVERSIDE_SCHOOLS[0], // Elementary
    schoolId: 'riverside-school-elementary',
    schoolName: 'Riverside Elementary School',
    className: 'Grade 1',
    grade: 'Grade 1',
    studentId: 'RES-2024-045',
    dateOfBirth: '2018-09-15',
    isActive: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-03-24T14:30:00Z',
  },
  // Parent 2 (Kemi Adekunle) children
  {
    _id: 'riverside-child-3',
    firstName: 'Adeola',
    lastName: 'Adekunle',
    parent: 'riverside-user-parent2',
    schoolProfile: RIVERSIDE_SCHOOLS[1], // College
    schoolId: 'riverside-school-college',
    schoolName: 'Riverside College',
    className: 'SS 1',
    grade: 'SS 1',
    studentId: 'RC-2024-028',
    dateOfBirth: '2009-03-12',
    isActive: true,
    createdAt: '2024-01-20T09:00:00Z',
    updatedAt: '2024-03-21T11:00:00Z',
  },
  {
    _id: 'riverside-child-4',
    firstName: 'Adebayo',
    lastName: 'Adekunle',
    parent: 'riverside-user-parent2',
    schoolProfile: RIVERSIDE_SCHOOLS[1], // College
    schoolId: 'riverside-school-college',
    schoolName: 'Riverside College',
    className: 'JSS 2',
    grade: 'JSS 2',
    studentId: 'RC-2024-067',
    dateOfBirth: '2012-07-25',
    isActive: true,
    createdAt: '2024-01-20T09:00:00Z',
    updatedAt: '2024-03-21T11:00:00Z',
  },
  {
    _id: 'riverside-child-5',
    firstName: 'Adetola',
    lastName: 'Adekunle',
    parent: 'riverside-user-parent2',
    schoolProfile: RIVERSIDE_SCHOOLS[0], // Elementary
    schoolId: 'riverside-school-elementary',
    schoolName: 'Riverside Elementary School',
    className: 'Grade 5',
    grade: 'Grade 5',
    studentId: 'RES-2024-078',
    dateOfBirth: '2014-11-08',
    isActive: true,
    createdAt: '2024-01-20T09:00:00Z',
    updatedAt: '2024-03-21T11:00:00Z',
  },
  // Parent 3 (Segun Bakare) children
  {
    _id: 'riverside-child-6',
    firstName: 'Tolulope',
    lastName: 'Bakare',
    parent: 'riverside-user-parent3',
    schoolProfile: RIVERSIDE_SCHOOLS[0], // Elementary
    schoolId: 'riverside-school-elementary',
    schoolName: 'Riverside Elementary School',
    className: 'Grade 3',
    grade: 'Grade 3',
    studentId: 'RES-2024-089',
    dateOfBirth: '2016-04-30',
    isActive: true,
    createdAt: '2024-02-05T08:00:00Z',
    updatedAt: '2024-03-19T09:00:00Z',
  },
  {
    _id: 'riverside-child-7',
    firstName: 'Tobiloba',
    lastName: 'Bakare',
    parent: 'riverside-user-parent3',
    schoolProfile: RIVERSIDE_SCHOOLS[0], // Elementary
    schoolId: 'riverside-school-elementary',
    schoolName: 'Riverside Elementary School',
    className: 'Reception',
    grade: 'Reception',
    studentId: 'RES-2024-112',
    dateOfBirth: '2019-12-10',
    isActive: true,
    createdAt: '2024-02-05T08:00:00Z',
    updatedAt: '2024-03-19T09:00:00Z',
  },
];

// Riverside Fee Structure (Ogun State Premium School)
export const RIVERSIDE_FEE_AMOUNTS = {
  elementary: {
    tuition: 650000,
    meals: 55000,
    transport: 60000,
    uniform: 35000,
    books: 25000,
    excursion: 20000,
  },
  college: {
    tuition: 950000,
    meals: 75000,
    transport: 90000,
    uniform: 45000,
    books: 45000,
    excursion: 30000,
  },
};

// Riverside Scheduled Payments
const riversideToday = new Date();
const riversideLastWeek = new Date(riversideToday);
riversideLastWeek.setDate(riversideLastWeek.getDate() - 5);
const riversideNextWeek = new Date(riversideToday);
riversideNextWeek.setDate(riversideNextWeek.getDate() + 10);

export const RIVERSIDE_SCHEDULED_PAYMENTS = [
  {
    _id: 'riverside-payment-1',
    parent: 'riverside-user-parent1',
    child: RIVERSIDE_CHILDREN[0],
    schoolProfile: RIVERSIDE_SCHOOLS[0],
    feeType: FeeType.TUITION,
    description: 'Third Term Tuition - Grade 4',
    amount: 650000,
    currency: 'NGN',
    scheduledDate: riversideLastWeek.toISOString(),
    dueDate: riversideLastWeek.toISOString(),
    isRecurring: true,
    recurrenceRule: { frequency: RecurrenceFrequency.TERMLY, startDate: '2024-01-15T00:00:00Z' },
    status: PaymentStatus.PENDING,
    retryCount: 0,
    isAutoGenerated: false,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-03-24T14:30:00Z',
  },
  {
    _id: 'riverside-payment-2',
    parent: 'riverside-user-parent2',
    child: RIVERSIDE_CHILDREN[2],
    schoolProfile: RIVERSIDE_SCHOOLS[1],
    feeType: FeeType.TUITION,
    description: 'Third Term Tuition - SS 1',
    amount: 950000,
    currency: 'NGN',
    scheduledDate: riversideNextWeek.toISOString(),
    dueDate: riversideNextWeek.toISOString(),
    isRecurring: true,
    recurrenceRule: { frequency: RecurrenceFrequency.TERMLY, startDate: '2024-01-20T00:00:00Z' },
    status: PaymentStatus.PENDING,
    retryCount: 0,
    isAutoGenerated: false,
    createdAt: '2024-01-20T09:00:00Z',
    updatedAt: '2024-03-21T11:00:00Z',
  },
  {
    _id: 'riverside-payment-3',
    parent: 'riverside-user-parent1',
    child: RIVERSIDE_CHILDREN[1],
    schoolProfile: RIVERSIDE_SCHOOLS[0],
    feeType: FeeType.MEALS,
    description: 'March Meal Plan - Grade 1',
    amount: 55000,
    currency: 'NGN',
    scheduledDate: riversideToday.toISOString(),
    dueDate: riversideToday.toISOString(),
    isRecurring: true,
    recurrenceRule: { frequency: RecurrenceFrequency.MONTHLY, startDate: '2024-01-01T00:00:00Z' },
    status: PaymentStatus.PENDING,
    retryCount: 0,
    isAutoGenerated: false,
    createdAt: '2024-03-01T10:00:00Z',
    updatedAt: '2024-03-24T14:30:00Z',
  },
  {
    _id: 'riverside-payment-4',
    parent: 'riverside-user-parent3',
    child: RIVERSIDE_CHILDREN[5],
    schoolProfile: RIVERSIDE_SCHOOLS[0],
    feeType: FeeType.TRANSPORT,
    description: 'School Bus - March',
    amount: 60000,
    currency: 'NGN',
    scheduledDate: '2024-03-01T00:00:00Z',
    dueDate: '2024-03-01T00:00:00Z',
    isRecurring: true,
    recurrenceRule: { frequency: RecurrenceFrequency.MONTHLY, startDate: '2024-01-01T00:00:00Z' },
    status: PaymentStatus.COMPLETED,
    retryCount: 0,
    isAutoGenerated: false,
    createdAt: '2024-02-15T10:00:00Z',
    updatedAt: '2024-03-01T09:00:00Z',
  },
];

// Riverside Passphrases
const riversideTodayStart = new Date();
riversideTodayStart.setHours(7, 0, 0, 0);
const riversideTodayEnd = new Date();
riversideTodayEnd.setHours(18, 0, 0, 0);

export const RIVERSIDE_PASSPHRASES: Record<string, { childId: string; code: string; validFrom: string; validUntil: string; isUsed: boolean }> = {
  'riverside-child-1': { childId: 'riverside-child-1', code: 'RIVER-456', validFrom: riversideTodayStart.toISOString(), validUntil: riversideTodayEnd.toISOString(), isUsed: false },
  'riverside-child-2': { childId: 'riverside-child-2', code: 'STREAM-789', validFrom: riversideTodayStart.toISOString(), validUntil: riversideTodayEnd.toISOString(), isUsed: false },
  'riverside-child-3': { childId: 'riverside-child-3', code: 'WAVE-123', validFrom: riversideTodayStart.toISOString(), validUntil: riversideTodayEnd.toISOString(), isUsed: true },
  'riverside-child-4': { childId: 'riverside-child-4', code: 'TIDE-654', validFrom: riversideTodayStart.toISOString(), validUntil: riversideTodayEnd.toISOString(), isUsed: false },
  'riverside-child-5': { childId: 'riverside-child-5', code: 'OCEAN-321', validFrom: riversideTodayStart.toISOString(), validUntil: riversideTodayEnd.toISOString(), isUsed: false },
  'riverside-child-6': { childId: 'riverside-child-6', code: 'LAKE-987', validFrom: riversideTodayStart.toISOString(), validUntil: riversideTodayEnd.toISOString(), isUsed: false },
  'riverside-child-7': { childId: 'riverside-child-7', code: 'POND-159', validFrom: riversideTodayStart.toISOString(), validUntil: riversideTodayEnd.toISOString(), isUsed: false },
};

// Riverside KudiCoins
export const RIVERSIDE_KUDICOINS: Record<string, { balance: number; totalEarned: number; totalSpent: number }> = {
  'riverside-child-1': { balance: 1450, totalEarned: 2500, totalSpent: 1050 },
  'riverside-child-2': { balance: 520, totalEarned: 750, totalSpent: 230 },
  'riverside-child-3': { balance: 2100, totalEarned: 3500, totalSpent: 1400 },
  'riverside-child-4': { balance: 980, totalEarned: 1600, totalSpent: 620 },
  'riverside-child-5': { balance: 1350, totalEarned: 2200, totalSpent: 850 },
  'riverside-child-6': { balance: 780, totalEarned: 1100, totalSpent: 320 },
  'riverside-child-7': { balance: 300, totalEarned: 400, totalSpent: 100 },
};

// =============================================================================
// SCHOOL CONTEXT HELPERS
// =============================================================================

export type DemoSchoolContext = 'default' | 'chrisland' | 'riverside';

export function getDemoSchoolContext(): DemoSchoolContext {
  if (typeof window === 'undefined') return 'default';
  const context = localStorage.getItem('demoSchoolContext');
  if (context === 'chrisland' || context === 'riverside') return context;
  return 'default';
}

export function setDemoSchoolContext(context: DemoSchoolContext): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('demoSchoolContext', context);
}

export function getSchoolDemoUser() {
  if (typeof window === 'undefined') return null;
  const user = localStorage.getItem('user');
  if (!user) return null;
  try {
    const parsed = JSON.parse(user);
    // Chrisland users
    if (parsed.email === 'amaka.obi@chrisland.demo.com') return CHRISLAND_USERS.parent1;
    if (parsed.email === 'tunde.adeyemi@chrisland.demo.com') return CHRISLAND_USERS.parent2;
    if (parsed.email === 'funke.williams@chrisland.demo.com') return CHRISLAND_USERS.parent3;
    if (parsed.email === 'admin@chrisland.demo.com') return CHRISLAND_USERS.admin;
    // Riverside users
    if (parsed.email === 'bola.johnson@riverside.demo.com') return RIVERSIDE_USERS.parent1;
    if (parsed.email === 'kemi.adekunle@riverside.demo.com') return RIVERSIDE_USERS.parent2;
    if (parsed.email === 'segun.bakare@riverside.demo.com') return RIVERSIDE_USERS.parent3;
    if (parsed.email === 'admin@riverside.demo.com') return RIVERSIDE_USERS.admin;
    return null;
  } catch {
    return null;
  }
}

export function getSchoolDemoChildren() {
  const user = getSchoolDemoUser();
  if (!user) return [];
  const context = getDemoSchoolContext();
  if (context === 'chrisland') {
    return CHRISLAND_CHILDREN.filter(c => c.parent === user._id);
  }
  if (context === 'riverside') {
    return RIVERSIDE_CHILDREN.filter(c => c.parent === user._id);
  }
  return [];
}

export function getSchoolDemoSchools() {
  const user = getSchoolDemoUser();
  if (!user) return [];
  const context = getDemoSchoolContext();
  if (context === 'chrisland') {
    return CHRISLAND_SCHOOLS;
  }
  if (context === 'riverside') {
    return RIVERSIDE_SCHOOLS;
  }
  return [];
}

export function getSchoolDemoPayments() {
  const user = getSchoolDemoUser();
  if (!user) return [];
  const context = getDemoSchoolContext();
  if (context === 'chrisland') {
    return CHRISLAND_SCHEDULED_PAYMENTS.filter(p => p.parent === user._id);
  }
  if (context === 'riverside') {
    return RIVERSIDE_SCHEDULED_PAYMENTS.filter(p => p.parent === user._id);
  }
  return [];
}

export function getSchoolDemoPassphrases() {
  const context = getDemoSchoolContext();
  if (context === 'chrisland') return CHRISLAND_PASSPHRASES;
  if (context === 'riverside') return RIVERSIDE_PASSPHRASES;
  return DEMO_PASSPHRASES;
}

export function getSchoolDemoKudiCoins() {
  const context = getDemoSchoolContext();
  if (context === 'chrisland') return CHRISLAND_KUDICOINS;
  if (context === 'riverside') return RIVERSIDE_KUDICOINS;
  return DEMO_KUDICOINS;
}

// =============================================================================
// UNIFIED DEMO HELPERS (work with all school contexts)
// =============================================================================

export function isDemoMode(): boolean {
  if (typeof window === 'undefined') return false;
  const user = localStorage.getItem('user');
  if (!user) return false;
  try {
    const parsed = JSON.parse(user);
    // Check for all demo email patterns
    return parsed.email?.endsWith('@demo.com') || 
           parsed.email?.includes('greensprings.edu.ng') ||
           parsed.email?.includes('@chrisland.demo.com') ||
           parsed.email?.includes('@riverside.demo.com');
  } catch {
    return false;
  }
}

export function getDemoUser() {
  if (typeof window === 'undefined') return null;
  const user = localStorage.getItem('user');
  if (!user) return null;
  try {
    const parsed = JSON.parse(user);
    // Default demo users
    if (parsed.email === 'ada.okonkwo@demo.com') return DEMO_USERS.ada;
    if (parsed.email === 'chidi.eze@demo.com') return DEMO_USERS.chidi;
    if (parsed.email === 'admin@greensprings.edu.ng') return DEMO_USERS.admin;
    // Chrisland users
    if (parsed.email === 'amaka.obi@chrisland.demo.com') return CHRISLAND_USERS.parent1;
    if (parsed.email === 'tunde.adeyemi@chrisland.demo.com') return CHRISLAND_USERS.parent2;
    if (parsed.email === 'abubakar.sani@chrisland.demo.com') return CHRISLAND_USERS.parent4; // Abubakar (Hausa name)
    if (parsed.email === 'funke.williams@chrisland.demo.com') return CHRISLAND_USERS.parent3;
    if (parsed.email === 'admin@chrisland.demo.com') return CHRISLAND_USERS.admin;
    // Riverside users
    if (parsed.email === 'bola.johnson@riverside.demo.com') return RIVERSIDE_USERS.parent1;
    if (parsed.email === 'kemi.adekunle@riverside.demo.com') return RIVERSIDE_USERS.parent2;
    if (parsed.email === 'segun.bakare@riverside.demo.com') return RIVERSIDE_USERS.parent3;
    if (parsed.email === 'admin@riverside.demo.com') return RIVERSIDE_USERS.admin;
    return null;
  } catch {
    return null;
  }
}

export function getDemoChildren() {
  const user = getDemoUser();
  if (!user) return [];
  
  // Check which school context the user belongs to
  if (user._id.startsWith('chrisland-')) {
    return CHRISLAND_CHILDREN.filter(c => c.parent === user._id);
  }
  if (user._id.startsWith('riverside-')) {
    return RIVERSIDE_CHILDREN.filter(c => c.parent === user._id);
  }
  // Default demo users
  return DEMO_CHILDREN.filter(c => c.parent === user._id);
}

export function getDemoSchools() {
  const user = getDemoUser();
  if (!user) return [];
  
  // Check which school context the user belongs to
  if (user._id.startsWith('chrisland-')) {
    // For parents, show schools their children attend
    if (user.role === 'parent') {
      const childSchoolIds = CHRISLAND_CHILDREN
        .filter(c => c.parent === user._id)
        .map(c => c.schoolId);
      // Remove duplicates
      const uniqueSchoolIds = [...new Set(childSchoolIds)];
      return CHRISLAND_SCHOOLS.filter(s => uniqueSchoolIds.includes(s._id));
    }
    // For admin, show all schools
    return CHRISLAND_SCHOOLS;
  }
  if (user._id.startsWith('riverside-')) {
    if (user.role === 'parent') {
      const childSchoolIds = RIVERSIDE_CHILDREN
        .filter(c => c.parent === user._id)
        .map(c => c.schoolId);
      const uniqueSchoolIds = [...new Set(childSchoolIds)];
      return RIVERSIDE_SCHOOLS.filter(s => uniqueSchoolIds.includes(s._id));
    }
    return RIVERSIDE_SCHOOLS;
  }
  // Default demo users
  return DEMO_SCHOOLS.filter(s => s.createdBy === user._id);
}

export function getDemoPayments() {
  const user = getDemoUser();
  if (!user) return [];
  
  // Check which school context the user belongs to
  if (user._id.startsWith('chrisland-')) {
    return CHRISLAND_SCHEDULED_PAYMENTS.filter(p => p.parent === user._id);
  }
  if (user._id.startsWith('riverside-')) {
    return RIVERSIDE_SCHEDULED_PAYMENTS.filter(p => p.parent === user._id);
  }
  // Default demo users
  return DEMO_SCHEDULED_PAYMENTS.filter(p => p.parent === user._id);
}

export function getDemoPassphrases() {
  const user = getDemoUser();
  if (!user) return DEMO_PASSPHRASES;
  
  if (user._id.startsWith('chrisland-')) return CHRISLAND_PASSPHRASES;
  if (user._id.startsWith('riverside-')) return RIVERSIDE_PASSPHRASES;
  return DEMO_PASSPHRASES;
}

export function getDemoKudiCoins() {
  const user = getDemoUser();
  if (!user) return DEMO_KUDICOINS;
  
  if (user._id.startsWith('chrisland-')) return CHRISLAND_KUDICOINS;
  if (user._id.startsWith('riverside-')) return RIVERSIDE_KUDICOINS;
  return DEMO_KUDICOINS;
}
