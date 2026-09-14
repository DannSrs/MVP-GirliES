import { getDb } from '../database/config/database';
import { ConfiguracaoGlobal } from '../models/Configuracao';

export class ConfiguracaoRepository {
    async findAll(): Promise<ConfiguracaoGlobal[]> {
        const db = await getDb();
        return db.all<ConfiguracaoGlobal[]>('SELECT chave, valor FROM ConfiguracoesGlobais');
    }

    async getByKey(chave: string): Promise<string | undefined> {
        const db = await getDb();
        const row = await db.get<ConfiguracaoGlobal>('SELECT valor FROM ConfiguracoesGlobais WHERE chave = ?', [chave]);
        return row?.valor;
    }

    async upsert(chave: string, valor: string): Promise<void> {
        const db = await getDb();
        await db.run(
            `INSERT INTO ConfiguracoesGlobais (chave, valor) VALUES (?, ?)
             ON CONFLICT(chave) DO UPDATE SET valor = excluded.valor`,
            [chave, valor]
        );
    }
}
