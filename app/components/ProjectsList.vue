<template>
  <div class="mt-6 grid gap-4 sm:grid-cols-2">
    <article
      v-for="project in projects"
      :key="project.name"
      class="group relative rounded-2xl p-1 shadow-[var(--tray-shadow)] transition-shadow duration-200 ease-out hover:shadow-[var(--tray-shadow-hover)] focus-within:shadow-[var(--tray-shadow-hover)]">
      <div class="flex h-full flex-col rounded-xl border border-border bg-card transition-colors duration-200 ease-out group-hover:border-[var(--border-strong)]">

        <div class="aspect-[16/10] overflow-hidden rounded-t-[11px] border-b border-border">
          <img
            :src="project.image"
            alt=""
            loading="lazy"
            class="size-full object-cover object-top grayscale transition-[filter,scale] duration-500 ease-out group-hover:grayscale-0 motion-safe:group-hover:scale-[1.03]" />
        </div>

        <div class="flex flex-1 flex-col px-4 pt-3.5 pb-4">
          <div class="flex items-center justify-between gap-2">
            <h3 class="min-w-0 text-[15px] font-medium tracking-tight">
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
            <LucideArrowUpRight
              class="size-4 shrink-0 text-muted-foreground opacity-0 scale-75 -translate-x-0.5 transition-[opacity,scale,translate] duration-300 ease-out group-hover:opacity-100 group-hover:scale-100 group-hover:translate-x-0 group-focus-within:opacity-100 group-focus-within:scale-100 group-focus-within:translate-x-0" />
          </div>
          <p class="mt-0.5 flex-1 text-sm leading-relaxed text-muted-foreground">
            {{ project.description }}
          </p>

          <div class="relative z-10 mt-4 flex flex-wrap gap-1.5">
            <NuxtLink
              v-for="link in projectLinks(project)"
              :key="link.label"
              :to="link.href"
              external
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="`${project.name} – ${link.label}`"
              class="group/btn inline-flex items-center gap-1.5 rounded-full bg-[var(--tint)] px-2.5 py-1 text-xs font-medium text-muted-foreground outline-none transition-[color,background-color,scale] duration-200 hover:bg-foreground hover:text-background active:scale-95 focus-visible:ring-2 focus-visible:ring-ring">
              <component
                :is="link.icon"
                class="size-3.5 transition-transform duration-200 ease-out motion-safe:group-hover/btn:-rotate-8 motion-safe:group-hover/btn:scale-110" />
              {{ link.label }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </article>
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

defineProps<{
  projects: Project[]
}>()

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
</script>
