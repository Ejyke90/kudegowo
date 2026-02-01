# KudiKlass

Africa's leading digital payment platform for Nigerian schools. This application enables parents to pay for school meals, trips, uniforms, and other school-related expenses seamlessly with secure, fast transactions.

## 🚀 Current Status

**✅ ACTIVE VERSION**: Next.js 16 with modern UI, complete website, and advanced feature wireframes
**📦 ARCHIVED**: Legacy React version (moved to `/archived/react-frontend-legacy`)

## 🎯 Latest Updates

### ✅ New Features (ParentPay-Inspired)
- **Smart Meal Management**: Pre-order meals, dietary preferences, balance tracking
- **Instant Messaging & Reminders**: SMS, Email, WhatsApp notifications
- **Smart Reporting & Analytics**: Real-time financial dashboards and insights
- **Flexible Payment Options**: Card, Bank Transfer, USSD, PayPoint, Auto-topup
- **Multi-Site Banking**: Centralized control for multiple school campuses
- **Interactive Wireframes**: Live feature demonstrations at `/wireframes`

### ✅ Brand Updates
- **Complete Rebranding**: Updated from "Naija Eazy Pay" to "KudiKlass"
- **Logo System**: Professional logo with variants and brand guidelines
- **Nigerian Localization**: Local payment methods, cultural adaptations

## 📁 Project Structure

```
kudiklass/
├── frontend/              # Next.js 16 - ACTIVE VERSION
│   ├── app/              # App Router pages
│   │   ├── wireframes/   # Interactive feature demonstrations
│   │   └── dashboard/    # User dashboard
│   ├── components/       # React components
│   │   ├── layout/       # Navigation, footer, sections
│   │   ├── ui/           # Reusable UI components
│   │   └── wireframes/   # Feature wireframes
│   └── package.json      # Next.js dependencies
├── backend/              # Express.js API
├── backend-nextjs/       # Next.js API routes (if needed)
├── openspec/             # Logo development and brand guidelines
│   └── changes/logo-development-plan/
├── archived/             # Archived legacy code
│   └── react-frontend-legacy/
└── README.md             # ✅ Updated documentation
```

## Features

### 🍱 Advanced Features (ParentPay-Inspired)
- **Smart Meal Management**: Weekly meal calendars, pre-ordering, allergen tracking
- **Instant Messaging**: SMS, Email, WhatsApp notifications and payment reminders
- **Smart Reporting**: Real-time analytics, revenue tracking, financial insights
- **Flexible Payments**: Card, Bank Transfer, USSD, PayPoint, Auto-topup options
- **Multi-Site Banking**: Centralized control for multiple school campuses

### 👨‍👩‍👧‍👦 Parent Features
- **User Registration & Authentication**: Secure registration and login for parents
- **Account Balance Management**: View and top up account balance
- **Payment Items**: Browse available payment items (meals, trips, uniforms, books, tuition)
- **Make Payments**: Pay for various school items using account balance
- **Transaction History**: View all past transactions
- **Profile Management**: Update personal information and children details

### 🏫 School Admin Features
- **Payment Items Management**: Create, update, and delete payment items
- **Transaction Monitoring**: Track all payments made by parents
- **Category-based Organization**: Organize items by categories (meals, trips, uniforms, etc.)
- **Multi-Site Management**: Manage multiple campuses from one dashboard

## Technology Stack

### Frontend (ACTIVE - Next.js)
- **Next.js 16** with App Router
- **React 19** with TypeScript
- **Tailwind CSS 4** for styling
- **Lucide React** for icons
- **Paystack** for payment processing

### Backend
- Node.js & Express
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- CORS enabled for API access

## 🎯 Key Features Implemented

### ✅ Complete Website
- **Navigation**: Services, Who We Help, About, Login
- **Hero Section**: Professional landing with compelling messaging
- **Services Section**: 4 core services with interactive payment
- **Who We Help**: Target audience sections
- **Footer**: Complete with links and legal information

### ✅ Payment Integration
- **Paystack Integration**: Direct SDK integration
- **Payment Modal**: Modern, responsive payment form
- **Nigerian Naira**: NGN currency support
- **Secure Processing**: Industry-standard security

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- MongoDB
- Paystack account (for payment processing)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd kudiklass
```

2. **Install dependencies**
```bash
# Frontend (Next.js)
cd frontend
npm install

# Backend
cd ../backend
npm install
```

3. **Environment Setup**
```bash
# Frontend
cp .env.example .env.local
# Add your Paystack public key

# Backend
cp .env.example .env
# Add your MongoDB URI and Paystack secret key
```

4. **Run the application**
```bash
# Frontend (Next.js)
cd frontend
npm run dev

# Backend (in separate terminal)
cd backend
npm run dev
```

5. **Access the application**
- Frontend: http://localhost:3003 (or 3000 if available)
- Backend API: http://localhost:5000
- Feature Wireframes: http://localhost:3003/wireframes

## 🎯 Feature Demonstrations

### Interactive Wireframes
Visit `/wireframes` to explore advanced features:
- **Smart Meal Management**: Nigerian meal pre-ordering system
- **Instant Messaging**: Multi-channel parent communication
- **Smart Reporting**: Real-time financial dashboards
- **Flexible Payments**: Multiple Nigerian payment methods
- **Multi-Site Banking**: Campus management system

## 💳 Payment Testing

To test the Paystack integration:

1. **Click on "Cashless Payments"** in the Services section
2. **Fill in the payment form** with test data
3. **Use Paystack test cards** for testing:
   - Card Number: `5060666666666666666`
   - CVV: `123`
   - Expiry: `09/32`
   - PIN: `3310`

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop browsers
- Tablets
- Mobile devices

## 🔧 Development

### Frontend Development
```bash
cd frontend
npm run dev      # Development server
npm run build    # Production build
npm run start    # Production server
```

### Backend Development
```bash
cd backend
npm run dev      # Development server
npm start        # Production server
```

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For support and questions, please open an issue in the repository.
