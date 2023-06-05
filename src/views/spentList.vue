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
const { resetDataToDoughnutSummaryMonthly, resetDataToChartLineByCategoryYearly, changeCategory } = charts
const { getChartLineByCategoryYearly, getDoughnutSummaryMonthly, getSpentsByMounth, getCategoriesFromCharts } = storeToRefs(charts)

const data = reactive({
  dataChart: {},
  showForm: false
})

onBeforeMount(() => {
  resetDataToDoughnutSummaryMonthly()
  resetDataToChartLineByCategoryYearly()
})

watch(getSpentsByMounth, () => {
  resetDataToChartLineByCategoryYearly()
  resetDataToDoughnutSummaryMonthly()
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
  <div class="flex w-full h-full gap-3">
    <div class="grow flex flex-col gap-3">
      <div class="flex rounded-sm bg-gray-800 p-2 items-center relative">
        <font-awesome-icon :icon="['fas', 'chevron-right']" @click="changePeriod('prev')"
          class="rotate-180 cursor-pointer w-2 hover:text-gray-100 transition-all px-2 py-4 h-full rounded-r" />
        <Datepicker v-model="date" month-picker auto-apply locale="pt-BR" dark
          class="grow basis-1 flex justify-center h-14 border-none rounded" />
        <font-awesome-icon :icon="['fas', 'chevron-right']" @click="changePeriod('next')"
          class="cursor-pointer w-2 hover:text-gray-100 transition-all px-2 py-4 h-full rounded-r" />
        <div class="flex items-center justify-center flex-grow basis-1 h-full font-semibold">{{
          convertToCurrency(getTotal) }}</div>
        <button @click="() => data.showForm = !data.showForm" :class="{ 'bg-gray-600 text-white': data.showForm }"
          class="text-4xl btn p-4">
          <font-awesome-icon :icon="['fas', 'plus']" />
        </button>
        <SpentAdd v-if="data.showForm" :showFormProp="data.showForm" class="absolute right-2 top-20" />
      </div>
      <div class="overflow-y-auto">
        <div class="flex flex-col gap-2 p-4 rounded-sm bg-gray-800">
          <div class="flex flex-col grow basis-1">
            <Spent :spent-list="getSpents" />
          </div>
        </div>
        <div class="flex w-full items-center gap-20 py-4 rounded-sm font-semibold">
          <ChartDoughnut :data-doughnut="getDoughnutSummaryMonthly" class="h-[30vh] grow basis-1" />
          <div class="grow basis-1">
            <Selector @change="changeCategory(data.category)" v-model="data.category" :value="charts.category"
              :options="getCategoriesFromCharts" class="input w-full h-12" />
            <ChartLine :dataChartLine="getChartLineByCategoryYearly" :categories="getCategoriesFromCharts" />
          </div>
        </div>
      </div>
    </div>
    <div class="basis-80 flex flex-col h-full justify-between p-4 border-gray-700 bg-gray-800 rounded-sm font-semibold">
      <SpentTotalizer :totalizer-spents="getSummary" class="w-full" />
    </div>
  </div>
</template>