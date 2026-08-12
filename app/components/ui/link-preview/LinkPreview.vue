<template>
  <span ref="root" :class="cn('relative inline-block', props.class)">
    <!-- Trigger -->
    <NuxtLink
      :to="url"
      external
      target="_blank"
      rel="noopener noreferrer"
      :class="cn('text-foreground', props.linkClass)"
      @mousemove="handleMouseMove"
      @mouseenter="showPreview"
      @mouseleave="hidePreview"
    >
      <slot />
    </NuxtLink>

    <!-- Preview: fixed-position, so it lives on the body rather than nested in
         whatever inline context the trigger sits in. -->
    <Teleport to="body">
      <!-- Teleported nodes are not guaranteed to land after #__nuxt in the
           body, so this needs a z-index above the page layers rather than
           relying on DOM order. Same value as the project preview. -->
      <div
        v-if="isVisible"
        class="pointer-events-none fixed z-[9999]"
        :style="previewStyle"
      >
        <div
          class="overflow-hidden rounded-xl shadow-xl"
          :class="[popClass, { 'transform-gpu': !props.isStatic }]"
        >
          <div class="block rounded-xl border border-border bg-popover p-1 shadow-lg">
            <img
              :src="previewSrc"
              :width="width"
              :height="height"
              class="size-full rounded-lg object-cover"
              :style="imageStyle"
              alt=""
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </Teleport>
  </span>
</template>

<script setup lang="ts">
import { ref, computed, reactive, type CSSProperties } from "vue";
import { cn } from "~/lib/utils";

interface BaseProps {
  class?: string;
  linkClass?: string;
  width?: number;
  height?: number;
}

// Props for static image mode
interface StaticImageProps extends BaseProps {
  isStatic: true;
  imageSrc: string;
  url?: string; // optional in static mode
}

// Props for URL preview mode
interface URLPreviewProps extends BaseProps {
  isStatic?: false; // optional but must be false if specified
  imageSrc?: string; // optional in URL mode
  url: string;
}

// Combined type that enforces the requirements
type Props = StaticImageProps | URLPreviewProps;
const props = withDefaults(defineProps<Props>(), {
  isStatic: false,
  imageSrc: "",
  url: "",
  width: 200,
  height: 125,
});

const isVisible = ref(false);
// The root is a span, not a div: this component is used inline inside a
// paragraph, and a div there makes the HTML parser close the <p> early, so no
// server-rendered markup could ever match the parsed DOM.
const root = ref<HTMLElement | null>(null);
const hasPopped = ref(false);
const colorMode = useColorMode();

// Generate preview URL
const previewSrc = computed(() => {
  if (props.isStatic) return props.imageSrc;

  const params = new URLSearchParams({
    url: props.url,
    screenshot: "true",
    meta: "false",
    embed: "screenshot.url",
    // Match the site theme, otherwise a light screenshot glares in dark mode.
    colorScheme: colorMode.value === "dark" ? "dark" : "light",
    "viewport.isMobile": "true",
    "viewport.deviceScaleFactor": "1",
    "viewport.width": String(props.width * 3),
    "viewport.height": String(props.height * 3),
  });

  return `https://api.microlink.io/?${params.toString()}`;
});

// Position tracking
const mousePosition = reactive({
  x: 0,
  y: 0,
});

// Calculate preview position. Measured from the trigger itself (which is
// always mounted) rather than the popup, so the first painted frame is
// already in the right place instead of flashing at the top-left.
const previewStyle = computed<CSSProperties>(() => {
  const previewWidth = props.width;
  const previewHeight = props.height;

  const base: CSSProperties = {
    width: `${previewWidth}px`,
    height: `${previewHeight}px`,
  };

  if (!import.meta.client || !root.value) return base;

  const offset = 20;
  const triggerRect = root.value.getBoundingClientRect();

  const x = Math.min(
    Math.max(8, mousePosition.x - previewWidth / 2),
    window.innerWidth - previewWidth - 8,
  );

  // Prefer above the link; drop below when it would overflow the viewport.
  const above = triggerRect.top - previewHeight - offset;
  const y = above >= 8 ? above : triggerRect.bottom + offset;

  return { ...base, left: `${x}px`, top: `${y}px` };
});

// Image specific styling
const imageStyle = computed<CSSProperties>(() => ({
  width: `${props.width}px`,
  height: `${props.height}px`,
}));

// Pop animation class
const popClass = computed(() => {
  if (!hasPopped.value) return "";
  return "animate-pop";
});

function handleMouseMove(event: MouseEvent) {
  mousePosition.x = event.clientX;
  mousePosition.y = event.clientY;
}

function showPreview() {
  isVisible.value = true;
  setTimeout(() => {
    hasPopped.value = true;
  }, 50);
}

function hidePreview() {
  isVisible.value = false;
  hasPopped.value = false;
}
</script>

<style scoped>
.transform-gpu {
  transform: scale3d(0, 0, 1);
  transform-origin: center bottom;
  will-change: transform;
  backface-visibility: hidden;
}

.animate-pop {
  animation: pop 1000ms ease forwards;
  will-change: transform;
}

@keyframes pop {
  0% {
    transform: scale3d(0.26, 0.26, 1);
  }
  25% {
    transform: scale3d(1.1, 1.1, 1);
  }
  65% {
    transform: scale3d(0.98, 0.98, 1);
  }
  100% {
    transform: scale3d(1, 1, 1);
  }
}
</style>
