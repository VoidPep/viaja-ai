<script setup>
</script>

<template>
  <div class="container">
    <div class="navbar-container">
      <div class="navbar">
        <i class="pi pi-bars menu-icon"></i>
        <img class="logo" src="../../public/Images/logo-simplificada.png" alt="Logo">
        <div class="user-avatar"></div>
      </div>
    </div>
    <div class="chat-container">
      <div class="chat-background chatBox-container">
            <div class="chatBox p-5">
                <span class="chatbox-Title flex justify-content-start">Para onde vamos?</span>
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
    background-image: url("../../public/Images/backgroundTelaInicial.png");
    background-size: cover;
    background-position: center;
}

.chatBox-container {
    display: flex;
    align-items: center;
    justify-content: center;
}

.chatBox {
    width: 50%;
    background-color: #fff;
}

.chatbox-Title {
    font-size: 28px;
    font-weight: bold;
}
</style>
