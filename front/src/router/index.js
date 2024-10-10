import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'tela-inicial',
    meta: { title: 'Viaja-ai' },
    component: () => import('@/components/TelaInicial.vue')
  },
  {
    path: '/login',
    name: 'login',
    meta: { title: 'Login' },
    component: () => import('@/components/CadastroUsuario.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
