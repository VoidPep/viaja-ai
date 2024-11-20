import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { Usuario } from '../../user/entity/user.entity';

@Entity()
export class Roteiro {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    destino: string;

    @Column()
    dataInicio: Date;

    @Column()
    dataFim: Date;
    
    @Column()
    custo_total_estimado: number;

    @Column("text")
    json: string;

    @ManyToOne(() => Usuario, usuario => usuario.roteiros)
    @JoinColumn({ name: 'idUsuario' })
    usuario: Usuario;
}
