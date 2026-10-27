
import type { DataSourceOptions } from 'typeorm';

function requiredEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }

  return value;
}

export function getDatabaseOptions(): DataSourceOptions {
  const port = Number(process.env['DB_PORT'] ?? '5432');

  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('DB_PORT must be a valid port');
  }

  return {
    type: 'postgres',
    host: process.env['DB_HOST'] ?? '127.0.0.1',
    port,
    username: requiredEnv('POSTGRES_USER'),
    password: requiredEnv('POSTGRES_PASSWORD'),
    database: requiredEnv('POSTGRES_DB'),

    entities: [],
    migrations: [],

    synchronize: false,
    migrationsRun: false,
  };
}
