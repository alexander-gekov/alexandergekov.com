<template>
  <section>
    <div class="text-xs tracking-[0.25em] text-muted-foreground uppercase">
      Blog posts
    </div>
    <div class="mt-6">
      <template v-if="blogPosts && blogPosts.length">
        <TransitionGroup
          name="post"
          tag="div"
          class="space-y-5">
          <div
            v-for="post in displayedPosts"
            :key="post.title"
            class="flex items-start xl:items-center justify-between gap-6">
            <div class="flex items-center gap-3 min-w-0">
              <NuxtLink
                :to="post.href"
                external
                target="_blank"
                rel="noopener noreferrer"
                class="text-sm font-semibold tracking-tight hover:underline underline-offset-4">
                {{ post.title }}
              </NuxtLink>
            </div>
            <div class="text-xs text-muted-foreground whitespace-nowrap">
              {{ post.date }}
            </div>
          </div>
        </TransitionGroup>
        <Transition
          name="fade">
          <button
            v-if="remainingCount > 0 && !showAll"
            @click="showAll = true"
            class="text-sm font-semibold tracking-tight text-muted-foreground hover:text-foreground transition-colors cursor-pointer pt-2 mt-5 block">
            + {{ remainingCount }} more
          </button>
        </Transition>
      </template>
      <div v-else class="text-sm text-muted-foreground">
        Writing soon.
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
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

