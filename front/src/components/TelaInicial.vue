<script setup>
</script>

<template>
  <div class="container">
    <div class="navbar-container">
      <div class="navbar">
        <i class="pi pi-bars menu-icon"></i>
        <img class="logo" src="../assets/images/logo-simplificada.png" alt="Logo">
        <div class="user-avatar"></div>
      </div>
    </div>
    <div class="chat-container">
      <div class="chat-background chatbox-container">
            <div class="chatbox">
              <div class="chatbox-questions-area">
                <div class="chatbox-question">
                  <span class="chatbox-question-title flex justify-content-start pl-2">Para onde vamos porra?</span>
                  <select class="chatbox-answer-select">
                    <option disabled selected hidden>Selecione um país</option>
                    <option>oi</option>
                    <option>oi</option>
                  </select>
                </div><!-- div de pergunta e resposta com select-->
                <div class="chatbox-question">
                  <span class="chatbox-question-title flex justify-content-start pl-2">Para onde vamos porra?</span>
                  <select class="chatbox-answer-select">
                    <option disabled selected hidden>Selecione um país</option>
                    <option>oi</option>
                    <option>oi</option>
                  </select>
                </div><!-- div de pergunta e resposta com select-->
                <div class="chatbox-question">
                  <span class="chatbox-question-title flex justify-content-start pl-2">Para onde vamos porra?</span>
                  <select class="chatbox-answer-select">
                    <option disabled selected hidden>Selecione um país</option>
                    <option>oi</option>
                    <option>oi</option>
                  </select>
                </div><!-- div de pergunta e resposta com select-->
                <div class="chatbox-question">
                  <span class="chatbox-question-title flex justify-content-start pl-2">Para onde vamos porra?</span>
                  <select class="chatbox-answer-select">
                    <option disabled selected hidden>Selecione um país</option>
                    <option>oi</option>
                    <option>oi</option>
                  </select>
                </div><!-- div de pergunta e resposta com select-->
                <div class="chatbox-question">
                  <span class="chatbox-question-title flex justify-content-start pl-2">Para onde vamos porra?</span>
                  <select class="chatbox-answer-select">
                    <option disabled selected hidden>Selecione um país</option>
                    <option>oi</option>
                    <option>oi</option>
                  </select>
                </div><!-- div de pergunta e resposta com select-->
                <div class="chatbox-question">
                  <span class="chatbox-question-title flex justify-content-start pl-2">Para onde vamos porra?</span>
                  <select class="chatbox-answer-select">
                    <option disabled selected hidden>Selecione um país</option>
                    <option>oi</option>
                    <option>oi</option>
                  </select>
                </div><!-- div de pergunta e resposta com select-->
                <div class="chatbox-question">
                  <span class="chatbox-question-title flex justify-content-start pl-2">Para onde vamos porra?</span>
                  <select class="chatbox-answer-select">
                    <option disabled selected hidden>Selecione um país</option>
                    <option>oi</option>
                    <option>oi</option>
                  </select>
                </div><!-- div de pergunta e resposta com select-->
              </div>
              <div class="generateTrip-btn-area">
                <button>Gerar viagem</button>
              </div>
            </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.navbar-container {
  width: 100%;
  background-color: #f8f9fa;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
}

.menu-icon {
  font-size: 28px;
  color: #343a40;
  cursor: pointer;
}

.logo {
  width: 120px;
}

.user-avatar {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background-color: #6c757d;
  display: flex;
  justify-content: center;
}

.chat-container {
    flex: 1; 
    width: 100%;
    background-color: #000;
}

.chat-background {
    width: 100%;
    height: 100%;
    background-image: url("../assets/images/backgroundTelaInicial.png");
    background-size: cover;
    background-position: center;
}

.chatbox-container {
    display: flex;
    align-items: center;
    justify-content: center;
}

.chatbox {
    margin: 1rem;
    padding: 1rem;
    border-radius: 7px;
    width: 60%;
    background-color: #fff;
}

.chatbox-questions-area {
  height: 450px;
  overflow-y: scroll;
}

.chatbox-question {
  gap:15px;
  padding: 2rem;
  display:flex;
  justify-content: start;
  flex-direction: column;
}

.chatbox-answer-select {
  width: 90%;
  border: none; 
  outline: none; 
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 5px; 
  cursor: pointer; 
  font-size: 16px; 
  box-shadow: 2px 2px 6px #b8b8b8
}

.chatbox-question-title {
    font-size: 28px;
    font-weight: bold;
}

.generateTrip-btn-area{
  width: 95%;
  border-top: 1px solid #ddd;
  padding: 15px;
}

.generateTrip-btn-area button {
  transition: 0.1s all linear;
  background-color: #4289e8;
  margin-top: 15px;
  padding: 15px 40px;
  font-size: 20px;
  color: #111;
  font-weight: 500;
  border-radius: 6px;
  border:none;
}

.generateTrip-btn-area button:hover { 
  background-color: #6799db;
}

@media(max-width: 768px) {
  .chatbox {
    width: 90%;
  }

  .chatbox-answer-select  {
    width: 100%;
  }

}

@media(max-width: 500px) {
  .chatbox {
    width: 95%;
    padding: 1rem;
  }
  .chatbox-question {
    padding: 1.5rem 1rem;
  }
  .chatbox-question-title {
    font-size: 21px;
    font-weight: bold;
  }
  .generateTrip-btn-area button {
    padding: 10px 30px;
    font-size: 18px;
  }
}


</style>
