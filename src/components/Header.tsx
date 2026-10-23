import { useState } from 'react';
import { imageUrl } from '../data/images';

export default function Header() {
  // Shows a text wordmark if the logo file is missing.
  const [logoFailed, setLogoFailed] = useState(false);

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <a className="site-header__brand" href="#top">
          {logoFailed ? (
            <span className="wordmark wordmark--dark">
              STARRMOUNT <span className="wordmark__accent">SOLUTIONS</span> FZ-LLC
            </span>
          ) : (
            <img
              src={imageUrl('logo-header.png')}
              alt="Starrmount Solutions FZ-LLC"
              width={216}
              height={64}
              className="site-header__logo"
              onError={() => setLogoFailed(true)}
            />
          )}
        </a>
        <nav aria-label="Main" className="site-nav">
          <ul className="site-nav__list">
            <li>
              <a href="#products">Products</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
          <a className="btn btn--navy" href="#contact">
            Request a quote
          </a>
        </nav>
      </div>
    </header>
  );
}
