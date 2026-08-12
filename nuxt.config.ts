import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        // Inter for UI/body, JetBrains Mono for section labels and metadata.
        // Requested as one stylesheet so both families share a round trip.
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=JetBrains+Mono:wght@400..700&display=swap',
        },
      ],
      script: [
        {
          src: 'https://plausible.alexandergekov.com/js/script.file-downloads.js',
          defer: true,
          'data-domain': 'alexandergekov.com'
        }
      ]
    }
  },
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  colorMode: {
    classSuffix: "",
    fallback: "light",
    storageKey: "color-mode",
  },
  css: ["~/assets/css/tailwind.css"],

  vite: {
    plugins: [tailwindcss()],
  },

  modules: [
    "shadcn-nuxt",
    "@nuxtjs/color-mode",
    "nuxt-lucide-icons",
    "@nuxt/image",
    "@tresjs/nuxt",
    "motion-v/nuxt",
  ],
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "./app/components/ui",
  },
});
