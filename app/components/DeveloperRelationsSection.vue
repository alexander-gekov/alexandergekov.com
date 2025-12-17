<template>
  <section>
    <div class="text-xs tracking-[0.25em] text-muted-foreground uppercase">
      Developer Relations
    </div>
    <div class="mt-6 space-y-6">
      <div
        v-for="item in items"
        :key="item.title"
        class="flex items-start justify-between gap-6">
        <div class="flex items-start gap-3 min-w-0 flex-1">
          <img
            v-if="item.image"
            :src="item.image"
            :alt="item.title"
            class="w-5 h-5 mt-0.5 shrink-0 grayscale opacity-80" />
          <div class="min-w-0">
            <div class="text-sm font-semibold leading-tight">
              {{ item.title }}
            </div>
            <div
              v-if="item.description"
              class="mt-1 text-xs text-muted-foreground">
              {{ item.description }}
            </div>
          </div>
        </div>
        <div class="text-xs text-muted-foreground whitespace-nowrap">
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

