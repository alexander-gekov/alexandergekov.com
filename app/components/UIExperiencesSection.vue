<template>
  <section class="relative z-50 w-full mb-16 pointer-events-auto">
    <div class="max-w-4xl mx-auto px-4 lg:px-0 mb-6">
      <div class="text-xs tracking-[0.25em] text-muted-foreground uppercase">
        UI experiences
      </div>
    </div>
    <div class="px-4 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
        <div
          v-for="embed in embeds"
          :key="embed.id"
          class="w-full aspect-video lg:aspect-auto">
          <iframe
            :src="embed.src"
            :title="embed.title"
            class="w-full h-full lg:h-[400px] border-0 rounded-md overflow-hidden"
            allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
            sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface CodeSandboxEmbed {
  id: string
  src: string
  title: string
}

defineProps<{
  embeds: CodeSandboxEmbed[]
}>()
</script>

