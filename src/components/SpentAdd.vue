<script setup>
import { reactive, defineProps } from 'vue';
import { useSpentsStore } from '@/stores/spents.js';
import { useCategoriesStore } from '@/stores/categories.js'
import { inputValidator } from '@/utils/inputValidator.js'
import Selector from '@/components/Selector.vue'
import { storeToRefs } from 'pinia';


const props = defineProps({
  showFormProp: {
    type: Boolean
  }
})

console.log(props.showFormProp);

const spents = useSpentsStore()
const { add } = spents

const categories = useCategoriesStore()
const { getFilteredCategories } = storeToRefs(categories)

const data = reactive({
  showForm: false
})

const newSpent = reactive({
  date: new Date(),
  description: '',
  category: '',
  creditCard: true,
  quota: '',
  spentValue: ''
})

const cleanInputs = () => {
  newSpent.description = ''
  newSpent.quota = ''
  newSpent.spentValue = ''
}

const addSpent = async () => {
  if (!inputValidator(newSpent)) return
  await add(newSpent)
  cleanInputs()
}
</script>
<template>
  <div class="font-semibold bg-slate-800 p-4 rounded-sm shadow-lg border border-slate-700">
    <div class="flex flex-col gap-4">
      <div class="flex gap-2 text-gray-300 text-sm">
        <div class="flex flex-col grow basis-1">
          <label for="date">Data:</label>
          <Datepicker id="date" v-model="newSpent.date" auto-apply locale="pt-BR" :enable-time-picker="false"
            format="dd/MM/yyyy" dark class="mb-2 h-9" />
          <label for="description">Descrição:</label>
          <input id="description" type="text" v-model="newSpent.description" v-focus class="input">
        </div>
        <div class="flex flex-col grow basis-1">
          <div class="flex flex-col grow">
            <label for="categories">Categoria:</label>
            <Selector :options="getFilteredCategories" v-model="newSpent.category" class="input" />
          </div>
          <div class="flex grow gap-2 items-center">
            <div class="flex flex-col grow basis-1 justify-between">
              <label for="spentQuotas">Parc:</label>
              <input id="spentQuotas" type="number" v-model="newSpent.quota" class="input w-full" />
            </div>
            <div class="flex flex-col grow basis-1">
              <label for="spentValue">Valor:</label>
              <input id="spentValue" type="number" v-model="newSpent.spentValue" @keyup.enter="addSpent"
                class="input w-full">
            </div>
          </div>
        </div>
      </div>
      <div class="w-full flex justify-end gap-2 items-baseline">
        <button @click="() => data.showForm = !data.showForm" class="btn grow basis-1">Cancelar</button>
        <button @click="addSpent" class="btn grow basis-1">Salvar</button>
      </div>
    </div>
    <!-- <button @click="() => data.showForm = !data.showForm" v-if="!data.showForm" class="text-4xl w-full btn py-4">
      <font-awesome-icon :icon="['fas', 'plus']" />
    </button> -->
  </div>
</template>