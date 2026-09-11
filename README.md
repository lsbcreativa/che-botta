# Che Botta · La herencia de un buen asado

Sitio web estático de **Che Botta**, el chimichurri artesanal con la receta de Don Carlos Botta.
Hecho a medida en HTML, CSS y JavaScript puro: sin WordPress, sin dependencias, sin build.

## Estructura

```
index.html          Página única (hero, historia, chimichurris, familia, Don Carlos, ritual, testimonios, FAQ, contacto)
css/styles.css      Estilos (paleta, tipografía, layout, responsive)
js/main.js          Interacciones (header, menú móvil, reveal, parallax, enlaces de WhatsApp)
assets/logo/        Logo verde, logo blanco, retrato de Don Carlos, favicon
assets/fotos/       Fotos reales: Papapa brindando, con sus nietos y con Joaquín
assets/productos/   Los 3 frascos: tradicional, premium, carretillero
assets/ambiente/    Imágenes de parrilla para fondos
robots.txt          Reglas para buscadores + enlace al sitemap
sitemap.xml         Mapa del sitio para Google (incluye imágenes)
.htaccess           Cabeceras de seguridad y HTTPS para cuando esté en Hostinger (Apache)
_headers            Las mismas cabeceras, en formato Netlify/Cloudflare Pages
SEO.md              Investigación de palabras clave y trabajo de SEO realizado
SECURITY.md         Qué riesgos tiene el sitio y qué se hizo para cerrarlos
```

## Ver en local

Abre `index.html` en el navegador, o sirve la carpeta:

```
npx serve .
```

## Publicar en chebotta.com (Hostinger)

1. Entra al hPanel de Hostinger → Administrador de archivos → `public_html`.
2. Haz una copia de seguridad de WordPress si quieres conservarlo (o bórralo).
3. Sube `index.html`, `css/`, `js/`, `assets/`, `robots.txt`, `sitemap.xml` y `.htaccess` a `public_html`.
   **Nunca subas la carpeta `.git`** (ni la carpeta completa del proyecto arrastrada de una vez): expondría todo el historial del repositorio. Sube solo esos archivos y carpetas puntuales.
4. Listo. Al ser estático no necesita PHP ni base de datos.

Alternativa: arrastrar la carpeta a Netlify Drop o conectar el repo a Vercel/Cloudflare Pages y apuntar el dominio.

## Datos de contacto usados

- WhatsApp: +51 995 951 778 (con mensaje prellenado por producto)
- Email: contacto.chebotta@gmail.com

Para cambiar el número, edita `WA_NUMBER` en `js/main.js` y los enlaces `wa.me` en `index.html`.

## SEO

Ver [SEO.md](SEO.md) para la investigación de palabras clave y el detalle de todo lo implementado (metadatos, datos estructurados, FAQ, sitemap, robots.txt). El sitemap y las URLs canónicas apuntan a `chebotta.com`: el SEO solo empieza a rendir en Google una vez que el sitio esté publicado en ese dominio, no mientras viva solo en GitHub Pages.

## Seguridad

Ver [SECURITY.md](SECURITY.md) para el detalle completo. En resumen: al ser un sitio estático sin formularios ni base de datos, el margen real para "hackearlo" es muy chico. Igual se agregó una política de seguridad de contenido (CSP) que funciona en cualquier hosting, y un `.htaccess` con cabeceras de seguridad adicionales para cuando el sitio esté en Hostinger.
