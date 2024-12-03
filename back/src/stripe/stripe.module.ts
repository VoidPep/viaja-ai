import { Module } from '@nestjs/common';
import { StripeController } from './stripe.controller';
import { StripeService } from './stripe.service';
import { UsuarioService } from 'src/services/account/user.service';

@Module({
  controllers: [StripeController],
  providers: [StripeService, UsuarioService],
})
export class StripeModule {}
