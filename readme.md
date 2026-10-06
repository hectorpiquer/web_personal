# Web personal — Héctor Piquer Belda

Portafolio de búsqueda de FCT. Ciclo DAM (1º), IES Simarro (Xàtiva). Base SMR.

## Stack
HTML + CSS + JS vanilla, sin frameworks ni build. PWA instalable.
Se sirve como ficheros estáticos desde GitHub (rama main).

## Estructura
index.html            página única + vistas por hash
styles.css            sistema de tokens + dos temas
script.js             lógica (arcade, test, chat, reproductor, noticias, clima)
manifest.webmanifest  metadatos PWA
banner.png            og-image (1200x630)
docs/prompt-log.md    órdenes clave dadas a la IA (proceso)

## Decisiones de arquitectura

### ADR-1 · Fondo de nodos en canvas, no imagen
Contexto: quería un fondo vivo que hablara de redes (mi base SMR). Una imagen
pesa y no reacciona.
Decisión: canvas #bgfx con grafo de nodos animado. Pausa cuando la pestaña está
oculta y se queda estático con prefers-reduced-motion.
Consecuencia: 0 dependencias, peso ~0, y el fondo comunica "redes" sin ser
decorativo. Coste: ~60 líneas de JS.

### ADR-2 · Mono-página con vistas por hash, no multi-página
Contexto: la rúbrica pide coherencia en 4+ páginas.
Decisión: una sola página con secciones conmutadas por location.hash (#/, #/sobre,
#/proyectos). Cada vista es una section con su aria-labelledby y meta/OG dinámico.
Consecuencia: transiciones suaves y estado compartido (tema, reproductor) sin
recargar. "Páginas" = "vistas": lo defiendo aquí para que no se lea como atajo.
Una SPA de una sola persona es la forma honesta de este proyecto; no hay back-end
que justifique ficheros separados.

### ADR-3 · Caché de 5 min para las noticias
Contexto: la sección de noticias llama a Hacker News (Algolia). Sin caché, cada
cambio de vista dispara peticiones y ensucia la consola.
Decisión: guardo el resultado en localStorage con marca de tiempo; si tiene <5
min, sirvo caché. Botón de refresco para forzar.
Consecuencia: menos llamadas, consola limpia, usuario con control.

### ADR-4 · Formulario vía Web3Forms, no mailto
Contexto: el contacto era mailto:, válido pero nivel bajo (no puedo explicar el
recorrido del dato).
Decisión: fetch POST al endpoint de Web3Forms con access key pública. El dato
viaja: form -> fetch -> Web3Forms -> relay -> mi bandeja.
Consecuencia: formulario real con validación y éxito. La key es pública a
propósito (Web3Forms así lo diseña); no es un secreto.

## Accesibilidad
Semántica (section aria-labelledby, dialog, address, fieldset/legend), skip-link,
aria-live en avisos, aria-pressed/aria-expanded en toggles, prefers-reduced-motion
respetado en CSS y en JS. Pendiente documentado: focus trap en diálogos (issue #3).

## Rendimiento
Sin frameworks. Imagen única (banner). Canvas con pausa en pestaña oculta.
Lighthouse objetivo >=90.

## Pendientes conocidos (límites reales, no humo)
- Botón CV apunta a cv-hector-piquer.pdf aún no publicado (issue #1).
- Focus trap en diálogos pendiente (issue #3).
- Contacto migrando de mailto a Web3Forms (issue #2).
