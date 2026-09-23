<template>
  <div
    class="relative rounded-2xl p-1 shadow-[var(--tray-shadow)] transition-shadow duration-200 ease-out"
    :class="interactive && 'group hover:shadow-[var(--tray-shadow-hover)] focus-within:shadow-[var(--tray-shadow-hover)]'">
    <div
      class="h-full overflow-hidden rounded-xl border border-border bg-card transition-colors duration-200 ease-out"
      :class="interactive && 'group-hover:border-[var(--border-strong)]'">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  interactive?: boolean
}>()
</script>
