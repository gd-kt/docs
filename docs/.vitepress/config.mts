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
      { text: 'Useful Stuff', link: '/useful-stuff' }
    ],

    sidebar: [
      {
        text: 'Editor',
        items: [
          { text: 'Properties', link: '/editor-api/properties' },
          { text: 'Objects', link: '/editor-api/objects' },
          { text: 'Parsing', link: '/editor-api/parsing' }
        ],
      },
      {
        text: 'Client',
        items: [
          { text: 'Markdown Examples (client)', link: '/markdown-examples' },
          { text: 'Runtime API Examples (client)', link: '/api-examples' }
        ],
      },
      {
        text: 'Misc',
        items: [
          { text: 'Useful Stuff', link: '/useful-stuff' },
        ],
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/gd-kt/gd.kt' }
    ],

    footer: {
      "message": "Released under <a href=\"https://unlicense.org/\">UNLICENSE</a> - gd.kt is not affiliated with Geometry Dash"
    }
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

