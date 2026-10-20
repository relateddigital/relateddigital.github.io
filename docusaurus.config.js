// @ts-check

import {themes as prismThemes} from 'prism-react-renderer';
import sdks from './src/data/sdks.js';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Related Digital SDK',
  tagline: 'Sekiz SDK, tek dokümantasyon sitesi',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://relateddigital.github.io',
  baseUrl: '/',

  organizationName: 'relateddigital',
  projectName: 'relateddigital.github.io',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'tr',
    locales: ['tr'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: false,
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  plugins: sdks.map((sdk) => [
    '@docusaurus/plugin-content-docs',
    /** @type {import('@docusaurus/plugin-content-docs').Options} */
    ({
      id: sdk.id,
      path: `sdks/${sdk.routeBasePath}`,
      routeBasePath: sdk.routeBasePath,
      sidebarPath: './sidebars/sdk.js',
      lastVersion: 'current',
      versions: {
        current: {
          label: sdk.current,
        },
      },
    }),
  ]),

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        logo: {
          alt: 'Related Digital',
          src: 'img/relateddigital-logo.svg',
          srcDark: 'img/relateddigital-logo-light.svg',
        },
        items: [
          {
            type: 'dropdown',
            label: 'SDK',
            position: 'left',
            items: [
              ...sdks
                .filter((sdk) => sdk.group !== 'legacy')
                .map((sdk) => ({
                  label: sdk.label,
                  to: `/${sdk.routeBasePath}`,
                  className: `sdk-menu-item sdk-menu-item--${sdk.mark}`,
                })),
              {
                type: 'html',
                className: 'sdk-menu-group',
                value: 'Legacy',
              },
              ...sdks
                .filter((sdk) => sdk.group === 'legacy')
                .map((sdk) => ({
                  label: sdk.label,
                  to: `/${sdk.routeBasePath}`,
                  className: `sdk-menu-item sdk-menu-item--${sdk.mark}`,
                })),
            ],
          },
          {
            type: 'custom-sdk-title',
            position: 'left',
          },
          ...sdks.map((sdk) => ({
            type: 'docsVersionDropdown',
            position: 'right',
            docsPluginId: sdk.id,
          })),
        ],
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
