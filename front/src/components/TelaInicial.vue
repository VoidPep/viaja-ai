<script setup>
import {onUnmounted, onMounted, ref, inject} from 'vue';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Slider from "primevue/slider";
import Calendar from 'primevue/calendar';
import { useRouter } from 'vue-router';
import http from '@/http/http';

const {
  setLoading,
  message
} = inject("loading")

const formatCurrency = (value) => {
  if (typeof value !== 'number') return 'N/A';
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
};
const router = useRouter();
const editOptionsVisible = ref({});
const sidebarVisible = ref(true);
const userOptionsVisible = ref(false);
const isMobile = ref(window.innerWidth < 700);

//Valores slider
const sliderValue = ref(50);
const min = 0;
const max = 100;
const dataInicial = ref();
const dataFinal = ref();

const sair = function () {
  router.push('logout')
}

const showDialog = ref(false);
const confirmAction = () => {
  console.log('Ação confirmada');
  showDialog.value = false;
};

const perguntas = ref([
  {
    texto: "Qual tipo de experiência você prefere?",
    respostas: [
      {value: "FESTAS_NOTURNAS", label: "Festas noturnas"},
      {value: "GASTRONOMIA", label: "Gastronomia"},
      {value: "CULTURA", label: "Cultural"},
      {value: "PRAIA", label: "Praias"}
    ],
    tipo: "RADIO"
  },
  {
    texto: "Qual o clima ideal para a sua próxima viagem?",
    respostas: [
      {value: "CLIMA_QUENTE", label: "Quente"},
      {value: "CLIMA_FRIO", label: "Frio"}
    ],
    tipo: "RADIO"
  },
  {
    texto: "Em qual data voce deseja viajar?",
    respostas: [
      {value: "DATA_FINAL", label: "Data"},
      {value: "DATA_INICIAL", label: "Data"},
    ],
    tipo: "DATE"
  },
  {
    texto: "Qual é sua faixa de orçamento para a viagem? (em R$)",
    respostas: [
      {value: "valor", label: "Data"},
    ],
    tipo: "RANGE"
  },
]);

const currentQuestionIndex = ref(0);
const selectedAnswer = ref([]);
const textAnswer = ref("");
const rangeValue = ref(500);

function selectAnswer(answer, index) {
  selectedAnswer.value[index] = answer;
}

async function goToNextQuestion() {
const usuario = JSON.parse(localStorage.getItem('user'))
const idUsuario = usuario.id

if(currentQuestionIndex.value === perguntas.value.length - 1) {
  const form = {
    data_inicial: (dataInicial.value ?? new Date()).toISOString(),
    data_final: (dataFinal.value ?? new Date()).toISOString(),
    orcamento: rangeValue.value,
    preferencias: selectedAnswer.value,
    idUsuario: idUsuario
  }
  
  setLoading(true)
  message.value = "Estamos preparando sua viagem."; 
  try{

    const response = await http.post('roteiros/gerar-viagem', form)
    
    if(response.data) {
      const dataFim =formatDate(new Date(response.data.dataFim))
      const dataInicio =formatDate(new Date(response.data.dataInicio))

      const novo = {
        id: response.data.id,
        custo_total_estimado: response.data.custo_total_estimado,
        dataFim: dataFim,
        dataInicio: dataInicio,
        destino: response.data.destino,
        conteudo: JSON.parse(response.data.json)
      }

      viagensGeradasDoUsuario.value.push(novo)

      viagemSelecionada.value = novo
      dialogVisualizarViagem.value = true

      dataInicial.value = null;
      dataFinal.value = null;
      rangeValue.value = 500;
      selectedAnswer.value = [];
    }
    
  }catch(e) {

  } finally {
    setLoading(false)
  }
  currentQuestionIndex.value = 0

  return;
}
  
  if (currentQuestionIndex.value < perguntas.value.length - 1) {
    currentQuestionIndex.value++;
  }
}

async function getUserTrips() {
  const usuario = JSON.parse(localStorage.getItem('user'))
  const idUsuario = usuario.id

  const response = await http.get(`roteiros/getByLoggedUser/${idUsuario}`)
  viagensGeradasDoUsuario.value = [];

  if(response.data)
  viagensGeradasDoUsuario.value = response.data.map(q => {
    const dataFim =formatDate(new Date(q.dataFim))
    const dataInicio =formatDate(new Date(q.dataInicio))

    return {
      id: q.id,
      custo_total_estimado: q.custo_total_estimado,
      dataFim: dataFim,
      dataInicio: dataInicio,
      destino: q.destino,
      conteudo: JSON.parse(q.json)
    }
  })
}

