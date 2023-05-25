<script setup>
import { defineProps, ref, onMounted, reactive } from 'vue';

const props = defineProps({
  options: {
    type: Array,
    required: true
  },
  value: {
    type: String
  }
})

const data = reactive({
  'border border-red-500': !props.value ? true : false
})
const selectedOption = ref('')

onMounted(() => {
  selectedOption.value = props.value
})
</script>

<template>
  <select v-model="selectedOption" >
    <option v-for="option in options" :value="option.name || option">{{ option.name || option }}</option>
  </select>
</template>