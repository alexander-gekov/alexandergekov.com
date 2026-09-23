<template>
  <section>
    <div class="text-xs tracking-[0.25em] text-muted-foreground uppercase">
      Experience
    </div>
    <Tray class="mt-6">
      <div class="divide-y divide-border">
        <button
          v-for="(experience, index) in experiences"
          :key="experience.company"
          type="button"
          :aria-expanded="hoveredIndex === index"
          class="group/row block w-full cursor-pointer px-4 py-3.5 text-left outline-none transition-colors duration-200 hover:bg-[var(--tint)] focus-visible:bg-[var(--tint)]"
          :class="hoveredIndex === index ? 'bg-[var(--tint)]' : ''"
          @click="hoveredIndex = hoveredIndex === index ? null : index">
          <span class="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-6 xl:gap-12">
            <span class="flex min-w-0 items-start gap-3">
              <span v-if="experience.image" class="grid size-8 shrink-0 place-items-center rounded-lg border border-border bg-background">
                <img
                  :src="experience.image"
                  :alt="experience.company"
                  class="h-4 w-auto max-w-5 object-contain grayscale opacity-80 transition-[filter,opacity] duration-300 group-hover/row:opacity-100 group-hover/row:grayscale-0"
                  :class="hoveredIndex === index ? 'opacity-100 grayscale-0' : ''" />
              </span>
              <span class="block min-w-0">
                <span class="flex items-center gap-1.5">
                  <span class="text-sm font-medium leading-tight tracking-tight">
                    {{ experience.company }}
                  </span>
                  <LucideChevronDown
                    class="size-3.5 shrink-0 text-muted-foreground transition-transform duration-300"
                    :class="hoveredIndex === index ? 'rotate-180' : ''" />
                </span>
                <span
                  v-if="experience.title"
                  class="mt-1 block text-xs text-muted-foreground">
                  {{ experience.title }}
                </span>
                <span
                  v-if="experience.description"
                  class="block overflow-hidden will-change-[max-height,opacity,margin-top] xl:max-w-[85%]"
                  :class="hoveredIndex === index ? 'max-h-[500px] opacity-100 mt-2' : 'max-h-0 opacity-0 mt-0'"
                  :style="{
                    transitionProperty: 'max-height, opacity, margin-top',
                    transitionDuration: hoveredIndex === index ? '400ms, 350ms, 350ms' : '350ms, 200ms, 350ms',
                    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                    transitionDelay: hoveredIndex === index ? '0ms, 50ms, 0ms' : '0ms, 0ms, 0ms'
                  }">
                  <span class="block text-xs leading-relaxed text-muted-foreground">
                    {{ experience.description }}
                  </span>
                </span>
              </span>
            </span>
            <span class="shrink-0 whitespace-nowrap pl-11 text-xs text-muted-foreground sm:pl-0 sm:pt-0.5">
              {{ experience.date }}
            </span>
          </span>
        </button>
      </div>
    </Tray>
  </section>
</template>

<script setup lang="ts">
import { LucideChevronDown } from 'lucide-vue-next'

interface Experience {
  company: string
  title?: string
  date: string
  image?: string
  description?: string
}

defineProps<{
  experiences: Experience[]
}>()

const hoveredIndex = ref<number | null>(null)
</script>

