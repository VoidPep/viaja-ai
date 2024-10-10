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
</style>
