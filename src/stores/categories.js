import { defineStore } from 'pinia'
import { postCategory, getAllCategories, deleteCategory, updateCategory } from '@/services/category.service'

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
    async updateSubCategorie(body) {
      console.log(body);
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
      if (!confirm('Tem certeza que deseja excluir este item ?')) return
      const index = this.categories.indexOf(this.categories.find(item => item._id === categoryId));
      this.categories.splice(index, 1)
      await deleteCategory(categoryId)
    }
  }
})