<template>
  <!-- Vertical lines: fixed to the viewport, run full page height -->
  <div class="hidden lg:block fixed inset-0 pointer-events-none z-[10]" aria-hidden="true">
    <div class="absolute inset-y-0 w-px bg-border border-line-left" />
    <div class="absolute inset-y-0 w-px bg-border border-line-right" />
  </div>

  <!-- Horizontal lines: absolute so they scroll with the page -->
  <div class="hidden lg:block absolute inset-x-0 top-0 bottom-0 pointer-events-none z-[10]" aria-hidden="true">
    <div class="absolute inset-x-0 h-px bg-border" style="top: 4rem;" />
    <div class="absolute inset-x-0 h-px bg-border" style="bottom: 4rem;" />
  </div>
</template>

<style scoped>
.border-line-left {
  left: calc(50% - 24rem);
}
.border-line-right {
  left: calc(50% + 24rem);
}

@media (min-width: 1920px) {
  .border-line-left {
    left: calc(50% - 31rem);
  }
  .border-line-right {
    left: calc(50% + 31rem);
  }
}
</style>
