
<script setup>
import { ref } from 'vue';
import { endOfMonth, endOfYear, startOfMonth, startOfYear, subMonths } from 'date-fns';

const date = ref();

const presetRanges = ref([
  { label: 'Today', range: [new Date(), new Date()] },
  { label: 'This month', range: [startOfMonth(new Date()), endOfMonth(new Date())] },
  {
    label: 'Last month',
    range: [startOfMonth(subMonths(new Date(), 1)), endOfMonth(subMonths(new Date(), 1))],
  },
  { label: 'This year', range: [startOfYear(new Date()), endOfYear(new Date())] },
  {
    label: 'This year (slot)',
    range: [startOfYear(new Date()), endOfYear(new Date())],
    slot: 'yearly',
  },
])
</script>
<template>
  <Datepicker v-model="date" range :preset-ranges="presetRanges">
    <template #yearly="{ label, range, presetDateRange }">
      <span @click="presetDateRange(range)">{{ label }}</span>
    </template>
  </Datepicker>
</template>