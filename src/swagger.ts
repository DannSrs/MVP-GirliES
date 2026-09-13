import type { Application } from 'express';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import path from 'path';

export function setupSwagger(app: Application): void {
  const swaggerPath = path.resolve(process.cwd(), 'public', 'swagger.json');
  if (fs.existsSync(swaggerPath)) {
    const swaggerDocument = JSON.parse(fs.readFileSync(swaggerPath, 'utf8'));
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    app.get('/api-docs.json', (_req, res) => {
      res.json(swaggerDocument);
    });
  } else {
    console.warn('AVISO: swagger.json não encontrado. Execute `npm run swagger`.');
  }
}
