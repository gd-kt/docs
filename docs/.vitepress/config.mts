import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "gd.kt Documentation",
  description: "Docs for gd.kt",
  lang: "en-US",
  base: "/docs/",
  themeConfig: {
    logo: "/logo.png",

    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Useful Stuff', link: '/useful-stuff' },
      { text: 'Reference', link: 'https://gd-kt.github.io/gd.kt/' }
    ],

    sidebar: [
      {
        text: 'gd.kt',
        items: [
            { text: 'Getting Started', link: '/gdkt/getting-started' },
            { text: 'Why gd.kt ?', link: '/gdkt/why-gdkt' }
        ]
      },  
      {
        text: 'gd.kt - Editor',
        items: [
          { text: 'Properties', link: '/gdkt/editor-api/properties' },
          { text: 'Objects', link: '/gdkt/editor-api/objects' },
          { text: 'Parsing', link: '/gdkt/editor-api/parsing' },
          { text: 'Serializers', link: '/gdkt/editor-api/serializers' },
          { text: 'WSLiveEditor Support', link: '/gdkt/editor-api/wsliveeditor' }
        ],
      },
      // {
      //   text: 'gd.kt - Client',
      //   items: [
      //     { text: 'Markdown Examples (client)', link: '/markdown-examples' },
      //     { text: 'Runtime API Examples (client)', link: '/api-examples' }
      //   ],
      // },
      {
        text: 'Trigg',
        items: [
          { text: 'Getting Started', link: '/trigg/getting-started' },
        ]
        
      },
      {
        text: 'Misc',
        items: [
          { text: 'Useful Stuff', link: '/useful-stuff' },
        ],
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/gd-kt' }
    ],

    footer: {
      "message": "Released under <a href=\"https://unlicense.org/\">UNLICENSE</a> - gd.kt is not affiliated with Geometry Dash"
    }
  },

  head: [
    [
      'link', {
        rel: 'icon',
        href: '/docs/favicon.png'
      }
    ]
  ]
})

