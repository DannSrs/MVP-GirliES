import { Controller, Get, Post, Put, Delete, Route, Body, Path, Tags, Response } from 'tsoa';
import { EventoGeral, CriarEventoGeralDTO, AtualizarEventoGeralDTO } from '../models/EventoGeral';
import { EventoGeralRepository } from '../repositories/EventoGeralRepository';

@Route("api/eventos")
@Tags("Eventos Gerais")
export class EventoGeralController extends Controller {
  private repository = new EventoGeralRepository();

  @Get()
  public async getEventos(): Promise<EventoGeral[]> {
    return this.repository.findAll();
  }

  @Get("{id}")
  @Response(404, "Evento não encontrado")
  public async getEventoById(@Path() id: number): Promise<EventoGeral | undefined> {
    const evento = await this.repository.findById(id);
    if (!evento) {
      this.setStatus(404);
      return undefined;
    }
    return evento;
  }

  @Post()
  public async criarEvento(@Body() requestBody: CriarEventoGeralDTO): Promise<EventoGeral> {
    this.setStatus(201);
    return this.repository.create(requestBody);
  }

  @Put("{id}")
  @Response(404, "Evento não encontrado")
  public async atualizarEvento(
    @Path() id: number,
    @Body() requestBody: AtualizarEventoGeralDTO
  ): Promise<EventoGeral | undefined> {
    const updated = await this.repository.update(id, requestBody);
    if (!updated) {
      this.setStatus(404);
      return undefined;
    }
    return updated;
  }

  @Delete("{id}")
  @Response(404, "Evento não encontrado")
  public async deletarEvento(@Path() id: number): Promise<{ success: boolean }> {
    const deleted = await this.repository.delete(id);
    if (!deleted) {
      this.setStatus(404);
      return { success: false };
    }
    return { success: true };
  }
}
