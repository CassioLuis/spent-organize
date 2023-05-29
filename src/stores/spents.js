import { defineStore, storeToRefs } from 'pinia'
import { deleteSpent, postSpent, updateSpent, getAllSpents } from '@/services/spents.service.js'
import { useCategoriesStore } from '@/stores/categories.js'

export const useSpentsStore = defineStore('spents', {
  state: () => {
    return {
      category: '',
      monthYear: {},
      summaryList: {
        summary: [],
        summarySubTotals: {}
      },
      spentList: []
    }
  },
  getters: {
    getSpentsToChart() {
      const spentByCategory = this.spentList.filter((item) => item.category === this.category)
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

      return {
        xaxis: Object.keys(roundedTotals),
        series: {
          name: this.category,
          data: Object.values(roundedTotals)
        }
      }
    },
    getMonth() {
      return this.monthYear
    },
    getSpents() {
      const { year } = this.monthYear
      const month = this.monthYear.month + 1
      const newMonthYear = `${year}-${month.toString().length === 1 ? '0' + month : month}`
      return this.spentList.filter(spent => spent.date.substring(0, 7) === newMonthYear)
    },
    getTotal() {
      return this.getSpents.filter(spent => spent.creditCard).reduce((acc, spent) => acc + Number(spent.spentValue), 0)
    },
    handleTotals() {
      const spents = this.getSpents
      const spentCategories = [...new Set(spents.map(spent => spent.category))]

      const totalizer = spentCategories.map(category => {
        const spentsByCategory = spents.filter(spent => spent.category === category)
        const totalSpentByCategory = spentsByCategory.reduce((acc, spent) => acc + Number(spent.spentValue), 0)
        return {
          category: category,
          totalSpent: totalSpentByCategory,
          expanded: false,
          spents: spentsByCategory,
          style: ''
        }
      })
      const categories = useCategoriesStore()
      const { getCategories } = storeToRefs(categories)

      const resultado = totalizer.reduce((acc, item) => {
        const { category, totalSpent } = item
        const categories = getCategories.value.filter(cat => cat.name === category)
        const subCategoriesTotals = categories.map(subcat => {
          return {
            subCat: subcat.subCategory || 'Não Conciliado',
            valor: totalSpent
          }
        })
        const [{ subCat }] = subCategoriesTotals
        const subcategoriestotal = { category, subCat, totalSpent }
        acc.valorTotal += totalSpent;
        acc.listaCategorias.push(subcategoriestotal);

        return acc;
      }, { valorTotal: 0, listaCategorias: [] });

      return {
        summary: [...totalizer],
        summarySubTotals: {
          ...resultado,
          listaCategorias: resultado.listaCategorias.reduce((acc, item) => {
            const foundItem = acc.find(obj => obj.subCat === item.subCat)
            if (foundItem) {
              foundItem.category.push(item.category)
              foundItem.totalSpent += item.totalSpent;
            } else {
              acc.push({ subCat: item.subCat, totalSpent: item.totalSpent, category: [item.category] });
            }
            return acc;
          }, [])
        }
      }
    },
    getSummary() {
      return this.summaryList
    },
    isCategoryOfOthers() {
      const categories = useCategoriesStore()
      const { getCategories } = storeToRefs(categories)
      return (param) => getCategories.value.filter(item => item.subCategory === param).map(item => item.name)
    }
  },
  actions: {
    applyRightLight(categories) {
      const summary = this.summaryList.summary
      const category = summary.map(item => item.category)
      const styles = 'bg-gray-700'
      const categoryToStyle = category.map((item, index) => {
        const test = categories.includes(item)
        if (test) return summary[index].style = styles
        return summary[index].style = ''
      })
      return categoryToStyle
    },
    removeRightLight() {
      return this.summaryList.summary.forEach(item => item.style = '')
    },
    resetSummary() {
      return this.summaryList = this.handleTotals
    },
    async updateSpentCategory(id, value) {
      const updateItem = this.spentList.find(item => item._id === id)
      updateItem.category = value
      await updateSpent(updateItem)
    },
    async updateSpentCreditCard(id) {
      const updateItem = this.spentList.find(item => item._id === id)
      updateItem.creditCard = !updateItem.creditCard
      await updateSpent(updateItem)
    },
    async httpRequestSpents() {
      const response = await getAllSpents()
      if (!response) return
      this.spentList = await response.data
    },
    async add(payload) {
      await postSpent(payload)
      await this.httpRequestSpents()
    },
    changeMonth(newMonth) {
      this.monthYear = newMonth
    },
    async removeSpentWithQuotas(spentId) {
      const spent = this.spentList.find(item => item._id === spentId)
      const spentsQuotasToDelete = this.spentList.filter(item => item.uniqueForQuotas === spent.uniqueForQuotas)
      spentsQuotasToDelete.forEach(item => {
        const index = this.spentList.indexOf(item)
        this.spentList.splice(index, 1)
      })
      await deleteSpent(spentId)
    },
    async removeSpentWithNoQuotas(spentId) {
      const spent = this.spentList.find(item => item._id === spentId)
      const index = this.spentList.indexOf(spent);
      this.spentList.splice(index, 1)
      await deleteSpent(spentId)
    },
    async removeSpent(spentId) {
      if (!confirm('Tem certeza que deseja excluir este item ?')) return
      const spent = this.spentList.find(item => item._id === spentId)
      if (spent.uniqueForQuotas) return this.removeSpentWithQuotas(spentId)
      return this.removeSpentWithNoQuotas(spentId)
    },
    expand(totalize) {
      const itemToExpand = this.summaryList.summary.find(item => item.category === totalize.category)
      const index = this.summaryList.summary.indexOf(itemToExpand)
      this.summaryList.summary.forEach(item => {
        if (item.category === totalize.category) return
        item.expanded = false
      })
      this.summaryList.summary[index].expanded = !this.summaryList.summary[index].expanded
    },
    changeCategory(category) {
      return this.category = category
    }
  }
})