import { Router, Request, Response, NextFunction } from 'express';
import exampleService from '../../core/example.service';
import { ApiResponse } from '../../types';
import { AppError } from '../../middleware/errorHandler';

/**
 * PRESENTATION LAYER - Routes/Controllers
 *
 * Responsibilities:
 * - HTTP handling (request/response)
 * - Route definitions
 * - Status codes
 * - Response formatting
 *
 * Rules:
 * - No business logic (use services)
 * - No database queries (use services)
 * - Handle errors and format responses
 */

const router = Router();

/**
 * GET /api/examples
 * Get all records with pagination
 */
router.get('/examples', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const result = await exampleService.getAll(page, limit);

    const response: ApiResponse = {
      success: true,
      data: result,
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/examples/:id
 * Get single record by ID
 */
router.get('/examples/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const record = await exampleService.getById(id);

    const response: ApiResponse = {
      success: true,
      data: record,
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/examples
 * Create new record
 */
router.post('/examples', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const created = await exampleService.create(req.body);

    const response: ApiResponse = {
      success: true,
      data: created,
    };

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
});

/**
 * PUT /api/examples/:id
 * Update record
 */
router.put('/examples/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const updated = await exampleService.update(id, req.body);

    const response: ApiResponse = {
      success: true,
      data: updated,
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
});

/**
 * DELETE /api/examples/:id
 * Delete record
 */
router.delete('/examples/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const deleted = await exampleService.delete(id);

    const response: ApiResponse = {
      success: true,
      data: deleted,
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
});

export default router;
