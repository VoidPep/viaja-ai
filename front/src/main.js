import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import './styles/style.scss'
import ToastService from 'primevue/toastservice';

const app = createApp(App);
app.use(PrimeVue);
app.use(ToastService);
app.use(router)
app.mount('#app')
