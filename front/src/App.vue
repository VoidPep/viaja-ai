<script setup>
import {provide, ref} from "vue";

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
  <router-view></router-view>
</template>

<style>

* {
  padding: 0;
  margin: 0;
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
