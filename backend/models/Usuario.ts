export interface Usuario {
    id: number;
    nome: string;
    email: string;
    funcaoInterna: string;
    curso: string;
    periodo: string;
    senha?: string;
    role: 'professora' | 'voluntaria' | 'adm';
}

export interface CriarUsuarioDTO extends Omit<Usuario, 'id' | 'senha' | 'role'> {
    role?: 'professora' | 'voluntaria' | 'adm';
    // Opcionalmente podemos permitir criar um usuário já passando a senha, mas pela regra de negócio, 
    // o sistema gera a senha padrão
}

export type AtualizarUsuarioDTO = Partial<CriarUsuarioDTO>;