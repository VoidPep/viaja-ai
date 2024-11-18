import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Plano } from '../../plano/plano.entity';
import { Roteiro } from 'src/modules/roteiros/entities/roteiro.entity';

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

  @ManyToOne(() => Plano, (plano) => plano.usuarios, { nullable: true })
  @JoinColumn({ name: 'idPlano' })
  plano: Plano;

  @OneToMany(() => Plano, (plano) => plano.usuarios, { nullable: true })
  roteiros: Roteiro[];
}