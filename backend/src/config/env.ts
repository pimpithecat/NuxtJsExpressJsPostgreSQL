// Load environment variables FIRST before anything else
import dotenv from 'dotenv';
dotenv.config();

// Validate required environment variables
const requiredEnvVars = ['DATABASE_URL', 'PORT'];
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.error(`Missing required environment variable: ${envVar}`);
    process.exit(1);
  }
}

console.log('✅ Environment variables loaded successfully');

// Export environment variables with types
export const env = {
  DATABASE_URL: process.env.DATABASE_URL!,
  PORT: process.env.PORT!,
  NODE_ENV: process.env.NODE_ENV || 'development',
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000',
};
