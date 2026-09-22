import Markdown from 'react-markdown'
import FadeImage from './FadeImage'

type MarkdownContentProps = {
  content: string
}

const knownImageSizes: Record<string, { width: number; height: number }> = {
  '/images/mystoryimage.avif': { width: 1600, height: 1308 },
}

/** Resolve root-absolute public paths against Vite's base (e.g. /groundedpresence/). */
function resolvePublicSrc(src: string): string {
  if (/^(https?:|data:|blob:)/i.test(src)) return src
  if (src.startsWith('/')) {
    return `${import.meta.env.BASE_URL}${src.slice(1)}`
  }
  return src
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <article className="markdown-content">
      <Markdown
        components={{
          img: ({ node: _node, src, ...props }) => {
            const resolvedSrc =
              typeof src === 'string' ? resolvePublicSrc(src) : src
            const size =
              typeof src === 'string' ? knownImageSizes[src] : undefined

            return (
              <FadeImage
                {...props}
                src={resolvedSrc}
                width={size?.width}
                height={size?.height}
                decoding="async"
              />
            )
          },
        }}
      >
        {content}
      </Markdown>
    </article>
  )
}
