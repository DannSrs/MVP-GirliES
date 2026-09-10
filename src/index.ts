import express, { type Application, type Request, type Response } from 'express';

class App {
  public server: Application;
  private port: number = 3000;

  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  // Prepara o servidor para receber dados no formato JSON
  private middlewares(): void {
    this.server.use(express.json());
  }

  // Define as rotas (URLs) da sua API
  private routes(): void {
    this.server.get('/', (req: Request, res: Response) => {
      res.json({ mensagem: "API do MVP rodando perfeitamente! 🚀" });
    });
  }

  // Método para ligar o servidor
  public start(): void {
    this.server.listen(this.port, () => {
      console.log(`Servidor rodando em http://localhost:${this.port}`);
    });
  }
}

// Instancia a classe e inicia o servidor
const aplicacao = new App();
aplicacao.start();