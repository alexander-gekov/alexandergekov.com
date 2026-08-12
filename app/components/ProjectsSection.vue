<template>
  <section class="relative z-50 w-full mb-16 pointer-events-auto">
    <div class="max-w-2xl 3xl:max-w-4xl mx-auto px-4 lg:px-0">
      <SectionHeading>Projects</SectionHeading>
      <ProjectsList :projects="projects" />
    </div>
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
