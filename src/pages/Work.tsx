import { Link } from 'react-router-dom'
import { galleries } from 'virtual:galleries'
import FadeImage from '../components/FadeImage'
import verticalLine from '/src/assets/vert-divider.svg'

export default function Work() {
  return (
    <div className="content-page">
      <div className="page-title-container">
        <h1 className="page-title">Work</h1>
        <img src={verticalLine} alt="" />
      </div>

      <div className="gallery-list">
        {galleries.map((gallery) => (
          <article key={gallery.slug} className="gallery-preview">
            <h2 className="gallery-preview-title">{gallery.name}</h2>
            <Link
              to={`/work/${gallery.slug}`}
              className="gallery-preview-link"
            >
              <FadeImage
                src={gallery.thumb}
                alt={`${gallery.name} collection preview`}
                className="gallery-preview-thumb"
                loading="lazy"
                decoding="async"
              />
            </Link>
            <Link
              to={`/work/${gallery.slug}`}
              className="primary-button"
            >
              View {gallery.name} collection
            </Link>
          </article>
        ))}
      </div>

      <div className="vertical-divider">
        <img src={verticalLine} alt="" />
      </div>
    </div>
  )
}
