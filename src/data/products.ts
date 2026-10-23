// Edit products here. Images live in public/images; use the exact file name.
// width/height are the image's real pixel size (used to avoid layout shift).

export interface Slide {
  image: string;
  caption: string;
  width: number;
  height: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  points: string[];
  slides: Slide[];
}

export const products: Product[] = [
  {
    id: 'cass-parking',
    name: 'CASS Parking',
    description:
      'CASS car park systems that manage the vehicles coming in and out, with self-service payment and automatic number-plate recognition.',
    points: [
      'Auto pay stations for tickets and payment',
      'Number-plate ID cameras',
      'Works with boom barriers at entry and exit',
    ],
    slides: [
      { image: 'cass 3.jpg', caption: 'Auto pay station on site', width: 461, height: 469 },
      { image: 'cass 4.jpg', caption: 'Auto pay stations', width: 461, height: 428 },
      { image: 'cass 2.jpg', caption: 'Auto pay station', width: 227, height: 629 },
      { image: 'cass 1.jpg', caption: 'Number-plate ID camera at a barrier', width: 457, height: 671 },
      { image: 'cass.jpg', caption: 'Number-plate ID camera', width: 412, height: 196 },
    ],
  },
  {
    id: 'rapiscan',
    name: 'Rapiscan',
    description:
      'Rapiscan security screening equipment, including X-ray scanners that check bags and parcels without opening them.',
    points: [
      'X-ray baggage and parcel scanners',
      'Suited to hotels, malls, offices and events',
    ],
    slides: [
      { image: 'rap.jpg', caption: 'Rapiscan ORION X-ray baggage scanner', width: 525, height: 429 },
    ],
  },
  {
    id: 'garrett',
    name: 'Garrett',
    description: 'Garrett metal detectors for screening people at entrances, events and secure areas.',
    points: ['Walk-through metal detector arches', 'Hand-held detector wands', 'Fixed and portable options'],
    slides: [
      { image: 'rap s.jpg', caption: 'Garrett walk-through metal detector', width: 266, height: 498 },
      { image: 'gar.jpg', caption: 'Garrett Super Scanner hand-held wand', width: 423, height: 418 },
    ],
  },
  {
    id: 'turnstiles',
    name: 'Turnstiles',
    description: 'Gates that let one person through at a time, opened by a card, tag, QR code or face reader.',
    points: ['Waist-high tripod turnstiles', 'Full-height turnstiles for perimeters', 'Speed gates for office lobbies'],
    slides: [
      { image: 'truns2.jpg', caption: 'Tripod turnstile', width: 535, height: 423 },
      { image: 'turns 1.jpg', caption: 'Speed gates with glass panels', width: 610, height: 369 },
      { image: 'turns.jpg', caption: 'Full-height turnstile', width: 511, height: 391 },
    ],
  },
  {
    id: 'boom-barriers',
    name: 'Boom Barriers',
    description: 'Motorised arms that open and close vehicle entrances and exits.',
    points: [
      'Opened by a guard, remote or card reader',
      'Can link to number-plate cameras',
      'For gates, car parks and compounds',
    ],
    slides: [{ image: 'boomm.jpg', caption: 'Boom barrier', width: 738, height: 411 }],
  },
];

/** The product shown when the page loads. */
export const defaultProductId = 'rapiscan';
