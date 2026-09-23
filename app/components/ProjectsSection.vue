<template>
  <section class="relative z-50 w-full mb-16 pointer-events-auto">
    <div class="max-w-2xl mx-auto px-4 lg:px-0">
      <div class="flex items-baseline justify-between gap-4">
        <div class="text-xs tracking-[0.25em] text-muted-foreground uppercase">
          Projects
        </div>
        <button
          v-if="projects.length > FEATURED"
          type="button"
          :aria-expanded="showAll"
          class="group inline-flex cursor-pointer items-center gap-1 text-xs font-medium text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:text-foreground"
          @click="showAll = !showAll">
          {{ showAll ? 'Show less' : `See all ${projects.length}` }}
          <LucideChevronRight
            class="size-3.5 transition-transform duration-200 ease-out"
            :class="showAll ? '-rotate-90' : 'motion-safe:group-hover:translate-x-0.5'" />
        </button>
      </div>
      <ProjectsList :projects="showAll ? projects : projects.slice(0, FEATURED)" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { LucideChevronRight } from 'lucide-vue-next'

interface Project {
  name: string
  description: string
  image: string
  demo?: string
  github?: string
  npm?: string
}

defineProps<{
  projects: Project[]
}>()

const FEATURED = 4
const showAll = ref(false)
</script>
