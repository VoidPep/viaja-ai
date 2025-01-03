import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

export const saltOrRounds = 10;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = process.env.PORT || 3000; 
  const host = '0.0.0.0';

  app.enableCors();

  await app.listen(port, host, () => {
    console.log(`Application is running on: http://${host}:${port}`);
  });
}

bootstrap().then(() => {});
