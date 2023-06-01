<script setup>
import { reactive, watch } from 'vue';
import Selector from '@/components/Selector.vue'
import { storeToRefs } from 'pinia';
import { useCategoriesStore } from '@/stores/categories.js'
import { useSpentsStore } from '@/stores/spents'
import { Line } from 'vue-chartjs'
import { useChartsStore } from '@/stores/Charts';


const categories = useCategoriesStore()
const { getFilteredCategories } = storeToRefs(categories)

const spents = useSpentsStore()
// const { changeCategory } = spents

const charts = useChartsStore()
// const { getDataToChartLine } = storeToRefs(charts)
const { changeCategory, getDataToChartLine } = charts


const props = defineProps({
  dataChartLine: {
    type: Object,
    required: true
  }
})

const data = reactive({
  category: 'Mercado',
  dataChart: {
    datasets: []
  },
  options: {
    responsive: true,
    interaction: {
      intersect: false,
      mode: 'index',
    },
    elements: {
      line: {
        tension: 0.2
      }
    },
    plugins: {
      colors: {
        forceOverride: true
      },
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
          color: 'white',
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
        },
        // title: {
        //   display: true,
        //   text: 'Mês',
        //   color: 'gray',
        //   font: {
        //     // family: 'Comic Sans MS',
        //     // size: 20,
        //     weight: 'bold',
        //     lineHeight: 1.2,
        //   },
        //   // padding: { top: 30, left: 0, right: 0, bottom: 0 }
        // },
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
        },
        // title: {
        //   display: true,
        //   text: 'Valor',
        //   color: 'gray',
        //   font: {
        //     // family: 'Comic Sans MS',
        //     // size: 20,
        //     weight: 'bold',
        //     lineHeight: 1.2,
        //   },
        //   // padding: { top: 30, left: 0, right: 0, bottom: 0 }
        // },
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

// changeCategory(data.category)
// getDataToChartLine()


watch(props, (newValue) => {
  data.dataChart = {
    labels: newValue.dataChartLine.xaxis,
    datasets: [
      {
        label: data.category,
        data: newValue.dataChartLine.series.data,
        colorFont: 'white'
      }
    ]
  }
  changeCategory(data.category)
}, { deep: true })

</script>
<template>
  <div class="flex flex-col gap-2 rounded">
    <Selector @change="changeCategory(data.category)" :options="getFilteredCategories" v-model="data.category"
      :value="data.category" class="input w-full h-12" />
    <Line :data="data.dataChart" :options="data.options" class="rounded" />
  </div>
</template>