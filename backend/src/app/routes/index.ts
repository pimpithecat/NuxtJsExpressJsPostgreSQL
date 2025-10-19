import { Router } from 'express';
import healthRouter from './health';

const router = Router();

// Register all routes
router.use('/api', healthRouter);

export default router;
