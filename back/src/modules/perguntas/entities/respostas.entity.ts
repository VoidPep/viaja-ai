import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Pergunta } from './pergunta.entity';  
import { Usuario } from "../../user/entity/user.entity"


@Entity()
export class Resposta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  resposta: string;  

  @ManyToOne(() => Pergunta, { nullable: false })
  pergunta: Pergunta;  

  @ManyToOne(() => Usuario, { nullable: false })
  user: Usuario;  
}
