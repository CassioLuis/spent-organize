<script setup>
import { defineProps, ref, onMounted } from 'vue';

const props = defineProps({
  options: {
    type: Array,
    required: true
  },
  value: {
    type: String
  }
})
const selectedOption = ref('')

onMounted(() => {
  selectedOption.value = props.value
})
</script>

<template>
  <select v-model="selectedOption" :class="conditionalStyle">
    <option v-for="option in options" :value="option.name || option" class="text-lg">{{ option.name || option }}</option>
  </select>
</template>