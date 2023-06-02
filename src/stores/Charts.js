import { defineStore, storeToRefs } from 'pinia'
import { useSpentsStore } from '@/stores/spents.js'

export const useChartsStore = defineStore('charts', {
  state: () => {
    return {
      category: 'Mercado',
      chartLine: {},
      chartDoughnut: {}
    }
  },
  getters: {
    getSpentsByMounth() {
      const spents = useSpentsStore()
      const { getSpents } = storeToRefs(spents)
      return getSpents.value
    },
    getAllSpents() {
      const spents = useSpentsStore()
      return spents.spentList
    },
    getDoughnutSummaryMonthly() {
      return this.chartDoughnut.doughnutSummaryMonthly
    },
    getChartLineByCategoryYearly() {
      console.log(this.chartLine.lineByCategoryYearly);
      return this.chartLine.lineByCategoryYearly
    }
  },
  actions: {
    setDataToDoughnutSummaryMonthly() {
      const spentCategories = [...new Set(this.getSpentsByMounth.map(spent => spent.category))]

      const totalizer = spentCategories.map(category => {
        const spentsByCategory = this.getSpentsByMounth.filter(spent => spent.category === category)
        const totalSpentByCategory = spentsByCategory.reduce((acc, spent) => acc + Number(spent.spentValue), 0)
        return totalSpentByCategory
      })
      return this.chartDoughnut = {
        ...this.chartDoughnut,
        doughnutSummaryMonthly: {
          labels: spentCategories,
          totals: totalizer
        }
      }
    },
    setDataToChartLineByCategoryYearly() {
      const spentByCategory = this.getAllSpents //.filter((item) => item.category === this.category)

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

      const category = this.category
      return this.chartLine = {
        ...this.chartLine,
        lineByCategoryYearly: {
          category: {
            xaxis: Object.keys(roundedTotals),
            series: {
              name: this.category,
              data: Object.values(roundedTotals)
            }
          }
        }
      }
    },
    changeCategory(category) {
      return this.category = category
    }
  }
})