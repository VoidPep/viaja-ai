import {Module} from '@nestjs/common';
import {DatabaseModule} from 'src/database/database.module';
import {UsuarioService} from "../../services/account/user.service";

@Module({
  imports: [DatabaseModule],
  providers: [UsuarioService],
  exports: [UsuarioService],
})
export class UsuarioModule {}