<template>
  <ClientOnly>
    <div
      class="relative w-full overflow-hidden rounded-lg bg-background font-mono">
      <NavBar class="relative z-20 max-w-4xl mx-auto" />

      <FlickeringGrid
        class="fixed inset-0 z-10 [mask-image:radial-gradient(600px_circle_at_center,white,transparent)]"
        :square-size="4"
        :grid-gap="6"
        color="#60A5FA"
        :max-opacity="0.3"
        :flicker-chance="0.1" />

      <div class="relative z-10 max-w-4xl mx-auto border-0 py-10 px-4 lg:px-0">
        <img
          src="/casual.jpeg"
          alt="Alexander Gekov"
          class="w-16 h-16 mr-2 rounded-full" />
        <h1 class="text-2xl font-bold mt-4">Alexander Gekov</h1>
        <p class="text-sm text-muted-foreground mt-2">
          Co-Founder @ TalentSight | Software Engineer | AI Enthusiast Helping
          Recruiters Succeed
        </p>
        <p class="text-sm text-muted-foreground mt-6">
          I am currently working on
          <LinkPreview
            url="https://talsight.com"
            class="w-fit font-bold z-20 pb-0.5 border-b-2 border-muted-text hover:border-foreground transition-all duration-300">
            <div class="flex items-center">
              <img
                src="/logo.png"
                alt="TalentSight Logo"
                class="w-5 h-5 mr-2" />
              TalentSight
            </div></LinkPreview
          >, an AI-driven recruitment platform designed to help recruiters save
          hours of manual work in terms of sourcing and outreach.
        </p>
        <p class="text-sm text-muted-foreground mt-4">
          Find me on
          <LinkPreview
            url="https://github.com/alexander-gekov"
            class="w-fit font-bold z-20 pb-0.5 border-b-2 border-muted-text hover:border-foreground transition-all duration-300">
            <div class="flex items-center">
              <LucideGithub :size="16" class="mr-2" />
              GitHub
            </div></LinkPreview
          >,
          <LinkPreview
            url="https://x.com/AlexanderGekov"
            class="w-fit font-bold z-20 pb-0.5 border-b-2 border-muted-text hover:border-foreground transition-all duration-300">
            <div class="flex items-center">
              <LucideX :size="16" class="mr-2" />
              Twitter
            </div> </LinkPreview
          >,
          <LinkPreview
            url="https://www.youtube.com/@AlexanderGekov"
            class="w-fit font-bold z-20 pb-0.5 border-b-2 border-muted-text hover:border-foreground transition-all duration-300">
            <div class="flex items-center">
              <LucideYoutube :size="16" class="mr-2" />
              YouTube
            </div> </LinkPreview
          >,
          <LinkPreview
            url="https://www.linkedin.com/in/alexander-gekov/"
            class="w-fit font-bold z-20 pb-0.5 border-b-2 border-muted-text hover:border-foreground transition-all duration-300">
            <div class="flex items-center">
              <LucideLinkedin :size="16" class="mr-2" />
              LinkedIn
            </div>
          </LinkPreview>
        </p>
        <h2 class="text-lg font-bold mt-12">Recent Projects</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          <Card
            v-for="project in projects"
            :key="project.name"
            class="group overflow-hidden bg-background/50 backdrop-blur-sm">
            <CardContent class="p-3 sm:p-4 h-full">
              <div class="aspect-video mb-3 sm:mb-4 overflow-hidden rounded-lg">
                <img
                  :src="project.image"
                  :alt="project.name"
                  class="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110" />
              </div>

              <h3 class="text-sm sm:text-md font-semibold line-clamp-1">
                {{ project.name }}
              </h3>
              <p class="text-xs text-muted-foreground line-clamp-2 mt-1">
                {{ project.description }}
              </p>
            </CardContent>
            <CardFooter class="px-3 sm:px-4 py-2">
              <div class="flex flex-wrap gap-1.5 sm:gap-2">
                <Button
                  v-if="project.github"
                  variant="outline"
                  size="sm"
                  asChild>
                  <a
                    :href="project.github"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="flex items-center gap-1 text-xs h-7 px-2 sm:h-8 sm:px-3">
                    <LucideGithub class="size-3 sm:size-4" />
                    <span class="hidden sm:inline">GitHub</span>
                    <span class="sm:hidden">Git</span>
                  </a>
                </Button>
                <Button v-if="project.npm" variant="outline" size="sm" asChild>
                  <a
                    :href="project.npm"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="flex items-center gap-1 text-xs h-7 px-2 sm:h-8 sm:px-3">
                    <div
                      class="size-3 sm:size-4 flex items-center justify-center">
                      <svg viewBox="0 0 24 24" class="size-2.5 sm:size-3">
                        <path
                          fill="currentColor"
                          d="M0 0v24h24V0H0zm19.2 19.2H4.8V4.8h14.4v14.4z" />
                      </svg>
                    </div>
                    <span class="hidden sm:inline">NPM</span>
                    <span class="sm:hidden">NPM</span>
                  </a>
                </Button>
                <Button v-if="project.demo" variant="outline" size="sm" asChild>
                  <a
                    :href="project.demo"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="flex items-center gap-1 text-xs h-7 px-2 sm:h-8 sm:px-3">
                    <LucideExternalLink class="size-3 sm:size-4" />
                    <span class="hidden sm:inline">Demo</span>
                    <span class="sm:hidden">Live</span>
                  </a>
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
const projects = [
  {
    name: "a12v",
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
    name: "RecruiterMatch",
    description:
      "AI-powered puzzle game for recruiters to source and find the most correct candidate for given job description.",
    image: "/recruitermatch.png",
    github: "https://github.com/alexander-gekov/recruiter-match",
    demo: "https://recruitermatch.vercel.app/",
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
</script>
