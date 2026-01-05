'use client';

import { motion } from 'framer-motion';
import { Player } from '@/lib/store/gameStore';

interface PlayerCardProps {
  player: Player;
  isCurrentPlayer?: boolean;
}

export const PlayerCard: React.FC<PlayerCardProps> = ({
  player,
  isCurrentPlayer = false,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`p-4 rounded-lg shadow-md ${
        isCurrentPlayer
          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
          : 'bg-white text-gray-800'
      }`}
    >
      <h3 className="text-lg font-bold mb-2">{player.name}</h3>
      <div className="text-sm">
        <p>Cards in hand: {player.hand?.length || 0}</p>
        <p>Unicorns in stable: {player.stable?.length || 0}</p>
      </div>
    </motion.div>
  );
};
