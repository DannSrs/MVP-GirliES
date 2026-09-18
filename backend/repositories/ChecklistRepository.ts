import { getDb } from '../database/config/database';
import { ChecklistItem } from '../models/ChecklistItem';

export class ChecklistRepository {
    async findById(id: number): Promise<ChecklistItem | undefined> {
        const db = await getDb();
        const row = await db.get<any>('SELECT id, atividade_id as atividadeId, descricao, concluido as isCompleted FROM Checklists WHERE id = ?', [id]);
        if (!row) return undefined;

        return {
            id: Number(row.id),
            atividadeId: Number(row.atividadeId),
            descricao: row.descricao,
            isCompleted: Boolean(row.isCompleted)
        };
    }

    async create(atividadeId: number | string, tipoAtividade: string, descricao: string, isCompleted: boolean = false): Promise<ChecklistItem> {
        const db = await getDb();
        const result = await db.run(
            `INSERT INTO Checklists (atividade_id, tipo_atividade, descricao, concluido) VALUES (?, ?, ?, ?)`,
            [String(atividadeId), tipoAtividade, descricao, isCompleted ? 1 : 0]
        );
        const createdId = result.lastID;
        if (!createdId) throw new Error('Falha ao inserir item de checklist');

        const created = await this.findById(createdId);
        if (!created) throw new Error('Falha ao recuperar o item recém-criado');
        return created;
    }

    async findByAtividade(atividadeId: number | string, tipoAtividade: string): Promise<ChecklistItem[]> {
        const db = await getDb();
        const rows = await db.all<any[]>(
            `SELECT id, atividade_id as atividadeId, descricao, concluido as isCompleted 
             FROM Checklists WHERE atividade_id = ? AND tipo_atividade = ?`,
            [String(atividadeId), tipoAtividade]
        );

        return rows.map(row => ({
            id: Number(row.id),
            atividadeId: Number(row.atividadeId),
            descricao: row.descricao,
            isCompleted: Boolean(row.isCompleted)
        }));
    }

    async toggleItem(id: number): Promise<ChecklistItem | undefined> {
        const db = await getDb();
        await db.run('UPDATE Checklists SET concluido = NOT concluido WHERE id = ?', [id]);
        return this.findById(id);
    }

    async updateDescricao(id: number, descricao: string): Promise<ChecklistItem | undefined> {
        const db = await getDb();
        await db.run('UPDATE Checklists SET descricao = ? WHERE id = ?', [descricao, id]);
        return this.findById(id);
    }

    async delete(id: number): Promise<boolean> {
        const db = await getDb();
        const result = await db.run('DELETE FROM Checklists WHERE id = ?', [id]);
        return (result.changes ?? 0) > 0;
    }
}
