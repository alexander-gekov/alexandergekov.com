<template>
  <div class="fixed inset-0 pointer-events-none z-[10]" aria-hidden="true">
    <!-- Vertical lines: 1rem outside the max-w-4xl (56rem) content column -->
    <div class="absolute inset-y-0 w-px bg-border" style="left: calc(50% - 29rem);" />
    <div class="absolute inset-y-0 w-px bg-border" style="left: calc(50% + 29rem);" />

    <!-- Horizontal lines: 1rem from the top/bottom of the viewport,
         spanning only between the two vertical lines -->
    <div
      class="absolute h-px bg-border"
      style="top: 1rem; left: calc(50% - 29rem); right: calc(50% - 29rem);" />
    <div
      class="absolute h-px bg-border"
      style="bottom: 1rem; left: calc(50% - 29rem); right: calc(50% - 29rem);" />
  </div>
</template>
