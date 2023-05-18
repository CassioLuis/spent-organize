<script setup>
import { useCategoriesStore } from '@/stores/categories.js'
import Selector from '@/components/Selector.vue'
import { reactive } from 'vue'
import { storeToRefs } from 'pinia'

const categories = useCategoriesStore()
const { getCategories } = storeToRefs(categories)
const { addCategory, httpRequestCategories, removeCategory, updateSubCategorie } = categories

const data = reactive({
  category: {
    name: '',
    subCategory: ''
  },
  subCategories: ['Essencial', 'Dispensaveis', 'Outros', 'Eventuais']
})


const update = (id, name) => {
  const body = {
    id,
    name,
    subCategory: data.category.subCategory
  }
  updateSubCategorie(body)
}

httpRequestCategories()

</script>
<template>
  <div class="p-4 border rounded-sm border-gray-500 w-[100%] h-auto">
    <div class="flex gap-4">
      <input @keyup.enter="addCategory(data.category)" v-model="data.category.name"
        placeholder="Digite uma categoria e pressione enter!" class="w-full p-2 text-black rounded">
    </div>
    <div>
      <table class="w-full rounded">
        <thead class="text-xl block pt-4">
          <tr class="flex border-b border-gray-600 py-2">
            <th class="grow basis-1 text-left">Descrição</th>
            <th class="grow basis-1 text-center">Sub-Categoria</th>
            <th class="grow basis-1 text-center"></th>
          </tr>
        </thead>
        <tbody class="text-sm max-h-[70vh] flex flex-col overflow-auto px-4">
          <tr v-for="item in getCategories" class="flex py-1 font-semibold border-b border-gray-600">
            <td class="grow basis-1 flex items-center">{{ item.name }}</td>
            <td class="grow basis-1 flex items-center justify-center">
              <Selector @change="update(item._id, item.name)" :value="item.subCategory" v-model="data.category.subCategory" :required="true"
                :options="data.subCategories"
                class="h-8 px-2 bg-gray-800 text-white border rounded border-gray-600 cursor-pointer" />
            </td>
            <td class="grow basis-1 flex items-center justify-end">
              <font-awesome-icon class="cursor-pointer text-red-400" :icon="['fas', 'trash-can']"
                @click="removeCategory(item._id)" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>