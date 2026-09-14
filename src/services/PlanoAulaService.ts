import { PlanoAula, CriarPlanoAulaDTO, AtualizarPlanoAulaDTO } from '../models/PlanoAula';
import { PlanoAulaRepository } from '../repositories/PlanoAulaRepository';

export class PlanoAulaService {
  private repository: PlanoAulaRepository;

  constructor() {
    this.repository = new PlanoAulaRepository();
  }

  public async listarTodas(): Promise<PlanoAula[]> {
    return this.repository.findAll();
  }

  public async buscarPorId(id: number): Promise<PlanoAula | undefined> {
    return this.repository.findById(id);
  }

  public async criarAula(dto: CriarPlanoAulaDTO): Promise<PlanoAula> {
    // Exemplo de regra de negócio: validação de data
    if (new Date(dto.dataHora).toString() === 'Invalid Date') {
      throw new Error("A dataHora fornecida é inválida.");
    }
    
    // Outras regras de negócio e validações entram aqui antes de salvar
    
    return this.repository.create(dto);
  }

  public async atualizarAula(id: number, dto: AtualizarPlanoAulaDTO): Promise<PlanoAula | undefined> {
    if (dto.dataHora && new Date(dto.dataHora).toString() === 'Invalid Date') {
      throw new Error("A dataHora fornecida é inválida.");
    }

    return this.repository.update(id, dto);
  }

  public async deletarAula(id: number): Promise<boolean> {
    return this.repository.delete(id);
  }
}
