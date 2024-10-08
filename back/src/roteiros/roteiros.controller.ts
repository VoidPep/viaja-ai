import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoteirosService } from './roteiros.service';
import { CreateRoteiroDto } from './dto/create-roteiro.dto';
import { UpdateRoteiroDto } from './dto/update-roteiro.dto';

@Controller('roteiros')
export class RoteirosController {
  constructor(private readonly roteirosService: RoteirosService) {}

  @Post()
  create(@Body() createRoteiroDto: CreateRoteiroDto) {
    return this.roteirosService.create(createRoteiroDto);
  }

  @Get()
  findAll() {
    return this.roteirosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roteirosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoteiroDto: UpdateRoteiroDto) {
    return this.roteirosService.update(+id, updateRoteiroDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roteirosService.remove(+id);
  }
}
