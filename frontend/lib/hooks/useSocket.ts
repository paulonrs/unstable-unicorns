'use client';

import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useGameStore } from '../store/gameStore';

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001';

export const useSocket = () => {
  const socketRef = useRef<Socket | null>(null);
  const {
    setIsConnected,
    setCurrentPlayer,
    setGameState,
    setPlayers,
  } = useGameStore();

  useEffect(() => {
    // Initialize socket connection
    socketRef.current = io(SOCKET_URL, {
      transports: ['websocket', 'polling'],
    });

    const socket = socketRef.current;

    // Connection event handlers
    socket.on('connect', () => {
      console.log('Connected to server');
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
      setIsConnected(false);
    });

    socket.on('connected', (data) => {
      console.log('Server message:', data.message);
    });

    socket.on('playerJoined', (player) => {
      console.log('Player joined:', player);
      setCurrentPlayer(player);
    });

    socket.on('playersUpdated', (players) => {
      console.log('Players updated:', players);
      setPlayers(players);
    });

    socket.on('gameStarted', (gameState) => {
      console.log('Game started:', gameState);
      setGameState(gameState);
    });

    // Cleanup on unmount
    return () => {
      if (socket) {
        socket.removeAllListeners();
        socket.disconnect();
      }
    };
  }, [setIsConnected, setCurrentPlayer, setGameState, setPlayers]);

  const joinGame = (playerName: string) => {
    if (socketRef.current) {
      socketRef.current.emit('joinGame', { playerName });
    }
  };

  const startGame = () => {
    if (socketRef.current) {
      socketRef.current.emit('startGame');
    }
  };

  const getPlayers = () => {
    if (socketRef.current) {
      socketRef.current.emit('getPlayers');
    }
  };

  return {
    socket: socketRef.current,
    joinGame,
    startGame,
    getPlayers,
  };
};
