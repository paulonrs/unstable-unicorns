import { Injectable } from '@nestjs/common';

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

@Injectable()
export class GameService {
  private players: Map<string, Player> = new Map();
  private gameState: GameState = {
    players: [],
    currentPlayerIndex: 0,
    gameStarted: false,
    deck: [],
  };

  addPlayer(id: string, name: string): Player {
    const player: Player = {
      id,
      name,
      hand: [],
      stable: [],
    };
    this.players.set(id, player);
    this.gameState.players = Array.from(this.players.values());
    return player;
  }

  removePlayer(id: string): void {
    this.players.delete(id);
    this.gameState.players = Array.from(this.players.values());
  }

  getPlayers(): Player[] {
    return Array.from(this.players.values());
  }

  startGame(): { success: boolean; gameState?: GameState; error?: string } {
    if (this.players.size < 2) {
      return { success: false, error: 'Need at least 2 players to start' };
    }

    this.gameState.gameStarted = true;
    this.gameState.deck = this.initializeDeck();
    
    // Deal initial cards to players
    this.gameState.players.forEach((player) => {
      player.hand = this.dealCards(5);
      player.stable = [this.dealCards(1)[0]]; // Start with one baby unicorn
    });

    return { success: true, gameState: this.gameState };
  }

  private initializeDeck(): string[] {
    // Simplified deck for demo purposes
    const deck: string[] = [];
    for (let i = 0; i < 20; i++) {
      deck.push(`Card-${i}`);
    }
    return this.shuffleDeck(deck);
  }

  private shuffleDeck(deck: string[]): string[] {
    const shuffled = [...deck];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  private dealCards(count: number): string[] {
    return this.gameState.deck.splice(0, count);
  }

  getGameState(): GameState {
    return this.gameState;
  }
}
