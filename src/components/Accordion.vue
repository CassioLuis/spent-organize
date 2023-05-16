<template>
  <div>
    <div class="flex flex-col px-1 border rounded border-gray-600 mb-2">
      <div @click="$emit('click')" class="flex justify-between p-2 cursor-pointer">
        <slot name="accordion-tittle">Accordion-tittle</slot>
      </div>
      <TransitionGroup tag="ul" @before-enter="onBeforeEnter" @enter="onEnter" @before-leave="onBeforeLeave"
        @leave="onLeave">
        <slot name="accordion-content"></slot>
      </TransitionGroup>
    </div>
  </div>
</template>
<script>

export default {
  name: 'Accordion',
  data() {
    return {
      height: 0
    }
  },
  methods: {
    onBeforeEnter(el) {
      const { style } = el;
      const styles = {
        transitionDuration: '200ms',
        height: '0',
        opacity: '0'
      };
      Object.assign(style, styles);
    },
    onEnter(el) {
      el.style.height = el.scrollHeight + 'px';
      setTimeout(() => {
        el.style.opacity = '1'
      }, 100)
    },
    onBeforeLeave(el) {
      el.style.height = el.scrollHeight + 'px';
    },
    onLeave(el) {
      const { style } = el;
      const styles = {
        transitionDuration: '200ms',
        opacity: '0',
        height: '0'
      };
      Object.assign(style, styles);
    }
  }
}
</script>