import { Module } from '@nestjs/common';
import { RoteirosService } from '../../services/roteiros/roteiros.service';
import { RoteirosController } from '../../controllers/roteiros.controller';
import { DatabaseModule } from 'src/database/database.module';
import { GeminiService } from 'src/services/gemini/gemini.service';

@Module({
  imports: [DatabaseModule],
  controllers: [RoteirosController],
  providers: [RoteirosService, GeminiService],
  exports: [RoteirosService],
})
export class RoteirosModule { }