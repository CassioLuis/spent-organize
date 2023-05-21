<script setup>
import Accordion from '@/components/Accordion.vue'
import { watch } from 'vue'
import { convertToCurrency } from '@/utils/convertToCurrency.js'
import { useSpentsStore } from '@/stores/spents.js'
import { storeToRefs } from 'pinia'

const spent = useSpentsStore()
const { getSpents, getSummary } = storeToRefs(spent)
const { expand, resetSummary, applyRightLight, removeRightLight } = spent

watch(getSpents, () => {
  resetSummary()
})
</script >
<template>
  <div>
    <div class="flex flex-col justify-between h-full">
      <p class="text-center border-b border-gray-700 text-lg font-semibold">Resumo</p>
      <div class="grow pt-4 overflow-y-auto flex flex-col gap-2">
        <Accordion v-for="totalizer in getSummary.summary" :class="totalizer.style" class="transition">
          <template #accordion-tittle>
            <div @click="expand(totalizer)" class="w-full flex justify-between">
              <span>{{ totalizer.category }}</span>
              <span>{{ convertToCurrency(totalizer.totalSpent) }}</span>
            </div>
          </template>
          <template #accordion-content>
            <li v-if="totalizer.expanded" v-for="{ description, spentValue, _id } in totalizer.spents" :key="_id"
              class="overflow-hidden flex justify-between gap-2 text-xs text-gray-400 border-gray-600">
              <div class="flex justify-between p-4 items-center w-full">
                <span>{{ description }}</span>
                <span>{{ convertToCurrency(spentValue) }}</span>
              </div>
            </li>
          </template>
        </Accordion>
      </div>
      <div>
        <p class="text-center border-b border-gray-700 mb-4 text-lg font-semibold">Sub Totais</p>
        <Accordion>
          <template #accordion-tittle>
            <span>Total de Debitos</span>
            <span>{{ convertToCurrency(getSummary.summarySubTotals.valorTotal) }}</span>
          </template>
          <template #accordion-content>
            <li v-for="{ subCat, totalSpent, category } in getSummary.summarySubTotals.listaCategorias"
              class="overflow-hidden flex justify-between gap-2 text-xs text-gray-400 border-gray-600">
              <div @mouseover="applyRightLight(category)" @mouseleave="removeRightLight()"
                class="flex justify-between p-4 items-center w-full hover:bg-gray-700 transition cursor-pointer">
                <span>{{ subCat }}</span>
                <span>{{ convertToCurrency(totalSpent) }}</span>
              </div>
            </li>
          </template>
        </Accordion>
      </div>
    </div>
  </div>
</template>