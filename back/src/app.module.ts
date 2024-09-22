import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsuarioModule } from './user/user.module';
import { RoteirosModule } from './roteiros/roteiros.module';
import { PerguntasModule } from './perguntas/perguntas.module';

@Module({
  imports: [UsuarioModule, RoteirosModule, PerguntasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }