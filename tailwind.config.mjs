import typography from '@tailwindcss/typography'
import flowbitePlugin from 'flowbite/plugin'; // 导入 Flowbite 插件

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
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
    typography(),
    flowbitePlugin, // 添加 Flowbite 插件
  ],
}
