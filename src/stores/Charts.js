import { defineStore, storeToRefs } from 'pinia'
import { useSpentsStore } from '@/stores/spents.js'

export const useChartsStore = defineStore('charts', {
  state: () => {
    return {
      category: '',
      chartLine: [],
      chartDoughnut: {
        // doughnutSummaryMonthly: {}
      }
    }
  },
  getters: {
    spentsInCharts() {
      const spents = useSpentsStore()
      const { getSpents } = storeToRefs(spents)
      return getSpents.value
    },
    getDoughnutSummaryMonthly() {
      return this.chartDoughnut.doughnutSummaryMonthly
    }
  },
  actions: {
    getDataToDoughnutSummaryMonthly() {
      const spentCategories = [...new Set(this.spentsInCharts.map(spent => spent.category))]

      const totalizer = spentCategories.map(category => {
        const spentsByCategory = this.spentsInCharts.filter(spent => spent.category === category)
        const totalSpentByCategory = spentsByCategory.reduce((acc, spent) => acc + Number(spent.spentValue), 0)
        return totalSpentByCategory
      })
      // console.log({
      //   doughnutSummaryMonthly: {
      //     labels: spentCategories,
      //     data: totalizer
      //   }
      // })
      return this.chartDoughnut = {
        ...this.chartDoughnut,
        doughnutSummaryMonthly: {
          labels: spentCategories,
          data: totalizer
        }
      }
    },
    getDataToChartLine() {
      const spents = useSpentsStore()
      const { getSpents } = storeToRefs(spents)

      const spentByCategory = getSpents.value.filter((item) => item.category === this.category)
      console.log(spents.category);
      const totals = spentByCategory.reduce((acc, item) => {
        const { date, spentValue } = item
        const yearMonth = date.substring(0, 7)

        if (!acc[yearMonth]) {
          acc[yearMonth] = spentValue
        } else {
          acc[yearMonth] += spentValue
        }
        return acc
      }, {})


      const sortedTotals = Object.fromEntries(
        Object.entries(totals).sort((a, b) => a[0].localeCompare(b[0]))
      )

      const roundedTotals = Object.fromEntries(
        Object.entries(sortedTotals).map(([key, value]) => [key, parseFloat(value.toFixed(2))])
      )
      // console.log(
      //   {
      //     xaxis: Object.keys(roundedTotals),
      //     series: {
      //       name: this.category,
      //       data: Object.values(roundedTotals)
      //     }
      //   }
      // )
      return {
        xaxis: Object.keys(roundedTotals),
        series: {
          name: this.category,
          data: Object.values(roundedTotals)
        }
      }
    },
    resetChart() {
      // this.getDataToDoughnutSummaryMonthly()
    },
    changeCategory(category) {
      // console.log(category);
      return this.category = category
    }
  }
})