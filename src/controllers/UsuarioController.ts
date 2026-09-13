import { Controller, Get, Post, Put, Delete, Route, Body, Path, Tags, Response } from 'tsoa';
import { Usuario, CriarUsuarioDTO, AtualizarUsuarioDTO } from '../models/Usuario';
import { UsuarioRepository } from '../repositories/UsuarioRepository';

@Route("api/usuarios")
@Tags("Usuários")
export class UsuarioController extends Controller {
  private repository = new UsuarioRepository();

  @Get()
  public async getUsuarios(): Promise<Usuario[]> {
    return this.repository.findAll();
  }

  @Get("{id}")
  @Response(404, "Usuário não encontrado")
  public async getUsuarioById(@Path() id: number): Promise<Usuario | undefined> {
    const usuario = await this.repository.findById(id);
    if (!usuario) {
      this.setStatus(404);
      return undefined;
    }
    return usuario;
  }

  @Post()
  @Response(400, "Erro de Validação")
  public async criarUsuario(@Body() requestBody: CriarUsuarioDTO): Promise<Usuario & { senhaGerada?: string }> {
    // Basic validation for ifpe email
    if (!requestBody.email.endsWith('@discente.ifpe.edu.br')) {
      this.setStatus(400);
      throw new Error("O e-mail deve pertencer ao domínio @discente.ifpe.edu.br");
    }

    this.setStatus(201);
    return this.repository.create(requestBody);
  }

  @Put("{id}")
  @Response(404, "Usuário não encontrado")
  public async atualizarUsuario(
    @Path() id: number,
    @Body() requestBody: AtualizarUsuarioDTO
  ): Promise<Usuario | undefined> {
    const updated = await this.repository.update(id, requestBody);
    if (!updated) {
      this.setStatus(404);
      return undefined;
    }
    return updated;
  }

  @Delete("{id}")
  @Response(404, "Usuário não encontrado")
  public async deletarUsuario(@Path() id: number): Promise<{ success: boolean }> {
    const deleted = await this.repository.delete(id);
    if (!deleted) {
      this.setStatus(404);
      return { success: false };
    }
    return { success: true };
  }
}
