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

  // Criar e montar os elementos do cartão
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
    const response = await fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: 2000, // Valor em centavos ($20,00)
        currency: "usd",
      }),
    });

    const { clientSecret } = await response.json();

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
      errorMessage.value = result.error.message;
    } else if (result.paymentIntent && result.paymentIntent.status === "succeeded") {
      alert("Pagamento realizado com sucesso!");
    }
  } catch (error) {
    errorMessage.value = "Erro ao processar o pagamento.";
  } finally {
    isProcessing.value = false;
  }
};
</script>

<template>
  <div class="page-background">
    <div class="payment-container">
      <div class="credentials-card">
        <h3>Pagamento com Cartão</h3>
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

      <div class="summary">
        <img class="logo" src="@/assets/images/logo-simplificada.png" />
        <h2>Assinatura Viaja-AI</h2>
        <p><strong>R$49,90</strong> por mês</p>
        <ul>
          <li>Planejamento inteligente de viagens</li>
        </ul>
        <div class="total">
          <p>Subtotal: <span>R$49,90</span></p>
          <p>Taxa: <span>R$0,00</span></p>
          <hr />
          <p>Total hoje: <strong>R$49,90</strong></p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-background {
  background: linear-gradient(135deg, #7bc4ff, #156fff);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.payment-container {
  display: flex;
  justify-content: center;
  gap: 40px;
  max-width: 1200px;
  width: 100%;
  flex-wrap: wrap;
}

.credentials-card,
.summary {
  flex: 1;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  max-width: 500px;
  min-width: 300px;
}

.credentials-card h3 {
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: #333;
}

.credentials-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.stripe-input {
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
  font-size: 16px;
}

.pay-button {
  padding: 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: 0.1s all linear;
}

.pay-button:hover {
  background-color: #006ce0;
}

.pay-button:disabled {
  background-color: #b8d8ff;
}

.error-message {
  color: #e74c3c;
  text-align: center;
  font-size: 0.9rem;
  margin-top: 15px;
}

.summary .logo {
  max-width: 180px;
  max-height: 80px;
  margin-bottom: 25px;
}

.summary h2 {
  font-size: 2rem;
  margin-bottom: 20px;
  text-align: center;
  color: #333;
}

.summary ul {
  list-style: none;
  padding-left: 0;
}

.summary ul li {
  font-size: 1rem;
  margin-bottom: 10px;
}

.total {
  margin-top: 20px;
  text-align: center;
}

.total p {
  font-size: 1.2rem;
  margin-bottom: 10px;
}

@media (max-width: 768px) {
  .payment-container {
    flex-direction: column;
    padding: 20px;
  }

  .credentials-card,
  .summary {
    max-width: 100%;
  }

  .pay-button {
    padding: 12px;
    font-size: 1rem;
  }
}
</style>
