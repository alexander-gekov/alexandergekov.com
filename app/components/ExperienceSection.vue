<template>
  <section>
    <div class="text-xs tracking-[0.25em] text-muted-foreground uppercase">
      Experience
    </div>
    <div class="mt-6 space-y-2">
      <div
        v-for="(experience, index) in experiences"
        :key="experience.company"
        class="group cursor-pointer rounded-lg px-3 py-3 -mx-3 transition-colors duration-200 hover:bg-muted/50"
        :class="hoveredIndex === index ? 'bg-muted/50' : ''"
        @click="hoveredIndex = hoveredIndex === index ? null : index">
        <div class="flex items-start justify-between gap-6 xl:gap-12">
          <div class="flex items-start gap-3 min-w-0 w-fit">
            <div v-if="experience.image" class="w-6 shrink-0 mt-0.5 flex items-center justify-center">
              <img
                :src="experience.image"
                :alt="experience.company"
                class="h-5 w-auto max-w-6 object-contain grayscale opacity-80 transition-opacity duration-300 group-hover:opacity-100"
                :class="hoveredIndex === index ? 'opacity-100 grayscale-0' : ''" />
            </div>
            <div class="min-w-0 w-fit">
              <div class="flex items-center gap-2">
                <div class="text-sm font-semibold leading-tight z-50 relative w-fit group-hover:underline underline-offset-2 decoration-muted-foreground/50">
                  {{ experience.company }}
                </div>
                <LucideChevronDown
                  class="w-3.5 h-3.5 text-muted-foreground transition-transform duration-300"
                  :class="hoveredIndex === index ? 'rotate-180' : ''" />
              </div>
              <div
                v-if="experience.title"
                class="mt-1 text-xs text-muted-foreground z-50 relative w-fit">
                {{ experience.title }}
              </div>
              <div
                v-if="experience.description"
                class="overflow-hidden will-change-[max-height,opacity,margin-top] xl:max-w-1/2"
                :class="hoveredIndex === index ? 'max-h-[500px] opacity-100 mt-2' : 'max-h-0 opacity-0 mt-0'"
                :style="{
                  transitionProperty: 'max-height, opacity, margin-top',
                  transitionDuration: hoveredIndex === index ? '400ms, 350ms, 350ms' : '350ms, 200ms, 350ms',
                  transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                  transitionDelay: hoveredIndex === index ? '0ms, 50ms, 0ms' : '0ms, 0ms, 0ms'
                }">
                <div class="text-xs text-muted-foreground leading-relaxed z-50 relative">
                  {{ experience.description }}
                </div>
              </div>
            </div>
          </div>
          <div class="text-xs text-muted-foreground whitespace-nowrap shrink-0">
            {{ experience.date }}
          </div>
        </div>
      </div>
    </div>
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

