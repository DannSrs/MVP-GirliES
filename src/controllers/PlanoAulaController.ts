import { Controller, Get, Post, Put, Patch, Delete, Route, Body, Path, Tags, Response } from 'tsoa';
import { PlanoAula, CriarPlanoAulaDTO, AtualizarPlanoAulaDTO } from '../models/PlanoAula';
import { PlanoAulaService } from '../services/PlanoAulaService';

@Route("api/aulas")
@Tags("Plano de Aulas")
export class PlanoAulaController extends Controller {
  private service = new PlanoAulaService();

  @Get()
  public async getAulas(): Promise<PlanoAula[]> {
    return this.service.listarTodas();
  }

  @Get("{id}")
  @Response(404, "Aula não encontrada")
  public async getAulaById(@Path() id: number): Promise<PlanoAula | undefined> {
    const aula = await this.service.buscarPorId(id);
    if (!aula) {
      this.setStatus(404);
      return undefined;
    }
    return aula;
  }

  @Post()
  @Response(400, "Erro de Validação")
  public async criarAula(@Body() requestBody: CriarPlanoAulaDTO): Promise<PlanoAula> {
    try {
      this.setStatus(201);
      return await this.service.criarAula(requestBody);
    } catch (error: any) {
      this.setStatus(400);
      throw error;
    }
  }

  @Put("{id}")
  @Response(404, "Aula não encontrada")
  @Response(400, "Erro de Validação")
  public async atualizarAula(
    @Path() id: number,
    @Body() requestBody: AtualizarPlanoAulaDTO
  ): Promise<PlanoAula | undefined> {
    try {
      const updated = await this.service.atualizarAula(id, requestBody);
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

  @Patch("{id}/status")
  @Response(404, "Aula não encontrada")
  @Response(400, "Erro de Validação")
  public async atualizarStatusAula(
    @Path() id: number,
    @Body() requestBody: { status: 'Em Preparação' | 'Confirmada' | 'Concluída' | 'Cancelada' }
  ): Promise<PlanoAula | undefined> {
    try {
      const updated = await this.service.atualizarAula(id, { status: requestBody.status });
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
  @Response(404, "Aula não encontrada")
  public async deletarAula(@Path() id: number): Promise<{ success: boolean }> {
    const deleted = await this.service.deletarAula(id);
    if (!deleted) {
      this.setStatus(404);
      return { success: false };
    }
    return { success: true };
  }
}
