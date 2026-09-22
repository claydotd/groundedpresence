import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer>
      <Link to="/" className="brand"><h2 className="logo-text">Claire McAlpine | Photography</h2></Link>
    </footer>
  );
}