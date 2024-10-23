import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Usuario } from "src/modules/user/entity/user.entity";
@Entity()
export class Roteiro {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Usuario)
    usuario: Usuario;

    @Column()
    destino: string;

    @Column()
    DataInicio: Date;

    @Column()
    DataFim: Date;
}
