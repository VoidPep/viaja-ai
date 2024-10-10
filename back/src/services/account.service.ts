import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Usuario } from 'src/modules/user/entity/user.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}


  async createAccount(
    nome: string, 
    password: string, 
    email: string, 
    cpf: string, 
    administrador: boolean
  ): Promise<Usuario> {

    const hashedPassword = await bcrypt.hash(password, 10);


    const newUsuario = this.usuarioRepository.create({
      nome,
      senha: hashedPassword, 
      email,
      cpf,
      administrador,
    });

    return this.usuarioRepository.save(newUsuario);
  }


  async findByNome(nome: string): Promise<Usuario | undefined> {
    return this.usuarioRepository.findOne({ where: { nome } });
  }


  async validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}
