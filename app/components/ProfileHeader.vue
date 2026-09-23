<template>
  <div class="relative z-50 max-w-2xl mx-auto border-0 lg:pt-8 px-4 lg:px-0 pointer-events-auto">
    <div class="flex items-start justify-between gap-4">
      <div class="flex items-center gap-4">
        <img
          src="/casual.jpeg"
          alt="Alexander Gekov"
          class="w-14 h-14 rounded-full" />
        <div class="min-w-0">
          <h1 class="flex items-center gap-2">
            <HyperText
              text="Alexander Gekov"
              class="text-2xl font-bold tracking-tight"
              :duration="800"
              :animate-on-load="true"
            />
            <NuxtLink
              to="https://x.com/alexandergekov"
              external
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Verified on X"
              title="Verified on X"
              class="shrink-0 transition-transform duration-200 ease-out motion-safe:hover:scale-110">
              <svg viewBox="0 0 22 22" class="size-5" aria-hidden="true">
                <circle cx="11" cy="11" r="6" fill="#fff" />
                <path fill="#1d9bf0" d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z" />
              </svg>
            </NuxtLink>
          </h1>
          <div class="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
            <NuxtLink to="https://github.com/alexander-gekov" external target="_blank" class="text-foreground/70 hover:text-foreground transition-colors font-medium">GitHub</NuxtLink>
            <span class="text-muted-foreground/50">/</span>
            <NuxtLink to="https://x.com/alexandergekov" external target="_blank" class="text-foreground/70 hover:text-foreground transition-colors font-medium">X</NuxtLink>
            <span class="text-muted-foreground/50">/</span>
            <NuxtLink to="https://youtube.com/@alexandergekov" external target="_blank" class="text-foreground/70 hover:text-foreground transition-colors font-medium">YouTube</NuxtLink>
            <span class="text-muted-foreground/50">/</span>
            <NuxtLink to="https://linkedin.com/in/alexander-gekov" external target="_blank" class="text-foreground/70 hover:text-foreground transition-colors font-medium">LinkedIn</NuxtLink>
          </div>
        </div>
      </div>
      <Button v-if="isDesktop"
        variant="outline"
        size="sm"
        @click="downloadResume"
      >
        View Resume
      </Button>
    </div>

    <p class="text-sm text-muted-foreground mt-6 xl:max-w-1/2">
      Software Engineer at
      <LinkPreview
        url="https://n8n.io"
        class="inline-flex items-center font-bold z-20 pb-0.5 border-b-2 border-muted-text hover:border-foreground transition-all duration-300">
        <div class="flex items-center px-2">
          <img
            src="/n8n-icon.svg"
            alt="n8n Logo"
            class="w-4 h-4 mr-1.5" />
          n8n
        </div>
      </LinkPreview>
      , Co-Founder of
      <LinkPreview
        url="https://talsight.com"
        class="inline-flex items-center font-bold z-20 pb-0.5 border-b-2 border-muted-text hover:border-foreground transition-all duration-300">
        <div class="flex items-center px-2">
          <img
            src="/logo-light.svg"
            alt="TalentSight Logo"
            class="w-5 h-5 mr-2 dark:invert" />
          TalentSight
        </div>
      </LinkPreview>.
    </p>

    <Button v-if="!isDesktop"
        variant="default"
        class="mt-6"
        size="sm"
        @click="downloadResume"
      >
        View Resume
      </Button>
  </div>
</template>

<script setup lang="ts">
import { useMediaQuery } from '@vueuse/core'

const isDesktop = useMediaQuery('(min-width: 1024px)', { ssrWidth: 1024 })

const downloadResume = () => {
  const link = document.createElement('a')
  link.href = '/Alexander_Gekov_CV_Product_One_Page.pdf'
  link.download = 'Alexander_Gekov_CV_Product_One_Page.pdf'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
</script>

