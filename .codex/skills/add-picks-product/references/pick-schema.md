# Pick Schema (Proyecto)

Referencia rápida para añadir productos a la lista de picks de este proyecto.

## Archivos relevantes

- Datos: `src/data/picks.ts`
- Imágenes locales: `public/images/picks/`
- Ruta pública de imágenes: `/images/picks/<archivo>`

## Tipo `PickProduct`

Campos esperados (según `src/data/picks.ts`):

- `slug: string`
- `title: string`
- `brand: string`
- `category: 'workspace' | 'movilidad' | 'lifestyle'`
- `priceLabel: string`
- `affiliateUrl: string`
- `image: string`
- `shortDescription: string`
- `description: string`
- `featured?: boolean`
- `isNew?: boolean`

## Categorías válidas

- `workspace` -> Espacio de trabajo
- `movilidad` -> Movilidad
- `lifestyle` -> Vida diaria

## Orden de propiedades (seguir este patrón)

```ts
{
  slug: '<slug>',
  title: '<título>',
  brand: '<marca o etiqueta>',
  category: '<workspace|movilidad|lifestyle>',
  priceLabel: '<precio visible>',
  affiliateUrl: '<enlace afiliado>',
  image: '/images/picks/<archivo>',
  shortDescription: '<frase breve>',
  description:
    '<descripción algo más larga>',
  // featured: true,      // opcional
  // isNew: true,         // opcional
},
```

## Criterios de texto

- `shortDescription`: una frase concreta (beneficio principal).
- `description`: una o dos frases con contexto de uso y motivo de recomendación.
- Mantener tono claro y práctico en español.

