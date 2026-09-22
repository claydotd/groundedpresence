import verticalLine from '/src/assets/vert-divider.svg'
import myStoryContent from '../../content/MyStory.md?raw'
import MarkdownContent from '../components/MarkdownContent'

export default function MyStory() {
  return (
    <div className="content-page">
      <div className="page-title-container">
        <h1 className="page-title">My Story</h1>
        <img src={verticalLine} alt="" />
      </div>
      <MarkdownContent content={myStoryContent} />
      <div className="vertical-divider">
        <img src={verticalLine} alt="" />
      </div>
    </div>
  )
}
