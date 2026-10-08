import { ChecklistItem } from '../models/ChecklistItem';
import { ChecklistRepository } from '../repositories/ChecklistRepository';

export class ChecklistService {
  private repository: ChecklistRepository;

  constructor() {
    this.repository = new ChecklistRepository();
  }

  public async buscarPorId(id: number): Promise<ChecklistItem | undefined> {
    return this.repository.findById(id);
  }

  public async criarItem(atividadeId: number, tipoAtividade: string, descricao: string, isCompleted: boolean = false): Promise<ChecklistItem> {
    const tiposValidos = ['AULA', 'POST', 'EVENTO'];
    if (!tiposValidos.includes(tipoAtividade.toUpperCase())) {
      throw new Error(`Tipo de atividade inválido. Use: ${tiposValidos.join(', ')}`);
    }
    if (!descricao || descricao.trim().length === 0) {
      throw new Error("A descrição não pode ser vazia.");
    }

    return this.repository.create(atividadeId, tipoAtividade.toUpperCase(), descricao.trim(), isCompleted);
  }

  public async listarPorAtividade(atividadeId: number, tipoAtividade: string): Promise<ChecklistItem[]> {
    const tiposValidos = ['AULA', 'POST', 'EVENTO'];
    if (!tiposValidos.includes(tipoAtividade.toUpperCase())) {
      throw new Error(`Tipo de atividade inválido. Use: ${tiposValidos.join(', ')}`);
    }
    return this.repository.findByAtividade(atividadeId, tipoAtividade.toUpperCase());
  }

  public async toggleItem(id: number): Promise<ChecklistItem | undefined> {
    const item = await this.repository.findById(id);
    if (!item) return undefined;

    return this.repository.toggleItem(id);
  }

  public async atualizarDescricao(id: number, descricao: string): Promise<ChecklistItem | undefined> {
    if (!descricao || descricao.trim().length === 0) {
      throw new Error("A descrição não pode ser vazia.");
    }

    const item = await this.repository.findById(id);
    if (!item) return undefined;

    return this.repository.updateDescricao(id, descricao.trim());
  }

  public async deletarItem(id: number): Promise<boolean> {
    const item = await this.repository.findById(id);
    if (!item) return false;

    return this.repository.delete(id);
  }
}
