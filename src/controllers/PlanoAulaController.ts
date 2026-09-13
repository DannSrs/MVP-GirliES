import { Request, Response } from 'express';
import { PlanoAulaRepository } from '../repositories/PlanoAulaRepository';

const repository = new PlanoAulaRepository();

export class PlanoAulaController {
    async getAulas(_req: Request, res: Response) {
        try {
            const aulas = await repository.findAll();
            res.json(aulas);
        } catch (err) {
            res.status(500).json({ error: String(err) });
        }
    }

    async getAulaById(req: Request, res: Response) {
        try {
            const aula = await repository.findById(String(req.params.id));
            if (!aula) {
                res.status(404).json({ error: 'Aula não encontrada' });
                return;
            }
            res.json(aula);
        } catch (err) {
            res.status(500).json({ error: String(err) });
        }
    }

    async criarAula(req: Request, res: Response) {
        try {
            const aula = await repository.create(req.body);
            res.status(201).json(aula);
        } catch (err) {
            res.status(500).json({ error: String(err) });
        }
    }

    async atualizarAula(req: Request, res: Response) {
        try {
            const aula = await repository.update(String(req.params.id), req.body);
            if (!aula) {
                res.status(404).json({ error: 'Aula não encontrada' });
                return;
            }
            res.json(aula);
        } catch (err) {
            res.status(500).json({ error: String(err) });
        }
    }

    async deletarAula(req: Request, res: Response) {
        try {
            const success = await repository.delete(String(req.params.id));
            if (!success) {
                res.status(404).json({ error: 'Aula não encontrada' });
                return;
            }
            res.json({ success: true });
        } catch (err) {
            res.status(500).json({ error: String(err) });
        }
    }
}
