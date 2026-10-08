import { getDb } from '../database/config/database';
import { ChecklistItem } from '../models/ChecklistItem';

export class ChecklistRepository {
    async findById(id: number): Promise<ChecklistItem | undefined> {
        const pool = await getDb();
        const result = await pool.query('SELECT id, atividade_id as "atividadeId", descricao, concluido as "isCompleted" FROM Checklists WHERE id = $1', [id]);
        if (result.rows.length === 0) return undefined;
        
        const row = result.rows[0];
        return {
            id: Number(row.id),
            atividadeId: Number(row.atividadeId),
            descricao: row.descricao,
            isCompleted: Boolean(row.isCompleted)
        };
    }

    async create(atividadeId: number | string, tipoAtividade: string, descricao: string, isCompleted: boolean = false): Promise<ChecklistItem> {
        const pool = await getDb();
        const result = await pool.query(
            `INSERT INTO Checklists (atividade_id, tipo_atividade, descricao, concluido) VALUES ($1, $2, $3, $4) RETURNING id`,
            [String(atividadeId), tipoAtividade, descricao, isCompleted]
        );
        const createdId = result.rows[0]?.id;
        if (!createdId) throw new Error('Falha ao inserir item de checklist');

        const created = await this.findById(createdId);
        if (!created) throw new Error('Falha ao recuperar o item recém-criado');
        return created;
    }

    async findByAtividade(atividadeId: number | string, tipoAtividade: string): Promise<ChecklistItem[]> {
        const pool = await getDb();
        const result = await pool.query(
            `SELECT id, atividade_id as "atividadeId", descricao, concluido as "isCompleted" 
             FROM Checklists WHERE atividade_id = $1 AND tipo_atividade = $2`,
            [String(atividadeId), tipoAtividade]
        );

        return result.rows.map(row => ({
            id: Number(row.id),
            atividadeId: Number(row.atividadeId),
            descricao: row.descricao,
            isCompleted: Boolean(row.isCompleted)
        }));
    }

    async toggleItem(id: number): Promise<ChecklistItem | undefined> {
        const pool = await getDb();
        await pool.query('UPDATE Checklists SET concluido = NOT concluido WHERE id = $1', [id]);
        return this.findById(id);
    }

    async updateDescricao(id: number, descricao: string): Promise<ChecklistItem | undefined> {
        const pool = await getDb();
        await pool.query('UPDATE Checklists SET descricao = $1 WHERE id = $2', [descricao, id]);
        return this.findById(id);
    }

    async delete(id: number): Promise<boolean> {
        const pool = await getDb();
        const result = await pool.query('DELETE FROM Checklists WHERE id = $1', [id]);
        return (result.rowCount ?? 0) > 0;
    }
}
