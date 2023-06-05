<script setup>
import { RouterLink, RouterView } from 'vue-router'
import SideBar from '@/components/SideBar.vue'
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

</script>
<template>
  <div class="flex justify-center bg-gray-900 h-full w-full text-gray-300 font-roboto antialiased">
    <SideBar>
      <template #options>
        <RouterLink to="/" class="text-left">Controle de Gastos</RouterLink>
        <RouterLink to="/categories" class="text-left">Categories</RouterLink>
      </template>
    </SideBar>
    <div class="flex flex-col justify-start w-full p-4">
      <RouterView />
    </div>
  </div>
</template>