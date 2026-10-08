import { Controller, Get, Put, Route, Body, Tags, Response } from 'tsoa';
import { AtualizarConfiguracaoDTO } from '../models/Configuracao';
import { ConfiguracaoService } from '../services/ConfiguracaoService';

@Route("api/configuracoes")
@Tags("Configurações Globais")
export class ConfiguracaoController extends Controller {
  private service = new ConfiguracaoService();

  @Get("projeto/datas")
  public async getDatasProjeto(): Promise<{ dataInicioProjeto?: string, dataFimProjeto?: string }> {
    return this.service.getDatasProjeto();
  }

  @Put("projeto/datas")
  @Response(400, "Erro de Validação")
  public async atualizarDatasProjeto(
    @Body() requestBody: AtualizarConfiguracaoDTO
  ): Promise<{ dataInicioProjeto?: string, dataFimProjeto?: string }> {
    try {
      return await this.service.atualizarDatasProjeto(requestBody);
    } catch (error: any) {
      this.setStatus(400);
      throw error;
    }
  }
}
