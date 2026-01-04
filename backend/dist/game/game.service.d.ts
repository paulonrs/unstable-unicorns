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
export declare class GameService {
    private players;
    private gameState;
    addPlayer(id: string, name: string): Player;
    removePlayer(id: string): void;
    getPlayers(): Player[];
    startGame(): {
        success: boolean;
        gameState?: GameState;
        error?: string;
    };
    private initializeDeck;
    private shuffleDeck;
    private dealCards;
    getGameState(): GameState;
}
