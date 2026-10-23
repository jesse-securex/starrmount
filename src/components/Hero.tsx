import { StarShape } from './Icons';

export default function Hero() {
  return (
    <section id="top" className="hero on-navy" aria-labelledby="hero-title">
      <StarShape className="hero__star" />
      <div className="container hero__inner">
        <p className="kicker kicker--on-navy">Security equipment supplier · Dubai, UAE</p>
        <h1 id="hero-title" className="hero__title">
          Security equipment you can rely on.
        </h1>
        <p className="hero__text">
          Starrmount Solutions supplies screening, access control and parking equipment to businesses across Dubai.
        </p>
        <div className="hero__actions">
          <a className="btn btn--gold" href="#contact">
            Request a quote
          </a>
          <a className="btn btn--outline-gold" href="#products">
            Our products
          </a>
        </div>
      </div>
    </section>
  );
}
