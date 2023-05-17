import './assets/base.css'

import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import { createPinia } from 'pinia'

import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(createPinia)

app.component('Datepicker', Datepicker);
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
