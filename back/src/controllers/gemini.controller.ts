import {Controller, Post, UseGuards} from '@nestjs/common';
import {GeminiService} from '../services/gemini/gemini.service';
import {promptGemini} from "../common/gemini-prompt"
import {PromptRequest} from "../modules/gemini/gemini.request";
import {JwtAuthGuard} from "../modules/auth/auth.guard";

@Controller('gemini')
export class GeminiController {
  constructor(private readonly geminiService: GeminiService) {}

  @Post('prompt')
  async handlePrompt() {
    const prompt = promptGemini(new PromptRequest())

    return await this.geminiService.getResponse(prompt);
  }
}