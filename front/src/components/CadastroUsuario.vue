<script>
export default {
  name: 'CadastroUsuario',
  data() {
    return {
      email: '',
      password: ''
    }
  }
}
</script>

<template>
  <div class="background">
    <div class="container">
      <h1>viaja aí</h1>
      <form>
        <div class="flex flex-row">
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
        </div>
        <button type="submit">Login</button>
      </form>
      <div class="social-login flex-row justify-content-center align-items-center">
        <a >Login com Google</a>
        <a >Login com Facebook</a>
        <a >Login com Apple</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.background {
  background-image: url("../../public/Images/backgroundCadastro.jpg");
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  width: 50%;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 20px;
  border-radius: 10px;
}

.form-group {
  margin-bottom: 15px;
}

.social-login {
  margin-top: 20px;
  flex-direction: column;
  gap: 10px;
}

button {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
}
</style>