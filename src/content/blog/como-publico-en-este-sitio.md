---
title: "Cómo publico en este sitio"
description: "Flujo real para crear un artículo con Markdown y content collections de Astro."
pubDate: 2026-07-10
section: Método
---

Este blog no usa un CMS. Cada nota es un archivo Markdown en `src/content/blog/`.

## 1. Crear el archivo

```text
src/content/blog/mi-nueva-nota.md
```

Al inicio va el frontmatter: título, descripción, fecha y sección. El cuerpo se escribe en Markdown normal.

## 2. Escribir con calma

Uso encabezados cortos, listas cuando aportan y bloques de código solo cuando enseñan algo concreto. Evito relleno: si una frase no sostiene la idea, la corto.

## 3. Publicar

```bash
npm run build
```

Astro valida la colección, genera la ruta `/blog/mi-nueva-nota` y deja el HTML listo. En local reviso con `npm run dev`.

## Por qué así

- El texto vive en el repo, versionado.
- El diseño no decide el contenido: la tipografía solo lo presenta.
- Puedo editar offline, sin paneles ni formularios.

Si quieres una nota nueva, copia este archivo, cambia el frontmatter y escribe. Eso es todo.
