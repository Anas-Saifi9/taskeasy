# TaskEasy 🚀

A modern, full-stack task management application built with React, Node.js, and MongoDB.

**Developer:** Anas Saifi  
**GitHub:** [Anas-Saifi9](https://github.com/Anas-Saifi9)

## Features

- ✅ Smart Task Management (create, edit, delete, complete)
- 📋 Kanban Board & List Views
- 📊 Dashboard Analytics
- 🗂️ Category Management (default + custom)
- 🔐 JWT Authentication & User Isolation
- 📱 Fully Mobile Responsive
- 🗄️ Task Archiving
- 🎯 Priority System (low, medium, high)
- 📅 Due Date Tracking

## Tech Stack

**Frontend:** React 19, Vite, Tailwind CSS, Radix UI, React Router, Axios  
**Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT, bcryptjs

## Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (or local MongoDB)

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/Anas-Saifi9/taskeasy.git
cd taskeasy
```

2. **Setup Server**
```bash
cd server
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
npm run dev
```

3. **Setup Client**
```bash
cd client
npm install
cp .env.example .env
# Edit .env: VITE_API_URL=http://localhost:8000/api
npm run dev
```

4. Open `http://localhost:5173` in your browser.

## Environment Variables

### Server (`server/.env`)
```
PORT=8000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_secret_key
```

### Client (`client/.env`)
```
VITE_API_URL=http://localhost:8000/api
```

## Project Structure

```
taskEasy/
├── client/               # React frontend
│   ├── src/
│   │   ├── components/   # UI components
│   │   ├── pages/        # Page components
│   │   └── lib/          # Utilities & API
│   └── package.json
├── server/               # Express backend
│   ├── src/
│   │   ├── controllers/  # Route handlers
│   │   ├── models/       # Mongoose models
│   │   ├── routes/       # API routes
│   │   ├── middleware/   # Auth middleware
│   │   └── db/           # Database connection
│   └── package.json
└── README.md
```


