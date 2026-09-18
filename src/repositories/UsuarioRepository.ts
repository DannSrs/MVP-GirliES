import { getDb } from '../database/config/database';
import { Usuario, CriarUsuarioDTO, AtualizarUsuarioDTO } from '../models/Usuario';
import { IRepository } from './IRepository';

export class UsuarioRepository implements IRepository<Usuario, CriarUsuarioDTO, AtualizarUsuarioDTO> {
    async findAll(): Promise<Usuario[]> {
        const db = await getDb();
        const rows = await db.all<any[]>('SELECT id, nome, email, funcao_interna as funcaoInterna, curso, periodo, role FROM Usuarios');
        
        return rows.map(r => ({
            id: r.id,
            nome: r.nome,
            email: r.email,
            funcaoInterna: r.funcaoInterna,
            curso: r.curso,
            periodo: r.periodo,
            role: r.role
        }));
    }

    async findById(id: number | string): Promise<Usuario | undefined> {
        const db = await getDb();
        const r = await db.get<any>('SELECT id, nome, email, funcao_interna as funcaoInterna, curso, periodo, role FROM Usuarios WHERE id = ?', [id]);
        
        if (!r) return undefined;

        return {
            id: r.id,
            nome: r.nome,
            email: r.email,
            funcaoInterna: r.funcaoInterna,
            curso: r.curso,
            periodo: r.periodo,
            role: r.role
        };
    }

    async findByEmail(email: string): Promise<(Usuario & { token?: string }) | undefined> {
        const db = await getDb();
        const r = await db.get<any>('SELECT * FROM Usuarios WHERE email = ?', [email]);
        
        if (!r) return undefined;

        return {
            id: r.id,
            nome: r.nome,
            email: r.email,
            funcaoInterna: r.funcao_interna,
            curso: r.curso,
            periodo: r.periodo,
            senha: r.senha,
            token: r.token,
            role: r.role
        };
    }

    async create(data: CriarUsuarioDTO, senhaHash?: string, plainToken?: string): Promise<Usuario> {
        const db = await getDb();

        const result = await db.run(
            `INSERT INTO Usuarios (nome, email, funcao_interna, curso, periodo, senha, token, role) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                data.nome,
                data.email,
                data.funcaoInterna,
                data.curso,
                data.periodo,
                senhaHash || null,
                plainToken || null,
                data.role || 'voluntaria'
            ]
        );

        const createdId = result.lastID;
        if (!createdId) throw new Error('Falha ao inserir usuário no banco.');

        const user = await this.findById(createdId);
        if (!user) throw new Error('Falha ao recuperar usuário recém-criado');

        return user;
    }

    async update(id: number | string, changes: AtualizarUsuarioDTO): Promise<Usuario | undefined> {
        const existing = await this.findById(id);
        if (!existing) return undefined;

        const updated = { ...existing, ...changes };
        const db = await getDb();

        await db.run(
            `UPDATE Usuarios SET nome = ?, email = ?, funcao_interna = ?, curso = ?, periodo = ?, role = ?
             WHERE id = ?`,
            [
                updated.nome,
                updated.email,
                updated.funcaoInterna,
                updated.curso,
                updated.periodo,
                updated.role,
                id
            ]
        );

        return this.findById(id);
    }

    async getToken(id: number | string): Promise<string | undefined> {
        const db = await getDb();
        const r = await db.get<any>('SELECT token FROM Usuarios WHERE id = ?', [id]);
        return r?.token;
    }

    async delete(id: number | string): Promise<boolean> {
        const db = await getDb();
        const result = await db.run('DELETE FROM Usuarios WHERE id = ?', [id]);
        return (result.changes ?? 0) > 0;
    }
}
