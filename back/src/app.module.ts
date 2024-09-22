import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './user/user.module';
import { RoteirosModule } from './roteiros/roteiros.module';
import { GeminiService } from './gemini/gemini.service';
import { GeminiController } from './gemini/gemini.controller';
import { GeminiModule } from './gemini/gemini.module';
import { PerguntasModule } from './perguntas/perguntas.module';

@Module({
  imports: [UsuarioModule, RoteirosModule, GeminiModule,PerguntasModule],
  controllers: [AppController, GeminiController],
  providers: [AppService, GeminiService],
})
export class AppModule { }