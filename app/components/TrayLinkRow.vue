<template>
  <NuxtLink
    :to="href"
    external
    target="_blank"
    rel="noopener noreferrer"
    class="group/row flex items-center justify-between gap-6 px-4 py-3.5 outline-none transition-colors duration-200 hover:bg-[var(--tint)] focus-visible:bg-[var(--tint)]">
    <span class="min-w-0 text-sm font-medium tracking-tight">{{ title }}</span>
    <span class="flex max-w-[40%] shrink-0 items-center gap-2 text-right text-xs text-muted-foreground">
      {{ meta }}
      <LucideArrowUpRight
        class="size-3.5 shrink-0 opacity-0 scale-75 -translate-x-0.5 transition-[opacity,scale,translate] duration-300 ease-out group-hover/row:opacity-100 group-hover/row:scale-100 group-hover/row:translate-x-0 group-focus-visible/row:opacity-100 group-focus-visible/row:scale-100 group-focus-visible/row:translate-x-0" />
    </span>
  </NuxtLink>
</template>

<script setup lang="ts">
import { LucideArrowUpRight } from 'lucide-vue-next'

defineProps<{
  title: string
  href: string
  meta: string
}>()
</script>
