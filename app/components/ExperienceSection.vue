<template>
  <section>
    <div class="text-xs tracking-[0.25em] text-muted-foreground uppercase">
      Experience
    </div>
    <div class="mt-6 space-y-6">
      <div
        v-for="(experience, index) in experiences"
        :key="experience.company"
        class="group cursor-pointer"
        @mouseenter="hoveredIndex = index"
        @mouseleave="hoveredIndex = null">
        <div class="flex items-start justify-between gap-6">
          <div class="flex items-start gap-3 min-w-0 flex-1">
            <img
              v-if="experience.image"
              :src="experience.image"
              :alt="experience.company"
              class="w-5 h-5 mt-0.5 shrink-0 grayscale opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
            <div class="min-w-0 flex-1">
              <div class="text-sm font-semibold leading-tight">
                {{ experience.company }}
              </div>
              <div
                v-if="experience.title"
                class="mt-1 text-xs text-muted-foreground">
                {{ experience.title }}
              </div>
              <Transition
                enter-active-class="transition-all duration-300 ease-out"
                enter-from-class="opacity-0 max-h-0 mt-0"
                enter-to-class="opacity-100 max-h-96 mt-2"
                leave-active-class="transition-all duration-300 ease-in"
                leave-from-class="opacity-100 max-h-96 mt-2"
                leave-to-class="opacity-0 max-h-0 mt-0">
                <div
                  v-if="experience.description && hoveredIndex === index"
                  class="text-xs text-muted-foreground leading-relaxed overflow-hidden">
                  {{ experience.description }}
                </div>
              </Transition>
            </div>
          </div>
          <div class="text-xs text-muted-foreground whitespace-nowrap">
            {{ experience.date }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

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

