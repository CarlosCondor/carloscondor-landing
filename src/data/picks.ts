export type PickCategoryKey = 'workspace' | 'movilidad' | 'lifestyle';

export interface PickProduct {
  slug: string;
  title: string;
  brand: string;
  category: PickCategoryKey;
  priceLabel: string;
  affiliateUrl: string;
  image: string;
  shortDescription: string;
  description: string;
  featured?: boolean;
  isNew?: boolean;
}

export const categoryLabels: Record<PickCategoryKey, string> = {
  workspace: 'Espacio de trabajo',
  movilidad: 'Movilidad',
  lifestyle: 'Vida diaria'
};

export const picks: PickProduct[] = [
  {
    slug: 'raspberry-pi-5-8gb',
    title: 'Raspberry Pi 5 8GB',
    brand: 'Selección personal',
    category: 'workspace',
    priceLabel: '139 €',
    affiliateUrl: 'https://amzn.to/4tYgNWz',
    image: '/images/picks/rpi5.jpg',
    shortDescription: 'Mini-pc donde alojo Home Assistant, mi asistente de control de domótica.',
    description:
      'Utilizo este mini ordenador para alojar el sistema operativo Home Assistant que sirve para gestionar la domótica de mi casa, servidor Plex de contenido multimedia y un asistente IA Openclaw.',
    featured: true,
    isNew: true,
  },
  {
    slug: 'tp-link-re700x-repetidor-wifi-6',
    title: 'TP-Link RE700X Repetidor Wi-Fi 6 AX3000',
    brand: 'TP-Link',
    category: 'workspace',
    priceLabel: '62,60 €',
    affiliateUrl: 'https://amzn.to/4cIgxEE',
    image: '/images/picks/tp-link-re700x-repetidor-wifi-6.jpg',
    shortDescription:
      'Amplía la cobertura Wi-Fi en casa y mejora la estabilidad en zonas donde el router no llega bien.',
    description:
      'Lo recomiendo para setups en casa cuando el escritorio está lejos del router y aparecen cortes o baja velocidad. Este repetidor Wi-Fi 6 de TP-Link mejora cobertura y mantiene una conexión más estable para trabajo, videollamadas y streaming.',
  },
  {
    slug: 'ergosolid-brazo-monitor-ergonomico',
    title: 'Ergosolid Brazo ergonómico para monitor (17–30")',
    brand: 'Ergosolid',
    category: 'workspace',
    priceLabel: '29,99 €',
    affiliateUrl: 'https://amzn.to/3ZS66ae',
    image: '/images/picks/ergosolid-brazo-monitor-ergonomico.jpg',
    shortDescription:
      'Brazo soporte de monitor con resorte de gas ajustable en altura y profundidad.',
    description:
      'Lo uso para elevar y ajustar las dos pantallas de mi escritorio. Ganas espacio en la mesa y puedes mover las pantallas individualmente en cualquier dirección. Es el mejor soporte que he usado nunca para monitores.',
  },
];

export function getPickBySlug(slug: string) {
  return picks.find((pick) => pick.slug === slug);
}

export function getRelatedPicks(current: PickProduct, limit = 3) {
  const sameCategory = picks.filter(
    (pick) => pick.slug !== current.slug && pick.category === current.category,
  );

  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit);
  }

  const others = picks.filter(
    (pick) => pick.slug !== current.slug && pick.category !== current.category,
  );

  return [...sameCategory, ...others].slice(0, limit);
}

export function getRepresentativeByCategory() {
  const seen = new Set<PickCategoryKey>();
  return picks.filter((pick) => {
    if (seen.has(pick.category)) return false;
    seen.add(pick.category);
    return true;
  });
}
