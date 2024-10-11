import {Module} from '@nestjs/common';
import {DatabaseModule} from 'src/database/database.module';
import {UsuarioService} from "../../services/account/user.service";
import {UsuarioController} from "../../controllers/user.controller";

@Module({
  imports: [DatabaseModule],
  controllers: [UsuarioController],
  providers: [UsuarioService],
  exports: [UsuarioService],
})
export class UsuarioModule {}