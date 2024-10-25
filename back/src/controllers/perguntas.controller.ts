import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PerguntasService } from '../services/perguntas/perguntas.service';
import { CreatePerguntaDto } from '../modules/perguntas/dto/create-pergunta.dto';
import { UpdatePerguntaDto } from '../modules/perguntas/dto/update-pergunta.dto';

@Controller('perguntas')
export class PerguntasController {
  constructor(private readonly perguntasService: PerguntasService) {}

  @Post()
  create(@Body() createPerguntaDto: CreatePerguntaDto) {
    return this.perguntasService.create(createPerguntaDto);
  }

  @Get()
  findAll() {
    return this.perguntasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.perguntasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePerguntaDto: UpdatePerguntaDto) {
    return this.perguntasService.update(+id, updatePerguntaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.perguntasService.remove(+id);
  }
}
