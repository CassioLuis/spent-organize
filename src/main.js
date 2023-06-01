import './assets/base.css'

import { createApp, ref } from 'vue'
import App from './App.vue'

import router from './router'
import { createPinia } from 'pinia'

import VueApexCharts from 'vue3-apexcharts'
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { useSpentsStore } from '@/stores/spents'
import { useCategoriesStore } from '@/stores/categories'


library.add(fas)

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(createPinia)
app.use(VueApexCharts)

const spents = useSpentsStore()
const { httpRequestSpents, changeMonth, resetSummary } = spents
const categories = useCategoriesStore()
const { httpRequestCategories } = categories

const month = new Date().getMonth()
const year = new Date().getFullYear()
const date = ref({ month, year });

changeMonth(date)
await httpRequestCategories()
await httpRequestSpents()
resetSummary()

app.component('Datepicker', Datepicker);
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
