<template>
  <section>
    <SectionHeading>Developer Relations</SectionHeading>
    <div class="mt-6 space-y-5">
      <div
        v-for="item in items"
        :key="item.title"
        class="flex items-start justify-between gap-6">
        <div class="flex items-start gap-3 min-w-0 flex-1">
          <img
            v-if="item.image"
            :src="item.image"
            :alt="`${item.title} logo`"
            class="w-5 h-5 mt-0.5 shrink-0 grayscale opacity-80" />
          <div class="min-w-0">
            <div class="text-sm font-semibold leading-tight w-fit z-50 relative">
              {{ item.title }}
            </div>
            <p
              v-if="item.description"
              class="mt-1 text-xs text-muted-foreground w-fit z-50 relative">
              {{ item.description }}
            </p>
          </div>
        </div>
        <div class="font-mono text-xs tabular-nums text-muted-foreground whitespace-nowrap">
          {{ item.date }}
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface DeveloperRelation {
  title: string
  description?: string
  date: string
  image?: string
}

defineProps<{
  items: DeveloperRelation[]
}>()
</script>

