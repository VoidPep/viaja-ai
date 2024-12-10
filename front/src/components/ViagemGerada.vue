<script setup>
import { onMounted, ref } from 'vue';
import Card from "primevue/card"
import Button from "primevue/button"

const props = defineProps(['viagem', 'viagensGeradas'])
const emit = defineEmits(['visualizarViagem', 'selecionarViagem'])

const badge = ref({})
onMounted(() => {
  badge.value = badgeDaViagem()
}) 

const badgeDaViagem = function () {
  if (!props.viagensGeradas || !props.viagensGeradas.length || !props.viagem) {
    return { cor: '#71f0a1', descricao: "" };
  }

  const custos = props.viagensGeradas.map(v => v.custo_total_estimado).sort((a, b) => a - b);

  const menorCusto = custos[0];
  const maiorCusto = custos[custos.length - 1];
  const custoAtual = props.viagem.custo_total_estimado;

  if (custoAtual === menorCusto) {
      return { cor: '#2196f3', descricao: "#Custo-benefício" }; 
    } else if (custoAtual === maiorCusto) {
      return { cor: '#4caf50', descricao: "#Melhor proveito" };
  } else {
    return { cor: '#ff9800', descricao: "#Recomendado" };
  }
}

</script>
<template>
        <Card style="width: 25rem; overflow: hidden">
            <template #content>
                <div class="flex flex-column">
                    <div v-for="imagem in props.viagem.imagens"
                    :style="{
                        height: '9rem',
                        backgroundImage: `url(${imagem.url})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: '50% 70%'
                    }"
                >
            </div>
            <div class="flex gap-2 align-items-center">
                <h3>{{ props.viagem.destino }}</h3>
                <a href="javascript:" class="text-decoration-none" severity="secondary" outlined @click="() => emit('visualizarViagem')">
                    <i class="pi pi-eye"></i>
                </a>
            </div>
            <div class="flex">
                <div class="badge" 
                :style="{
                    backgroundColor: badge?.cor ?? '#71f0a1'
                }"> {{ badge?.descricao ?? "" }} </div>
            </div>
        </div>
    </template>
    <template #footer>
        <div class="flex gap-3 mt-1 align-items-center justify-content-between">
            <div>
                <h3 class="text-green-400">R$ {{ props.viagem.custo_total_estimado.toFixed(2) }}</h3>
            </div>
            <div>
                <Button label="Selecionar" class="w-full botao-azul" @click="() => emit('selecionarViagem')"/>
            </div>
        </div>
    </template>
</Card>
</template>

<style scoped>
.botao-azul {
  background: #3d4b87;
  border: 1px solid #3d4b87;
}

.text-decoration-none {
    text-decoration: none;
    color: black;
}

.badge {
  display: inline-block;
  color: #fff;
  border-radius: 16px;
  padding: 0.2rem 0.6rem;
  font-size: 0.8rem;
  margin-top: 0.5rem;
}
</style>