import { defineStore, storeToRefs } from 'pinia'
import { getAllSpents } from '@/services/spents.service.js'
import { updateSpent } from '@/services/spents.service'
import { deleteSpent, postSpent } from '@/services/spents.service.js'
import { useCategoriesStore } from '@/stores/categories.js'

export const useSpentsStore = defineStore('spents', {
  state: () => {
    return {
      monthYear: {},
      summaryList: {
        summary: [],
        summarySubTotals: {}
      },
      spentList: []
    }
  },
  getters: {
    getMonth() {
      return this.monthYear
    },
    getSpents() {
      const { month, year } = this.monthYear
      const newMonthYear = `${year}-${month.toString().length === 1 ? '0' + (month + 1) : month}`
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

      const resultado = totalizer.reduce((acumulador, item) => {
        const { category, totalSpent } = item
        const subcategories = getCategories.value.filter(cat => cat.name === category)
          .map(subcat => {
            return {
              subcategoria: subcat.subCategory || 'Não Cadastrado',
              valor: totalSpent
            }
          })
        const subcategoriestotal = { category, subCat: subcategories[0].subcategoria, totalSpent }
        acumulador.valorTotal += totalSpent;
        acumulador.listaCategorias.push(subcategoriestotal);

        return acumulador;
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
    startDate(date) {
      return this.monthYear = date
    },
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
      const indexOfUpdateItem = this.spentList.indexOf(updateItem)
      this.spentList[indexOfUpdateItem].category = value
      const body = { ...updateItem, category: value }
      await updateSpent(body)
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
      const itemToExpand = this.summaryList.summary.find(item => item.category === totalize.category)
      const index = this.summaryList.summary.indexOf(itemToExpand)
      this.summaryList.summary.forEach(item => {
        if (item.category === totalize.category) return
        item.expanded = false
      })
      this.summaryList.summary[index].expanded = !this.summaryList.summary[index].expanded
    }
  }
})