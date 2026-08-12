<template>
  <section>
    <SectionHeading>Conference Talks</SectionHeading>
    <div class="mt-6 space-y-5">
      <div
        v-for="talk in talks"
        :key="talk.title"
        class="flex items-start xl:items-center justify-between gap-6">
        <div class="flex items-center gap-3 min-w-0">
          <NuxtLink
            :to="talk.href"
            external
            target="_blank"
            rel="noopener noreferrer"
            class="text-sm font-semibold tracking-tight hover:underline underline-offset-4">
            {{ talk.title }}
          </NuxtLink>
        </div>
        <div class="font-mono text-xs tabular-nums text-muted-foreground text-end">
          {{ talk.event }}
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface ConferenceTalk {
  title: string
  href: string
  event: string
}

defineProps<{
  talks: ConferenceTalk[]
}>()
</script>

