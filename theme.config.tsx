import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  logo: <span>CASSIA Documentation</span>,
  project: {
    link: 'https://github.com/ElliotXie/cassia-true-final',
  },
  docsRepositoryBase: 'https://github.com/ElliotXie/cassia-true-final',
  navigation: {
    prev: true,
    next: true
  },
  sidebar: {
    defaultMenuCollapseLevel: 1,
  },
  footer: {
    text: 'CASSIA Documentation',
  },
  useNextSeoProps() {
    return {
      titleTemplate: '%s – CASSIA'
    }
  }
}

export default config
