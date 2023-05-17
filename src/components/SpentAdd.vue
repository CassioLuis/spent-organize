<script setup>
import { ref, reactive } from 'vue';
import { useSpentsStore } from '@/stores/spents.js';
import { useCategoriesStore } from '@/stores/categories.js'
import { inputValidation } from '@/utils/inputValidation.js'
import Selector from '@/components/Selector.vue'

const spents = useSpentsStore()
const { getCategories } = useCategoriesStore()

const { add } = spents
const date = ref(new Date());

let newSpent = reactive({
  date: date.value.toISOString().substring(0, 10),
  description: '',
  category: '',
  creditCard: true,
  quota: '',
  spentValue: ''
})

const addSpent = async () => {
  if (!inputValidation(newSpent)) return
  await add(newSpent)
}

let showForm = ref(true)
const generateQuota = () => Array.from({ length: 24 }, (_, i) => String(i + 1))
const showAddSpentForm = () => showForm.value = !showForm.value
</script>
<template>
  <div class="w-full font-semibold relative">
    <div class="flex flex-col gap-2 border-t border-gray-700 pt-4" v-if="showForm" key="addSpentGroup">
      <div class="flex gap-2 text-gray-300 text-sm">
        <div class="flex flex-col grow basis-1">
          <label for="date">Data:</label>
          <Datepicker id="date" v-model="date" auto-apply locale="pt-BR" :enable-time-picker="false" format="dd/MM/yyyy"
            dark class="h-8 mb-2" />
          <label for="description">Descrição:</label>
          <input id="description" type="text" v-model="newSpent.description" v-focus class="input border">
        </div>
        <div class="flex flex-col grow basis-1">
          <div class="flex flex-col grow">
            <label for="categories">Categoria:</label>
            <Selector :options="getCategories" v-model="newSpent.category" class="input" />
          </div>
          <div class="flex grow gap-2">
            <div class="flex flex-col grow justify-between">
              <label for="spentValue">Parc:</label>
              <Selector :options="generateQuota()" v-model="newSpent.quota" :value="newSpent.quota" class="input"
                @keyup.enter="addSpent" />
            </div>
            <div class="flex flex-col grow">
              <label for="spentValue">Valor:</label>
              <input id="spentValue" type="number" v-model="newSpent.spentValue" @keyup.enter="addSpent" class="input">
            </div>
          </div>
        </div>
      </div>
      <div class="w-full flex justify-end gap-1 items-baseline">
        <button @click="showAddSpentForm" class="btn">Cancelar</button>
        <button @click="addSpent" class="btn">Salvar</button>
      </div>
    </div>
    <button @click="showAddSpentForm" v-if="!showForm" key="addSpentButton"
      class="p-1 text-center align-middle text-4xl cursor-pointer hover:text-white hover:rounded-sm hover:bg-green-300 transition-all w-full rounded bg-green-400">
      +
      <!-- <font-awesome-icon :icon="['fas', 'plus']" /> -->
    </button>
  </div>
</template>

<!-- <script>
import Selector from '../components/Selector.vue'
// import DatePicker from 'vue2-datepicker';
// import 'vue2-datepicker/index.css';
// import 'vue2-datepicker/locale/pt-br';
// import { v4 as uuidv4 } from 'uuid';

export default {
  name: 'SpentAdd',
  components: { Selector /*DatePicker*/ },
  data() {
    return {
      showForm: true,
      shouldFocus: true,
      spent: {
        // id: uuidv4(),
        date: new Date().toISOString().substring(0, 10),
        description: '',
        category: '',
        spentValue: '',
        creditCard: true,
        quota: ''
      }
    }
  },
  directives: {
    focus: {
      inserted(el) {
        el.focus()
      }
    }
  },
  methods: {
    showAddSpentForm() {
      return this.showForm = !this.showForm
    },
    
    addSpent() {
      if (!this.inputValidation(this.spent)) return;
      this.$store.commit('spents/addSpent', this.spent);
      this.spent = {
        // id: uuidv4(),
        date: new Date().toISOString().substring(0, 10),
        description: '',
        category: this.spent.category,
        spentValue: '',
        creditCard: true,
        quota: ''
      }
    }
  },
  computed: {
    categories() {
      return this.$store.state.categories.categoryList
    },
    generateQuota() {
      return Array.from({ length: 24 }, (_, i) => String(i + 1));
    }
  }
}
</script> -->
