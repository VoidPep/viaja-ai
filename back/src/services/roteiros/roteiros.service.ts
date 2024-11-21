import { Inject, Injectable } from '@nestjs/common';
import { CreateRoteiroDto } from '../../modules/roteiros/dto/create-roteiro.dto';
import { Roteiro } from '../../modules/roteiros/entity/roteiro.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class RoteirosService {
  repository: Repository<Roteiro>;
  constructor(
    @Inject("DATA_SOURCE") private readonly database: DataSource,
  ) {
    this.repository = this.database.getRepository(Roteiro);
  }

  async getByLoggedUser(id: any) {
    return await this.repository.find({
      where: {
        usuario: { id: id },
      },
      relations: ['usuario'],
    });
  }
  
  async create(roteiro: any) {
    return await this.repository.save(roteiro)
  }
  async remove(id: number) {
    return await this.repository.delete(id)
  }
}
