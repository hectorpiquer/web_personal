# 🖥️ Portafolio Personal · Héctor Piquer

Bienvenido al código fuente de mi página web personal. Soy Héctor Piquer Belda, de Vallada, estudiante de 1º de Desarrollo de Aplicaciones Multiplataforma (DAM) en el IES Dr. Lluis Simarro (Xàtiva).

Este proyecto nace con la idea de mostrar mi perfil técnico (viniendo de un Grado Medio de SMR) sin usar plantillas genéricas, demostrando que sé construir desde cero.

🔗 **[Ver la web en vivo](https://hectorpiquer.github.io/web_personal/)**

---

## 🚀 Características principales

*   **100% Vanilla:** HTML, CSS y JavaScript puros, sin frameworks ni librerías externas (salvo las fuentes de Google).
*   **Diseño Terminal / Developer-First:** Interfaz inspirada en terminales, con 5 temas de color intercambiables (Terminal, Editor, Matrix, CRT y Synthwave).
*   **Bilingüe (ES/EN):** Sistema propio de internacionalización (i18n) con diccionarios en JavaScript.
*   **Asistente con IA Real:** Chatbot conectado a un modelo de lenguaje (LLM) a través de un proxy seguro.
*   **Componentes interactivos:** Test de orientación vocacional con gráfico de radar en Canvas, mini-juego arcade escrito a mano, y reproductor de música (iTunes API).
*   **Accesibilidad y rendimiento:** Navegación por teclado, textos alternativos, respeto por `prefers-reduced-motion` y diseño responsive.

---

## 🛠️ Stack Tecnológico

*   **Frontend:** HTML5 semántico, CSS3 (Variables, Flexbox, Grid), JavaScript (ES6+).
*   **APIs externas:** GitHub API, Hacker News API, Open-Meteo, iTunes Search API, OpenStreetMap.
*   **Backend (Edge Computing):** Cloudflare Workers (para el proxy del chatbot).
*   **IA:** Groq API (Modelo `openai/gpt-oss-120b`).

---

## 🧠 Decisiones de Arquitectura (ADR)

En este proyecto se han tomado dos decisiones técnicas clave que merecen ser explicadas:

### 1. Uso de Vanilla JS y CSS puro (sin frameworks)
*   **Contexto:** Existen frameworks como React o Vue que facilitan el desarrollo, pero para un portafolio personal monográfico (Single Page Application) añaden peso y dependencias innecesarias.
*   **Decisión:** Se ha optado por escribir todo el código en JavaScript y CSS puros.
*   **Consecuencias:** 
    *   **Positivas:** La web es extremadamente ligera, carga en milisegundos, no requiere de procesos de compilación (build) y demuestra un dominio profundo de los fundamentos de la web. Tiene una puntuación excelente en Lighthouse.
    *   **Negativas:** La gestión del estado y la manipulación del DOM se hace de forma manual, lo que requiere más líneas de código.

### 2. Chatbot con IA mediante Proxy en Cloudflare (Seguridad)
*   **Contexto:** El proyecto requería un asistente virtual inteligente. Usar una API Key de un modelo de IA (como OpenAI, Gemini o Groq) directamente en el frontend es un riesgo de seguridad crítico, ya que cualquier usuario podría inspeccionar la red, robar la clave y agotar la cuota gratuita.
*   **Decisión:** Se implementó un *Edge Proxy* utilizando **Cloudflare Workers**. 
*   **Cómo funciona:** 
    1. El navegador del usuario envía el mensaje del chat a mi Worker de Cloudflare.
    2. El Worker (que tiene la API Key guardada de forma segura en sus variables de entorno) hace la petición real a la API de Groq.
    3. El Worker devuelve la respuesta al navegador.
*   **Consecuencias:** La clave nunca viaja al navegador del usuario. Es una solución profesional, gratuita (capa gratuita de Cloudflare) y demuestra conocimientos de seguridad y arquitectura backend en un proyecto estático.

---

## 📂 Estructura del proyecto

```text
/
├── index.html              # Estructura principal y semántica
├── styles.css              # Estilos, variables de color y animaciones
├── script.js               # Lógica de la web, interactividad y llamadas a APIs
├── i18n.js                 # Diccionario de traducciones (Español / Inglés)
├── manifest.webmanifest    # Configuración PWA
├── .gitattributes          # Normalización de saltos de línea y binarios
├── README.md               # Este archivo
├── banner.png              # Imagen para redes sociales
├── cv-hector-piquer.pdf    # Currículum descargable
└── (iconos .png, etc.)
