<template>
  <div class="flex flex-column plans-container">
    <h1 class="mb-4">Escolha o seu Plano</h1>
    <div class="flex grid justify-content-center align-content-center">
      <div class="plan-card mx-4">
        <div class="plan-header">
          <h2>Free</h2>
          <p class="price">FREE</p>
        </div>
        <p>Forever free for individuals and small teams up to 3</p>
        <ul>
          <li>Unlimited Access</li>
          <li>100MB Storage</li>
          <li>3 Users</li>
          <li>Unlimited Tasks</li>
        </ul>
        <Button label="Start for Free" class="p-button-outlined p-button-rounded plan-btn" @click="irParaTelaInicial"/>
      </div>

      <div class="plan-card featured mx-4">
        <div class="plan-header">
          <h2>Unlimited</h2>
          <p class="price">$29</p>
          <span class="badge">#bestdeal</span>
        </div>
        <p>per user/month billed yearly<br />$39 billed monthly</p>
        <ul>
          <li>All in Free +</li>
          <li>Unlimited Guests</li>
          <li>Priority Support</li>
          <li>Smart Notifications</li>
        </ul>
        <Button label="Get Unlimited" class="p-button-outlined p-button-rounded plan-btn" />
      </div>

      <div class="plan-card mx-4">
        <div class="plan-header">
          <h2>Enterprise</h2>
          <p class="price">$35</p>
        </div>
        <p>per user/month billed yearly<br />$45 billed monthly</p>
        <ul>
          <li>All in Unlimited +</li>
          <li>Bulk Export</li>
          <li>Advanced Analytics</li>
          <li>Advanced Security</li>
        </ul>
        <Button label="Get Enterprise" class="p-button-outlined p-button-rounded plan-btn" />
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
  background: linear-gradient(135deg, #1e1e2f, #2a2a44);
  min-height: 100vh;
  color: #fff;
  text-align: center;
}

.plans {
  max-width: 1200px;
}

.plan-card {
  background-color: #2c2c3e;
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s, box-shadow 0.3s;
  width: 300px; /* Largura fixa para manter os cards alinhados */
}

.plan-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
}

.featured {
  border: 2px solid #6f42c1;
}

.plan-header {
  margin-bottom: 1.5rem;
}

.plan-header h2 {
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
}

.price {
  font-size: 2.5rem;
  font-weight: bold;
}

.badge {
  display: inline-block;
  background-color: #6f42c1;
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
}

ul li {
  margin-bottom: 0.5rem;
}

.plan-btn {
  margin-top: 1.5rem;
  color: #fff;
  border: 1px solid #fff;
}

.plan-btn:hover {
  background-color: #6f42c1;
  border-color: #6f42c1;
  color: #fff;
}
</style>
