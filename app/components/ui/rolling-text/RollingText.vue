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

    <Teleport to="body">
      <span
        class="pointer-events-none fixed z-[9999] rounded-full border-2 border-primary"
        :class="isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-50'"
        :style="{
          width: '1em',
          height: '1em',
          fontSize: 'inherit',
          left: `${smoothX}px`,
          top: `${smoothY}px`,
          transform: 'translate(-50%, -50%)',
          transition: 'opacity 0.2s ease, transform 0.2s ease'
        }"
      />
    </Teleport>
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

const mouseX = ref(0)
const mouseY = ref(0)
const smoothX = ref(0)
const smoothY = ref(0)

function onMouseMove(e: MouseEvent) {
  mouseX.value = e.clientX
  mouseY.value = e.clientY
}

let animationId: number | null = null

function animate() {
  const ease = 0.15
  smoothX.value += (mouseX.value - smoothX.value) * ease
  smoothY.value += (mouseY.value - smoothY.value) * ease
  animationId = requestAnimationFrame(animate)
}

onMounted(() => {
  animationId = requestAnimationFrame(animate)
})

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
})
</script>
