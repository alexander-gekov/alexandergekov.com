<template>
  <section>
    <SectionHeading>Experience</SectionHeading>
    <div class="mt-6 space-y-1">
      <div
        v-for="(experience, index) in experiences"
        :key="experience.company"
        class="group rounded-lg px-3 py-3 -mx-3 transition-colors duration-200"
        :class="expandedIndex === index ? 'bg-muted/50' : 'hover:bg-muted/50'">
        <div class="flex items-start justify-between gap-6 xl:gap-12">
          <div class="flex items-start gap-3 min-w-0 w-fit">
            <div v-if="experience.image" class="w-6 shrink-0 mt-0.5 flex items-center justify-center">
              <img
                :src="experience.image"
                :alt="`${experience.company} logo`"
                class="h-5 w-auto max-w-6 object-contain transition-all duration-300"
                :class="expandedIndex === index ? 'opacity-100 grayscale-0' : 'grayscale opacity-80 group-hover:opacity-100'" />
            </div>
            <div class="min-w-0 w-fit">
              <!-- The band canvas sits above this section, so only the raised
                   z-50 elements are actually clickable. Keeping the trigger on
                   the title makes the affordance match the real hit area. -->
              <component
                :is="experience.description ? 'button' : 'div'"
                :type="experience.description ? 'button' : undefined"
                :aria-expanded="experience.description ? expandedIndex === index : undefined"
                :aria-controls="experience.description ? `experience-${index}` : undefined"
                class="flex items-center gap-2 z-50 relative w-fit text-left"
                :class="experience.description ? 'cursor-pointer' : ''"
                @click="experience.description && toggle(index)">
                <span class="text-sm font-semibold leading-tight group-hover:underline underline-offset-2 decoration-muted-foreground/50">
                  {{ experience.company }}
                </span>
                <LucideChevronDown
                  v-if="experience.description"
                  class="w-3.5 h-3.5 text-muted-foreground transition-transform duration-300"
                  :class="expandedIndex === index ? 'rotate-180' : ''" />
              </component>
              <div
                v-if="experience.title"
                class="mt-1 text-xs text-muted-foreground z-50 relative w-fit">
                {{ experience.title }}
              </div>
              <div
                v-if="experience.description"
                :id="`experience-${index}`"
                class="overflow-hidden will-change-[max-height,opacity,margin-top] xl:max-w-1/2"
                :class="expandedIndex === index ? 'max-h-[500px] opacity-100 mt-2' : 'max-h-0 opacity-0 mt-0'"
                :style="{
                  transitionProperty: 'max-height, opacity, margin-top',
                  transitionDuration: expandedIndex === index ? '400ms, 350ms, 350ms' : '350ms, 200ms, 350ms',
                  transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                  transitionDelay: expandedIndex === index ? '0ms, 50ms, 0ms' : '0ms, 0ms, 0ms'
                }">
                <p class="text-xs text-muted-foreground leading-relaxed z-50 relative">
                  {{ experience.description }}
                </p>
              </div>
            </div>
          </div>
          <div class="font-mono text-xs tabular-nums text-muted-foreground whitespace-nowrap shrink-0">
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

const expandedIndex = ref<number | null>(null)

const toggle = (index: number) => {
  expandedIndex.value = expandedIndex.value === index ? null : index
}
</script>

