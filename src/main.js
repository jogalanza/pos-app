import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { Quasar } from 'quasar'
import eventBus from './bus/eventBus'
import quasarUserOptions from './quasar-user-options'
//import axios from 'axios'
import server from './server'
import { createPinia } from "pinia"
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

import './assets/scss/app.scss'

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const app = createApp(App)
    .use(Quasar, quasarUserOptions)
    .use(router)
    .use(pinia)

app.config.globalProperties.$eventHub = eventBus
app.config.globalProperties.$http = server// axios

app.mount('#app')

