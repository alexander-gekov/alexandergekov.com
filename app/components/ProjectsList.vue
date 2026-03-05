<template>
  <div
    @mouseenter="onContainerEnter"
    @mouseleave="onLeave"
    @mousemove="onMouseMove">

    <!-- Floating preview image that follows the cursor -->
    <Teleport to="body">
      <div
        class="pointer-events-none fixed z-[9999] overflow-hidden rounded-xl shadow-2xl border border-border/50 bg-background"
        :style="{
          width: '340px',
          left: `${currentX}px`,
          top: `${currentY}px`,
          opacity: activeProject ? 1 : 0,
          transform: `translate(-50%, calc(-100% - 20px)) scale(${activeProject ? 1 : 0.92})`,
          transition: 'opacity 0.22s ease, transform 0.22s ease',
        }">
        <img
          v-if="shownProject"
          :src="shownProject.image"
          :alt="shownProject.name"
          class="w-full aspect-[16/10] object-cover block" />
      </div>
    </Teleport>

    <!-- Project list -->
    <div class="mt-6 space-y-5">
      <div
        v-for="project in projects"
        :key="project.name"
        class="flex items-start xl:items-center justify-between gap-6"
        @mouseenter="activeProject = project; shownProject = project"
        @mouseleave="activeProject = null">

        <div class="flex items-center gap-3 min-w-0">
          <NuxtLink
            :to="primaryLink(project)"
            external
            target="_blank"
            rel="noopener noreferrer"
            class="text-sm font-semibold tracking-tight hover:underline underline-offset-4">
            {{ project.name }}
          </NuxtLink>
        </div>

        <!-- Secondary links shown as small muted badges -->
        <div class="flex items-center gap-2 shrink-0 text-xs text-muted-foreground">
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
type Project = {
  name: string
  description: string
  image: string
  github?: string
  npm?: string
  demo?: string
}

defineProps<{
  projects: Project[]
}>()

const activeProject = ref<Project | null>(null)
const shownProject = ref<Project | null>(null)

const targetX = ref(0)
const targetY = ref(0)
const currentX = ref(0)
const currentY = ref(0)
let rafId: number | null = null

const lerp = (a: number, b: number, t: number) => a + (b - a) * t

function tick() {
  currentX.value = lerp(currentX.value, targetX.value, 0.12)
  currentY.value = lerp(currentY.value, targetY.value, 0.12)
  rafId = requestAnimationFrame(tick)
}

onMounted(() => tick())
onUnmounted(() => { if (rafId !== null) cancelAnimationFrame(rafId) })

function primaryLink(project: Project): string {
  return project.demo ?? project.github ?? project.npm ?? '#'
}

function onMouseMove(e: MouseEvent) {
  targetX.value = e.clientX
  targetY.value = e.clientY
}

function onContainerEnter(e: MouseEvent) {
  currentX.value = e.clientX
  currentY.value = e.clientY
  targetX.value = e.clientX
  targetY.value = e.clientY
}

function onLeave() {
  activeProject.value = null
  setTimeout(() => {
    if (!activeProject.value) shownProject.value = null
  }, 250)
}
</script>
