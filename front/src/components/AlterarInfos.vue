<template>
    <div class="container">
      <div class="card">
        <div class="card-header">
          <img src="@/assets/images/logo-simplificada.png" style="width: 150px; height: 60px"/>
          <h2 style="color: #444">Editar Informações</h2>
          
        </div>
        <div class="card-body">
          <form @submit.prevent="updateUser">
            <div class="form-row">
              <div class="form-group">
                <label for="name">Nome</label>
                <input id="name" type="text" v-model="form.name" placeholder="Digite seu nome completo" />
              </div>
  
              <div class="form-group">
                <label for="email">E-mail</label>
                <input id="email" type="email" v-model="form.email" :class="{ 'is-invalid': errors.email }" readonly />
                <span v-if="errors.email" class="error">{{ errors.email }}</span>
              </div>
            </div>
  
            <div class="form-group">
              <label for="oldPassword">Senha atual</label>
              <input id="oldPassword" type="password" v-model="form.oldPassword" :class="{ 'is-invalid': errors.oldPassword }" placeholder="Digite sua senha atual" />
              <span v-if="errors.oldPassword" class="error">{{ errors.oldPassword }}</span>
            </div>
  
            <div class="form-group">
              <label for="newPassword">Nova senha</label>
              <input id="newPassword" type="password" v-model="form.newPassword" :class="{ 'is-invalid': errors.newPassword }" placeholder="Digite a nova senha" />
              <span v-if="errors.newPassword" class="error">{{ errors.newPassword }}</span>
            </div>
  
            <div class="form-group">
              <label for="confirmPassword">Confirmar nova senha</label>
              <input id="confirmPassword" type="password" v-model="form.confirmPassword" :class="{ 'is-invalid': errors.confirmPassword }" placeholder="Confirme a nova senha" />
              <span v-if="errors.confirmPassword" class="error">{{ errors.confirmPassword }}</span>
            </div>
  
            <button type="submit" class="btn-save mt-4">Salvar alterações</button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from "vue";
  
  export default {
      name: "EditUserCard",
      setup() {
          const form = ref({
              name: "",
              email: "",
              oldPassword: "",
              newPassword: "",
              confirmPassword: "",
          });
  
          const errors = ref({});
  
          const validateForm = () => {
              errors.value = {};
              if (!form.value.email) {
                  errors.value.email = "O e-mail é obrigatório.";
              } else if (!/\S+@\S+\.\S+/.test(form.value.email)) {
                  errors.value.email = "E-mail inválido.";
              }
              if (!form.value.oldPassword) {
                  errors.value.oldPassword = "A senha antiga é obrigatória.";
              }
              if (!form.value.newPassword) {
                  errors.value.newPassword = "A nova senha é obrigatória.";
              }
              if (form.value.newPassword !== form.value.confirmPassword) {
                  errors.value.confirmPassword = "As senhas não correspondem.";
              }
              return Object.keys(errors.value).length === 0;
          };
  
          const updateUser = () => {
              if (validateForm()) {
                  console.log("Informações salvas:", form.value);
                  alert("Informações atualizadas com sucesso!");
              }
          };
  
          return { form, errors, updateUser };
      },
  };
  </script>
  
  <style scoped>
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #e6f7ff; /* Cor suave de fundo, remetendo ao conceito de viagens */
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
    border-radius: 12px;
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
    transition: 0.1s all linear;
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
  
  .backgroundimage {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-image: url("@/assets/images/background-montanha-azul.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    padding: 16px;
    box-sizing: border-box;
  }
  </style>
  