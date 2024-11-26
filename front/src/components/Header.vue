<script setup>

</script>

<template>
    <header class="site-header container">
      <div class="logo">
        <img src="@/assets/images/logo-simplificada.png" alt="Logo" />
      </div>
      <nav class="nav-buttons">
        <a href="#sobre" class="text-button">Sobre</a>
        <router-link to="/assinaturas" class="text-button">Assinaturas</router-link>
        <router-link to="/login" class="styled-button">Login</router-link>
      </nav>
    </header>
</template>

<style>
    .container {
        max-width: 1320px;
        margin: 0 auto;
    }

  .site-header {
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .logo img {
    height: 50px;
    width: 130px;  }
  
  .nav-buttons {
    display: flex;
    align-items: center;
    gap: 15px;
  }
  
  .text-button {
    margin-right: 14px;
    text-decoration: none;
    color: #333;
    font-size: 16px;
  }
  
  .styled-button {
    transition: 0.1s all linear;
    text-decoration: none;
    color: white;
    background-color: #004aad;
    padding: 10px 32px;
    border-radius: 10px;
    font-size: 16px;
  }
  .styled-button:hover {
    background-color: #003984;
  }
</style>