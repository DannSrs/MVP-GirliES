import { PlanoAula, CriarPlanoAulaDTO, AtualizarPlanoAulaDTO } from '../models/PlanoAula';
import { PlanoAulaRepository } from '../repositories/PlanoAulaRepository';
import { ConfiguracaoService } from './ConfiguracaoService';
import { calcularSemana } from '../utils/dateUtils';

export class PlanoAulaService {
  private repository: PlanoAulaRepository;
  private configuracaoService: ConfiguracaoService;

  constructor() {
    this.repository = new PlanoAulaRepository();
    this.configuracaoService = new ConfiguracaoService();
  }

  public async listarTodas(): Promise<PlanoAula[]> {
    const aulas = await this.repository.findAll();
    const config = await this.configuracaoService.getDatasProjeto();
    
    return aulas.map(aula => ({
      ...aula,
      semana: calcularSemana(aula.dataHora, config.dataInicioProjeto)
    }));
  }

  public async buscarPorId(id: number): Promise<PlanoAula | undefined> {
    const aula = await this.repository.findById(id);
    if (!aula) return undefined;

    const config = await this.configuracaoService.getDatasProjeto();
    return {
      ...aula,
      semana: calcularSemana(aula.dataHora, config.dataInicioProjeto)
    };
  }

  public async criarAula(dto: CriarPlanoAulaDTO): Promise<PlanoAula> {
    // Exemplo de regra de negócio: validação de data
    if (new Date(dto.dataHora).toString() === 'Invalid Date') {
      throw new Error("A dataHora fornecida é inválida.");
    }
    
    // Outras regras de negócio e validações entram aqui antes de salvar
    
    const aula = await this.repository.create(dto);
    const config = await this.configuracaoService.getDatasProjeto();
    
    return {
      ...aula,
      semana: calcularSemana(aula.dataHora, config.dataInicioProjeto)
    };
  }

  public async atualizarAula(id: number, dto: AtualizarPlanoAulaDTO): Promise<PlanoAula | undefined> {
    if (dto.dataHora && new Date(dto.dataHora).toString() === 'Invalid Date') {
      throw new Error("A dataHora fornecida é inválida.");
    }

    const aula = await this.repository.update(id, dto);
    if (!aula) return undefined;

    const config = await this.configuracaoService.getDatasProjeto();
    return {
      ...aula,
      semana: calcularSemana(aula.dataHora, config.dataInicioProjeto)
    };
  }

  public async deletarAula(id: number): Promise<boolean> {
    return this.repository.delete(id);
  }
}
