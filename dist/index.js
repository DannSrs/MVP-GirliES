"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv = __importStar(require("dotenv"));
const routes_1 = require("./routes");
const swagger_1 = require("./swagger");
const database_1 = require("./database/config/database");
dotenv.config();
class App {
    server;
    port = Number(process.env.PORT) || 3000;
    constructor() {
        this.server = (0, express_1.default)();
        this.middlewares();
        this.routes();
        this.errorHandler();
    }
    middlewares() {
        const corsOrigin = process.env.CORS_ORIGIN || '*';
        this.server.use((0, cors_1.default)({ origin: corsOrigin }));
        this.server.use(express_1.default.json());
        this.server.use(express_1.default.urlencoded({ extended: true }));
        this.server.use(express_1.default.static('public'));
    }
    routes() {
        (0, swagger_1.setupSwagger)(this.server);
        (0, routes_1.RegisterRoutes)(this.server);
    }
    errorHandler() {
        this.server.use((err, _req, res, _next) => {
            const status = err.status || 500;
            const message = err.message || 'Erro interno do servidor';
            console.error(`[Error ${status}]:`, err);
            res.status(status).json({
                ok: false,
                error: message,
                details: err.fields || undefined
            });
        });
    }
    async start() {
        try {
            await (0, database_1.initializeDatabase)();
            console.log('Conexão com SQLite inicializada com sucesso.');
        }
        catch (error) {
            console.error('Erro ao inicializar o banco de dados SQLite:', error);
        }
        this.server.listen(this.port, () => {
            console.log(`🚀 Servidor rodando na porta ${this.port} (http://localhost:${this.port})`);
            console.log(`📚 Documentação Swagger disponível em http://localhost:${this.port}/api-docs`);
        });
    }
}
const aplicacao = new App();
aplicacao.start();
