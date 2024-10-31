import { Module } from '@nestjs/common';
import { UsuarioModule } from './modules/user/user.module';
import { RoteirosModule } from './modules/roteiros/roteiros.module';
import { GeminiModule } from './modules/gemini/gemini.module';
import { PerguntasModule } from './modules/perguntas/perguntas.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { TesteController } from './controllers/teste.controller';

@Module({
  imports: [
    GeminiModule,
    PerguntasModule,
    UsuarioModule,
    RoteirosModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    AuthModule
  ],
  controllers: [TesteController]
})
export class AppModule {}
