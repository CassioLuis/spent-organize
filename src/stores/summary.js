import { defineStore, storeToRefs } from 'pinia'
import { useSpentsStore } from '@/stores/spents.js'

export const useSummaryStore = defineStore('summary', {
  state: () => {
    return {
      summaryList: []
    }
  },
  getters: {
    getSummary() {
      return this.summaryList
    }
  },
  actions: {
    addSummary() {
      const spents = useSpentsStore()
      const { getTotalizerSpentsByCategory } = storeToRefs(spents)
      return this.summaryList = getTotalizerSpentsByCategory
    },
    expand(totalize) {
      const itemToExpand = this.summaryList.find(item => item.category === totalize.category)
      const index = this.summaryList.indexOf(itemToExpand)
      console.log(index);
      this.summaryList.forEach(item => {
        if (item.category === totalize.category) return
        item.expanded = false
      })
      this.summaryList[index] = true
      console.log(newSummary, this.summaryList[index]);
      // totalize.expanded = !totalize.expanded
      // console.log(totalize);
    }
  }
})