<script setup>
import Header from '@/components/Header.vue'; // Importação do componente
</script>

<template>
  <Header />

  <div class="main-container">
    <div class="image-container flex">
      <div class="main-text-area">
        <h1 class="overlay-main-text">Descubra seu próximo destino com facilidade!</h1>
        <p class="overlay-text">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, maxime? Possimus quod
          incidunt odit eligendi iure repellat eum officiis reprehenderit officia expedita cumque,
          labore, voluptatem repudiandae accusantium culpa dolor architecto.
        </p>
        <div class="btn-test">
          <span>Teste agora</span>
        </div>
      </div>
      <div class="main-card-area flex justify-content-center align-items-center">
        <div class="card"></div>
      </div>
    </div>
  </div>
</template>

<style>
  .container {
    max-width: 1320px;
    margin: 0 auto;
  }

  body {
    margin: 0;
    font-family: Arial, sans-serif;
  }

  .main-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin-top: -4rem;
  }

  .image-container {
    padding: 1.5rem;
    width: 90%;
    height: 80%;
    border-radius: 15px;
    background: url('@/assets/images/background-montanha-azul.png');
    position: relative;
  }

  .main-text-area {
    padding: 1.2rem;
    width: 60%;
    display: flex;
    flex-direction: column;
  }

  .overlay-main-text {
    color: white;
    font-size: 3.5rem;
    text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.7);
  }

  .overlay-text {
    color: white;
    font-size: 1.2rem;
    text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.7);
  }

  .main-card-area {
    width: 40%;
  }

  .card {
    width: 325px;
    height: 500px;
    border-radius: 13px;
    background-color: #000;
  }

  .btn-test {
    cursor: pointer;
    transition: 0.1s all linear;
    padding: 12px 25px;
    max-width: 150px;
    background-color: #eeeeee;
    border-radius: 6px;
    font-size: 16px;
    margin: 2rem 0rem;
    text-align: center;
  }

  .btn-test:hover {
    background-color: #cbcbcb;
  }
</style>
