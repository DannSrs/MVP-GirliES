import bcrypt from 'bcryptjs';
import { Usuario, CriarUsuarioDTO, AtualizarUsuarioDTO } from '../models/Usuario';
import { UsuarioRepository } from '../repositories/UsuarioRepository';

export class UsuarioService {
  private repository: UsuarioRepository;

  constructor() {
    this.repository = new UsuarioRepository();
  }

  public async listarTodos(): Promise<Usuario[]> {
    return this.repository.findAll();
  }

  public async buscarPorId(id: number): Promise<Usuario | undefined> {
    return this.repository.findById(id);
  }

  public async criarUsuario(dto: CriarUsuarioDTO): Promise<Usuario & { senhaGerada: string }> {
    // 1. Regra de validação de e-mail institucional
    if (!dto.email.endsWith('@discente.ifpe.edu.br')) {
      throw new Error("O e-mail deve pertencer ao domínio @discente.ifpe.edu.br");
    }

    // 2. Verificar duplicidade de e-mail
    const jaExiste = await this.repository.findByEmail(dto.email);
    if (jaExiste) {
      throw new Error("Já existe um usuário cadastrado com este e-mail.");
    }

    // 3. Regra de negócio: Geração de senha padrão e hash
    const ano = new Date().getFullYear();
    const roleStr = (dto.role || 'voluntaria').toUpperCase();
    const username = dto.email.split('@')[0].toUpperCase();
    const letraAleatoria = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    const numeroAleatorio = Math.floor(Math.random() * 10);
    const senhaGerada = `GIRLIES-IFPE-${ano}-${roleStr}-${username}-${letraAleatoria}${numeroAleatorio}`;
    const senhaHash = await bcrypt.hash(senhaGerada, 10);

    // 4. Repositório salva no banco
    const usuarioCriado = await this.repository.create(dto, senhaHash);

    return { ...usuarioCriado, senhaGerada };
  }

  public async atualizarUsuario(id: number, dto: AtualizarUsuarioDTO): Promise<Usuario | undefined> {
    if (dto.email && !dto.email.endsWith('@discente.ifpe.edu.br')) {
      throw new Error("O e-mail deve pertencer ao domínio @discente.ifpe.edu.br");
    }

    if (dto.email) {
      const jaExiste = await this.repository.findByEmail(dto.email);
      // Ensure we don't conflict with another user
      if (jaExiste && jaExiste.id !== id) {
        throw new Error("Já existe um usuário cadastrado com este e-mail.");
      }
    }

    return this.repository.update(id, dto);
  }

  public async deletarUsuario(id: number): Promise<boolean> {
    return this.repository.delete(id);
  }
}
