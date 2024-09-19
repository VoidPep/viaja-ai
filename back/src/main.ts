import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

export const saltOrRounds = 10;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const host = process.env.HOST || 'localhost';
  const port = process.env.PORT || 3000;

  await app.listen(port, host, () => {
    Logger.log(`🚀 Application is running on: http://${host}:${port}`);
  });
}
bootstrap();
