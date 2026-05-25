# Nexus

**Nexus** is a real-time matchmaking and social hub where gamers can find teammates based on rank and game, create or join active lobbies, and build gaming profiles.

This repository contains the **Full-Stack Application**, comprising a **React + Vite Frontend** and a **Node.js + Express Backend**.

## 🚀 Features

### Frontend (User Interface)
- **Stunning Gamer Aesthetic**: Dark theme optimized for gamers with neon green accents, card structures, and clean micro-animations.
- **Dynamic Dashboard**: View active lobbies from the backend dynamically.
- **Lobby Management**: Modal to create customized lobbies, selecting games, regions, and minimum player level requirements.
- **Authentication Pages**: Cleanly designed login and registration forms.
- **Responsive Layout**: Sidebar navigation and responsive layouts that adjust to different screens.

### Backend (API & Services)
- **Authentication System**: Secure registration, login, logout, and token verification using JWT (Access Tokens stored in cookies/headers) and bcryptjs.
- **Lobby Matchmaking**: Create, fetch, start, leave, and kick players from active lobbies.
- **XP Engine**: Automatically calculates earned XP for matches based on kills, deaths, wins/losses, and flags potential smurf behavior (high K/D ratios).
- **Protected Routes**: Middleware verification of JWT access tokens for secure operations.

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS v4
- **Routing**: React Router v7
- **Icons & HTTP**: Lucide React, Axios

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js (v5)
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JWT (JSON Web Tokens), bcryptjs
- **Tooling**: Nodemon (development server), Prettier

## 📂 Project Structure

```bash
Nexus/
├── backend/                  # Node.js + Express backend API
│   ├── src/
│   │   ├── controllers/      # Route controllers (auth, lobby)
│   │   ├── db/               # Database connection helper
│   │   ├── middlewares/      # Express middlewares (auth token verification)
│   │   ├── models/           # Mongoose models (User, Lobby)
│   │   ├── routes/           # API router definitions (auth, lobby, config)
│   │   ├── utils/            # Helper utils (API error/response handlers, constants, XP engine)
│   │   └── validators/       # Input validators
│   ├── .env
│   ├── app.js                # App definition and configuration (cors, express parsers)
│   └── index.js              # Server entry point
├── frontend/                 # React + Vite frontend UI
│   ├── src/
│   │   ├── api/              # Axios configuration (base URL pointing to backend)
│   │   ├── assets/           # Static asset assets
│   │   ├── components/       # Reusable components (Button, Input, LobbyCard, CreateLobbyModal)
│   │   ├── layouts/          # Page layouts (MainLayout)
│   │   ├── pages/            # View pages (Dashboard, Login, Register)
│   │   ├── App.jsx           # Routing configuration
│   │   ├── index.css         # Styling, Tailwind v4 theme, custom scrollbar
│   │   └── main.jsx          # App entry point
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
   ACCESS_TOKEN_SECRET=your_access_token_secret
   ACCESS_TOKEN_EXPIRY=1d
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

All base endpoints are prefixed with `/api/v1`.

### Configuration (`/api/v1/config`)
- `GET /constants` - Fetch supported games and regions configuration.

### Authentication (`/api/v1/users`)
- `POST /register` - Create a new user profile.
- `POST /login` - Authenticate user credentials and retrieve JWT.
- `POST /logout` - Log out current user (Protected).
- `GET /me` - Fetch active user profile (Protected).

### Lobbies (`/api/v1/lobby`)
- `GET /` - Fetch all active lobbies in `waiting` status.
- `POST /create` - Create a new lobby instance (Protected).
- `POST /leave/:lobbyId` - Leave a lobby (Protected).
- `POST /end-match` - End a match and calculate XP using the XP engine (Protected).
- `PATCH /start-match/:lobbyId` - Update lobby status to `playing` (Protected).
- `PATCH /kick` - Kick a player from a lobby (Protected).

## 🎮 Constants & Configuration

The application is preconfigured with specific game metadata and rules:
- **Supported Games**: CS2 (max 5 players), PUBG PC (max 4 players), The Finals (max 3 players), Minecraft (max 8 players).
- **Regions**: Asia, Europe, NA, Global.

---

*Designed and developed as part of a scalable, production-grade full-stack platform.*
