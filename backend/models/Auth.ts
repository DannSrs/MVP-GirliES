import type { Usuario } from './Usuario';

export interface LoginRequestDTO {
    email: string;
    token: string;
}

export interface LoginResponseDTO {
    usuario: Omit<Usuario, 'senha'>;
}
