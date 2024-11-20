import {Module} from '@nestjs/common';
import {DatabaseModule} from 'src/database/database.module';
import {UsuarioService} from "../../services/account/user.service";
import { PlanoService } from 'src/services/planos/plano.service';

@Module({
  imports: [DatabaseModule],
  providers: [UsuarioService, PlanoService],
  exports: [UsuarioService, PlanoService],
})
export class UsuarioModule {}