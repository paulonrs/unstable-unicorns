# Unstable Unicorns

A multiplayer card game built with modern web technologies.

## Project Structure

This repository contains two applications:

### Backend (`/backend`)
- **Framework**: NestJS
- **Language**: TypeScript
- **WebSocket**: Socket.IO (server)
- **Features**: 
  - Dependency injection
  - Scalable architecture
  - Real-time game communication
  - Game state management

### Frontend (`/frontend`)
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Animations**: Framer Motion
- **WebSocket**: Socket.IO (client)

## Getting Started

### Prerequisites
- Node.js 18+ and npm

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Run in development mode:
```bash
npm run start:dev
```

The backend server will start on `http://localhost:3001`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file (or copy from `.env.example`):
```bash
cp .env.example .env.local
```

4. Run in development mode:
```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

## Development

### Running Both Applications

You'll need two terminal windows:

**Terminal 1 - Backend:**
```bash
cd backend
npm run start:dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Building for Production

**Backend:**
```bash
cd backend
npm run build
npm run start:prod
```

**Frontend:**
```bash
cd frontend
npm run build
npm start
```

## Tech Stack

### Backend
- NestJS - Progressive Node.js framework
- TypeScript - Type-safe JavaScript
- Socket.IO - Real-time bidirectional communication
- Dependency Injection - Built-in DI container

### Frontend
- Next.js 14+ - React framework with App Router
- TypeScript - Type-safe development
- Tailwind CSS - Utility-first CSS framework
- Zustand - Lightweight state management
- Framer Motion - Animation library
- Socket.IO Client - Real-time communication

## Architecture

The application follows a client-server architecture:

- **Backend**: Handles game logic, player management, and real-time communication via WebSockets
- **Frontend**: Provides an interactive UI for players to join games, play cards, and see game state updates in real-time

Game state is managed on the server and synchronized to all connected clients through Socket.IO events.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
