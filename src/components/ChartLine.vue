<script setup>
import { reactive, watch, onMounted } from 'vue';
import { Line } from 'vue-chartjs'

const props = defineProps({
  dataChartLine: {
    type: Object,
    required: true
  },
  categories: {
    type: Array,
    required: true
  }
})

const data = reactive({
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

const handleProps = () => {
  const [dataChartLine] = props.dataChartLine
  const labelName = Object.keys(dataChartLine)
  const { [labelName]: { series: [{ name, dataChart }], xaxis } } = dataChartLine
  return {
    name,
    dataChart,
    xaxis
  }
}

const refreshChartDataSet = () => {
  const { name, dataChart, xaxis } = handleProps()

  const newDataChart = {
    labels: xaxis,
    datasets: [
      {
        label: name,
        data: dataChart,
        colorFont: 'white'
      }
    ]
  }
  data.dataChart = newDataChart
}

onMounted(() => {
  refreshChartDataSet()
})

watch(props, () => {
  refreshChartDataSet()
}, { deep: true })

</script>
<template>
  <div class="flex flex-col gap-2 rounded">
    <Line :data="data.dataChart" :options="data.options" class="rounded" />
  </div>
</template>