import fs from 'node:fs'
import path from 'node:path'
import type { Plugin } from 'vite'

const VIRTUAL_MODULE_ID = 'virtual:galleries'
const RESOLVED_VIRTUAL_MODULE_ID = `\0${VIRTUAL_MODULE_ID}`

const IMAGE_EXTENSIONS = new Set([
  '.jpg',
  '.jpeg',
  '.png',
  '.webp',
  '.avif',
  '.gif',
])

export type Gallery = {
  slug: string
  name: string
  order: number
  thumb: string
  images: string[]
}

/** Match leading sort numbers like "01-", "2_", or "03 ". */
function parseOrderPrefix(folderName: string): { order: number; label: string } {
  const match = folderName.match(/^(\d+)(?:[-_\s]+)?(.*)$/)
  if (!match) {
    return { order: Number.POSITIVE_INFINITY, label: folderName }
  }

  const label = match[2].trim() || folderName
  return { order: Number(match[1]), label }
}

function formatGalleryName(folderName: string): string {
  const { label } = parseOrderPrefix(folderName)

  return label
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

function isImageFile(filename: string): boolean {
  return IMAGE_EXTENSIONS.has(path.extname(filename).toLowerCase())
}

function isPreviewCandidate(filename: string): boolean {
  const base = path.parse(filename).name.toLowerCase()
  return /^(thumb|preview|cover|thumbnail)$/.test(base)
}

function withBase(base: string, assetPath: string): string {
  const prefix = base.endsWith('/') ? base.slice(0, -1) : base
  const suffix = assetPath.startsWith('/') ? assetPath : `/${assetPath}`
  return `${prefix}${suffix}`
}

function scanGalleries(root: string, base: string): Gallery[] {
  const galleriesDir = path.join(root, 'public', 'galleries')
  if (!fs.existsSync(galleriesDir)) return []

  const galleries: Gallery[] = []

  for (const entry of fs.readdirSync(galleriesDir, { withFileTypes: true })) {
    if (!entry.isDirectory() || entry.name.startsWith('.')) continue

    const folderPath = path.join(galleriesDir, entry.name)
    const files = fs
      .readdirSync(folderPath, { withFileTypes: true })
      .filter((file) => file.isFile() && isImageFile(file.name))
      .map((file) => file.name)
      .sort((a, b) =>
        a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }),
      )

    if (files.length === 0) continue

    const preview = files.find(isPreviewCandidate) ?? files[0]
    const images = files.map((file) =>
      withBase(base, `/galleries/${entry.name}/${file}`),
    )
    const { order } = parseOrderPrefix(entry.name)
    const name = formatGalleryName(entry.name)

    galleries.push({
      slug: entry.name,
      name,
      order,
      thumb: withBase(base, `/galleries/${entry.name}/${preview}`),
      images,
    })
  }

  return galleries.sort((a, b) => {
    if (a.order !== b.order) return a.order - b.order
    return a.name.localeCompare(b.name)
  })
}

function isGalleriesPath(filePath: string): boolean {
  return filePath.includes(`${path.sep}galleries${path.sep}`) ||
    filePath.endsWith(`${path.sep}galleries`)
}

export function galleriesPlugin(): Plugin {
  let root = process.cwd()
  let base = '/'

  return {
    name: 'galleries',
    configResolved(config) {
      root = config.root
      base = config.base
    },
    resolveId(id) {
      if (id === VIRTUAL_MODULE_ID) return RESOLVED_VIRTUAL_MODULE_ID
    },
    load(id) {
      if (id !== RESOLVED_VIRTUAL_MODULE_ID) return
      const galleries = scanGalleries(root, base)
      return `export const galleries = ${JSON.stringify(galleries, null, 2)}\n`
    },
    configureServer(server) {
      const galleriesDir = path.join(root, 'public', 'galleries')
      if (fs.existsSync(galleriesDir)) {
        server.watcher.add(galleriesDir)
      }

      const invalidate = () => {
        const mod = server.moduleGraph.getModuleById(RESOLVED_VIRTUAL_MODULE_ID)
        if (!mod) return
        server.moduleGraph.invalidateModule(mod)
        server.ws.send({ type: 'full-reload' })
      }

      server.watcher.on('add', (file) => {
        if (isGalleriesPath(file)) invalidate()
      })
      server.watcher.on('unlink', (file) => {
        if (isGalleriesPath(file)) invalidate()
      })
      server.watcher.on('addDir', (file) => {
        if (isGalleriesPath(file)) invalidate()
      })
      server.watcher.on('unlinkDir', (file) => {
        if (isGalleriesPath(file)) invalidate()
      })
    },
  }
}
