<template>
  <section>
    <div class="text-xs tracking-[0.25em] text-muted-foreground uppercase">
      Conference Talks
    </div>
    <Tray class="mt-6">
      <div class="divide-y divide-border">
        <TrayLinkRow
          v-for="talk in talks"
          :key="talk.title"
          :title="talk.title"
          :href="talk.href"
          :meta="talk.event" />
      </div>
    </Tray>
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

