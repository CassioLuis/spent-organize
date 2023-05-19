import { defineStore, storeToRefs } from 'pinia'
import { getAllSpents } from '@/services/spents.service.js'
import { deleteSpent, postSpent } from '@/services/spents.service.js'
import { useCategoriesStore } from '@/stores/categories.js'
import { convertToCurrency } from '@/utils/convertToCurrency.js'

export const useSpentsStore = defineStore('spents', {
  state: () => {
    return {
      month: new Date().toISOString().substring(0, 7),
      summary: [],
      spentList: []
    }
  },
  getters: {
    getSpents(state) {
      return this.spentList.filter(spent => spent.date.substring(0, 7) === this.month)
    },
    getTotal() {
      return this.getSpents.filter(spent => spent.creditCard).reduce((acc, spent) => acc + Number(spent.spentValue), 0)
    },
    getTotalizerSpentsByCategory() {
      const spents = this.getSpents
      const categories = [...new Set(spents.map(spent => spent.category))];
      const totalizer = categories.map(category => {
        const spentsByCategory = spents.filter(spent => spent.category === category);
        const totalSpentByCategory = spentsByCategory.reduce((acc, spent) => acc + Number(spent.spentValue), 0);
        return {
          category: category,
          totalSpent: totalSpentByCategory,
          expanded: false,
          spents: spentsByCategory
        };
      });
      return totalizer
    },
    getSummary() {
      return this.summary
    },
    isCategoryOfOthers() {
      const categories = useCategoriesStore()
      const { getCategories } = storeToRefs(categories)
      return (param) => getCategories.value.filter(item => item.subCategory === param).map(item => item.name)
    }
  },
  actions: {
    resetSummary() {
      return this.summary = this.getTotalizerSpentsByCategory
    },
    async httpRequestSpents() {
      const categories = useCategoriesStore()
      const { httpRequestCategories } = categories
      await httpRequestCategories()
      const response = await getAllSpents()
      this.spentList = response.data
    },
    async add(payload) {
      await postSpent(payload)
      await this.httpRequestSpents()
    },
    changeMonth(newMonth) {
      this.month = newMonth
    },
    async removeSpent(spentId) {
      if (!confirm('Tem certeza que deseja excluir este item ?')) return
      const index = this.spentList.indexOf(this.spentList.find(item => item._id === spentId));
      this.spentList.splice(index, 1)
      await deleteSpent(spentId)
    },
    expand(totalize) {
      const itemToExpand = this.summary.find(item => item.category === totalize.category)
      const index = this.summary.indexOf(itemToExpand)
      this.summary.forEach(item => {
        if (item.category === totalize.category) return
        item.expanded = false
      })
      this.summary[index].expanded = !this.summary[index].expanded
    },
    sumDebits(param) {
      const debits = this.getSummary.reduce((acc, item) => {
        if (item.category.toLowerCase().includes('dividir')) return acc + item.totalSpent / 2;
        if (this.isCategoryOfOthers(param).includes(item.category)) return acc + item.totalSpent
        if (!param && item.category.toLowerCase().includes('dividir')) return acc + item.totalSpent
        if (!param) return acc + item.totalSpent
        return acc
      }, 0)
      return convertToCurrency(debits)
    }
  }
})