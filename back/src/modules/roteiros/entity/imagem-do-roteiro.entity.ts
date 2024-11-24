import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Roteiro } from "./roteiro.entity";

@Entity()
export class ImagemDoRoteiro {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    url: string;

    @ManyToOne(() => Roteiro, (roteiro) => roteiro.imagens)
    @JoinColumn({ name: 'idRoteiro' })
    roteiro: Roteiro;
}