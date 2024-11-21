import {Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { RoteirosService } from '../services/roteiros/roteiros.service';
import { AuthGuard } from 'src/modules/auth/auth.guard';
import { GeminiService } from 'src/services/gemini/gemini.service';
import { promptGemini } from 'src/common/gemini-prompt';
import { UsuarioService } from 'src/services/account/user.service';

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
    const usuario = await this.userService.findOne(request.idUsuario)

    var roteiro = {
      dataInicio: viagemGerada.data_inicio,
      dataFim: viagemGerada.data_fim,
      destino: `${viagemGerada.destino.cidade} - ${viagemGerada.destino.pais}`,
      custo_total_estimado: viagemGerada.custo_total_estimado,
      json: JSON.stringify(viagemGerada),
      usuario: usuario
    }
    const roteiroCriado = await this.roteirosService.create(roteiro)

    return roteiroCriado;
  }

  @Get("getByLoggedUser/:id")
  getByLoggedUser(@Param('id') id) {
    return this.roteirosService.getByLoggedUser(id);
  }
  
  @Delete(":id")
  delete(@Param('id') id) {
    return this.roteirosService.remove(id);
  }
}
