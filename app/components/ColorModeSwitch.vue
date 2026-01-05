<script setup lang="ts">
import { LucideMoon, LucideSun } from "lucide-vue-next";
import Button from "~/components/ui/button/Button.vue";

const colorMode = useColorMode();
const isAnimating = ref(false);

const toggleTheme = async (event: MouseEvent) => {
  if (isAnimating.value) return;

  const isDark = colorMode.value === 'dark';
  const newTheme = isDark ? 'light' : 'dark';

  const x = event.clientX;
  const y = event.clientY;

  const maxRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y)
  );

  if (!document.startViewTransition) {
    colorMode.preference = newTheme;
    return;
  }

  isAnimating.value = true;

  document.documentElement.style.setProperty('--theme-transition-x', `${x}px`);
  document.documentElement.style.setProperty('--theme-transition-y', `${y}px`);
  document.documentElement.style.setProperty('--theme-transition-radius', `${maxRadius}px`);

  const transition = document.startViewTransition(() => {
    colorMode.preference = newTheme;
  });

  await transition.finished;

  document.documentElement.style.removeProperty('--theme-transition-x');
  document.documentElement.style.removeProperty('--theme-transition-y');
  document.documentElement.style.removeProperty('--theme-transition-radius');

  isAnimating.value = false;
};
</script>

<template>
  <div class="relative">
    <Button
      size="sm"
      variant="ghost"
      @click="toggleTheme"
      :disabled="isAnimating"
    >
      <LucideSun
        class="w-4 h-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <LucideMoon
        class="w-4 h-4 absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span class="sr-only">Toggle theme</span>
    </Button>
  </div>
</template>

<style>
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-old(root) {
  z-index: 1;
}

::view-transition-new(root) {
  z-index: 9999;
  animation: theme-reveal 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

@keyframes theme-reveal {
  from {
    clip-path: circle(0px at var(--theme-transition-x, 50%) var(--theme-transition-y, 50%));
  }
  to {
    clip-path: circle(var(--theme-transition-radius, 100vmax) at var(--theme-transition-x, 50%) var(--theme-transition-y, 50%));
  }
}
</style>
