import { Module } from '@nestjs/common';
import { RoteirosService } from '../../services/roteiros/roteiros.service';
import { RoteirosController } from '../../controllers/roteiros.controller';
import { DatabaseModule } from 'src/database/database.module';
import {JwtAuthGuard} from "../auth/auth.guard";

@Module({
  imports: [DatabaseModule],
  controllers: [RoteirosController],
  providers: [RoteirosService],
  exports: [RoteirosService],
})
export class RoteirosModule { }