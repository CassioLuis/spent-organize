<script setup>
import SpentAdd from '@/components/SpentAdd.vue'
import Spent from '@/components/Spent.vue'
import SpentTotalizer from '@/components/SpentTotalizer.vue';
import { ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { convertToCurrency } from '@/utils/convertToCurrency.js'
import { useSpentsStore } from '@/stores/spents.js'


const date = ref(new Date().toISOString().substring(0, 7));

const spents = useSpentsStore()
const { getSpents, getTotal, getSummary } = storeToRefs(spents)
const { changeMonth, httpRequestSpents, resetSummary } = spents
httpRequestSpents()

watch(date, () => {
  const { month, year } = date.value
  const newDate = `${year}-${month.toString().length === 1 ? '0' + (month + 1) : month}`
  changeMonth(newDate)
})
</script>
<template>
  <div class="flex w-full h-screen gap-3 mb-4">
    <div class="flex flex-col h-full grow basis-1 gap-3">
      <div class="flex border rounded-sm border-gray-600 p-1 items-center">
        <font-awesome-icon :icon="['fas', 'chevron-right']" @click="previosMonth"
          class="rotate-180 cursor-pointer w-2 hover:text-gray-100 transition-all px-2 py-4 h-full rounded-r" />
        <Datepicker v-model="date" month-picker auto-apply locale="pt-BR" dark
          class="grow basis-1 h-full text-center cursor-pointer" />
        <font-awesome-icon :icon="['fas', 'chevron-right']" @click="nextMonth"
          class="cursor-pointer w-2 hover:text-gray-100 transition-all px-2 py-4 h-full rounded-r" />
        <div class="flex items-center justify-center flex-grow basis-1 h-full font-semibold">{{
          convertToCurrency(getTotal) }}</div>
      </div>

      <div class="flex flex-col h-full gap-2 p-4 border rounded-sm border-gray-600">
        <div class="flex flex-col grow basis-1 overflow-y-auto">
          <Spent :spent-list="getSpents" />
        </div>
        <div>
          <SpentAdd />
        </div>
      </div>
    </div>
    <div class="flex flex-col justify-between border-gray-600 grow basis-1 border rounded-sm p-4 font-semibold">
      <div class="grow pb-2 flex gap-1">
        <SpentTotalizer :totalizer-spents="getSummary" class="w-full" />
      </div>
    </div>
  </div>
</template>
<style>
.dp__pointer {
  width: 100% !important;
}

.mx-input {
  @apply h-full w-full cursor-pointer text-center font-semibold text-sm bg-gray-800 text-white rounded border border-gray-600
}

.mx-input-wrapper {
  @apply h-full bg-gray-800
}

.mx-icon-calendar,
.mx-icon-clear {
  @apply text-white
}

.mx-calendar-header,
.mx-calendar {
  @apply bg-gray-800 text-white rounded
}

.mx-calendar-content .dp__overlay_cell_active {
  @apply bg-gray-600 !important
}

.dp__overlay_cell:hover {
  @apply bg-gray-300
}
</style>