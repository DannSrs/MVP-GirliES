"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlanoAulaRepository = void 0;
const database_1 = require("../database/config/database");
class PlanoAulaRepository {
    async findAll() {
        const db = await (0, database_1.getDb)();
        const rows = await db.all('SELECT * FROM Aulas');
        const aulas = [];
        for (const r of rows) {
            const checklistRows = await db.all(`SELECT id, atividade_id as atividadeId, descricao as description, concluido as isCompleted 
                 FROM Checklists WHERE atividade_id = ? AND tipo_atividade = 'AULA'`, [String(r.id)]);
            const linksRows = await db.all(`SELECT id, atividade_id as atividadeId, tipo, link 
                 FROM LinksAtividade WHERE atividade_id = ? AND tipo_atividade = 'AULA'`, [String(r.id)]);
            aulas.push({
                id: r.id,
                titulo: r.titulo,
                descricao: r.descricao,
                categoria: r.categoria,
                dataHora: r.data_hora,
                local: r.local,
                status: r.status,
                linkPlanoAula: r.link_plano_aula,
                checklist: checklistRows.map(c => ({
                    id: String(c.id),
                    atividadeId: c.atividadeId,
                    description: c.description,
                    isCompleted: Boolean(c.isCompleted),
                    toggleStatus() { this.isCompleted = !this.isCompleted; }
                })),
                links: linksRows.map(l => ({
                    id: String(l.id),
                    atividadeId: l.atividadeId,
                    tipo: l.tipo,
                    link: l.link
                }))
            });
        }
        return aulas;
    }
    async findById(id) {
        const db = await (0, database_1.getDb)();
        const r = await db.get('SELECT * FROM Aulas WHERE id = ?', [id]);
        if (!r)
            return undefined;
        const checklistRows = await db.all(`SELECT id, atividade_id as atividadeId, descricao as description, concluido as isCompleted 
             FROM Checklists WHERE atividade_id = ? AND tipo_atividade = 'AULA'`, [String(r.id)]);
        const linksRows = await db.all(`SELECT id, atividade_id as atividadeId, tipo, link 
             FROM LinksAtividade WHERE atividade_id = ? AND tipo_atividade = 'AULA'`, [String(r.id)]);
        return {
            id: r.id,
            titulo: r.titulo,
            descricao: r.descricao,
            categoria: r.categoria,
            dataHora: r.data_hora,
            local: r.local,
            status: r.status,
            linkPlanoAula: r.link_plano_aula,
            checklist: checklistRows.map(c => ({
                id: String(c.id),
                atividadeId: c.atividadeId,
                description: c.description,
                isCompleted: Boolean(c.isCompleted),
                toggleStatus() { this.isCompleted = !this.isCompleted; }
            })),
            links: linksRows.map(l => ({
                id: String(l.id),
                atividadeId: l.atividadeId,
                tipo: l.tipo,
                link: l.link
            }))
        };
    }
    async create(data) {
        const db = await (0, database_1.getDb)();
        const result = await db.run(`INSERT INTO Aulas (titulo, descricao, categoria, data_hora, local, status, link_plano_aula)
             VALUES (?, ?, ?, ?, ?, ?, ?)`, [
            data.titulo,
            data.descricao || null,
            data.categoria || null,
            data.dataHora,
            data.local || null,
            data.status || 'Planejada',
            data.linkPlanoAula || null
        ]);
        const createdId = result.lastID;
        if (!createdId)
            throw new Error('Falha ao inserir aula no SQLite');
        if (data.checklist && data.checklist.length > 0) {
            for (const item of data.checklist) {
                await db.run(`INSERT INTO Checklists (atividade_id, tipo_atividade, descricao, concluido) VALUES (?, 'AULA', ?, ?)`, [String(createdId), item.description, item.isCompleted ? 1 : 0]);
            }
        }
        if (data.links && data.links.length > 0) {
            for (const link of data.links) {
                await db.run(`INSERT INTO LinksAtividade (atividade_id, tipo_atividade, tipo, titulo, link) VALUES (?, 'AULA', ?, ?, ?)`, [String(createdId), link.tipo, link.link, link.link]);
            }
        }
        const created = await this.findById(createdId);
        if (!created)
            throw new Error('Falha ao recuperar a aula recém-criada');
        return created;
    }
    async update(id, changes) {
        const existing = await this.findById(id);
        if (!existing)
            return undefined;
        const updated = { ...existing, ...changes };
        const db = await (0, database_1.getDb)();
        await db.run(`UPDATE Aulas SET titulo = ?, descricao = ?, categoria = ?, data_hora = ?, local = ?, status = ?, link_plano_aula = ?
             WHERE id = ?`, [
            updated.titulo,
            updated.descricao || null,
            updated.categoria || null,
            updated.dataHora,
            updated.local || null,
            updated.status || 'Planejada',
            updated.linkPlanoAula || null,
            id
        ]);
        return this.findById(id);
    }
    async delete(id) {
        const db = await (0, database_1.getDb)();
        await db.run(`DELETE FROM Checklists WHERE atividade_id = ? AND tipo_atividade = 'AULA'`, [String(id)]);
        await db.run(`DELETE FROM LinksAtividade WHERE atividade_id = ? AND tipo_atividade = 'AULA'`, [String(id)]);
        const result = await db.run('DELETE FROM Aulas WHERE id = ?', id);
        return (result.changes ?? 0) > 0;
    }
}
exports.PlanoAulaRepository = PlanoAulaRepository;
