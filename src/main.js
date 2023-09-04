import './assets/base.css'

import { createApp, ref } from 'vue'
import App from './App.vue'

import router from './router'
import { createPinia } from 'pinia'

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

const spents = useSpentsStore()
const { httpRequestSpents, changeMonth, resetSummary } = spents
const categories = useCategoriesStore()
const { httpRequestCategories } = categories

const date = {
  month: new Date().getMonth(),
  year: new Date().getFullYear()
}

changeMonth(date)
async function fetchData() {
  await httpRequestCategories()
  await httpRequestSpents()
}
await fetchData()
resetSummary()

app.component('Datepicker', Datepicker);
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
