import { Link, Navigate, useParams } from 'react-router-dom'
import verticalLine from '/src/assets/vert-divider.svg'
import { draftPages, getDraftPage } from '../contentPages'
import { ContentPageView } from './MarkdownPage'

export function DraftIndex() {
  return (
    <div className="content-page">
      <div className="page-title-container">
        <h1 className="page-title">Drafts</h1>
        <img src={verticalLine} alt="" />
      </div>
      <div className="markdown-content">
        {draftPages.length === 0 ? (
          <p>No drafts yet.</p>
        ) : (
          <ul>
            {draftPages.map((page) => (
              <li key={page.filename}>
                <Link to={`/drafts/${encodeURIComponent(page.filename)}`}>
                  {page.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="vertical-divider">
        <img src={verticalLine} alt="" />
      </div>
    </div>
  )
}

export default function DraftPage() {
  const { filename } = useParams<{ filename: string }>()
  const page = filename ? getDraftPage(filename) : undefined

  if (!page) {
    return <Navigate to="/drafts" replace />
  }

  return <ContentPageView page={page} />
}
