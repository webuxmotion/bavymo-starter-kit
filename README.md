# BAVYMO Starter Kit

A full-stack starter kit for building modern web applications with:

- **Frontend**: React + TypeScript + Zustand + Vite + Socket.IO client
- **Backend**: Express + TypeScript + Socket.IO server
- **Utilities**: CORS handling, static frontend serving, personal code generator

---

## Project Structure

```
bavymo-starter-kit/
├─ frontend/           # React + TypeScript frontend
├─ backend/            # Express + TypeScript backend
├─ package.json        # Root package.json (runs frontend + backend)
├─ README.md           # This file
```

---

## Features

### Frontend

- React 19 + TypeScript
- Zustand for state management
- Vite for fast development & build
- WebSocket client using Socket.IO
- Environment variables support (`.env` file)
- SPA routing with fallback to `index.html`
- Personal code generator integration from backend API

### Backend

- Express 5 + TypeScript
- API routing under `/api`
- WebSocket server using Socket.IO
- Dynamic CORS with multiple allowed origins
- Static frontend serving for production
- Personal code generator utility

---

## Installation

From the root of the project:

```bash
# Install root dependencies
npm install

# Install frontend dependencies
npm install --prefix frontend

# Install backend dependencies
npm install --prefix backend
```

## Development

```bash
# Run both frontend and backend in development
npm run dev
```

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend API: [http://localhost:3000/api](http://localhost:3000/api)
- WebSocket: ws\://localhost:3000

## Build

```bash
npm run build
```

- Builds both frontend and backend for production

## Start Production Server

```bash
npm start
```

- Serves frontend and backend with production settings

## Environment Variables

### Frontend `.env`

```
VITE_API_URL=http://localhost:3000/api
VITE_SOCKET_URL=http://localhost:3000
```

### Backend `.env`

- Add if needed for custom configuration (like PORT)

---

## API Endpoints

- `GET /api/generate-personal-code` - returns a new personal code

## WebSocket Events

- Connect: logs client connection
- Disconnect: logs client disconnection
- `message` event: send message to server
- `reply` event: server replies back

---

## Utilities

- `useCors(app)` - applies dynamic CORS for allowed origins
- `useStaticFrontend(app)` - serves static frontend in production
- `generateWord()` - utility to generate random personal codes

