<template>
    <div class="container">
      <div class="card">
        <div class="card-header">
          <img src="@/assets/images/logo-simplificada.png" style="width: 150px; height: 60px"/>
          <h2 style="color: #444">Gerenciar Cartões de Crédito</h2>
        </div>
        <div class="card-body">
          <!-- Formulário de Adicionar Cartão -->
          <form @submit.prevent="addCard">
            <div class="form-row">
              <div class="form-group">
                <label for="cardholderName">Nome do Titular</label>
                <input
                  id="cardholderName"
                  type="text"
                  v-model="form.cardholderName"
                  placeholder="Digite o nome do titular"
                />
              </div>
  
              <div class="form-group">
                <label for="cardNumber">Número do Cartão</label>
                <input
                  id="cardNumber"
                  type="text"
                  v-model="form.cardNumber"
                  placeholder="Digite o número do cartão"
                  maxlength="16"
                />
              </div>
            </div>
  
            <div class="form-row">
              <div class="form-group">
                <label for="expiryDate">Data de Vencimento</label>
                <input
                  id="expiryDate"
                  type="month"
                  v-model="form.expiryDate"
                  placeholder="MM/AAAA"
                />
              </div>
  
              <div class="form-group">
                <label for="cvv">CVV</label>
                <input
                  id="cvv"
                  type="text"
                  v-model="form.cvv"
                  placeholder="Código de segurança"
                  maxlength="3"
                />
              </div>
            </div>
  
            <button type="submit" class="btn-save">Adicionar Cartão</button>
          </form>
  
          <hr />
  
          <!-- Lista de Cartões Salvos -->
          <div v-if="savedCards.length > 0">
            <h3>Cartões Salvos</h3>
            <ul class="card-list">
              <li v-for="(card, index) in savedCards" :key="index" class="card-item">
                <div class="card-info">
                  <span class="card-name">{{ card.cardholderName }}</span>
                  <span class="card-number">{{ maskCardNumber(card.cardNumber) }}</span>
                  <span class="card-expiry">{{ card.expiryDate }}</span>
                </div>
                <div class="card-actions">
                  <button @click="removeCard(index)" class="btn-remove">Remover</button>
                </div>
              </li>
            </ul>
          </div>
          <div v-else>
            <p>Você ainda não possui cartões salvos.</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from "vue";
  
  export default {
    name: "ManageCards",
    setup() {
      const form = ref({
        cardholderName: "",
        cardNumber: "",
        expiryDate: "",
        cvv: "",
      });
  
      const savedCards = ref([
        // Cartões salvos simulados
        {
          cardholderName: "João Silva",
          cardNumber: "1234567812345678",
          expiryDate: "12/2025",
          cvv: "123",
        },
      ]);
  
      const addCard = () => {
        if (form.value.cardholderName && form.value.cardNumber && form.value.expiryDate && form.value.cvv) {
          savedCards.value.push({ ...form.value });
          form.value.cardholderName = "";
          form.value.cardNumber = "";
          form.value.expiryDate = "";
          form.value.cvv = "";
          alert("Cartão adicionado com sucesso!");
        } else {
          alert("Por favor, preencha todos os campos.");
        }
      };
  
      const removeCard = (index) => {
        savedCards.value.splice(index, 1);
        alert("Cartão removido com sucesso!");
      };
  
      const maskCardNumber = (cardNumber) => {
        return cardNumber.replace(/.(?=.{4})/g, "*");
      };
  
      return {
        form,
        savedCards,
        addCard,
        removeCard,
        maskCardNumber,
      };
    },
  };
  </script>
  
  <style scoped>
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f1f7fc; /* Cor suave para o fundo */
    padding: 16px;
    box-sizing: border-box;
  }
  
  .card {
    max-width: 600px;
    width: 100%;
    border: 1px solid #ddd;
    border-radius: 10px;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    padding: 20px;
  }
  
  .card-header {
    padding: 16px;
    border-bottom: 1px solid #ddd;
    background-color: #ebebeb;
    color: white;
    text-align: center;
  }
  
  .card-header h2 {
    margin: 0;
    font-size: 1.5rem;
  }
  
  .card-subtitle {
    font-size: 1rem;
    color: #cce5ff;
    margin-top: 5px;
  }
  
  .card-body {
    padding: 24px;
  }
  
  .form-row {
    display: flex;
    gap: 24px;
    margin-bottom: 16px;
  }
  
  .form-group {
    flex: 1;
    margin-bottom: 16px;
  }
  
  input {
    width: 100%;
    padding: 10px;
    margin-top: 4px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-sizing: border-box;
    font-size: 1rem;
    background-color: #f9f9f9;
  }
  
  input[readonly] {
    background-color: #f0f0f0;
    cursor: not-allowed;
  }
  
  input.is-invalid {
    border-color: #dc3545;
    background-color: #fff5f5;
  }
  
  .error {
    color: #dc3545;
    font-size: 0.875rem;
  }
  
  .btn-save {
    display: block;
    width: 100%;
    padding: 12px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    text-align: center;
    font-size: 1rem;
    margin-top: 16px;
  }
  
  .btn-save:hover {
    background-color: #0056b3;
  }
  
  .card-list {
    list-style: none;
    padding: 0;
  }
  
  .card-item {
    display: flex;
    justify-content: space-between;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 8px;
    margin-bottom: 12px;
    background-color: #f9f9f9;
  }
  
  .card-info {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  
  .card-name {
    font-weight: bold;
  }
  
  .card-number {
    font-size: 0.875rem;
    color: #6c757d;
  }
  
  .card-expiry {
    font-size: 0.875rem;
    color: #6c757d;
  }
  
  .card-actions {
    display: flex;
    align-items: center;
  }
  
  .btn-remove {
    background-color: #dc3545;
    color: white;
    border: none;
    padding: 6px 12px;
    border-radius: 8px;
    cursor: pointer;
  }
  
  .btn-remove:hover {
    background-color: #c82333;
  }
  </style>
  