import { PostInstagram, CriarPostInstagramDTO, AtualizarPostInstagramDTO } from '../models/PostInstagram';
import { PostInstagramRepository } from '../repositories/PostInstagramRepository';

export class PostInstagramService {
  private repository: PostInstagramRepository;

  constructor() {
    this.repository = new PostInstagramRepository();
  }

  public async listarTodos(): Promise<PostInstagram[]> {
    return this.repository.findAll();
  }

  public async buscarPorId(id: number): Promise<PostInstagram | undefined> {
    return this.repository.findById(id);
  }

  public async criarPost(dto: CriarPostInstagramDTO): Promise<PostInstagram> {
    if (new Date(dto.deadline).toString() === 'Invalid Date') {
      throw new Error("A data de deadline fornecida é inválida.");
    }

    return this.repository.create(dto);
  }

  public async atualizarPost(id: number, dto: AtualizarPostInstagramDTO): Promise<PostInstagram | undefined> {
    if (dto.deadline && new Date(dto.deadline).toString() === 'Invalid Date') {
      throw new Error("A data de deadline fornecida é inválida.");
    }

    return this.repository.update(id, dto);
  }

  public async deletarPost(id: number): Promise<boolean> {
    return this.repository.delete(id);
  }
}
