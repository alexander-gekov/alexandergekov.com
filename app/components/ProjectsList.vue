<template>
  <div
    class="relative"
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
    <ul class="border-t border-border/30">
      <li
        v-for="(project, i) in projects"
        :key="project.name"
        class="group/row relative flex items-center gap-5 py-4 border-b border-border/30 select-none transition-opacity duration-200"
        :class="{ 'opacity-40': isHovering && activeProject?.name !== project.name }"
        @mouseenter="activeProject = project; shownProject = project; isHovering = true">

        <!-- Index -->
        <span class="text-xs tabular-nums text-muted-foreground/40 w-6 text-right shrink-0">
          {{ String(i + 1).padStart(2, '0') }}
        </span>

        <!-- Project name -->
        <span class="flex-1 text-sm sm:text-base font-medium tracking-tight truncate">
          {{ project.name }}
        </span>

        <!-- Links — visible on row hover -->
        <div class="flex items-center gap-1.5 shrink-0 opacity-0 group-hover/row:opacity-100 transition-opacity duration-150">
          <NuxtLink
            v-if="project.github"
            :to="project.github"
            external
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors px-2.5 py-1 rounded-md border border-border/60 hover:border-border hover:bg-muted/50 cursor-pointer">
            <LucideGithub class="size-3 shrink-0" />
            GitHub
          </NuxtLink>

          <NuxtLink
            v-if="project.npm"
            :to="project.npm"
            external
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors px-2.5 py-1 rounded-md border border-border/60 hover:border-border hover:bg-muted/50 cursor-pointer">
            <svg viewBox="0 0 24 24" class="size-3 shrink-0" fill="currentColor">
              <path d="M0 0v24h24V0H0zm19.2 19.2H4.8V4.8h14.4v14.4z" />
            </svg>
            NPM
          </NuxtLink>

          <NuxtLink
            v-if="project.demo"
            :to="project.demo"
            external
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors px-2.5 py-1 rounded-md border border-border/60 hover:border-border hover:bg-muted/50 cursor-pointer">
            <LucideExternalLink class="size-3 shrink-0" />
            Live
          </NuxtLink>
        </div>
      </li>
    </ul>
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
const isHovering = ref(false)

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

function onMouseMove(e: MouseEvent) {
  targetX.value = e.clientX
  targetY.value = e.clientY
}

// Snap to exact position on first entry so the image doesn't fly in from (0, 0)
function onContainerEnter(e: MouseEvent) {
  currentX.value = e.clientX
  currentY.value = e.clientY
  targetX.value = e.clientX
  targetY.value = e.clientY
}

function onLeave() {
  activeProject.value = null
  isHovering.value = false
  setTimeout(() => {
    if (!activeProject.value) shownProject.value = null
  }, 250)
}
</script>
