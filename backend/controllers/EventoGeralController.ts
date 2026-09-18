import { Controller, Get, Post, Put, Delete, Route, Body, Path, Tags, Response } from 'tsoa';
import { EventoGeral, CriarEventoGeralDTO, AtualizarEventoGeralDTO } from '../models/EventoGeral';
import { EventoGeralService } from '../services/EventoGeralService';

@Route("api/eventos")
@Tags("Eventos Gerais")
export class EventoGeralController extends Controller {
  private service = new EventoGeralService();

  @Get()
  public async getEventos(): Promise<EventoGeral[]> {
    return this.service.listarTodos();
  }

  @Get("{id}")
  @Response(404, "Evento não encontrado")
  public async getEventoById(@Path() id: number): Promise<EventoGeral | undefined> {
    const evento = await this.service.buscarPorId(id);
    if (!evento) {
      this.setStatus(404);
      return undefined;
    }
    return evento;
  }

  @Post()
  @Response(400, "Erro de Validação")
  public async criarEvento(@Body() requestBody: CriarEventoGeralDTO): Promise<EventoGeral> {
    try {
      this.setStatus(201);
      return await this.service.criarEvento(requestBody);
    } catch (error: any) {
      this.setStatus(400);
      throw error;
    }
  }

  @Put("{id}")
  @Response(404, "Evento não encontrado")
  @Response(400, "Erro de Validação")
  public async atualizarEvento(
    @Path() id: number,
    @Body() requestBody: AtualizarEventoGeralDTO
  ): Promise<EventoGeral | undefined> {
    try {
      const updated = await this.service.atualizarEvento(id, requestBody);
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
  @Response(404, "Evento não encontrado")
  public async deletarEvento(@Path() id: number): Promise<{ success: boolean }> {
    const deleted = await this.service.deletarEvento(id);
    if (!deleted) {
      this.setStatus(404);
      return { success: false };
    }
    return { success: true };
  }
}
