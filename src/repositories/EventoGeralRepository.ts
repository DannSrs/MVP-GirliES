import { getDb } from '../database/config/database';
import { EventoGeral, CriarEventoGeralDTO, AtualizarEventoGeralDTO } from '../models/EventoGeral';
import { IRepository } from './IRepository';

export class EventoGeralRepository implements IRepository<EventoGeral, CriarEventoGeralDTO, AtualizarEventoGeralDTO> {
    async findAll(): Promise<EventoGeral[]> {
        const db = await getDb();
        const rows = await db.all<any[]>('SELECT * FROM Eventos');
        
        const eventos: EventoGeral[] = [];
        for (const r of rows) {
            const checklistRows = await db.all<any[]>(
                `SELECT id, atividade_id as atividadeId, descricao, concluido as isCompleted 
                 FROM Checklists WHERE atividade_id = ? AND tipo_atividade = 'EVENTO'`,
                [String(r.id)]
            );
            const linksRows = await db.all<any[]>(
                `SELECT id, atividade_id as atividadeId, tipo, titulo, link 
                 FROM LinksAtividade WHERE atividade_id = ? AND tipo_atividade = 'EVENTO'`,
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
                logisticsChecklist: checklistRows.map(c => ({
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
        return eventos;
    }

    async findById(id: number | string): Promise<EventoGeral | undefined> {
        const db = await getDb();
        const r = await db.get<any>('SELECT * FROM Eventos WHERE id = ?', [id]);
        if (!r) return undefined;

        const checklistRows = await db.all<any[]>(
            `SELECT id, atividade_id as atividadeId, descricao, concluido as isCompleted 
             FROM Checklists WHERE atividade_id = ? AND tipo_atividade = 'EVENTO'`,
            [String(r.id)]
        );
        const linksRows = await db.all<any[]>(
            `SELECT id, atividade_id as atividadeId, tipo, titulo, link 
             FROM LinksAtividade WHERE atividade_id = ? AND tipo_atividade = 'EVENTO'`,
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
            logisticsChecklist: checklistRows.map(c => ({
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

    async create(data: CriarEventoGeralDTO): Promise<EventoGeral> {
        const db = await getDb();
        const result = await db.run(
            `INSERT INTO Eventos (titulo, tipo_evento, regime_evento, data, horario_inicio, horario_fim, local, capacidade)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
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
        const createdId = result.lastID;
        if (!createdId) throw new Error('Falha ao inserir evento no SQLite');

        if (data.logisticsChecklist && data.logisticsChecklist.length > 0) {
            for (const item of data.logisticsChecklist) {
                await db.run(
                    `INSERT INTO Checklists (atividade_id, tipo_atividade, descricao, concluido) VALUES (?, 'EVENTO', ?, ?)`,
                    [String(createdId), item.descricao, item.isCompleted ? 1 : 0]
                );
            }
        }

        if (data.links && data.links.length > 0) {
            for (const link of data.links) {
                await db.run(
                    `INSERT INTO LinksAtividade (atividade_id, tipo_atividade, tipo, titulo, link) VALUES (?, 'EVENTO', ?, ?, ?)`,
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
        const db = await getDb();
        await db.run(
            `UPDATE Eventos SET titulo = ?, tipo_evento = ?, regime_evento = ?, data = ?, horario_inicio = ?, horario_fim = ?, local = ?, capacidade = ?
             WHERE id = ?`,
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
            await db.run(`DELETE FROM Checklists WHERE atividade_id = ? AND tipo_atividade = 'EVENTO'`, [String(id)]);
            if (changes.logisticsChecklist.length > 0) {
                for (const item of changes.logisticsChecklist) {
                    await db.run(
                        `INSERT INTO Checklists (atividade_id, tipo_atividade, descricao, concluido) VALUES (?, 'EVENTO', ?, ?)`,
                        [String(id), item.descricao, item.isCompleted ? 1 : 0]
                    );
                }
            }
        }

        if (changes.links !== undefined) {
            await db.run(`DELETE FROM LinksAtividade WHERE atividade_id = ? AND tipo_atividade = 'EVENTO'`, [String(id)]);
            if (changes.links.length > 0) {
                for (const link of changes.links) {
                    await db.run(
                        `INSERT INTO LinksAtividade (atividade_id, tipo_atividade, tipo, titulo, link) VALUES (?, 'EVENTO', ?, ?, ?)`,
                        [String(id), link.tipo, link.titulo || null, link.link]
                    );
                }
            }
        }
        
        return this.findById(id);
    }

    async delete(id: number | string): Promise<boolean> {
        const db = await getDb();
        await db.run(`DELETE FROM Checklists WHERE atividade_id = ? AND tipo_atividade = 'EVENTO'`, [String(id)]);
        await db.run(`DELETE FROM LinksAtividade WHERE atividade_id = ? AND tipo_atividade = 'EVENTO'`, [String(id)]);
        const result = await db.run('DELETE FROM Eventos WHERE id = ?', id);
        return (result.changes ?? 0) > 0;
    }
}
