import { defineStore } from 'pinia'
import { convertDateToStringDate } from '@/utils/convertDateToStringDate.js'
import { createNextSpentsForQuotas } from '@/utils/createNextSpentsForQuotas.js'
import { getAllSpents } from '@/services/spents.services.js'

export const useSpentsStore = defineStore('spents', {
  state: () => {
    return {
      month: new Date().toISOString().substring(0, 7),
      spentList: [
        {
          id: 8,
          presentationDate: '4 MAI.',
          date: '2023-05-04',
          description: 'Machado Supermercado',
          category: 'Alimentação',
          spentValue: 390,
          creditCard: true
        },
        {
          id: 9,
          presentationDate: '4 MAI.',
          date: '2023-05-04',
          description: 'Agua',
          category: 'Água e Esgoto',
          spentValue: 49,
          creditCard: true
        },
        {
          id: 10,
          presentationDate: '4 MAI.',
          date: '2023-05-04',
          description: 'Lanche',
          category: 'Lanche',
          spentValue: 49,
          creditCard: true
        },
        {
          id: 9,
          presentationDate: '4 MAI.',
          date: '2023-05-04',
          description: 'Agua',
          category: 'Água e Esgoto',
          spentValue: 49,
          creditCard: true
        },
        {
          id: 10,
          presentationDate: '4 MAI.',
          date: '2023-05-04',
          description: 'Lanche',
          category: 'Lanche',
          spentValue: 49,
          creditCard: true
        },
        {
          id: 9,
          presentationDate: '4 MAI.',
          date: '2023-05-04',
          description: 'Agua',
          category: 'Água e Esgoto',
          spentValue: 49,
          creditCard: true
        },
        {
          id: 10,
          presentationDate: '4 MAI.',
          date: '2023-05-04',
          description: 'Lanche',
          category: 'Lanche',
          spentValue: 49,
          creditCard: true
        },
        {
          id: 9,
          presentationDate: '4 MAI.',
          date: '2023-05-04',
          description: 'Agua',
          category: 'Água e Esgoto',
          spentValue: 49,
          creditCard: true
        },
        {
          id: 10,
          presentationDate: '4 MAI.',
          date: '2023-05-04',
          description: 'Lanche',
          category: 'Lanche',
          spentValue: 49,
          creditCard: true
        },
        {
          id: 9,
          presentationDate: '4 MAI.',
          date: '2023-05-04',
          description: 'Agua',
          category: 'Água e Esgoto',
          spentValue: 49,
          creditCard: true
        },
        {
          id: 10,
          presentationDate: '4 MAI.',
          date: '2023-05-04',
          description: 'Lanche',
          category: 'Lanche',
          spentValue: 49,
          creditCard: true
        },
        {
          id: 9,
          presentationDate: '4 MAI.',
          date: '2023-05-04',
          description: 'Agua',
          category: 'Água e Esgoto',
          spentValue: 49,
          creditCard: true
        },
        {
          id: 10,
          presentationDate: '4 MAI.',
          date: '2023-05-04',
          description: 'Lanche',
          category: 'Lanche',
          spentValue: 49,
          creditCard: true
        },
        {
          id: 9,
          presentationDate: '4 MAI.',
          date: '2023-05-04',
          description: 'Agua',
          category: 'Água e Esgoto',
          spentValue: 49,
          creditCard: true
        },
        {
          id: 10,
          presentationDate: '4 MAI.',
          date: '2023-05-04',
          description: 'Lanche',
          category: 'Lanche',
          spentValue: 49,
          creditCard: true
        },
        {
          id: 9,
          presentationDate: '4 MAI.',
          date: '2023-05-04',
          description: 'Agua',
          category: 'Água e Esgoto',
          spentValue: 49,
          creditCard: true
        },
        {
          id: 10,
          presentationDate: '4 MAI.',
          date: '2023-05-04',
          description: 'Lanche',
          category: 'Lanche',
          spentValue: 49,
          creditCard: true
        },
        {
          id: 9,
          presentationDate: '4 MAI.',
          date: '2023-05-04',
          description: 'Agua',
          category: 'Água e Esgoto',
          spentValue: 49,
          creditCard: true
        },
        {
          id: 10,
          presentationDate: '4 MAI.',
          date: '2023-05-04',
          description: 'Lanche',
          category: 'Lanche',
          spentValue: 49,
          creditCard: true
        },
        {
          id: 9,
          presentationDate: '4 MAI.',
          date: '2023-05-04',
          description: 'Agua',
          category: 'Água e Esgoto',
          spentValue: 49,
          creditCard: true
        },
        {
          id: 10,
          presentationDate: '4 MAI.',
          date: '2023-05-04',
          description: 'Lanche',
          category: 'Lanche',
          spentValue: 49,
          creditCard: true
        },
        {
          id: 9,
          presentationDate: '4 MAI.',
          date: '2023-05-04',
          description: 'Agua',
          category: 'Água e Esgoto',
          spentValue: 49,
          creditCard: true
        },
        {
          id: 10,
          presentationDate: '4 MAI.',
          date: '2023-05-04',
          description: 'Lanche',
          category: 'Lanche',
          spentValue: 49,
          creditCard: true
        },
        {
          id: 9,
          presentationDate: '4 MAI.',
          date: '2023-05-04',
          description: 'Agua',
          category: 'Água e Esgoto',
          spentValue: 49,
          creditCard: true
        },
        {
          id: 10,
          presentationDate: '4 MAI.',
          date: '2023-05-04',
          description: 'Lanche',
          category: 'Lanche',
          spentValue: 49,
          creditCard: true
        }
      ]
    }
  },
  getters: {
    async http() {
      const response = await getAllSpents()
      console.log(response)
    },
    getSpents(state) {
      return state.spentList.filter(spent => spent.date.substring(0, 7) === this.month)
    },
    getTotal() {
      return this.getSpents.filter(spent => spent.creditCard).reduce((acc, spent) => acc + Number(spent.spentValue), 0)
    },
    getTotalizerSpentsByCategory() {
      const categories = [...new Set(this.spents.map(spent => spent.category))];
      const totalizer = categories.map(category => {
        const spentsByCategory = this.spents.filter(spent => spent.category === category);
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
    add(payload) {
      console.log(payload);
      const newPayloadWithNoQuotas = { ...payload, presentationDate: convertDateToStringDate(payload.date) }
      if (!payload.quota) return this.spentList.push(newPayloadWithNoQuotas)
      return this.spentList.push(...createNextSpentsForQuotas(payload));
    },
    changeMonth(newMonth) {
      this.month = newMonth
    }
  }
})