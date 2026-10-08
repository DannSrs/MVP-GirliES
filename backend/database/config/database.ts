import { Pool } from 'pg';
import * as dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config();

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/postgres';

let pool: Pool | null = null;

export async function initializeDatabase(): Promise<Pool> {
  if (pool) {
    return pool;
  }

  pool = new Pool({
    connectionString,
    // se estiver conectando a um banco remoto como Supabase, ssl pode ser necessário
    ssl: connectionString.includes('localhost') ? false : { rejectUnauthorized: false }
  });

  await pool.query(`
    CREATE TABLE IF NOT EXISTS ConfiguracoesGlobais (
      chave TEXT PRIMARY KEY,
      valor TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS Usuarios (
      id SERIAL PRIMARY KEY,
      nome TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL CHECK (email LIKE '%@discente.ifpe.edu.br'),
      funcao_interna TEXT,
      curso TEXT,
      periodo TEXT,
      senha TEXT NOT NULL,
      token TEXT,
      role TEXT DEFAULT 'voluntaria' CHECK (role IN ('professora', 'voluntaria', 'adm'))
    );

    CREATE TABLE IF NOT EXISTS Aulas (
      id SERIAL PRIMARY KEY,
      titulo TEXT NOT NULL,
      descricao TEXT,
      categoria TEXT,
      data_hora TIMESTAMP NOT NULL,
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
      id SERIAL PRIMARY KEY,
      titulo TEXT NOT NULL,
      descricao TEXT,
      status TEXT DEFAULT 'Backlog',
      data_programada TIMESTAMP,
      tipo_post TEXT,
      publico_alvo TEXT,
      responsavel_roteiro INTEGER REFERENCES Usuarios(id) ON DELETE SET NULL,
      responsavel_design INTEGER REFERENCES Usuarios(id) ON DELETE SET NULL
    );

    CREATE TABLE IF NOT EXISTS Eventos (
      id SERIAL PRIMARY KEY,
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
      id SERIAL PRIMARY KEY,
      atividade_id TEXT NOT NULL,
      tipo_atividade TEXT NOT NULL CHECK (tipo_atividade IN ('AULA', 'POST', 'EVENTO')),
      descricao TEXT NOT NULL,
      concluido BOOLEAN DEFAULT FALSE,
      criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS LinksAtividade (
      id SERIAL PRIMARY KEY,
      atividade_id TEXT NOT NULL,
      tipo_atividade TEXT NOT NULL CHECK (tipo_atividade IN ('AULA', 'POST', 'EVENTO')),
      tipo TEXT NOT NULL CHECK (tipo IN ('Material', 'Link Auxiliar')),
      titulo TEXT NOT NULL,
      link TEXT NOT NULL,
      descricao TEXT,
      criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Migration: add token to Usuarios if it doesn't exist yet (Postgres syntax)
  try {
    await pool.query(`ALTER TABLE Usuarios ADD COLUMN token TEXT;`);
  } catch (e: any) {
    // Column might already exist, ignore error (code 42701 in Postgres means duplicate_column)
  }

  // Migration: add descricao to Eventos if it doesn't exist yet
  try {
    await pool.query(`ALTER TABLE Eventos ADD COLUMN descricao TEXT;`);
  } catch (e: any) {
    // Column might already exist, ignore
  }

  // Seeding Configurações Globais (Data Início e Data Fim Padrão do MVP)
  // Definindo datas padrão: Início 01/09, Fim 12/12.
  const dataInicioResult = await pool.query(`SELECT valor FROM ConfiguracoesGlobais WHERE chave = 'DATA_INICIO_PROJETO'`);
  if (dataInicioResult.rows.length === 0) {
    const ano = new Date().getFullYear();
    const dataAtual = new Date(ano, 8, 1); // 01 de Setembro
    const dataFim = new Date(ano, 11, 12); // 12 de Dezembro
    
    await pool.query(
      `INSERT INTO ConfiguracoesGlobais (chave, valor) VALUES ($1, $2), ($3, $4)`,
      ['DATA_INICIO_PROJETO', dataAtual.toISOString(), 'DATA_FIM_PROJETO', dataFim.toISOString()]
    );
  }

  // Seeding da usuária admin (Leticia)
  const leticiaEmail = 'mlsb5@discente.ifpe.edu.br';
  const existingAdminResult = await pool.query(`SELECT id, token FROM Usuarios WHERE email = $1`, [leticiaEmail]);
  if (existingAdminResult.rows.length === 0) {
    const ano = new Date().getFullYear();
    const username = leticiaEmail.split('@')[0].toUpperCase();
    const defaultPassword = \`GIRLIES-IFPE-\${ano}-ADM-\${username}-X0\`;
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);
    await pool.query(
      `INSERT INTO Usuarios (nome, email, funcao_interna, curso, periodo, senha, token, role) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      ['Leticia', leticiaEmail, 'Administração', 'Não Informado', 'Não Informado', hashedPassword, defaultPassword, 'adm']
    );
    console.log(`✅ Usuária admin padrão criada com sucesso: ${leticiaEmail} (Senha: ${defaultPassword})`);
  } else {
    // Se a Leticia já existe mas não tem token, a gente cria um
    const adminComToken = existingAdminResult.rows[0];
    if (!adminComToken || !adminComToken.token) {
      const ano = new Date().getFullYear();
      const username = leticiaEmail.split('@')[0].toUpperCase();
      const defaultPassword = \`GIRLIES-IFPE-\${ano}-ADM-\${username}-X0\`;
      await pool.query(`UPDATE Usuarios SET token = $1 WHERE email = $2`, [defaultPassword, leticiaEmail]);
    }
  }

  return pool;
}

export async function testDatabaseConnection(): Promise<void> {
  const connection = await initializeDatabase();
  const result = await connection.query('SELECT 1 AS ok');

  if (!result || result.rows[0].ok !== 1) {
    throw new Error('PostgreSQL não respondeu corretamente');
  }

  console.log('Conexão com PostgreSQL OK');
}

export async function getDb(): Promise<Pool> {
  return initializeDatabase();
}
