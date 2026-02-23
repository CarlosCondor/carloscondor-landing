export type PickCategoryKey = 'workspace' | 'movilidad' | 'lectura';

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
  lectura: 'Lectura',
};

export const picks: PickProduct[] = [
  {
    slug: 'lampara-escritorio-regulable',
    title: 'Lámpara de escritorio regulable',
    brand: 'Selección personal',
    category: 'workspace',
    priceLabel: '79 €',
    affiliateUrl: '#',
    image: '/images/picks/lampara-escritorio.svg',
    shortDescription: 'Luz cálida/fría, intensidad regulable y base compacta para mesas pequeñas.',
    description:
      'Una lámpara pensada para jornadas largas frente al portátil. Prioriza una iluminación homogénea, control de intensidad y una base que no invada media mesa. La recomiendo para setups domésticos donde quieres mejorar ergonomía visual sin añadir ruido estético.',
    featured: true,
    isNew: true,
  },
  {
    slug: 'soporte-portatil-aluminio',
    title: 'Soporte elevador para portátil',
    brand: 'Setup esencial',
    category: 'workspace',
    priceLabel: '42 €',
    affiliateUrl: '#',
    image: '/images/picks/soporte-portatil.svg',
    shortDescription: 'Eleva la pantalla a la altura de los ojos y mejora la ventilación del equipo.',
    description:
      'Es uno de los cambios con más impacto por coste. Elevar el portátil reduce tensión en cuello y hombros y deja hueco libre debajo para teclado o libreta. Busco modelos estables, sin flexión y con goma suficiente para no deslizar.',
  },
  {
    slug: 'teclado-mecanico-compacto',
    title: 'Teclado mecánico compacto',
    brand: 'Escritura diaria',
    category: 'workspace',
    priceLabel: '129 €',
    affiliateUrl: '#',
    image: '/images/picks/teclado-compacto.svg',
    shortDescription: 'Formato contenido, buena sensación al teclear y cable desmontable.',
    description:
      'Para trabajar muchas horas escribiendo, un teclado consistente marca diferencia. Prefiero formatos compactos porque liberan espacio para el ratón y permiten una postura más centrada. Esta recomendación está pensada para productividad, no para estética extrema.',
    featured: true,
  },
  {
    slug: 'mochila-urbana-20l',
    title: 'Mochila urbana 20L',
    brand: 'Movilidad diaria',
    category: 'movilidad',
    priceLabel: '95 €',
    affiliateUrl: '#',
    image: '/images/picks/mochila-urbana.svg',
    shortDescription: 'Capacidad equilibrada para portátil, accesorios y un cambio ligero.',
    description:
      'La recomiendo como opción diaria para ciudad: tamaño suficiente para portátil y cargadores, pero sin irse a volúmenes grandes que resultan incómodos en transporte público. Busco compartimentos simples, cremalleras fiables y un diseño sobrio.',
  },
  {
    slug: 'cuaderno-punteado-a5',
    title: 'Cuaderno punteado A5',
    brand: 'Notas y pensamiento',
    category: 'lectura',
    priceLabel: '18 €',
    affiliateUrl: '#',
    image: '/images/picks/cuaderno-punteado.svg',
    shortDescription: 'Buen papel, tamaño portátil y formato versátil para notas o planificación.',
    description:
      'Sigo recomendando papel para pensar mejor ciertos temas. Un cuaderno A5 punteado encaja muy bien para planificación semanal, mapas mentales y notas de lectura. Esta selección prioriza papel agradable, tapa resistente y apertura cómoda.',
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
