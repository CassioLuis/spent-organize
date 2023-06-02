<script setup>
import { reactive, watch } from 'vue'
import { storeToRefs } from 'pinia';
import { convertToCurrency } from '@/utils/convertToCurrency.js'
import { useSpentsStore } from '@/stores/spents.js'
import Selector from '@/components/Selector.vue';
import { useCategoriesStore } from '@/stores/categories';

const spents = useSpentsStore()
const { removeSpent, updateSpentCategory, updateSpentCreditCard } = spents
const categories = useCategoriesStore()
const { getFilteredCategories } = storeToRefs(categories)

const props = defineProps({
  spentList: {
    type: Array,
    required: true
  }
})

console.log(props.spentList);

const data = reactive({
  sortKey: '',
  sortDirection: 'asc',
  category: '',
  tableHeadersDefaultStyle: ' cursor-pointer font-semibold',
  tableHeaders: [
    {
      presentationName: '',
      classStyle: 'w-1 text-transparent',
      icon: ['fas', 'sort-down']
    },
    {
      presentationName: 'Data',
      originalName: 'date',
      classStyle: 'w-10 text-left',
      icon: ['fas', 'sort-down'],
    },
    {
      presentationName: 'Descrição',
      originalName: 'description',
      classStyle: 'w-10 text-left',
      icon: ['fas', 'sort-down'],
    },
    {
      presentationName: 'Categoria',
      originalName: 'category',
      classStyle: 'w-1 text-center',
      icon: ['fas', 'sort-down']
    },
    {
      presentationName: 'Parc.',
      originalName: 'quota',
      classStyle: 'w-1 text-center',
      icon: ['fas', 'sort-down']
    },
    {
      presentationName: 'Valor',
      originalName: 'spentValue',
      classStyle: 'w-10 text-right',
      icon: ['fas', 'sort-down']
    },
    {
      presentationName: '',
      classStyle: 'w-1 text-transparent',
      icon: ['fas', 'sort-down']
    },
  ]
})

</script>
<template>
  <div class="font-semibold text-sm">
    <table class="h-full w-full rounded">
      <thead class="text-lg">
        <tr class="border-b border-gray-600">
          <th v-for="(tableHeader, index) in data.tableHeaders" :key="index"
            :class="tableHeader.classStyle + data.tableHeadersDefaultStyle" @click="sortBy(tableHeader.originalName)">
            {{ tableHeader.presentationName }}
            <font-awesome-icon v-if="sortKey === tableHeader.originalName" :icon="tableHeader.icon" :class="iconRotate"
              size="xs" />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in spentList" :key="item._id" class="h-14 border-b border-gray-600">
          <td class="text-center">
            <input class="btn cursor-pointer" type="checkbox" :checked="item.creditCard"
              @change="updateSpentCreditCard(item._id)">
          </td>
          <td class="text-left text-xs text-gray-400">{{ item.presentationDate }}</td>
          <td>{{ item.description }}</td>
          <td class="flex justify-center items-center text-center h-full">
            <Selector @change="updateSpentCategory(item._id, data.category)" v-model="data.category" class="w-28"
              :options="getFilteredCategories" :value="item.category"
              :class="{ 'btn-danger': !item.category, 'btn': item.category }" />
          </td>
          <td class="text-center">{{ item.presentationQuota }} </td>
          <td class="text-right">{{ convertToCurrency(item.spentValue) }} </td>
          <td class="text-center">
            <font-awesome-icon class="cursor-pointer text-red-400" :icon="['fas', 'trash-can']"
              @click="removeSpent(item._id)" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>