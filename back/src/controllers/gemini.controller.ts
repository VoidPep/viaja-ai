import {Controller, Post} from '@nestjs/common';
import {GeminiService} from '../services/gemini.service';
import {promptGemini} from "../common/gemini-prompt"
import {PromptRequest} from "../modules/gemini/gemini.request";

@Controller('gemini')
export class GeminiController {
  constructor(private readonly geminiService: GeminiService) {}

  @Post('prompt')
  async handlePrompt() {
    const prompt = promptGemini(new PromptRequest())

    return await this.geminiService.getResponse(prompt);
  }
}