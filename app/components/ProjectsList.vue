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

    <!-- Project cards -->
    <div class="mt-6 grid gap-4 sm:grid-cols-2">
      <article
        v-for="(project, index) in projects"
        :key="project.name"
        class="group relative flex flex-col rounded-2xl border border-border bg-card p-6 shadow-xs transition-[border-color,box-shadow,translate] duration-300 ease-out hover:border-foreground/20 hover:shadow-xl hover:shadow-foreground/[0.06] motion-safe:hover:-translate-y-1 focus-within:border-foreground/20"
        @mouseenter="onEnter(project)"
        @mouseleave="onLeave">

        <div class="flex items-center justify-between">
          <span class="font-mono text-[11px] tabular-nums tracking-wider text-muted-foreground/70">
            {{ String(index + 1).padStart(2, '0') }}
          </span>
          <span class="grid size-7 place-items-center rounded-full border border-border text-muted-foreground transition-colors duration-300 group-hover:border-foreground group-hover:bg-foreground group-hover:text-background">
            <LucideArrowUpRight class="size-3.5 transition-transform duration-300 ease-out motion-safe:group-hover:rotate-45" />
          </span>
        </div>

        <h3 class="mt-5 text-base font-semibold tracking-tight">
          <!-- Stretched link: the ::after makes the whole card clickable -->
          <NuxtLink
            :to="primaryLink(project)"
            external
            target="_blank"
            rel="noopener noreferrer"
            class="outline-none after:absolute after:inset-0 after:rounded-2xl focus-visible:after:ring-2 focus-visible:after:ring-ring">
            {{ project.name }}
          </NuxtLink>
        </h3>
        <p class="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
          {{ project.description }}
        </p>

        <div class="relative z-10 mt-6 flex flex-wrap items-center gap-2 border-t border-dashed border-border pt-4">
          <NuxtLink
            v-for="(link, i) in projectLinks(project)"
            :key="link.label"
            :to="link.href"
            external
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="`${project.name} – ${link.label}`"
            class="group/btn inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium outline-none transition-[color,background-color,border-color,scale] duration-200 active:scale-95 focus-visible:ring-2 focus-visible:ring-ring"
            :class="i === 0
              ? 'border-foreground bg-foreground text-background hover:bg-foreground/85'
              : 'border-border bg-background text-muted-foreground hover:border-foreground/30 hover:text-foreground'">
            <component
              :is="link.icon"
              class="size-3.5 transition-transform duration-200 ease-out motion-safe:group-hover/btn:scale-110 motion-safe:group-hover/btn:-rotate-6" />
            {{ link.label }}
          </NuxtLink>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LucideArrowUpRight, LucideGithub, LucideGlobe, LucidePackage } from 'lucide-vue-next'

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

const linkTypes = [
  { key: 'demo', label: 'Live', icon: LucideGlobe },
  { key: 'github', label: 'GitHub', icon: LucideGithub },
  { key: 'npm', label: 'NPM', icon: LucidePackage },
] as const

function projectLinks(project: Project) {
  return linkTypes.flatMap(({ key, ...rest }) => project[key] ? [{ ...rest, href: project[key] }] : [])
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
