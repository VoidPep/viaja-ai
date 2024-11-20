import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Logger} from '@nestjs/common';
import { RoteirosService } from '../services/roteiros/roteiros.service';
import { AuthGuard } from 'src/modules/auth/auth.guard';
import { GeminiService } from 'src/services/gemini/gemini.service';
import { promptGemini } from 'src/common/gemini-prompt';

@Controller('roteiros')
export class RoteirosController {
  constructor(
    private readonly roteirosService: RoteirosService,
    private readonly geminiService: GeminiService
  ) {}

  @Post("gerar-viagem")
  async gerarViagem(@Body() request:any) {
    const prompt = promptGemini(request)

    const viagemGerada = await this.geminiService.getResponse(prompt);
    return viagemGerada;


  }

  @UseGuards(AuthGuard)
  @Get("getByLoggedUser")
  getByLoggedUser() {
    // return this.roteirosService.getByLoggedUser();
  }
}
