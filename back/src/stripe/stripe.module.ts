import { Module } from '@nestjs/common';
import { StripeController } from './stripe.controller';
import { StripeService } from './stripe.service';
import { UsuarioService } from 'src/services/account/user.service';
import { UsuarioModule } from 'src/modules/user/user.module';

@Module({
  imports: [UsuarioModule],
  controllers: [StripeController],
  providers: [StripeService],
})
export class StripeModule {}
