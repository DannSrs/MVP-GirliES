import { Controller, Get, Post, Put, Delete, Route, Body, Path, Tags, Response } from 'tsoa';
import { PostInstagram, CriarPostInstagramDTO, AtualizarPostInstagramDTO } from '../models/PostInstagram';
import { PostInstagramRepository } from '../repositories/PostInstagramRepository';

@Route("api/posts")
@Tags("Posts Instagram")
export class PostInstagramController extends Controller {
  private repository = new PostInstagramRepository();

  @Get()
  public async getPosts(): Promise<PostInstagram[]> {
    return this.repository.findAll();
  }

  @Get("{id}")
  @Response(404, "Post não encontrado")
  public async getPostById(@Path() id: number): Promise<PostInstagram | undefined> {
    const post = await this.repository.findById(id);
    if (!post) {
      this.setStatus(404);
      return undefined;
    }
    return post;
  }

  @Post()
  public async criarPost(@Body() requestBody: CriarPostInstagramDTO): Promise<PostInstagram> {
    this.setStatus(201);
    return this.repository.create(requestBody);
  }

  @Put("{id}")
  @Response(404, "Post não encontrado")
  public async atualizarPost(
    @Path() id: number,
    @Body() requestBody: AtualizarPostInstagramDTO
  ): Promise<PostInstagram | undefined> {
    const updated = await this.repository.update(id, requestBody);
    if (!updated) {
      this.setStatus(404);
      return undefined;
    }
    return updated;
  }

  @Delete("{id}")
  @Response(404, "Post não encontrado")
  public async deletarPost(@Path() id: number): Promise<{ success: boolean }> {
    const deleted = await this.repository.delete(id);
    if (!deleted) {
      this.setStatus(404);
      return { success: false };
    }
    return { success: true };
  }
}
