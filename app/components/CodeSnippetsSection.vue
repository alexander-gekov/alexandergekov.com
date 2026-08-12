<template>
  <section>
    <SectionHeading>Code Snippets</SectionHeading>
    <div class="mt-6 space-y-5">
      <div
        v-for="snippet in snippets"
        :key="snippet.title"
        class="flex items-start xl:items-center justify-between gap-6">
        <div class="flex items-center gap-3 min-w-0">
          <NuxtLink
            :to="snippet.href"
            external
            target="_blank"
            rel="noopener noreferrer"
            class="text-sm font-semibold tracking-tight hover:underline underline-offset-4">
            {{ snippet.title }}
          </NuxtLink>
        </div>
        <div class="font-mono text-xs text-muted-foreground whitespace-nowrap">
          {{ snippet.platform }}
        </div>
      </div>
    </div>
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
