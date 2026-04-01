# Authentication App

A full-stack authentication application with React frontend and MongoDB backend.

## Features
- User registration (Signup)
- User login
- Passwords securely stored in MongoDB using bcrypt

## Prerequisites
- Node.js installed
- MongoDB Atlas account (or local MongoDB)

## Project Structure
```
auth-app/
├── backend/
│   ├── models/
│   │   └── User.js         # MongoDB user model
│   ├── routes/
│   │   └── auth.js         # Authentication routes
│   ├── .env                # Environment variables
│   ├── package.json
│   └── server.js           # Express server
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── Login.js
    │   │   └── Signup.js
    │   ├── App.css
    │   ├── App.js
    │   ├── index.js
    │   └── index.css
    └── package.json
```

## Setup Instructions

### 1. Backend Setup
```
bash
cd auth-app/backend
npm install
```

### 2. Configure MongoDB Atlas
1. Create a free account at https://www.mongodb.com/cloud/atlas
2. Create a new cluster (free tier)
3. Create a database user with username and password
4. Get your connection string (Network Access > Allow Access from Anywhere)
5. Update the `.env` file with your MongoDB URI:
   
```
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxx.mongodb.net/authapp?retryWrites=true&w=majority
   
```

### 3. Frontend Setup
```
bash
cd auth-app/frontend
npm install
```

## Running the Application

### Start Backend (Terminal 1)
```
bash
cd auth-app/backend
npm start
```
Server runs on http://localhost:5000

### Start Frontend (Terminal 2)
```
bash
cd auth-app/frontend
npm start
```
App opens at http://localhost:3000

## Usage
1. Open http://localhost:3000 in your browser
2. Navigate to Signup page to create a new account
3. Use the Login page to authenticate with existing credentials
4. Users are stored in MongoDB Atlas with encrypted passwords
