import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'tela-inicial',
    meta: { title: 'Viaja-ai' },
    component: () => import('@/components/TelaInicial.vue')
  },
  {
    path: '/home',
    name: 'home',
    meta: { title: 'Viaja-ai' },
    component: () => import('@/components/Home.vue'),
    allowAnnonymous: true
  },
  {
    path: '/login',
    name: 'login',
    meta: { title: 'Login' },
    component: () => import('@/components/CadastroUsuario.vue')
  },
  {
    path: '/pagamento',
    name: 'tela-pagamento',
    meta: { title: 'Pagamento' },
    component: () => import('@/components/TelaPagamento.vue')
  },
  {
    path: '/planos',
    name: 'planos',
    meta: { title: 'Planos' },
    component: () => import('@/components/Planos.vue'),
    allowAnnonymous: true
  },
  {
    path: '/logout',
    name: 'logout',
    beforeEnter: async (to, from, next) => {
        localStorage.removeItem('user');

        next('/login');
    },
    allowAnnonymous: true
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const user = localStorage.getItem("user");

  const validate = validate(user, to)
  
  next();
})

function validate() {
  if(to.path === "/home")
    return null

  if (!user && to.path != '/login' && !to.allowAnnonymous)
    return "/login"

  return null
}

export default router