function goToPreviousQuestion() {
  if (currentQuestionIndex.value > 0) {
    currentQuestionIndex.value--;
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

const viagensGeradasDoUsuario = ref([])
onMounted(async () => {
  if (isMobile.value) {
    sidebarVisible.value = false;
  }
  window.addEventListener('resize', handleResize);
  document.addEventListener('click', hideEditOptions);

  await getUserTrips()
});

function formatDate(date) {
  const day = String(date.getDate()).padStart(2, '0'); 
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

onUnmounted(() => {
  document.removeEventListener('click', hideEditOptions);
  window.removeEventListener('resize', handleResize);
});

function fixarViagem(id) {
  const index = viagensGeradasDoUsuario.value.findIndex(viagem => viagem.id === id);
  if (index !== -1) {
    const [fixedItem] = viagensGeradasDoUsuario.value.splice(index, 1);
    fixedItem.fixado = true;
    viagensGeradasDoUsuario.value.unshift(fixedItem);
    hideEditOptions();
  }
}

function desafixarViagem(id) {
  const index = viagensGeradasDoUsuario.value.findIndex(viagem => viagem.id === id);
  if (index !== -1) {
    const [fixedItem] = viagens.value.splice(index, 1);
    fixedItem.fixado = false;
    viagensGeradasDoUsuario.value.push(fixedItem);
    hideEditOptions();
  }
}

async function deletarViagem(id) {
  const index = viagensGeradasDoUsuario.value.findIndex(viagem => viagem.id === id);
  if (index !== -1) {
    viagensGeradasDoUsuario.value.splice(index, 1);
    hideEditOptions();
  }

  await http.delete(`roteiros/${id}`)
}

function abrirDialogViagemGerada(viagemParaVisualizar) {
  viagemSelecionada.value = viagemParaVisualizar
  dialogVisualizarViagem.value = true
}

const dialogVisualizarViagem = ref(false)
const viagemSelecionada = ref(null)
</script>

<template>
  <div class="background-image h-screen">
    <div class="grid grid-nogutter">
      <div class="h-screen sidebar-totalArea" v-if="sidebarVisible">
        <div class="flex justify-content-between">
          <i class="pi pi-arrow-circle-left azul icones-hover cursor-pointer" @click="toggleSidebar()"
             style="font-size: 1.2rem;"></i>
        </div>
        <div class="flex flex-column mt-4">
          <img class="logo-viajaai mb-3" src="@/assets/images/logo-simplificada.png" alt="Logo viaja ai">
          <div class="historico-viagem flex flex-column p-1" aria-label="Histórico de viagens geradas">
            <div class="scrollable-container">
              <div v-for="viagem in viagensGeradasDoUsuario" :key="viagem.id" :class="{'item-fixado': viagem.fixado}"
                   class="item-viagemGerada cursor-pointer flex flex-row justify-content-between align-items-center">
                <div class="flex flex-row justify-content-between w-full align-items-center" @click="abrirDialogViagemGerada(viagem)">
                  <div class="topicos-viagemGerada flex flex-column" 
                  style="
                      white-space: nowrap;
                      overflow: hidden !important;
                      text-overflow: ellipsis;
                      display: inline-block;
                      width: 180px;
                  ">
                    <div style="
                      overflow: hidden !important;
                      text-overflow: ellipsis;
                    ">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pin-fill" viewBox="0 0 16 16">
                        <path d="M4.146.146A.5.5 0 0 1 4.5 0h7a.5.5 0 0 1 .5.5c0 .68-.342 1.174-.646 1.479-.126.125-.25.224-.354.298v4.431l.078.048c.203.127.476.314.751.555C12.36 7.775 13 8.527 13 9.5a.5.5 0 0 1-.5.5h-4v4.5c0 .276-.224 1.5-.5 1.5s-.5-1.224-.5-1.5V10h-4a.5.5 0 0 1-.5-.5c0-.973.64-1.725 1.17-2.189A6 6 0 0 1 5 6.708V2.277a3 3 0 0 1-.354-.298C4.342 1.674 4 1.179 4 .5a.5.5 0 0 1 .146-.354"/>
                      </svg>
                      {{ viagem.destino }}
                    </div>
                    <div class="text-green-700">R$ {{ Number.parseFloat(viagem.custo_total_estimado).toFixed(2) }}</div>
                  </div>
                  <div class="topicos-viagemGerada flex flex-column">
                    <span>
                      <i class="pi pi-arrow-right"></i>
                      {{ viagem.dataInicio }}
                    </span>
                    <span> 
                      <i class="pi pi-arrow-left"></i>
                      {{ viagem.dataFim }}
                    </span>
                  </div>
                </div>
                <div class="flex gap-3 ml-3">
                  <span class="flex" style="color: var(--red-400)" @click="deletarViagem(viagem.id)">
                    <i class="pi pi-trash" style="font-size: 1rem; margin-right: 6px"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <i v-if="!sidebarVisible" class="pi pi-arrow-circle-right azul icones-hover cursor-pointer" @click="toggleSidebar()"
         style="font-size: 1.2rem; position: absolute; left: 1px; top: 1px ; padding: 1.5rem 1rem;"></i>
      <div class="user-button-area">
        <div class="user-button" >
          <div class="flex gap-2">
            <Button severity="contrast" @click="router.push('/configuracoes')">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gear-fill" viewBox="0 0 16 16">
                <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>
              </svg>
            </Button>
            <Button severity="danger" @click="router.push('/logout')">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-left" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z"/>
                <path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z"/>
              </svg>
            </Button>
          </div>
        </div>
      </div>
      <div class="h-screen" :class="{ 'chat-totalArea': sidebarVisible }"
           style="display:flex; flex-direction: column; justify-content: center; align-items: center; width: 100%;">

        <div class="chat-input-area">
          <input
              type="text"
              placeholder="Digite uma mensagem..."
          >
          <button><i class="pi pi-arrow-circle-right icones-hover cursor-pointer" style="font-size: 1.2rem;"></i>
          </button>
        </div>

        <div class="chat-container mb-3">
          <h1><!--Perguntas aqui--></h1>
        </div>

        <div class="chat-container mb-3">
          <h1>{{ perguntas[currentQuestionIndex].texto }}</h1>
        </div>

        <div>

          <div
              v-if="perguntas[currentQuestionIndex].tipo === 'RADIO'"
              class="flex flex-wrap justify-content-center gap-2"
          >
            <div
                class="chat-card-resposta p-3 border-round surface-card cursor-pointer"
                v-for="resposta in perguntas[currentQuestionIndex].respostas"
                :key="resposta.value"
                :class="{ 'selected-answer justify-content-center flex': selectedAnswer[currentQuestionIndex] === resposta.value }"
                @click="selectAnswer(resposta.value, currentQuestionIndex)"
            >
              {{ resposta.label }}
            </div>
          </div>

          <div v-if="perguntas[currentQuestionIndex].tipo === 'TEXT_INPUT'" class="p-fluid">
            <InputText
                v-model="textAnswer"
                placeholder="Digite sua resposta aqui"
                class="w-full"
            />
          </div>

          <div v-if="perguntas[currentQuestionIndex].tipo === 'DATE'" class="p-fluid flex grid gap-5">
            <Calendar v-model="dataInicial" dateFormat="dd/mm/yy" placeholder="dd/mm/yy"/>

            <Calendar v-model="dataFinal" dateFormat="dd/mm/yy" placeholder="dd/mm/yy"/>
          </div>

          <div v-if="perguntas[currentQuestionIndex].tipo === 'RANGE'" class="p-fluid">
            <div class="gap-2 flex flex-column p-m-3">
              <InputText v-model.number="rangeValue" class="p-mb-3"/>
              <Slider v-model="rangeValue" :min="0" :max="10000" class="p-mt-3"/>
            </div>
          </div>
        </div>

        <div class="flex justify-content-center mt-3 gap-3">
          <Button class="botao-azul" :class="currentQuestionIndex === 0 ? 'text-gray' : 'text-white'" @click="goToPreviousQuestion" :disabled="currentQuestionIndex === 0" label="Anterior" severity="warn"
                  raised/>
          <!-- <Button label="Não tenho preferência" severity="secondary" raised/> -->
          <Button class="botao-azul" :class="'text-white'" @click="goToNextQuestion" :label="currentQuestionIndex === perguntas.length - 1 ? 'Finalizar' : 'Próximo'"
                  severity="warn" raised/>
        </div>
        <div class="slider-container mt-5">
          <div class="slider-value">{{ sliderValue }}</div>
          <input
              type="range"
              v-model="sliderValue"
              :min="min"
              :max="max"
              class="slider"
          />
        </div>
        <!-- <Button label="Abrir Modal" icon="pi pi-external-link" @click="showDialog = true"/> -->
      </div>
    </div>
  </div>

  <Dialog v-model:visible="dialogVisualizarViagem" modal header="Visualizar viagem gerada" :style="{ width: '40rem' }">
    <p>
      Roteiro de Viagem - {{ viagemSelecionada.destino }}
    </p>
    <p>
      {{ viagemSelecionada.dataInicio }} a {{ viagemSelecionada.dataFim }} ({{ viagemSelecionada.conteudo.total_dias }} dias)
    </p>
  
      <p>Custo total estimado: <strong>{{ formatCurrency(viagemSelecionada.custo_total_estimado) }}</strong></p>
  
      <h3>Atividades Recomendadas</h3>
      <ul>
        <li v-for="(atividade, index) in viagemSelecionada.conteudo.atividades_recomendadas" :key="index">
          <strong>{{ atividade.atividade }}</strong> - 
          {{ formatCurrency(atividade.custo_estimado) }}<br />
          <em>{{ atividade.descrição }}</em>
        </li>
      </ul>
  
      <h3>Hospedagem</h3>
      <ul>
        <li v-for="(hotel, index) in viagemSelecionada.conteudo.hospedagem" :key="index">
          <strong>{{ hotel.hotel }}</strong> ({{ hotel.estrelas }} estrelas)<br />
          Cidade: {{ hotel.cidade }} - Noites: {{ hotel.noites }}<br />
          Custo por noite: {{ formatCurrency(hotel.custo_por_noite) }}<br />
          Custo total: {{ formatCurrency(hotel.custo_total) }}
        </li>
      </ul>
  
      <h3>Passagens Aéreas</h3>
      <p>
        <strong>{{ viagemSelecionada.conteudo.passagens_aereas.origem }}</strong> para 
        <strong>{{ viagemSelecionada.conteudo.passagens_aereas.destino }}</strong> - 
        Companhia: {{ viagemSelecionada.conteudo.passagens_aereas.companhia_aerea }}<br />
        Ida: {{ formatDate(new Date(viagemSelecionada.conteudo.passagens_aereas.detalhes_voo.data_ida)) }} 
        ({{ viagemSelecionada.conteudo.passagens_aereas.detalhes_voo.duracao_voo_ida }})<br />
        Volta: {{ formatDate(new Date(viagemSelecionada.conteudo.passagens_aereas.detalhes_voo.data_volta)) }} 
        ({{ viagemSelecionada.conteudo.passagens_aereas.detalhes_voo.duracao_voo_volta }})<br />
        Custo total: {{ formatCurrency(viagemSelecionada.conteudo.passagens_aereas.custo_total) }}
      </p>
    <div class="flex justify-content-end gap-2">
        <Button type="button" label="Fechar" severity="secondary" @click="dialogVisualizarViagem = false"></Button>
    </div>
</Dialog>
  
</template>

<style scoped>
.selected-answer {
  background-color: rgba(23, 32, 215, 0);
  font-weight: bold;
}

.background-image {
  background-image: url("@/assets/images/backgroundTelaInicial.png");
  min-height: 100vh;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: bottom;
}

.azul {
  color: #3d4b87
}

.icones-hover:hover {
  transition: 0.1s linear all;
  color: #374151;
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
  gap: 3px;
  background-color: #fefefe;
  margin-bottom: 20px;
  padding: 25px;
  border-radius: 10px;
  transition: 0.1s linear all;
}

.item-viagemGerada:hover {
  background-color: #ececf2;
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
  cursor: pointer;
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
  display: flex;
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
  display: none;
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

.chat-input-area button {
  border-radius: 0px 20px 20px 0px;
  padding-right: 10px;
  background-color: rgba(236, 236, 236, 0.88);
  border: none;
  outline: none;
}

.chat-card-resposta {
  cursor: pointer;
  transition: 0.1s all linear;
  display: flex;
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
  display: none;
}

.slider {
  width: 25rem;
  display: none;
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

@media (width < 700px) {
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

.p-button {
  color: white !important
}

.botao-azul {
  background: #3d4b87;
  border: 1px solid #3d4b87;
}

</style>
