<script setup>
import { reactive, watch } from 'vue';
import { Doughnut } from 'vue-chartjs'

const props = defineProps({
  dataDoughnut: {
    type: Object,
    required: true
  }
})

const data = reactive({
  dataChart: {
    labels: props.dataDoughnut.labels,
    datasets: [
      {
        data: props.dataDoughnut.data
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
      // autocolors: {
      //   mode: 'data',
      //   offset: 10
      // },
      legend: {
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
        color: 'white'
      }
    }
  }
})

watch(props, (newValue) => {
  data.dataChart = {
    labels: newValue.dataDoughnut.labels,
    datasets: [
      {
        label: data.category,
        data: newValue.dataDoughnut.data,
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