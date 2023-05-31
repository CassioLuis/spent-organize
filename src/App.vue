<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { useSpentsStore } from '@/stores/spents'
import { useCategoriesStore } from '@/stores/categories'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  DoughnutController,
  ArcElement
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  LineController,
  LineElement,
  PointElement,
  DoughnutController,
  ArcElement
)

const spents = useSpentsStore()
const { httpRequestSpents, changeMonth } = spents

const categories = useCategoriesStore()
const { httpRequestCategories } = categories

const month = new Date().getMonth()
const year = new Date().getFullYear()
const date = ref({ month, year });

onMounted(async () => {
  changeMonth(date)
  await httpRequestCategories()
  await httpRequestSpents()
})

</script>
<template>
  <div class="flex justify-center pt-4 bg-gray-950 h-full w-full text-gray-300 font-roboto antialiased">
    <div class="flex flex-col justify-start w-[1800px] px-4">
      <div class="pb-2 flex gap-1 w-full">
        <RouterLink to="/" class="btn">Controle de Gastos</RouterLink>
        <RouterLink to="/categories" class="btn">Categories</RouterLink>
      </div>
      <div class="h-[92vh]">
        <RouterView />
      </div>
    </div>
  </div>
</template>