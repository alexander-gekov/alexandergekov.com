<template>
  <section>
    <div class="text-xs tracking-[0.25em] text-muted-foreground uppercase">
      Experience
    </div>
    <div class="mt-6 space-y-6">
      <div
        v-for="experience in experiences"
        :key="experience.company"
        class="flex items-start justify-between gap-6">
        <div class="flex items-start gap-3 min-w-0">
          <img
            v-if="experience.image"
            :src="experience.image"
            :alt="experience.company"
            class="w-5 h-5 mt-0.5 shrink-0 grayscale opacity-80" />
          <div class="min-w-0">
            <div class="text-sm font-semibold leading-tight">
              {{ experience.company }}
            </div>
            <div
              v-if="experience.title"
              class="mt-1 text-xs text-muted-foreground">
              {{ experience.title }}
            </div>
          </div>
        </div>
        <div class="text-xs text-muted-foreground whitespace-nowrap">
          {{ experience.date }}
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Experience {
  company: string
  title?: string
  date: string
  image?: string
}

defineProps<{
  experiences: Experience[]
}>()
</script>

