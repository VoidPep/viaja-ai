import {Body, Controller, Post, UseGuards} from '@nestjs/common';
import {GeminiService} from '../services/gemini/gemini.service';
import {promptGemini} from "../common/gemini-prompt"
import {PromptRequest} from "../modules/gemini/gemini.request";

@Controller('gemini')
export class GeminiController {
  constructor(private readonly geminiService: GeminiService) {}

  @Post('prompt')
  async handlePrompt(@Body() request: PromptRequest) {
    const prompt = promptGemini(request)

    return await this.geminiService.getResponse(prompt);
  }
}