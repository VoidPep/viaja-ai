<script setup>
import { ref, onMounted } from "vue";
import { loadStripe } from "@stripe/stripe-js";

const stripe = ref(null);
const cardNumberElement = ref(null);
const cardExpiryElement = ref(null);
const cardCvcElement = ref(null);
const isProcessing = ref(false);
const errorMessage = ref("");

// Inicializar Stripe e os elementos do cartão
onMounted(async () => {
  stripe.value = await loadStripe("pk_test_51Q2MUS03TdZPkyxCD6Xwnv3ZLpw6MuKA4YwhzBbRNyXQ5DSgJC3OJIvuBOqLar7SZU80FvQ1RCSl9x1xBBj4dZxq009Oxs0XRd");

  const elements = stripe.value.elements();

  // Criar e montar o elemento do número do cartão
  cardNumberElement.value = elements.create("cardNumber", {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSize: "16px",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  });
  cardNumberElement.value.mount("#card-number-element");

  // Criar e montar o elemento de validade
  cardExpiryElement.value = elements.create("cardExpiry", {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSize: "16px",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  });
  cardExpiryElement.value.mount("#card-expiry-element");

  // Criar e montar o elemento de CVC
  cardCvcElement.value = elements.create("cardCvc", {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSize: "16px",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  });
  cardCvcElement.value.mount("#card-cvc-element");
});

// Função para processar o pagamento
const handlePayment = async () => {
  isProcessing.value = true;

  try {
    // Chamar o back-end para criar o PaymentIntent
    const response = await fetch("http://localhost:3000/stripe/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: 2000, // Valor em centavos ($20,00)
        currency: "usd",
      }),
    });

    const { clientSecret } = await response.json();

    // Confirmar o pagamento
    const result = await stripe.value.confirmCardPayment(clientSecret, {
      payment_method: {
        card: {
          number: cardNumberElement.value,
          expiry: cardExpiryElement.value,
          cvc: cardCvcElement.value,
        },
      },
    });

  if (result.error) {
      // Exibir erros no console ou para o usuário
      console.error("Erro no pagamento:", result.error.message);
      errorMessage.value = result.error.message;
    } else if (result.paymentIntent && result.paymentIntent.status === "succeeded") {
      // Pagamento foi concluído com sucesso
      alert("Pagamento realizado com sucesso!");
    }
  } catch (error) {
    // Erro genérico ao processar a requisição
    console.error("Erro ao processar o pagamento:", error);
    errorMessage.value = "Erro ao processar o pagamento.";
  } finally {
    isProcessing.value = false;
  }
}
</script>

<template>
  <div class="payment-container">
    <!-- Credenciais (Com Card) -->
    <div class="credentials-card">
      <h3>Credenciais</h3>
      <form @submit.prevent="handlePayment" class="credentials-form">
        <div id="card-number-element" class="stripe-input"></div>
        <div id="card-expiry-element" class="stripe-input"></div>
        <div id="card-cvc-element" class="stripe-input"></div>
        <button :disabled="isProcessing" class="pay-button">
          {{ isProcessing ? "Processando..." : "Pagar" }}
        </button>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </form>
    </div>

    <!-- Assinatura (Sem Card) -->
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
</template>




<style scoped>
.payment-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px; /* Espaçamento entre as colunas */
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto; /* Centraliza o container na tela */
}

.credentials-card {
  flex: 1;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.credentials-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.stripe-input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #ffffff;
}

.summary {
  flex: 1;
  background: #f0f1f5;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
}

.content {
  flex: 1;
  padding: 20px;
}

.logo {
  display: block;
  max-width: 100%;
  margin-bottom: 20px;
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

.payment-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background: #fff;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.5rem;
}

.card-input {
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 20px;
}

.pay-button {
  display: block;
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.pay-button:disabled {
  background-color: #999;
  cursor: not-allowed;
}

.error-message {
  color: #fa755a;
  text-align: center;
  margin-top: 10px;
}

.gap-8 {
    gap: 9rem !important;
}
</style>
