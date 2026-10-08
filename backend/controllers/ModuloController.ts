import { Controller, Get, Post, Put, Delete, Body, Route, Path, Tags } from 'tsoa';
import { Modulo } from '../models/Modulo';
import { ModuloRepository } from '../repositories/ModuloRepository';

@Route('api/modulos')
@Tags('Modulos')
export class ModuloController extends Controller {
  private repository = new ModuloRepository();

  @Get('/')
  public async getModulos(): Promise<Modulo[]> {
    return this.repository.getAll();
  }

  @Post('/')
  public async createModulo(@Body() requestBody: Pick<Modulo, 'nome'>): Promise<Modulo> {
    return this.repository.create(requestBody);
  }

  @Put('/reorder')
  public async reorderModulos(@Body() requestBody: { ids: number[] }): Promise<void> {
    await this.repository.reorder(requestBody.ids);
  }

  @Put('/{id}')
  public async updateModulo(
    @Path() id: number,
    @Body() requestBody: Partial<Modulo>
  ): Promise<Modulo | null> {
    return this.repository.update(id, requestBody);
  }

  @Delete('/{id}')
  public async deleteModulo(@Path() id: number): Promise<void> {
    const success = await this.repository.delete(id);
    if (!success) {
      this.setStatus(404);
    }
  }
}
