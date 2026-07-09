<div align="center">

# FitFlow.ai <img width="40" height="40" alt="Group 1707485533" src="https://github.com/user-attachments/assets/1effbbcb-1f4a-4310-bc70-223a88c9963f" />

[![Made with React](https://img.shields.io/badge/Frontend-React%2018-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Bundler-Vite%206-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![TailwindCSS](https://img.shields.io/badge/Styling-Tailwind%20CSS-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![TensorFlow.js](https://img.shields.io/badge/AI-TensorFlow.js-FF6F00?logo=tensorflow&logoColor=white)](https://www.tensorflow.org/js)
[![MediaPipe](https://img.shields.io/badge/Pose-MediaPipe-4285F4?logo=google&logoColor=white)](https://developers.google.com/mediapipe)
[![Node.js](https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-339933?logo=node.js&logoColor=white)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/DB-MongoDB-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com)
[![License](https://img.shields.io/badge/License-MIT-black)](LICENSE)

Smart AI-powered fitness companion with real‑time pose detection, gamified progress, personalized plans, and a community leaderboard. Built for speed, accessibility, and fun. ✨

<img width="2143" height="3469" alt="Group 1707485530 (1)" src="https://github.com/user-attachments/assets/3ee4ae15-ee4e-40e7-b0d3-707b34a97198" />

</div>

## 🧭 Table of Contents

- [Highlights](#-highlights)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Features](#-features)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Environment Variables](#environment-variables)
  - [Install & Run](#install--run)
- [Available Pages](#-available-pages)
- [API Overview](#-api-overview)
- [Folder Structure](#-folder-structure)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)

---

## 🌟 Highlights

- 💡 **Personalized Workouts**: Tailored exercise routines and desk‑friendly movements
- 🎥 **Real‑time Pose Coaching**: MediaPipe + TensorFlow.js guidance via your webcam
- 🧠 **AI Insights**: Hydration nudges, habit tracking, and daily goals
- 🧑‍🤝‍🧑 **Community & Leaderboard**: Stay motivated with friendly competition
- 🗂️ **Kanban Productivity**: Plan health tasks with a drag‑and‑drop board
- 🔐 **Auth & Profiles**: JWT auth, user profiles, achievements and badges

> Judges: jump to "Getting Started" to run the project quickly.

---

## 🏗️ Architecture

<img width="798" height="477" alt="Screenshot 2025-09-07 162708" src="https://github.com/user-attachments/assets/df717d5c-140f-41db-a3d9-a4ee9c5986e3" />

<img width="798" alt="shapes at 25-05-02 08 43 22" src="https://github.com/user-attachments/assets/77ce0c54-825c-4d88-ac6e-13118722ef08" />

---

## 🧰 Tech Stack

- ⚛️ React 18, React Router
- ⚡ Vite, ESLint, Tailwind CSS
- 🧠 TensorFlow.js, MediaPipe Pose
- 🔥 Firebase (client SDK)
- 🟩 Node.js, Express
- 🍃 MongoDB, Mongoose

---

## ✅ Features

- 👤 Sign up, sign in, and profiles
- 🏋️ Exercise flows: pushup, pullup, lunges, squats, shoulder press, bicep curls, front raises, high knees, morning routine
- 💻 Desk exercises: hand, curls, knee raises
- 🧃 Hydration break alerts
- 🗺️ Personalized plan suggestions
- 🧱 Kanban task board (drag‑and‑drop)
- 🏆 Leaderboard and badges
- 🎪 Events and community space

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- MongoDB Atlas (or local MongoDB)
- A modern browser with webcam access (for pose features)

### Environment Variables

Create `server/.env` with:

```
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>/<db>?retryWrites=true&w=majority
PORT=8080
JWT_SECRET=change_this_secret
```

Firebase config for the client is read from `client/src/components/firebaseConfig.jsx`. Ensure your keys are set there if required.

### Install & Run

Open two terminals or use a multiplexer. Commands are Windows‑friendly.

1) Backend (Express + MongoDB)

```bash
cd server
npm install
npm start
# Server listens on http://localhost:8080 by default
```

2) Frontend (Vite + React)

```bash
cd client
npm install
npm run dev
# App runs on http://localhost:5173 by default
```

---

## 🗺️ Available Pages

- `/` Landing page
- `/login`, `/signup` Auth
- `/dashboard` Overview widgets + quick links
- `/exercise` Exercise hub
- `/exercise/pushup` (and similar for others)
- `/personalized` PersonalizedExercise
- `/kanban` KanbanFlow
- `/leaderboard` Leaderboard
- `/community` Community
- `/diet` DietPlan
- `/event` Event
- `/profile` Profile

---

## 🔌 API Overview

Base URL: `http://localhost:8080/api`

- `POST /auth` Authentication routes (login/register)
- `GET/POST/PUT/DELETE /tasks` Task CRUD for the Kanban board
- `GET /users/:id` User profile and stats

See `server/routes/` and `server/controllers/` for details.

---

## 🗂️ Folder Structure

```
FitFlow.ai-master/
├─ client/
│  ├─ public/                # Static assets (gifs, images)
│  ├─ src/
│  │  ├─ components/         # UI and auth components
│  │  ├─ pages/               # Feature pages (Exercise, Kanban, etc.)
│  │  ├─ lp/                  # Landing page sub-app
│  │  └─ data/                # Data helpers
│  └─ package.json
└─ server/
   ├─ config/db.js           # Mongo connection (uses MONGO_URI)
   ├─ controllers/           # Route handlers
   ├─ models/                # Mongoose schemas
   ├─ routes/                # Express routers
   ├─ server.js              # App entrypoint
   └─ package.json
```

---

## 🛠️ Troubleshooting

- 🧩 Pose not detected: ensure camera permission is granted and page is served over `http://localhost`.
- 🔑 Auth errors: verify Firebase config and server `JWT_SECRET`.
- 🌿 DB not connecting: double‑check `MONGO_URI` and network IP allowlist on MongoDB Atlas.
- 🧵 CORS issues: server enables CORS; ensure frontend uses the correct base URL.

---

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or PRs. Please keep code readable and consistent, and add clear descriptions to changes.

---

<div align="center">

Built with ❤️, caffeine ☕, and lots of reps 🏋️ by the PixelForce team.

</div>
