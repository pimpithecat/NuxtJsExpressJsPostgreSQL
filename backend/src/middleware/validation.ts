import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
import { AppError } from './errorHandler';

// Schema validation middleware factory
export const validateSchema = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validate request body against schema
      schema.parse(req.body);
      next();
    } catch (error: any) {
      // Format Zod errors into user-friendly messages
      const errors = error.errors?.map((err: any) => ({
        field: err.path.join('.'),
        message: err.message,
      }));

      throw new AppError(
        400,
        'Validation failed',
        'VALIDATION_ERROR'
      );
    }
  };
};
