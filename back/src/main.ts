import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser'; // Importa o body-parser

export const saltOrRounds = 10;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = process.env.PORT || 3000; // Heroku define automaticamente o PORT
  const host = '0.0.0.0';

  // Middleware para expor o raw body (necessário para verificar assinaturas de webhooks)
  app.use(
    '/webhook', // Aplica o middleware somente para a rota de webhook
    bodyParser.raw({ type: 'application/json' }),
  );

  app.enableCors();

  await app.listen(port, host, () => {
    console.log(`Application is running on: http://${host}:${port}`);
  });
}

bootstrap().then(() => {});
