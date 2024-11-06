<script setup>

import { onUnmounted, onMounted, ref } from 'vue';

// Estado para armazenar a visibilidade das opções de edição para cada viagem
const editOptionsVisible = ref({});
const sidebarVisible = ref(true);
const userOptionsVisible = ref(false);

// Lista de viagens
const viagens = ref([
  { id: 1, destino: 'México', text: 'Festas noturnas', dataInicio: '21/10/24', dataFim: '30/10/24', fixado: false, dataCriacao: '25/10/24 - 00:00:00' },
  { id: 2, destino: 'Brasil', text: 'Gastronomia', dataInicio: '05/11/24', dataFim: '15/11/24', fixado: false, dataCriacao: '25/10/24 - 00:00:00' },
  { id: 3, destino: 'Argentina', text: 'Montanhas e Trilhas', dataInicio: '10/12/24', dataFim: '20/12/24', fixado: false, dataCriacao: '26/10/24 - 10:30:00' },
  { id: 4, destino: 'Chile', text: 'Vinícolas e Gastronomia', dataInicio: '15/11/24', dataFim: '25/11/24', fixado: false, dataCriacao: '27/10/24 - 14:00:00' },
  { id: 5, destino: 'Peru', text: 'História e Cultura', dataInicio: '01/01/25', dataFim: '10/01/25', fixado: false, dataCriacao: '28/10/24 - 09:15:00' },
  { id: 6, destino: 'Colômbia', text: 'Praias e Vida Noturna', dataInicio: '05/12/24', dataFim: '15/12/24', fixado: false, dataCriacao: '29/10/24 - 12:45:00' },
  { id: 7, destino: 'Uruguai', text: 'Festivais e Eventos', dataInicio: '20/11/24', dataFim: '30/11/24', fixado: false, dataCriacao: '30/10/24 - 08:20:00' },
  { id: 8, destino: 'Equador', text: 'Natureza e Vida Selvagem', dataInicio: '18/12/24', dataFim: '28/12/24', fixado: false, dataCriacao: '31/10/24 - 16:10:00' },
  { id: 9, destino: 'Bolívia', text: 'Aventura e Desafios', dataInicio: '02/02/25', dataFim: '12/02/25', fixado: false, dataCriacao: '01/11/24 - 11:00:00' },
  { id: 10, destino: 'Paraguai', text: 'Compras e Cultura Local', dataInicio: '15/01/25', dataFim: '25/01/25', fixado: false, dataCriacao: '02/11/24 - 10:10:00' },
  { id: 11, destino: 'Venezuela', text: 'Paisagens Naturais', dataInicio: '22/11/24', dataFim: '02/12/24', fixado: false, dataCriacao: '03/11/24 - 14:25:00' },
  { id: 12, destino: 'Panamá', text: 'Cultura e Culinária', dataInicio: '05/03/25', dataFim: '15/03/25', fixado: false, dataCriacao: '04/11/24 - 09:35:00' }
]);

function ToggleSidebar() {
  sidebarVisible.value = !sidebarVisible.value;
}

function toggleUserOption() {
  event.stopPropagation();
  if(userOptionsVisible.value){
    userOptionsVisible.value = !userOptionsVisible.value;
  }else {
    hideEditOptions();
    userOptionsVisible.value = !userOptionsVisible.value;
  }
}

function toggleEditOptions(event, id) {
  event.stopPropagation(); 
  if (editOptionsVisible.value[id]) {
    editOptionsVisible.value[id] = false; 
  } else {
    hideEditOptions();
    userOptionsVisible.value = false; 
    editOptionsVisible.value[id] = true; 
  }
}


