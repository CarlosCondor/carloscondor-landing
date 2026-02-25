export type PickCategoryKey =
  | 'workspace'
  | 'lifestyle'
  | 'suplementos'
  | 'cafe';

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
  lifestyle: 'Vida diaria',
  suplementos: 'Suplementos',
  cafe: 'Café',
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
  {
    slug: 'nutralie-magnesio-citrato-bisglicinato',
    title: 'Nutralie Magnesio (Citrato + Bisglicinato) 120 cápsulas',
    brand: 'Nutralie',
    category: 'suplementos',
    priceLabel: '19,90 €',
    affiliateUrl: 'https://amzn.to/4tUUa55',
    image: '/images/picks/nutralie-magnesio-citrato-bisglicinato.jpg',
    shortDescription:
      'Complejo de magnesio en cápsulas con citrato y bisglicinato para una toma diaria sencilla.',
    description:
      'Suplemento de magnesio con dos formas habituales (citrato y bisglicinato) en formato cápsulas. Lo propongo como opción práctica si buscas algo fácil de integrar en la rutina sin mezclar polvos.',
  },
  {
    slug: 'hsn-creatina-creapure-monohidrato-500g',
    title: 'HSN Creatina Monohidrato Creapure 500 g',
    brand: 'HSN',
    category: 'suplementos',
    priceLabel: '26,90 €',
    affiliateUrl: 'https://amzn.to/4qUKxAU',
    image: '/images/picks/hsn-creatina-creapure-monohidrato-500g.jpg',
    shortDescription:
      'Creatina monohidrato micronizada Creapure en polvo, fácil de dosificar y mezclar.',
    description:
      'Formato de 500 g de creatina monohidrato con materia prima Creapure. Buena opción si prefieres comprar formato polvo para ajustar la dosis y que rinda más tiempo.',
  },
  {
    slug: 'nutravita-omega-3-2000mg-240-capsulas',
    title: 'Nutravita Omega 3 2000 mg (240 cápsulas)',
    brand: 'Nutravita',
    category: 'suplementos',
    priceLabel: '20,69 €',
    affiliateUrl: 'https://amzn.to/3MvXUtb',
    image: '/images/picks/nutravita-omega-3-2000mg-240-capsulas.jpg',
    shortDescription:
      'Omega 3 en cápsulas blandas con formato grande para varios meses.',
    description:
      'Bote de 240 cápsulas pensado para uso continuado. Lo propongo por su formato largo (4 meses según fabricante), útil si quieres evitar recompras frecuentes.',
  },
  {
    slug: 'gloryfeel-melatonina-400-tabletas',
    title: 'Gloryfeel Melatonina (400 tabletas)',
    brand: 'Gloryfeel',
    category: 'suplementos',
    priceLabel: '19,99 €',
    affiliateUrl: 'https://amzn.to/4aONnBs',
    image: '/images/picks/gloryfeel-melatonina-400-tabletas.jpg',
    shortDescription:
      'Melatonina en tabletas con formato muy duradero para uso ocasional o continuado.',
    description:
      'Formato de 400 tabletas con enfoque de larga duración. Puede ser práctico si prefieres tabletas frente a gotas o gummies y quieres un producto que cunda bastante.',
  },
  {
    slug: 'outin-nano-cafetera-espresso-portatil',
    title: 'OutIn Nano Cafetera Espresso Portátil',
    brand: 'OutIn',
    category: 'cafe',
    priceLabel: '149,99 €',
    affiliateUrl: 'https://amzn.to/3ZQvYmO',
    image: '/images/picks/outin-nano-cafetera-espresso-portatil.jpg',
    shortDescription:
      'Cafetera espresso portátil y autocalentable para preparar café fuera de casa sin depender de una máquina fija.',
    description:
      'Cafetera eléctrica portátil con carga USB-C pensada para viajes, coche, camping u oficina. Acepta café molido y cápsulas compatibles, así que es una opción muy práctica si quieres espresso en movilidad con un formato compacto.',
  },
  {
    slug: 'songmics-escritorio-electrico-180x80',
    title: 'SONGMICS Escritorio Eléctrico Regulable 180 x 80 cm',
    brand: 'SONGMICS',
    category: 'workspace',
    priceLabel: '127,49 €',
    affiliateUrl: 'https://amzn.to/3OYG16S',
    image: '/images/picks/songmics-escritorio-electrico-180x80.jpg',
    shortDescription:
      'Escritorio elevable eléctrico amplio con memoria de alturas para alternar entre trabajo sentado y de pie.',
    description:
      'Mesa regulable en altura de 180 x 80 cm con ajuste continuo y memorias de posición. La propongo para setup de trabajo porque ofrece una superficie amplia y facilita cambiar de postura durante la jornada.',
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
