<script setup>
import MainLayout from "@/MainLayout.vue";
import { provide, ref } from "vue";
import CadastroUsuario from "@/components/CadastroUsuario.vue";
import TelaInicial from "./components/TelaInicial.vue";

const loading = ref(false)
const setLoading = function (v = null) {
  if (v) { loading.value = v; return }

  loading.value = !loading.value
}

provide("loading", {
  loading,
  setLoading
})
</script>

<template>
  <TelaInicial></TelaInicial>
  <!-- <CadastroUsuario></CadastroUsuario> -->
</template>

<style>

* {
  padding: 0px;
  margin: 0px;
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
