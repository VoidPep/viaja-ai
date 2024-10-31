<script setup>
import InputText from "primevue/inputtext";
import Checkbox from "primevue/checkbox";
import Button from "primevue/button";
import viajaAiLogoPath from '@/assets/images/logo-simplificada.png';

import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import http from "@/http/http";

const router = useRouter();

const viajaAiLogo = ref({
  backgroundImage: `url(${viajaAiLogoPath})`
});

const showLogin = ref(true);
const lembrarDeMim = ref(false);
const login = ref({})

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

const entrar = async function() {
  const {data, status} = await http.post("auth/login", login.value);
  console.log(data)
}

onMounted(() => {
  login.value = {}
  showLogin.value = true;
})
</script>

<template>
  <div class="background-image h-screen">
    <div class="grid grid-nogutter">
      <div class="col-6 bg-black-alpha-40 card-shadow">
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
                    <InputText v-model="login.senha" type="password" id="senha" class="w-100" required ></InputText>

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

                <div class="flex flex-column gap-2 mt-8">
                  <label for="nome">Nome</label>
                  <InputText type="text" id="nome" class="w-100"></InputText>
                  <label for="email">Email</label>
                  <InputText type="email" id="email" class="w-100"></InputText>
                  <label for="senha">Senha</label>
                  <InputText type="password" id="senha" class="w-100"></InputText>

                  <div class="flex justify-content-between mb-5">
                    <a @click="redirectToLogin()" class="text-white" href="javascript:">Voltar para Login</a>
                  </div>
                  <Button label="Registrar"></Button>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>

      <div class="col-6"></div>
    </div>
  </div>
</template>

<style scoped>
.logo {
  width: 130px; 
  height: auto; 
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
