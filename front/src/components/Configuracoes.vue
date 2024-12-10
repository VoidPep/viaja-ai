<script setup>
import AlterarInfo from "./AlterarInfos.vue"


</script>
<template>
    <div class="sidebar" :class="{ 'is-collapsed': isCollapsed }">
        <nav v-if="!isCollapsed">
            <ul>
                <li v-for="item in menuItems" :key="item.text">
                    <a :href="item.link">{{ item.text }}</a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isCollapsed: false,
            menuItems: [
                { text: "Perfil", link: "/" },
                { text: "Pagamentos", link: "/Pagamentos" },
                { text: "Gerenciar Planos", link: "/Gerenciar" },
            ],
        };
    },
    methods: {
        toggleSidebar() {
            this.isCollapsed = !this.isCollapsed;
        },
    },
};

<AlterarInfo></AlterarInfo>

</script>

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