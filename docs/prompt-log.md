# Órdenes clave dadas a la IA

Registro de las peticiones que dirigieron el desarrollo. No es un chat: es el
criterio de decisión. Lo que la IA propuso y yo filtré también está aquí.
Fechas por completar: [__/__].

## [__/__] — Tema claro/oscuro solo con icono
Pedí: que el cambio de tema fuera solo un icono (luna/sol), no un botón grande.
Hizo: toggle con tooltip CSS.
Nota: aceptado. Menos ruido, misma función.

## [__/__] — Intro estilo terminal Ubuntu con la paleta de la web
Pedí: que la intro no fuera genérica, sino un escritorio Ubuntu con los colores
del sitio (fondo #0a0f1c, destellos verde/ámbar) y un ./accede que salude.
Hizo: secuencia de ~2 s con botón saltar, ?nointro para desarrollo y respeto a
prefers-reduced-motion.
Nota: aceptado. Es la pieza que mejor une mi voz (terminal) con la identidad.

## [__/__] — Noticias reales bajo el test, no texto inventado
Pedí: noticias tech de verdad, sin clave API.
Hizo: Hacker News Algolia (últimos 7 días, points>10), queries "AI" y "programming"
intercaladas, 6 items, caché 5 min.
Nota: aceptado. Y le añadí la caché yo para no ensuciar la consola (ADR-3).

## [__/__] — Heatmap de GitHub en Proyectos
Propuso la IA: un heatmap tipo contribuciones.
Mi decisión: LO RETIRÉ. No sumaba a FCT y competía con la lista de repos.
Nota: ejemplo de filtro: si no refuerza identidad o FCT, fuera, aunque "mole".

## [__/__] — Trivia dentro del test de orientación
Propuso la IA: meter preguntas de Open Trivia DB en el test.
Mi decisión: LO NEGUÉ. El test es de orientación, no de cultura; mezclarlo lo
confundiría. Si algún día, como mini-juego suelto en Arcade, no dentro.
Nota: la IA no decide el producto; yo sí.

## [__/__] — Chatbot sin IA externa
Pedí: un chat de contacto que no dependa de clave API del centro.
Hizo: chatbot local por intenciones (incluye "noticias").
Nota: aceptado para la demo; pero sé que en "Contacto" no basta (issue #2).

## [__/__] — Neofetch en el footer
Pedí: algo que unificara uptime real + clima de Xàtiva, estilo neofetch.
Hizo: uptime de sesión + Open-Meteo (latitude=38.9924&longitude=-0.5204).
Nota: aceptado. Cierra el guiño hardware/redes de mi base SMR.

## [__/__] — Contacto funcional de verdad
Pedí: pasar el mailto: a un formulario que envíe de verdad.
Decisión: Web3Forms (access key pública, sin cuenta).
Nota: pendiente de integrar (issue #2). Documentado aquí para que el historial
no parezca que lo olvidé.
