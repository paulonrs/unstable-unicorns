'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/lib/store/gameStore';
import { useSocket } from '@/lib/hooks/useSocket';
import { JoinGameForm } from '@/components/JoinGameForm';
import { PlayerCard } from '@/components/PlayerCard';
import { Card } from '@/components/Card';

export default function Home() {
  const { isConnected, currentPlayer, gameState, players } = useGameStore();
  const { joinGame, startGame } = useSocket();
  const [hasJoined, setHasJoined] = useState(false);

  const handleJoin = (name: string) => {
    joinGame(name);
    setHasJoined(true);
  };

  const handleStartGame = () => {
    startGame();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-pink-900">
      <div className="container mx-auto px-4 py-8">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold text-center text-white mb-8"
        >
          🦄 Unstable Unicorns 🦄
        </motion.h1>

        {!hasJoined ? (
          <div className="flex items-center justify-center min-h-[60vh]">
            <JoinGameForm onJoin={handleJoin} isConnected={isConnected} />
          </div>
        ) : (
          <div className="space-y-8">
            {/* Game Status */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white/10 backdrop-blur-md rounded-lg p-6"
            >
              <h2 className="text-2xl font-bold text-white mb-4">
                Game Lobby
              </h2>
              <div className="flex items-center justify-between">
                <div className="text-white">
                  <p>Players: {players.length}</p>
                  <p className="text-sm text-gray-300">
                    {gameState?.gameStarted
                      ? 'Game in progress'
                      : 'Waiting for players...'}
                  </p>
                </div>
                {!gameState?.gameStarted && players.length >= 2 && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleStartGame}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg"
                  >
                    Start Game
                  </motion.button>
                )}
              </div>
            </motion.div>

            {/* Players List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <AnimatePresence>
                {players.map((player) => (
                  <PlayerCard
                    key={player.id}
                    player={player}
                    isCurrentPlayer={player.id === currentPlayer?.id}
                  />
                ))}
              </AnimatePresence>
            </div>

            {/* Player's Hand */}
            {gameState?.gameStarted && currentPlayer && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/10 backdrop-blur-md rounded-lg p-6"
              >
                <h3 className="text-xl font-bold text-white mb-4">
                  Your Hand
                </h3>
                <div className="flex gap-4 overflow-x-auto pb-4">
                  {currentPlayer.hand.map((card, index) => (
                    <Card key={index} card={card} index={index} />
                  ))}
                </div>
              </motion.div>
            )}

            {/* Player's Stable */}
            {gameState?.gameStarted && currentPlayer && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/10 backdrop-blur-md rounded-lg p-6"
              >
                <h3 className="text-xl font-bold text-white mb-4">
                  Your Stable
                </h3>
                <div className="flex gap-4 overflow-x-auto pb-4">
                  {currentPlayer.stable.map((card, index) => (
                    <Card key={index} card={card} index={index} />
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

