const RESERVED_SLUGS = new Set(['work'])

const markdownFiles = import.meta.glob('../content/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

export type ContentPage = {
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

const seenSlugs = new Set<string>()

export const contentPages: ContentPage[] = Object.entries(markdownFiles)
  .map(([filePath, content]) => {
    const stem = fileStemFromPath(filePath)
    const { order } = parseOrderPrefix(stem)

    return {
      slug: formatSlug(stem),
      title: formatTitle(stem),
      order,
      content,
    }
  })
  .filter((page) => {
    if (!page.slug || RESERVED_SLUGS.has(page.slug) || seenSlugs.has(page.slug)) {
      return false
    }

    seenSlugs.add(page.slug)
    return true
  })
  .sort((a, b) => {
    if (a.order !== b.order) return a.order - b.order
    return a.title.localeCompare(b.title)
  })

export function getContentPage(slug: string): ContentPage | undefined {
  return contentPages.find((page) => page.slug === slug)
}
