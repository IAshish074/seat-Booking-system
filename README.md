# Seat Booking System (MERN Stack)

This project contains both the frontend (React) and backend (Node.js/Express) for the Seat Booking System.

## Prerequisites for running on a new PC
Before you start, make sure you have the following installed on your machine:
1. **Node.js**: Download and install from https://nodejs.org/ (LTS version is recommended)
2. **MongoDB**: Download and install MongoDB Community Server from https://www.mongodb.com/try/download/community. Ensure the MongoDB service is running in the background.

---

## 🚀 How to Run the Project

Since you copied this folder to a new PC, you **must** install the dependencies first. Do not just try to run it immediately.

### Step 1: Start the Backend server

1. Open a terminal and navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install the backend dependencies:
   ```bash
   npm install
   ```
3. Start the backend server:
   ```bash
   node server.js
   ```
   *(You should see "MongoDB Connected..." and "Server started on port 5000" in the console)*

### Step 2: Start the Frontend React App

1. Open a **new, separate terminal** and navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install the frontend dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   *(This will start the Vite server, usually on `http://localhost:5173` or similar. Open that link in your browser!)*

---

## Troubleshooting common errors:
- **"Cannot find module X" or "vite is not recognized"**: You forgot to run `npm install` in that specific folder (`backend` or `frontend`).
- **"MongoTimeoutError" or "ECONNREFUSED 127.0.0.1:27017"**: Your MongoDB is not installed or not running. Make sure MongoDB service is active.
- **Port already in use**: If port 5000 or 5173 is in use, close any other servers or terminals running Node apps.
# seat-Booking-system
