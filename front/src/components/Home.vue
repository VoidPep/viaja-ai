<script setup>
import Header from '@/components/Header.vue'; 
import Footer from '@/components/Footer.vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css'; 
</script>

<template>
  <Header />

  <div class="main-container">
    <div class="image-container flex">
      <div class="main-text-area col-7">
        <h1 class="overlay-main-text">Descubra seu próximo destino com facilidade!</h1>
        <p class="overlay-text">
          Planejar suas viagens nunca foi tão fácil e acessível! Com o Viaja-AI,
          você elimina a necessidade de contratar agentes caros e tem acesso a um planejamento completo e personalizado em poucos cliques.
          Escolha seu destino, veja opções incríveis dentro do seu orçamento e aproveite cada momento sem complicações.
        </p>
        <div class="btn-test">
          <span>Teste agora</span>
        </div>
      </div>

      <div class="main-card-area flex justify-content-center align-items-center col-5">
        <!-- Swiper Slider -->
        <Swiper
          :slidesPerView="1" 
          :spaceBetween="50" 
          loop
          autoplay
          @swiper="onSwiper" 
          @slideChange="onSlideChange"
          :navigation="{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }"
        >
          <SwiperSlide>
            <div class="card"></div>
          </SwiperSlide>
          <SwiperSlide>
            <div class="card"></div>
          </SwiperSlide>
          <SwiperSlide>
            <div class="card"></div>
          </SwiperSlide>
        </Swiper>
        
        <!-- Botões de navegação -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
      </div>
    </div>
  </div>
  <div class="info-container container" id="sobre">
    <div class="info-text">
      <h2>Viaje de forma inteligente e sem stress</h2>
      <p>Com o <strong>Viaja-AI</strong>, sua experiência de viagem se torna mais simples e personalizada do que nunca! Com a ajuda de nossa tecnologia avançada, você terá acesso a recomendações de destinos, acomodações, transporte e atividades totalmente alinhadas aos seus interesses e orçamento.</p>
      <p>Esqueça as horas gastas pesquisando e comparando opções. Nosso sistema faz tudo por você, criando itinerários que atendem aos seus desejos e necessidades. Seja para uma viagem relaxante, uma aventura cheia de ação ou um refúgio romântico, nós temos tudo o que você precisa, na palma da sua mão!</p>
      <h3>Por que escolher o Viaja-AI?</h3>
      <ul>
        <li><strong>Personalização única:</strong> Viaje de acordo com seus gostos e preferências, sem esforço.</li>
        <li><strong>Orçamento transparente:</strong> Tenha o controle total sobre os custos da sua viagem, desde o transporte até os passeios.</li>
        <li><strong>Variedade de opções:</strong> Oferecemos destinos e atividades para todos os estilos, do mais tranquilo ao mais ousado.</li>
        <li><strong>Comodidade e praticidade:</strong> Todo o planejamento em um só lugar, com facilidade para você aproveitar o que importa: a viagem!</li>
      </ul>
      <p>Já imaginou fazer uma viagem perfeita, sem precisar se preocupar com cada detalhe? Com o Viaja-AI, isso é possível! Teste nosso sistema e descubra o quanto a sua próxima viagem pode ser mais simples e divertida.</p>
    </div>

    <div class="info-image">
      <img src="@/assets/images/img-sobreHome.png" alt="Viaje com o Viaja-AI" />
    </div>
  </div>

  <Footer />

</template>

<style>
  @import url('https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.css');

  html {
    scroll-behavior: smooth;
  }
  
  body {
    margin: 0;
    font-family: Arial, sans-serif;
    overflow-x: hidden; 
  }

  .container {
    max-width: 1320px;
    margin: 0 auto;
  }

  header {
    position: relative;
    z-index: 10;
    background-color: white;
  }

  .main-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .image-container {
    padding: 1.5rem;
    width: 90%;
    height: 80%;
    border-radius: 15px;
    background: url('@/assets/images/background-mainHome.png');
    background-position: bottom;
    background-size: cover;
    position: relative;
    z-index: 1;
    display: flex;
    flex-wrap: wrap;
  }

  .main-text-area {
    padding: 1.2rem;
    display: flex;
    flex-direction: column;
    width: 60%;
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

  .card {
    margin: 0 auto;
    width: 300px;
    height: 400px;
    border-radius: 13px;
    background-color: #000;
  }

  .main-card-area {
    position: relative; 
    width: 40%;
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

  .swiper-button-next,
  .swiper-button-prev {
    color: white; 
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
  }

  .swiper-button-next:after,
  .swiper-button-prev:after {
    font-size: 20px;
    font-weight: bold;
  }

  .swiper-button-next {
    right: 10px;
  }

  .swiper-button-prev {
    left: 10px;
  }

   .info-container {
    display: flex;
    justify-content: space-between;
    margin-top: 3rem;
    padding: 2rem;
    background-color: #f4f4f4; 
    border-radius: 15px;
  }

  .info-text {
    width: 50%;
    font-size: 1.2rem;
  }

  .info-text h2 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: #333;
  }

  .info-text ul {
    list-style: none;
    padding: 0;
  }

  .info-text li {
    margin: 10px 0;
    font-size: 1.1rem;
  }

  .info-image {
    width: 45%;
    text-align: center;
  }

  .info-image img {
    max-width: 100%;
    border-radius: 10px;
  }

  /* ----------- Responsividade ----------- */
  @media (max-width: 768px) {
    .image-container {
      flex-direction: column;
      height: auto;
    }

    .main-text-area {
      width: 100%;
      padding: 1rem;
      text-align: center;
    }

    .overlay-main-text {
      font-size: 2rem;
    }

    .overlay-text {
      font-size: 1rem;
    }

    .main-card-area {
      width: 100%;
      display: flex;
      justify-content: center;
      padding: 1rem 0;
    }

    .card {
      width: 80%;
      height: 300px;
    }

    .btn-test {
      margin: auto;
    }

    .info-container {
      flex-direction: column;
      text-align: center;
    }

    .info-text {
      width: 100%;
      margin-bottom: 2rem;
    }

    .info-image {
      width: 100%;
    }
  }

  @media (max-width: 480px) {
    .overlay-main-text {
      font-size: 1.8rem;
    }

    .btn-test {
      font-size: 14px;
      padding: 10px 20px;
    }
  }

  
</style>
