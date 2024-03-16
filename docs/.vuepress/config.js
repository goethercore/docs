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
    head: [['link', { rel: 'icon', href: '/fav.ico' }]],

    navbar: ['/', {text:"Guide",link:"/getting-started.html"}, {text:"Github",link:"https://github.com/goethercore/goether"}],
    sidebar: [
      {
        text: 'Introduction',
        link: '/introduction.html',
        collapsable: true,
        icon: '/images/info.png'
      },
      {
        text: 'Getting Started',
        link:     '/getting-started.html',
        collapsable: true,
        icon: '/images/info.png'
      },
      {
        text: 'Address',
        link:    '/address.html',
        collapsable: true,
        icon: '/images/info.png'
      },
      {
        text: 'Contract',
        link:    '/contract.html',
        collapsable: true,
        icon: '/images/info.png'
      },
      {
        text: 'Mempool',
        link:    '/mempool.html',
        collapsable: true,
        icon: '/images/info.png'
      },
      {
        text: 'Block',
        link:    '/block.html',
        collapsable: true,
        icon: '/images/info.png'
      },

      {
        text: 'User-Interactions',
        link:   '/user-interactions.html',
        collapsable: true,
        icon: '/images/info.png'
      },

      {
        text: 'Methods',
        link:   '/methods.html',
        collapsable: true,
        icon: '/images/info.png'
      },

      {
        text: 'Utilities',
        link:   '/utilities.html',
        collapsable: true,
        icon: '/images/info.png'
      },
      {
        text: 'Contributors',
        link:   '/contributors.html',
        collapsable: true,
        icon: '/images/info.png'
      }
    ]
  }),

  bundler: viteBundler(),
})
