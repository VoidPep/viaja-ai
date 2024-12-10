import { Injectable, Logger } from '@nestjs/common';
import { UsuarioService } from 'src/services/account/user.service';
import Stripe from 'stripe';
import { plans } from './planos';

@Injectable()
export class StripeService {
  private stripe: Stripe;
  private readonly logger = new Logger(StripeService.name);

  constructor(private readonly usuarioService: UsuarioService) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
      apiVersion: '2024-11-20.acacia', // Verifique e use a versão correta da API do Stripe
    });
  }

  async getStripeCustomerByEmail(email: string) {
    try {
      const customer = await this.stripe.customers.list({ email });
      return customer.data[0];
    } catch (error) {
      this.logger.error(`Erro ao buscar cliente por email: ${email}`, error);
      throw error;
    }
  }

  async createCustomer(input: { email: string }): Promise<Stripe.Customer> {
    try {
      const existingCustomer = await this.getStripeCustomerByEmail(input.email);
      if (existingCustomer) return existingCustomer;

      return await this.stripe.customers.create(input);
    } catch (error) {
      this.logger.error(`Erro ao criar cliente: ${input.email}`, error);
      throw error;
    }
  }

  async createCheckoutSession(idUsuario: number) {
    try {
      const baseUrl = process.env.API_URL ?? "http://0.0.0.0:3000/";

      const user = await this.usuarioService.findOne(idUsuario);
      if (!user || !user.email) {
        throw new Error(`Usuário com ID ${idUsuario} não encontrado ou sem email`);
      }

      const customer = await this.createCustomer({ email: user.email });

      const successUrl = `${baseUrl}/pagamento?success=true`;
      const cancelUrl = `${baseUrl}/pagamento?success=false`;

      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'subscription',
        line_items: [
          {
            price: plans.pro.priceId,
            quantity: 1,
          },
        ],
        client_reference_id: idUsuario.toString(),
        customer: customer.id,
        success_url: successUrl,
        cancel_url: cancelUrl,
      });

      return { url: session.url };
    } catch (error) {
      this.logger.error(`Erro ao criar sessão de checkout para o usuário ${idUsuario}`, error);
      throw error;
    }
  }

  async createPaymentIntent(idUsuario: number, priceId: string) {
    try {
      const user = await this.usuarioService.findOne(idUsuario);
      if (!user || !user.email) {
        throw new Error(`Usuário com ID ${idUsuario} não encontrado ou sem email`);
      }

      const customer = await this.createCustomer({ email: user.email });

      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: 2000, // Valor em centavos
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
    } catch (error) {
      this.logger.error(`Erro ao criar Payment Intent para o usuário ${idUsuario}`, error);
      throw error;
    }
  }
}
