<template>
  <div class="relative z-50 max-w-2xl 3xl:max-w-4xl mx-auto border-0 lg:pt-8 px-4 lg:px-0 pointer-events-auto">
    <div class="flex items-start justify-between gap-4">
      <div class="flex items-center gap-4">
        <img
          src="/casual.jpeg"
          alt="Alexander Gekov"
          width="56"
          height="56"
          class="w-14 h-14 rounded-full object-cover" />
        <div class="min-w-0">
          <h1 aria-label="Alexander Gekov">
            <HyperText
              text="Alexander Gekov"
              class="text-2xl font-bold tracking-tight"
              :duration="800"
              :animate-on-load="true"
            />
          </h1>
          <nav aria-label="Social profiles" class="flex items-center gap-2 mt-1.5 font-mono text-xs">
            <template v-for="(social, index) in socials" :key="social.label">
              <span v-if="index > 0" aria-hidden="true" class="text-muted-foreground/40">/</span>
              <NuxtLink
                :to="social.href"
                external
                target="_blank"
                rel="noopener noreferrer"
                class="text-muted-foreground hover:text-foreground transition-colors">
                {{ social.label }}
              </NuxtLink>
            </template>
          </nav>
        </div>
      </div>
      <Button
        as="a"
        :href="RESUME_PATH"
        download
        variant="outline"
        size="sm"
        class="font-mono text-xs hidden lg:inline-flex"
      >
        Download CV
      </Button>
    </div>

    <!-- Punctuation sits flush against the closing tags on purpose: any
         whitespace or inner padding here renders as a gap before the comma. -->
    <p class="text-sm text-muted-foreground leading-relaxed mt-6 max-w-prose">
      Software Engineer at
      <LinkPreview
        url="https://n8n.io"
        class="font-semibold text-foreground pb-0.5 border-b border-muted-foreground/40 hover:border-foreground transition-colors duration-300">
        <span class="inline-flex items-center gap-1.5 align-middle">
          <img src="/n8n-icon.svg" alt="" width="16" height="16" class="w-4 h-4" />
          n8n
        </span>
      </LinkPreview>, Co-Founder of
      <LinkPreview
        url="https://talsight.com"
        class="font-semibold text-foreground pb-0.5 border-b border-muted-foreground/40 hover:border-foreground transition-colors duration-300">
        <span class="inline-flex items-center gap-1.5 align-middle">
          <img src="/logo-light.svg" alt="" width="16" height="16" class="w-4 h-4 dark:invert" />
          TalentSight
        </span>
      </LinkPreview>.
    </p>

    <Button
      as="a"
      :href="RESUME_PATH"
      download
      variant="outline"
      size="sm"
      class="font-mono text-xs mt-6 lg:hidden"
    >
      Download CV
    </Button>
  </div>
</template>

<script setup lang="ts">
// A real anchor rather than a synthetic click on a detached element: that
// variant never bubbles to the document, so Plausible's file-downloads
// script could not see it.
const RESUME_PATH = '/Alexander_Gekov_CV_Product_One_Page.pdf'

const socials = [
  { label: 'GitHub', href: 'https://github.com/alexander-gekov' },
  { label: 'X', href: 'https://x.com/alexandergekov' },
  { label: 'YouTube', href: 'https://youtube.com/@alexandergekov' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/alexander-gekov' },
]
</script>

