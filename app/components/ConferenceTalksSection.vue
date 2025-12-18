<template>
  <section>
    <div class="text-xs tracking-[0.25em] text-muted-foreground uppercase">
      Conference Talks
    </div>
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
        <div class="text-xs text-muted-foreground text-end">
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

