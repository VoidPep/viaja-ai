<script setup>
import { ref, onMounted } from 'vue';
import { loadStripe } from '@stripe/stripe-js';

const stripe = ref(null);
const elements = ref(null);
const paymentElement = ref(null);
const isLoading = ref(false);
const paymentStatus = ref(''); // 'success', 'error', ''

// Função para carregar o Stripe e inicializar o Payment Element
onMounted(async () => {
  // Carregar a chave pública do Stripe (substitua pela sua chave pública)
  stripe.value = await loadStripe('pk_test_51Q2MUS03TdZPkyxCD6Xwnv3ZLpw6MuKA4YwhzBbRNyXQ5DSgJC3OJIvuBOqLar7SZU80FvQ1RCSl9x1xBBj4dZxq009Oxs0XRd');
  elements.value = stripe.value.elements();
});

// Função para processar o pagamento
const processPayment = async (event) => {
  event.preventDefault();

  isLoading.value = true; // Inicia o estado de carregamento
  paymentStatus.value = ''; // Reseta status anterior

  // Crie a intenção de pagamento no backend
  const response = await fetch('/payment/create-payment-intent', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ amount: 4990, currency: 'BRL' }),
  });

  const { clientSecret } = await response.json();

  // Montar o Payment Element
  paymentElement.value = elements.value.create('payment');
  paymentElement.value.mount('#payment-element');

  // Confirmar o pagamento
  const { error, paymentIntent } = await stripe.value.confirmPayment({
    elements: elements.value,
    confirmParams: {
      return_url: 'https://seusite.com/confirmacao-pagamento', // Substitua pelo seu URL de confirmação
    },
  });

  isLoading.value = false;

  if (error) {
    paymentStatus.value = 'error';
    alert('Ocorreu um erro ao processar o pagamento: ' + error.message);
  } else if (paymentIntent.status === 'succeeded') {
    paymentStatus.value = 'success';
    alert('Pagamento realizado com sucesso!');
  }
};
</script>

<template>
  <div class="payment-container">
    <!-- Lado Esquerdo -->
    <div class="summary">
      <div class="content">
        <img class="logo" src="@/assets/images/logo-simplificada.png" />
        <h2>Assinatura Viaja-AI</h2>
        <p><strong>R$49,90</strong> por mês</p>
        <ul>
          <li>Planejamento inteligente de viagens</li>
          <li>Acesso a ferramentas premium</li>
          <li>Suporte dedicado</li>
        </ul>
        <div class="total">
          <p>Subtotal: <span>R$49,90</span></p>
          <p>Taxa: <span>R$0,00</span></p>
          <hr />
          <p>Total hoje: <strong>R$49,90</strong></p>
        </div>
      </div>
    </div>

    <!-- Lado Direito -->
    <div class="payment-form">
      <div class="content">
        <h2>Informações de Pagamento</h2>

        <form @submit="processPayment">
          <div v-if="isLoading" class="loading">
            <div class="spinner"></div>
            <p>Processando pagamento...</p>
          </div>

          <div v-else-if="paymentStatus === 'success'" class="success-message">
            <p>🎉 Pagamento confirmado! Obrigado por assinar o Viaja-AI.</p>
          </div>

          <div v-else-if="paymentStatus === 'error'" class="error-message">
            <p>❌ Erro ao processar o pagamento. Tente novamente.</p>
          </div>

          <div v-if="!isLoading && !paymentStatus">
            <div class="form-group">
              <label for="email">Email</label>
              <input id="email" type="email" v-model="email" placeholder="seuemail@exemplo.com" required />
            </div>

            <h3>Método de Pagamento</h3>
            <div id="payment-element"></div> <!-- Stripe Payment Element será montado aqui -->

            <div class="terms">
              <input type="checkbox" id="terms" v-model="acceptTerms" />
              <label for="terms">Eu aceito os <a href="#">termos de uso</a>.</label>
            </div>
            <button type="submit" class="submit-button">Confirmar Pagamento</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.payment-container {
  display: flex;
  width: 100%;
  height: 100vh;
}

.summary {
  flex: 1;
  background: #f0f1f5;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
}

.summary .content {
  max-width: 350px;
  text-align: center;
}

.logo {
  width: 170px;
  height: 70px;
}

.summary h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.summary ul {
  margin: 1rem 0;
  padding: 0;
  list-style: none;
}

.summary ul li {
  margin-bottom: 0.5rem;
  color: #555;
  font-size: 0.9rem;
}

.summary .total {
  margin-top: 1.5rem;
}

.summary .total p {
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.payment-form {
  flex: 1;
  background: #fff;
  box-shadow: -5px 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
}

.payment-form .content {
  max-width: 350px;
  width: 100%;
}

.payment-form h2 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
}

.payment-form h3 {
  margin: 1.5rem 0 1rem;
  font-size: 1.2rem;
  color: #333;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: #333;
}

.form-group input {
  width: 100%;
  padding: 0.7rem;
  font-size: 0.9rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.terms {
  margin: 1.5rem 0;
  font-size: 0.85rem;
  color: #555;
}

.terms a {
  color: #007bff;
}

.submit-button {
  background: #007bff;
  color: white;
  padding: 1rem;
  width: 100%;
  font-size: 1.1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.submit-button:hover {
  background: #0056b3;
}

.loading {
  display: flex;
  align-items: center;
  justify-content: center;
}

.spinner {
  border: 2px solid transparent;
  border-top: 2px solid #007bff;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
  margin-right: 10px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.success-message {
  color: #28a745;
}

.error-message {
  color: #dc3545;
}
</style>
