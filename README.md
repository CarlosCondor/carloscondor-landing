# Astro Starter Kit: Minimal

```sh
npm create astro@latest -- --template minimal
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

## Blog y Keystatic

Los artículos se guardan en `src/content/blog/` y se renderizan en `/blog`.
No es necesario editar esos archivos manualmente: durante el desarrollo, ejecuta `npm run dev` y abre `http://127.0.0.1:4321/keystatic` para crear, editar, publicar o borrar entradas desde la interfaz.
Las portadas se guardan en `public/images/blog/covers/` y las imágenes insertadas en el artículo en `public/images/blog/content/`. Ambos tipos de archivo se versionan en Git y se copian al build de producción.

El proyecto sigue generando un sitio estático para producción. Para ofrecer el panel en el sitio publicado será necesario elegir y configurar un adaptador de Astro y la autenticación de Keystatic/GitHub para el proveedor de despliegue elegido.
