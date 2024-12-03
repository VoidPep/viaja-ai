import { Injectable, Logger } from '@nestjs/common';
import { UsuarioService } from 'src/services/account/user.service';
import Stripe from 'stripe';
import { plans } from './planos';

@Injectable()
export class StripeService {
  private stripe: Stripe;
  private usuarioService: UsuarioService;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
      apiVersion: '2024-11-20.acacia',
    });
  }

  async getStripeCustomerByEmail(email: string) {
    const customer = await this.stripe.customers.list({ email })
    return customer.data[0]
  }

  async createCustomer(input: { email: string }): Promise<Stripe.Customer> {
    const customer = await this.getStripeCustomerByEmail(input.email)
    if(customer) return customer

    return await this.stripe.customers.create(input);
  }

  async createCheckoutSession(idUsuario: number) {
    const baseUrl = process.env.API_URL ?? "http://0.0.0.0:3000/";

    const { email } = await this.usuarioService.findOne(idUsuario);

    const customer = await this.createCustomer({email})

    const successUrl = `${baseUrl}/pagamento?success=true`;
    const cancelUrl = `${baseUrl}/pagamento?success=false`;

    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: 'subscription',
      line_items: [
        {
          price: plans.pro.priceId,
          quantity: 1,
        },
      ],
      client_reference_id: idUsuario.toString(),
      customer: customer.id.toString(), 
      success_url: `${successUrl}`,
      cancel_url: `${cancelUrl}`,
    });

    return {url: session.url};
    // return response.id 
  }

  async createPaymentIntent(idUsuario: number, priceId: string) {
    const { email } = await this.usuarioService.findOne(idUsuario);

    const customer = await this.createCustomer({email})

    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: 2000, // Valor em centavos ($20.00, neste caso)
      currency: 'usd',
      customer: customer.id,
      payment_method_types: ['card'],
      description: `Assinatura para usuário ${idUsuario}`,
      metadata: {
        client_reference_id: idUsuario.toString(),
        subscription_plan: priceId,
      },
    });

    return {
      clientSecret: paymentIntent.client_secret,
      customer: customer.id,
    };
  }

  // async retrieveSession(sessionId: string) {
  //   return this.stripe.checkout.sessions.retrieve(sessionId, {
  //     expand: ['payment_intent.payment_method'],
  //   });
  // }

  // async listLineItems(sessionId: string) {
  //   return this.stripe.checkout.sessions.listLineItems(sessionId);
  // }

  // async createPaymentIntent(amount: number, currency: string) {
  //   const paymentIntent = await this.stripe.paymentIntents.create({
  //     amount,
  //     currency,
  //   });

  //   return {
  //     clientSecret: paymentIntent.client_secret,
  //   };
  // }
}