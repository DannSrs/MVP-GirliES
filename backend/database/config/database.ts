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

    CREATE TABLE IF NOT EXISTS ConfiguracoesGlobais (
      chave TEXT PRIMARY KEY,
      valor TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS Usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL CHECK (email LIKE '%@discente.ifpe.edu.br'),
      funcao_interna TEXT,
      curso TEXT,
      periodo TEXT,
      senha TEXT NOT NULL,
      token TEXT,
      role TEXT DEFAULT 'voluntaria' CHECK (role IN ('professora', 'voluntaria', 'adm'))
    );
  `);

  try {
    await db.exec(`ALTER TABLE Usuarios ADD COLUMN token TEXT;`);
  } catch (e) {
    // Column might already exist, ignore error
  }

  await db.exec(`
    CREATE TABLE IF NOT EXISTS Aulas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT NOT NULL,
      descricao TEXT,
      categoria TEXT,
      data_hora DATETIME NOT NULL,
      local TEXT,
      status TEXT DEFAULT 'Planejada',
      link_plano_aula TEXT,
      link_slide TEXT,
      link_roteiro TEXT,
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
      status TEXT DEFAULT 'Backlog',
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
      capacidade INTEGER,
      descricao TEXT
    );

    CREATE TABLE IF NOT EXISTS Evento_Responsavel (
      evento_id INTEGER NOT NULL REFERENCES Eventos(id) ON DELETE CASCADE,
      usuario_id INTEGER NOT NULL REFERENCES Usuarios(id) ON DELETE CASCADE,
      PRIMARY KEY (evento_id, usuario_id)
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

  // Migration: add descricao to Eventos if it doesn't exist yet
  try {
    await db.exec(`ALTER TABLE Eventos ADD COLUMN descricao TEXT;`);
  } catch (e) {
    // Column might already exist, ignore
  }

  // Migration: create Evento_Responsavel if not exists
  await db.exec(`
    CREATE TABLE IF NOT EXISTS Evento_Responsavel (
      evento_id INTEGER NOT NULL REFERENCES Eventos(id) ON DELETE CASCADE,
      usuario_id INTEGER NOT NULL REFERENCES Usuarios(id) ON DELETE CASCADE,
      PRIMARY KEY (evento_id, usuario_id)
    );
  `);

  // Seeding Configurações Globais (Data Início e Data Fim Padrão do MVP)
  // Definindo datas padrão: Início 01/09, Fim 12/12.
  const dataInicioAtual = await db.get(`SELECT valor FROM ConfiguracoesGlobais WHERE chave = 'DATA_INICIO_PROJETO'`);
  if (!dataInicioAtual) {
    const ano = new Date().getFullYear();
    // No JavaScript os meses começam em 0 (Janeiro = 0, Setembro = 8, Dezembro = 11)
    const dataAtual = new Date(ano, 8, 1); // 01 de Setembro
    const dataFim = new Date(ano, 11, 12); // 12 de Dezembro
    
    await db.run(
      `INSERT INTO ConfiguracoesGlobais (chave, valor) VALUES ('DATA_INICIO_PROJETO', ?), ('DATA_FIM_PROJETO', ?)`,
      [dataAtual.toISOString(), dataFim.toISOString()]
    );
  }

  // Seeding da usuária admin (Leticia)
  const leticiaEmail = 'mlsb5@discente.ifpe.edu.br';
  const existingAdmin = await db.get(`SELECT id FROM Usuarios WHERE email = ?`, [leticiaEmail]);
  if (!existingAdmin) {
    const ano = new Date().getFullYear();
    const username = leticiaEmail.split('@')[0].toUpperCase();
    const defaultPassword = `GIRLIES-IFPE-${ano}-ADM-${username}-X0`;
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);
    await db.run(
      `INSERT INTO Usuarios (nome, email, funcao_interna, curso, periodo, senha, token, role) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      ['Leticia', leticiaEmail, 'Administração', 'Não Informado', 'Não Informado', hashedPassword, defaultPassword, 'adm']
    );
    console.log(`✅ Usuária admin padrão criada com sucesso: ${leticiaEmail} (Senha: ${defaultPassword})`);
  } else {
    // Se a Leticia já existe mas não tem token, a gente cria um
    const adminComToken = await db.get(`SELECT token FROM Usuarios WHERE email = ?`, [leticiaEmail]);
    if (!adminComToken || !adminComToken.token) {
      const ano = new Date().getFullYear();
      const username = leticiaEmail.split('@')[0].toUpperCase();
      const defaultPassword = `GIRLIES-IFPE-${ano}-ADM-${username}-X0`;
      await db.run(`UPDATE Usuarios SET token = ? WHERE email = ?`, [defaultPassword, leticiaEmail]);
    }
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
