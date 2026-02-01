# MongoDB Setup Guide for Naija EazyPay

The backend server is running on **port 5001**, but authentication requires a MongoDB database connection.

## Current Status

✅ Backend server running on `http://localhost:5001`  
✅ Environment files configured  
❌ MongoDB not connected (authentication won't work yet)

## Option 1: MongoDB Atlas (Recommended - Free Cloud Database)

**Easiest option - no local installation needed**

### Steps:

1. **Create MongoDB Atlas Account**
   - Go to https://www.mongodb.com/cloud/atlas/register
   - Sign up for free (no credit card required)

2. **Create a Free Cluster**
   - Click "Build a Database"
   - Select "FREE" tier (M0 Sandbox)
   - Choose a cloud provider and region (closest to Nigeria)
   - Click "Create Cluster"

3. **Set Up Database Access**
   - Go to "Database Access" in left sidebar
   - Click "Add New Database User"
   - Create username and password (save these!)
   - Set privileges to "Read and write to any database"

4. **Set Up Network Access**
   - Go to "Network Access" in left sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
   - Confirm

5. **Get Connection String**
   - Go to "Database" in left sidebar
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string (looks like: `mongodb+srv://username:<password>@cluster0.xxxxx.mongodb.net/`)

6. **Update Backend .env File**
   - Open `backend/.env`
   - Replace the MONGODB_URI line with your connection string
   - Replace `<password>` with your actual database password
   - Add database name at the end: `...mongodb.net/naijaeazypay`
   
   Example:
   ```
   MONGODB_URI=mongodb+srv://myuser:mypassword@cluster0.abc123.mongodb.net/naijaeazypay
   ```

7. **Restart Backend Server**
   - Stop the current server (Ctrl+C in terminal)
   - Run `npm start` again
   - You should see "MongoDB connected successfully"

## Option 2: Local MongoDB Installation (macOS)

**For local development without internet dependency**

### Steps:

1. **Install MongoDB using Homebrew**
   ```bash
   brew tap mongodb/brew
   brew install mongodb-community@7.0
   ```

2. **Start MongoDB Service**
   ```bash
   brew services start mongodb-community@7.0
   ```

3. **Verify MongoDB is Running**
   ```bash
   mongosh --eval "db.version()"
   ```

4. **Backend .env is Already Configured**
   - The current setting should work:
   ```
   MONGODB_URI=mongodb://localhost:27017/naijaeazypay
   ```

5. **Restart Backend Server**
   - Stop the current server
   - Run `npm start` again
   - You should see "MongoDB connected successfully"

## Verify Database Connection

After setting up MongoDB (either option), verify the connection:

1. **Check Server Logs**
   - You should see: `MongoDB connected successfully`
   - Not: `MongoDB connection error`

2. **Test Health Endpoint**
   ```bash
   curl http://localhost:5001/api/health
   ```
   Should return: `{"status":"ok","message":"Naija EazyPay API is running"}`

3. **Test Registration Endpoint**
   ```bash
   curl -X POST http://localhost:5001/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{
       "email": "test@example.com",
       "password": "testpassword123",
       "firstName": "Test",
       "lastName": "User",
       "phone": "08012345678"
     }'
   ```
   
   Should return a token and user object (not an error)

## Next Steps After MongoDB is Connected

1. ✅ Backend server running with database
2. Install frontend dependencies: `cd frontend && npm install`
3. Start frontend: `npm start` (runs on port 3000)
4. Test full authentication flow:
   - Register a new account
   - Login with credentials
   - Access dashboard

## Troubleshooting

**"MongoDB connection error: ECONNREFUSED"**
- Local MongoDB: Service not running → Start with `brew services start mongodb-community@7.0`
- Atlas: Check connection string, username, password, and network access settings

**"Authentication failed" on Atlas**
- Verify username and password are correct in connection string
- Check Database Access user has correct permissions

**"IP not whitelisted"**
- Go to Network Access in Atlas
- Add your IP or allow access from anywhere (development only)

**Server won't start**
- Check if port 5001 is available: `lsof -i :5001`
- Kill existing process if needed: `pkill -f "node server.js"`

## Current Configuration

- **Backend Port**: 5001
- **Frontend Port**: 3000 (when started)
- **API Base URL**: http://localhost:5001/api
- **Database Name**: naijaeazypay

---

**Choose one option above and follow the steps to enable authentication!**
