'use client';

import { motion } from 'framer-motion';

interface CardProps {
  card: string;
  index: number;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ card, index, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.05, y: -10 }}
      className="relative w-32 h-44 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg shadow-lg cursor-pointer overflow-hidden"
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
      <div className="relative h-full flex flex-col items-center justify-center p-4">
        <div className="text-white text-center font-bold text-sm">
          {card}
        </div>
      </div>
      <div className="absolute top-2 left-2 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
        <span className="text-white text-xs font-bold">🦄</span>
      </div>
    </motion.div>
  );
};
