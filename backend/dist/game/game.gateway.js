"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const common_1 = require("@nestjs/common");
const game_service_1 = require("./game.service");
let GameGateway = class GameGateway {
    gameService;
    server;
    constructor(gameService) {
        this.gameService = gameService;
    }
    handleConnection(client) {
        console.log(`Client connected: ${client.id}`);
        client.emit('connected', { message: 'Welcome to Unstable Unicorns!' });
    }
    handleDisconnect(client) {
        console.log(`Client disconnected: ${client.id}`);
        this.gameService.removePlayer(client.id);
    }
    handleJoinGame(data, client) {
        const player = this.gameService.addPlayer(client.id, data.playerName);
        client.emit('playerJoined', player);
        this.server.emit('playersUpdated', this.gameService.getPlayers());
        return { success: true, player };
    }
    handleGetPlayers() {
        return this.gameService.getPlayers();
    }
    handleStartGame(client) {
        const result = this.gameService.startGame();
        if (result.success) {
            this.server.emit('gameStarted', result.gameState);
        }
        return result;
    }
};
exports.GameGateway = GameGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], GameGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('joinGame'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], GameGateway.prototype, "handleJoinGame", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('getPlayers'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], GameGateway.prototype, "handleGetPlayers", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('startGame'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], GameGateway.prototype, "handleStartGame", null);
exports.GameGateway = GameGateway = __decorate([
    (0, common_1.Injectable)(),
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
        },
    }),
    __metadata("design:paramtypes", [game_service_1.GameService])
], GameGateway);
//# sourceMappingURL=game.gateway.js.map