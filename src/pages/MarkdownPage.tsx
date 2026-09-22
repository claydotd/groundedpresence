import { Navigate, useParams } from 'react-router-dom'
import verticalLine from '/src/assets/vert-divider.svg'
import MarkdownContent from '../components/MarkdownContent'
import { getContentPage } from '../contentPages'

export default function MarkdownPage() {
  const { slug } = useParams<{ slug: string }>()
  const page = slug ? getContentPage(slug) : undefined

  if (!page) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="content-page">
      <div className="page-title-container">
        <h1 className="page-title">{page.title}</h1>
        <img src={verticalLine} alt="" />
      </div>
      <MarkdownContent content={page.content} />
      <div className="vertical-divider">
        <img src={verticalLine} alt="" />
      </div>
    </div>
  )
}
