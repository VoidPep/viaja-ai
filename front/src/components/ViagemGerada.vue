<script setup>
import { onMounted } from 'vue';
import Card from "primevue/card"
import Button from "primevue/card"

const props = defineProps(['viagem'])

onMounted(() => {
  
}) 

</script>
<template>
  <Card style="width: 25rem; overflow: hidden">
      <template #content>
          <p class="m-0">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque
              quas!
          </p>
      </template>
      <template #footer>
          <div class="flex gap-3 mt-1">
              <Button label="Cancel" severity="secondary" outlined class="w-full" />
              <Button label="Save" class="w-full" />
          </div>
      </template>
  </Card>
</template>

<style scoped>
</style>