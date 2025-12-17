<template>
  <ClientOnly>
    <div class="relative w-full overflow-hidden bg-background font-sans">
      <NavBar class="relative z-20 max-w-4xl mx-auto" />

      <div class="relative z-10 max-w-4xl mx-auto border-0 pt-16 px-4 lg:px-0">
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
              <NuxtLink to="https://twitter.com/alexandergekov" external target="_blank" class="text-foreground/70 hover:text-foreground transition-colors font-medium">Twitter</NuxtLink>
              <span class="text-muted-foreground/50">/</span>
              <NuxtLink to="https://youtube.com/@alexandergekov" external target="_blank" class="text-foreground/70 hover:text-foreground transition-colors font-medium">YouTube</NuxtLink>
              <span class="text-muted-foreground/50">/</span>
              <NuxtLink to="https://linkedin.com/in/alexandergekov" external target="_blank" class="text-foreground/70 hover:text-foreground transition-colors font-medium">LinkedIn</NuxtLink>
            </div>
          </div>
        </div>

       
        <p class="text-sm text-muted-foreground mt-6 max-w-1/2">
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
            </LinkPreview
          > , an AI recruitment platform that automates sourcing and outreach.
        </p>
        <div class="mt-10 mb-10 space-y-12">
          <section>
            <div class="text-xs tracking-[0.25em] text-muted-foreground uppercase">
              Experience
            </div>
            <div class="mt-4 space-y-4">
              <div
                v-for="experience in experiences"
                :key="experience.company"
                class="flex items-start justify-between gap-6">
                <div class="flex items-start gap-3 min-w-0">
                  <img
                    v-if="experience.image"
                    :src="experience.image"
                    :alt="experience.company"
                    class="w-5 h-5 mt-0.5 shrink-0 grayscale opacity-80" />
                  <div class="min-w-0">
                    <div class="text-sm font-semibold leading-tight">
                      {{ experience.company }}
                    </div>
                    <div
                      v-if="experience.title"
                      class="mt-1 text-xs text-muted-foreground">
                      {{ experience.title }}
                    </div>
                  </div>
                </div>
                <div class="text-xs text-muted-foreground whitespace-nowrap">
                  {{ experience.date }}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <section class="relative z-10 w-full mb-10">
        <div class="max-w-4xl mx-auto px-4 lg:px-0 mb-4">
          <div class="text-xs tracking-[0.25em] text-muted-foreground uppercase">
            Projects
          </div>
        </div>
        <ProjectsMarquee :projects="projects" :duration-seconds="48" />
      </section>

      <div class="relative z-10 max-w-4xl mx-auto border-0 pb-16 px-4 lg:px-0">
        <section>
          <div class="text-xs tracking-[0.25em] text-muted-foreground uppercase">
            Blog posts
          </div>
          <div class="mt-4 space-y-3">
            <template v-if="blogPosts && blogPosts.length">
              <div
                v-for="post in blogPosts"
                :key="post.title"
                class="flex items-center justify-between gap-6">
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
            </template>
            <div v-else class="text-sm text-muted-foreground">
              Writing soon.
            </div>
          </div>
        </section>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { useMediaQuery } from "@vueuse/core";
import HyperText from "~/components/ui/hyper-text/HyperText.vue";
import LinkPreview from "~/components/ui/link-preview/LinkPreview.vue";

const { value } = useColorMode();
const isLargeScreen = useMediaQuery("(min-width: 768px)");

const projects = [
  {
    name: "PriceBarometer",
    description:
      "Price Barometer is a platform to track prices of products from supermarkets like Billa, Lidl, Kaufland, Fantastiko, etc.",
    image: "/price-barometer.png",
    demo: "https://price-barometer.vercel.app/",
  },
  {
    name: "Pawns",
    description:
      "Pawns is an open-source puzzle game. You need to fill in all the suns and moons to win.",
    image: "/pawns.png",
    demo: "https://pawns.vercel.app/",
  },
  {
    name: "Horo",
    description:
      "Horo is an open-source puzzle game. You need to fill in all the suns and moons to win.",
    image: "/taengo.png",
    demo: "https://horo-game.vercel.app/",
  },
  {
    name: "Infinite Alchemy",
    description:
      "Infinite Alchemy is a game where you can create new elements by combining existing ones.",
    image: "/infinitealchemy.png",
    github: "https://github.com/alexander-gekov/infinite-alchemy",
    demo: "https://infinitealche.my/",
  },
  {
    name: "upstash-search-ui-vue",
    description:
      "Beautifully-designed, accessible search components. Port of @upstash/search-ui for Vue.",
    image: "/upstash.png",
    github: "https://github.com/alexander-gekov/upstash-search-ui-vue",
    npm: "https://www.npmjs.com/package/upstash-search-ui-vue",
    demo: "https://upstash-search-ui-vue-demo.vercel.app/",
  },
  {
    name: "Stitch",
    description:
      "Stitch is an open-source connect the doths Puzzle game. You need to connect the dots and fill all of the cells.",
    image: "/ziip.png",
    demo: "https://stitch-connect.vercel.app/",
  },
  {
    name: "a12v-stack",
    description:
      "Modern Nuxt 3 App Boilerplate: Vue, Nuxt, Shadcn, Pinia, Tanstack Query, Zod, AI SDK, Clerk, Polar.sh, Supabase and more.",
    image: "/a12v.png",
    github: "https://github.com/alexander-gekov/a12v-stack",
    npm: "https://www.npmjs.com/package/create-a12v-app",
    demo: "https://a12v-stack.vercel.app/",
  },
  {
    name: "GitHubGarden",
    description:
      "Interactive visualization of your GitHub contributions with 3D forest.",
    image: "/githubgarden.png",
    github: "https://github.com/alexander-gekov/github-garden",
    demo: "https://github-garden.vercel.app/",
  },
  {
    name: "mrtnz.cc",
    description:
      "Platform for creating and sharing digital bracelets with friends for the Bulgarian Holiday - Baba Marta on 1st of March.",
    image: "/mrtnz.png",
    github: "https://github.com/alexander-gekov/mrtnz.cc",
    demo: "https://mrtnz.cc",
  },
];

const experiences = [
  {
    company: "TalentSight Inc.",
    title: "Co-Founder & CTO",
    date: "Nov 2023 - Present",
    image: "/talsight.png",
  },
  {
    company: "OfficeRnD",
    title: "Frontend Developer",
    date: "Sep 2023 - Nov 2023",
    image: "/officernd.png",
  },
  {
    company: "Axion Biosystems (formerly Cytosmart)",
    title: "Software Engineer",
    date: "Nov 2020 - July 2023",
    image: "/axion.png",
  },
];

const { data: blogPosts } = await useFetch<Array<{ title: string; href: string; date: string }>>('/api/blog-posts')
</script>
