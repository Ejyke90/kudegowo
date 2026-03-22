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
    parent: null, // For admin view, no parent assignment
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
    parent: null, // For admin view, no parent assignment
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

// --- Helper to check if in demo mode ---
export function isDemoMode(): boolean {
  if (typeof window === 'undefined') return false;
  const user = localStorage.getItem('user');
  if (!user) return false;
  try {
    const parsed = JSON.parse(user);
    return parsed.email?.endsWith('@demo.com') || parsed.email?.includes('greensprings.edu.ng');
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
    if (parsed.email === 'ada.okonkwo@demo.com') return DEMO_USERS.ada;
    if (parsed.email === 'chidi.eze@demo.com') return DEMO_USERS.chidi;
    if (parsed.email === 'admin@greensprings.edu.ng') return DEMO_USERS.admin;
    return null;
  } catch {
    return null;
  }
}

export function getDemoChildren() {
  const user = getDemoUser();
  if (!user) return [];
  return DEMO_CHILDREN.filter(c => c.parent === user._id);
}

export function getDemoSchools() {
  const user = getDemoUser();
  if (!user) return [];
  return DEMO_SCHOOLS.filter(s => s.createdBy === user._id);
}

export function getDemoPayments() {
  const user = getDemoUser();
  if (!user) return [];
  return DEMO_SCHEDULED_PAYMENTS.filter(p => p.parent === user._id);
}
