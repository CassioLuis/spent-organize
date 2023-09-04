<script setup>
import { reactive, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useCategoriesStore } from '@/stores/categories.js'
import Selector from '@/components/Selector.vue'
import { useSpentsStore } from '@/stores/spents.js'

const spent = useSpentsStore()
const { resetSummary } = spent

const categories = useCategoriesStore()
const { getFilteredCategories } = storeToRefs(categories)
const { addCategory, removeCategory, updateSubCategorie } = categories

const data = reactive({
  category: {
    name: '',
    subCategory: ''
  },
  subCategories: ['Essencial', 'Dispensaveis', 'Outros', 'Eventuais', 'Dividir']
})

const update = async (id, name) => {
  const body = {
    id,
    name,
    subCategory: data.category.subCategory
  }
  await updateSubCategorie(body)
  data.category.subCategory = ''
}

watch(getFilteredCategories, () => {
  resetSummary()
}, { deep: true })

</script>
<template>
  <div class="flex flex-col rounded-sm h-full w-full">
    <div class="flex gap-4 p-4 bg-gray-800 w-full">
      <input @keyup.enter="addCategory(data.category)" v-model="data.category.name"
        placeholder="Digite uma categoria e pressione enter!" class="w-full p-2 text-black rounded">
    </div>
    <table class="flex flex-col w-full grow bg-gray-800 p-4">
      <thead class="text-xl pt-4">
        <tr class="flex border-b border-gray-600 py-2 pb-4 px-2">
          <th class="grow basis-1 text-left">Descrição</th>
          <th class="grow basis-1 text-center">Sub-Categoria</th>
          <th class="grow basis-1 text-center"></th>
        </tr>
      </thead>
      <tbody class="grow basis-1 text-sm flex flex-col overflow-y-auto">
        <tr v-for="({ _id, name, subCategory }) in getFilteredCategories" :key="_id"
          class="flex py-1 px-4 font-semibold border-b border-gray-600">
          <td class="grow basis-1 flex items-center">{{ name }}</td>
          <td class="grow basis-1 flex items-center justify-center">
            <Selector @change="update(_id, name)" :value="subCategory" v-model="data.category.subCategory"
              :options="data.subCategories" :class="{ 'btn-danger': !subCategory, 'btn': subCategory }" />
          </td>
          <td class="grow basis-1 flex items-center justify-end">
            <font-awesome-icon class="cursor-pointer text-red-400" :icon="['fas', 'trash-can']"
              @click="removeCategory(_id)" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>