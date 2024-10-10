import { Module } from '@nestjs/common';
import { GeminiController } from '../../controllers/gemini.controller';
import { GeminiService } from '../../services/gemini/gemini.service';

@Module({
  imports: [],
  controllers: [GeminiController],
  providers: [GeminiService],
})
export class GeminiModule {}