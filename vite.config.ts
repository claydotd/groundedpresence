import fs from 'node:fs'
import path from 'node:path'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { defineConfig, type Plugin } from 'vite'
import { galleriesPlugin } from './vite-plugin-galleries.ts'

function normalizeBase(value: string): string {
  if (!value || value === '/') return '/'
  return value.endsWith('/') ? value : `${value}/`
}

function pagesBase(): string {
  // Custom domain (groundedpresence.online) is served from site root.
  // Override with BASE_PATH only if you ever need a subdirectory deploy.
  if (process.env.BASE_PATH) return normalizeBase(process.env.BASE_PATH)
  return '/'
}

/** GitHub Pages serves 404.html for unknown paths, which lets the SPA handle routes. */
function githubPagesSpaFallback(): Plugin {
  return {
    name: 'github-pages-spa-fallback',
    closeBundle: {
      sequential: true,
      order: 'post',
      handler() {
        const dist = path.resolve(process.cwd(), 'dist')
        const index = path.join(dist, 'index.html')
        if (fs.existsSync(index)) {
          fs.copyFileSync(index, path.join(dist, '404.html'))
        }
      },
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: pagesBase(),
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    galleriesPlugin(),
    githubPagesSpaFallback(),
  ],
})
