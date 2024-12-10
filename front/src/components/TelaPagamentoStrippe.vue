<script setup>
import { ref, onMounted } from "vue";
import { loadStripe } from "@stripe/stripe-js";
import Card from "primevue/card"

const stripe = ref(null);
const cardElement = ref(null);
const isProcessing = ref(false);
const errorMessage = ref("");

// Inicializar Stripe e os elementos do cartão
onMounted(async () => {
  stripe.value = await loadStripe("pk_test_51Q2MUS03TdZPkyxCD6Xwnv3ZLpw6MuKA4YwhzBbRNyXQ5DSgJC3OJIvuBOqLar7SZU80FvQ1RCSl9x1xBBj4dZxq009Oxs0XRd");

  const elements = stripe.value.elements();
  // Adicionando estilo ao elemento do cartão
  cardElement.value = elements.create("card", {
    style: {
      base: {
        color: "#32325d", // Cor do texto
        fontFamily: "Arial, sans-serif",
        fontSize: "16px", // Tamanho da fonte
        "::placeholder": {
          color: "#aab7c4", // Cor do texto de placeholder
        },
      },
      invalid: {
        color: "#fa755a", // Cor do texto em caso de erro
        iconColor: "#fa755a", // Cor do ícone em caso de erro
      },
    },
    hidePostalCode: false, // Opcional: oculta o campo de código postal
  });

  cardElement.value.mount("#card-element");
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
        card: cardElement.value,
      },
    });

    if (result.error) {
      // Exibir erros
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
  <div class="">
    <!-- Lado Esquerdo -->
    <div class="summary gap-8 h-screen">
      <Card class="w-26rem">
          <template #title>Credenciais</template>
          <template #content>
            <div class="flex flex-column">
              <form @submit.prevent="handlePayment">
                <!-- Div onde o elemento do cartão será montado -->
                <div id="card-element" class="card-input"></div>

                <!-- Botão para processar o pagamento -->
                <button :disabled="isProcessing" class="pay-button">
                  {{ isProcessing ? "Processando..." : "Pagar" }}
                </button>

                <!-- Mensagem de erro -->
                <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
              </form>
            </div>
          </template>
      </Card>

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
    <!-- <div class="payment-form">
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

          
        </form>
      </div>
    </div> -->
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
