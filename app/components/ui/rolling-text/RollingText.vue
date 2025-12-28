<template>
  <span
    ref="containerRef"
    class="inline-flex cursor-pointer"
  >
    <span
      v-for="(char, i) in characters"
      :key="i"
      class="relative inline-block overflow-hidden h-[1em] leading-[1em] align-bottom"
    >
      <span
        class="block will-change-transform transition-transform"
        :style="{
          transform: isHovered ? 'translateY(-50%)' : 'translateY(0%)',
          transitionDuration: '450ms',
          transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
          transitionDelay: getDelay(i)
        }"
      >
        <span :class="['block h-[1em] leading-[1em]', fromClass]">
          {{ char }}
        </span>
        <span :class="['block h-[1em] leading-[1em]', toClass]">
          {{ char }}
        </span>
      </span>
    </span>
  </span>
</template>

<script setup lang="ts">
import { useElementHover } from '@vueuse/core'

const props = withDefaults(defineProps<{
  text: string
  fromClass?: string
  toClass?: string
  staggerDelay?: number
}>(), {
  fromClass: 'text-foreground',
  toClass: 'text-primary',
  staggerDelay: 0.035
})

const containerRef = ref<HTMLElement | null>(null)
const isHovered = useElementHover(containerRef)

const characters = computed(() => {
  return props.text.split('').map(ch => ch === ' ' ? '\u00A0' : ch)
})

function getDelay(index: number): string {
  const effectiveIndex = isHovered.value 
    ? index 
    : props.text.length - 1 - index
  return `${effectiveIndex * props.staggerDelay}s`
}
</script>
