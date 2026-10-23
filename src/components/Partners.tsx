import type { CSSProperties } from 'react';
import { partners, type Partner } from '../data/partners';
import { imageUrl } from '../data/images';

/** One partner card. */
function PartnerItem({ partner }: { partner: Partner }) {
  if (partner.kind === 'placeholder') {
    return <li className="partner partner--placeholder">{partner.label}</li>;
  }

  return (
    <li className="partner">
      {partner.kind === 'logo' ? (
        <img
          src={imageUrl(partner.image)}
          alt={`${partner.name} logo`}
          width={partner.width}
          height={partner.height}
          loading="lazy"
          decoding="async"
          className="partner__logo"
        />
      ) : (
        <span className="partner__icon-text">
          <img
            src={imageUrl(partner.image)}
            alt=""
            width={partner.width}
            height={partner.height}
            loading="lazy"
            decoding="async"
            className="partner__icon"
          />
          <span className="partner__name">{partner.name}</span>
        </span>
      )}
    </li>
  );
}

const partnerKey = (partner: Partner) => (partner.kind === 'placeholder' ? partner.label : partner.name);

export default function Partners() {
  // About 5 seconds per logo keeps the loop slow whatever the number of partners.
  const marqueeStyle = { '--marquee-duration': `${partners.length * 5}s` } as CSSProperties;

  return (
    <section id="partners" className="section section--light" aria-label="Trusted partners">
      <div className="container">
        <p className="kicker" data-reveal>
          Trusted partners
        </p>

        <div className="partners-marquee" style={marqueeStyle} data-reveal>
          <div className="partners-marquee__track">
            <ul className="partners">
              {partners.map((partner) => (
                <PartnerItem key={partnerKey(partner)} partner={partner} />
              ))}
            </ul>
            <ul className="partners partners--clone" aria-hidden="true">
              {partners.map((partner) => (
                <PartnerItem key={partnerKey(partner)} partner={partner} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
