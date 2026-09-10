import express, { type Application } from 'express';
import cors from 'cors';
import { router } from './routes';
import { setupSwagger } from './swagger';

class App {
  public server: Application;
  private port: number = 3000;

  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
    setupSwagger(this.server);
  }

  // Prepara o servidor para receber dados no formato JSON
  private middlewares(): void {
    this.server.use(cors()); // Libera o acesso para o front-end
    this.server.use(express.json());
    this.server.use(express.static('public')); // Define a pasta do front-end
  }

  // Define as rotas (URLs) da sua API
  private routes(): void {
    this.server.use('/api', router); // Adicionamos '/api' para separar do front
  }

  // Método para ligar o servidor
  public start(): void {
    this.server.listen(this.port, () => {
      console.log(`Servidor rodando em http://localhost:${this.port}`);
      console.log(`Documentação Swagger em http://localhost:${this.port}/api-docs`);
    });
  }
}

// Instancia a classe e inicia o servidor
const aplicacao = new App();
aplicacao.start();