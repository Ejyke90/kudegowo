# Naija EazyPay

A school payment platform similar to ParentPay, built for Nigerian schools. This application enables parents to pay for school meals, trips, uniforms, and other school-related expenses seamlessly.

## Features

### Parent Features
- **User Registration & Authentication**: Secure registration and login for parents
- **Account Balance Management**: View and top up account balance
- **Payment Items**: Browse available payment items (meals, trips, uniforms, books, tuition)
- **Make Payments**: Pay for various school items using account balance
- **Transaction History**: View all past transactions
- **Profile Management**: Update personal information and children details

### School Admin Features
- **Payment Items Management**: Create, update, and delete payment items
- **Transaction Monitoring**: Track all payments made by parents
- **Category-based Organization**: Organize items by categories (meals, trips, uniforms, etc.)

## Technology Stack

### Backend
- Node.js & Express
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- CORS enabled for API access

### Frontend
- React.js
- React Router for navigation
- Axios for API calls
- Context API for state management
- Modern CSS with responsive design

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Ejyke90/naija-eazy-pay.git
cd naija-eazy-pay
```

2. Set up the backend:
```bash
cd backend
npm install
```

3. Create a `.env` file in the backend directory:
```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/naija-eazypay
JWT_SECRET=your_jwt_secret_key_here
PAYSTACK_SECRET_KEY=your_paystack_secret_key
```

5. Set up the frontend:
```bash
cd ../frontend
npm install
```

6. Create a `.env` file in the frontend directory:
```
REACT_APP_API_URL=http://localhost:5000/api
```

### Running the Application

1. Start MongoDB (if running locally):
```bash
mongod
```

2. Start the backend server:
```bash
cd backend
npm start
```

The backend will run on `http://localhost:5000`

3. Start the frontend development server:
```bash
cd frontend
npm start
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/balance` - Get user balance

### Payment Items
- `GET /api/items` - Get all payment items
- `GET /api/items/:id` - Get single payment item
- `POST /api/items` - Create payment item (admin only)
- `PUT /api/items/:id` - Update payment item (admin only)
- `DELETE /api/items/:id` - Delete payment item (admin only)

### Payments
- `GET /api/payments` - Get user transactions
- `POST /api/payments/pay` - Make a payment
- `POST /api/payments/topup` - Top up account balance
- `GET /api/payments/:id` - Get transaction by ID

## Usage Guide

### For Parents

1. **Register**: Create an account with your email and personal details
2. **Login**: Access your dashboard using your credentials
3. **Top Up**: Add funds to your account balance
4. **Browse Items**: View available payment items for your school
5. **Make Payments**: Pay for items directly from your balance
6. **Track Transactions**: Monitor all your payment history

### For School Admins

1. **Register**: Create an account with role "School Admin"
2. **Login**: Access the admin dashboard
3. **Add Payment Items**: Create new payment items with categories and amounts
4. **Manage Items**: Update or deactivate payment items as needed
5. **Monitor Payments**: Track all transactions made by parents

## Project Structure

```
naija-eazy-pay/
├── backend/
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   ├── PaymentItem.js
│   │   └── Transaction.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── users.js
│   │   ├── items.js
│   │   └── payments.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   └── PrivateRoute.js
│   │   ├── contexts/
│   │   │   └── AuthContext.js
│   │   ├── pages/
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Dashboard.js
│   │   │   ├── Auth.css
│   │   │   └── Dashboard.css
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── README.md
```

## Future Enhancements

- Payment gateway integration (Paystack, Flutterwave)
- Email notifications for transactions
- PDF receipt generation
- Admin analytics dashboard
- Mobile app (React Native)
- SMS notifications
- Bulk payment options
- Parent-child account linking
- School event management
- Report cards and academic records

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the ISC License.

## Support

For support, email support@naijaeazypay.com or create an issue in the repository.
