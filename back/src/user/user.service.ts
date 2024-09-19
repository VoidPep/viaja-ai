import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Usuario } from './entity/user.entity';

@Injectable()
export class UserService {
    repository: Repository<Usuario>;
    constructor(
        @Inject("DATA_SOURCE") private readonly database: DataSource,
      ) {
        this.repository = this.database.getRepository(Usuario);
      }

      async findAll(): Promise<Usuario[]> {
        return await this.repository.find();
      }
    
      async create(createUsuarioDto: any) {
        return await this.repository.save(createUsuarioDto)
      }
    
      async findOne(id: number): Promise<Usuario> {
        return await this.repository.findOneBy({
          id: id
        });
      }
      async update(id: number, updateUsuarioDto: any) {
        return await this.repository.update({id}, updateUsuarioDto);
      }
    
      async remove(id: number) {
        return await this.repository.delete({id: id})
      }
}
