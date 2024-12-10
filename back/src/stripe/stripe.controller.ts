import { StripeService } from './stripe.service';
import { UsuarioService } from 'src/services/account/user.service';
import { Body, Controller, Post, NotFoundException } from '@nestjs/common';

@Controller('stripe')
export class StripeController {
  constructor(
    private readonly stripeService: StripeService,
    private readonly usuarioService: UsuarioService, // Injeta a UsuarioService
  ) {}

  @Post('create-checkout-session')
  async createCheckoutSession(@Body('userId') userId: number) {
    // Busca o usuário pelo ID
    const user = await this.usuarioService.findOne(userId);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    // Cria a sessão de checkout com o ID do usuário
    return this.stripeService.createCheckoutSession(user.id);
  }
  
  @Post('create-payment-intent')
  async createPaymentIntent(@Body() body: { userId: number; priceId: string }) {
    const { userId, priceId } = body;

    // Busca o usuário pelo ID
    const user = await this.usuarioService.findOne(userId);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    // Cria o payment intent com o ID do usuário e o priceId
    return this.stripeService.createPaymentIntent(user.id, priceId);
  }
}
