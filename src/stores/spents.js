import { defineStore } from 'pinia'
import { getAllSpents } from '@/services/spents.service.js'
import { deleteSpent, postSpent } from '@/services/spents.service.js'
import { useCategoriesStore } from '@/stores/categories.js'



export const useSpentsStore = defineStore('spents', {
  state: () => {
    return {
      month: new Date().toISOString().substring(0, 7),
      spentList: []
    }
  },
  getters: {
    getSpents(state) {
      return state.spentList.filter(spent => spent.date.substring(0, 7) === this.month)
    },
    getTotal() {
      return this.getSpents.filter(spent => spent.creditCard).reduce((acc, spent) => acc + Number(spent.spentValue), 0)
    },
    getTotalizerSpentsByCategory() {
      const categories = [...new Set(this.getSpents.map(spent => spent.category))];
      const totalizer = categories.map(category => {
        const spentsByCategory = this.getSpents.filter(spent => spent.category === category);
        const totalSpentByCategory = spentsByCategory.reduce((acc, spent) => acc + Number(spent.spentValue), 0);
        return {
          // id: uuidv4(),
          category: category,
          totalSpent: totalSpentByCategory,
          expanded: false,
          spents: spentsByCategory
        };
      });
      return totalizer
    }
  },
  actions: {
    async httpRequestSpents() {
      const categories = useCategoriesStore()
      const { httpRequestCategories } = categories
      await httpRequestCategories()
      const response = await getAllSpents()
      return this.spentList = response.data
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
    }
  }
})