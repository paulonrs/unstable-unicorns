'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface JoinGameFormProps {
  onJoin: (name: string) => void;
  isConnected: boolean;
}

export const JoinGameForm: React.FC<JoinGameFormProps> = ({
  onJoin,
  isConnected,
}) => {
  const [playerName, setPlayerName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (playerName.trim()) {
      onJoin(playerName.trim());
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full"
    >
      <h2 className="text-3xl font-bold text-center mb-6 text-purple-600">
        Unstable Unicorns
      </h2>
      <div className="mb-4 text-center">
        <span
          className={`inline-block w-3 h-3 rounded-full mr-2 ${
            isConnected ? 'bg-green-500' : 'bg-red-500'
          }`}
        />
        <span className="text-sm text-gray-600">
          {isConnected ? 'Connected' : 'Disconnected'}
        </span>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label
            htmlFor="playerName"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Enter your name
          </label>
          <input
            id="playerName"
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800"
            placeholder="Your name"
            disabled={!isConnected}
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={!isConnected || !playerName.trim()}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-4 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Join Game
        </motion.button>
      </form>
    </motion.div>
  );
};
