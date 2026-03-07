<template>
  <div
    @mouseenter="onContainerEnter"
    @mousemove="onMouseMove">

    <!--
      Floating preview — disabled on Safari due to fixed+transform compositing issues.
      Two overlapping image layers crossfade between projects without closing the popup.
      The outer wrapper is moved via direct DOM transform (bypasses Vue reactivity for
      max-frequency updates); the inner wrapper drives opacity/scale via CSS transition.
    -->
    <template v-if="!isSafari">
      <Teleport to="body">
        <div
          ref="posEl"
          class="pointer-events-none fixed z-[9999] will-change-transform"
          style="top: 0; left: 0; width: 340px;">
          <div
            class="overflow-hidden rounded-xl shadow-2xl border border-border/50 bg-background"
            :style="{
              opacity: isVisible ? 1 : 0,
              transform: `scale(${isVisible ? 1 : 0.92})`,
              transition: 'opacity 0.22s ease, transform 0.22s ease',
            }">
            <!-- 16/10 aspect ratio container, padding-bottom = 10/16 * 100 -->
            <div class="relative w-full" style="padding-bottom: 62.5%;">
              <img
                :src="imageA"
                alt=""
                class="absolute inset-0 w-full h-full object-cover"
                :style="{ opacity: showingA ? 1 : 0, transition: 'opacity 0.3s ease' }" />
              <img
                :src="imageB"
                alt=""
                class="absolute inset-0 w-full h-full object-cover"
                :style="{ opacity: showingA ? 0 : 1, transition: 'opacity 0.3s ease' }" />
            </div>
          </div>
        </div>
      </Teleport>
    </template>

    <!-- Project list -->
    <div class="mt-6 space-y-5">
      <div
        v-for="project in projects"
        :key="project.name"
        class="flex items-start justify-between gap-6">

        <div class="min-w-0 flex-1">
          <NuxtLink
            :to="primaryLink(project)"
            external
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-1 text-sm font-semibold tracking-tight hover:underline underline-offset-4"
            @mouseenter="onEnter(project)"
            @mouseleave="onLeave">
            {{ project.name }}
            <LucideExternalLink class="w-3 h-3 shrink-0 opacity-60" />
          </NuxtLink>
          <div class="mt-0.5 text-xs text-muted-foreground">
            {{ project.description }}
          </div>
        </div>

        <!-- Right-side secondary links — every project has at least "Live" -->
        <div class="flex items-center gap-2 shrink-0 text-xs text-muted-foreground">
          <NuxtLink
            v-if="project.demo"
            :to="project.demo"
            external
            target="_blank"
            rel="noopener noreferrer"
            class="hover:text-foreground transition-colors">
            Live
          </NuxtLink>
          <span v-if="project.demo && project.github" class="opacity-30">·</span>
          <NuxtLink
            v-if="project.github"
            :to="project.github"
            external
            target="_blank"
            rel="noopener noreferrer"
            class="hover:text-foreground transition-colors">
            GitHub
          </NuxtLink>
          <span v-if="project.github && project.npm" class="opacity-30">·</span>
          <NuxtLink
            v-if="project.npm"
            :to="project.npm"
            external
            target="_blank"
            rel="noopener noreferrer"
            class="hover:text-foreground transition-colors">
            NPM
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LucideExternalLink } from 'lucide-vue-next'

type Project = {
  name: string
  description: string
  image: string
  github?: string
  npm?: string
  demo?: string
}

const props = defineProps<{
  projects: Project[]
}>()

// Detect Safari at setup time (client-only; this component is inside <ClientOnly>).
// Safari has known compositing issues with high-frequency fixed+transform updates.
const isSafari = import.meta.client
  ? /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
  : false

// Template ref for the outer positioning wrapper (manipulated directly in RAF).
const posEl = ref<HTMLElement | null>(null)

// Plain JS variables — not Vue refs — to keep RAF-frequency updates off the
// reactivity system and avoid unnecessary component re-renders every frame.
let targetX = 0
let targetY = 0
let currentX = 0
let currentY = 0
let rafId: number | null = null

const lerp = (a: number, b: number, t: number) => a + (b - a) * t

function tick() {
  currentX = lerp(currentX, targetX, 0.12)
  currentY = lerp(currentY, targetY, 0.12)
  if (posEl.value) {
    // Use transform (not left/top) so the browser can composite on the GPU
    // without triggering layout reflow on every frame.
    posEl.value.style.transform =
      `translate(calc(${currentX}px - 50%), calc(${currentY}px - 100% - 20px))`
  }
  rafId = requestAnimationFrame(tick)
}

// Vue refs that drive CSS transitions (low-frequency, safe to be reactive).
const isVisible = ref(false)
const imageA = ref('')
const imageB = ref('')
const showingA = ref(true)

function switchToImage(src: string) {
  if (!isVisible.value) {
    // First reveal: load both layers identically so no crossfade flicker.
    imageA.value = src
    imageB.value = src
    showingA.value = true
  } else if (showingA.value) {
    imageB.value = src
    showingA.value = false
  } else {
    imageA.value = src
    showingA.value = true
  }
}

function onEnter(project: Project) {
  switchToImage(project.image)
  isVisible.value = true
}

function onLeave() {
  isVisible.value = false
  setTimeout(() => {
    if (!isVisible.value) {
      imageA.value = ''
      imageB.value = ''
    }
  }, 300)
}

function onMouseMove(e: MouseEvent) {
  targetX = e.clientX
  targetY = e.clientY
}

// Snap to the exact entry position so the card doesn't fly in from (0, 0).
function onContainerEnter(e: MouseEvent) {
  currentX = e.clientX
  currentY = e.clientY
  targetX = e.clientX
  targetY = e.clientY
}

function primaryLink(project: Project): string {
  return project.demo ?? project.github ?? project.npm ?? '#'
}

onMounted(() => {
  // Preload all project images so crossfades are instant (no network latency).
  props.projects.forEach(p => {
    const img = new Image()
    img.src = p.image
  })
  if (!isSafari) tick()
})

onUnmounted(() => {
  if (rafId !== null) cancelAnimationFrame(rafId)
})
</script>
