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
      const { lineByCategoryYearly } = this.chartLine
      return lineByCategoryYearly.filter(item => item[this.category])
    },
    getCategoriesFromCharts() {
      return [...new Set(this.getAllSpents.map(item => item.category))]
    }
  },
  actions: {
    resetDataToDoughnutSummaryMonthly() {
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
    resetDataToChartLineByCategoryYearly() {
      const allCategories = this.getCategoriesFromCharts

      const chartData = allCategories.map(category => {
        const spentByCategory = this.getAllSpents.filter(item => item.category === category)
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

        const months = Object.keys(totals).sort()

        const seriesData = months.map(month => totals[month])

        // const seriesData = months.map(month => {
        //   if (totals[month]) return totals[month]
        //   return
        // });

        return {
          [category]: {
            xaxis: months,
            series: [{
              name: category,
              dataChart: seriesData
            }]
          }
        }
      })

      this.chartLine = {
        ...this.chartLine,
        lineByCategoryYearly: chartData
      }
    },
    changeCategory(category) {
      return this.category = category
    },
    teste() {
      console.log(`ola`);
    }
  }
})