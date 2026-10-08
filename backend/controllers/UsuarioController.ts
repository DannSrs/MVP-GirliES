import { Controller, Get, Post, Put, Delete, Route, Body, Path, Tags, Response } from 'tsoa';
import { Usuario, CriarUsuarioDTO, AtualizarUsuarioDTO } from '../models/Usuario';
import { UsuarioService } from '../services/UsuarioService';

@Route("api/usuarios")
@Tags("Usuários")
export class UsuarioController extends Controller {
  private service = new UsuarioService();

  @Get()
  public async getUsuarios(): Promise<Usuario[]> {
    return this.service.listarTodos();
  }

  @Get("{id}")
  @Response(404, "Usuário não encontrado")
  public async getUsuarioById(@Path() id: number): Promise<Usuario | undefined> {
    const usuario = await this.service.buscarPorId(id);
    if (!usuario) {
      this.setStatus(404);
      return undefined;
    }
    return usuario;
  }

  @Post()
  @Response(400, "Erro de Validação")
  public async criarUsuario(@Body() requestBody: CriarUsuarioDTO): Promise<Usuario & { senhaGerada?: string }> {
    try {
      this.setStatus(201);
      return await this.service.criarUsuario(requestBody);
    } catch (error: any) {
      this.setStatus(400);
      throw error;
    }
  }

  @Put("{id}")
  @Response(404, "Usuário não encontrado")
  @Response(400, "Erro de Validação")
  public async atualizarUsuario(
    @Path() id: number,
    @Body() requestBody: AtualizarUsuarioDTO
  ): Promise<Usuario | undefined> {
    try {
      const updated = await this.service.atualizarUsuario(id, requestBody);
      if (!updated) {
        this.setStatus(404);
        return undefined;
      }
      return updated;
    } catch (error: any) {
      this.setStatus(400);
      throw error;
    }
  }

  @Delete("{id}")
  @Response(404, "Usuário não encontrado")
  public async deletarUsuario(@Path() id: number): Promise<{ success: boolean }> {
    const deleted = await this.service.deletarUsuario(id);
    if (!deleted) {
      this.setStatus(404);
      return { success: false };
    }
    return { success: true };
  }

  @Get("{id}/token")
  @Response(404, "Usuário ou token não encontrado")
  public async getUsuarioToken(@Path() id: number): Promise<{ token: string }> {
    const token = await this.service.getToken(id);
    if (!token) {
      this.setStatus(404);
      throw new Error("Token não encontrado");
    }
    return { token };
  }
}
