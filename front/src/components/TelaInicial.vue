<script setup>

</script>

<template>
  <div class="background-image h-screen">
    <div class="grid grid-nogutter">
      <div class="col-3 h-screen bg-white opacity-70 p-4">
        <div class="flex justify-content-between">
          <i class="pi pi-chevron-left icones" style="font-size: 1.5rem;"></i>
          <i class="pi pi-plus-circle" style="font-size: 1.5rem;"></i>
        </div><!--ICONES-->
        <div class="flex mt-4">
          <img class="logo-viajaai" src="@/assets/images/logo-simplificada.png" alt="Logo viaja ai">
        </div>
      </div>
      <div class="col-9">

      </div>
    </div>
  </div>
</template>

<style scoped>

.background-image {
  background-image: url("@/assets/images/backgroundTelaInicial.png");
  min-height: 100vh;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: bottom;
}

.logo-viajaai {
  width: 150px;
  height:62px;
}

</style>
