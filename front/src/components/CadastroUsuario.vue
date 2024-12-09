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
                        <a @click="redirectToRegister()" class="text-white" href="javascript:">Registrar</a>
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
  min-height: 100vh;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: bottom;
}

.card-shadow {
  box-shadow: 0 0 2rem black;
}

.p-5rem {
  padding: 5rem 6rem 0 6rem !important
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
  transition: opacity 0.8s ease;
  opacity: 0;
}
</style>
