<template>
  <section>
    <div class="text-xs tracking-[0.25em] text-muted-foreground uppercase">
      Developer Relations
    </div>
    <Tray class="mt-6">
      <div class="divide-y divide-border">
        <div
          v-for="item in items"
          :key="item.title"
          class="flex flex-col gap-1 px-4 py-3.5 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
          <div class="flex min-w-0 flex-1 items-start gap-3">
            <img
              v-if="item.image"
              :src="item.image"
              :alt="item.title"
              class="mt-0.5 size-5 shrink-0 grayscale opacity-80" />
            <div class="min-w-0">
              <div class="text-sm font-medium leading-tight tracking-tight">
                {{ item.title }}
              </div>
              <div
                v-if="item.description"
                class="mt-1 text-xs text-muted-foreground">
                {{ item.description }}
              </div>
            </div>
          </div>
          <div class="shrink-0 whitespace-nowrap text-xs text-muted-foreground">
            {{ item.date }}
          </div>
        </div>
      </div>
    </Tray>
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

