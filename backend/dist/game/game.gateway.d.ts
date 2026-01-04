import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { GameService } from './game.service';
export declare class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly gameService;
    server: Server;
    constructor(gameService: GameService);
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    handleJoinGame(data: {
        playerName: string;
    }, client: Socket): {
        success: boolean;
        player: import("./game.service").Player;
    };
    handleGetPlayers(): import("./game.service").Player[];
    handleStartGame(client: Socket): {
        success: boolean;
        gameState?: import("./game.service").GameState;
        error?: string;
    };
}
