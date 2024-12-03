<script setup>
import {provide, ref} from "vue";
import LoadingScreen from "./components/LoadingScreen.vue";

const loading = ref(false)
const message = ref("")
const setLoading = function (v = null) {
  if (v) { loading.value = v; return }

  loading.value = !loading.value
}

provide("stripe", {
  publish_key: import.meta.env.STRIPE_PUBLISH_KEY
})

provide("loading", {
  loading,
  message,
  setLoading
})
</script>

<template>
  <LoadingScreen />
  <router-view></router-view>
</template>

<style>
</style>
