// vite.config.js
import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import css from 'rollup-plugin-css-only'

export default defineConfig({
  plugins: [
    svelte({
      /* plugin options */
    }),
    css({
      output: 'public/build/base.css',
    }),
  ],
})
