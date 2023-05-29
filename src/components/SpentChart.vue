<script setup>
// import VueApexCharts from 'vue-apexcharts'
import { reactive, watch } from 'vue';
import Selector from '@/components/Selector.vue'
import { storeToRefs } from 'pinia';
import { useCategoriesStore } from '@/stores/categories.js'
import { useSpentsStore } from '@/stores/spents';

const props = defineProps({
  dataChart: {
    type: Object
  }
})

const categories = useCategoriesStore()
const { getFilteredCategories } = storeToRefs(categories)

const spents = useSpentsStore()
const { getSpentsToChart } = storeToRefs(spents)
const { changeCategory } = spents


const data = reactive({
  category: 'Mercado',
  options: {
    chart: {
      id: 'vuechart-example'
    },
    xaxis: {
      categories: []
    }
  },
  series: []
})


watch(getSpentsToChart, () => {
  data.options.xaxis.categories = getSpentsToChart.value.xaxis
  data.series = [getSpentsToChart.value.series]
  console.log(data)
})

watch(data, () => {
  changeCategory(data.category)
})

</script>
<template>
  <div class="flex flex-col gap-4 rounded">
    <Selector :options="getFilteredCategories" v-model="data.category" :value="data.category" class="btn w-full h-12" />
    <div class="bg-white rounded-sm">
      <apexchart width="100%" type="line" :options="data.options" :series="data.series" />
    </div>
  </div>
</template>