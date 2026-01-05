<script setup lang="ts">
const gridSize = 80
const dotSize = 2
const lineOpacity = 0.06

const dottedSquares = ref<Array<{ x: number; y: number; delay: number }>>([])

onMounted(() => {
  generateDottedSquares()
  window.addEventListener('resize', generateDottedSquares)
})

onUnmounted(() => {
  window.removeEventListener('resize', generateDottedSquares)
})

const generateDottedSquares = () => {
  const cols = Math.ceil(window.innerWidth / gridSize)
  const rows = Math.ceil(window.innerHeight / gridSize) + 10
  const totalSquares = cols * rows
  const numDotted = Math.floor(totalSquares * 0.03)
  
  const squares: Array<{ x: number; y: number; delay: number }> = []
  const usedPositions = new Set<string>()
  
  for (let i = 0; i < numDotted; i++) {
    let x, y, key
    let attempts = 0
    do {
      x = Math.floor(Math.random() * cols)
      y = Math.floor(Math.random() * rows)
      key = `${x}-${y}`
      attempts++
    } while (usedPositions.has(key) && attempts < 50)
    
    if (!usedPositions.has(key)) {
      usedPositions.add(key)
      squares.push({
        x: x * gridSize,
        y: y * gridSize,
        delay: Math.random() * 5
      })
    }
  }
  
  dottedSquares.value = squares
}
</script>

<template>
  <div class="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
    <svg class="absolute inset-0 w-full h-full">
      <defs>
        <pattern
          id="grid-pattern"
          :width="gridSize"
          :height="gridSize"
          patternUnits="userSpaceOnUse"
        >
          <line
            x1="0"
            y1="0"
            x2="0"
            :y2="gridSize"
            class="stroke-foreground"
            :stroke-opacity="lineOpacity"
            stroke-width="1"
          />
          <line
            x1="0"
            y1="0"
            :x2="gridSize"
            y2="0"
            class="stroke-foreground"
            :stroke-opacity="lineOpacity * 0.5"
            stroke-width="1"
          />
        </pattern>
        
        <pattern
          id="dot-pattern"
          :width="gridSize / 4"
          :height="gridSize / 4"
          patternUnits="userSpaceOnUse"
        >
          <circle
            :cx="gridSize / 8"
            :cy="gridSize / 8"
            :r="dotSize"
            class="fill-foreground"
            fill-opacity="0.15"
          />
        </pattern>
      </defs>
      
      <rect width="100%" height="100%" fill="url(#grid-pattern)" />
    </svg>
    
    <div
      v-for="(square, index) in dottedSquares"
      :key="index"
      class="absolute dotted-square"
      :style="{
        left: `${square.x}px`,
        top: `${square.y}px`,
        width: `${gridSize}px`,
        height: `${gridSize}px`,
        animationDelay: `${square.delay}s`
      }"
    >
      <svg :width="gridSize" :height="gridSize" class="w-full h-full">
        <rect
          x="0"
          y="0"
          :width="gridSize"
          :height="gridSize"
          fill="url(#dot-pattern)"
        />
      </svg>
    </div>
  </div>
</template>

<style scoped>
.dotted-square {
  opacity: 0;
  animation: fadeInOut 8s ease-in-out infinite;
}

@keyframes fadeInOut {
  0%, 100% {
    opacity: 0;
  }
  20%, 80% {
    opacity: 1;
  }
}
</style>

