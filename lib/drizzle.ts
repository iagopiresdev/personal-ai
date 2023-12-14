import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const connectionString = process.env.DATABASE_URL || '';

// Disable prefetch as it is not supported for "Transaction" pool mode
const client = postgres(connectionString, { prepare: false })
const db = drizzle(client);

export default db;

/*
const client = postgres(process.env.SUPABASE_URL || '', {
  user: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  password: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  database: process.env.SUPABASE_DATABASE || '',
})

const db = drizzle(client);

export default db;
*/