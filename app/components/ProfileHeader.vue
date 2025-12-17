<template>
  <div class="relative z-50 max-w-4xl mx-auto border-0 xl:pt-8 px-4 lg:px-0 pointer-events-auto">
    <div class="flex items-center gap-4">
      <img
        src="/casual.jpeg"
        alt="Alexander Gekov"
        class="w-14 h-14 rounded-full" />
      <div class="min-w-0">
        <h1 class="">
          <HyperText
            text="Alexander Gekov"
            class="text-2xl font-bold tracking-tight"
            :duration="800"
            :animate-on-load="true"
          />
        </h1>
        <div class="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
          <NuxtLink to="https://github.com/alexander-gekov" external target="_blank" class="text-foreground/70 hover:text-foreground transition-colors font-medium">GitHub</NuxtLink>
          <span class="text-muted-foreground/50">/</span>
          <NuxtLink to="https://x.com/alexandergekov" external target="_blank" class="text-foreground/70 hover:text-foreground transition-colors font-medium">X</NuxtLink>
          <span class="text-muted-foreground/50">/</span>
          <NuxtLink to="https://youtube.com/@alexandergekov" external target="_blank" class="text-foreground/70 hover:text-foreground transition-colors font-medium">YouTube</NuxtLink>
          <span class="text-muted-foreground/50">/</span>
          <NuxtLink to="https://linkedin.com/in/alexandergekov" external target="_blank" class="text-foreground/70 hover:text-foreground transition-colors font-medium">LinkedIn</NuxtLink>
        </div>
      </div>
    </div>

    <p class="text-sm text-muted-foreground mt-6 xl:max-w-1/2">
      Currently working on 
      <LinkPreview
        url="https://talsight.com"
        class="w-fit font-bold z-20 pb-0.5 border-b-2 border-muted-text hover:border-foreground transition-all duration-300">
        <div class="flex items-center px-2">
          <img
            src="/logo-light.svg"
            alt="TalentSight Logo"
            class="w-5 h-5 mr-2 dark:invert" />
          TalentSight
        </div>
      </LinkPreview>
      , an AI recruitment platform that automates sourcing and outreach.
    </p>
  </div>
</template>

<script setup lang="ts">
</script>

