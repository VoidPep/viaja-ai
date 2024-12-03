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
  async createPaymentIntent(@Body() body: { userId: number; priceId: string }) {
    const { userId: idUsuario, priceId } = body;
    return await this.stripeService.createPaymentIntent(idUsuario, priceId);
  }
}
