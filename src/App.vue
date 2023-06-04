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
  ArcElement,
  Colors
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
  ArcElement,
  Colors
)

// const spents = useSpentsStore()
// const { httpRequestSpents, changeMonth } = spents

// const categories = useCategoriesStore()
// const { httpRequestCategories } = categories

// const month = new Date().getMonth()
// const year = new Date().getFullYear()
// const date = ref({ month, year });

// onMounted(async () => {
//   changeMonth(date)
  // await httpRequestCategories()
  // await httpRequestSpents()
// })

</script>
<template>
  <div class="flex justify-center p-4 gap-4 bg-gray-900 h-full w-full text-gray-300 font-roboto antialiased">
    <div class="w-[300px] h-full bg-gray-800 p-10 rounded-sm">
      <h1 class="mb-4 text-xl">Menu</h1>
      <div class="flex flex-col pb-2 gap-2 w-full">
        <RouterLink to="/" class="btn">Controle de Gastos</RouterLink>
        <RouterLink to="/categories" class="btn">Categories</RouterLink>
      </div>
    </div>
    <div class="flex flex-col justify-start w-full">
      <div class="h-full">
        <RouterView />
      </div>
    </div>
  </div>
</template>