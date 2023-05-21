<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="flex justify-center pt-4 bg-gray-800 h-screen text-gray-300 font-roboto antialiased overflow-hidden">
    <div class="flex flex-col justify-start w-[1200px]">
      <div class="pb-2 flex gap-1 w-full">
        <RouterLink to="/" class="btn">Controle de Gastos</RouterLink>
        <RouterLink to="/categories" class="btn">Categories</RouterLink>
      </div>
      <RouterView />
    </div>
  </div>
</template>