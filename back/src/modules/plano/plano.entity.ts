import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Usuario } from '../user/entity/user.entity';

@Entity()
export class Plano {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  descricao: string;

  @Column()
  valor: number;

  @OneToMany(() => Usuario, (usuario) => usuario.plano, { nullable: true })
  usuarios: Usuario[];
}