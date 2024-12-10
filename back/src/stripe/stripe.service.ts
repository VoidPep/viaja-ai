import { Injectable, Logger } from '@nestjs/common';
import Stripe from 'stripe';
import { UsuarioService } from 'src/services/account/user.service';
import { plans } from './planos';

@Injectable()
export class StripeService {
  private stripe: Stripe;
  private readonly logger = new Logger(StripeService.name);

  constructor(private readonly usuarioService: UsuarioService) {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeSecretKey) {
      throw new Error('Stripe secret key is not defined in the environment variables.');
    }

    this.stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2024-11-20.acacia',
    });
  }

  /**
   * Busca um cliente Stripe pelo e-mail.
   * @param email - E-mail do cliente.
   * @returns Cliente Stripe ou `null` se não encontrado.
   */
  async getStripeCustomerByEmail(email: string): Promise<Stripe.Customer | null> {
    try {
      const customers = await this.stripe.customers.list({ email });
      return customers.data[0] || null;
    } catch (error) {
      this.logger.error(`Erro ao buscar cliente por e-mail: ${email}`, error);
      throw error;
    }
  }

  /**
   * Cria um cliente Stripe ou retorna um existente.
   * @param input - Dados do cliente.
   * @returns Cliente Stripe.
   */
  async createCustomer(input: { email: string }): Promise<Stripe.Customer> {
    try {
      const existingCustomer = await this.getStripeCustomerByEmail(input.email);
      if (existingCustomer) {
        return existingCustomer;
      }
      return await this.stripe.customers.create(input);
    } catch (error) {
      this.logger.error(`Erro ao criar cliente com e-mail: ${input.email}`, error);
      throw error;
    }
  }

  /**
   * Cria uma sessão de checkout Stripe para uma assinatura.
   * @param idUsuario - ID do usuário.
   * @returns URL da sessão de checkout.
   */
  async createCheckoutSession(idUsuario: number): Promise<{ url: string }> {
    try {
      const baseUrl = process.env.API_URL || 'http://0.0.0.0:3000/';
      const { email } = await this.usuarioService.findOne(idUsuario);
      const customer = await this.createCustomer({ email });

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
        success_url: `${baseUrl}/pagamento?success=true`,
        cancel_url: `${baseUrl}/pagamento?success=false`,
      });

      return { url: session.url || '' };
    } catch (error) {
      this.logger.error(`Erro ao criar sessão de checkout para usuário ${idUsuario}`, error);
      throw error;
    }
  }

  /**
   * Cria um PaymentIntent para um pagamento único.
   * @param idUsuario - ID do usuário.
   * @param priceId - ID do plano de preço.
   * @returns Informações do PaymentIntent.
   */
  async createPaymentIntent(
    idUsuario: number,
    priceId: string,
  ): Promise<{ clientSecret: string; customer: string }> {
    try {
      const { email } = await this.usuarioService.findOne(idUsuario);
      const customer = await this.createCustomer({ email });

      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: 2000, // Valor em centavos ($20.00 neste caso)
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
        clientSecret: paymentIntent.client_secret || '',
        customer: customer.id,
      };
    } catch (error) {
      this.logger.error(`Erro ao criar PaymentIntent para usuário ${idUsuario}`, error);
      throw error;
    }
  }
}
