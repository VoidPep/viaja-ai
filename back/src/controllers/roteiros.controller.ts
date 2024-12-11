import {Controller, Get, Post, Body, Param, Delete, Logger } from '@nestjs/common';
import { RoteirosService } from '../services/roteiros/roteiros.service';
import { AuthGuard } from 'src/modules/auth/auth.guard';
import { GeminiService } from 'src/services/gemini/gemini.service';
import { promptGemini } from 'src/common/gemini-prompt';
import { UsuarioService } from 'src/services/account/user.service';
import { PromptRequest } from 'src/modules/gemini/gemini.request';
import { ImagemDoRoteiro } from 'src/modules/roteiros/entity/imagem-do-roteiro.entity';
import { RoteiroResponse } from 'src/modules/roteiros/dto/roteiro.response';

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
  
    const viagensGeradas = await this.geminiService.getResponse(prompt);
    
    let roteiros = viagensGeradas.map(viagemGerada => {
      let roteiro = {
        dataInicio: viagemGerada.data_inicio,
        dataFim: viagemGerada.data_fim,
        destino: `${viagemGerada.destino.cidade} - ${viagemGerada.destino.pais}`,
        custo_total_estimado: viagemGerada.custo_total_estimado,
        json: JSON.stringify(viagemGerada),
        imagens: []
      } as RoteiroResponse;
      
      return roteiro
    })
    roteiros = await this.roteirosService.criarImagens(roteiros, request as PromptRequest)
    // const roteiroCriado = await this.roteirosService.create(roteiro)
    const roteirosSanitizados = roteiros.map((roteiro) => {
      const { usuario, ...roteiroSemUsuario } = roteiro;
      return roteiroSemUsuario;
    });
    
    return { viagens: roteirosSanitizados };
  }
  
  @Get("getByLoggedUser/:id")
  async getByLoggedUser(@Param('id') id) {
    return await this.roteirosService.getByLoggedUser(id);
  }
  
  @Delete(":id")
  delete(@Param('id') id) {
    return this.roteirosService.remove(id);
  }
  
  @Post("salvar-roteiro")
  async salvarRoteiro(@Body() body: { idUsuario: number, viagem: any }) {
    const usuario = await this.userService.findOne(body.idUsuario)

    return this.roteirosService.salvarRoteiro(body.viagem, usuario);
  }
}
