<script setup>
import { reactive, watch } from 'vue';
import Selector from '@/components/Selector.vue'
import { storeToRefs } from 'pinia';
import { useCategoriesStore } from '@/stores/categories.js'
import { useSpentsStore } from '@/stores/spents'
import { Line, Pie } from 'vue-chartjs'


const categories = useCategoriesStore()
const { getFilteredCategories } = storeToRefs(categories)

const spents = useSpentsStore()
const { getSpentsToChart } = storeToRefs(spents)
const { changeCategory } = spents

const data = reactive({
  category: 'Mercado',
  dataChart: {
    datasets: []
  },
  options: {
    interaction: {
      intersect: false,
      mode: 'index',
    },
    elements: {
      line: {
        tension: 0.2
      }
    },
    responsive: true,
    plugins: {
      tooltip: {
        position: 'nearest',
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || '';

            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(context.parsed.y);
            }
            return label;
          }
        }
      },
      title: {
        display: true,
        text: 'Grafico anual por categoria',
        color: 'white'
      },
      legend: {
        align: 'center',
        labels: {
          textAlign: 'left',
          font: {
            weight: 'bold'
          }
        }
      }
    },
    scales: {
      x: {
        border: {
          color: 'white',
          dash: [5],
          dashOffset: 0.1
        },
        grid: {
          display: true,
          color: 'gray'
          // drawOnChartArea: false,
          // drawTicks: false
        },
        title: {
          display: true,
          text: 'Mês',
          color: 'gray',
          font: {
            // family: 'Comic Sans MS',
            // size: 20,
            weight: 'bold',
            lineHeight: 1.2,
          },
          // padding: { top: 30, left: 0, right: 0, bottom: 0 }
        },
        ticks: {
          color: 'white',
          align: 'center',
          padding: 10
        }
      },
      y: {
        border: {
          color: 'white'
        },
        grid: {
          display: true,
          color: 'gray'
          // drawOnChartArea: false,
          // drawTicks: false,
        },
        title: {
          display: true,
          text: 'Valor',
          color: 'gray',
          font: {
            // family: 'Comic Sans MS',
            // size: 20,
            weight: 'bold',
            lineHeight: 1.2,
          },
          // padding: { top: 30, left: 0, right: 0, bottom: 0 }
        },
        ticks: {
          color: 'white',
          callback: function (value, index, ticks) {
            return `R$ ${value},00`;
          }
        }
      }
    },
    layout: {
      padding: 5
    }
  }
})

watch(getSpentsToChart, (newValue) => {
  data.dataChart = {
    labels: newValue.xaxis,
    datasets: [
      {
        label: data.category,
        data: newValue.series.data,
        borderColor: '#36A2EB',
        backgroundColor: '#9BD0F5',
        colorFont: 'white'
      },
      {
        label: 'Hobby',
        data: [100, 250, 364, 98, 800],
        borderColor: '#36A2EB',
        backgroundColor: '#9BD0F5',
        colorFont: 'white'
      }
    ]
  }
  changeCategory(data.category)
}, { deep: true })

</script>
<template>
  <div class="flex flex-col gap-4 rounded">
    <Selector @change="changeCategory(data.category)" :options="getFilteredCategories" v-model="data.category"
      :value="data.category" class="btn w-full h-12" />
    <Line :data="data.dataChart" :options="data.options" class="bg-gray-700 rounded-sm border border-gray-600" />
    <!-- <Pie :data="data.dataChart" :options="data.options" class="bg-gray-700 rounded-sm border border-gray-600" /> -->
  </div>
</template>