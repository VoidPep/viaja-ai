import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { TipoDePergunta } from '../enums/tipo_de_pergunta';  

@Entity()
export class Pergunta {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    texto: string;  // Texto da pergunta

    @Column({
        type: "enum",
        enum: TipoDePergunta,
        default: TipoDePergunta.TEXT_INPUT
    })
    tipo: TipoDePergunta;  // Tipo de pergunta (range, text_input, radio, checkbox)
}
