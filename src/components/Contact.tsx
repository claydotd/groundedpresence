import FadeImage from './FadeImage'
import insta from '/src/assets/insta.svg'

const footprint = `${import.meta.env.BASE_URL}images/footprints.avif`

export default function Contact() {
  return (
    <div className="contact-container">
    <h2>Contact</h2>
      <FadeImage
        className="contact-footprint"
        width={1288}
        height={1604}
        src={footprint}
        alt="footprint"
        decoding="async"
      />
      <div className="contact-links" id="contact">
      <div className="contact-link">
        <a href="mailto:clasbobear@icloud.com"><strong>Email:</strong> clasbobear@icloud.com</a>
      </div>
      <div className="contact-link">
        <a href="tel:+447732628870">Mobile: 07732 628 870</a>
      </div>
      <div className="contact-link">
          <a href="https://www.instagram.com/clasbo?igsh=MWVhNnY5YXR2azMwcQ%3D%3D" target="_blank" rel="noopener noreferrer">
            <img className="contact-link-icon" src={insta} alt="instagram" />
            <span className="contact-link-text">@clasbo</span>
        </a>
      </div>
    </div>
  </div>
);
}