import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import path from 'path';
import fs from 'fs';

let dbInstance: Database | null = null;

export async function getDb(): Promise<Database> {
    if (dbInstance) {
        return dbInstance;
    }

    const dbPath = path.resolve(__dirname, '..', '..', '..', 'database');
    if (!fs.existsSync(dbPath)) {
        fs.mkdirSync(dbPath, { recursive: true });
    }

    dbInstance = await open({
        filename: path.join(dbPath, 'app.db'),
        driver: sqlite3.Database
    });

    await initializeDb(dbInstance);

    return dbInstance;
}

async function initializeDb(db: Database) {
    await db.exec(`
        CREATE TABLE IF NOT EXISTS Aulas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            titulo TEXT NOT NULL,
            descricao TEXT,
            data_hora TEXT NOT NULL,
            local TEXT,
            status TEXT DEFAULT 'Planejada',
            categoria TEXT,
            link_plano_aula TEXT
        );

        CREATE TABLE IF NOT EXISTS Checklists (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            atividade_id INTEGER NOT NULL,
            tipo_atividade TEXT NOT NULL,
            descricao TEXT NOT NULL,
            concluido INTEGER DEFAULT 0,
            FOREIGN KEY (atividade_id) REFERENCES Aulas(id) ON DELETE CASCADE
        );

        CREATE TABLE IF NOT EXISTS LinksAtividade (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            atividade_id INTEGER NOT NULL,
            tipo_atividade TEXT NOT NULL,
            tipo TEXT CHECK(tipo IN ('Material', 'Link Auxiliar')),
            titulo TEXT,
            link TEXT NOT NULL,
            FOREIGN KEY (atividade_id) REFERENCES Aulas(id) ON DELETE CASCADE
        );
    `);
}
