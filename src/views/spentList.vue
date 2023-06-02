<script setup>
import { useSpentsStore } from '@/stores/spents.js'
import { useChartsStore } from '@/stores/Charts.js'
import { ref, watch, reactive, onMounted, onBeforeMount } from 'vue';
import { storeToRefs } from 'pinia'
import SpentAdd from '@/components/SpentAdd.vue'
import Spent from '@/components/Spent.vue'
import SpentTotalizer from '@/components/SpentTotalizer.vue'
import ChartLine from '@/components/ChartLine.vue'
import ChartDoughnut from '@/components/ChartDoughnut.vue'
import Selector from '@/components/Selector.vue'
import { convertToCurrency } from '@/utils/convertToCurrency.js'
import { convertDateStringToUTCDate } from '@/utils/convertDateStringToUTCDate.js'
import { objDateToStringDate } from '@/utils/objDateToStringDate.js'


const spents = useSpentsStore()
const { getSpents, getTotal, getSummary } = storeToRefs(spents)
const { changeMonth } = spents

const charts = useChartsStore()
const { getChartLineByCategoryYearly, getDoughnutSummaryMonthly, getSpentsByMounth, getCategoriesFromCharts } = storeToRefs(charts)
const { setDataToDoughnutSummaryMonthly, setDataToChartLineByCategoryYearly, changeCategory } = charts

const data = reactive({
  category: 'Mercado',
  dataChart: {}
})

onBeforeMount(() => {
  changeCategory(data.category)
})

onMounted(() => {
})

setDataToDoughnutSummaryMonthly()
setDataToChartLineByCategoryYearly()

watch(getChartLineByCategoryYearly, () => {
  const dataChart = getChartLineByCategoryYearly.value
  const [content] = dataChart
  data.dataChart = content
  console.log(data.dataChart);
}, { deep: true })


watch(getSpentsByMounth, () => {
  setDataToChartLineByCategoryYearly()
  setDataToDoughnutSummaryMonthly()
}, { deep: true })

const month = new Date().getMonth()
const year = new Date().getFullYear()
const date = ref({ month, year });

const incrementsOrDecrementsPeriod = (date, param) => {
  const stringDate = objDateToStringDate(date)
  const utcDate = convertDateStringToUTCDate(stringDate + '-01')
  const utcMonth = utcDate.getMonth() + 1
  let newMonth
  if (param === 'next') newMonth = utcDate.setMonth(utcMonth + 1)
  if (param === 'prev') newMonth = utcDate.setMonth(utcMonth - 1)
  const newMonthToDate = new Date(newMonth)
  const month = newMonthToDate.getMonth()
  const year = newMonthToDate.getFullYear()
  return {
    month: month,
    year: year
  }
}

const changePeriod = (param) => {
  const newPeriod = incrementsOrDecrementsPeriod(date.value, param)
  date.value = newPeriod
}

watch(date, () => {
  changeMonth(date.value)
})
</script>
<template>
  <div class="flex w-full h-[92vh] gap-3 mb-4">
    <div class="grow basis-40 flex flex-col h-full gap-3">
      <div class="flex rounded-sm border-gray-700 bg-gray-800 p-2 items-center">
        <font-awesome-icon :icon="['fas', 'chevron-right']" @click="changePeriod('prev')"
          class="rotate-180 cursor-pointer w-2 hover:text-gray-100 transition-all px-2 py-4 h-full rounded-r" />
        <Datepicker v-model="date" month-picker auto-apply locale="pt-BR" dark
          class="grow basis-1 flex justify-center h-14 border-none rounded" />
        <font-awesome-icon :icon="['fas', 'chevron-right']" @click="changePeriod('next')"
          class="cursor-pointer w-2 hover:text-gray-100 transition-all px-2 py-4 h-full rounded-r" />
        <div class="flex items-center justify-center flex-grow basis-1 h-full font-semibold">{{
          convertToCurrency(getTotal) }}</div>
      </div>
      <div class="flex flex-col h-full gap-2 p-4 rounded-sm border-gray-700 bg-gray-800">
        <div class="flex flex-col grow basis-1 overflow-y-auto">
          <Spent :spent-list="getSpents" />
        </div>
        <div>
          <SpentAdd />
        </div>
      </div>
    </div>
    <!-- <div class="grow basis-1 flex flex-col justify-between p-4 border-gray-700 bg-gray-800 rounded-sm font-semibold">
      <SpentTotalizer :totalizer-spents="getSummary" class="w-full" />
    </div> -->
    <div class="grow basis-1 p-4 rounded-sm font-semibold">
      <div class="flex flex-col w-full gap-20 h-full">
        <ChartDoughnut :data-doughnut="getDoughnutSummaryMonthly" class="h-[30vh]" />
        <div>
          <Selector @change="changeCategory(data.category)" v-model="data.category" :value="data.category"
            :options="getCategoriesFromCharts" class="input w-full h-12" />
          <ChartLine :dataChartLine="data.dataChart" :categories="getCategoriesFromCharts" />
        </div>
      </div>
    </div>
  </div>
</template>