<script setup>
import { reactive, watch } from 'vue';
import { Doughnut } from 'vue-chartjs'

const props = defineProps({
  dataDoughnut: {
    type: Object,
    required: true
  }
})

const { labels, totals } = props.dataDoughnut

const data = reactive({
  dataChart: {
    labels: labels,
    datasets: [
      {
        data: totals
      }
    ]
  },
  options: {
    responsive: true,
    plugins: {
      colors: {
        forceOverride: true
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(context.parsed);
            }
            return label;
          }
        }
      },
      legend: {
        display: false,
        position: 'right',
        labels: {
          color: 'white',
          font: {
            size: 14,
          }
        }
      },
      title: {
        display: true,
        text: 'Resumo Mensal',
        color: 'white',
        font: {
          size: 16,
        }
      }
    }
  }
})

watch(props, (newValue) => {
  const { labels, totals } = newValue.dataDoughnut

  data.dataChart = {
    labels: labels,
    datasets: [
      {
        data: totals,
        borderColor: 'white'
      }
    ]
  }
}, { deep: true })

</script>
<template>
  <div class="flex justify-center">
    <Doughnut :data="data.dataChart" :options="data.options" class="h-full rounded" />
  </div>
</template>