import exampleRepository from '../data/repositories/example.repository';
import { z } from 'zod';

/**
 * BUSINESS LAYER - Service Pattern
 *
 * Responsibilities:
 * - Business logic and validation
 * - Data transformation
 * - Authorization checks
 * - Orchestration between repositories
 *
 * Rules:
 * - No database queries (use repositories)
 * - No HTTP handling (done in routes)
 * - Validate all inputs
 */

// Validation schemas
const createSchema = z.object({
  column1: z.string().min(1).max(255),
  column2: z.string().min(1),
});

const updateSchema = z.object({
  column1: z.string().min(1).max(255).optional(),
  column2: z.string().min(1).optional(),
});

export class ExampleService {
  /**
   * Get all records with business rules applied
   */
  async getAll(page: number = 1, limit: number = 10) {
    // Business rule: Validate pagination parameters
    if (page < 1) page = 1;
    if (limit < 1 || limit > 100) limit = 10;

    const offset = (page - 1) * limit;

    // Fetch from repository
    const records = await exampleRepository.findAll(limit, offset);

    // Business logic: Transform or enrich data
    const transformedRecords = records.map(record => ({
      ...record,
      // Add computed fields or transformations
      displayName: `${record.column1} - ${record.column2}`,
    }));

    return {
      data: transformedRecords,
      pagination: {
        page,
        limit,
        total: records.length, // In real app, get total count from DB
      },
    };
  }

  /**
   * Get single record by ID
   */
  async getById(id: string) {
    // Business rule: Validate ID format
    if (!id || typeof id !== 'string') {
      throw new Error('Invalid ID format');
    }

    const record = await exampleRepository.findById(id);

    if (!record) {
      throw new Error('Record not found');
    }

    return record;
  }

  /**
   * Create new record with validation
   */
  async create(data: any) {
    // Validate input against schema
    const validatedData = createSchema.parse(data);

    // Business logic: Additional validations or transformations
    // Example: Check for duplicates, apply defaults, etc.

    // Create via repository
    const created = await exampleRepository.create(validatedData);

    return created;
  }

  /**
   * Update record with validation
   */
  async update(id: string, data: any) {
    // Validate ID
    if (!id || typeof id !== 'string') {
      throw new Error('Invalid ID format');
    }

    // Validate input
    const validatedData = updateSchema.parse(data);

    // Business rule: Check if record exists
    const existing = await exampleRepository.findById(id);
    if (!existing) {
      throw new Error('Record not found');
    }

    // Business logic: Authorization check
    // Example: Check if user has permission to update

    // Update via repository
    const updated = await exampleRepository.update(id, validatedData);

    return updated;
  }

  /**
   * Delete record with authorization
   */
  async delete(id: string) {
    // Validate ID
    if (!id || typeof id !== 'string') {
      throw new Error('Invalid ID format');
    }

    // Business rule: Check if record exists
    const existing = await exampleRepository.findById(id);
    if (!existing) {
      throw new Error('Record not found');
    }

    // Business logic: Authorization and dependency checks
    // Example: Check if record can be safely deleted

    // Delete via repository
    const deleted = await exampleRepository.delete(id);

    return deleted;
  }
}

export default new ExampleService();
