// MUST import env first to load environment variables
import { env } from './config/env';
import express from 'express';
import routes from './app/routes';
import {
  securityHeaders,
  corsOptions,
  limiter,
  requestLogger
} from './middleware/security';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';

const app = express();
const PORT = env.PORT || 3001;

// Apply security middleware
app.use(securityHeaders);
app.use(corsOptions);
app.use(limiter);

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use(requestLogger);

// Register routes
app.use(routes);

// 404 handler
app.use(notFoundHandler);

// Global error handler (must be last)
app.use(errorHandler);

// Start server
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Environment: ${env.NODE_ENV}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});

export default app;
