<script setup>
import { ref, onMounted } from "vue";
import { loadStripe } from "@stripe/stripe-js";
import Card from "primevue/card";
import { useRouter } from 'vue-router';

const stripe = ref(null);
const cardElement = ref(null);
const isProcessing = ref(false);
const errorMessage = ref("");
const router = useRouter();

// Inicializar Stripe e os elementos do cartão
onMounted(async () => {
  stripe.value = await loadStripe("pk_test_51Q2MUS03TdZPkyxCD6Xwnv3ZLpw6MuKA4YwhzBbRNyXQ5DSgJC3OJIvuBOqLar7SZU80FvQ1RCSl9x1xBBj4dZxq009Oxs0XRd");

  const elements = stripe.value.elements();
  cardElement.value = elements.create("card", {
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
    hidePostalCode: false,
  });

  cardElement.value.mount("#card-element");
});

const handlePayment = async () => {
  isProcessing.value = true;
  try {
    const response = await fetch("http://localhost:3000/stripe/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: 5, 
        currency: "brl",
      }),
    });

    const { clientSecret } = await response.json();

    const result = await stripe.value.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement.value,
      },
    });

    if (result.error) {
      errorMessage.value = result.error.message;
    } else if (result.paymentIntent && result.paymentIntent.status === "succeeded") {
      alert("Pagamento realizado com sucesso!");
      router.push('/');
    }
  } catch (error) {
    errorMessage.value = "Erro ao processar o pagamento.";
  } finally {
    isProcessing.value = false;
  }
};
</script>

<template>
  <div class="payment-container">
    <router-link to="/planos"> 
      <button class="back-button"><i class="pi pi-arrow-circle-left azul icones-hover cursor-pointer"
        style="font-size: 1.2rem;"></i></button>
    </router-link>
    <div class="card-section">
      <Card class="payment-card">
        <template #title>Pagamento Seguro<br> - <span style="font-size: 1.2rem;">Cartão de crédito</span></template>
        <template #content>
          <form @submit.prevent="handlePayment">
            <div id="card-element" class="card-input"></div>
            <button :disabled="isProcessing" class="pay-button">
              {{ isProcessing ? "Processando..." : "Confirmar pagamento: R$5,00" }}
            </button>
            <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
          </form>
        </template>
      </Card>
    </div>

    <div class="summary-section">
      <img class="logo" src="@/assets/images/logo-simplificada.png" alt="Logo" />
      <h2>Assinatura Viaja-AI</h2>
      <p class="price">R$5,00 por mês</p>
      <ul>
        <li>Planejamento inteligente de viagens</li>
        <li>Acesso ilimitado</li>
      </ul>
      <div class="total">
        <p>Subtotal: <span>R$5,00</span></p>
        <p>Taxa: <span>R$0,00</span></p>
        <hr />
        <p>Total: <strong>R$5,00</strong></p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.payment-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #d1d8e0, #1e3799);
  gap: 2rem;
  position: relative;
}

.back-button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
  position: absolute;
  top: 20px;
  left: 20px;
}

.back-button:hover {
  background-color: #0062cc;
}

.card-section {
  flex: 1;
  min-width: 300px;
  max-width: 400px;
}

.payment-card {
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  background: white;
}

.summary-section {
  flex: 1;
  min-width: 300px;
  max-width: 400px;
  text-align: center;
  background: white;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}

.logo {
  width: 150px;
  height: 60px;
  margin-bottom: 1rem;
}

h2 {
  font-size: 1.5rem;
  color: #32325d;
  margin-bottom: 1rem;
}

.price {
  font-size: 1.25rem;
  font-weight: bold;
  color: #007bff;
}

ul {
  list-style: none;
  padding: 0;
  margin: 1rem 0;
  color: #555;
}

li {
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
}

.total {
  margin-top: 1.5rem;
  font-size: 1rem;
}

.total span {
  font-weight: bold;
}

.card-input {
  border: 1px solid #ccc;
  padding: 0.8rem;
  border-radius: 5px;
  margin-bottom: 1rem;
  background: #f7f7f7;
}

.pay-button {
  display: block;
  width: 100%;
  padding: 0.8rem;
  font-size: 1rem;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all linear 0.1s;
}

.pay-button:hover {
  background-color: #0056b3;
}

.pay-button:disabled {
  background-color: #999;
  cursor: not-allowed;
}

.error-message {
  color: #fa755a;
  font-size: 0.9rem;
  text-align: center;
  margin-top: 0.5rem;
}
</style>
