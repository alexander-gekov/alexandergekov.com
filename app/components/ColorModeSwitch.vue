<script setup lang="ts">
import { LucideMonitor, LucideMoon, LucideSun } from "lucide-vue-next";

type Preference = 'light' | 'system' | 'dark'

const options = [
  { value: 'light', label: 'Light', icon: LucideSun },
  { value: 'system', label: 'System', icon: LucideMonitor },
  { value: 'dark', label: 'Dark', icon: LucideMoon },
] as const

const colorMode = useColorMode();
const selectedIndex = computed(() => Math.max(0, options.findIndex(o => o.value === colorMode.preference)));

const setTheme = async (preference: Preference, event: Event) => {
  const resolved = preference === 'system'
    ? (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    : preference;

  if (!document.startViewTransition || resolved === colorMode.value) {
    colorMode.preference = preference;
    return;
  }

  // Reveal from the chosen option (works for mouse and keyboard selection alike).
  const rect = (event.target as HTMLElement).closest('label')!.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;
  const maxRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y)
  );

  document.documentElement.style.setProperty('--theme-transition-x', `${x}px`);
  document.documentElement.style.setProperty('--theme-transition-y', `${y}px`);
  document.documentElement.style.setProperty('--theme-transition-radius', `${maxRadius}px`);

  const transition = document.startViewTransition(() => {
    colorMode.preference = preference;
  });

  await transition.finished;

  document.documentElement.style.removeProperty('--theme-transition-x');
  document.documentElement.style.removeProperty('--theme-transition-y');
  document.documentElement.style.removeProperty('--theme-transition-radius');
};
</script>

<template>
  <fieldset class="relative inline-flex rounded-full bg-card p-1 shadow-[var(--tray-shadow)]">
    <legend class="sr-only">Theme</legend>
    <span
      aria-hidden="true"
      class="absolute top-1 left-1 size-7 rounded-full bg-[var(--tint)] ring-1 ring-border transition-[translate] duration-300 ease-out motion-reduce:transition-none"
      :style="{ translate: `${selectedIndex * 28}px 0` }" />
    <label
      v-for="option in options"
      :key="option.value"
      :title="option.label"
      class="relative grid size-7 cursor-pointer place-items-center rounded-full text-muted-foreground transition-colors duration-200 hover:text-foreground has-[:checked]:text-foreground has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring">
      <input
        type="radio"
        name="theme"
        class="sr-only"
        :value="option.value"
        :checked="colorMode.preference === option.value"
        @change="setTheme(option.value, $event)">
      <span class="sr-only">{{ option.label }}</span>
      <component :is="option.icon" class="size-[15px]" />
    </label>
  </fieldset>
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
