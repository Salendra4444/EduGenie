# EduGenie Deployment Guide

## Architecture Overview
- **Frontend**: React app (deployed on Vercel)
- **Backend**: Node.js/Express API (deployed separately)
- **Database**: MongoDB Atlas (cloud hosted)

---

## Step 1: Deploy Frontend to Vercel

### Prerequisites
- Vercel account (free at vercel.com)
- GitHub account (repository connected)

### Deployment Steps

1. **Connect Repository to Vercel**
   ```bash
   npm install -g vercel
   vercel login
   ```

2. **Deploy from Root Directory**
   ```bash
   vercel
   ```
   
   When prompted:
   - Project name: `edugenie`
   - Framework: Select **Create React App**
   - Build command: `cd frontend && npm install && npm run build`
   - Output directory: `frontend/build`
   - Install command: `npm install`

3. **Set Environment Variables in Vercel Dashboard**
   - Go to Project Settings → Environment Variables
   - Add:
     - `REACT_APP_API_URL`: `https://your-backend-url.com` (update after backend deployment)

---

## Step 2: Deploy Backend (Choose One)

### Option A: Railway (Recommended - $5/month free tier)

1. Go to railway.app and sign in with GitHub
2. Click "New Project" → "Deploy from GitHub repo"
3. Select this repository
4. Configure:
   - **Root Directory**: `backend`
   - **Start Command**: `npm start`
   - **Environment Variables**:
     - `MONGO_URI`: Your MongoDB Atlas connection string
     - `PORT`: `3000`
     - `NODE_ENV`: `production`
     - `FRONTEND_URL`: Your Vercel frontend URL

5. Railway will auto-generate a URL. Copy it.

### Option B: Render (Free tier with limitations)

1. Go to render.com
2. Click "New +" → "Web Service"
3. Connect GitHub repo
4. Configure:
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment Variables**: Same as Railway

### Option C: AWS Lambda (Serverless)

1. Use AWS SAM or Serverless framework
2. Convert backend to AWS Lambda-compatible format (more complex)

---

## Step 3: Update Frontend API URL

1. After backend deployment, get the production URL
2. In Vercel Dashboard → Settings → Environment Variables
3. Update `REACT_APP_API_URL` to your backend URL
4. Vercel will auto-redeploy

---

## Step 4: Configure CORS in Backend

Update `backend/server.js`:

```javascript
const cors = require('cors');

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
```

---

## Step 5: MongoDB Atlas Setup

1. Go to mongodb.com/cloud/atlas
2. Create free cluster
3. Create database user
4. Whitelist your backend server IP (or 0.0.0.0 for any IP)
5. Copy connection string: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/edugenie?retryWrites=true&w=majority`
6. Add to backend environment variables

---

## Production Checklist

- [ ] All environment variables configured in Vercel
- [ ] MongoDB Atlas whitelist includes backend server IP
- [ ] CORS configured with production URLs
- [ ] Frontend API URL points to production backend
- [ ] Backend PORT set correctly in deployment platform
- [ ] `.env` files NOT committed to git (check .gitignore)
- [ ] Error handling implemented (try-catch blocks)
- [ ] Sensitive data in environment variables only
- [ ] Database backups configured
- [ ] HTTPS enforced

---

## Troubleshooting

### Frontend builds but shows API errors
- Check `REACT_APP_API_URL` environment variable
- Verify backend is running and accessible
- Check browser console for CORS errors
- Ensure backend FRONTEND_URL matches your Vercel domain

### MongoDB connection timeout
- Whitelist your backend server IP in MongoDB Atlas
- Verify MONGO_URI is correct
- Check network connectivity

### Backend won't start
- Verify all environment variables are set
- Check `backend/package.json` has correct start script
- Run `npm install` before starting
- Check Node.js version compatibility (use Node 18+)

---

## Local Development

```bash
# Terminal 1 - Backend
cd backend
npm install
npm start

# Terminal 2 - Frontend
cd frontend
npm install
npm start

# Access at http://localhost:3000
```

---

## Security Notes

⚠️ **IMPORTANT:**
- Never commit `.env` files
- Use environment variables for all secrets
- Enable 2FA on MongoDB Atlas
- Regularly rotate credentials
- Use HTTPS only in production
- Implement rate limiting on API routes
- Validate all user inputs on backend
- Keep dependencies updated: `npm audit fix`

---

## Next Steps for EduGenie RAG Features

Since this is supposed to be a RAG (Retrieval-Augmented Generation) platform:

1. Add OpenAI/Hugging Face API integration
2. Implement document upload and storage (AWS S3 or similar)
3. Add vector database (Pinecone, Weaviate, or Milvus)
4. Implement RAG pipeline for summaries/quizzes
5. Add authentication middleware
6. Implement rate limiting for API calls

---

**Questions?** Check Vercel docs: https://vercel.com/docs
