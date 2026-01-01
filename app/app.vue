<template>
  <ClientOnly>
    <div class="relative w-full overflow-hidden bg-background font-sans">
      <div v-if="isDesktop" class="absolute top-0 left-0 right-0 z-40 w-full pointer-events-none">
        <Band />
      </div>
      <NavBar class="relative z-50 max-w-4xl mx-auto pointer-events-auto" />

      <ProfileHeader class="z-50" />

      <div class="relative max-w-4xl mx-auto border-0 px-4 lg:px-0 pointer-events-none">
        <div class="mt-10 mb-16 space-y-20 pointer-events-auto">
          <ExperienceSection :experiences="experiences" />
          <DeveloperRelationsSection :items="developerRelations" />
        </div>
      </div>

      <ProjectsSection :projects="projects" />

      <div class="relative z-10 max-w-4xl mx-auto border-0 pb-16 px-4 lg:px-0 mt-16 space-y-20">
        <BlogPostsSection :blog-posts="blogPosts" />
        <ConferenceTalksSection :talks="conferenceTalks" />
      </div>

      <UIExperiencesSection :embeds="uiExperiences" />
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { useMediaQuery } from '@vueuse/core'

const isDesktop = useMediaQuery('(min-width: 1024px)', { ssrWidth: 1024 })

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
  {
    name: "Wedding Website",
    description:
      "My personal wedding website built with React, Next.js and Framer Motion. Features custom cursor, parallax effects, smooth animations, RSVP system and bilingual support.",
    image: "/wedding-website.png",
    demo: "https://www.alexandellie.love/en/",
  },
];

const experiences = [
  {
    company: "TalentSight Inc.",
    title: "Co-Founder & CTO",
    date: "Nov 2023 - Present",
    image: "/talsight.png",
    description: "Building a platform to help companies find and hire the best talent through AI-powered matching and intelligent candidate screening.",
  },
  {
    company: "OfficeRnD",
    title: "Frontend Developer",
    date: "Sep 2023 - Nov 2023",
    image: "/officernd.png",
    description: "Developing modern web applications for workspace management solutions using React, Redux and TypeScript.",
  },
  {
    company: "Axion Biosystems (formerly Cytosmart)",
    title: "Software Engineer",
    date: "Nov 2020 - July 2023",
    image: "/axion.png",
    description: "Building software solutions for cell analysis and imaging systems, developing UIs for scientific instruments and data visualization tools using Vue.js and TypeScript and WebGL.",
  },
];

const developerRelations = [
  {
    title: "Storyblok Ambassador",
    description: "Creating YouTube videos, blog posts and helping in Discord",
    date: "Apr 2023 - Apr 2024",
  },
  {
    title: "Supabase Ambassador",
    description: "Organising Supabase Meetups in Sofia",
    date: "Jan 2025 - Present",
  },
  {
    title: "Cursor Ambassador",
    description: "Organising meetups and helping in Discord",
    date: "November 2025 - Present",
  },
];

const conferenceTalks = [
  {
    title: "Prefetch Strategies to Boost the Performance of Your Vue.JS App",
    href: "https://gitnation.com/contents/prefetch-strategies-to-boost-the-performance-of-your-vuejs-app",
    event: "Vue.js London 2023",
  },
  {
    title: "AI in Vue using Vercel AI SDK + Cloudflare Workers",
    href: "https://event.geekle.us/vue-25/vuep",
    event: "Vue.js Global Summit 2025 AI Day",
  },
  {
    title: "TanStack Query: Is this the best paradigm for Data Fetching?",
    href: "https://event.geekle.us/vue-25/vuep",
    event: "Vue.js Global Summit 2025 Vue Day",
  },
];

const { data: blogPosts } = await useFetch<Array<{ title: string; href: string; date: string }>>('/api/blog-posts')

const uiExperiences = [
  {
    id: 'text-roll-effect',
    src: 'https://codesandbox.io/embed/3y2mmg?view=preview&hidenavigation=1',
    title: 'Text Roll Effect',
  },
  {
    id: 'mask-cursor-effect',
    src: 'https://codesandbox.io/embed/8z8p2q?view=preview&hidenavigation=1',
    title: 'Mask Cursor Effect',
  },
]
</script>
