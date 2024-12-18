<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import Button from 'primevue/button';

const editOptionsVisible = ref({});
const sidebarVisible = ref(true);
const userOptionsVisible = ref(false);
const isMobile = ref(window.innerWidth < 700);

const sliderValue = ref(50);
const min = 0;
const max = 100;

const viagens = ref([
  { id: 1, destino: 'México', text: 'Festas noturnas', dataInicio: '21/10/24', dataFim: '30/10/24', fixado: false, dataCriacao: '25/10/24 - 00:00:00' },
  { id: 2, destino: 'Brasil', text: 'Gastronomia', dataInicio: '05/11/24', dataFim: '15/11/24', fixado: false, dataCriacao: '25/10/24 - 00:00:00' },
]);

const perguntas = ref([
  {
    texto: "Qual tipo de experiência você prefere?",
    respostas: [
      { value: "NOTURNO", label: "Festas noturnas" },
      { value: "GASTRONOMIA", label: "Gastronomia" },
      { value: "CULTURA", label: "Experiências culturais" }
    ],
    tipo: "TEXT"
  },
  {
    texto: "Prefere locais com clima quente ou frio?",
    respostas: [
      { value: "QUENTE", label: "Quente" },
      { value: "FRIO", label: "Frio" }
    ],
    tipo: "TEXT"
  },
]);

const currentQuestionIndex = ref(0);
const selectedAnswer = ref(null);

function selectAnswer(answer) {
  selectedAnswer.value = answer;
}

function goToNextQuestion() {
  if (currentQuestionIndex.value < perguntas.value.length - 1) {
    currentQuestionIndex.value++;
    selectedAnswer.value = null;
  }
}

function goToPreviousQuestion() {
  if (currentQuestionIndex.value > 0) {
    currentQuestionIndex.value--;
    selectedAnswer.value = null;
  }
}

function toggleSidebar() {
  sidebarVisible.value = !sidebarVisible.value;
}

function toggleUserOption(event) {
  event.stopPropagation();
  hideEditOptions();
  userOptionsVisible.value = !userOptionsVisible.value;
}

function toggleEditOptions(event, id) {
  event.stopPropagation();
  if (editOptionsVisible.value[id]) {
    editOptionsVisible.value[id] = false; 
  } else {
    hideEditOptions();
    editOptionsVisible.value[id] = true;
  }
}

function hideEditOptions() {
  Object.keys(editOptionsVisible.value).forEach(key => {
    editOptionsVisible.value[key] = false;
  });
  userOptionsVisible.value = false;
}

function handleResize() {
  isMobile.value = window.innerWidth < 700;
  sidebarVisible.value = !isMobile.value;
}

onMounted(() => {
  if (isMobile.value) {
    sidebarVisible.value = false;
  }
  window.addEventListener('resize', handleResize);
  document.addEventListener('click', hideEditOptions);
});

onUnmounted(() => {
  document.removeEventListener('click', hideEditOptions);
  window.removeEventListener('resize', handleResize);
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
        <!-- Sidebar content -->
      </div>
      <div class="h-screen" :class="{ 'chat-totalArea': sidebarVisible }" style="display:flex; flex-direction: column; justify-content: center; align-items: center; width: 100%;">
        <div class="chat-container mb-3">
          <h1>{{ perguntas[currentQuestionIndex].texto }}</h1>
        </div>
        <div class="chat-card-resposta" v-for="resposta in perguntas[currentQuestionIndex].respostas" :key="resposta.value">
          <span :class="{ 'selected-answer': selectedAnswer === resposta.value }" @click="selectAnswer(resposta.value)" style="cursor: pointer;">{{ resposta.label }}</span>
        </div>
        <div class="w-full flex justify-content-center mt-3">
          <Button @click="goToPreviousQuestion" :disabled="currentQuestionIndex === 0" label="Anterior" severity="warn" variant="text" raised class="mr-5" />
          <Button label="Não tenho preferência" severity="secondary" raised />
          <Button @click="goToNextQuestion" :disabled="currentQuestionIndex === perguntas.length - 1" label="Próximo" severity="warn" variant="text" raised class="ml-5" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.selected-answer {
  background-color: #d0e8ff;
  border-radius: 5px;
  padding: 5px 10px;
}

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
  font-size: 32px;
  text-align: center;
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
  width: 10rem;
  padding: 1rem;
  background-color: #f2f4f3;
  border-radius: 10px;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.chat-card-resposta span {
  text-align: center;
  font-weight: bold;
  color: #7b7b7b;
  font-size: 1.2rem;
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

.slider-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.slider-value {
  font-size: 2.5em;
  font-weight: bold;
  color: #333;
  display:none;
}

.slider {
  width: 25rem;
  display:none;
}

@media (width < 1024px) {

  .sidebar-totalArea {
    width: 330px;
  }

  .chat-totalArea {
    width: calc(100% - 340px);
    margin-left: 340px;
  }
}

@media(width < 700px) {
  .sidebar-totalArea {
    width: 100%;
    background-color: #b0beff;
  }

  .chat-totalArea {
    width: 100%;
    margin-left: 0px;
  }
  .scrollable-container {
    max-height: calc(100vh - 50px);
  }
  .chat-card-resposta {
    width: 7rem;
    height: 7rem;
  }
  .chat-card-resposta span {
    font-size: 1rem;
  }
}

</style>
