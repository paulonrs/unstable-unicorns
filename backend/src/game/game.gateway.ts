import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Injectable } from '@nestjs/common';
import { GameService } from './game.service';

@Injectable()
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly gameService: GameService) {}

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
    client.emit('connected', { message: 'Welcome to Unstable Unicorns!' });
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    this.gameService.removePlayer(client.id);
  }

  @SubscribeMessage('joinGame')
  handleJoinGame(
    @MessageBody() data: { playerName: string },
    @ConnectedSocket() client: Socket,
  ) {
    const player = this.gameService.addPlayer(client.id, data.playerName);
    client.emit('playerJoined', player);
    this.server.emit('playersUpdated', this.gameService.getPlayers());
    return { success: true, player };
  }

  @SubscribeMessage('getPlayers')
  handleGetPlayers() {
    return this.gameService.getPlayers();
  }

  @SubscribeMessage('startGame')
  handleStartGame(@ConnectedSocket() client: Socket) {
    const result = this.gameService.startGame();
    if (result.success) {
      this.server.emit('gameStarted', result.gameState);
    }
    return result;
  }
}
