<script setup>

import { onUnmounted, onMounted, ref } from 'vue';

// Estado para armazenar a visibilidade das opções de edição para cada viagem
const editOptionsVisible = ref({});

// Lista de viagens
const viagens = ref([
  { id: 1, destino: 'México', text: 'Festas noturnas', dataInicio: '21/10/2024', dataFim: '30/10/2024', fixado: false, dataCriacao: '25/10/2024 - 00:00:00' },
  { id: 2, destino: 'Brasil', text: 'Gastronomia', dataInicio: '05/11/2024', dataFim: '15/11/2024', fixado: false, dataCriacao: '25/10/2024 - 00:00:00' },
  { id: 3, destino: 'Argentina', text: 'Montanhas e Trilhas', dataInicio: '10/12/2024', dataFim: '20/12/2024', fixado: false, dataCriacao: '26/10/2024 - 10:30:00' },
  { id: 4, destino: 'Chile', text: 'Vinícolas e Gastronomia', dataInicio: '15/11/2024', dataFim: '25/11/2024', fixado: false, dataCriacao: '27/10/2024 - 14:00:00' },
  { id: 5, destino: 'Peru', text: 'História e Cultura', dataInicio: '01/01/2025', dataFim: '10/01/2025', fixado: false, dataCriacao: '28/10/2024 - 09:15:00' },
  { id: 6, destino: 'Colômbia', text: 'Praias e Vida Noturna', dataInicio: '05/12/2024', dataFim: '15/12/2024', fixado: false, dataCriacao: '29/10/2024 - 12:45:00' },
  { id: 7, destino: 'Uruguai', text: 'Festivais e Eventos', dataInicio: '20/11/2024', dataFim: '30/11/2024', fixado: false, dataCriacao: '30/10/2024 - 08:20:00' },
  { id: 8, destino: 'Equador', text: 'Natureza e Vida Selvagem', dataInicio: '18/12/2024', dataFim: '28/12/2024', fixado: false, dataCriacao: '31/10/2024 - 16:10:00' },
  { id: 9, destino: 'Bolívia', text: 'Aventura e Desafios', dataInicio: '02/02/2025', dataFim: '12/02/2025', fixado: false, dataCriacao: '01/11/2024 - 11:00:00' },
  { id: 10, destino: 'Paraguai', text: 'Compras e Cultura Local', dataInicio: '15/01/2025', dataFim: '25/01/2025', fixado: false, dataCriacao: '02/11/2024 - 10:10:00' },
  { id: 11, destino: 'Venezuela', text: 'Paisagens Naturais', dataInicio: '22/11/2024', dataFim: '02/12/2024', fixado: false, dataCriacao: '03/11/2024 - 14:25:00' },
  { id: 12, destino: 'Panamá', text: 'Cultura e Culinária', dataInicio: '05/03/2025', dataFim: '15/03/2025', fixado: false, dataCriacao: '04/11/2024 - 09:35:00' }
]);

function toggleEditOptions(event, id) {
  event.stopPropagation();
  hideEditOptions();
  editOptionsVisible.value[id] = !editOptionsVisible.value[id];
}

function hideEditOptions() {
  Object.keys(editOptionsVisible.value).forEach(key => {
    editOptionsVisible.value[key] = false;
  });
}

onMounted(() => {
  document.addEventListener('click', hideEditOptions);
});

onUnmounted(() => {
  document.removeEventListener('click', hideEditOptions);
});

function fixarViagem(id) {
  const index = viagens.value.findIndex(viagem => viagem.id === id);
  if (index !== -1) {
    const [fixedItem] = viagens.value.splice(index, 1);
    fixedItem.fixado = true;
    viagens.value.unshift(fixedItem);
    hideEditOptions(); 
  }
}

function desafixarViagem(id) {
  const index = viagens.value.findIndex(viagem => viagem.id === id);
  if (index !== -1) {
    const [fixedItem] = viagens.value.splice(index, 1);
    fixedItem.fixado = false;
    viagens.value.push(fixedItem);
    hideEditOptions(); 
  }
}

function deletarViagem(id) {
  const index = viagens.value.findIndex(viagem => viagem.id === id);
  if(index !== -1) {
    viagens.value.splice(index, 1);
    hideEditOptions();
  }
}
</script>

