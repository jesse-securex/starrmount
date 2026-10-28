// Edit partner brands here. Logos live in public/images.
// "logo": a logo image. "icon-text": a small icon beside the brand name. "placeholder": a dashed card.

export interface PartnerBrand {
  name: string;
  image: string;
  width: number;
  height: number;
}

export type Partner =
  | ({ kind: 'logo' } & PartnerBrand)
  | ({ kind: 'icon-text' } & PartnerBrand)
  | { kind: 'placeholder'; label: string };

export const partners: Partner[] = [
  { kind: 'logo', name: 'Rapiscan', image: 'rapii.png', width: 322, height: 156 },
  { kind: 'icon-text', name: 'CASS', image: 'caaas.jpg', width: 153, height: 148 },
  { kind: 'logo', name: 'Turnstar', image: 'star.png', width: 156, height: 34 },
  { kind: 'logo', name: 'Hikvision', image: 'hik.png', width: 327, height: 43 },
  { kind: 'logo', name: 'Ajax', image: 'ajax.png', width: 457, height: 253 },
  { kind: 'logo', name: 'Securex', image: 'seccc.png', width: 181, height: 165 },
];