function hideEditOptions() {
  Object.keys(editOptionsVisible.value).forEach(key => {
    editOptionsVisible.value[key] = false;
  });
  userOptionsVisible.value = false;
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
        <div class="h-screen sidebar-totalArea" v-if="sidebarVisible">
          <div class="flex justify-content-between">
            <i class="pi pi-arrow-circle-left icones-hover cursor-pointer" @click="ToggleSidebar()" style="font-size: 1.2rem;"></i>
            <i class="pi pi-plus-circle icones-hover cursor-pointer" style="font-size: 1.2rem;"></i>
          </div>
          <div class="flex flex-column mt-4">
            <img class="logo-viajaai mb-3" src="@/assets/images/logo-simplificada.png" alt="Logo viaja ai">
            <div class="historico-viagem flex flex-column p-1" aria-label="Histórico de viagens geradas">
              <div class="scrollable-container">
                <div v-for="viagem in viagens" :key="viagem.id" :class="{'item-fixado': viagem.fixado}" class="item-viagemGerada cursor-pointer flex flex-row justify-content-between align-items-center">
                  <div class="topicos-viagemGerada">{{ viagem.destino }}</div>
                  <div class="topicos-viagemGerada" style="max-width: 152px; overflow-x: hidden; text-align: center;">{{ viagem.text }}</div>
                  <div class="topicos-viagemGerada flex flex-column">
                    <span>-> {{ viagem.dataInicio }}</span>
                    <span><- {{ viagem.dataFim }}</span>
                  </div>
                  <div class="itemEdit-area" style="position: relative;">
                    <i class="btn-edit pi pi-ellipsis-v cursor-pointer" @click="toggleEditOptions($event, viagem.id)"></i>
                    <div class="options-menu" v-if="editOptionsVisible[viagem.id]">
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
      <i v-if="!sidebarVisible" class="pi pi-arrow-circle-right icones-hover cursor-pointer" @click="ToggleSidebar()" style="font-size: 1.2rem; position: absolute; left: 1; top: 1; padding: 1.5rem 1rem;"></i>
      <div class="user-button-area">
        <div class="user-button" @click="toggleUserOption()"></div>
        <div v-if="userOptionsVisible" class="options-menu" style="margin-top: 80px; margin-right: 15px; min-width: 200px;">
          <span class="flex flex-row">
            <i class="pi pi-tag" style="font-size: 1rem; margin-right: 6px"></i>Opções
          </span>
          <span class="flex flex-row" style="color: var(--red-400)" >
            <i class="pi pi-trash" style="font-size: 1rem; margin-right: 6px"></i>Aqui
          </span>
        </div>
      </div>
      <div class="h-screen" :class="{ 'chat-totalArea': sidebarVisible }" style="display:flex; flex-direction: column; justify-content: center; align-items: center; width: 100%;">
        <div class="chat-container">
          <h1>Qual seu tipo favorito de rolê?</h1>
        </div>
        <div class="chat-input-area">
          <input 
            type="text"
            placeholder="Digite uma mensagem..."
          >
          <button><i class="pi pi-arrow-circle-right icones-hover cursor-pointer" style="font-size: 1.2rem;"></i></button>
        </div><!-- Chat box -->
        <div class="container">
          <div v-if="!sidebarVisible" class="w-full flex flex-lg-grid">
              <div class="chat-card-resposta flex flex-row justify-content-center align-items-center gap-3">
              <span>Festas noturnas</span>
              </div>
              <div class="chat-card-resposta flex flex-row justify-content-center align-items-center gap-3">
                <span>Festas noturnas</span>
              </div>
            
            
              <div class="chat-card-resposta w-25 flex flex-row justify-content-center align-items-center gap-3">
              <span>Festas noturnas</span>
              </div>
              <div class="chat-card-resposta w-25 flex flex-row justify-content-center align-items-center gap-3">
                <span>Festas noturnas</span>
              </div>
            
          </div>
          <div v-if="sidebarVisible" class="w-full">

            <div class="chat-card-resposta w-25 flex flex-row justify-content-center align-items-center gap-3">
              <span>Festas noturnas</span>
              </div>
              <div class="chat-card-resposta w-25 flex flex-row justify-content-center align-items-center gap-3">
                <span>Festas noturnas</span>
              </div>
            
            
              <div class="chat-card-resposta w-25 flex flex-row justify-content-center align-items-center gap-3">
              <span>Festas noturnas</span>
              </div>
              <div class="chat-card-resposta w-25 flex flex-row justify-content-center align-items-center gap-3">
                <span>Festas noturnas</span>
              </div>
            

          </div>
          <div class="w-full">
            <div class="chat-card-resposta-semPreferencia">
              <span>Não tenho preferência</span>
            </div>
          </div>
        </div>
        
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
  background-color: #dfdfdf;
  margin-bottom: 20px;
  padding: 20px 8px;
  border-radius: 10px;
  transition: 0.1s linear all;
}
.item-viagemGerada:hover {
  background-color: #cacaca;
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
  background-color: #5272ff4d;
}

.options-menu {
  cursor: default;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  gap: 5px;
  z-index: 2;
  padding: 8px;
  background-color: #eee;
  border-radius: 10px;
  right: 0;
}

.options-menu span {
  cursor:pointer;
  padding: 10px;
  border-radius: 10px;
  width: 100%;
  border-bottom: 1px solid #ddd;
}

.options-menu span:hover {
  background-color: #5272ff4d;
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
  background: #5272ff4d; 
}

.chat-totalArea {
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.chat-container h1 {
  color: #e2e2e2;
  font-size: 36px;
}

.chat-input-area {
  width: 100%;
  display:none;
  justify-content: center;
}

  .chat-input-area input {
    border-radius: 20px 0px 0px 20px; 
    border: none;
    outline: none;
    padding: 1rem 1.5rem;
    width: 80%;
    background-color: rgba(236, 236, 236, 0.88);
    max-width: 650px;
  }
    .chat-input-area input::placeholder {
      font-size: 18px;
    }
  .chat-input-area button{
    border-radius: 0px 20px 20px 0px;
    padding-right: 10px;
    background-color: rgba(236, 236, 236, 0.88);
    border: none;
    outline: none;
  }
    .chat-input-area button:hover {
      background-color:none;
    }

.chat-card-resposta {
  cursor: pointer;
  transition: 0.1s all linear;
  display:flex;
  justify-content: center;
  align-items: center;
  height: 10rem;
  padding: 1rem;
  background-color: #f2f4f3;
  border-radius: 10px;
  box-shadow: 3px 3px 5px #777;
}

.chat-card-resposta span {
  text-align: center;
  font-weight: bold;
  color: #7b7b7b;
  font-size: 1.5rem;
}

.chat-card-resposta:hover {
  background-color: #dedede;
}
  
.user-button {
  cursor: pointer;
  background-color: #000;
  width: 50px;
  height: 50px;
  padding: 10px;
  border-radius: 25px;
  position: absolute;
  right: 0;
  top: 0;
  margin: 1.5rem 1rem;
}


@media(width < 625px) {
  .sidebar-totalArea {
    width: 100%;
  }

  .chat-totalArea {
    width: 100%;
    margin-left: 0px;
  }
  .scrollable-container {
    max-height: calc(100vh - 50px);
  }
}

</style>
