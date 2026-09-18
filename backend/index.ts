import express, { type Application, type Request, type Response, type NextFunction } from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { RegisterRoutes } from './routes';
import { setupSwagger } from './swagger';
import { initializeDatabase } from './database/config/database';

dotenv.config();

class App {
  public server: Application;
  private port: number = Number(process.env.PORT) || 3000;

  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
    this.errorHandler();
  }

  private middlewares(): void {
    const corsOrigin = process.env.CORS_ORIGIN || '*';
    this.server.use(cors({ origin: corsOrigin }));
    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: true }));
    this.server.use(express.static('public'));
  }

  private routes(): void {
    setupSwagger(this.server);
    RegisterRoutes(this.server);
  }

  private errorHandler(): void {
    this.server.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || 500;
      const message = err.message || 'Erro interno do servidor';
      console.error(`[Error ${status}]:`, err);
      res.status(status).json({
        ok: false,
        error: message,
        details: err.fields || undefined
      });
    });
  }

  public async start(): Promise<void> {
    try {
      await initializeDatabase();
      console.log('Conexão com SQLite inicializada com sucesso.');
    } catch (error) {
      console.error('Erro ao inicializar o banco de dados SQLite:', error);
    }

    this.server.listen(this.port, () => {
      console.log(`🚀 Servidor rodando na porta ${this.port} (http://localhost:${this.port})`);
      console.log(`📚 Documentação Swagger disponível em http://localhost:${this.port}/api-docs`);
    });
  }
}

const aplicacao = new App();
aplicacao.start();