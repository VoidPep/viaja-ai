import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'tela-inicial',
    meta: { title: 'Viaja-ai' },
    component: () => import('@/components/GerarViagem.vue')
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
    component: () => import('@/components/TelaPagamentoStrippe.vue')
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
  {
    path: '/termos-de-servico',
    name: 'Termos de uso',
    meta: { title: 'Termos de uso' },
    component: () => import('@/components/TermosDeServico.vue'),
    allowAnnonymous: true
  },
  {
    path: '/configuracoes',
    name: 'Configurações',
    meta: { title: 'Configurações' },
    component: () => import('@/components/Configuracoes.vue'),
    allowAnnonymous: true
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

function validar(user, to) {
  if (to.path === "/home")
    return null

  if (!user && to.path != '/login' && !to.allowAnnonymous)
    return "/login"

  return null
}

router.beforeEach((to, from, next) => {
  const user = localStorage.getItem("user");

  const validate = validar(user, to)

  next(validate);
})


export default router