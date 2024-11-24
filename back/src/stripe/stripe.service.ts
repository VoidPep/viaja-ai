import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor() {
    const stripe = require('stripe')('sk_test_Ho24N7La5CVDtbmpjc377lJI', {
        apiVersion: '2024-11-20.acacia',
      });
  }

  async createCheckoutSession() {
    return this.stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: { name: 'Node.js and Express book' },
            unit_amount: 50 * 100,
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
      success_url: `${process.env.BASE_URL}/complete?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.BASE_URL}/cancel`,
    });
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
