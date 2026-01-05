import { create } from 'zustand';

export interface Player {
  id: string;
  name: string;
  hand: string[];
  stable: string[];
}

export interface GameState {
  players: Player[];
  currentPlayerIndex: number;
  gameStarted: boolean;
  deck: string[];
}

interface GameStore {
  // Connection state
  isConnected: boolean;
  setIsConnected: (connected: boolean) => void;

  // Player state
  currentPlayer: Player | null;
  setCurrentPlayer: (player: Player) => void;

  // Game state
  gameState: GameState | null;
  setGameState: (state: GameState) => void;

  // Players list
  players: Player[];
  setPlayers: (players: Player[]) => void;

  // Actions
  reset: () => void;
}

export const useGameStore = create<GameStore>((set) => ({
  isConnected: false,
  setIsConnected: (connected) => set({ isConnected: connected }),

  currentPlayer: null,
  setCurrentPlayer: (player) => set({ currentPlayer: player }),

  gameState: null,
  setGameState: (state) => set({ gameState: state }),

  players: [],
  setPlayers: (players) => set({ players }),

  reset: () =>
    set({
      isConnected: false,
      currentPlayer: null,
      gameState: null,
      players: [],
    }),
}));
