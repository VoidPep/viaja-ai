import { Body, Controller, Post } from '@nestjs/common';
import { GeminiService } from './gemini.service';

@Controller('gemini')
export class GeminiController {
  constructor(private readonly geminiService: GeminiService) {}

  @Post('prompt')
  async handlePrompt(@Body('prompt') prompt: string) {
    const response = await this.geminiService.getResponse(prompt);
    return response;
  }
}