import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Usuario } from './entity/user.entity';
import { saltOrRounds } from 'src/main';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {
  repository: Repository<Usuario>;
  constructor(
    @Inject("DATA_SOURCE") private readonly database: DataSource,
  ) {
    this.repository = this.database.getRepository(Usuario);
  }

  async findAll(): Promise<Usuario[]> {
    return await this.repository.find();
  }

  async create(usuario: any) {
    if (!usuario.senha)
      return {
        message: "Senha é necessária"
      }

    usuario.senha = await bcrypt.hash(usuario.senha, saltOrRounds);

    return await this.repository.save(usuario)
  }

  async findOne(id: number) {
    const usuario = await this.repository.findOneBy({
      id: id
    });

    return {
      nome: usuario.nome,
      email: usuario.email
    };
  }
  async update(id: number, usuario: any) {
    if (usuario.senha){
      usuario.senha = await bcrypt.hash(usuario.senha, saltOrRounds);
    }

    return await this.repository.update({ id }, usuario);
  }

  async remove(id: number) {
    return await this.repository.delete({ id: id })
  }
}
