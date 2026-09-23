<template>
  <section>
    <div class="text-xs tracking-[0.25em] text-muted-foreground uppercase">
      Blog posts
    </div>
    <Tray class="mt-6">
      <template v-if="blogPosts && blogPosts.length">
        <TransitionGroup
          name="post"
          tag="div"
          class="divide-y divide-border">
          <TrayLinkRow
            v-for="post in displayedPosts"
            :key="post.title"
            :title="post.title"
            :href="post.href"
            :meta="post.date" />
        </TransitionGroup>
        <Transition name="fade">
          <button
            v-if="remainingCount > 0 && !showAll"
            type="button"
            class="group/more flex w-full cursor-pointer items-center justify-center gap-1.5 border-t border-dashed border-border px-4 py-3 text-sm font-medium text-muted-foreground outline-none transition-colors duration-200 hover:bg-[var(--tint)] hover:text-foreground focus-visible:bg-[var(--tint)]"
            @click="showAll = true">
            {{ remainingCount }} more posts
            <LucideChevronDown class="size-4 transition-transform duration-200 ease-out motion-safe:group-hover/more:translate-y-0.5" />
          </button>
        </Transition>
      </template>
      <div v-else class="px-4 py-3.5 text-sm text-muted-foreground">
        Writing soon.
      </div>
    </Tray>
  </section>
</template>

<script setup lang="ts">
import { LucideChevronDown } from 'lucide-vue-next'

interface BlogPost {
  title: string
  href: string
  date: string
}

const props = defineProps<{
  blogPosts?: BlogPost[]
}>()

const MAX_POSTS = 8 
const showAll = ref(false)

const displayedPosts = computed(() => {
  if (!props.blogPosts) return []
  if (showAll.value) return props.blogPosts
  return props.blogPosts.slice(0, MAX_POSTS)
})

const remainingCount = computed(() => {
  if (!props.blogPosts) return 0
  return Math.max(0, props.blogPosts.length - MAX_POSTS)
})
</script>

<style scoped>
.post-enter-active {
  transition: all 0.3s ease-out;
}

.post-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.post-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

