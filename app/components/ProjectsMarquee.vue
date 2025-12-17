<template>
  <div class="marquee-wrap relative mt-4 overflow-hidden">
    <div class="marquee-track flex w-max items-stretch gap-4 py-2">
      <div
        v-for="(project, idx) in duplicated"
        :key="`${project.name}-${idx}`"
        class="group/item relative w-[260px] shrink-0 sm:w-[320px]">
        <div
          class="relative h-full overflow-hidden rounded-xl border bg-background/40 backdrop-blur-sm transition-colors duration-300 group-hover/item:border-foreground/20">
          <div class="aspect-[16/10] overflow-hidden">
            <img
              :src="project.image"
              :alt="project.name"
              class="h-full w-full object-cover transition-transform duration-700 group-hover/item:scale-110" />
          </div>

          <div
            class="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent opacity-0 transition-opacity duration-300 group-hover/item:opacity-100" />

          <div
            class="absolute inset-0 flex flex-col justify-end p-4 opacity-0 transition-opacity duration-300 group-hover/item:opacity-100">
            <div class="text-sm font-semibold tracking-tight text-foreground">
              {{ project.name }}
            </div>
            <div class="mt-1 text-xs leading-relaxed text-foreground/80 line-clamp-3">
              {{ project.description }}
            </div>

            <div class="mt-3 flex flex-wrap gap-2">
              <Button v-if="project.github" variant="outline" size="sm" asChild>
                <NuxtLink
                  :to="project.github"
                  external
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center gap-1 text-xs h-7 px-2">
                  <LucideGithub class="size-3" />
                  GitHub
                </NuxtLink>
              </Button>

              <Button v-if="project.npm" variant="outline" size="sm" asChild>
                <NuxtLink
                  :to="project.npm"
                  external
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center gap-1 text-xs h-7 px-2">
                  <div class="size-3 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" class="size-2.5">
                      <path
                        fill="currentColor"
                        d="M0 0v24h24V0H0zm19.2 19.2H4.8V4.8h14.4v14.4z" />
                    </svg>
                  </div>
                  NPM
                </NuxtLink>
              </Button>

              <Button v-if="project.demo" variant="outline" size="sm" asChild>
                <NuxtLink
                  :to="project.demo"
                  external
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center gap-1 text-xs h-7 px-2">
                  <LucideExternalLink class="size-3" />
                  Live
                </NuxtLink>
              </Button>
            </div>
          </div>
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

const props = withDefaults(
  defineProps<{
    projects: Project[]
    durationSeconds?: number
  }>(),
  {
    durationSeconds: 42,
  },
)

const duplicated = computed(() => [...props.projects, ...props.projects])
</script>

<style scoped>
.marquee-track {
  animation: marquee var(--duration, 42s) linear infinite;
}

.marquee-wrap:hover .marquee-track {
  animation-play-state: paused;
}

@keyframes marquee {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .marquee-track {
    animation: none;
    transform: none;
  }
}
</style>
