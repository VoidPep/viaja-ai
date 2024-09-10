<script setup>
import { inject } from "vue"
import { Button } from "primevue/button"

const {
    loading, setLoading
} = inject("loading")

const onClick = function () {
    setLoading()
}
</script>
<template>
    <Button icon="fa fa-plus" label="Adicionar"></Button>
    <router-view />
</template>

<style lang="scss"></style>
