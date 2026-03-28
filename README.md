# Vue.js Todo List App

A Todo List app built with **Vue 3** + **Express** + **SQLite** for my web development tutorial assignment.

## What's in this project

- **Frontend**: Vue 3 with Vue Router, Pinia, and TypeScript
- **Backend**: Express with TypeScript
- **Database**: SQLite

## How to run

Make sure you have [Node.js](https://nodejs.org/) (v18+) installed.

**1. Start the backend**

```bash
cd server
npm install
npm run dev
```

**2. Start the frontend** (open a new terminal)

```bash
cd client
npm install
npm run dev
```

Then open `http://localhost:5173` in your browser.

## How this project was created

The frontend was created using:

```bash
npm create vue@latest
```

When prompted for the project name, enter `client`. I selected TypeScript, Vue Router, and Pinia.

The backend was set up manually with Express and better-sqlite3.

## Project structure

```
client/src/
├── components/    # Reusable components (TodoItem)
├── views/         # Pages (Home, About)
├── stores/        # Pinia store (todos)
├── router/        # Vue Router config
├── App.vue        # Root component
└── main.ts        # Entry point

server/src/
├── routes/        # API routes
├── db.ts          # SQLite setup
└── server.ts      # Express server
```

