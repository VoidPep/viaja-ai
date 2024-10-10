import { Module } from '@nestjs/common';
import { PerguntasService } from '../../services/perguntas.service';
import { PerguntasController } from '../../controllers/perguntas.controller';

@Module({
  controllers: [PerguntasController],
  providers: [PerguntasService],
})
export class PerguntasModule {}
