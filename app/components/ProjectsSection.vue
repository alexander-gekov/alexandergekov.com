<template>
  <section class="relative z-50 w-full mb-16 pointer-events-auto">
    <div class="max-w-4xl mx-auto px-4 lg:px-0 mb-6">
      <div class="text-xs tracking-[0.25em] text-muted-foreground uppercase">
        Projects
      </div>
    </div>
    <ProjectsMarquee :projects="projects" :duration-seconds="48" />
  </section>
</template>

<script setup lang="ts">
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
</script>

