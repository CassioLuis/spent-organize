<script setup>
import Accordion from '@/components/Accordion.vue';
import { convertToCurrency } from '@/utils/convertToCurrency.js'
import { useSummaryStore } from '@/stores/summary.js'

const summary = useSummaryStore()
const { expand } = summary

const props = defineProps({
  // month: {
  //   type: String,
  //   required: true
  // },
  totalizerSpents: {
    type: Array,
    required: true
  }
})

</script >
<template>
  <div>
    <div class="flex flex-col justify-between h-full">
      <p class="text-center border-b border-gray-700 text-lg">Resumo</p>
      <div class="grow pt-4 overflow-y-auto">
        <Accordion v-for="totalizer in totalizerSpents" :key="totalizer.id" @click="expand(totalizer)">
          <template #accordion-tittle>
            <span>{{ totalizer.category }}</span>
            <span>{{ convertToCurrency(totalizer.totalSpent) }}</span>
          </template>
          <template #accordion-content>
            <li v-if="totalizer.expanded" v-for="spent in totalizer.spents" :key="spent.id"
              class="overflow-hidden flex justify-between gap-2 text-xs text-gray-400 border-gray-600">
              <div class="flex justify-between p-4 items-center w-full">
                <span>{{ spent.description }}</span>
                <span>{{ convertToCurrency(spent.spentValue) }}</span>
              </div>
            </li>
          </template>
        </Accordion>
      </div>
      <div>
        <p class="text-center border-b border-gray-700 mb-4">Totais</p>
        <div class="flex justify-between">
          <span>Meus Debitos (-)</span>
          <!-- <span>{{ sumDebits(false) }}</span> -->
        </div>
        <div class="flex justify-between">
          <span>Debitos Outros (-)</span>
          <!-- <span>{{ sumDebits(true) }}</span> -->
        </div>
      </div>
    </div>
  </div>
</template >
  <!-- <script>
    import Accordion from '@/components/Accordion.vue';

    export default {
      components: {Accordion},
    props: {
      month: {
      type: String,
    required: true
    }
  },
    methods: {
      ...mapMutations({
        expand: 'summary/expand',
      }),
      convertToCurrency(value) {
      return parseFloat(value).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL' });
    },
    isCategoryOfOthers(param) {
      return this.getCategories.filter(item => item.otherPeople === param).map(item => item.name)
    },
    sumDebits(param) {
      const debits = this.totalizerSpents.reduce((acc, item) => {
        if (item.category.toLowerCase().includes('dividir')) return acc + item.totalSpent / 2;
    if (this.isCategoryOfOthers(param).includes(item.category)) return acc + item.totalSpent
    return acc
      }, 0)
    return this.convertToCurrency(debits)
    },
    updateSummaryState() {
      return this.$store.commit('summary/addSummary', this.totalizerSpents);
    }
  },
    computed: {
      spents() {
      return this.$store.state.spents.spentList.filter(spent => spent.date.substring(0, 7) === this.month)
    },
    totalizerSpents() {
      const categories = [...new Set(this.spents.map(spent => spent.category))];
      const totalizer = categories.map(category => {
        const spentsByCategory = this.spents.filter(spent => spent.category === category);
        const totalSpentByCategory = spentsByCategory.reduce((acc, spent) => acc + Number(spent.spentValue), 0);
    return {
      id: uuidv4(),
    category: category,
    totalSpent: totalSpentByCategory,
    expanded: false,
    spents: spentsByCategory
        };
      });
    return totalizer
    },
    ...mapGetters({
      getCategories: 'categories/getCategories'
    })
  },
    beforeMount() {
      this.updateSummaryState()
    },
    watch: {
      spents() {
      this.updateSummaryState()
    }
  }
}
</script> -->
