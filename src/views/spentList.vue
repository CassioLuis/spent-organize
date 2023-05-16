<script setup>
import { useSpentsStore } from '../stores/spents'
import SpentAdd from '../components/SpentAdd.vue'
import { convertToCurrency } from '../utils/convertToCurrency.js'
import { ref } from 'vue';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import Spent from '../components/Spent.vue'

const date = ref();
const spents = useSpentsStore()

</script>

<template>
  <div class="flex w-full h-screen gap-3 mb-4">
    <div class="flex flex-col h-full grow basis-1 gap-3">
      <div class="flex border rounded border-gray-500 p-1 items-center">
        <font-awesome-icon :icon="['fas', 'chevron-right']" @click="previosMonth"
          class="rotate-180 cursor-pointer text-xl hover:text-gray-100 transition-all px-2 py-4 h-full rounded-r" />
        <Datepicker v-model="date" type="month" value-type class="flex-grow basis-1 h-full text-center cursor-pointer" />
        <font-awesome-icon :icon="['fas', 'chevron-right']" @click="nextMonth"
          class="cursor-pointer text-xl hover:text-gray-100 transition-all px-2 py-4 h-full rounded-r" />
        <div class="flex items-center justify-center flex-grow basis-1 h-full font-semibold">{{
          convertToCurrency(spents.getTotal) }}</div>
      </div>

      <div class="flex flex-col h-full gap-2 p-4 border rounded border-gray-500">
        <div class="flex flex-col grow basis-1 overflow-y-auto">
          <Spent :spent-list="spents.getSpents" />
        </div>
        <div>
          <SpentAdd />
        </div>
      </div>
    </div>
    <div class="flex flex-col justify-between border-gray-500 grow basis-1 border rounded p-4 font-semibold">
      <div class="pb-2 flex gap-1">
        <NuxtLink v-for="{ name, route, id } in menuItens" :key="id" :to="route" class="btn">
          {{ name }}
        </NuxtLink>
      </div>
      <NuxtChild :month="month" class="grow" />
    </div>
  </div>
</template>

<script>
// import SpentAdd from '../components/SpentAdd.vue'
// import Spent from '../components/Spent.vue'
// import DatePicker from 'vue2-datepicker';
// import 'vue2-datepicker/index.css';
// import 'vue2-datepicker/locale/pt-br';
// import { mapGetters } from 'vuex'
// import { getAllSpents } from '../services/spents.services.js'

// export default {
//   components: { SpentAdd, Spent, /*DatePicker*/ },
//   name: 'spentlist',
//   layout: 'default',
//   data() {
//     return {
//       month: new Date().toISOString().substring(0, 7),
//       menuItens: [
//         {
//           name: 'Resumo',
//           route: '/spentlist/totalizer',
//         },
//         {
//           name: 'Grafico',
//           route: '/spentlist/grafico',
//         }
//       ]
//     }
//   },
  // async asyncData({ $axios }) {
  //   const posts = await $axios.$get('spents')
  //   console.log(posts);
  //   return { posts }
  // },
  // mounted() {
  //   this.findAllSpents()
  // },
  // methods: {
  //   async findAllSpents() {
  //     const response = await getAllSpents();
  //     console.log(response.data.results);
  //   },
  //   convertToCurrency(value) {
  //     return parseFloat(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  //   },
  //   convertToNumber(value) {
  //     return parseFloat(value)
  //   },
  //   isCategoryOfOthers(param) {
  //     return this.getCategories.filter(item => item.otherPeople === param).map(item => item.name)
  //   },
  //   convertDateStringToUTCDate(param) {
  //     return new Date(
  //       Date.UTC(
  //         Number(param.substring(0, 4)),
  //         Number(param.substring(5, 7)) - 1,
  //         Number(param.substring(8, 10)),
  //         12, // hora do dia em UTC (meio-dia)
  //         0, // minutos em UTC
  //         0 // segundos em UTC
  //       ))
  //   },
  //   previosMonth() {
  //     const date = this.convertDateStringToUTCDate(this.month + '-01')
  //     const getMonth = date.getMonth()
  //     const previosMonth = date.setMonth(getMonth - 1)
  //     const previosMonthToDate = new Date(previosMonth)
  //     const previosMonthToString = previosMonthToDate.toISOString().substring(0, 7)
  //     this.month = previosMonthToString
  //   },
  //   nextMonth() {
  //     const date = this.convertDateStringToUTCDate(this.month + '-01')
  //     const getMonth = date.getMonth()
  //     const nextMonth = date.setMonth(getMonth + 1)
  //     const nextMonthToDate = new Date(nextMonth)
  //     const nextMonthToString = nextMonthToDate.toISOString().substring(0, 7)
  //     this.month = nextMonthToString
  //   }
  // },
  // computed: {
    // spents() {
    //   return this.$store.state.spents.spentList.filter(spent => spent.date.substring(0, 7) === this.month)
    // },
    // sumTotal() {
    //   return this.spents.filter(spent => spent.creditCard).reduce((acc, spent) => acc + this.convertToNumber(spent.spentValue), 0)
    // },
    // totalizerSpents() {
    //   return Object.entries(
    //     this.spents.reduce((acc, spent) => {
    //       const category = spent.category;
    //       const spentValue = Number(spent.spentValue);
    //       acc[category] = (acc[category] || 0) + spentValue;
    //       return acc;
    //     }, {})
    //   ).map(([category, spentValue]) => ({ category, spentValue }));
    // },
    // ...mapGetters({
    //   getCategories: 'categories/getCategories'
    // })
//   }
// }
// </script>