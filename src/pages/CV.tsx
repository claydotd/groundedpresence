import verticalLine from '/src/assets/vert-divider.svg'
import cvContent from '../../content/CV.md?raw'
import MarkdownContent from '../components/MarkdownContent'

export default function CV() {
  return (
    <div className="content-page">
      <div className="page-title-container">
        <h1 className="page-title">CV</h1>
        <img src={verticalLine} alt="" />
      </div>
      <MarkdownContent content={cvContent} />
      <div className="vertical-divider">
        <img src={verticalLine} alt="" />
      </div>
    </div>
  )
}
