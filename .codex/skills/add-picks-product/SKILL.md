---
name: add-picks-product
description: Use when the user wants to add a new product to this project's picks list (`src/data/picks.ts`) from minimal input (usually an Amazon link plus optional notes), including extracting product info, generating slug/description, downloading a local image, and inserting a standardized `PickProduct` entry.
---

# Add Picks Product

Usa esta skill cuando el usuario quiera añadir un producto nuevo a la lista de picks del proyecto con información mínima:

- Un enlace (normalmente Amazon / `amzn.to`)
- Una nota breve opcional (por ejemplo, por qué lo recomienda)
- Opcionalmente una categoría o preferencia de título

## Resultado esperado

Añadir una entrada nueva en `src/data/picks.ts` dentro de `picks` con el formato `PickProduct`, incluyendo:

- `slug`
- `title`
- `brand`
- `category`
- `priceLabel`
- `affiliateUrl`
- `image` (ruta pública a imagen local)
- `shortDescription`
- `description`

Y guardar la imagen en `public/images/picks/`.

## Regla crítica (obligatoria)

Antes de hacer cualquier cambio en archivos, la skill debe:

1. Preparar una **propuesta completa** con **todos los campos** del producto.
2. Mostrarla al usuario para validación.
3. Pedir confirmación explícita.
4. Solo entonces editar `src/data/picks.ts` y guardar la imagen.

Si falta algún campo o hay dudas, **no edites archivos**: pregunta primero.

## Flujo de trabajo

1. **Leer el esquema actual**
   - Revisa `src/data/picks.ts` antes de editar.
   - Usa `references/pick-schema.md` como recordatorio del formato.

2. **Extraer información del producto desde el enlace**
   - Si es un `amzn.to`, resuelve el redirect y conserva el enlace original del usuario para `affiliateUrl` (salvo que el usuario pida lo contrario).
   - Intenta obtener: título, marca, precio y URL de imagen.
   - Si Amazon bloquea scraping con `curl`, usa la skill `$playwright` (si está disponible) para abrir la página y extraer los datos.

3. **Construir los campos del pick**
   - Genera `slug` en `kebab-case`, ASCII, único en `picks.ts`.
   - `title`: nombre legible del producto (sin ruido promocional).
   - `brand`: marca/fabricante cuando sea clara; si no, una etiqueta breve coherente con el estilo del proyecto.
   - `category`: una de `workspace`, `movilidad`, `lifestyle`.
   - `priceLabel`: formato de etiqueta visible (ej. `39 €`, `129 €`).
   - `shortDescription`: 1 frase breve, concreta.
   - `description`: 1-2 frases ampliadas, en español, con utilidad real.

4. **Preparar propuesta completa y validar con el usuario (obligatorio)**
   - Presenta una ficha previa con todos los campos del `PickProduct` que se van a insertar:
     - `slug`
     - `title`
     - `brand`
     - `category`
     - `priceLabel`
     - `affiliateUrl`
     - `image` (ruta prevista y nombre de archivo local)
     - `shortDescription`
     - `description`
     - `featured` / `isNew` (indicar si se omiten)
   - Pide confirmación explícita del usuario antes de modificar archivos.
   - Si el usuario corrige uno o varios campos, actualiza la propuesta y vuelve a confirmar.

5. **Descargar la imagen y guardarla localmente**
   - Guarda la imagen en `public/images/picks/<slug>.<ext>`.
   - Usa una extensión real (`jpg`, `png`, `webp`, etc.) según el archivo descargado.
   - Define `image` como ruta pública: `/images/picks/<slug>.<ext>`.
   - Si no se puede descargar automáticamente, pide al usuario una imagen alternativa o deja el trabajo bloqueado con causa clara (no inventes ruta).

6. **Insertar la entrada en `src/data/picks.ts`**
   - Añade un nuevo objeto dentro del array `picks`.
   - Mantén el estilo de formato actual del archivo (comas, saltos, orden de campos).
   - No modifiques picks existentes salvo que el usuario lo pida.

7. **Validar**
   - Ejecuta `npm run build` para detectar errores de sintaxis o tipado del contenido.
   - Si falla, corrige y vuelve a validar.

## Reglas y defaults

- No inventes precio si no puedes verlo con confianza. Si falta, pregúntalo o explica el bloqueo.
- Usa español para `shortDescription` y `description`.
- No actives `featured` ni `isNew` por defecto, salvo petición explícita.
- Si la categoría es ambigua, pregunta antes de editar. Si propones una por defecto, márcala explícitamente como propuesta y espera confirmación.
- Si hay múltiples opciones razonables para `title`, `brand`, `priceLabel`, `slug` o imagen, pregunta al usuario antes de editar.
- Verifica que la propuesta incluya **todos los campos obligatorios** del esquema actual antes de pedir confirmación.
- Respeta cambios locales del usuario en `src/data/picks.ts`; inserta solo el nuevo objeto.

## Plantilla de validación con el usuario (usar antes de editar)

Presenta una validación compacta como esta:

```md
Propuesta de nuevo pick (pendiente de confirmación):

- slug: `...`
- title: `...`
- brand: `...`
- category: `workspace|movilidad|lifestyle`
- priceLabel: `...`
- affiliateUrl: `...`
- image (local): `/images/picks/...`
- shortDescription: `...`
- description: `...`
- featured: omitido|true
- isNew: omitido|true

¿Confirmas que lo añada así? Si quieres, corrige cualquier campo antes de aplicar cambios.
```

## Comandos útiles (ejemplos)

```bash
# Resolver un enlace corto de Amazon
curl -Ls -o /dev/null -w '%{url_effective}\n' "https://amzn.to/xxxx"

# Descargar imagen
curl -L "https://example.com/image.jpg" -o "public/images/picks/<slug>.jpg"
```

## Qué reportar al usuario al terminar

- Slug creado
- Categoría elegida
- Precio añadido
- Ruta de imagen local guardada
- Confirmación de validación (`npm run build`)
