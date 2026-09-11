# SEO de Che Botta — investigación y trabajo realizado

Fecha: 2026-09-11. Mercado objetivo: Perú (búsquedas en español, sin distribución fuera del país).

## 1. Investigación de palabras clave

Basada en búsquedas reales del mercado peruano (no solo intuición): se revisaron marcas competidoras que ya venden chimichurri artesanal en Perú (Ayni en Tottus/Real Plaza, El Charrua, La Pauleña, ChePocho, Parrillas Premium Perú, Ingredienta, Salud2Go) y el uso real del término "chimichurri" en medios peruanos (El Comercio, Infobae Perú, Buenazo), donde aparece asociado sobre todo a **pollo a la brasa** y **anticuchos**, no solo a la parrilla estilo argentino. También se confirmó que **"carretillero"** es un estilo real y reconocido de la cultura de parrilla/anticuchería peruana (aparece como nombre de plato en anticucherías junto al chimichurri), lo que hace que el nombre del producto Carretillero sea una palabra clave de marca con relevancia cultural genuina, no solo un nombre bonito.

### Palabras clave primarias (cabeza)
| Palabra clave | Intención | Dónde se usa en la web |
|---|---|---|
| chimichurri artesanal | Informacional/transaccional | Título, meta description, H1 relacionado, alt de imágenes |
| chimichurri artesanal Perú | Transaccional | Título, meta description, Organization schema |
| salsa chimichurri artesanal | Transaccional | Descripciones de producto |
| comprar chimichurri | Transaccional | FAQ ("¿Cómo hago un pedido?") |
| chimichurri para parrilla / asado | Informacional | Copy de historia y ritual |

### Palabras clave secundarias
- chimichurri gourmet Perú
- chimichurri delivery Lima
- mejor chimichurri Perú
- chimichurri picante peruano
- regalo gourmet para parrillero

### Long-tail (la mejor oportunidad: baja competencia, alta intención)
- donde comprar chimichurri artesanal en Lima
- chimichurri para pollo a la brasa
- chimichurri para anticuchos
- chimichurri estilo carretillero (prácticamente sin competencia, término propio)
- mejor chimichurri para parrillada
- chimichurri con receta secreta argentina
- chimichurri artesanal hecho a mano en Perú
- chimichurri tradicional argentino en Perú (ángulo de origen auténtico, diferenciador real frente a marcas que dicen "receta adaptada")

### De marca
- Che Botta chimichurri
- Chimichurri Che Botta Tradicional / Premium / Carretillero
- Che Botta Perú

### Diferenciador frente a la competencia
Ayni (la marca más visible en retail) se presenta como "receta argentina **adaptada** al paladar peruano". Che Botta tiene una historia más fuerte y 100% verídica: un abuelo argentino real, nacido en Rosario, que vivió su vida en el Perú. Esa autenticidad familiar es el mejor gancho de contenido y ya está bien explotada en el copy emocional del sitio; el trabajo de SEO fue exponerla también en metadatos y datos estructurados para que buscadores e IA la entiendan como entidad, no solo los lectores humanos.

## 2. Qué se implementó en el código

- **Título y meta description** reescritos con palabra clave + ubicación + marca, dentro del largo recomendado.
- **`<html lang="es-PE">`** en vez de `es` genérico, para relevancia geográfica.
- **`<meta name="robots">`** con `max-image-preview:large` (mejora cómo se ve la miniatura en resultados de Google).
- **Open Graph y Twitter Card** completos (título, descripción, imagen con ancho/alto/alt) para que los links compartidos en WhatsApp, Facebook e Instagram se vean bien.
- **Datos estructurados (JSON-LD)** en un solo bloque `@graph`:
  - `Organization` con `ContactPoint`, área de servicio (Perú) y los tres fundadores.
  - `Product` para Tradicional, Premium y Carretillero (nombre, descripción, imagen, marca, categoría). **No se agregó `Offer`/precio** porque no hay un precio fijo publicado; agregarlo sin datos reales generaría errores en Search Console. Cuando haya precio de lista, se puede sumar en cinco minutos y habilita que el precio aparezca directamente en Google.
  - `FAQPage` con las mismas seis preguntas que están visibles en la web (Google exige que el contenido del schema sea visible en la página, y se verificó automáticamente que coincide letra por letra).
- **Sección de Preguntas Frecuentes** nueva, visible, en acordeón nativo (`<details>/<summary>`, sin JavaScript adicional), después de los testimonios y antes de contacto. Responde exactamente las dudas de compra más probables (diferencia entre productos, pollo a la brasa/anticuchos, delivery, cuándo sale el Premium) sin inventar datos que no tenemos confirmados (no se afirma nada sobre conservantes, refrigeración o zonas de envío específicas).
- **Textos alternativos (alt)** de las tres fotos de producto ampliados con lenguaje natural y palabras clave reales, sin relleno forzado.
- **`robots.txt`** y **`sitemap.xml`** en la raíz del sitio, con el sitemap incluyendo las imágenes principales para aparecer también en Google Imágenes.
- Se verificó la jerarquía de encabezados: un solo `<h1>`, `<h2>` por sección, `<h3>` por subsección, sin saltos — ya estaba bien y se mantuvo.

## 3. Pendiente / recomendaciones (fuera del código, decisión de negocio)

1. **El sitemap y el `robots.txt` apuntan a `chebotta.com`.** Mientras el sitio viva solo en `lsbcreativa.github.io/che-botta`, esa es la URL correcta a futuro pero Google no la indexará como prioritaria hasta que el dominio final esté activo con esa misma web. El SEO "enciende" de verdad cuando el sitio esté en `chebotta.com`.
2. **Cuando el dominio esté activo:** dar de alta la propiedad en Google Search Console y en Bing Webmaster Tools, y enviar `https://chebotta.com/sitemap.xml` manualmente para acelerar la indexación.
3. **Redes sociales:** si Che Botta tiene o va a tener Instagram, Facebook o TikTok, pasarme los enlaces para agregarlos como `sameAs` en el `Organization` schema. Esto ayuda a que Google entienda que todos esos perfiles son la misma marca (mejora la aparición de un panel de conocimiento).
4. **Registro sanitario (DIGESA):** varias marcas competidoras en Perú (Parrillas Premium Perú, por ejemplo) destacan su registro sanitario como señal de confianza. Si Che Botta lo tramita, es un dato de peso para agregar tanto en el copy como en confianza de marca ante Google (señales E-E-A-T para contenido de alimentos).
5. **Precio de lista:** en cuanto exista un precio fijo por frasco, avisame para agregar `Offer` al schema de cada producto — eso habilita que el precio aparezca directamente en los resultados de búsqueda de Google.
6. **Contenido futuro (palanca de crecimiento más grande):** el sitio es de una sola página por diseño, lo cual limita cuántas búsquedas distintas puede capturar. El mayor salto de tráfico orgánico a futuro sería un blog simple con 5-10 artículos apuntando a long-tails reales ya identificados: "cómo usar chimichurri en pollo a la brasa", "chimichurri para anticuchos, receta y maridaje", "diferencia entre chimichurri argentino y peruano", etc. No es necesario ahora, pero es la recomendación de más impacto a mediano plazo.
