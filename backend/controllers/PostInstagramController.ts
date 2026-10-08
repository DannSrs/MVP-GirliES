import { Controller, Get, Post, Put, Delete, Route, Body, Path, Tags, Response } from 'tsoa';
import { PostInstagram, CriarPostInstagramDTO, AtualizarPostInstagramDTO } from '../models/PostInstagram';
import { PostInstagramService } from '../services/PostInstagramService';

@Route("api/posts")
@Tags("Posts Instagram")
export class PostInstagramController extends Controller {
  private service = new PostInstagramService();

  @Get()
  public async getPosts(): Promise<PostInstagram[]> {
    return this.service.listarTodos();
  }

  @Get("{id}")
  @Response(404, "Post não encontrado")
  public async getPostById(@Path() id: number): Promise<PostInstagram | undefined> {
    const post = await this.service.buscarPorId(id);
    if (!post) {
      this.setStatus(404);
      return undefined;
    }
    return post;
  }

  @Post()
  @Response(400, "Erro de Validação")
  public async criarPost(@Body() requestBody: CriarPostInstagramDTO): Promise<PostInstagram> {
    try {
      this.setStatus(201);
      return await this.service.criarPost(requestBody);
    } catch (error: any) {
      this.setStatus(400);
      throw error;
    }
  }

  @Put("{id}")
  @Response(404, "Post não encontrado")
  @Response(400, "Erro de Validação")
  public async atualizarPost(
    @Path() id: number,
    @Body() requestBody: AtualizarPostInstagramDTO
  ): Promise<PostInstagram | undefined> {
    try {
      const updated = await this.service.atualizarPost(id, requestBody);
      if (!updated) {
        this.setStatus(404);
        return undefined;
      }
      return updated;
    } catch (error: any) {
      this.setStatus(400);
      throw error;
    }
  }

  @Delete("{id}")
  @Response(404, "Post não encontrado")
  public async deletarPost(@Path() id: number): Promise<{ success: boolean }> {
    const deleted = await this.service.deletarPost(id);
    if (!deleted) {
      this.setStatus(404);
      return { success: false };
    }
    return { success: true };
  }
}
