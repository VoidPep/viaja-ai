<template>
    <div class="payment-container">
      <div class="payment-form">
        <!-- Logo -->
        <div class="logo-container">
            <img src="../assets/images/viaja_ai_logo.png" alt="Logo Viaja Ai" />
        </div>
  
        <!-- Título -->
        <h1>Pagamento</h1>
  
        <!-- Accordion -->
        <div class="accordion">
          <!-- Accordion Item para Cartão de Crédito -->
          <div class="accordion-item">
            <div class="accordion-header" @click="toggleAccordion('cartao')">
              <h2>Cartão de Crédito</h2>
            </div>
            <div v-if="activeAccordion === 'cartao'" class="accordion-body">
              <form @submit.prevent="handleSubmit">
                <div class="form-group">
                  <label for="cardNumber">Número do Cartão</label>
                  <input
                    type="text"
                    id="cardNumber"
                    v-model="cardInfo.cardNumber"
                    placeholder="Digite o número do cartão"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="expiryDate">Data de Validade</label>
                  <input
                    type="text"
                    id="expiryDate"
                    v-model="cardInfo.expiryDate"
                    placeholder="MM/AA"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="cvv">Código de Segurança (CVV)</label>
                  <input
                    type="text"
                    id="cvv"
                    v-model="cardInfo.cvv"
                    placeholder="Digite o CVV"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="cardHolder">Nome do Titular</label>
                  <input
                    type="text"
                    id="cardHolder"
                    v-model="cardInfo.cardHolder"
                    placeholder="Nome como no cartão"
                    required
                  />
                </div>
                <button type="submit" class="pay-button">Pagar</button>
              </form>
            </div>
          </div>
  
          <!-- Accordion Item para Pix -->
          <div class="accordion-item">
            <div class="accordion-header" @click="toggleAccordion('pix')">
              <h2>Pix</h2>
            </div>
            <div v-if="activeAccordion === 'pix'" class="accordion-body">
              <p>Conteúdo para pagamento via Pix</p>
              <!-- Adicione aqui as instruções ou campos de pagamento do Pix -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from "vue";
  
  export default {
    name: "PaymentPage",
    setup() {
      const activeAccordion = ref(null);
      const cardInfo = ref({
        cardNumber: "",
        expiryDate: "",
        cvv: "",
        cardHolder: "",
      });
  
      const toggleAccordion = (tab) => {
        activeAccordion.value = activeAccordion.value === tab ? null : tab;
      };
  
      const handleSubmit = () => {
        console.log("Dados do pagamento com cartão:", cardInfo.value);
      };
  
      return {
        activeAccordion,
        toggleAccordion,
        cardInfo,
        handleSubmit,
      };
    },
  };
  </script>
  
  <style scoped>
  .payment-container {
    background: linear-gradient(
      180deg,
      #004b87,
      #0075a6
    ); /* Degradê entre azul escuro e claro */
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .payment-form {
    background: #fff;
    padding: 30px;
    border-radius: 12px;
    width: 90%;
    max-width: 600px;
    text-align: center;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  .logo-container {
    margin-bottom: 20px;
  }
  
  .logo {
    width: 250px;
    margin-bottom: 20px;
  }
  
  h1 {
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    font-size: 36px;
    font-weight: 700;
    color: #333;
    margin-bottom: 20px;
  }
  
  .accordion {
    width: 100%;
  }
  
  .accordion-item {
    margin-bottom: 15px;
  }
  
  .accordion-header {
    padding: 15px;
    background-color: #e1e1e1;
    border: 1px solid #ddd;
    border-radius: 8px;
    cursor: pointer;
    text-align: left;
    font-weight: bold;
    font-family: "Arial", sans-serif;
    transition: background-color 0.3s;
  }
  
  .accordion-header:hover {
    background-color: #d3d3d3;
  }
  
  .accordion-body {
    padding: 20px;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-top: none;
    border-radius: 8px;
  }
  
  .form-group {
    margin-bottom: 15px;
    text-align: left;
  }
  
  label {
    display: block;
    font-size: 16px;
    margin-bottom: 5px;
    font-family: "Arial", sans-serif;
  }
  
  input {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .pay-button {
    padding: 12px 30px;
    background-color: #4a90e2;
    color: white;
    font-size: 18px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    width: 100%;
    margin-top: 20px;
    transition: background-color 0.3s;
  }
  
  .pay-button:hover {
    background-color: #357ab7;
  }
  </style>
  