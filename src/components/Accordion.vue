<script setup>

const onBeforeEnter = (el) => {
  const { style } = el;
  const styles = {
    transitionDuration: '200ms',
    height: '0',
    opacity: '0'
  };
  Object.assign(style, styles);
}

const onEnter = (el) => {
  el.style.height = el.scrollHeight + 'px';
  setTimeout(() => {
    el.style.opacity = '1'
  }, 100)
}

const onBeforeLeave = (el) => {
  el.style.height = el.scrollHeight + 'px';
}

const onLeave = (el) => {
  const { style } = el;
  const styles = {
    transitionDuration: '200ms',
    opacity: '0',
    height: '0'
  };
  Object.assign(style, styles);
}
</script>
<template>
  <div class="transition-all">
    <div class="flex flex-col">
      <div class="flex justify-between cursor-pointer">
        <slot name="accordion-tittle">Accordion-tittle</slot>
      </div>
      <TransitionGroup tag="ul" @before-enter="onBeforeEnter" @enter="onEnter" @before-leave="onBeforeLeave"
        @leave="onLeave">
        <slot name="accordion-content"></slot>
      </TransitionGroup>
    </div>
  </div>
</template>