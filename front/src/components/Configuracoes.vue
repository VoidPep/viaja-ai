<script setup>
import AlterarInfo from "./AlterarInfos.vue"

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
        { text: "Pagamentos" },
        { text: "Gerenciar Planos" },
    ]

    selecionado.value = menuItems.value[0]
})
</script>
<template>
    <div class="flex">
        <div class="sidebar" :class="{ 'is-collapsed': isCollapsed }">
            <nav v-if="!isCollapsed">
                <ul>
                    <li v-for="item in menuItems" :key="item.text">
                        <a @click="selecionado = item" href="javascript:">{{ item.text }}</a>
                    </li>
                </ul>
            </nav>
        </div>
        
        <div class="w-full">
            <AlterarInfo v-show="selecionado === menuItems[0]"></AlterarInfo>
        </div>
    </div>
</template>

<style scoped>
.sidebar {
    width: 250px;
    height: 100vh;
    background: #333;
    color: #fff;
    padding: 1rem;
    transition: width 0.3s;
    overflow: hidden;
}

.sidebar.is-collapsed {
    width: 60px;
}

.toggle-btn {
    background: #444;
    border: none;
    color: white;
    padding: 0.5rem;
    cursor: pointer;
}

nav ul {
    list-style: none;
    padding: 0;
}

nav ul li {
    margin: 1rem 0;
}

nav ul li a {
    color: white;
    text-decoration: none;
}

nav ul li a:hover {
    text-decoration: underline;
}
</style>