<script setup>
import { ref } from 'vue';

const email = ref('');
const cardNumber = ref('');
const cardHolderName = ref('');
const expirationDate = ref('');
const cvv = ref('');
const billingAddress = ref('');
const acceptTerms = ref(false);
const isLoading = ref(false);
const paymentStatus = ref(''); // 'success', 'error', ''

const processPayment = async () => {
  if (!acceptTerms.value) {
    alert('Por favor, aceite os termos de uso.');
    return;
  }

  isLoading.value = true; // Inicia o estado de carregamento
  paymentStatus.value = ''; // Reseta status anterior

  setTimeout(() => {
    isLoading.value = false;
    const success = Math.random() > 0.3; // Simula 70% de chance de sucesso

    if (success) {
      paymentStatus.value = 'success';
      alert('Pagamento realizado com sucesso!');
    } else {
      paymentStatus.value = 'error';
      alert('Ocorreu um erro ao processar o pagamento.');
    }
  }, 2000); // Simula o tempo de espera para processamento
};

const formatCardNumber = (value) => {
  return value.replace(/\D/g, '') // Remove qualquer coisa que não seja número
    .replace(/(\d{4})(\d)/, '$1 $2') // Adiciona espaço após 4 números
    .replace(/(\d{4})(\d{4})(\d)/, '$1 $2 $3') // Adiciona espaço após 8 números
    .replace(/(\d{4})(\d{4})(\d{4})(\d)/, '$1 $2 $3 $4') // Adiciona espaço após 12 números
    .substring(0, 19); // Limita a 16 dígitos e 3 espaços
};

const formatExpirationDate = (value) => {
  return value.replace(/\D/g, '') // Remove qualquer coisa que não seja número
    .replace(/(\d{2})(\d)/, '$1/$2') // Formata com barra
    .substring(0, 5); // Limita a 5 caracteres (MM/AA)
};

// Atualizando os valores com a formatação diretamente
const handleCardNumberInput = (event) => {
  cardNumber.value = formatCardNumber(event.target.value);
};

const handleExpirationDateInput = (event) => {
  expirationDate.value = formatExpirationDate(event.target.value);
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

        <form @submit.prevent="processPayment">
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
            <div class="form-group">
              <label for="card-number">Número do Cartão</label>
              <input
                id="card-number"
                type="text"
                :value="cardNumber"
                @input="handleCardNumberInput"
                maxlength="19" 
                placeholder="1234 1234 1234 1234"
                required
              />
            </div>
            <div class="form-group">
              <label for="card-holder-name">Nome no Cartão</label>
              <input id="card-holder-name" type="text" v-model="cardHolderName" placeholder="João Silva" required />
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="expiration-date">Validade</label>
                <input
                  id="expiration-date"
                  type="text"
                  :value="expirationDate"
                  @input="handleExpirationDateInput"
                  maxlength="5"
                  placeholder="MM/AA"
                  required
                />
              </div>
              <div class="form-group">
                <label for="cvv">CVV</label>
                <input id="cvv" type="text" v-model="cvv" maxlength="3" placeholder="123" required />
              </div>
            </div>
            <div class="form-group">
              <label for="billing-address">Endereço de Cobrança</label>
              <input
                id="billing-address"
                type="text"
                v-model="billingAddress"
                placeholder="Digite seu endereço"
                required
              />
            </div>
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

.form-row {
  display: flex;
  gap: 1rem;
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
