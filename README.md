# Che Botta · La herencia de un buen asado

Sitio web estático de **Che Botta**, el chimichurri artesanal con la receta de Don Carlos Botta.
Hecho a medida en HTML, CSS y JavaScript puro: sin WordPress, sin dependencias, sin build.

## Estructura

```
index.html          Página única (hero, historia, Don Carlos, chimichurris, ritual, testimonios, contacto)
css/styles.css      Estilos (paleta, tipografía, layout, responsive)
js/main.js          Interacciones (header, menú móvil, reveal, parallax, enlaces de WhatsApp)
assets/logo/        Logo verde, logo blanco, retrato de Don Carlos, favicon
assets/fotos/       Fotos reales: Don Carlos brindando, risas y retrato con sus nietos
assets/productos/   Los 4 frascos: clásico, premium, picante, extremo
assets/ambiente/    Imágenes de parrilla para fondos
```

## Ver en local

Abrí `index.html` en el navegador, o serví la carpeta:

```
npx serve .
```

## Publicar en chebotta.com (Hostinger)

1. Entrá al hPanel de Hostinger → Administrador de archivos → `public_html`.
2. Hacé una copia de seguridad de WordPress si querés conservarlo (o borralo).
3. Subí `index.html`, `css/`, `js/` y `assets/` a `public_html`.
4. Listo. Al ser estático no necesita PHP ni base de datos.

Alternativa: arrastrar la carpeta a Netlify Drop o conectar el repo a Vercel/Cloudflare Pages y apuntar el dominio.

## Datos de contacto usados

- WhatsApp: +51 995 951 778 (con mensaje prellenado por producto)
- Email: contacto.chebotta@gmail.com

Para cambiar el número, editá `WA_NUMBER` en `js/main.js` y los enlaces `wa.me` en `index.html`.
