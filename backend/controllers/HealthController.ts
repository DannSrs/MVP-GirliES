import { Controller, Get, Route, Tags } from 'tsoa';

export interface HealthResponse {
  ok: boolean;
  message: string;
}

@Route("api/health")
@Tags("Health")
export class HealthController extends Controller {
  @Get()
  public async getHealth(): Promise<HealthResponse> {
    return {
      ok: true,
      message: 'API funcionando com TSOA'
    };
  }
}
