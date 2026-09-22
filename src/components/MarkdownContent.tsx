import Markdown from 'react-markdown'
import FadeImage from './FadeImage'

type MarkdownContentProps = {
  content: string
}

const knownImageSizes: Record<string, { width: number; height: number }> = {
  '/images/mystoryimage.avif': { width: 1600, height: 1308 },
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <article className="markdown-content">
      <Markdown
        components={{
          img: ({ node: _node, src, ...props }) => {
            const size =
              typeof src === 'string' ? knownImageSizes[src] : undefined

            return (
              <FadeImage
                {...props}
                src={src}
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
