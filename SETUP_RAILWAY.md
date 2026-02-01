# Railway Backend Setup Guide

This guide will help you set up automatic Railway deployment for your KudiKlass backend using GitHub Actions.

## 🚀 Prerequisites

1. **Railway Account**: Sign up at [railway.app](https://railway.app)
2. **GitHub Account**: For repository access
3. **MongoDB Atlas**: For production database

## 📋 Step-by-Step Setup

### 1. Create Railway Project

1. Go to [railway.app](https://railway.app) and sign in
2. Click **"New Project"** → **"Deploy from GitHub repo"**
3. Select your `kudiklass` repository
4. Choose the **backend** directory as the root

### 2. Configure Railway Service

1. In your Railway project, click on your service
2. Go to **Settings** → **Variables**
3. Add these environment variables:

```bash
NODE_ENV=production
PORT=3000
MONGODB_URI=your_mongodb_atlas_uri
JWT_SECRET=your_secure_jwt_secret
PAYSTACK_SECRET_KEY=your_paystack_secret_key
RAILWAY_ENVIRONMENT=production
```

### 3. Get Railway Credentials

1. Go to Railway Account Settings
2. Find your **API Token** (click on your profile → API Tokens)
3. Go to your project → Settings → General
4. Copy **Project ID** and **Service ID**

### 4. Set up GitHub Secrets

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Add these repository secrets:

```
RAILWAY_API_TOKEN=your_railway_api_token
RAILWAY_PROJECT_ID=your_railway_project_id
RAILWAY_SERVICE_ID=your_railway_service_id
```

### 5. MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Add your Railway IP to whitelist (0.0.0.0/0 for all IPs)
4. Create a database user
5. Get your connection string

### 6. Test the Setup

1. Push any changes to the `backend/` directory
2. GitHub Actions will automatically trigger
3. Check Railway logs for deployment status
4. Test your API at: `https://your-service-name.railway.app/api/health`

## 🔧 Configuration Files Created

### `railway.toml`
- Railway configuration file
- Defines build settings and health checks
- Sets up deployment parameters

### `.github/workflows/deploy-backend.yml`
- GitHub Actions workflow
- Triggers on backend changes
- Automatically deploys to Railway

### `backend/server.js`
- Updated health check endpoint
- Better health monitoring for Railway

## 🚨 Important Notes

### Database Name
- Updated MongoDB database name from `naijaeazypay` to `kudiklass`
- Make sure to update your MongoDB Atlas database name

### Health Check
- Railway uses `/api/health` for health monitoring
- This endpoint must return 200 status for successful deployment

### Environment Variables
- Never commit secrets to Git
- Always use Railway environment variables
- Test with Railway's built-in variable editor

## 🔄 Automatic Deployment

The GitHub Actions workflow will automatically redeploy your backend when:

- You push changes to the `backend/` directory
- You modify `railway.toml`
- You update the workflow file

## 🐛 Troubleshooting

### Common Issues

1. **Build Failures**: Check Railway build logs
2. **Database Connection**: Verify MongoDB URI and IP whitelist
3. **Environment Variables**: Ensure all secrets are set correctly
4. **Health Check**: Make sure `/api/health` returns 200 status

### Debug Commands

```bash
# Check Railway logs
railway logs

# Check service status
railway status

# Redeploy manually
railway up
```

## 📱 Testing Your Deployment

Once deployed, test these endpoints:

- Health Check: `https://your-service.railway.app/api/health`
- API Documentation: Check your route documentation
- Database Connection: Verify MongoDB connectivity

## 🎯 Next Steps

1. Set up Railway project
2. Configure environment variables
3. Add GitHub secrets
4. Test deployment with a push
5. Monitor your first automatic deployment

Your KudiKlass backend will now automatically redeploy on every push! 🚀
