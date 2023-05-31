<script setup>
import { reactive, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useSpentsStore } from '@/stores/spents'
import { Doughnut } from 'vue-chartjs'


const spents = useSpentsStore()
const { getDataToDoughnutChart } = storeToRefs(spents)
const { changeCategory } = spents

const data = reactive({
  category: 'Mercado',
  dataChart: {
    datasets: []
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Resumo Mensal'
      }
    }
  }
})

watch(getDataToDoughnutChart, (newValue) => {
  data.dataChart = {
    labels: newValue.labels,
    datasets: [
      {
        label: data.category,
        data: newValue.data,
        // borderColor: '#36A2EB',
         backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)'
        ],
        colorFont: 'white'
      }
    ]
  }
  changeCategory(data.category)
}, { deep: true })

</script>
<template>
  <div class="flex justify-center">
    <Doughnut :data="data.dataChart" :options="data.options" class="h-full rounded" />
  </div>
</template>