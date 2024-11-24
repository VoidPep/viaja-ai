import { Controller, Get, Post, Query, Redirect, Res } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { Response } from 'express';

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Get('/')
  @Redirect('/')
  home() {
    return { url: '/', statusCode: 302 };
  }

  @Post('/checkout')
  async checkout(@Res() res: Response) {
    const session = await this.stripeService.createCheckoutSession();
    res.redirect(session.url);
  }

  @Get('/complete')
  async complete(@Query('session_id') sessionId: string, @Res() res: Response) {
    const result = await Promise.all([
      this.stripeService.retrieveSession(sessionId),
      this.stripeService.listLineItems(sessionId),
    ]);
    console.log(JSON.stringify(result));
    res.send('Your payment was successful');
  }

  @Get('/cancel')
  @Redirect('/')
  cancel() {
    return { url: '/', statusCode: 302 };
  }
}