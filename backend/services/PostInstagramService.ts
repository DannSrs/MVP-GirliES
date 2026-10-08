import { PostInstagram, CriarPostInstagramDTO, AtualizarPostInstagramDTO } from '../models/PostInstagram';
import { PostInstagramRepository } from '../repositories/PostInstagramRepository';
import { ConfiguracaoService } from './ConfiguracaoService';
import { calcularSemana } from '../utils/dateUtils';

export class PostInstagramService {
  private repository: PostInstagramRepository;
  private configuracaoService: ConfiguracaoService;

  constructor() {
    this.repository = new PostInstagramRepository();
    this.configuracaoService = new ConfiguracaoService();
  }

  public async listarTodos(): Promise<PostInstagram[]> {
    const posts = await this.repository.findAll();
    const config = await this.configuracaoService.getDatasProjeto();
    
    return posts.map(post => ({
      ...post,
      semana: calcularSemana(post.deadline, config.dataInicioProjeto)
    }));
  }

  public async buscarPorId(id: number): Promise<PostInstagram | undefined> {
    const post = await this.repository.findById(id);
    if (!post) return undefined;

    const config = await this.configuracaoService.getDatasProjeto();
    return {
      ...post,
      semana: calcularSemana(post.deadline, config.dataInicioProjeto)
    };
  }

  public async criarPost(dto: CriarPostInstagramDTO): Promise<PostInstagram> {
    if (new Date(dto.deadline).toString() === 'Invalid Date') {
      throw new Error("A data de deadline fornecida é inválida.");
    }

    const post = await this.repository.create(dto);
    const config = await this.configuracaoService.getDatasProjeto();
    
    return {
      ...post,
      semana: calcularSemana(post.deadline, config.dataInicioProjeto)
    };
  }

  public async atualizarPost(id: number, dto: AtualizarPostInstagramDTO): Promise<PostInstagram | undefined> {
    if (dto.deadline && new Date(dto.deadline).toString() === 'Invalid Date') {
      throw new Error("A data de deadline fornecida é inválida.");
    }

    const post = await this.repository.update(id, dto);
    if (!post) return undefined;

    const config = await this.configuracaoService.getDatasProjeto();
    return {
      ...post,
      semana: calcularSemana(post.deadline, config.dataInicioProjeto)
    };
  }

  public async deletarPost(id: number): Promise<boolean> {
    return this.repository.delete(id);
  }
}
