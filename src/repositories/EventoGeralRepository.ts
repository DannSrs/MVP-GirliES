import { getDb } from '../database/config/database';
import { EventoGeral, CriarEventoGeralDTO, AtualizarEventoGeralDTO } from '../models/EventoGeral';
import { IRepository } from './IRepository';

export class EventoGeralRepository implements IRepository<EventoGeral, CriarEventoGeralDTO, AtualizarEventoGeralDTO> {
    async findAll(): Promise<EventoGeral[]> {
        const pool = await getDb();
        const result = await pool.query('SELECT * FROM Eventos');
        
        const eventos: EventoGeral[] = [];
        for (const r of result.rows) {
            const checklistResult = await pool.query(
                `SELECT id, atividade_id as "atividadeId", descricao, concluido as "isCompleted" 
                 FROM Checklists WHERE atividade_id = $1 AND tipo_atividade = 'EVENTO'`,
                [String(r.id)]
            );
            const linksResult = await pool.query(
                `SELECT id, atividade_id as "atividadeId", tipo, titulo, link 
                 FROM LinksAtividade WHERE atividade_id = $1 AND tipo_atividade = 'EVENTO'`,
                [String(r.id)]
            );

            eventos.push({
                id: r.id,
                titulo: r.titulo,
                tipo: 'EVENTO',
                tipoEvento: r.tipo_evento,
                regimeEvento: r.regime_evento,
                data: r.data,
                horarioInicio: r.horario_inicio,
                horarioFim: r.horario_fim,
                local: r.local,
                capacidade: r.capacidade,
                logisticsChecklist: checklistResult.rows.map(c => ({
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
                }))
            });
        }
        return eventos;
    }

    async findById(id: number | string): Promise<EventoGeral | undefined> {
        const pool = await getDb();
        const result = await pool.query('SELECT * FROM Eventos WHERE id = $1', [id]);
        if (result.rows.length === 0) return undefined;
        const r = result.rows[0];

        const checklistResult = await pool.query(
            `SELECT id, atividade_id as "atividadeId", descricao, concluido as "isCompleted" 
             FROM Checklists WHERE atividade_id = $1 AND tipo_atividade = 'EVENTO'`,
            [String(r.id)]
        );
        const linksResult = await pool.query(
            `SELECT id, atividade_id as "atividadeId", tipo, titulo, link 
             FROM LinksAtividade WHERE atividade_id = $1 AND tipo_atividade = 'EVENTO'`,
            [String(r.id)]
        );

        return {
            id: r.id,
            titulo: r.titulo,
            tipo: 'EVENTO',
            tipoEvento: r.tipo_evento,
            regimeEvento: r.regime_evento,
            data: r.data,
            horarioInicio: r.horario_inicio,
            horarioFim: r.horario_fim,
            local: r.local,
            capacidade: r.capacidade,
            logisticsChecklist: checklistResult.rows.map(c => ({
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
            }))
        };
    }

    async create(data: CriarEventoGeralDTO): Promise<EventoGeral> {
        const pool = await getDb();
        const result = await pool.query(
            `INSERT INTO Eventos (titulo, tipo_evento, regime_evento, data, horario_inicio, horario_fim, local, capacidade)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`,
            [
                data.titulo,
                data.tipoEvento,
                data.regimeEvento,
                data.data,
                data.horarioInicio,
                data.horarioFim,
                data.local || null,
                data.capacidade || null
            ]
        );
        const createdId = result.rows[0]?.id;
        if (!createdId) throw new Error('Falha ao inserir evento no PostgreSQL');

        if (data.logisticsChecklist && data.logisticsChecklist.length > 0) {
            for (const item of data.logisticsChecklist) {
                await pool.query(
                    `INSERT INTO Checklists (atividade_id, tipo_atividade, descricao, concluido) VALUES ($1, 'EVENTO', $2, $3)`,
                    [String(createdId), item.descricao, item.isCompleted]
                );
            }
        }

        if (data.links && data.links.length > 0) {
            for (const link of data.links) {
                await pool.query(
                    `INSERT INTO LinksAtividade (atividade_id, tipo_atividade, tipo, titulo, link) VALUES ($1, 'EVENTO', $2, $3, $4)`,
                    [String(createdId), link.tipo, link.titulo || null, link.link]
                );
            }
        }

        const created = await this.findById(createdId);
        if (!created) throw new Error('Falha ao recuperar o evento recém-criado');
        return created;
    }

    async update(id: number | string, changes: AtualizarEventoGeralDTO): Promise<EventoGeral | undefined> {
        const existing = await this.findById(id);
        if (!existing) return undefined;

        const updated = { ...existing, ...changes };
        const pool = await getDb();
        await pool.query(
            `UPDATE Eventos SET titulo = $1, tipo_evento = $2, regime_evento = $3, data = $4, horario_inicio = $5, horario_fim = $6, local = $7, capacidade = $8
             WHERE id = $9`,
            [
                updated.titulo,
                updated.tipoEvento,
                updated.regimeEvento,
                updated.data,
                updated.horarioInicio,
                updated.horarioFim,
                updated.local || null,
                updated.capacidade || null,
                id
            ]
        );

        if (changes.logisticsChecklist !== undefined) {
            await pool.query(`DELETE FROM Checklists WHERE atividade_id = $1 AND tipo_atividade = 'EVENTO'`, [String(id)]);
            if (changes.logisticsChecklist.length > 0) {
                for (const item of changes.logisticsChecklist) {
                    await pool.query(
                        `INSERT INTO Checklists (atividade_id, tipo_atividade, descricao, concluido) VALUES ($1, 'EVENTO', $2, $3)`,
                        [String(id), item.descricao, item.isCompleted]
                    );
                }
            }
        }

        if (changes.links !== undefined) {
            await pool.query(`DELETE FROM LinksAtividade WHERE atividade_id = $1 AND tipo_atividade = 'EVENTO'`, [String(id)]);
            if (changes.links.length > 0) {
                for (const link of changes.links) {
                    await pool.query(
                        `INSERT INTO LinksAtividade (atividade_id, tipo_atividade, tipo, titulo, link) VALUES ($1, 'EVENTO', $2, $3, $4)`,
                        [String(id), link.tipo, link.titulo || null, link.link]
                    );
                }
            }
        }
        
        return this.findById(id);
    }

    async delete(id: number | string): Promise<boolean> {
        const pool = await getDb();
        await pool.query(`DELETE FROM Checklists WHERE atividade_id = $1 AND tipo_atividade = 'EVENTO'`, [String(id)]);
        await pool.query(`DELETE FROM LinksAtividade WHERE atividade_id = $1 AND tipo_atividade = 'EVENTO'`, [String(id)]);
        const result = await pool.query('DELETE FROM Eventos WHERE id = $1', [id]);
        return (result.rowCount ?? 0) > 0;
    }
}
