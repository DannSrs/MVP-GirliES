import { getDb } from '../database/config/database';
import { PlanoAula, CriarPlanoAulaDTO, AtualizarPlanoAulaDTO } from '../models/PlanoAula';
import { IRepository } from './IRepository';

export class PlanoAulaRepository implements IRepository<PlanoAula, CriarPlanoAulaDTO, AtualizarPlanoAulaDTO> {
    async findAll(): Promise<PlanoAula[]> {
        const db = await getDb();
        const rows = await db.all<any[]>('SELECT * FROM Aulas ORDER BY data_hora ASC');
        
        const aulas: PlanoAula[] = [];
        for (const r of rows) {
            const checklistRows = await db.all<any[]>(
                `SELECT id, atividade_id as atividadeId, descricao, concluido as isCompleted 
                 FROM Checklists WHERE atividade_id = ? AND tipo_atividade = 'AULA'`,
                [String(r.id)]
            );
            const linksRows = await db.all<any[]>(
                `SELECT id, atividade_id as atividadeId, tipo, titulo, link 
                 FROM LinksAtividade WHERE atividade_id = ? AND tipo_atividade = 'AULA'`,
                [String(r.id)]
            );

            aulas.push({
                id: r.id,
                titulo: r.titulo,
                descricao: r.descricao,
                categoria: r.categoria,
                dataHora: r.data_hora,
                local: r.local,
                status: r.status,
                linkPlanoAula: r.link_plano_aula,
                linkSlide: r.link_slide,
                linkRoteiro: r.link_roteiro,
                checklist: checklistRows.map(c => ({
                    id: Number(c.id),
                    atividadeId: Number(c.atividadeId),
                    descricao: c.descricao,
                    isCompleted: Boolean(c.isCompleted)
                })),
                links: linksRows.map(l => ({
                    id: Number(l.id),
                    atividadeId: Number(l.atividadeId),
                    tipo: l.tipo,
                    titulo: l.titulo,
                    link: l.link
                }))
            });
        }
        return aulas;
    }

    async findById(id: number | string): Promise<PlanoAula | undefined> {
        const db = await getDb();
        const r = await db.get<any>('SELECT * FROM Aulas WHERE id = ?', [id]);
        if (!r) return undefined;

        const checklistRows = await db.all<any[]>(
            `SELECT id, atividade_id as atividadeId, descricao, concluido as isCompleted 
             FROM Checklists WHERE atividade_id = ? AND tipo_atividade = 'AULA'`,
            [String(r.id)]
        );
        const linksRows = await db.all<any[]>(
            `SELECT id, atividade_id as atividadeId, tipo, titulo, link 
             FROM LinksAtividade WHERE atividade_id = ? AND tipo_atividade = 'AULA'`,
            [String(r.id)]
        );

        return {
            id: r.id,
            titulo: r.titulo,
            descricao: r.descricao,
            categoria: r.categoria,
            dataHora: r.data_hora,
            local: r.local,
            status: r.status,
            linkPlanoAula: r.link_plano_aula,
            linkSlide: r.link_slide,
            linkRoteiro: r.link_roteiro,
            checklist: checklistRows.map(c => ({
                id: Number(c.id),
                atividadeId: Number(c.atividadeId),
                descricao: c.descricao,
                isCompleted: Boolean(c.isCompleted)
            })),
            links: linksRows.map(l => ({
                id: Number(l.id),
                atividadeId: Number(l.atividadeId),
                tipo: l.tipo,
                titulo: l.titulo,
                link: l.link
            }))
        };
    }

    async create(data: CriarPlanoAulaDTO): Promise<PlanoAula> {
        const db = await getDb();
        const result = await db.run(
            `INSERT INTO Aulas (titulo, descricao, categoria, data_hora, local, status, link_plano_aula, link_slide, link_roteiro)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                data.titulo,
                data.descricao || null,
                data.categoria || null,
                data.dataHora,
                data.local || null,
                data.status || 'Em Preparação',
                data.linkPlanoAula || null,
                data.linkSlide || null,
                data.linkRoteiro || null
            ]
        );
        const createdId = result.lastID;
        if (!createdId) throw new Error('Falha ao inserir aula no SQLite');

        if (data.checklist && data.checklist.length > 0) {
            for (const item of data.checklist) {
                await db.run(
                    `INSERT INTO Checklists (atividade_id, tipo_atividade, descricao, concluido) VALUES (?, 'AULA', ?, ?)`,
                    [String(createdId), item.descricao, item.isCompleted ? 1 : 0]
                );
            }
        }

        if (data.links && data.links.length > 0) {
            for (const link of data.links) {
                await db.run(
                    `INSERT INTO LinksAtividade (atividade_id, tipo_atividade, tipo, titulo, link) VALUES (?, 'AULA', ?, ?, ?)`,
                    [String(createdId), link.tipo, link.titulo || null, link.link]
                );
            }
        }

        const created = await this.findById(createdId);
        if (!created) throw new Error('Falha ao recuperar a aula recém-criada');
        return created;
    }

    async update(id: number | string, changes: AtualizarPlanoAulaDTO): Promise<PlanoAula | undefined> {
        const existing = await this.findById(id);
        if (!existing) return undefined;

        const updated = { ...existing, ...changes };
        const db = await getDb();
        await db.run(
            `UPDATE Aulas SET titulo = ?, descricao = ?, categoria = ?, data_hora = ?, local = ?, status = ?, link_plano_aula = ?, link_slide = ?, link_roteiro = ?
             WHERE id = ?`,
            [
                updated.titulo,
                updated.descricao || null,
                updated.categoria || null,
                updated.dataHora,
                updated.local || null,
                updated.status || 'Em Preparação',
                updated.linkPlanoAula || null,
                updated.linkSlide || null,
                updated.linkRoteiro || null,
                id
            ]
        );

        if (changes.checklist !== undefined) {
            await db.run(`DELETE FROM Checklists WHERE atividade_id = ? AND tipo_atividade = 'AULA'`, [String(id)]);
            if (changes.checklist.length > 0) {
                for (const item of changes.checklist) {
                    await db.run(
                        `INSERT INTO Checklists (atividade_id, tipo_atividade, descricao, concluido) VALUES (?, 'AULA', ?, ?)`,
                        [String(id), item.descricao, item.isCompleted ? 1 : 0]
                    );
                }
            }
        }

        if (changes.links !== undefined) {
            await db.run(`DELETE FROM LinksAtividade WHERE atividade_id = ? AND tipo_atividade = 'AULA'`, [String(id)]);
            if (changes.links.length > 0) {
                for (const link of changes.links) {
                    await db.run(
                        `INSERT INTO LinksAtividade (atividade_id, tipo_atividade, tipo, titulo, link) VALUES (?, 'AULA', ?, ?, ?)`,
                        [String(id), link.tipo, link.titulo || null, link.link]
                    );
                }
            }
        }
        return this.findById(id);
    }

    async delete(id: number | string): Promise<boolean> {
        const db = await getDb();
        await db.run(`DELETE FROM Checklists WHERE atividade_id = ? AND tipo_atividade = 'AULA'`, [String(id)]);
        await db.run(`DELETE FROM LinksAtividade WHERE atividade_id = ? AND tipo_atividade = 'AULA'`, [String(id)]);
        const result = await db.run('DELETE FROM Aulas WHERE id = ?', id);
        return (result.changes ?? 0) > 0;
    }
}