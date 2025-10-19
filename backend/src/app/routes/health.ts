import { Router, Request, Response, NextFunction } from 'express';
import pool from '../../data/db/pool';
import { ApiResponse } from '../../types';

const router = Router();

// Health check endpoint
router.get('/health', async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('🏥 Health check requested...');

    // Check database connection
    console.log('📊 Attempting to connect to database...');
    const client = await pool.connect();
    console.log('✅ Database client connected');

    await client.query('SELECT 1');
    console.log('✅ Database query executed');

    client.release();
    console.log('✅ Database client released');

    const response: ApiResponse = {
      success: true,
      data: {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        database: 'connected',
      },
    };

    res.json(response);
  } catch (error: any) {
    console.error('❌ Health check failed:', error);
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      code: error.code,
      stack: error.stack
    });
    next(error);
  }
});

export default router;
