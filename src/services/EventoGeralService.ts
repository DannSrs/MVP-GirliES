import { EventoGeral, CriarEventoGeralDTO, AtualizarEventoGeralDTO } from '../models/EventoGeral';
import { EventoGeralRepository } from '../repositories/EventoGeralRepository';

export class EventoGeralService {
  private repository: EventoGeralRepository;

  constructor() {
    this.repository = new EventoGeralRepository();
  }

  public async listarTodos(): Promise<EventoGeral[]> {
    return this.repository.findAll();
  }

  public async buscarPorId(id: number): Promise<EventoGeral | undefined> {
    return this.repository.findById(id);
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

    return this.repository.create(dto);
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

    return this.repository.update(id, dto);
  }

  public async deletarEvento(id: number): Promise<boolean> {
    return this.repository.delete(id);
  }
}
