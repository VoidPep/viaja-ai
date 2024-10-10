import {Module} from '@nestjs/common';
import {AppController} from './controllers/app.controller';
import {AppService} from './services/app.service';
import {UsuarioModule} from './modules/user/user.module';
import {RoteirosModule} from './modules/roteiros/roteiros.module';
import {GeminiService} from './services/gemini.service';
import {GeminiController} from './controllers/gemini.controller';
import {GeminiModule} from './modules/gemini/gemini.module';
import {PerguntasModule} from './modules/perguntas/perguntas.module';
import {ConfigModule} from "@nestjs/config";

@Module({
    // imports: [UsuarioModule, RoteirosModule, GeminiModule, PerguntasModule],
    imports: [GeminiModule, PerguntasModule,
        ConfigModule.forRoot({
            envFilePath: '.env',
            isGlobal: true
        })
    ],
    controllers: [AppController, GeminiController],
    providers: [AppService, GeminiService],
})
export class AppModule {
}