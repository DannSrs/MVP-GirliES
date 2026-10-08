import { getDb } from '../database/config/database';
import { PlanoAula, CriarPlanoAulaDTO, AtualizarPlanoAulaDTO } from '../models/PlanoAula';
import { IRepository } from './IRepository';

export class PlanoAulaRepository implements IRepository<PlanoAula, CriarPlanoAulaDTO, AtualizarPlanoAulaDTO> {
    async findAll(): Promise<PlanoAula[]> {
        const pool = await getDb();
        const result = await pool.query(`
            SELECT a.*, m.nome as modulo_nome 
            FROM Aulas a 
            LEFT JOIN Modulos m ON a.modulo_id = m.id 
            ORDER BY a.data_hora ASC
        `);
        
        const aulas: PlanoAula[] = [];
        for (const r of result.rows) {
            const checklistResult = await pool.query(
                `SELECT id, atividade_id as "atividadeId", descricao, concluido as "isCompleted" 
                 FROM Checklists WHERE atividade_id = $1 AND tipo_atividade = 'AULA'`,
                [String(r.id)]
            );
            const linksResult = await pool.query(
                `SELECT id, atividade_id as "atividadeId", tipo, titulo, link 
                 FROM LinksAtividade WHERE atividade_id = $1 AND tipo_atividade = 'AULA'`,
                [String(r.id)]
            );
            const responsaveisResult = await pool.query(
                `SELECT usuario_id FROM Aula_Responsavel WHERE aula_id = $1`,
                [r.id]
            );

            aulas.push({
                id: r.id,
                titulo: r.titulo,
                descricao: r.descricao,
                categoria: r.categoria,
                moduloId: r.modulo_id ? Number(r.modulo_id) : undefined,
                moduloNome: r.modulo_nome || undefined,
                dataHora: r.data_hora,
                local: r.local,
                status: r.status,
                linkPlanoAula: r.link_plano_aula,
                linkSlide: r.link_slide,
                linkRoteiro: r.link_roteiro,
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
                    titulo: l.titulo,
                    link: l.link
                })),
                responsaveisId: responsaveisResult.rows.map(rv => Number(rv.usuario_id))
            });
        }
        return aulas;
    }

    async findById(id: number | string): Promise<PlanoAula | undefined> {
        const pool = await getDb();
        const result = await pool.query(`
            SELECT a.*, m.nome as modulo_nome 
            FROM Aulas a 
            LEFT JOIN Modulos m ON a.modulo_id = m.id 
            WHERE a.id = $1
        `, [id]);
        if (result.rows.length === 0) return undefined;
        const r = result.rows[0];

        const checklistResult = await pool.query(
            `SELECT id, atividade_id as "atividadeId", descricao, concluido as "isCompleted" 
             FROM Checklists WHERE atividade_id = $1 AND tipo_atividade = 'AULA'`,
            [String(r.id)]
        );
        const linksResult = await pool.query(
            `SELECT id, atividade_id as "atividadeId", tipo, titulo, link 
             FROM LinksAtividade WHERE atividade_id = $1 AND tipo_atividade = 'AULA'`,
            [String(r.id)]
        );
        const responsaveisResult = await pool.query(
            `SELECT usuario_id FROM Aula_Responsavel WHERE aula_id = $1`,
            [r.id]
        );

        return {
            id: r.id,
            titulo: r.titulo,
            descricao: r.descricao,
            categoria: r.categoria,
            moduloId: r.modulo_id ? Number(r.modulo_id) : undefined,
            moduloNome: r.modulo_nome || undefined,
            dataHora: r.data_hora,
            local: r.local,
            status: r.status,
            linkPlanoAula: r.link_plano_aula,
            linkSlide: r.link_slide,
            linkRoteiro: r.link_roteiro,
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
                titulo: l.titulo,
                link: l.link
            })),
            responsaveisId: responsaveisResult.rows.map(rv => Number(rv.usuario_id))
        };
    }

    async create(data: CriarPlanoAulaDTO): Promise<PlanoAula> {
        const pool = await getDb();
        const result = await pool.query(
            `INSERT INTO Aulas (titulo, descricao, categoria, modulo_id, data_hora, local, status, link_plano_aula, link_slide, link_roteiro)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id`,
            [
                data.titulo,
                data.descricao || null,
                data.categoria || null,
                data.moduloId || null,
                data.dataHora,
                data.local || null,
                data.status || 'Em Preparação',
                data.linkPlanoAula || null,
                data.linkSlide || null,
                data.linkRoteiro || null
            ]
        );
        const createdId = result.rows[0]?.id;
        if (!createdId) throw new Error('Falha ao inserir aula no PostgreSQL');

        if (data.checklist && data.checklist.length > 0) {
            for (const item of data.checklist) {
                await pool.query(
                    `INSERT INTO Checklists (atividade_id, tipo_atividade, descricao, concluido) VALUES ($1, 'AULA', $2, $3)`,
                    [String(createdId), item.descricao, item.isCompleted]
                );
            }
        }

        if (data.links && data.links.length > 0) {
            for (const link of data.links) {
                await pool.query(
                    `INSERT INTO LinksAtividade (atividade_id, tipo_atividade, tipo, titulo, link) VALUES ($1, 'AULA', $2, $3, $4)`,
                    [String(createdId), link.tipo, link.titulo || null, link.link]
                );
            }
        }

        if (data.responsaveisId && data.responsaveisId.length > 0) {
            for (const respId of data.responsaveisId) {
                await pool.query(
                    `INSERT INTO Aula_Responsavel (aula_id, usuario_id) VALUES ($1, $2)`,
                    [createdId, respId]
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
        const pool = await getDb();
        await pool.query(
            `UPDATE Aulas SET titulo = $1, descricao = $2, categoria = $3, modulo_id = $4, data_hora = $5, local = $6, status = $7, link_plano_aula = $8, link_slide = $9, link_roteiro = $10
             WHERE id = $11`,
            [
                updated.titulo,
                updated.descricao || null,
                updated.categoria || null,
                updated.moduloId || null,
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
            await pool.query(`DELETE FROM Checklists WHERE atividade_id = $1 AND tipo_atividade = 'AULA'`, [String(id)]);
            if (changes.checklist.length > 0) {
                for (const item of changes.checklist) {
                    await pool.query(
                        `INSERT INTO Checklists (atividade_id, tipo_atividade, descricao, concluido) VALUES ($1, 'AULA', $2, $3)`,
                        [String(id), item.descricao, item.isCompleted]
                    );
                }
            }
        }

        if (changes.links !== undefined) {
            await pool.query(`DELETE FROM LinksAtividade WHERE atividade_id = $1 AND tipo_atividade = 'AULA'`, [String(id)]);
            if (changes.links.length > 0) {
                for (const link of changes.links) {
                    await pool.query(
                        `INSERT INTO LinksAtividade (atividade_id, tipo_atividade, tipo, titulo, link) VALUES ($1, 'AULA', $2, $3, $4)`,
                        [String(id), link.tipo, link.titulo || null, link.link]
                    );
                }
            }
        }

        if (changes.responsaveisId !== undefined) {
            await pool.query(`DELETE FROM Aula_Responsavel WHERE aula_id = $1`, [id]);
            if (changes.responsaveisId.length > 0) {
                for (const respId of changes.responsaveisId) {
                    await pool.query(
                        `INSERT INTO Aula_Responsavel (aula_id, usuario_id) VALUES ($1, $2)`,
                        [id, respId]
                    );
                }
            }
        }
        return this.findById(id);
    }

    async delete(id: number | string): Promise<boolean> {
        const pool = await getDb();
        await pool.query(`DELETE FROM Checklists WHERE atividade_id = $1 AND tipo_atividade = 'AULA'`, [String(id)]);
        await pool.query(`DELETE FROM LinksAtividade WHERE atividade_id = $1 AND tipo_atividade = 'AULA'`, [String(id)]);
        await pool.query(`DELETE FROM Aula_Responsavel WHERE aula_id = $1`, [id]);
        const result = await pool.query('DELETE FROM Aulas WHERE id = $1', [id]);
        return (result.rowCount ?? 0) > 0;
    }
}