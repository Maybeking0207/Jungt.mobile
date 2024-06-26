import typography from '@tailwindcss/typography';
import flowbitePlugin from 'flowbite/plugin';
/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    './node_modules/flowbite/**/*.js'
  ],
  theme: {
  extend: {
    backgroundImage: {
      project: 'url(\'/projectCases-background.png\')',
      right: 'url(\'/projectCases-right.png\')',
    },
  },
},
  plugins: [
    typography(), // 添加 typography 插件
    flowbitePlugin(), // 添加 Flowbite 插件,
    require('flowbite/plugin')
  ]
};
