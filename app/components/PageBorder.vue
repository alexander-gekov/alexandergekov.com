<template>
  <!-- Vertical lines: fixed to the viewport, run full page height -->
  <div class="hidden lg:block fixed inset-0 pointer-events-none z-[10]" aria-hidden="true">
    <div class="absolute inset-y-0 w-px bg-border" style="left: calc(50% - 25rem);" />
    <div class="absolute inset-y-0 w-px bg-border" style="left: calc(50% + 25rem);" />
  </div>

  <!-- Horizontal lines: absolute so they scroll with the page -->
  <div class="hidden lg:block absolute inset-x-0 top-0 bottom-0 pointer-events-none z-[10]" aria-hidden="true">
    <div class="absolute inset-x-0 h-px bg-border" style="top: 4rem;" />
    <div class="absolute inset-x-0 h-px bg-border" style="bottom: 4rem;" />
  </div>
</template>
