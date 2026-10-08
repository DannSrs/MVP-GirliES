import { getDb } from '../database/config/database';
import { PostInstagram, CriarPostInstagramDTO, AtualizarPostInstagramDTO } from '../models/PostInstagram';
import { IRepository } from './IRepository';

export class PostInstagramRepository implements IRepository<PostInstagram, CriarPostInstagramDTO, AtualizarPostInstagramDTO> {
    async findAll(): Promise<PostInstagram[]> {
        const pool = await getDb();
        const result = await pool.query('SELECT * FROM Conteudo_IG');
        
        const posts: PostInstagram[] = [];
        for (const r of result.rows) {
            const checklistResult = await pool.query(
                `SELECT id, atividade_id as "atividadeId", descricao, concluido as "isCompleted" 
                 FROM Checklists WHERE atividade_id = $1 AND tipo_atividade = 'POST'`,
                [String(r.id)]
            );
            const linksResult = await pool.query(
                `SELECT id, atividade_id as "atividadeId", tipo, titulo, link 
                 FROM LinksAtividade WHERE atividade_id = $1 AND tipo_atividade = 'POST'`,
                [String(r.id)]
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
                checklist: checklistResult.rows.map(c => ({
                    id: Number(c.id),
                    atividadeId: Number(c.atividadeId),
                    descricao: c.descricao,
                    isCompleted: Boolean(c.isCompleted)
                })),
                links: linksResult.rows.map(l => ({
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
        const pool = await getDb();
        const result = await pool.query('SELECT * FROM Conteudo_IG WHERE id = $1', [id]);
        if (result.rows.length === 0) return undefined;
        const r = result.rows[0];

        const checklistResult = await pool.query(
            `SELECT id, atividade_id as "atividadeId", descricao, concluido as "isCompleted" 
             FROM Checklists WHERE atividade_id = $1 AND tipo_atividade = 'POST'`,
            [String(r.id)]
        );
        const linksResult = await pool.query(
            `SELECT id, atividade_id as "atividadeId", tipo, titulo, link 
             FROM LinksAtividade WHERE atividade_id = $1 AND tipo_atividade = 'POST'`,
            [String(r.id)]
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
            checklist: checklistResult.rows.map(c => ({
                id: Number(c.id),
                atividadeId: Number(c.atividadeId),
                descricao: c.descricao,
                isCompleted: Boolean(c.isCompleted)
            })),
            links: linksResult.rows.map(l => ({
                id: Number(l.id),
                atividadeId: Number(l.atividadeId),
                tipo: l.tipo,
                link: l.link
            }))
        };
    }

    async create(data: CriarPostInstagramDTO): Promise<PostInstagram> {
        const pool = await getDb();
        const result = await pool.query(
            `INSERT INTO Conteudo_IG (titulo, descricao, status, data_programada, tipo_post, publico_alvo, responsavel_roteiro, responsavel_design)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`,
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
        const createdId = result.rows[0]?.id;
        if (!createdId) throw new Error('Falha ao gerar o ID automático no PostgreSQL');

        if (data.checklist && data.checklist.length > 0) {
            for (const item of data.checklist) {
                await pool.query(
                    `INSERT INTO Checklists (atividade_id, tipo_atividade, descricao, concluido) VALUES ($1, 'POST', $2, $3)`,
                    [createdId, item.descricao, item.isCompleted]
                );
            }
        }

        if (data.links && data.links.length > 0) {
            for (const link of data.links) {
                await pool.query(
                    `INSERT INTO LinksAtividade (atividade_id, tipo_atividade, tipo, titulo, link) VALUES ($1, 'POST', $2, $3, $4)`,
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
        const pool = await getDb();
        await pool.query(
            `UPDATE Conteudo_IG SET titulo = $1, descricao = $2, status = $3, data_programada = $4, tipo_post = $5, publico_alvo = $6, responsavel_roteiro = $7, responsavel_design = $8
             WHERE id = $9`,
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
            await pool.query(`DELETE FROM Checklists WHERE atividade_id = $1 AND tipo_atividade = 'POST'`, [String(id)]);
            if (changes.checklist.length > 0) {
                for (const item of changes.checklist) {
                    await pool.query(
                        `INSERT INTO Checklists (atividade_id, tipo_atividade, descricao, concluido) VALUES ($1, 'POST', $2, $3)`,
                        [String(id), item.descricao, item.isCompleted]
                    );
                }
            }
        }

        if (changes.links !== undefined) {
            await pool.query(`DELETE FROM LinksAtividade WHERE atividade_id = $1 AND tipo_atividade = 'POST'`, [String(id)]);
            if (changes.links.length > 0) {
                for (const link of changes.links) {
                    await pool.query(
                        `INSERT INTO LinksAtividade (atividade_id, tipo_atividade, tipo, titulo, link) VALUES ($1, 'POST', $2, $3, $4)`,
                        [String(id), link.tipo, link.link, link.link]
                    );
                }
            }
        }
        return this.findById(id);
    }

    async delete(id: number | string): Promise<boolean> {
        const pool = await getDb();
        await pool.query(`DELETE FROM Checklists WHERE atividade_id = $1 AND tipo_atividade = 'POST'`, [String(id)]);
        await pool.query(`DELETE FROM LinksAtividade WHERE atividade_id = $1 AND tipo_atividade = 'POST'`, [String(id)]);
        const result = await pool.query('DELETE FROM Conteudo_IG WHERE id = $1', [id]);
        return (result.rowCount ?? 0) > 0;
    }
}
