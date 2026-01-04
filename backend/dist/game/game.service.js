"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameService = void 0;
const common_1 = require("@nestjs/common");
let GameService = class GameService {
    players = new Map();
    gameState = {
        players: [],
        currentPlayerIndex: 0,
        gameStarted: false,
        deck: [],
    };
    addPlayer(id, name) {
        const player = {
            id,
            name,
            hand: [],
            stable: [],
        };
        this.players.set(id, player);
        this.gameState.players = Array.from(this.players.values());
        return player;
    }
    removePlayer(id) {
        this.players.delete(id);
        this.gameState.players = Array.from(this.players.values());
    }
    getPlayers() {
        return Array.from(this.players.values());
    }
    startGame() {
        if (this.players.size < 2) {
            return { success: false, error: 'Need at least 2 players to start' };
        }
        this.gameState.gameStarted = true;
        this.gameState.deck = this.initializeDeck();
        this.gameState.players.forEach((player) => {
            player.hand = this.dealCards(5);
            player.stable = [this.dealCards(1)[0]];
        });
        return { success: true, gameState: this.gameState };
    }
    initializeDeck() {
        const deck = [];
        for (let i = 0; i < 20; i++) {
            deck.push(`Card-${i}`);
        }
        return this.shuffleDeck(deck);
    }
    shuffleDeck(deck) {
        const shuffled = [...deck];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }
    dealCards(count) {
        return this.gameState.deck.splice(0, count);
    }
    getGameState() {
        return this.gameState;
    }
};
exports.GameService = GameService;
exports.GameService = GameService = __decorate([
    (0, common_1.Injectable)()
], GameService);
//# sourceMappingURL=game.service.js.map