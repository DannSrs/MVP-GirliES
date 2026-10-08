import { ConfiguracaoRepository } from '../repositories/ConfiguracaoRepository';
import { AtualizarConfiguracaoDTO } from '../models/Configuracao';

export class ConfiguracaoService {
  private repository: ConfiguracaoRepository;

  constructor() {
    this.repository = new ConfiguracaoRepository();
  }

  public async getDatasProjeto(): Promise<{ dataInicioProjeto?: string, dataFimProjeto?: string }> {
    const dataInicio = await this.repository.getByKey('DATA_INICIO_PROJETO');
    const dataFim = await this.repository.getByKey('DATA_FIM_PROJETO');
    
    return {
      dataInicioProjeto: dataInicio,
      dataFimProjeto: dataFim
    };
  }

  public async atualizarDatasProjeto(dto: AtualizarConfiguracaoDTO): Promise<{ dataInicioProjeto?: string, dataFimProjeto?: string }> {
    if (dto.dataInicioProjeto) {
      if (new Date(dto.dataInicioProjeto).toString() === 'Invalid Date') {
        throw new Error("A data de início do projeto é inválida.");
      }
      await this.repository.upsert('DATA_INICIO_PROJETO', dto.dataInicioProjeto);
    }

    if (dto.dataFimProjeto) {
      if (new Date(dto.dataFimProjeto).toString() === 'Invalid Date') {
        throw new Error("A data de fim do projeto é inválida.");
      }
      await this.repository.upsert('DATA_FIM_PROJETO', dto.dataFimProjeto);
    }

    // Validação de consistência
    const datas = await this.getDatasProjeto();
    if (datas.dataInicioProjeto && datas.dataFimProjeto) {
      if (new Date(datas.dataInicioProjeto) > new Date(datas.dataFimProjeto)) {
        throw new Error("A data de início não pode ser depois da data final do projeto.");
      }
    }

    return datas;
  }
}
