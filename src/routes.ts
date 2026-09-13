import { Router } from 'express';

export const router = Router();

/**
 * @openapi
 * /api/health:
 *   get:
 *     summary: Verifica se a API está funcionando
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: API respondendo corretamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 message:
 *                   type: string
 */
router.get('/health', (_req, res) => {
  res.json({ ok: true, message: 'API funcionando' });
});

import { PlanoAulaRepository } from './repositories/PlanoAulaRepository';
const aulasRepository = new PlanoAulaRepository();

/**
 * @openapi
 * /api/aulas:
 *   get:
 *     summary: Retorna a lista de todas as aulas
 *     tags: [Aulas]
 *     responses:
 *       200:
 *         description: Lista de aulas
 *   post:
 *     summary: Cria uma nova aula
 *     tags: [Aulas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [titulo, dataHora]
 *             properties:
 *               titulo:
 *                 type: string
 *               descricao:
 *                 type: string
 *               dataHora:
 *                 type: string
 *                 format: date-time
 *               local:
 *                 type: string
 *               categoria:
 *                 type: string
 *               linkPlanoAula:
 *                 type: string
 *               checklist:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required: [description]
 *                   properties:
 *                     description:
 *                       type: string
 *                     isCompleted:
 *                       type: boolean
 *               links:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required: [link]
 *                   properties:
 *                     tipo:
 *                       type: string
 *                       enum: [Material, 'Link Auxiliar']
 *                     titulo:
 *                       type: string
 *                     link:
 *                       type: string
 *     responses:
 *       201:
 *         description: Aula criada com sucesso
 */
router.get('/aulas', async (_req, res) => {
  try {
    const aulas = await aulasRepository.findAll();
    res.json(aulas);
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

router.post('/aulas', async (req, res) => {
  try {
    const aula = await aulasRepository.create(req.body);
    res.status(201).json(aula);
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

/**
 * @openapi
 * /api/aulas/{id}:
 *   get:
 *     summary: Retorna uma aula pelo ID
 *     tags: [Aulas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dados da aula
 *       404:
 *         description: Aula não encontrada
 *   put:
 *     summary: Atualiza uma aula pelo ID
 *     tags: [Aulas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               descricao:
 *                 type: string
 *               dataHora:
 *                 type: string
 *                 format: date-time
 *               local:
 *                 type: string
 *               categoria:
 *                 type: string
 *               linkPlanoAula:
 *                 type: string
 *     responses:
 *       200:
 *         description: Aula atualizada com sucesso
 *       404:
 *         description: Aula não encontrada
 *   delete:
 *     summary: Deleta uma aula pelo ID
 *     tags: [Aulas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Aula deletada com sucesso
 *       404:
 *         description: Aula não encontrada
 */
router.get('/aulas/:id', async (req, res) => {
  try {
    const aula = await aulasRepository.findById(req.params.id);
    if (!aula) {
      res.status(404).json({ error: 'Aula não encontrada' });
      return;
    }
    res.json(aula);
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

router.put('/aulas/:id', async (req, res) => {
  try {
    const aula = await aulasRepository.update(req.params.id, req.body);
    if (!aula) {
      res.status(404).json({ error: 'Aula não encontrada' });
      return;
    }
    res.json(aula);
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

router.delete('/aulas/:id', async (req, res) => {
  try {
    const success = await aulasRepository.delete(req.params.id);
    if (!success) {
      res.status(404).json({ error: 'Aula não encontrada' });
      return;
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});
