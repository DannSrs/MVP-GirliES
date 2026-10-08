import { getDb } from '../database/config/database';
import { Usuario, CriarUsuarioDTO, AtualizarUsuarioDTO } from '../models/Usuario';
import { IRepository } from './IRepository';

export class UsuarioRepository implements IRepository<Usuario, CriarUsuarioDTO, AtualizarUsuarioDTO> {
    async findAll(): Promise<Usuario[]> {
        const pool = await getDb();
        const result = await pool.query('SELECT id, nome, email, funcao_interna as "funcaoInterna", curso, periodo, role FROM Usuarios');
        
        return result.rows.map(r => ({
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
        const pool = await getDb();
        const result = await pool.query('SELECT id, nome, email, funcao_interna as "funcaoInterna", curso, periodo, role FROM Usuarios WHERE id = $1', [id]);
        
        if (result.rows.length === 0) return undefined;
        const r = result.rows[0];

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

    async findByEmail(email: string): Promise<(Usuario & { token?: string, senha?: string }) | undefined> {
        const pool = await getDb();
        const result = await pool.query('SELECT * FROM Usuarios WHERE email = $1', [email]);
        
        if (result.rows.length === 0) return undefined;
        const r = result.rows[0];

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
        const pool = await getDb();

        const result = await pool.query(
            `INSERT INTO Usuarios (nome, email, funcao_interna, curso, periodo, senha, token, role) 
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`,
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

        const createdId = result.rows[0]?.id;
        if (!createdId) throw new Error('Falha ao inserir usuário no banco.');

        const user = await this.findById(createdId);
        if (!user) throw new Error('Falha ao recuperar usuário recém-criado');

        return user;
    }

    async update(id: number | string, changes: AtualizarUsuarioDTO): Promise<Usuario | undefined> {
        const existing = await this.findById(id);
        if (!existing) return undefined;

        const updated = { ...existing, ...changes };
        const pool = await getDb();

        await pool.query(
            `UPDATE Usuarios SET nome = $1, email = $2, funcao_interna = $3, curso = $4, periodo = $5, role = $6
             WHERE id = $7`,
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
        const pool = await getDb();
        const result = await pool.query('SELECT token FROM Usuarios WHERE id = $1', [id]);
        if (result.rows.length === 0) return undefined;
        return result.rows[0].token;
    }

    async delete(id: number | string): Promise<boolean> {
        const pool = await getDb();
        const result = await pool.query('DELETE FROM Usuarios WHERE id = $1', [id]);
        return (result.rowCount ?? 0) > 0;
    }
}
