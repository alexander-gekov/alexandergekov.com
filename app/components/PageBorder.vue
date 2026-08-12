<template>
  <!-- Vertical lines: fixed to the viewport, run full page height -->
  <div class="hidden lg:block fixed inset-0 pointer-events-none z-[10]" aria-hidden="true">
    <div class="absolute inset-y-0 w-px bg-border border-line-left" />
    <div class="absolute inset-y-0 w-px bg-border border-line-right" />
  </div>

  <!-- Horizontal lines: absolute so they scroll with the page -->
  <div class="hidden lg:block absolute inset-x-0 top-0 bottom-0 pointer-events-none z-[10]" aria-hidden="true">
    <div class="absolute inset-x-0 h-px bg-border border-line-top" />
    <div class="absolute inset-x-0 h-px bg-border border-line-bottom" />
  </div>
</template>

<style scoped>
/*
 * All four rules are derived from the shared frame tokens in tailwind.css, so
 * the content column, the lanyard margin and these lines cannot drift apart.
 */
.border-line-left {
  left: calc(50% - (var(--content-width) / 2) - var(--content-gutter));
}
.border-line-right {
  left: calc(50% + (var(--content-width) / 2) + var(--content-gutter));
}
.border-line-top {
  top: var(--nav-height);
}
.border-line-bottom {
  bottom: var(--nav-height);
}
</style>
