<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { reactive, onBeforeMount } from 'vue'
import SideBar from '@/components/SideBar.vue'
import Accordion from '@/components/Accordion.vue'
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

const data = reactive({
  openMenu: false
})
</script>
<template>
  <div class="flex justify-center bg-gray-900 h-full w-full text-gray-300 font-roboto antialiased">
    <SideBar>
      <template #options>
        <Accordion>
          <template #accordion-tittle>
            <div @click="() => data.openMenu = !data.openMenu" :class="{'btn-sidebar-active rounded-none rounded-t-sm': data.openMenu}" class="btn-sidebar">Controle</div>
          </template>
          <template #accordion-content>
            <ul v-if="data.openMenu" class="bg-sky-900 rounded-b-sm">
              <li>
                <RouterLink to="/" class="btn-sidebar-sub-item w-full" exact-active-class="btn-sidebar-sub-item-active">Dashboard</RouterLink>
              </li>
              <li>
                <RouterLink to="/" class="btn-sidebar-sub-item w-full" exact-active-class="btn-sidebar-sub-item-active">Controle de
                  Gastos
                </RouterLink>
              </li>
            </ul>
          </template>
        </Accordion>
        <RouterLink to="/categories" class="text-left btn-sidebar" exact-active-class="btn-sidebar-active">Categories
        </RouterLink>
      </template>
    </SideBar>
    <div class="flex flex-col justify-start w-full p-4">
      <RouterView />
    </div>
  </div>
</template>