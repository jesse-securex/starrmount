import { useEffect, useRef, useState } from 'react';
import { defaultProductId, products, type Product } from '../data/products';
import { preloadImages } from '../data/images';
import { useMediaQuery } from '../lib/media';
import Slideshow from './Slideshow';
import { CheckIcon } from './Icons';

// Keep in sync with the 640px breakpoint in index.css.
const mobileQuery = '(max-width: 640px)';

function ProductContent({ product }: { product: Product }) {
  return (
    // Keyed by the caller so the content (and slideshow) remounts and plays its entrance animation on each change.
    <div className="products__content">
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
  );
}

export default function Products() {
  const isMobile = useMediaQuery(mobileQuery);
  const [selectedId, setSelectedId] = useState<string | null>(defaultProductId);
  // On desktop a product is always shown; on mobile the open one can be collapsed.
  const product = products.find((p) => p.id === selectedId) ?? products[0];
  const openId = isMobile ? selectedId : product.id;
  const buttonRefs = useRef(new Map<string, HTMLButtonElement>());
  const hasSelected = useRef(false);

  // Fetch every product's photos up front so switching products shows them instantly.
  useEffect(() => {
    preloadImages(products.flatMap((p) => p.slides.map((s) => s.image)));
  }, []);

  // On mobile, closing the product above shifts the newly opened one up, so bring its name back into view.
  useEffect(() => {
    if (!isMobile || !hasSelected.current || !openId) return;
    buttonRefs.current.get(openId)?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [isMobile, openId]);

  function select(id: string) {
    hasSelected.current = true;
    setSelectedId(isMobile && id === openId ? null : id);
  }

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
                  ref={(el) => {
                    if (el) buttonRefs.current.set(p.id, el);
                    else buttonRefs.current.delete(p.id);
                  }}
                  type="button"
                  className="products__button"
                  aria-pressed={isMobile ? undefined : p.id === openId}
                  aria-expanded={isMobile ? p.id === openId : undefined}
                  aria-controls={isMobile ? `product-panel-${p.id}` : 'product-panel'}
                  onClick={() => select(p.id)}
                >
                  {p.name}
                </button>
                {isMobile && p.id === openId && (
                  <div id={`product-panel-${p.id}`} className="panel products__panel products__panel--inline">
                    <ProductContent key={p.id} product={p} />
                  </div>
                )}
              </li>
            ))}
          </ul>

          {!isMobile && (
            // No data-reveal: this can mount after load (e.g. rotating to landscape), when scroll reveal no longer
            // watches new elements; the content's own entrance animation covers it.
            <div id="product-panel" className="panel products__panel">
              <ProductContent key={product.id} product={product} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
