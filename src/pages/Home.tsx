import FadeImage from '../components/FadeImage'
import heroImage from '/images/hero-image.avif'
import verticalLine from '/src/assets/vert-divider.svg'

export default function Home() {
  return (
    <div className="home-page">
      <section className="hero-section">
    <div className="w-layout-blockcontainer contact-container-copy w-container">
        <div className="hero-wrapper">
            <div className="hero-content">
                <h1 className="hero-h1">Grounded<br />Presence</h1>
                <img src={verticalLine} loading="lazy" alt="" />
                <a href="/work" className="primary-button">View My Work</a>
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