<template>
  <select v-model="selectedOption" :class="conditionalStyle">
    <option v-if="this.required" :value="selectedOption" selected hidden class="text-red-500">{{ this.selectedOption }}
    </option>
    <option v-for="option in options" :value="option.name || option" class="text-lg">{{ option.name || option }}</option>
  </select>
</template>
<script>

export default {
  props: {
    options: {
      type: Array,
      required: true
    },
    required: {
      type: Boolean
    },
    value: {
      type: String
    }
  },
  data() {
    return {
      selectedOption: 'Seleção Obrigatória',
    }
  },
  computed: {
    conditionalStyle() {
      if (this.required && this.selectedOption === 'Seleção Obrigatória')
        return 'border border-red-500 text-xs text-red-500'
    }
  },
  watch: {
    selectedOption(newValue) {
      this.$emit('input', newValue)
    },
    value() {
      this.selectedOption = this.value
    }
  }
}
</script>