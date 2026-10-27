
import 'reflect-metadata';

import { config } from 'dotenv';
import { resolve } from 'node:path';
import { DataSource } from 'typeorm';

import { getDatabaseOptions } from './database.config.js';

// Load the root .env when using TypeORM CLI.
config({
  path: resolve(process.cwd(), '../.env'),
});

export default new DataSource(getDatabaseOptions());
