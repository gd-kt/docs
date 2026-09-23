import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "gd.kt Documentation",
  description: "Docs for gd.kt",
  lang: "en-US",
  themeConfig: {
    logo: "/logo.png",

    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Editor',
        items: [
          { text: 'Properties', link: '/editor-api/properties' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ],
      },
            {
        text: 'Client',
        items: [
          { text: 'Markdown Examples (client)', link: '/markdown-examples' },
          { text: 'Runtime API Examples (client)', link: '/api-examples' }
        ],
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/gd-kt/gd.kt' }
    ]
  },

  head: [
    [
      'link', {
        rel: 'icon',
        href: '/favicon.png'
      }
    ]
  ]
})

