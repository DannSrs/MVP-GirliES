import { getDb } from '../database/config/database';
import { Modulo } from '../models/Modulo';

export class ModuloRepository {
  async getAll(): Promise<Modulo[]> {
    const db = await getDb();
    const result = await db.query('SELECT * FROM Modulos ORDER BY ordem ASC');
    return result.rows;
  }

  async getById(id: number): Promise<Modulo | null> {
    const db = await getDb();
    const result = await db.query('SELECT * FROM Modulos WHERE id = $1', [id]);
    return result.rows.length ? result.rows[0] : null;
  }

  async create(data: Pick<Modulo, 'nome'>): Promise<Modulo> {
    const db = await getDb();
    // Get max ordem to put at the end
    const maxOrdemResult = await db.query('SELECT COALESCE(MAX(ordem), 0) as max_ordem FROM Modulos');
    const nextOrdem = parseInt(maxOrdemResult.rows[0].max_ordem) + 1;

    const result = await db.query(
      'INSERT INTO Modulos (nome, ordem) VALUES ($1, $2) RETURNING *',
      [data.nome, nextOrdem]
    );
    return result.rows[0];
  }

  async update(id: number, data: Partial<Modulo>): Promise<Modulo | null> {
    const db = await getDb();
    if (data.nome === undefined) return null;

    const result = await db.query(
      'UPDATE Modulos SET nome = $1 WHERE id = $2 RETURNING *',
      [data.nome, id]
    );
    return result.rows.length ? result.rows[0] : null;
  }

  async delete(id: number): Promise<boolean> {
    const db = await getDb();
    const result = await db.query('DELETE FROM Modulos WHERE id = $1', [id]);
    return (result.rowCount ?? 0) > 0;
  }

  async reorder(ids: number[]): Promise<void> {
    const db = await getDb();
    // We can execute multiple updates in a transaction
    const client = await db.connect();
    try {
      await client.query('BEGIN');
      for (let i = 0; i < ids.length; i++) {
        await client.query('UPDATE Modulos SET ordem = $1 WHERE id = $2', [i + 1, ids[i]]);
      }
      await client.query('COMMIT');
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }
}
