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
exports.initializeDatabase = initializeDatabase;
exports.testDatabaseConnection = testDatabaseConnection;
exports.getDb = getDb;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const sqlite3_1 = __importDefault(require("sqlite3"));
const sqlite_1 = require("sqlite");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const dbPath = process.env.DB_PATH || path_1.default.resolve(process.cwd(), 'database', 'app.db');
let db = null;
async function initializeDatabase() {
    if (db) {
        return db;
    }
    const directory = path_1.default.dirname(dbPath);
    fs_1.default.mkdirSync(directory, { recursive: true });
    db = await (0, sqlite_1.open)({
        filename: dbPath,
        driver: sqlite3_1.default.Database,
    });
    await db.exec(`
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS Usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL CHECK (email LIKE '%@discente.ifpe.edu.br'),
      funcao_interna TEXT,
      curso TEXT,
      periodo TEXT,
      role TEXT DEFAULT 'membro'
    );

    CREATE TABLE IF NOT EXISTS Aulas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT NOT NULL,
      descricao TEXT,
      categoria TEXT,
      data_hora DATETIME NOT NULL,
      local TEXT,
      status TEXT DEFAULT 'Planejada',
      link_plano_aula TEXT,
      google_event_id TEXT
    );

    CREATE TABLE IF NOT EXISTS Aula_Responsavel (
      aula_id INTEGER NOT NULL REFERENCES Aulas(id) ON DELETE CASCADE,
      usuario_id INTEGER NOT NULL REFERENCES Usuarios(id) ON DELETE CASCADE,
      PRIMARY KEY (aula_id, usuario_id)
    );

    CREATE TABLE IF NOT EXISTS Conteudo_IG (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT NOT NULL,
      descricao TEXT,
      status TEXT DEFAULT 'Ideia',
      data_programada DATETIME,
      tipo_post TEXT,
      publico_alvo TEXT,
      responsavel_roteiro INTEGER REFERENCES Usuarios(id) ON DELETE SET NULL,
      responsavel_design INTEGER REFERENCES Usuarios(id) ON DELETE SET NULL
    );

    CREATE TABLE IF NOT EXISTS Eventos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT NOT NULL,
      descricao TEXT,
      data_hora DATETIME NOT NULL,
      local TEXT,
      duracao TEXT
    );

    CREATE TABLE IF NOT EXISTS Checklists (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      atividade_id TEXT NOT NULL,
      tipo_atividade TEXT NOT NULL CHECK (tipo_atividade IN ('AULA', 'POST', 'EVENTO')),
      descricao TEXT NOT NULL,
      concluido BOOLEAN DEFAULT FALSE,
      criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS LinksAtividade (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      atividade_id TEXT NOT NULL,
      tipo_atividade TEXT NOT NULL CHECK (tipo_atividade IN ('AULA', 'POST', 'EVENTO')),
      tipo TEXT NOT NULL CHECK (tipo IN ('Material', 'Link Auxiliar')),
      titulo TEXT NOT NULL,
      link TEXT NOT NULL,
      descricao TEXT,
      criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);
    return db;
}
async function testDatabaseConnection() {
    const connection = await initializeDatabase();
    const result = await connection.get('SELECT 1 AS ok');
    if (!result || result.ok !== 1) {
        throw new Error('SQLite não respondeu corretamente');
    }
    console.log('Conexão com SQLite OK');
}
async function getDb() {
    return initializeDatabase();
}
