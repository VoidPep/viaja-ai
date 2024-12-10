import { StripeService } from './stripe.service';
import { Body, Controller, Post, Req, Res } from '@nestjs/common';

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) { }

  @Post('create-checkout-session')
  async createCheckoutSession(@Body('userId') userId: number) {
    return await this.stripeService.createCheckoutSession(userId);
  }
  
  @Post('create-payment-intent')
  async createPaymentIntent(@Body() body: { idUsuario: number; priceId: string }) {
    console.log('Body recebido no controller:', body);
    const result = await this.stripeService.createPaymentIntent(body.idUsuario, body.priceId);
    console.log('Resultado da StripeService:', result);
    return result;
  }
}
