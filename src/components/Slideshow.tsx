import { useEffect, useState, type FocusEvent } from 'react';
import type { Slide } from '../data/products';
import { imageUrl } from '../data/images';
import { usePrefersReducedMotion } from '../lib/motion';
import { ChevronLeftIcon, ChevronRightIcon } from './Icons';

const AUTOPLAY_MS = 4000;

interface SlideshowProps {
  slides: Slide[];
  productName: string;
}

/** Image slideshow. Remount it (via `key`) to reset to the first slide. */
export default function Slideshow({ slides, productName }: SlideshowProps) {
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [keyboardFocus, setKeyboardFocus] = useState(false);
  // Bumped by the arrows and dots so the auto-play timer starts again from zero.
  const [restart, setRestart] = useState(0);
  const reducedMotion = usePrefersReducedMotion();
  const count = slides.length;
  const slide = slides[index];
  const hasControls = count > 1;
  const playing = hasControls && !reducedMotion && !hovered && !keyboardFocus;

  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => setIndex((i) => (i + 1) % count), AUTOPLAY_MS);
    return () => window.clearTimeout(timer);
  }, [playing, index, count, restart]);

  const go = (next: number) => {
    setIndex((next + count) % count);
    setRestart((n) => n + 1);
  };

  const handleFocus = (e: FocusEvent<HTMLDivElement>) => setKeyboardFocus(e.target.matches(':focus-visible'));
  const handleBlur = (e: FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setKeyboardFocus(false);
  };

  return (
    <div
      className="slideshow"
      aria-roledescription="carousel"
      aria-label={`${productName} photos`}
      onPointerEnter={(e) => e.pointerType === 'mouse' && setHovered(true)}
      onPointerLeave={(e) => e.pointerType === 'mouse' && setHovered(false)}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <div className="slideshow__frame">
        <div className="slideshow__viewport">
          {slides.map((s, i) => (
            <img
              key={s.image}
              src={imageUrl(s.image)}
              alt={s.caption}
              aria-hidden={i === index ? undefined : true}
              width={s.width}
              height={s.height}
              decoding="async"
              className={`slideshow__image${i === index ? ' is-active' : ''}`}
            />
          ))}
        </div>
      </div>

      <div className="slideshow__bar">
        {hasControls && (
          <button
            type="button"
            className="slideshow__arrow"
            aria-label="Previous photo"
            onClick={() => go(index - 1)}
          >
            <ChevronLeftIcon />
          </button>
        )}
        <p className="slideshow__caption" aria-live={playing ? 'off' : 'polite'}>
          {slide.caption}
          {hasControls && (
            <span className="visually-hidden">
              {' '}
              (photo {index + 1} of {count})
            </span>
          )}
        </p>
        {hasControls && (
          <button
            type="button"
            className="slideshow__arrow"
            aria-label="Next photo"
            onClick={() => go(index + 1)}
          >
            <ChevronRightIcon />
          </button>
        )}
      </div>

      {hasControls && (
        <div className="slideshow__dots">
          {slides.map((s, i) => (
            <button
              key={s.image}
              type="button"
              className="slideshow__dot"
              aria-label={`Show photo ${i + 1} of ${count}: ${s.caption}`}
              aria-current={i === index ? 'true' : undefined}
              onClick={() => go(i)}
            >
              <span aria-hidden="true" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
