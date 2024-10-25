import {Module} from '@nestjs/common';
import {PerguntasService} from '../../services/perguntas/perguntas.service';
import {PerguntasController} from '../../controllers/perguntas.controller';

@Module({
    controllers: [PerguntasController],
    providers: [PerguntasService],
    exports: [PerguntasService],
})
export class PerguntasModule {
}
