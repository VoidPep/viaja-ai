import { Inject, Injectable } from '@nestjs/common';
import { CreateRoteiroDto } from './dto/create-roteiro.dto';
import { UpdateRoteiroDto } from './dto/update-roteiro.dto';

@Injectable()
export class RoteirosService {
  repository: Repository<Usuario>;
  constructor(
    @Inject("DATA_SOURCE") private readonly database: DataSource,
  ) {
    this.repository = this.database.getRepository(Usuario);
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
