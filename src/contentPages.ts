const RESERVED_SLUGS = new Set(['work', 'drafts'])

const markdownFiles = import.meta.glob('../content/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

const draftFiles = import.meta.glob('../content/drafts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

export type ContentPage = {
  /** File name without `.md`, used for draft preview URLs. */
  filename: string
  slug: string
  title: string
  order: number
  content: string
}

/** Match leading sort numbers like "01-", "2_", or "03 ". */
function parseOrderPrefix(fileStem: string): { order: number; label: string } {
  const match = fileStem.match(/^(\d+)(?:[-_\s]+)?(.*)$/)
  if (!match) {
    return { order: Number.POSITIVE_INFINITY, label: fileStem }
  }

  const label = match[2].trim() || fileStem
  return { order: Number(match[1]), label }
}

function formatTitle(fileStem: string): string {
  const { label } = parseOrderPrefix(fileStem)

  return label
    .replace(/([a-z\d])([A-Z])/g, '$1 $2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function formatSlug(fileStem: string): string {
  const { label } = parseOrderPrefix(fileStem)

  return label
    .replace(/([a-z\d])([A-Z])/g, '$1-$2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .replace(/[-_\s]+/g, '-')
    .toLowerCase()
}

function fileStemFromPath(filePath: string): string {
  const filename = filePath.split('/').pop() ?? filePath
  return filename.replace(/\.md$/i, '')
}

function pagesFromFiles(
  files: Record<string, string>,
  options: { reserveSlugs: boolean },
): ContentPage[] {
  const seenSlugs = new Set<string>()

  return Object.entries(files)
    .map(([filePath, content]) => {
      const filename = fileStemFromPath(filePath)
      const { order } = parseOrderPrefix(filename)

      return {
        filename,
        slug: formatSlug(filename),
        title: formatTitle(filename),
        order,
        content,
      }
    })
    .filter((page) => {
      if (!page.slug) return false
      if (!options.reserveSlugs) return true
      if (RESERVED_SLUGS.has(page.slug) || seenSlugs.has(page.slug)) return false

      seenSlugs.add(page.slug)
      return true
    })
    .sort((a, b) => {
      if (a.order !== b.order) return a.order - b.order
      return a.title.localeCompare(b.title)
    })
}

export const contentPages: ContentPage[] = pagesFromFiles(markdownFiles, {
  reserveSlugs: true,
})

export const draftPages: ContentPage[] = pagesFromFiles(draftFiles, {
  reserveSlugs: false,
})

export function getContentPage(slug: string): ContentPage | undefined {
  return contentPages.find((page) => page.slug === slug)
}

function draftLookupKey(value: string): string {
  try {
    value = decodeURIComponent(value)
  } catch {
    // Keep the raw value when it is not valid percent-encoding.
  }

  return value.replace(/\.md$/i, '').trim().toLowerCase()
}

export function getDraftPage(filename: string): ContentPage | undefined {
  const key = draftLookupKey(filename)
  return draftPages.find((page) => page.filename.toLowerCase() === key)
}
