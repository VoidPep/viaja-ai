import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

export const saltOrRounds = 10;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = process.env.PORT || 3000;  // Heroku define automaticamente o PORT
  const host = '0.0.0.0';

  app.enableCors();

  await app.listen(port, host, () => {
    Logger.log(process.env.DATABASE_URL)
  });
}
bootstrap().then(() => { });