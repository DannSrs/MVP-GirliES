import fs from 'fs';
import path from 'path';
import sqlite3 from 'sqlite3';
import { open, type Database as SqliteDatabase } from 'sqlite';
import * as dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config();

const dbPath = process.env.DB_PATH || path.resolve(process.cwd(), 'database', 'app.db');
let db: SqliteDatabase | null = null;

export async function initializeDatabase(): Promise<SqliteDatabase> {
  if (db) {
    return db;
  }

  const directory = path.dirname(dbPath);
  fs.mkdirSync(directory, { recursive: true });

  db = await open({
    filename: dbPath,
    driver: sqlite3.Database,
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
      senha TEXT NOT NULL,
      role TEXT DEFAULT 'voluntaria' CHECK (role IN ('professora', 'voluntaria', 'adm'))
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
      tipo_evento TEXT NOT NULL,
      regime_evento TEXT NOT NULL,
      data TEXT NOT NULL,
      horario_inicio TEXT NOT NULL,
      horario_fim TEXT NOT NULL,
      local TEXT,
      capacidade INTEGER
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

  // Seeding da usuária admin (Leticia)
  const leticiaEmail = 'mlsb5@discente.ifpe.edu.br';
  const existingAdmin = await db.get(`SELECT id FROM Usuarios WHERE email = ?`, [leticiaEmail]);
  if (!existingAdmin) {
    const ano = new Date().getFullYear();
    const username = leticiaEmail.split('@')[0].toUpperCase();
    const defaultPassword = `GIRLIES-IFPE-${ano}-ADM-${username}-X0`;
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);
    await db.run(
      `INSERT INTO Usuarios (nome, email, funcao_interna, curso, periodo, senha, role) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      ['Leticia', leticiaEmail, 'Administração', 'Não Informado', 'Não Informado', hashedPassword, 'adm']
    );
    console.log(`✅ Usuária admin padrão criada com sucesso: ${leticiaEmail} (Senha: ${defaultPassword})`);
  }

  return db;
}

export async function testDatabaseConnection(): Promise<void> {
  const connection = await initializeDatabase();
  const result = await connection.get('SELECT 1 AS ok');

  if (!result || result.ok !== 1) {
    throw new Error('SQLite não respondeu corretamente');
  }

  console.log('Conexão com SQLite OK');
}

export async function getDb(): Promise<SqliteDatabase> {
  return initializeDatabase();
}
