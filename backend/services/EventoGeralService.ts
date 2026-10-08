import { EventoGeral, CriarEventoGeralDTO, AtualizarEventoGeralDTO } from '../models/EventoGeral';
import { EventoGeralRepository } from '../repositories/EventoGeralRepository';
import { ConfiguracaoService } from './ConfiguracaoService';
import { calcularSemana } from '../utils/dateUtils';

export class EventoGeralService {
  private repository: EventoGeralRepository;
  private configuracaoService: ConfiguracaoService;

  constructor() {
    this.repository = new EventoGeralRepository();
    this.configuracaoService = new ConfiguracaoService();
  }

  public async listarTodos(): Promise<EventoGeral[]> {
    const eventos = await this.repository.findAll();
    const config = await this.configuracaoService.getDatasProjeto();
    
    return eventos.map(evento => ({
      ...evento,
      semana: calcularSemana(evento.data, config.dataInicioProjeto)
    }));
  }

  public async buscarPorId(id: number): Promise<EventoGeral | undefined> {
    const evento = await this.repository.findById(id);
    if (!evento) return undefined;

    const config = await this.configuracaoService.getDatasProjeto();
    return {
      ...evento,
      semana: calcularSemana(evento.data, config.dataInicioProjeto)
    };
  }

  public async criarEvento(dto: CriarEventoGeralDTO): Promise<EventoGeral> {
    if (new Date(dto.data).toString() === 'Invalid Date') {
      throw new Error("A data fornecida é inválida.");
    }
    
    // Validate that horarioFim is after horarioInicio if both exist
    if (dto.horarioInicio && dto.horarioFim) {
      if (dto.horarioInicio > dto.horarioFim) {
        throw new Error("O horário de fim não pode ser menor que o horário de início.");
      }
    }

    const evento = await this.repository.create(dto);
    const config = await this.configuracaoService.getDatasProjeto();
    
    return {
      ...evento,
      semana: calcularSemana(evento.data, config.dataInicioProjeto)
    };
  }

  public async atualizarEvento(id: number, dto: AtualizarEventoGeralDTO): Promise<EventoGeral | undefined> {
    if (dto.data && new Date(dto.data).toString() === 'Invalid Date') {
      throw new Error("A data fornecida é inválida.");
    }

    // It's a bit harder to validate time overlap accurately here without querying the old record if only one is updated,
    // but we can do a simple check if both are provided in the DTO
    if (dto.horarioInicio && dto.horarioFim) {
      if (dto.horarioInicio > dto.horarioFim) {
        throw new Error("O horário de fim não pode ser menor que o horário de início.");
      }
    }

    const evento = await this.repository.update(id, dto);
    if (!evento) return undefined;

    const config = await this.configuracaoService.getDatasProjeto();
    return {
      ...evento,
      semana: calcularSemana(evento.data, config.dataInicioProjeto)
    };
  }

  public async deletarEvento(id: number): Promise<boolean> {
    return this.repository.delete(id);
  }
}
