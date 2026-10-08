import { getDb } from '../database/config/database';
import { ConfiguracaoGlobal } from '../models/Configuracao';

export class ConfiguracaoRepository {
    async findAll(): Promise<ConfiguracaoGlobal[]> {
        const pool = await getDb();
        const result = await pool.query('SELECT chave, valor FROM ConfiguracoesGlobais');
        return result.rows;
    }

    async getByKey(chave: string): Promise<string | undefined> {
        const pool = await getDb();
        const result = await pool.query('SELECT valor FROM ConfiguracoesGlobais WHERE chave = $1', [chave]);
        return result.rows[0]?.valor;
    }

    async upsert(chave: string, valor: string): Promise<void> {
        const pool = await getDb();
        await pool.query(
            `INSERT INTO ConfiguracoesGlobais (chave, valor) VALUES ($1, $2)
             ON CONFLICT(chave) DO UPDATE SET valor = EXCLUDED.valor`,
            [chave, valor]
        );
    }
}
