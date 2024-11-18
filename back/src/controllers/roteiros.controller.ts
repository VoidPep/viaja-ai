import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards} from '@nestjs/common';
import { RoteirosService } from '../services/roteiros/roteiros.service';
import { CreateRoteiroDto } from '../modules/roteiros/dto/create-roteiro.dto';
import { UpdateRoteiroDto } from '../modules/roteiros/dto/update-roteiro.dto';
import { AuthGuard } from 'src/modules/auth/auth.guard';

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
  @UseGuards(AuthGuard)
  @Get("getByLoggedUser")
  getByLoggedUser() {
    // return this.roteirosService.getByLoggedUser();
  }
}
