import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';

import connectPgSimple from 'connect-pg-simple';
import session from 'express-session';

import { getDatabaseOptions } from './database/database.config.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  
  const secret = process.env['SESSION_SECRET'];

  if (!secret || Buffer.byteLength(secret, 'utf8') < 32) {
    throw new Error(
      'SESSION_SECRET must contain at least 32 bytes',
    );
  }

  const database = getDatabaseOptions();

  if (database.type !== 'postgres') {
    throw new Error('Expected PostgreSQL configuration');
  }

  const PgSessionStore = connectPgSimple(session);
  const isProduction = process.env['NODE_ENV'] === 'production';

  app.use(
    session({
      name: 'ft.sid',

      secret,

      store: new PgSessionStore({
        conObject: {
          host: database.host,
          port: database.port,
          user: database.username,
          password: database.password,
          database: database.database,
        },
        tableName: 'user_sessions',
        createTableIfMissing: false,
      }),

      resave: false,
      saveUninitialized: false,

      cookie: {
        httpOnly: true,
        secure: isProduction,
        sameSite: 'lax',
        path: '/',
        maxAge: 8 * 60 * 60 * 1000,
      },
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
