<script setup>
import { watch } from 'vue'
import { storeToRefs } from 'pinia'
import { convertToCurrency } from '@/utils/convertToCurrency.js'
import Accordion from '@/components/Accordion.vue'
import { useSpentsStore } from '@/stores/spents.js'

const spent = useSpentsStore()
const { getSpents, getSummary } = storeToRefs(spent)
const { expand, resetSummary, applyRightLight, removeRightLight } = spent

watch(getSpents, () => {
  resetSummary()
}, { deep: true })

</script >
<template>
  <div class="flex flex-col h-full justify-between">
    <div class="flex flex-col justify-between h-full overflow-y-auto py-4">
      <p class="text-center text-lg font-semibold">Resumo</p>
      <div class="grow py-4 flex flex-col gap-2 overflow-y-auto">
        <Accordion v-for="totalizer in getSummary.summary">
          <template #accordion-tittle>
            <div @click="expand(totalizer)"
              :class="totalizer.style || 'bg-gray-700', { 'rounded-none rounded-t': totalizer.expanded }"
              class="py-2 px-4 w-full h-full flex justify-between rounded transition-all">
              <span>{{ totalizer.category }}</span>
              <span>{{ convertToCurrency(totalizer.totalSpent) }}</span>
            </div>
          </template>
          <template #accordion-content>
            <li v-if="totalizer.expanded" v-for="{ description, spentValue, _id } in totalizer.spents" :key="_id"
              class="overflow-hidden flex justify-between gap-2 text-sm text-gray-400 bg-gray-700">
              <div class="flex justify-between items-center py-5 px-5 w-full">
                <span>{{ description }}</span>
                <span>{{ convertToCurrency(spentValue) }}</span>
              </div>
            </li>
          </template>
        </Accordion>
      </div>
    </div>
    <div>
      <p class="text-center mb-4 text-lg font-semibold">Sub Totais</p>
      <div class="rounded bg-gray-700 p-2">
        <div class="pt-2 pb-4 px-2 flex justify-between font-semibold">
          <span>Total de Debitos</span>
          <span>{{ convertToCurrency(getSummary.summarySubTotals.valorTotal) }}</span>
        </div>
        <div>
          <li v-for="{ subCat, totalSpent, category } in getSummary.summarySubTotals.listaCategorias"
            class="overflow-hidden flex justify-between gap-2 text-sm text-gray-400 border-gray-600">
            <div @mouseover="applyRightLight(category)" @mouseleave="removeRightLight()"
              class="flex justify-between py-2 px-3 items-center w-full hover:bg-gray-600 transition cursor-pointer">
              <span>{{ subCat }}</span>
              <span>{{ convertToCurrency(totalSpent) }}</span>
            </div>
          </li>
        </div>
      </div>
    </div>
  </div>
</template>