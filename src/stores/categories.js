import { defineStore } from 'pinia'
import { postCategory, getAllCategories, deleteCategory } from '@/services/category.service'

export const useCategoriesStore = defineStore('categories', {
  state: () => {
    return {
      categories: []
    }
  },
  getters: {
    getCategories() {
      return this.categories
    }
  },
  actions: {
    async httpRequestCategories() {
      const response = await getAllCategories()
      return this.categories = response.data
    },
    async addCategory(payload) {
      await postCategory(payload)
      await this.httpRequestCategories()
    },
    async removeCategory(categoryId) {
      if (!confirm('Tem certeza que deseja excluir este item ?')) return
      const index = this.categories.indexOf(this.categories.find(item => item._id === categoryId));
      this.categories.splice(index, 1)
      await deleteCategory(categoryId)
    }
  }
})