<script setup>
import { useCategoriesStore } from '@/stores/categories.js'
import Selector from '@/components/Selector.vue';
import { ref } from 'vue'

const { getCategories } = useCategoriesStore()
const categories = useCategoriesStore()
const subCategories = ['Essencial', 'Dispensaveis', 'Outros', 'Eventuais']

const category = ref('')

const addCategory = () => categories.add(category)

</script>
<template>
  <div class="p-4 border rounded w-[100%] h-auto">
    <div class="flex gap-4">
      <input @keyup.enter="addCategory" v-model="category" placeholder="Digite uma categoria e pressione enter!"
        class="w-full p-2 text-black rounded">
    </div>
    <div>
      <table class="w-full rounded">
        <thead class="text-xl block pt-4">
          <tr class="flex border-b border-gray-600 py-2">
            <!-- <th>Outros</th> -->
            <th class="grow basis-1 text-left">Descrição</th>
            <th class="grow basis-1 text-center">Sub-Categoria</th>
            <th class="grow basis-1 text-center"></th>
          </tr>
        </thead>
        <tbody class="text-sm max-h-[70vh] flex flex-col overflow-auto px-4">
          <tr v-for="item in getCategories" class="flex py-1 font-semibold border-b border-gray-600">
            <!-- <td class="text-center">
                <input type="checkbox" class="cursor-pointer" :checked="item.otherPeople"
                  @change="isToAnotherPeopleCategory(item)">
              </td> -->
            <td class="grow basis-1 flex items-center">{{ item.name }}</td>
            <td class="grow basis-1 flex items-center justify-center">
              <Selector helperMsg="Por favor, escolha uma opção..." :required="true" :options="subCategories"
                class="h-8 px-2 bg-gray-800 text-white border rounded border-gray-600 cursor-pointer" />
            </td>
            <td class="grow basis-1 flex items-center justify-end">
              <font-awesome-icon class="cursor-pointer text-red-400" :icon="['fas', 'trash-can']" @click="remove(item)" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<!-- <script>
import { mapMutations } from 'vuex'
import Selector from '../../components/Selector.vue'

export default {
  name: 'spentlist',
  layout: 'default',
  components: { Selector },
  data() {
    return {
      category: {
        name: '',
        otherPeople: false
      },
      subCategories: ['Essencial', 'Dispensaveis', 'Outros', 'Eventuais']
    }
  },
  computed: {
    categories() {
      return this.$store.state.categories.categoryList
    }
  },
  methods: {
    addCategory() {
      this.$store.commit('categories/addCategory', this.category)
      this.category = {
        name: '',
        otherPeople: false
      }
    },
    ...mapMutations({
      remove: 'categories/remove',
      isToAnotherPeopleCategory: 'categories/isToAnotherPeopleCategory'
    })
  }
}
</script> -->