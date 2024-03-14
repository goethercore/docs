import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress/cli'
import { viteBundler } from '@vuepress/bundler-vite'

export default defineUserConfig({
  base: '/docs/', // Add this line to set the base configuration
  lang: 'en-US',

  title: 'Goether',
  description: 'Goether is a Go package designed to provide various functionalities related to EVM blockchains. library aims to be a complete and compact library for interacting with the Ethereum Blockchain and its ecosystem.',

  theme: defaultTheme({
    logo: 'https://firebasestorage.googleapis.com/v0/b/goether-fff83.appspot.com/o/GOether.png?alt=media&token=2bbb7fde-eb40-4682-a5da-daa62c3536f7',

    navbar: ['/', {text:"Guide",link:"/guide/getting-started.html"}, {text:"Github",link:"https://github.com/goethercore/goether"}],
    sidebar: [
      {
        text: 'Introduction',
        link: '/introduction.html',
        collapsable: true,
        icon: '/images/info.png'
      },
      {
        text: 'Guide',
        link: '/guide/getting-started.html',
        collapsable: true,
        icon: '/icons/guide.png',
        children: [
          '/guide/getting-started.html',
          '/guide/user-interactions.html',
          '/guide/methods.html',
          '/guide/utilities.html'
        ]
      }
    ]
  }),

  bundler: viteBundler(),
})
