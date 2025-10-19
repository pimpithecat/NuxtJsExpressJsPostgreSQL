import pool from '../db/pool';

/**
 * DATA LAYER - Repository Pattern
 *
 * Responsibilities:
 * - Database queries and CRUD operations
 * - Connection management
 * - Data mapping
 *
 * Rules:
 * - No business logic
 * - No HTTP handling
 * - Use parameterized queries (prevent SQL injection)
 */

export class ExampleRepository {
  /**
   * Example: Get all records with pagination
   */
  async findAll(limit: number = 10, offset: number = 0) {
    const client = await pool.connect();
    try {
      const query = `
        SELECT * FROM your_table
        ORDER BY created_at DESC
        LIMIT $1 OFFSET $2
      `;
      const result = await client.query(query, [limit, offset]);
      return result.rows;
    } finally {
      client.release();
    }
  }

  /**
   * Example: Get single record by ID
   */
  async findById(id: string) {
    const client = await pool.connect();
    try {
      const query = 'SELECT * FROM your_table WHERE id = $1';
      const result = await client.query(query, [id]);
      return result.rows[0] || null;
    } finally {
      client.release();
    }
  }

  /**
   * Example: Create new record
   */
  async create(data: any) {
    const client = await pool.connect();
    try {
      const query = `
        INSERT INTO your_table (column1, column2, created_at)
        VALUES ($1, $2, NOW())
        RETURNING *
      `;
      const result = await client.query(query, [data.column1, data.column2]);
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  /**
   * Example: Update record
   */
  async update(id: string, data: any) {
    const client = await pool.connect();
    try {
      const query = `
        UPDATE your_table
        SET column1 = $1, column2 = $2, updated_at = NOW()
        WHERE id = $3
        RETURNING *
      `;
      const result = await client.query(query, [data.column1, data.column2, id]);
      return result.rows[0] || null;
    } finally {
      client.release();
    }
  }

  /**
   * Example: Delete record
   */
  async delete(id: string) {
    const client = await pool.connect();
    try {
      const query = 'DELETE FROM your_table WHERE id = $1 RETURNING *';
      const result = await client.query(query, [id]);
      return result.rows[0] || null;
    } finally {
      client.release();
    }
  }

  /**
   * Example: Transaction operation
   */
  async createWithTransaction(data: any) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      // First operation
      const query1 = 'INSERT INTO table1 (data) VALUES ($1) RETURNING *';
      const result1 = await client.query(query1, [data.value1]);

      // Second operation
      const query2 = 'INSERT INTO table2 (data) VALUES ($1) RETURNING *';
      const result2 = await client.query(query2, [data.value2]);

      await client.query('COMMIT');

      return { result1: result1.rows[0], result2: result2.rows[0] };
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }
}

export default new ExampleRepository();
