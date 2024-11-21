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
  },
  {
    path: '/planos',
    name: 'planos',
    meta: { title: 'Planos' },
    component: () => import('@/components/Planos.vue')
  },
  {
    path: '/logout',
    name: 'logout',
    beforeEnter: async (to, from, next) => {
        localStorage.removeItem('user');

        next('/login');
    },
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const user = localStorage.getItem("user");

  if (!user && to.path != '/login')
    next('/login')

  next();
})

export default router
