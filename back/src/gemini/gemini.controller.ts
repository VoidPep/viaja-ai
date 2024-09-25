import {Controller, Post} from '@nestjs/common';
import {GeminiService} from './gemini.service';
import {promptGemini} from "../common/gemini-prompt"
import {PromptRequest} from "./gemini.request";

@Controller('gemini')
export class GeminiController {
  constructor(private readonly geminiService: GeminiService) {}

  @Post('prompt')
  async handlePrompt() {
    const prompt = promptGemini(new PromptRequest())

    return await this.geminiService.getResponse(prompt);
  }
}