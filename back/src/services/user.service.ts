import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Usuario } from '../modules/user/entity/user.entity';
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
    return await this.repository.find({ select: ["id", "nome", "email", "cpf"] });
  }

  async create(usuario: any) {
    if (!usuario.senha)
      return {
        status: 400,
        message: "Senha é necessária"
      }

    usuario.senha = await bcrypt.hash(usuario.senha, saltOrRounds);
    await this.repository.save(usuario)

    return {
      status: 201,
      message: "Criado com sucesso!"
    }
  }

  async findOne(id: number) {
    const usuario = await this.repository.findOneBy({
      id: id,
    });

    if (!usuario)
      return {
        status: 404,
        message: "Não encontrado"
      }

    return {
      nome: usuario.nome,
      email: usuario.email
    };
  }
  async update(id: number, usuario: any) {
    if (usuario.senha) {
      usuario.senha = await bcrypt.hash(usuario.senha, saltOrRounds);
    }

    var response = await this.repository.update({ id }, usuario);
    return {
      status: 201,
      message: "Criado com sucesso!",
      data: response
    }
  }

  async remove(id: number) {
    return await this.repository.delete({ id: id })
  }
}
