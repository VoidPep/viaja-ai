<template>
    <div v-if="loading" class="loading-overlay">
      <div class="flex flex-column align-items-center">
        <h1 class="text-white fw-bold mt-5">{{ message }}</h1>
        <div class="spinner"></div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { inject } from 'vue';
  
  const { loading, message } = inject("loading");
  </script>
  
  <style scoped>
  .loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .spinner {
    border: 4px solid rgba(255, 255, 255, 0.3);
    border-top: 4px solid white;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  </style>
  