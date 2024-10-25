import { PartialType } from '@nestjs/mapped-types';
import { CreateRoteiroDto } from './create-roteiro.dto';

export class UpdateRoteiroDto extends PartialType(CreateRoteiroDto) {}
