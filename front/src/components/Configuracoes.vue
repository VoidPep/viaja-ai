<script setup>
import AlterarInfo from "./AlterarInfos.vue"
import MetodosPagamento from "./MetodosPagamento.vue"

import { onMounted, ref } from 'vue';

const isCollapsed = ref(false);

const menuItems = ref([]);
const selecionado = ref({})

const toggleSidebar = () => {
    isCollapsed.value = !isCollapsed.value;
};

onMounted(() => {
    menuItems.value = [
        { text: "Perfil" },
        { text: "Pagamentos"}
    ];

    selecionado.value = menuItems.value[0];
});
</script>

<template>
    <div class="flex">
        <!-- Sidebar -->
        <div class="sidebar" :class="{ 'is-collapsed': isCollapsed }">
            <nav v-if="!isCollapsed">
                <ul>
                    <li v-for="item in menuItems" :key="item.text">
                        <a 
                            @click="selecionado = item" 
                            href="javascript:"
                            :class="{ 'active': selecionado === item }"
                        >
                            {{ item.text }}
                        </a>
                    </li>
                </ul>
            </nav>
            
            <!-- Back Button -->
            <router-link to="/" class="btn-back">
                Voltar
            </router-link>
        </div>
        
        <!-- Content Area -->
        <div style="width: 100%;">
            <AlterarInfo v-show="selecionado === menuItems[0]" />
            <MetodosPagamento v-show="selecionado === menuItems[1]" />
        </div>
    </div>
</template>

<style scoped>
/* Sidebar Styles */
.sidebar {
    width: 300px;
    height: 100vh;
    background: #1E2A47;
    color: #fff;
    padding: 1rem;
    transition: width 0.3s ease, background-color 0.3s ease;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.sidebar.is-collapsed {
    width: 60px;
}

.sidebar a {
    display: block;
    padding: 12px;
    color: #fff;
    text-decoration: none;
    font-size: 1rem;
    border-radius: 8px;
    transition: background-color 0.3s ease, padding-left 0.3s ease;
}

.sidebar a.active {
    background-color: #007bff;
    padding-left: 20px;
}

.sidebar a:hover {
    background-color: #0056b3;
    padding-left: 20px;
}

/* Back Button Style */
.btn-back {
    margin-top: auto;
    border: 1px solid #444;
    color: white;
    padding: 12px;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.btn-back:hover {
    background-color: #1abc9c;
}

/* Navigation Links Styles */
nav ul {
    list-style: none;
    padding: 0;
}

nav ul li {
    margin: 1rem 0;
}

/* Content Area */
.w-full {
    flex: 1;
    padding-left: 1rem;
    transition: padding-left 0.3s ease;
}

/* Optional: Add a transition to the content area when the sidebar collapses */
.sidebar.is-collapsed + .w-full {
    padding-left: 0;
}

</style>
