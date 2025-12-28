<template>
  <span
    ref="containerRef"
    class="inline-flex cursor-none"
    @mousemove="onMouseMove"
  >
    <span
      v-for="(char, i) in characters"
      :key="i"
      class="relative inline-block overflow-hidden h-[1em] leading-[1em] align-bottom"
    >
      <Motion
        as="span"
        class="block will-change-transform"
        :animate="{ y: isHovered ? '-50%' : '0%' }"
        :transition="{
          duration: 0.45,
          ease: [0.22, 1, 0.36, 1],
          delay: getDelay(i)
        }"
      >
        <span :class="['block h-[1em] leading-[1em]', fromClass]">
          {{ char }}
        </span>
        <span :class="['block h-[1em] leading-[1em]', toClass]">
          {{ char }}
        </span>
      </Motion>
    </span>

    <Teleport to="body">
      <Motion
        as="span"
        class="pointer-events-none fixed z-[9999] rounded-full border-2 border-primary"
        :animate="{
          x: mouseX,
          y: mouseY,
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0.5
        }"
        :transition="{
          x: { type: 'spring', stiffness: 150, damping: 15 },
          y: { type: 'spring', stiffness: 150, damping: 15 },
          opacity: { duration: 0.2 },
          scale: { duration: 0.2 }
        }"
        :style="{
          width: '1em',
          height: '1em',
          fontSize: 'inherit',
          left: 0,
          top: 0,
          translateX: '-50%',
          translateY: '-50%'
        }"
      />
    </Teleport>
  </span>
</template>

<script setup lang="ts">
import { useElementHover } from '@vueuse/core'
import { Motion } from 'motion-v'

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

function getDelay(index: number): number {
  const effectiveIndex = isHovered.value 
    ? index 
    : props.text.length - 1 - index
  return effectiveIndex * props.staggerDelay
}

const mouseX = ref(0)
const mouseY = ref(0)

function onMouseMove(e: MouseEvent) {
  mouseX.value = e.clientX
  mouseY.value = e.clientY
}
</script>
