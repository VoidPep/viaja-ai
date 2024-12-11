<script setup>
import Toast from 'primevue/toast';
import InputText from "primevue/inputtext";
import Checkbox from "primevue/checkbox";
import Button from "primevue/button";
import viajaAiLogoPath from '@/assets/images/logo-simplificada.png';

import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import http from "@/http/http";
import { useToast } from 'primevue/usetoast';

const toast = useToast();

const router = useRouter();

const viajaAiLogo = ref({
  backgroundImage: `url(${viajaAiLogoPath})`
});

const showLogin = ref(true);
const lembrarDeMim = ref(false);
const login = ref({})
const cadastro = ref({})

const redirectToRegister = function () {
  showLogin.value = false

  // ✅ Correto
  //router.push("/register");

  // ❌ Evita
  //location.href = "/register";
}

const redirectToLogin = function () {
  showLogin.value = true
}

const entrar = async function () {
  const response = await http.post("auth/login", login.value);

  if (response["status"] >= 400) {
    toast.add({
        severity: 'error',
        summary: 'Erro ao tentar login',
        detail: 'Usuário ou senha incorreto',
        life: 3000
      });
    return
  }

  if (response.data.access_token) {
    localStorage.setItem("user", JSON.stringify({
      token: response.data.access_token,
      id: response.data.id,
      email: login.value.email
    }));

    router.push(response.data.plano ? '/' : '/planos');
    return;
  }
}

const cadastrar = async function () {
  const response = await http.post("auth/register", cadastro.value);

  if (response["status"] >= 400) {
    toast.add({
        severity: 'error',
        summary: 'Erro ao cadastrar usuário',
        detail: response?.data?.message ?? response.response?.data?.message,
        life: 3000
      });
      
      return;
    }
    
    if (response.data.access_token) {
      
      localStorage.setItem("user", JSON.stringify({
        id: response.data.id,
        token: response.data.access_token,
        email: cadastro.value.email
      }));

    router.push('/planos');
    return;
  }

}

onMounted(() => {
  login.value = {
    email: 'viaja-ai@viajaai.com',
    senha: "123"
  }

  cadastro.value = {
    nome: "viaja-ai",
    email: 'viaja-ai@viajaai.com',
    senha: "123",
    confirmar_senha: "123"
  }
  showLogin.value = true;
})
</script>

<template>
  <div class="background-image h-screen">
    <div class="grid grid-nogutter">
      <div class="col-12 lg:col-6 bg-black-alpha-40 card-shadow">
        <div class="h-screen">
          <div class="p-5rem">
            <transition name="fade" mode="out-in">
              <div v-if="showLogin" key="login-card">
                <img :src="viajaAiLogoPath" alt="Logo viaja ai" class="logo" />
                <form @submit.prevent="entrar" method="post">
                  <div class="flex flex-column gap-2 mt-8">
                    <label for="email">Email</label>
                    <InputText v-model="login.email" type="email" id="email" class="w-100" required></InputText>
                    <label for="senha">Senha</label>
                    <InputText v-model="login.senha" type="password" id="senha" class="w-100" required></InputText>

                    <div class="flex justify-content-between mb-5">
                      <div class="flex align-items-center">
                        <Checkbox input-id="lembrarDeMim" v-model="lembrarDeMim" :binary="true" />
                        <label for="lembrarDeMim" class="ml-2">Lembrar de mim</label>
                      </div>
                      <div>
                        <span style="color: white;padding-right: 8px;">Ainda não tem uma conta?</span><a @click="redirectToRegister()" class="text-white" href="javascript:">Registrar-se</a>
                      </div>
                    </div>
                    <Button type="submit" label="Login"></Button>
                  </div>
                </form>
              </div>
              <div v-else key="register-card">

                <img :src="viajaAiLogoPath" alt="Logo viaja ai" class="logo" />

                <form @submit.prevent="cadastrar" method="post">

                  <div class="flex flex-column gap-2 mt-8">
                    <label for="nome">Nome</label>
                    <InputText type="text" v-model="cadastro.nome" id="nome" class="w-100"></InputText>
                    <label for="email">Email</label>
                    <InputText type="email" id="email" v-model="cadastro.email" class="w-100"></InputText>
                    <label for="senha">Senha</label>
                    <InputText type="password" id="senha" v-model="cadastro.senha" class="w-100"></InputText>
                    <label for="confirmar_senha">Confirmar senha</label>
                    <InputText type="password" id="confirmar_senha" v-model="cadastro.confirmar_senha" class="w-100"></InputText>

                    <div class="flex justify-content-between mb-5">
                      <a @click="redirectToLogin()" class="text-white" href="javascript:">Voltar para Login</a>
                    </div>
                    <Button label="Registrar" type="submit"></Button>
                  </div>
                </form>
              </div>
            </transition>
          </div>
        </div>
      </div>

      <div class="col-6">
        <div class="info-area">
          <h3 class="info-title">Explore o mundo com inteligência!</h3>
          <p class="info-description">O Viaja Ai usa o poder da inteligência artificial para criar viagens personalizadas para você. Sem mais complicação, sem estresse. Só diversão e experiências únicas! 🌍</p>

          <div class="info-cards-container">
            <div class="info-card">
              <i class="pi pi-search text-3xl mr-3"></i>
              <div>
                <h4 class="info-card-title">Encontre destinos incríveis</h4>
                <p class="info-card-description">Encontre destinos baseados no seu estilo e preferências.</p>
              </div>
            </div>
            <div class="info-card">
              <i class="pi pi-dollar text-3xl mr-3"></i>
              <div>
                <h4 class="info-card-title">Descubra ofertas exclusivas</h4>
                <p class="info-card-description">Encontre ofertas que se encaixam no seu orçamento.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <Toast position="bottom-center"></Toast>
</template>

<style scoped>
.logo {
  width: 180px;
  height: 65px;
}

.background-image {
  background-image: url("@/assets/images/background-montanha-azul.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center; /* Centraliza o background */
  min-height: 100vh;
}

.card-shadow {
  box-shadow: 0 0 2rem black;
}

.p-5rem {
  padding: 5rem 6rem 0 6rem !important;
}

label {
  color: white;
  font-weight: bold;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.info-area {
  padding: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: none;
}

.info-title {
  color: white;
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
}

.info-description {
  color: white;
  font-size: 1.2rem;
  margin-top: 1.2rem;
  line-height: 1.6;
  text-align: center;
}

.info-cards-container {
  margin-top: 2rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
}

.info-card {
  display: flex;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  width: 100%;
  max-width: 300px;
  margin: 0.5rem;
}

.info-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.7);
}

.info-card-title {
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.info-card-description {
  color: white;
  font-size: 1rem;
}

.text-3xl {
  font-size: 2rem;
}

.mr-3 {
  margin-right: 1rem;
}

/* Responsividade */
@media (max-width: 1300px) {
  .info-area {
    display:none;
  }
}
</style>