<template>
  <div class="background-image h-screen">
    <div class="grid grid-nogutter">
      <div class="h-screen sidebar-totalArea">
        <div class="flex justify-content-between">
          <i class="pi pi-chevron-left icones-hover cursor-pointer" style="font-size: 1.2rem;"></i>
          <i class="pi pi-plus-circle icones-hover cursor-pointer" style="font-size: 1.2rem;"></i>
        </div>
        <div class="flex flex-column mt-4">
          <img class="logo-viajaai mb-3" src="@/assets/images/logo-simplificada.png" alt="Logo viaja ai">
          <div class="historico-viagem flex flex-column p-1" aria-label="Histórico de viagens geradas">
            <div class="scrollable-container">
              <div v-for="viagem in viagens" :key="viagem.id" :class="{'item-fixado': viagem.fixado}" class="item-viagemGerada cursor-pointer flex flex-row justify-content-around align-items-center">
                <div class="topicos-viagemGerada">{{ viagem.destino }}</div>
                <div class="topicos-viagemGerada" style="max-width: 152px; overflow-x: hidden; text-align: center;">{{ viagem.text }}</div>
                <div class="topicos-viagemGerada flex flex-column">
                  <span>-> {{ viagem.dataInicio }}</span>
                  <span><- {{ viagem.dataFim }}</span>
                </div>
                <div class="itemEdit-area" style="position: relative;">
                  <i class="btn-edit pi pi-ellipsis-v cursor-pointer" @click="toggleEditOptions($event, viagem.id)"></i>
                  <div class="edit-options" v-if="editOptionsVisible[viagem.id]">
                    <span class="flex flex-row" @click="viagem.fixado ? desafixarViagem(viagem.id) : fixarViagem(viagem.id)">
                      <i class="pi pi-tag" style="font-size: 1rem; margin-right: 6px"></i>{{ viagem.fixado ? 'Desafixar': 'Fixar' }}
                    </span>
                    <span class="flex flex-row" style="color: var(--red-400)" @click="deletarViagem(viagem.id)">
                      <i class="pi pi-trash" style="font-size: 1rem; margin-right: 6px"></i>Deletar
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="chat-totalArea">
        <div>Teste</div>
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

.icones-hover:hover {
  transition: 0.1s linear all;
  color: #5271ff;
}

.sidebar-totalArea {
  position: fixed;
  z-index: 1;
  padding: 1.5rem 1rem;
  background-color: rgba(255, 255, 255, 0.5);
  width: 480px;
}

.logo-viajaai {
  width: 150px;
  height: 62px;
}

.historico-viagem {
  display: flex;
  flex: 1;
  flex-direction: column;
}

.scrollable-container {
  transition: 0.1s all linear;
  flex: 1; 
  overflow-y: auto; 
  max-height: calc(100vh - 200px); 
  padding: 0 10px;
}

.item-viagemGerada {
  font-size: 1rem;
  gap:3px;
  background: #dfdfdf;
  margin-bottom: 20px;
  padding: 20px 8px;
  border-radius: 10px;
  transition: 0.1s linear all;
}

.item-fixado {
  border: 1px solid #5271ff;
}

.btn-edit {
  padding: 5px;
  border-radius: 25px;
  transition: 0.1s linear all;
}

.btn-edit:hover {
  background-color: #5272ff91;
}

.edit-options {
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 5px;
  z-index: 2;
  padding: 8px;
  background-color: #eee;
  border-radius: 10px;
  right: 0;
}

.edit-options span {
  padding: 10px 20px;
  border-radius: 10px;
}

.edit-options span:hover {
  background-color: #5272ff91;
}


.chat-totalArea {
  width: calc(100% - 485px);
  margin-left: 485px;
}

.scrollable-container {
  flex: 1;
  overflow-y: auto; 
  max-height: calc(100vh - 200px); 
  padding: 0 10px;
}

.scrollable-container::-webkit-scrollbar {
  width: 8px; 
}

.scrollable-container::-webkit-scrollbar-track {
  background: transparent; 
}

.scrollable-container::-webkit-scrollbar-thumb {
  background: rgba(146, 146, 146, 0.7); 
  border-radius: 10px; 
}

.scrollable-container::-webkit-scrollbar-thumb:hover {
  background: rgba(82, 113, 255, 0.5); 
}

@media(width < 625px) {
  .sidebar-totalArea {
    width: 100%;
  }

  .chat-totalArea {
    width: 100%;
    margin-left: 0px;
  }
}
</style>
