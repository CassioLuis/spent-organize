import { defineStore } from 'pinia'
import { convertDateToStringDate } from '../utils/convertDateToStringDate.js'
import { createNextSpentsForQuotas } from '../utils/createNextSpentsForQuotas.js'

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
    getSpents() {
      return this.spentList.filter(spent => spent.date.substring(0, 7) === this.month)
    },
    getTotal() {
      return this.getSpents.filter(spent => spent.creditCard).reduce((acc, spent) => acc + Number(spent.spentValue), 0)
    },
    getTotalizerSpentsByCategory() {
      return Object.entries(
        this.spents.reduce((acc, spent) => {
          const category = spent.category;
          const spentValue = Number(spent.spentValue);
          acc[category] = (acc[category] || 0) + spentValue;
          return acc;
        }, {})
      ).map(([category, spentValue]) => ({ category, spentValue }));
    }
  },
  actions: {
    add(payload) {
      const newPayloadWithNoQuotas = { ...payload, presentationDate: convertDateToStringDate(payload.date) }
      if (!payload.quota) return this.spentList.push(newPayloadWithNoQuotas)
      return this.spentList.push(...createNextSpentsForQuotas(payload));
    }
  }
})