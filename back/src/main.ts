import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';

export const saltOrRounds = 10;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.use(
      session({
        secret: 'a358b2a514bc48b6a9dab43e4afdf087',
        resave: false,
        saveUninitialized: false,
        cookie: {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: 3600000,
        },
      }),
  );

  const host = process.env.HOST || 'localhost';
  const port = process.env.PORT || 3000;

  await app.listen(port, host, () => {
    Logger.log(`🚀 Application is running on: https://${host}:${port}`);
  });
}
bootstrap().then(() => {});