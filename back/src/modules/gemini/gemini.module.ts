import { Module } from '@nestjs/common';
import { GeminiController } from '../../controllers/gemini.controller';
import { GeminiService } from '../../services/gemini/gemini.service';

@Module({
  controllers: [GeminiController],
  providers: [GeminiService],
  exports: [GeminiService]
})
export class GeminiModule {}