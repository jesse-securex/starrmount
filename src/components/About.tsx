import type { ComponentType, CSSProperties, SVGProps } from 'react';
import { EntranceIcon, ExpertiseIcon, ShieldCheckIcon } from './Icons';

interface Reason {
  title: string;
  text: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
}

const reasons: Reason[] = [
  {
    title: 'Trusted brands',
    text: 'Screening equipment from established names such as Rapiscan and Garrett.',
    Icon: ShieldCheckIcon,
  },
  {
    title: 'One supplier for every entrance',
    text: 'Screening, turnstiles, barriers and parking systems from one place.',
    Icon: EntranceIcon,
  },
  {
    title: 'Security know-how',
    text: "Backed by the Securex group's experience, to help you choose the right equipment.",
    Icon: ExpertiseIcon,
  },
];

export default function About() {
  return (
    <section id="about" className="section section--navy on-navy" aria-labelledby="about-title">
      <div className="container">
        <p className="kicker kicker--on-navy" data-reveal>
          About Starrmount
        </p>
        <h2 id="about-title" className="section__title" data-reveal>
          Why clients choose us
        </h2>
        <p className="about__text" data-reveal>
          A site is only as secure as its busiest entrance. Starrmount Solutions works in partnership with its
          clients in Dubai, not just as a supplier. We look at how people and vehicles actually move through your
          site, then match the right screening, access and parking equipment to it.
        </p>

        <ul className="about__cards">
          {reasons.map(({ title, text, Icon }, i) => (
            <li
              key={title}
              className="about__card"
              data-reveal
              style={{ '--reveal-delay': `${i * 100}ms` } as CSSProperties}
            >
              <Icon className="about__icon" width={36} height={36} />
              <h3 className="about__card-title">{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
