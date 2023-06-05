<template>
  <div class="w-[300px] h-full bg-sky-950 px-5 pt-16">
    <h1 class="mb-4 text-xl">Menu</h1>
    <div class="flex flex-col pb-2 gap-2 w-full">
      <slot name="options" />
    </div>
  </div>
</template>