import { Module } from '@nestjs/common';
import { RoteirosService } from './roteiros.service';
import { RoteirosController } from './roteiros.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [RoteirosController],
  providers: [RoteirosService],
  exports: [RoteirosService],
})
export class RoteirosModule { }
