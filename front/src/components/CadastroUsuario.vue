<script setup>

</script>

<template>
  <div class="background">
    <div class="container">
      <h1>viaja aí</h1>
      <form>
        <div class="form-group">
          <label for="email">E-mail ou Telefone</label>
          <input type="text" id="email" required />
        </div>
        <div class="form-group">
          <label for="password">Senha</label>
          <input type="password" id="password" required />
        </div>
        <div class="form-group">
          <a href="#">Esqueceu sua senha?</a>
        </div>
        <div class="form-group">
        <button type="submit">Login</button>
        </div>
      </form>
      <div class="social-login form-group">
        <a>Login com Google</a>
        <a>Login com Facebook</a>
        <a>Login com Apple</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.background {
  box-sizing: border-box;
  background-image: url("../../public/Images/backgroundCadastro.jpg");
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  width: 35%;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 20px;
  border-radius: 10px;
  text-align: left;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  align-items: center;
}

label {
  text-align: center;
  width: 100%;
  margin-bottom: 5px;
}

input {
  width: 80%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: #dddddd;
}

.social-login {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

button {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  width: 80%;
}
</style>
