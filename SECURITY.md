# Seguridad de Che Botta

Fecha: 2026-09-11. Este documento explica, en criollo, qué riesgos tiene realmente este sitio y qué se hizo para cerrarlos.

## El punto de partida: esta web ya es difícil de hackear por diseño

Che Botta es un sitio **estático**: solo HTML, CSS y JavaScript que corre en el navegador de quien visita la página. No hay servidor propio ejecutando código, no hay base de datos, no hay formularios que reciban datos, no hay panel de administración, no hay login. Eso elimina de raíz la gran mayoría de las formas típicas de "hackear" una web:

- **No hay inyección SQL posible** porque no hay base de datos.
- **No hay inyección de código en formularios** porque no hay un solo `<form>` en todo el sitio (el contacto es por WhatsApp y correo, enlaces normales).
- **No hay forma de "subir" nada malicioso** porque nadie puede escribir en el servidor desde la web pública.
- Revisé todo el JavaScript (`js/main.js`) y **no usa `innerHTML`, `eval`, ni lee la URL** para meterla en la página, que son las formas más comunes en que un sitio termina ejecutando código de un atacante.

Dicho esto, igual reforcé lo que sí es real y vale la pena cerrar.

## Qué se implementó

### 1. Content-Security-Policy (CSP)
Es una lista de "quién tiene permiso" para cargar qué cosas en la página: solo el propio sitio para scripts, solo Google Fonts para tipografías, nada de scripts externos de ningún otro lugar. Si en el futuro alguien lograra inyectar un `<script>` en la página (por ejemplo comprometiendo una cuenta de hosting), el navegador **igual se negaría a ejecutarlo**, porque no viene del propio dominio. Está puesta como `<meta>` en el `<head>` de `index.html`, lo que significa que funciona en cualquier hosting, incluido GitHub Pages, sin configuración de servidor.

Se probó cargando el sitio en Chrome con la consola abierta: **cero violaciones, cero errores**. Todo lo que la página realmente usa (fuentes de Google, el propio CSS/JS, las imágenes) está permitido; todo lo demás, bloqueado por defecto.

### 2. Cabeceras de seguridad HTTP (`.htaccess`, para cuando esté en Hostinger)
Algunas protecciones **no se pueden activar desde una etiqueta `<meta>`**, solo desde una cabecera HTTP real que envía el servidor. Como GitHub Pages no permite configurar cabeceras propias, estas quedan listas en `.htaccess` para el día que el sitio se mude a Hostinger (que sí usa Apache y sí lo lee):

- **`X-Frame-Options: DENY`** — evita que alguien ponga tu web dentro de un `<iframe>` en otro sitio para engañar a la gente a hacer clic en algo sin saberlo (clickjacking).
- **`X-Content-Type-Options: nosniff`** — evita que el navegador "adivine" el tipo de un archivo de forma insegura.
- **`Referrer-Policy`** — controla cuánta información de la página de origen se envía cuando alguien hace clic en un enlace hacia afuera.
- **`Permissions-Policy`** — apaga explícitamente cámara, micrófono, ubicación, pagos, etc., que este sitio no usa ni debería poder pedir nunca.
- **`Strict-Transport-Security` (HSTS)** — le dice al navegador "entra siempre por HTTPS a este dominio, nunca por HTTP sin cifrar". **Ojo:** una vez activada durante un tiempo, es difícil de revertir del todo (queda guardada en el navegador de cada visitante). Actívala solo cuando el HTTPS de `chebotta.com` esté funcionando de forma estable.
- **Bloqueo de listado de carpetas** (`Options -Indexes`) y **bloqueo de archivos ocultos** (`.env`, `.git*`, etc.) por si alguna vez quedan expuestos por error.

En GitHub Pages estas cabeceras HTTP no se pueden activar (no hay forma de configurarlas): ese es un límite real de la plataforma, no algo que se pueda arreglar con código. Se resuelven solas al migrar a Hostinger.

### 3. El riesgo más real y más simple de todos: subir la carpeta `.git`
Esto no es teórico: es el error de seguridad más común en sitios chicos subidos "a mano". Si alguna vez arrastras **toda la carpeta del proyecto** (en vez de solo `index.html`, `css/`, `js/`, `assets/`, etc.) al Administrador de Archivos de Hostinger, subirías también la carpeta oculta `.git`, que contiene **todo el historial de cambios del proyecto**. Cualquiera que sepa buscarla podría descargar ese historial completo. El `.htaccess` ya bloquea el acceso a `.git` como defensa extra, pero la regla de oro es: **nunca subas la carpeta `.git` a un hosting público.** El README ya lo deja explícito en los pasos de publicación.

### 4. Enlaces externos reforzados
Los 9 enlaces que abren en pestaña nueva (WhatsApp, correo, créditos) ahora llevan `rel="noopener noreferrer"` en vez de solo `noopener`: evita que la pestaña nueva pueda manipular la original y no filtra la URL de origen al sitio de destino.

### 5. `_headers` para Netlify/Cloudflare Pages
El README menciona esas plataformas como alternativa de hosting. Se agregó un archivo `_headers` con las mismas cabeceras del `.htaccess`, en el formato que esas plataformas entienden, por si algún día se usa esa vía en lugar de Hostinger.

## Qué queda fuera del código (decisiones o pasos manuales)

1. **Activar HSTS** en `.htaccess` recién cuando el HTTPS de `chebotta.com` lleve un tiempo funcionando bien (ya está escrito, solo hay que confirmarlo).
2. **Nunca subir la carpeta `.git`** al hosting. Ya está en el README, pero vale repetirlo.
3. **Protección contra ataques de denegación de servicio (DDoS) o fuerza bruta**: eso es responsabilidad de la infraestructura, no del código. Si en algún momento el sitio recibe mucho tráfico o quieren una capa extra gratis, poner **Cloudflare** (plan gratuito) delante de `chebotta.com` es la recomendación estándar: da protección básica contra DDoS y deja aplicar las mismas cabeceras de seguridad incluso más fácil, sin tocar Hostinger.
4. **Cuenta de GitHub y de Hostinger**: la seguridad del código no cubre contraseñas débiles ni la falta de verificación en dos pasos en esas cuentas. Vale la pena activar 2FA en GitHub (`lsbcreativa`) y en Hostinger si no está activo, porque quien tenga acceso a esas cuentas puede modificar la web igual, sin necesidad de "hackear" nada del sitio.
