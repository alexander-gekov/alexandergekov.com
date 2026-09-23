<template>
  <section>
    <div class="text-xs tracking-[0.25em] text-muted-foreground uppercase">
      Code Snippets
    </div>
    <Tray class="mt-6">
      <div class="divide-y divide-border">
        <TrayLinkRow
          v-for="snippet in snippets"
          :key="snippet.title"
          :title="snippet.title"
          :href="snippet.href"
          :meta="snippet.platform" />
      </div>
    </Tray>
  </section>
</template>

<script setup lang="ts">
interface CodeSnippet {
  title: string
  href: string
  platform: string
}

defineProps<{
  snippets: CodeSnippet[]
}>()
</script>
