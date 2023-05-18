<script setup>
import { reactive } from 'vue'
import { convertToCurrency } from '@/utils/convertToCurrency.js'
import { useSpentsStore } from '@/stores/spents.js'

const props = defineProps({
  spentList: {
    type: Array,
    required: true
  }
})

const data = reactive({
  sortKey: '',
  sortDirection: 'asc',
  tableHeaders: [
    {
      presentationName: '',
      classStyle: 'cursor-pointer w-1 text-transparent',
      icon: ['fas', 'sort-down']
    },
    {
      presentationName: 'Data',
      originalName: 'date',
      classStyle: 'cursor-pointer w-10',
      icon: ['fas', 'sort-down'],
    },
    {
      presentationName: 'Descrição',
      originalName: 'description',
      classStyle: 'cursor-pointer w-10',
      icon: ['fas', 'sort-down'],
    },
    {
      presentationName: 'Categoria',
      originalName: 'category',
      classStyle: 'cursor-pointer w-1',
      icon: ['fas', 'sort-down']
    },
    {
      presentationName: 'Parc.',
      originalName: 'quota',
      classStyle: 'cursor-pointer w-1 text-center',
      icon: ['fas', 'sort-down']
    },
    {
      presentationName: 'Valor',
      originalName: 'spentValue',
      classStyle: 'cursor-pointer w-10 text-right',
      icon: ['fas', 'sort-down']
    },
    {
      presentationName: '',
      classStyle: 'cursor-pointer w-1 text-transparent',
      icon: ['fas', 'sort-down']
    },
  ]
})

const spents = useSpentsStore()
const { removeSpent } = spents

</script>
<template>
  <div class="font-semibold text-sm">
    <table class="h-full w-full rounded">
      <thead class="text-lg text-left">
        <tr class="border-b border-gray-600">
          <th v-for="(tableHeader, index) in data.tableHeaders" :key="index" :class="tableHeader.classStyle"
            @click="sortBy(tableHeader.originalName)">
            {{ tableHeader.presentationName }}
            <font-awesome-icon v-if="sortKey === tableHeader.originalName" :icon="tableHeader.icon" :class="iconRotate"
              size="xs" />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in spentList" :key="item._id" class="h-12 border-b border-gray-600">
          <td class="text-center">
            <input class="cursor-pointer" type="checkbox" :checked="item.creditCard" @change="isACreditCardSpent(item)">
          </td>
          <td class="text-left text-xs text-gray-400">{{ item.presentationDate }}</td>
          <td>{{ item.description }}</td>
          <td>
            <span class="p-1 flex items-center justify-center rounded border border-gray-600 bg-gray-700 text-xs font-semibold text-gray-200">{{
              item.category }}</span>
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
<!-- <script>

export default {
  name: 'Spent',
  props: {
    spentList: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      sortKey: '',
      sortDirection: 'asc',
      tableHeaders: [
        {
          presentationName: '',
          classStyle: 'cursor-pointer w-1 text-transparent',
          icon: ['fas', 'sort-down']
        },
        {
          presentationName: 'Data',
          originalName: 'date',
          classStyle: 'cursor-pointer w-10',
          icon: ['fas', 'sort-down'],
        },
        {
          presentationName: 'Descrição',
          originalName: 'description',
          classStyle: 'cursor-pointer w-10',
          icon: ['fas', 'sort-down'],
        },
        {
          presentationName: 'Categoria',
          originalName: 'category',
          classStyle: 'cursor-pointer w-1',
          icon: ['fas', 'sort-down']
        },
        {
          presentationName: 'Parc.',
          originalName: 'quota',
          classStyle: 'cursor-pointer w-1 text-center',
          icon: ['fas', 'sort-down']
        },
        {
          presentationName: 'Valor',
          originalName: 'spentValue',
          classStyle: 'cursor-pointer w-10 text-right',
          icon: ['fas', 'sort-down']
        },
        {
          presentationName: '',
          classStyle: 'cursor-pointer w-1 text-transparent',
          icon: ['fas', 'sort-down']
        },
      ]
    }
  },
  methods: {
    // ...mapMutations({
    //   isACreditCardSpent: 'spents/isACreditCardSpent',
    //   remove: 'spents/remove'
    // }),
    sortBy(key) {
      if (this.sortKey === key) {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortKey = key;
        this.sortDirection = 'asc';
      }
    },
    removerAcentos(texto) {
      return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }
  },
  computed: {
    iconRotate() {
      return {
        'rotate-180': this.sortDirection === 'asc'
      }
    },
    newSortedSpentList() {
      return this.spentList.sort((a, b) => {
        let modifier = 1;
        if (this.sortDirection === 'desc') modifier = -1;
        let aValue = a[this.sortKey] ? this.removerAcentos(a[this.sortKey].toString().toLowerCase()) : '';
        let bValue = b[this.sortKey] ? this.removerAcentos(b[this.sortKey].toString().toLowerCase()) : '';
        if (aValue < bValue) return -1 * modifier;
        if (aValue > bValue) return 1 * modifier;
        return 0;
      });
    }
  }
}
</script> -->