import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { UsuarioService } from './user.service';
import { UsuarioController } from './user.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [UsuarioController],
  providers: [UsuarioService],
  exports: [UsuarioService],
})
export class UsuarioModule {}