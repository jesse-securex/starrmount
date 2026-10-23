import { useEffect, useState } from 'react';
import { defaultProductId, products } from '../data/products';
import { preloadImages } from '../data/images';
import Slideshow from './Slideshow';
import { CheckIcon } from './Icons';

export default function Products() {
  const [selectedId, setSelectedId] = useState(defaultProductId);
  const product = products.find((p) => p.id === selectedId) ?? products[0];

  // Fetch every product's photos up front so switching products shows them instantly.
  useEffect(() => {
    preloadImages(products.flatMap((p) => p.slides.map((s) => s.image)));
  }, []);

  return (
    <section id="products" className="section" aria-labelledby="products-title">
      <div className="container">
        <p className="kicker" data-reveal>
          What we supply
        </p>
        <h2 id="products-title" className="section__title" data-reveal>
          Our products
        </h2>
        <p className="section__intro" data-reveal>
          Select a product to see photos and details.
        </p>

        <div className="products">
          <ul className="products__list" aria-label="Products" data-reveal>
            {products.map((p) => (
              <li key={p.id}>
                <button
                  type="button"
                  className="products__button"
                  aria-pressed={p.id === product.id}
                  aria-controls="product-panel"
                  onClick={() => setSelectedId(p.id)}
                >
                  {p.name}
                </button>
              </li>
            ))}
          </ul>

          <div id="product-panel" className="panel products__panel" data-reveal>
            {/* Keyed so the content (and slideshow) remounts and plays its entrance animation on each change. */}
            <div key={product.id} className="products__content">
              <Slideshow slides={product.slides} productName={product.name} />
              <div className="products__details">
                <h3 className="products__name">{product.name}</h3>
                <p className="products__description">{product.description}</p>
                <ul className="checklist">
                  {product.points.map((point) => (
                    <li key={point}>
                      <CheckIcon className="checklist__icon" />
                      {point}
                    </li>
                  ))}
                </ul>
                <a className="btn btn--navy" href="#contact">
                  Ask about this product
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
