<script setup>
import MainLayout from "@/MainLayout.vue";
import { provide, ref } from "vue";
import CadastroUsuario from "@/components/CadastroUsuario.vue";

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
  <CadastroUsuario></CadastroUsuario>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
