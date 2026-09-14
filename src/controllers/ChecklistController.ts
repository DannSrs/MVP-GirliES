import { Controller, Get, Post, Patch, Put, Delete, Route, Path, Body, Tags, Response, Query } from 'tsoa';
import { ChecklistItem } from '../models/ChecklistItem';
import { ChecklistService } from '../services/ChecklistService';

interface CriarChecklistItemRequest {
  atividadeId: number;
  tipoAtividade: string;
  descricao: string;
  isCompleted?: boolean;
}

@Route("api/checklists")
@Tags("Checklist")
export class ChecklistController extends Controller {
  private service = new ChecklistService();

  @Post()
  @Response(400, "Erro de Validação")
  public async criarChecklistItem(@Body() requestBody: CriarChecklistItemRequest): Promise<ChecklistItem> {
    try {
      this.setStatus(201);
      return await this.service.criarItem(
        requestBody.atividadeId,
        requestBody.tipoAtividade,
        requestBody.descricao,
        requestBody.isCompleted ?? false
      );
    } catch (error: any) {
      this.setStatus(400);
      throw error;
    }
  }

  @Get("{id}")
  @Response(404, "Item não encontrado")
  public async getChecklistItem(@Path() id: number): Promise<ChecklistItem | undefined> {
    const item = await this.service.buscarPorId(id);
    if (!item) {
      this.setStatus(404);
      return undefined;
    }
    return item;
  }

  @Get("atividade/{atividadeId}")
  public async getChecklistPorAtividade(
    @Path() atividadeId: number,
    @Query() tipoAtividade: string
  ): Promise<ChecklistItem[]> {
    try {
      return await this.service.listarPorAtividade(atividadeId, tipoAtividade);
    } catch (error: any) {
      this.setStatus(400);
      throw error;
    }
  }

  @Patch("{id}/toggle")
  @Response(404, "Item não encontrado")
  public async toggleChecklistItem(@Path() id: number): Promise<ChecklistItem | undefined> {
    const item = await this.service.toggleItem(id);
    if (!item) {
      this.setStatus(404);
      return undefined;
    }
    return item;
  }

  @Put("{id}")
  @Response(404, "Item não encontrado")
  @Response(400, "Erro de Validação")
  public async atualizarDescricao(
    @Path() id: number,
    @Body() requestBody: { descricao: string }
  ): Promise<ChecklistItem | undefined> {
    try {
      const item = await this.service.atualizarDescricao(id, requestBody.descricao);
      if (!item) {
        this.setStatus(404);
        return undefined;
      }
      return item;
    } catch (error: any) {
      this.setStatus(400);
      throw error;
    }
  }

  @Delete("{id}")
  @Response(404, "Item não encontrado")
  public async deletarChecklistItem(@Path() id: number): Promise<{ success: boolean }> {
    const deleted = await this.service.deletarItem(id);
    if (!deleted) {
      this.setStatus(404);
      return { success: false };
    }
    return { success: true };
  }
}
