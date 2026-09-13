import { Controller, Get, Post, Put, Delete, Route, Body, Path, Tags, Response } from 'tsoa';
import { PlanoAula, CriarPlanoAulaDTO, AtualizarPlanoAulaDTO } from '../models/PlanoAula';
import { PlanoAulaRepository } from '../repositories/PlanoAulaRepository';

@Route("api/aulas")
@Tags("Plano de Aulas")
export class PlanoAulaController extends Controller {
  private repository = new PlanoAulaRepository();

  @Get()
  public async getAulas(): Promise<PlanoAula[]> {
    return this.repository.findAll();
  }

  @Get("{id}")
  @Response(404, "Aula não encontrada")
  public async getAulaById(@Path() id: number): Promise<PlanoAula | undefined> {
    const aula = await this.repository.findById(id);
    if (!aula) {
      this.setStatus(404);
      return undefined;
    }
    return aula;
  }

  @Post()
  public async criarAula(@Body() requestBody: CriarPlanoAulaDTO): Promise<PlanoAula> {
    this.setStatus(201);
    return this.repository.create(requestBody);
  }

  @Put("{id}")
  @Response(404, "Aula não encontrada")
  public async atualizarAula(
    @Path() id: number,
    @Body() requestBody: AtualizarPlanoAulaDTO
  ): Promise<PlanoAula | undefined> {
    const updated = await this.repository.update(id, requestBody);
    if (!updated) {
      this.setStatus(404);
      return undefined;
    }
    return updated;
  }

  @Delete("{id}")
  @Response(404, "Aula não encontrada")
  public async deletarAula(@Path() id: number): Promise<{ success: boolean }> {
    const deleted = await this.repository.delete(id);
    if (!deleted) {
      this.setStatus(404);
      return { success: false };
    }
    return { success: true };
  }
}
