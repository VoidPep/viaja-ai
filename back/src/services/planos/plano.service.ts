import { Inject, Injectable } from '@nestjs/common';
import { saltOrRounds } from "../../main";
import { DataSource, Repository } from "typeorm";
import { hash } from "bcrypt";
import { Plano } from 'src/modules/plano/plano.entity';

@Injectable()
export class PlanoService {
  repository: Repository<Plano>;
  constructor(
    @Inject("DATA_SOURCE") private readonly database: DataSource,
  ) {
    this.repository = this.database.getRepository(Plano);
  }
  async findPlanoByDescricao(descricao: string) {
      return await this.repository.findOne({
        where: { descricao: descricao }
      });
  }

  async createPlano(plano: { descricao: string; valor: number }) {
    const novoPlano = this.database.getRepository(Plano).create(plano);
    return await this.database.getRepository(Plano).save(novoPlano);
  }

  async findOne(id: number) {
    return await this.repository.findOne({
      where: { id },
      relations: ['plano'],
    });
  }
}
