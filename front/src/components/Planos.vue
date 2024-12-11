<template>
  <div class="plans-container">
    <router-link to="/home">
      <button class="back-button"><i class="pi pi-arrow-circle-left azul icones-hover cursor-pointer"
        style="font-size: 1.2rem;"></i></button>
    </router-link>
    
    <h1 class="title">Escolha o seu Plano</h1>
    <div class="plans">
      <div class="plan-card">
        <div class="plan-header">
          <h2>Gratuito</h2>
          <p class="price">R$ 0,00</p>
        </div>
        <p>Plano gratuito para usuários casuais</p>
        <ul>
          <li>Limite de viagens geradas</li>
          <li>Visualização das 5 últimas viagens geradas</li>
        </ul>
        <router-link to="/" class="plan-btn">Continuar com o gratuito</router-link>
      </div>

      <div class="plan-card featured">
        <div class="plan-header">
          <h2>Ilimitado</h2>
          <p class="price">R$ 5,00<span style="font-size: 1.2rem;">/mês</span></p>
          <span class="badge">#Recomendado</span>
        </div>
        <p>Para aqueles que realmente gostam de viajar</p>
        <ul>
          <li>Visualização ilimitada dass viagens geradas</li>
          <li>Número ilimitado de gerações</li>
          <li>Pesquisa mais eficaz</li>
        </ul>
        <router-link to="/pagamento" class="plan-btn">Continuar com o ilimitado</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import http from '@/http/http';
import Button from 'primevue/button';
import { useRouter } from 'vue-router';
const router = useRouter();

async function irParaTelaInicial() {
  const user = JSON.parse(localStorage.getItem("user"));
  const response = await http.post("auth/ativar-plano", { plano: "free", idUsuario: user.id });

  router.push('/')
}
</script>

<style scoped>
.plans-container {
  background: linear-gradient(135deg, #9c9c9c, #284daa);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #333;
  text-align: center;
  padding: 20px;
  position: relative; 
}

.title {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 2rem;
  color: #efefef;
}

.back-button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
  position: absolute;
  top: 20px;
  left: 20px;
}

.back-button:hover {
  background-color: #0062cc;
}

.plans {
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: auto;
}

.plan-card {
  background-color: #ffffff;
  border-radius: 15px;
  padding: 2rem;
  text-align: center;
  display:flex;
  flex-direction: column;
  justify-content: space-around;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  width: 280px;
  margin: 10px;
}

.plan-card:hover {
  transform: translateY(-8px);
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.15);
}

.featured {
  border: 2px solid #007bff;
}

.plan-header {
  margin-bottom: 1.5rem;
}

.plan-header h2 {
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
  color: #007bff;
}

.price {
  font-size: 2.5rem;
  font-weight: bold;
  color: #333;
}

.badge {
  display: inline-block;
  background-color: #5271ff;
  color: #fff;
  border-radius: 16px;
  padding: 0.2rem 0.6rem;
  font-size: 0.8rem;
  margin-top: 0.5rem;
}

ul {
  list-style: none;
  padding: 0;
  margin: 1.5rem 0;
  font-size: 0.9rem;
  text-align: left;
  color: #555;
}

ul li {
  margin-bottom: 0.5rem;
}

.plan-btn {
  text-decoration: none;
  margin-top: 1.5rem;
  color: #007bff;
  border: 1px solid #007bff;
  background-color: #ffffff;
  font-size: 1rem;
  padding: 10px 20px;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.plan-btn:hover {
  background-color: #007bff;
  color: #fff;
}

@media (max-width: 768px) {
  .plans {
    flex-direction: column;
    align-items: center;
  }

  .plan-card {
    width: 100%;
    max-width: 350px;
  }

  .price {
    font-size: 2rem;
  }

  .plan-btn {
    width: 100%;
  }
}
</style>
