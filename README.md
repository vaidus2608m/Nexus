# Nexus Backend

**Nexus** is a real-time matchmaking and social hub where gamers can find teammates based on rank and game, create or join active lobbies, communicate instantly, and build persistent gaming profiles.

This repository contains the **Backend API** built using Node.js, Express, and MongoDB.

## 🚀 Features

- **Authentication System**: Secure registration, login, logout, and profile management using JWT and bcrypt.
- **Lobby Matchmaking**: Create, join, leave, and filter active lobbies by game, rank, or region. Includes robust logic to prevent race conditions during atomic join operations.
- **Real-Time Communication**: Socket.io integration for live lobby updates, instant player count synchronization, and real-time lobby closing.
- **Gamer Profiles**: Users can link multiple gaming profiles (e.g., CS2, Minecraft, BGMI), display ranks, add avatars, and show online status.
- **Security**: Password hashing, protected routes, rate limiting, MongoDB sanitization, input validation, and CORS configuration.

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JWT (JSON Web Tokens), bcryptjs
- **Real-time**: Socket.io (planning/integration)
- **Utilities**: dotenv, cors, cookie-parser, axios, express-validator

## 📂 Project Structure

```bash
Nexus/
├── src/
│   ├── controllers/   # Route controllers (req, res handling)
│   ├── middlewares/   # Custom middlewares (auth, validation)
│   ├── models/        # Mongoose database schemas
│   ├── routes/        # Express API routes definition
│   ├── utils/         # Helper functions and utilities
│   └── ...
├── PRD/               # Project Requirement Documents
├── index.js           # Application entry point
├── app.js             # Express app setup and middleware configuration
└── .env               # Environment variables
```

## ⚙️ Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (Local instance or MongoDB Atlas cluster)

### Installation

1. Clone the repository and navigate into the directory.
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Set up the environment variables. Create a `.env` file in the root directory and add the following:
   ```env
   PORT=8000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
   *The server will start using `nodemon` on the specified port.*

## 🔗 API Routes

### Authentication (`/api/auth` or `/api/users`)
- `POST /register` - Create a new account
- `POST /login` - Validate credentials and receive token
- `POST /logout` - Clear authentication token
- `GET /profile` - Fetch current user profile
- `PUT /profile/update` - Update user profile information

### Lobbies (`/api/lobbies`) - *Based on PRD Specs*
- `GET /` - Fetch active lobbies
- `POST /create` - Create a new lobby
- `POST /:id/join` - Join an active lobby
- `POST /:id/leave` - Leave a lobby
- `DELETE /:id` - Delete a lobby

## 🏗️ Architecture Highlights

Nexus backend demonstrates production-grade engineering practices:
- **Scalable Architecture**: Modular file structure separating concerns (routes, controllers, models, services).
- **Concurrency Handling**: Usage of atomic operations (like `$push` and `$expr`) in MongoDB to prevent race conditions when users join lobbies.
- **Clean Code**: Adherence to standard code styles (using Prettier).

---

*Designed and developed as part of a scalable, production-grade full-stack platform.*
