# Nexus

**Nexus** is a real-time matchmaking and social hub where gamers can find teammates based on rank and game, create or join active lobbies, communicate instantly, and build persistent gaming profiles.

This repository contains the **Full-Stack Application**, comprising a **React + Vite Frontend** and a **Node.js + Express Backend**.

## 🚀 Features

### Frontend (User Interface)
- **Stunning Gamer Aesthetic**: Dark theme optimized for gamers with vibrant accents, glassmorphism elements, and smooth micro-animations.
- **Dynamic Dashboard**: View active lobbies, filter by game/rank, and see live player counts.
- **Lobby Management**: Intuitive modals to create customized lobbies (level requirements, private/public, region).
- **Authentication Pages**: Beautifully designed login and registration forms with validation.
- **Responsive Layout**: Sidebar navigation and responsive layouts that look great on any screen.

### Backend (API & Services)
- **Authentication System**: Secure registration, login, logout, and profile management using JWT and bcrypt.
- **Lobby Matchmaking**: Create, join, leave, and filter active lobbies by game, rank, or region. Includes robust logic to prevent race conditions during atomic join operations.
- **Real-Time Communication**: Socket.io integration for live lobby updates, instant player count synchronization, and real-time lobby closing.
- **Gamer Profiles**: Users can link multiple gaming profiles (e.g., CS2, Minecraft, BGMI), display ranks, add avatars, and show online status.
- **Security**: Password hashing, protected routes, rate limiting, MongoDB sanitization, input validation, and CORS configuration.

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS v4
- **Routing**: React Router v7
- **Icons & HTTP**: Lucide React, Axios

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JWT (JSON Web Tokens), bcryptjs
- **Real-time**: Socket.io

## 📂 Project Structure

```bash
Nexus/
├── backend/           # Node.js + Express backend API
│   ├── src/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   └── utils/
│   ├── .env
│   └── index.js
├── frontend/          # React + Vite frontend UI
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── pages/
│   │   └── App.jsx
│   ├── vite.config.js
│   └── package.json
└── README.md
```

## ⚙️ Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- MongoDB (Local instance or MongoDB Atlas cluster)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables. Create a `.env` file in the `backend` directory:
   ```env
   PORT=8000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   CORS_ORIGIN=http://localhost:5173
   ```
4. Start the backend development server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm run dev
   ```
   *The frontend will start on `http://localhost:5173`.*

## 🔗 API Routes (Backend)

### Authentication (`/api/auth` or `/api/users`)
- `POST /register` - Create a new account
- `POST /login` - Validate credentials and receive token
- `POST /logout` - Clear authentication token
- `GET /profile` - Fetch current user profile

### Lobbies (`/api/lobbies`)
- `GET /` - Fetch active lobbies
- `POST /create` - Create a new lobby
- `POST /:id/join` - Join an active lobby
- `POST /:id/leave` - Leave a lobby
- `DELETE /:id` - Delete a lobby

## 🏗️ Architecture Highlights

Nexus demonstrates production-grade engineering practices:
- **Full-Stack Separation**: Decoupled frontend and backend for independent scaling and development.
- **Scalable Backend Architecture**: Modular file structure separating concerns (routes, controllers, models, services).
- **Concurrency Handling**: Usage of atomic operations (like `$push` and `$expr`) in MongoDB to prevent race conditions when users join lobbies.
- **Modern UI Patterns**: Utilization of the latest React features and modern CSS practices with Tailwind CSS v4.

---

*Designed and developed as part of a scalable, production-grade full-stack platform.*
