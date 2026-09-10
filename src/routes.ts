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
