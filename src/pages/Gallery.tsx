import { Link, Navigate, useParams } from 'react-router-dom'
import { galleries } from 'virtual:galleries'
import FadeImage from '../components/FadeImage'
import verticalLine from '/src/assets/vert-divider.svg'

export default function Gallery() {
  const { slug } = useParams<{ slug: string }>()
  const gallery = galleries.find((item) => item.slug === slug)

  if (!gallery) {
    return <Navigate to="/work" replace />
  }

  return (
    <div className="content-page">
      <div className="page-title-container">
        <h1 className="page-title">{gallery.name}</h1>
        <img src={verticalLine} alt="" />
      </div>

      <div className="gallery-images">
        {gallery.images.map((src, index) => (
          <FadeImage
            key={src}
            src={src}
            alt={`${gallery.name} image ${index + 1}`}
            className="gallery-image"
            loading="lazy"
            decoding="async"
          />
        ))}
      </div>

      <div className="gallery-back">
        <Link to="/work" className="primary-button">
          Back to work
        </Link>
      </div>

      <div className="vertical-divider">
        <img src={verticalLine} alt="" />
      </div>
    </div>
  )
}
