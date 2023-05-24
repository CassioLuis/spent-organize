import { defineStore } from 'pinia'
import { postCategory, getAllCategories, deleteCategory, updateCategory } from '@/services/category.service'
import { useSpentsStore } from './spents'

export const useCategoriesStore = defineStore('categories', {
  state: () => {
    return {
      categories: []
    }
  },
  getters: {
    getCategories() {
      return this.categories
    },
    getFilteredCategories() {
      return this.categories.filter(item => item.name !== 'Não Categorizado')
    }
  },
  actions: {
    async updateSubCategorie(body) {
      const updateItem = this.categories.find(item => item._id === body.id)
      const indexOfUpdateItem = this.categories.indexOf(updateItem)
      this.categories[indexOfUpdateItem].subCategory = body.subCategory
      await updateCategory(body)
    },
    async httpRequestCategories() {
      const response = await getAllCategories()
      return this.categories = response.data
    },
    async addCategory(payload) {
      await postCategory(payload)
      await this.httpRequestCategories()
    },
    async removeCategory(categoryId) {
      const spents = useSpentsStore()
      const { updateSpentCategory } = spents
      if (!confirm('Tem certeza que deseja excluir este item ?')) return
      const category = this.categories.find(item => item._id === categoryId)
      const spentsToUpdate = spents.spentList.filter(item => item.category === category.name)
      if (spentsToUpdate) {
        spentsToUpdate.forEach(async item => {
          const spent = item.category = "Não Categorizado"
          await updateSpentCategory(item._id, spent)
        })
      }
      const index = this.categories.indexOf(category)
      this.categories.splice(index, 1)
      await deleteCategory(categoryId)
    }
  }
})