import { Module } from '@nestjs/common';
import { RoteirosService } from '../../services/roteiros/roteiros.service';
import { RoteirosController } from '../../controllers/roteiros.controller';
import { DatabaseModule } from 'src/database/database.module';
import { GeminiService } from 'src/services/gemini/gemini.service';
import { UsuarioService } from 'src/services/account/user.service';

@Module({
  imports: [DatabaseModule],
  controllers: [RoteirosController],
  providers: [RoteirosService, GeminiService, UsuarioService],
  exports: [RoteirosService],
})
export class RoteirosModule { }