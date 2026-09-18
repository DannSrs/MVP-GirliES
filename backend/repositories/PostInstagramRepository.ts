import { getDb } from '../database/config/database';
import { PostInstagram, CriarPostInstagramDTO, AtualizarPostInstagramDTO } from '../models/PostInstagram';
import { IRepository } from './IRepository';

function normalizarTipoLink(tipo?: string): 'Material' | 'Link Auxiliar' {
    if (!tipo) return 'Link Auxiliar';
    const lower = tipo.trim().toLowerCase();
    if (lower === 'material') return 'Material';
    return 'Link Auxiliar';
}

export class PostInstagramRepository implements IRepository<PostInstagram, CriarPostInstagramDTO, AtualizarPostInstagramDTO> {
    async findAll(): Promise<PostInstagram[]> {
        const db = await getDb();
        const rows = await db.all<any[]>('SELECT * FROM Conteudo_IG');
        
        const posts: PostInstagram[] = [];
        for (const r of rows) {
            const checklistRows = await db.all<any[]>(
                `SELECT id, atividade_id as atividadeId, descricao, concluido as isCompleted 
                 FROM Checklists WHERE atividade_id = ? AND tipo_atividade = 'POST'`,
                [r.id]
            );
            const linksRows = await db.all<any[]>(
                `SELECT id, atividade_id as atividadeId, tipo, titulo, link 
                 FROM LinksAtividade WHERE atividade_id = ? AND tipo_atividade = 'POST'`,
                [r.id]
            );

            posts.push({
                id: r.id,
                titulo: r.titulo,
                descricao: r.descricao,
                status: r.status,
                tipoPost: r.tipo_post,
                publicoAlvo: r.publico_alvo,
                deadline: r.data_programada,
                responsavelRoteiroId: r.responsavel_roteiro,
                responsavelDesignId: r.responsavel_design,
                checklist: checklistRows.map(c => ({
                    id: Number(c.id),
                    atividadeId: Number(c.atividadeId),
                    descricao: c.descricao,
                    isCompleted: Boolean(c.concluido || c.isCompleted)
                })),
                links: linksRows.map(l => ({
                    id: Number(l.id),
                    atividadeId: Number(l.atividadeId),
                    tipo: l.tipo,
                    link: l.link
                }))
            });
        }
        return posts;
    }

    async findById(id: number | string): Promise<PostInstagram | undefined> {
        const db = await getDb();
        const r = await db.get<any>('SELECT * FROM Conteudo_IG WHERE id = ?', [id]);
        if (!r) return undefined;

        const checklistRows = await db.all<any[]>(
            `SELECT id, atividade_id as atividadeId, descricao, concluido as isCompleted 
             FROM Checklists WHERE atividade_id = ? AND tipo_atividade = 'POST'`,
            [r.id]
        );
        const linksRows = await db.all<any[]>(
            `SELECT id, atividade_id as atividadeId, tipo, titulo, link 
             FROM LinksAtividade WHERE atividade_id = ? AND tipo_atividade = 'POST'`,
            [r.id]
        );

        return {
            id: r.id,
            titulo: r.titulo,
            descricao: r.descricao,
            status: r.status,
            tipoPost: r.tipo_post,
            publicoAlvo: r.publico_alvo,
            deadline: r.data_programada,
            responsavelRoteiroId: r.responsavel_roteiro,
            responsavelDesignId: r.responsavel_design,
            checklist: checklistRows.map(c => ({
                id: Number(c.id),
                atividadeId: Number(c.atividadeId),
                descricao: c.descricao,
                isCompleted: Boolean(c.concluido || c.isCompleted)
            })),
            links: linksRows.map(l => ({
                id: Number(l.id),
                atividadeId: Number(l.atividadeId),
                tipo: l.tipo,
                link: l.link
            }))
        };
    }

    async create(data: CriarPostInstagramDTO): Promise<PostInstagram> {
        const db = await getDb();
        const result = await db.run(
            `INSERT INTO Conteudo_IG (titulo, descricao, status, data_programada, tipo_post, publico_alvo, responsavel_roteiro, responsavel_design)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                data.titulo,
                data.descricao || null,
                data.status || 'Backlog',
                data.deadline,
                data.tipoPost,
                data.publicoAlvo || null,
                data.responsavelRoteiroId || null,
                data.responsavelDesignId || null
            ]
        );
        const createdId = result.lastID;
        if (!createdId) throw new Error('Falha ao gerar o ID automático no SQLite');

        if (data.checklist && data.checklist.length > 0) {
            for (const item of data.checklist) {
                await db.run(
                    `INSERT INTO Checklists (atividade_id, tipo_atividade, descricao, concluido) VALUES (?, 'POST', ?, ?)`,
                    [createdId, item.descricao, item.isCompleted ? 1 : 0]
                );
            }
        }

        if (data.links && data.links.length > 0) {
            for (const link of data.links) {
                await db.run(
                    `INSERT INTO LinksAtividade (atividade_id, tipo_atividade, tipo, titulo, link) VALUES (?, 'POST', ?, ?, ?)`,
                    [createdId, link.tipo, link.link, link.link]
                );
            }
        }

        const created = await this.findById(createdId);
        if (!created) throw new Error('Falha ao recuperar o post recém-criado');
        return created;
    }

    async update(id: number | string, changes: AtualizarPostInstagramDTO): Promise<PostInstagram | undefined> {
        const existing = await this.findById(id);
        if (!existing) return undefined;

        const updated = { ...existing, ...changes };
        const db = await getDb();
        await db.run(
            `UPDATE Conteudo_IG SET titulo = ?, descricao = ?, status = ?, data_programada = ?, tipo_post = ?, publico_alvo = ?, responsavel_roteiro = ?, responsavel_design = ?
             WHERE id = ?`,
            [
                updated.titulo,
                updated.descricao || null,
                updated.status || 'Backlog',
                updated.deadline,
                updated.tipoPost,
                updated.publicoAlvo || null,
                updated.responsavelRoteiroId || null,
                updated.responsavelDesignId || null,
                id
            ]
        );

        if (changes.checklist !== undefined) {
            await db.run(`DELETE FROM Checklists WHERE atividade_id = ? AND tipo_atividade = 'POST'`, [String(id)]);
            if (changes.checklist.length > 0) {
                for (const item of changes.checklist) {
                    await db.run(
                        `INSERT INTO Checklists (atividade_id, tipo_atividade, descricao, concluido) VALUES (?, 'POST', ?, ?)`,
                        [String(id), item.descricao, item.isCompleted ? 1 : 0]
                    );
                }
            }
        }

        if (changes.links !== undefined) {
            await db.run(`DELETE FROM LinksAtividade WHERE atividade_id = ? AND tipo_atividade = 'POST'`, [String(id)]);
            if (changes.links.length > 0) {
                for (const link of changes.links) {
                    await db.run(
                        `INSERT INTO LinksAtividade (atividade_id, tipo_atividade, tipo, titulo, link) VALUES (?, 'POST', ?, ?, ?)`,
                        [String(id), link.tipo, link.link, link.link]
                    );
                }
            }
        }
        return this.findById(id);
    }

    async delete(id: number | string): Promise<boolean> {
        const db = await getDb();
        await db.run(`DELETE FROM Checklists WHERE atividade_id = ? AND tipo_atividade = 'POST'`, [id]);
        await db.run(`DELETE FROM LinksAtividade WHERE atividade_id = ? AND tipo_atividade = 'POST'`, [id]);
        const result = await db.run('DELETE FROM Conteudo_IG WHERE id = ?', id);
        return (result.changes ?? 0) > 0;
    }
}
