import { Link } from 'react-router-dom'
import FadeImage from '../components/FadeImage'
import verticalLine from '/src/assets/vert-divider.svg'

const heroImage = `${import.meta.env.BASE_URL}images/hero-image.avif`

export default function Home() {
  return (
    <div className="home-page">
      <section className="hero-section">
    <div className="w-layout-blockcontainer contact-container-copy w-container">
        <div className="hero-wrapper">
            <div className="hero-content">
                <h1 className="hero-h1">Grounded<br />Presence</h1>
                <img src={verticalLine} loading="lazy" alt="" />
                <Link to="/work" className="primary-button">View My Work</Link>
            </div>
            <div className="hero-image">
                <FadeImage
                  src={heroImage}
                  alt=""
                  width={1504}
                  height={1504}
                  fetchPriority="high"
                  decoding="async"
                />
            </div>
        </div>
        <div className="vertical-divider">
        <img src={verticalLine} loading="lazy" alt="" />
        </div>
    </div>
</section>

    </div>
  )
}