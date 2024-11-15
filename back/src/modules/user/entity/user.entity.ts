import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Plano } from '../../plano/plano.entity';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  senha: string;

  @Column()
  email: string;

  @Column()
  administrador: boolean;

  @ManyToOne(() => Plano, (plano) => plano.usuarios)
  @JoinColumn({ name: 'idPlano' })
  plano: Plano;
}