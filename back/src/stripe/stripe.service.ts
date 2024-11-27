import { Injectable, Logger } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
      apiVersion: '2024-11-20.acacia',
    });
  }

  async createCheckoutSession() {
    const baseUrl = process.env.API_URL ?? "http://0.0.0.0:3000/"

    const successUrl = `${baseUrl}/complete?session_id=`

    const response = await this.stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: { name: 'Node.js and Express book' },
            unit_amount: 1,
          },
          quantity: 1,
        },
        {
          price_data: {
            currency: 'usd',
            product_data: { name: 'JavaScript T-Shirt' },
            unit_amount: 20 * 100,
          },
          quantity: 2,
        },
      ],
      mode: 'payment',
      shipping_address_collection: { allowed_countries: ['US', 'BR'] },
      success_url: `${successUrl}{CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/cancel`,
    });

    return response
    // return response.id 
  }

  async retrieveSession(sessionId: string) {
    return this.stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['payment_intent.payment_method'],
    });
  }

  async listLineItems(sessionId: string) {
    return this.stripe.checkout.sessions.listLineItems(sessionId);
  }
}
