import { collection, config, fields } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    blog: collection({
      label: 'Blog',
      slugField: 'title',
      path: 'src/content/blog/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({
          name: { label: 'URL' },
          label: 'Título',
        }),
        description: fields.text({
          label: 'Extracto',
          description: 'Se muestra en el listado y en los resultados de búsqueda.',
          multiline: true,
          validation: { isRequired: true },
        }),
        coverImage: fields.image({
          label: 'Imagen de portada',
          description: 'Imagen principal del artículo. Se guarda en el repositorio.',
          directory: 'public/images/blog/covers',
          publicPath: '/images/blog/covers/',
        }),
        coverAlt: fields.text({
          label: 'Texto alternativo de la portada',
          description: 'Describe brevemente la imagen para lectores de pantalla.',
        }),
        publishedAt: fields.date({
          label: 'Fecha de publicación',
          validation: { isRequired: true },
        }),
        tags: fields.array(fields.text({ label: 'Etiqueta' }), {
          label: 'Etiquetas',
          itemLabel: (props) => props.value,
        }),
        draft: fields.checkbox({
          label: 'Borrador',
          description: 'Los borradores no se muestran en el blog público.',
          defaultValue: true,
        }),
        content: fields.markdoc({
          label: 'Artículo',
          description: 'Escribe y da formato al contenido del artículo.',
          options: {
            image: {
              directory: 'public/images/blog/content',
              publicPath: '/images/blog/content/',
              schema: {
                alt: fields.text({
                  label: 'Texto alternativo',
                  description: 'Describe la imagen para lectores de pantalla.',
                  validation: { isRequired: true },
                }),
                title: fields.text({
                  label: 'Título',
                  description: 'Texto opcional que aparece al pasar el cursor.',
                }),
              },
            },
          },
        }),
      },
    }),
  },
});
