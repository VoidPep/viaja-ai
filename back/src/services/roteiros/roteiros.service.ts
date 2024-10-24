import { Inject, Injectable } from '@nestjs/common';
import { CreateRoteiroDto } from '../../modules/roteiros/dto/create-roteiro.dto';
import { UpdateRoteiroDto } from '../../modules/roteiros/dto/update-roteiro.dto';
import { Roteiro } from '../../modules/roteiros/entities/roteiro.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class RoteirosService {
  repository: Repository<Roteiro>;
  constructor(
    @Inject("DATA_SOURCE") private readonly database: DataSource,
  ) {
    this.repository = this.database.getRepository(Roteiro);
  }
  
  create(createRoteiroDto: CreateRoteiroDto) {
    return 'This action adds a new roteiro';
  }

  findAll() {
    return `This action returns all roteiros`;
  }

  findOne(id: number) {
    return `This action returns a #${id} roteiro`;
  }

  update(id: number, updateRoteiroDto: UpdateRoteiroDto) {
    return `This action updates a #${id} roteiro`;
  }

  remove(id: number) {
    return `This action removes a #${id} roteiro`;
  }
}
