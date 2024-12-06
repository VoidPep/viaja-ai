import {Controller, Get, Post, Body, Param, Delete, Logger } from '@nestjs/common';
import { RoteirosService } from '../services/roteiros/roteiros.service';
import { AuthGuard } from 'src/modules/auth/auth.guard';
import { GeminiService } from 'src/services/gemini/gemini.service';
import { promptGemini } from 'src/common/gemini-prompt';
import { UsuarioService } from 'src/services/account/user.service';
import { PromptRequest } from 'src/modules/gemini/gemini.request';
import { ImagemDoRoteiro } from 'src/modules/roteiros/entity/imagem-do-roteiro.entity';

@Controller('roteiros')
export class RoteirosController {
  constructor(
    private readonly roteirosService: RoteirosService,
    private readonly geminiService: GeminiService,
    private readonly userService: UsuarioService
  ) {}

  @Post("gerar-viagem")
  async gerarViagem(@Body() request:any) {
    const prompt = promptGemini(request)
  
    const viagemGerada = await this.geminiService.getResponse(prompt);
    const {senha, ...usuario} = await this.userService.findOne(request.idUsuario)

    // let roteiro = {
    //   dataInicio: viagemGerada.data_inicio,
    //   dataFim: viagemGerada.data_fim,
    //   destino: `${viagemGerada.destino.cidade} - ${viagemGerada.destino.pais}`,
    //   custo_total_estimado: viagemGerada.custo_total_estimado,
    //   json: JSON.stringify(viagemGerada),
    //   usuario: usuario,
    //   imagens: []
    // };

    // const roteiroCriado = await this.roteirosService.create(roteiro)
    // roteiroCriado.imagens = await this.roteirosService.criarImagens(roteiroCriado, request as PromptRequest);
    
    return viagemGerada;
  }

  @Get("getByLoggedUser/:id")
  getByLoggedUser(@Param('id') id) {
    return this.roteirosService.getByLoggedUser(id);
  }s
  
  @Delete(":id")
  delete(@Param('id') id) {
    return this.roteirosService.remove(id);
  }
}
