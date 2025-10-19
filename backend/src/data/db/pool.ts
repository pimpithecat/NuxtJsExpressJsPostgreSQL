// MUST import env first to load environment variables
import { env } from '../../config/env';
import { Pool } from 'pg';

// Create connection pool
const connectionString = env.DATABASE_URL;

// Log connection attempt (without password)
console.log('🔌 Initializing database connection...');
console.log('📍 Connection string:', connectionString.replace(/:[^:@]+@/, ':****@'));

const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false
  },
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

// Handle pool errors
pool.on('error', (err) => {
  console.error('❌ Unexpected database pool error:', err);
});

// Test connection on initialization
pool.on('connect', (client) => {
  console.log('✅ New client connected to database pool');
});

export default pool;
