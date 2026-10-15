/* ==========================================================================
   HÉCTOR PIQUER · i18n.js  (diccionario + datos reales)
   Convención: los textos de UI son [español, inglés].
   Las colecciones (frases, gustos, test, chatbot, skills) llevan su propia forma.
   Todo el contenido de aquí es REAL (datos aportados por Héctor).
   ========================================================================== */
window.HP_I18N = {

  /* ---------- a11y / genérico ---------- */
  "a11y.skip": ["Saltar al contenido", "Skip to content"],
  "intro.skip": ["saltar intro ⏭", "skip intro ⏭"],

  /* ---------- header ---------- */
  "hdr.menu": ["menú", "menu"],
  "hdr.cmd": ["Comandos (Ctrl/⌘ K)", "Commands (Ctrl/⌘ K)"],
  "hdr.theme": ["Cambiar tema", "Change theme"],
  "hdr.lang": ["Cambiar idioma", "Change language"],
  "nav.inicio": ["inicio", "home"], "nav.sobre": ["sobre", "about"],
  "nav.formacion": ["formación", "studies"], "nav.servicios": ["servicios", "services"],
  "nav.proyectos": ["proyectos", "projects"], "nav.gusta": ["me gusta", "likes"],
  "nav.arcade": ["arcade", "arcade"], "nav.contacto": ["contacto", "contact"],
  "nav.prev": ["← anterior", "← previous"], "nav.next": ["siguiente →", "next →"],

  /* ---------- hero ---------- */
  "hero.badge": ["escuchando ofertas · ciclo DAM hasta jun 2028", "open to opportunities · cycle ends Jun 2028"],
  "hero.tag": ["Vengo del hardware. <em>Me voy al código.</em>", "I come from hardware. <em>I'm going to code.</em>"],
  "hero.desc": ["Soy de Vallada y estudio 1º de DAM en el IES Doctor Lluís Simarro (Xàtiva). Antes montaba y reparaba PCs en SMR; ahora quiero construir software. Escucho ofertas donde aprender de verdad y aportar desde el primer día.", "I'm from Vallada and study year 1 of DAM at IES Doctor Lluís Simarro (Xàtiva). I used to build and repair PCs in SMR; now I want to build software. I'm open to opportunities where I can genuinely learn and contribute from day one."],
  "hero.cta1": ["conóceme", "meet me"], "hero.cta2": ["proyectos", "projects"], "hero.cta3": ["escríbeme", "write me"],
  "hero.panelhint": ["autor: yo", "built by me"],

  /* ---------- CTA test ---------- */
  "quiz.ctaTitle": ["Encuentra tu informática perfecta", "Find your perfect kind of IT"],
  "quiz.ctaText": ["Responde estas tres y te digo si esto va contigo. Si te pica, el test completo te da tu radar, tu ruta y por dónde empezar hoy.", "Answer these three and I'll tell you if this is your thing. If it hooks you, the full test gives you your radar, your roadmap and where to start today."],
  "quiz.ctaBtn": ["empezar test completo ▶", "start full test ▶"],
  "quiz.teaserResult": ["Tu perfil orientativo es:", "Your rough profile is:"],
  "quiz.teaserMore": ["ver test completo ▶", "view full test ▶"],
  "quiz.savePdf": ["guardar PDF", "save PDF"],
  "quiz.viewLast": ["ver mi último resultado", "view my last result"],
  "quiz.newOne": ["hacer uno nuevo", "start a new one"],
  "quiz.pdfTitle": ["Test de orientación · hpb", "Orientation test · hpb"],
  "quiz.pdfNote": ["Resultado orientativo, no un veredicto. Es una pista, no una sentencia.", "Rough guidance, not a verdict. A hint, not a sentence."],

  /* ---------- noticias ---------- */
  "news.title": ["Últimas noticias · IA & programación", "Latest news · AI & programming"],
  "news.sub": ["// vía API pública de Hacker News · en tiempo real", "// via the public Hacker News API · live"],
  "news.f.all": ["todo", "all"], "news.f.ai": ["IA", "AI"], "news.f.dev": ["dev", "dev"], "news.f.sec": ["seguridad", "security"],
  "news.reload": ["↻ actualizar", "↻ refresh"], "news.loading": ["cargando noticias…", "loading news…"],
  "news.error": ["No pude cargar noticias ahora. Pulsa actualizar.", "Couldn't load news right now. Hit refresh."],
  "news.empty": ["Sin resultados para ese filtro.", "No results for that filter."],
  "news.pts": ["puntos", "points"], "news.comments": ["comentarios", "comments"],
  "news.more": ["ver más ↓", "load more ↓"], "news.cached": ["// último dato guardado", "// last saved data"],

  /* ---------- sobre ---------- */
  "sobre.h2": ["Sobre mí", "About me"],
  "sobre.lead": ["Empecé abriendo máquinas. Ahora abro código.", "I started opening machines. Now I open code."],
  "sobre.p1": ["Soy <strong>Héctor Piquer Belda</strong>, de Vallada, y estudio <strong>1º de DAM</strong> en el <strong>IES Doctor Lluís Simarro</strong> (Xàtiva). Vengo de un Grado Medio de <strong>SMR</strong> en el <strong>IES Sivera Font</strong>, donde aprendí a montar, mantener y diagnosticar equipos de verdad.", "I'm <strong>Héctor Piquer Belda</strong>, from Vallada, studying <strong>year 1 of DAM</strong> at <strong>IES Doctor Lluís Simarro</strong> (Xàtiva). I come from a mid-level degree in <strong>SMR</strong> at <strong>IES Sivera Font</strong>, where I learned to build, maintain and diagnose real hardware."],
  "sobre.p2": ["El hardware me gustaba, pero lo que me enganchó fue entender qué pasaba por dentro. Por eso di el salto al desarrollo: quería dejar de arreglar máquinas y empezar a <strong>construir cosas</strong>.", "I liked hardware, but what hooked me was understanding what happened inside. That's why I moved into development: I wanted to stop fixing machines and start <strong>building things</strong>."],
  "sobre.p3": ["No voy de experto, no lo soy. Pero soy de los que se queda hasta que lo entiende, ordena el desastre y pregunta cuando hace falta. Prefiero algo sencillo bien hecho que algo prometedor a medias.", "I don't claim to be an expert — I'm not. But I'm the kind who stays until it makes sense, tidies the mess and asks when needed. I'd rather ship something simple and well-made than something ambitious and half-done."],
  "sobre.quote": ["“Prefiero entender el porqué que memorizar el cómo.”", "“I'd rather understand the why than memorize the how.”"],
  "sobre.prioT": ["Mis prioridades", "My priorities"],
  "sobre.prio1": ["Terminar 1º de DAM", "Finish year 1 of DAM"],
  "sobre.prio2": ["Consolidar Java y POO", "Solidify Java & OOP"],
  "sobre.prio3": ["Un portafolio real", "A real portfolio"],
  "sobre.radar": ["Radar de habilidades (autoevaluación)", "Skills radar (self-assessment)"],

  /* ---------- formación ---------- */
  "form.h2": ["Formación", "Education"],
  "form.lead": ["De la máquina al código, en dos pasos.", "From machines to code, in two steps."],
  "form.i1w": ["en curso", "in progress"], "form.i1t": ["Grado Superior · DAM", "Higher Vocational · DAM"],
  "form.i1s": ["IES Doctor Lluís Simarro · Xàtiva", "IES Doctor Lluís Simarro · Xàtiva"],
  "form.i1p": ["Programación orientada a objetos, bases de datos, entornos de desarrollo y buenas prácticas. El salto natural desde SMR.", "Object-oriented programming, databases, development environments and best practices. The natural step up from SMR."],
  "form.i2w": ["terminado", "completed"], "form.i2t": ["Grado Medio · SMR", "Mid-level Degree · SMR"],
  "form.i2s": ["IES Sivera Font · Sistemas Microinformáticos y Redes", "IES Sivera Font · Microcomputer Systems and Networks"],
  "form.i2p": ["Ensamblaje, mantenimiento, instalación de sistemas y redes. La base técnica que me dio curiosidad por el software.", "Assembly, maintenance, OS and network installation. The technical base that sparked my curiosity for software."],
  "form.skills": ["Nivel (autoevaluación)", "Level (self-assessment)"],
  "sk.solid": ["Sólido", "Solid"], "sk.run": ["En marcha", "Getting going"], "sk.new": ["Por descubrir", "To discover"],
  "form.callT": ["Autodidacta.", "Self-taught."],
  "form.callP": ["Además de clase, practico por mi cuenta con proyectos pequeños —como esta web— para no quedarme solo en teoría.", "Besides class, I practice on my own with small projects —like this site— so I don't stop at theory."],

  /* ---------- servicios ---------- */
  "serv.h2": ["En qué puedo echarte una mano", "How I can lend a hand"],
  "serv.lead": ["Estoy empezando, así que no te prometo una solución integral. Esto es lo que sé hacer ya, y bien:", "I'm just starting, so no all-in-one promises. This is what I can do already, and do well:"],
  "serv.1t": ["Maquetar una web", "Build a website"], "serv.1p": ["Páginas en HTML y CSS, ordenadas, rápidas y que se vean bien en el móvil.", "HTML and CSS pages, tidy, fast and good-looking on mobile."],
  "serv.2t": ["Soporte y equipos", "Support & hardware"], "serv.2p": ["Montaje, mantenimiento y configuración de PCs y redes pequeñas. Esto lo traigo de SMR.", "Building, maintaining and configuring PCs and small networks. This comes from SMR."],
  "serv.2c1": ["Equipos", "Hardware"], "serv.2c2": ["Instalación", "Setup"],
  "serv.3t": ["Actualizar y cuidar", "Update & maintain"], "serv.3p": ["Dejar programas al día y organizar copias de seguridad para no perder nada.", "Keep software up to date and organize backups so nothing gets lost."],
  "serv.3c2": ["Configuración", "Config"],
  "serv.4t": ["Automatizar lo pesado", "Automate the grind"], "serv.4p": ["Guiones sencillos para que un trabajo repetitivo se haga solo.", "Simple scripts so repetitive work runs itself."],
  "serv.4c2": ["Tareas", "Tasks"],
  "serv.5t": ["Contenidos y manuales", "Content & manuals"], "serv.5p": ["Actualizar textos e imágenes y escribir guías claras para quien no sabe de esto.", "Update text and images and write clear guides for non-technical people."],
  "serv.5c1": ["Contenidos", "Content"], "serv.5c2": ["Manuales", "Manuals"],
  "serv.6t": ["Mejorar lo que ya tienes", "Improve what you have"], "serv.6p": ["Revisar una web o un equipo y dejarlo más ordenado, rápido y cómodo.", "Review a site or a machine and leave it tidier, faster and easier to use."],
  "serv.6c1": ["Revisión", "Review"], "serv.6c2": ["Optimizar", "Optimize"],
  "serv.callT": ["Honestidad primero.", "Honesty first."],
  "serv.callP": ["No prometo proyectos enormes: prometo que aprendo rápido, me organizo y me tomo en serio cada cosa, por pequeña que sea.", "I don't promise huge projects: I promise I learn fast, I stay organized and I take every task seriously, no matter how small."],

  /* ---------- proyectos ---------- */
  "proj.h2": ["Proyectos", "Projects"],
  "proj.lead": ["Lo que he tocado de verdad. De momento poco, pero real y mío.", "What I've actually built. Little for now, but real and mine."],
  "proj.f.all": ["todos", "all"], "proj.f.web": ["web", "web"], "proj.f.java": ["java", "java"], "proj.f.pend": ["pendientes", "pending"],
  "proj.1t": ["Esta web personal", "This personal site"], "proj.done": ["terminada", "done"], "proj.done2": ["terminado", "done"],
  "proj.1p": ["HTML, CSS y JS puros, sin frameworks. Tema de terminal, cinco paletas, bilingüe, accesible, responsive y con un arcade escrito a mano.", "Pure HTML, CSS and JS, no frameworks. Terminal theme, five palettes, bilingual, accessible, responsive and with a hand-written arcade."],
  "proj.code": ["ver código →", "view code →"],
  "proj.2t": ["Ejercicio de Java (BlueJ)", "Java exercise (BlueJ)"],
  "proj.2p": ["Práctica de clase: relleno un array de 100 enteros y calculo suma y media con métodos propios. Me sirvió para afianzar arrays, bucles y métodos estáticos.", "Class exercise: I fill an array of 100 integers and compute sum and average with my own methods. It helped me solidify arrays, loops and static methods."],
  "proj.2c": ["arrays", "arrays"], "proj.showcode": ["ver código", "view code"],
  "proj.3t": ["Prácticas FCT", "Internship project"], "proj.todo": ["pendiente", "pending"],
  "proj.3p": ["El proyecto de prácticas del ciclo. En cuanto empiece, irá aquí con su resumen, sus decisiones y su código.", "The internship project for the cycle. As soon as it starts, it'll go here with its summary, decisions and code."],
  "proj.3c": ["por definir", "to be defined"],
  "proj.empty": ["No hay proyectos con ese filtro todavía.", "No projects match that filter yet."],

  /* ---------- caso ---------- */
  "case.title": ["Caso estrella: esta web como proyecto", "Featured case: this site as a project"],
  "case.p": ["Problema", "Problem"],
  "case.pt": ["Quería mostrar un perfil técnico —base SMR, DAM en curso— sin parecer plantilla vacía ni cajón de cosas sin hilo. Hacía falta una sola voz, y la mía venía de sistemas.", "I wanted to show a technical profile —SMR background, DAM in progress— without looking like an empty template or a grab-bag of random stuff. It needed one voice, and mine comes from systems."],
  "case.s": ["Solución", "Solution"],
  "case.st": ["Mono-página con secciones por hash, fondo de nodos en canvas que habla de redes sin ser decorativo, intro de terminal que explica quién soy en dos segundos, varias APIs públicas (Hacker News, Open-Meteo, GitHub, iTunes, ipapi), test de orientación con radar y PDF, arcade propio y formulario real. Todo con <em>prefers-reduced-motion</em>, foco atrapado en diálogos y semántica accesible.", "Single page with hash sections, a canvas node background that speaks of networks without being decorative, a terminal intro that explains who I am in two seconds, several public APIs (Hacker News, Open-Meteo, GitHub, iTunes, ipapi), an orientation test with radar and PDF, a custom arcade and a real form. Everything honors <em>prefers-reduced-motion</em>, traps focus in dialogs and uses accessible semantics."],
  "case.r": ["Resultado", "Result"],
  "case.m1": ["commits", "commits"], "case.m2": ["lenguaje", "language"], "case.m3": ["estrellas", "stars"],
  "case.m4": ["último push", "last push"], "case.m5": ["Lighthouse", "Lighthouse"],

  /* ---------- github ---------- */
  "gh.title": ["mis repos, en vivo", "my repos, live"],
  "gh.loading": ["cargando repos…", "loading repos…"],
  "gh.error": ["No pude leer GitHub ahora (límite de API). Reintenta en unos minutos o abre mi perfil.", "Couldn't read GitHub right now (API limit). Try again later or open my profile."],
  "gh.empty": ["Públicamente aún no tengo repos con ese criterio.", "I don't have public repos matching that yet."],
  "gh.note": ["// API de GitHub · con token de solo lectura", "// GitHub API · read-only token"],
  "gh.cached": ["// último dato guardado en tu navegador", "// last data saved in your browser"],
  "gh.rate": ["(límite de peticiones)", "(rate limit)"],
  "gh.link": ["Abrir GitHub", "Open GitHub"],

  /* ---------- me gusta ---------- */
  "likes.h2": ["Me gusta", "Things I like"],
  "likes.lead": ["Lo que hago cuando cierro el editor. Sin postureo: esto es lo que de verdad me llena el fin de semana.", "What I do when I close the editor. No posing: this is what actually fills my weekends."],
  "likes.f.all": ["todo", "all"], "likes.f.pantalla": ["pantalla", "screen"], "likes.f.deporte": ["deporte", "sport"],
  "likes.f.calle": ["calle", "street"], "likes.f.mesa": ["mesa", "bench"],
  "likes.note": ["// pulsa el corazón para guardarlo: se queda en tu navegador, no en ningún servidor", "// tap the heart to save it: it stays in your browser, not on any server"],
  "likes.save": ["guardar", "save"], "likes.saved": ["guardado", "saved"], "likes.level": ["nivel", "level"],
  "likes.empty": ["No hay gustos con ese filtro.", "No likes match that filter."],

  /* ---------- arcade ---------- */
  "arc.h2": ["Arcade", "Arcade"],
  "arc.lead": ["Un extra hecho a mano: esquiva los <b class=\"red\">tokens de error</b> y coge los <b class=\"green\">tokens de código</b>. Los <b class=\"gold\">dorados</b> son raros y dan power-ups. Puro canvas, sin librerías, sin imágenes.", "A hand-made extra: dodge the <b class=\"red\">error tokens</b> and grab the <b class=\"green\">code tokens</b>. <b class=\"gold\">Golden</b> tokens are rare and give power-ups. Pure canvas, no libraries, no images."],
  "arc.diff": ["dificultad", "difficulty"], "arc.diff.n": ["normal", "normal"], "arc.diff.h": ["difícil", "hard"],
  "arc.mode": ["modo", "mode"],
  "arc.help": ["Muévete con ← → (o A/D). En móvil, arrastra el dedo sobre el tablero. <kbd>P</kbd> pausa, <kbd>Enter</kbd> jugar.", "Move with ← → (or A/D). On mobile, drag your finger on the board. <kbd>P</kbd> pause, <kbd>Enter</kbd> play."],
  "arc.lg1": ["token de código · +puntos y combo", "code token · +points & combo"],
  "arc.lg2": ["token de error · pierdes vida", "error token · lose a life"],
  "arc.lg3": ["power-up · escudo, imán, slow-mo, ×2", "power-up · shield, magnet, slow-mo, ×2"],
  "arc.lg4": ["power-up raro · vida extra", "rare power-up · extra life"],
  "arc.play": ["jugar ▶", "play ▶"], "arc.again": ["otra vez ▶", "again ▶"], "arc.pause": ["pausa ⏸", "pause ⏸"], "arc.resume": ["seguir ▶", "resume ▶"],
  "arc.sound": ["sonido off", "sound off"], "arc.soundOn": ["sonido on", "sound on"],
  "arc.top": ["top 5 local", "local top 5"],
  "arc.hud.score": ["score", "score"], "arc.hud.level": ["nivel", "level"], "arc.hud.combo": ["combo", "combo"],
  "arc.hud.best": ["récord", "best"], "arc.hud.lives": ["vidas", "lives"],
  "arc.gameover": ["GAME OVER", "GAME OVER"], "arc.press": ["pulsa para jugar", "press to play"],
  "arc.paused": ["PAUSA", "PAUSED"], "arc.helpPause": ["Pulsa P o Seguir para continuar", "Press P or Resume to continue"],
  "arc.newrec": ["¡nuevo récord!", "new record!"],
  "arc.pw.shield": ["escudo", "shield"], "arc.pw.magnet": ["imán", "magnet"], "arc.pw.slow": ["slow-mo", "slow-mo"],
  "arc.pw.x2": ["×2", "×2"], "arc.pw.life": ["vida", "life"],

  /* ---------- contacto ---------- */
  "cont.h2": ["Contacto", "Contact"],
  "cont.p": ["¿Prácticas, una idea o solo saludar? Escríbeme y te contesto en cuanto pueda.", "Internship, an idea or just saying hi? Write me and I'll reply as soon as I can."],
  "cont.github": ["github", "github"], "cont.email": ["email ▾", "email ▾"], "cont.copy": ["Copiar correo", "Copy email"],
  "cont.cv": ["CV ↓", "CV ↓"],
  "cont.legend": ["enviar_mensaje.py", "send_message.py"],
  "cont.name": ["nombre", "name"], "cont.company": ["empresa (opcional)", "company (optional)"],
  "cont.mail": ["tu correo", "your email"], "cont.subject": ["concepto", "subject"], "cont.choose": ["elige…", "choose…"],
  "cont.o1": ["Prácticas / FCT", "Internship / FCT"], "cont.o2": ["Colaboración", "Collaboration"],
  "cont.o3": ["Consulta", "Query"], "cont.o4": ["Otro", "Other"], "cont.msg": ["mensaje", "message"], "cont.send": ["enviar ▶", "send ▶"],
  "cont.privacy": ["// Solo uso tus datos para responderte. Nada de listas de correo ni terceros.", "// I only use your data to reply. No mailing lists, no third parties."],
  "cont.where": ["Dónde encontrarme", "Where to find me"],
  "cont.maps": ["// Vivo en Vallada y estudio en el IES Doctor Lluís Simarro (Xàtiva). Si te encaja mi perfil, aquí me tienes:", "// I live in Vallada and study at IES Doctor Lluís Simarro (Xàtiva). If my profile fits, here I am:"],
  "cont.mapOpen": ["Abrir en Google Maps", "Open in Google Maps"],
  "cont.copied": ["Correo copiado al portapapeles", "Email copied to clipboard"],
  "cont.formOk": ["Mensaje enviado. Te responderé pronto.", "Message sent. I'll reply soon."],
  "cont.formErr": ["Revisa los campos marcados.", "Please check the marked fields."],
  "cont.formErrMail": ["No pude enviar por el formulario. Usa el botón de email o vuelve a intentarlo.", "Couldn't send by form. Use the email button or try again."],
  "cont.openMail": ["Abrir correo", "Open email"],
  "cont.sending": ["enviando…", "sending…"],
  "cont.draft": ["borrador guardado", "draft saved"],
  "cont.nameErr": ["Escribe tu nombre", "Please enter your name"],
  "cont.mailErr": ["Correo no válido", "Invalid email"],
  "cont.subjectErr": ["Elige un concepto", "Choose a subject"],
  "cont.msgErr": ["Mensaje demasiado corto", "Message too short"],
  "cont.rateLimit": ["Demasiados envíos seguidos. Espera un momento.", "Too many sends. Please wait a moment."],

  /* ---------- footer ---------- */
  "ft.made": ["hecho a mano", "hand-made"], "ft.tech": ["html · css · js, sin frameworks", "html · css · js, no frameworks"],
  "ft.local": ["Local", "Local"], "ft.you": ["desde", "from"],

  /* ---------- temas ---------- */
  "theme.terminal": ["Terminal", "Terminal"], "theme.editor": ["Editor", "Editor"],
  "theme.matrix": ["Matrix", "Matrix"], "theme.crt": ["CRT Ámbar", "Amber CRT"], "theme.synth": ["Synthwave", "Synthwave"],
  "theme.terminal.d": ["verde sobre azul noche", "green on midnight blue"], "theme.editor.d": ["claro, modo GitHub", "light, GitHub mode"],
  "theme.matrix.d": ["verde fósforo", "phosphor green"], "theme.crt.d": ["ámbar retro", "retro amber"], "theme.synth.d": ["neón ochentero", "80s neon"],

  /* ---------- paleta de comandos ---------- */
  "pal.placeholder": ["escribe un comando o una sección…", "type a command or a section…"],
  "pal.go": ["ir a", "go to"], "pal.theme": ["tema", "theme"], "pal.lang": ["idioma", "language"],
  "pal.sound": ["sonido", "sound"], "pal.action": ["acción", "action"], "pal.empty": ["sin resultados", "no results"],
  "pal.hint": ["Ir", "Go"],

  /* ---------- frases del typewriter ---------- */
  "phrases": {
    "es": ["Estudiante de 1º de DAM · IES Simarro", "Vengo de SMR: hardware, redes y soporte", "Front-end en HTML/CSS/JS · back en Java", "Escucho ofertas para FCT", "Prefiero entender el porqué al memorizar"],
    "en": ["Year 1 of Multiplatform App Dev · IES Simarro", "From SMR: hardware, networks & support", "Front-end in HTML/CSS/JS · back in Java", "Open to internship opportunities", "I'd rather understand the why than memorize"]
  },

  /* ---------- ticker ---------- */
  "ticker": {
    "es": ["HTML", "CSS", "JavaScript", "Java", "Git", "Linux", "Windows", "Redes", "Montaje", "Mantenimiento", "Backups", "BlueJ", "VS Code", "Accesibilidad", "Responsive"],
    "en": ["HTML", "CSS", "JavaScript", "Java", "Git", "Linux", "Windows", "Networks", "Assembly", "Maintenance", "Backups", "BlueJ", "VS Code", "Accessibility", "Responsive"]
  },

  /* ---------- skills (radar + barras, autoevaluación real) ---------- */
  "skills_data": [
    { "k": { "es": "HTML / CSS", "en": "HTML / CSS" }, "v": 80, "lbl": "solid" },
    { "k": { "es": "JavaScript", "en": "JavaScript" }, "v": 52, "lbl": "run" },
    { "k": { "es": "Java", "en": "Java" }, "v": 48, "lbl": "run" },
    { "k": { "es": "Sistemas / Redes", "en": "Systems / Networks" }, "v": 70, "lbl": "solid" },
    { "k": { "es": "Herramientas (Git/VSCode/BlueJ)", "en": "Tools (Git/VSCode/BlueJ)" }, "v": 58, "lbl": "run" },
    { "k": { "es": "Frameworks", "en": "Frameworks" }, "v": 22, "lbl": "new" }
  ],

  /* ---------- aficiones (DATOS REALES aportados por Héctor) ---------- */
  /* cat: pantalla | deporte | calle | mesa · int: 1..5 */
  "likes_data": [
    { "id": "futbol", "cat": "deporte", "emoji": "⚽", "color": "#22c55e", "int": 4,
      "es": ["Fútbol", "Lo jugué de pequeño; ahora me gusta más verlo que practicarlo."],
      "en": ["Football", "I played it as a kid; now I enjoy watching it more than playing."] },
    { "id": "moto", "cat": "calle", "emoji": "🏍️", "color": "#f97316", "int": 5,
      "es": ["Moto", "Me encanta la sensación de libertad en ruta. Interés máximo."],
      "en": ["Motorbike", "I love the sense of freedom on the road. Maximum interest."] },
    { "id": "gimnasio", "cat": "deporte", "emoji": "🏋️", "color": "#60a5fa", "int": 3,
      "es": ["Gimnasio", "Constancia más que resultados: ir aunque no apetezca."],
      "en": ["Gym", "Consistency over results: showing up even when I don't feel like it."] },
    { "id": "videojuegos", "cat": "pantalla", "emoji": "🎮", "color": "#a78bfa", "int": 5,
      "es": ["Videojuegos", "De jugarlos a querer entender cómo se hacen."],
      "en": ["Video games", "From playing them to wanting to understand how they're made."] },
    { "id": "programar", "cat": "pantalla", "emoji": "💻", "color": "#34d399", "int": 5,
      "es": ["Programar", "Lo que más me engancha ahora mismo, y lo que más practico."],
      "en": ["Coding", "What hooks me the most right now, and what I practice the most."] },
    { "id": "hardware", "cat": "mesa", "emoji": "🔧", "color": "#fbbf24", "int": 3,
      "es": ["Hardware", "Mi origen: montar, diagnosticar y dejarlo funcionando."],
      "en": ["Hardware", "My origin: building, diagnosing and keeping it running."] },
    { "id": "musica", "cat": "pantalla", "emoji": "🎧", "color": "#f472b6", "int": 3,
      "es": ["Música", "Siempre de fondo para estudiar o para desconectar."],
      "en": ["Music", "Always in the background, to study or to switch off."] }
  ],

  /* ---------- test de orientación ---------- */
  "quiz_data": {
    "intro": ["Te hago seis preguntas rápidas. Responde con lo que de verdad harías, no con lo que crees que suena bien.", "I'll ask six quick questions. Answer with what you'd really do, not what sounds good."],
    "questions": [
      { "q": { "es": "Abres un ordenador que no enciende. ¿Qué sientes?", "en": "You open a PC that won't boot. What do you feel?" },
        "opts": [
          { "t": { "es": "Curiosidad por descubrir la avería", "en": "Curiosity to find the fault" }, "w": { "soporte": 3, "redes": 2 } },
          { "t": { "es": "Ganas de reinstalar y dejarlo limpio", "en": "Urge to reinstall and clean it up" }, "w": { "soporte": 2, "datos": 1 } },
          { "t": { "es": "Me aburre; prefiero el software", "en": "It bores me; I prefer software" }, "w": { "front": 2, "back": 2 } }
        ] },
      { "q": { "es": "Te dan a elegir: ¿qué proyecto te llama más?", "en": "If you had to pick, which project excites you most?" },
        "opts": [
          { "t": { "es": "Una web bonita que la gente use", "en": "A beautiful site people use" }, "w": { "front": 3 } },
          { "t": { "es": "Una app que guarde y procese datos", "en": "An app that stores and processes data" }, "w": { "back": 3, "datos": 2 } },
          { "t": { "es": "Montar una red que funcione", "en": "Setting up a network that works" }, "w": { "redes": 3, "soporte": 1 } },
          { "t": { "es": "Un panel con estadísticas y gráficos", "en": "A dashboard with stats and charts" }, "w": { "datos": 3 } }
        ] },
      { "q": { "es": "¿Qué te sale más natural?", "en": "What comes more naturally to you?" },
        "opts": [
          { "t": { "es": "Diseñar y cuidar el detalle visual", "en": "Designing and polishing visuals" }, "w": { "front": 3 } },
          { "t": { "es": "Ordenar la lógica y la estructura", "en": "Organizing logic and structure" }, "w": { "back": 3, "datos": 1 } },
          { "t": { "es": "Configurar y dejarlo funcionando", "en": "Configuring until it runs" }, "w": { "soporte": 3, "redes": 2 } }
        ] },
      { "q": { "es": "¿Cómo aprendes mejor?", "en": "How do you learn best?" },
        "opts": [
          { "t": { "es": "Maquetando y tocando estilos", "en": "Building layouts and tweaking styles" }, "w": { "front": 3 } },
          { "t": { "es": "Escribiendo funciones y clases", "en": "Writing functions and classes" }, "w": { "back": 3 } },
          { "t": { "es": "Analizando datos y sacando conclusiones", "en": "Analyzing data and drawing conclusions" }, "w": { "datos": 3 } },
          { "t": { "es": "Manchándome las manos con hardware/redes", "en": "Getting my hands dirty with hardware/networks" }, "w": { "redes": 2, "soporte": 3 } }
        ] },
      { "q": { "es": "Una tarea repetitiva aparece. Tu instinto:", "en": "A repetitive task shows up. Your instinct:" },
        "opts": [
          { "t": { "es": "Hacer un guion que la haga sola", "en": "Write a script to do it for me" }, "w": { "datos": 2, "back": 2 } },
          { "t": { "es": "Automatizarlo en el sistema", "en": "Automate it at the system level" }, "w": { "soporte": 2, "redes": 2 } },
          { "t": { "es": "Mejorar la interfaz para que cueste menos", "en": "Improve the UI so it's less painful" }, "w": { "front": 3 } }
        ] },
      { "q": { "es": "¿Dónde te ves en dos años?", "en": "Where do you see yourself in two years?" },
        "opts": [
          { "t": { "es": "Haciendo interfaces que se disfrutan", "en": "Building interfaces people enjoy" }, "w": { "front": 3 } },
          { "t": { "es": "Programando el motor de una app", "en": "Programming an app's engine" }, "w": { "back": 3 } },
          { "t": { "es": "Sacando valor de los datos", "en": "Pulling value out of data" }, "w": { "datos": 3 } },
          { "t": { "es": "Manteniendo la infraestructura que todo usa", "en": "Keeping the infrastructure running" }, "w": { "redes": 3, "soporte": 2 } }
        ] }
    ],
    "profiles": {
      "front": { "name": { "es": "Desarrollo Front-end", "en": "Front-end Development" }, "tag": "HTML · CSS · JavaScript · UX",
        "why": { "es": "Te tira el producto final y el detalle visual. Vienes del hardware, así que entiendes el sistema, pero disfrutas cuando algo se ve y se siente bien. Tu sitio: interfaz, accesibilidad y experiencia.", "en": "You're drawn to the end product and the visual detail. You come from hardware, so you get the system, but you light up when something looks and feels right. Your place: interface, accessibility and experience." },
        "route": { "es": ["Consolida CSS (Grid/Flexbox) y accesibilidad", "Aprende un framework: Vue o React", "Haz 3 proyectos reales de interfaz", "Estudia UX básica y rendimiento"], "en": ["Solidify CSS (Grid/Flexbox) and a11y", "Learn a framework: Vue or React", "Build 3 real interface projects", "Study basic UX and performance"] },
        "first": { "es": "Rehaz una landing responsive y accesible en una tarde.", "en": "Rebuild a responsive, accessible landing page in an afternoon." } },
      "back": { "name": { "es": "Desarrollo Back-end", "en": "Back-end Development" }, "tag": "Java · SQL · APIs · lógica",
        "why": { "es": "Te gusta ordenar la lógica y que las cosas tengan sentido por dentro. El DAM encaja perfecto: Java, bases de datos y arquitectura. Tu sitio: el motor de la aplicación.", "en": "You like organizing logic and making things make sense inside. DAM fits perfectly: Java, databases and architecture. Your place: the engine of the application." },
        "route": { "es": ["Java a fondo: POO, colecciones, excepciones", "Bases de datos relacionales y SQL", "APIs REST y autenticación", "Testing y control de versiones"], "en": ["Deepen Java: OOP, collections, exceptions", "Relational databases and SQL", "REST APIs and authentication", "Testing and version control"] },
        "first": { "es": "Monta una API sencilla con Spring Boot que guarde tareas.", "en": "Build a simple Spring Boot API that stores tasks." } },
      "datos": { "name": { "es": "Datos & Analítica", "en": "Data & Analytics" }, "tag": "SQL · Python · visualización",
        "why": { "es": "Te mola sacar conclusiones y ver patrones donde otros ven ruido. Es un puente natural desde tu base técnica. Tu sitio: datos, informes y decisiones.", "en": "You love drawing conclusions and seeing patterns where others see noise. It's a natural bridge from your technical base. Your place: data, reports and decisions." },
        "route": { "es": ["SQL avanzado y modelado de datos", "Python para análisis (pandas)", "Visualización y storytelling", "Fundamentos de estadística"], "en": ["Advanced SQL and data modeling", "Python for analysis (pandas)", "Visualization and storytelling", "Statistics fundamentals"] },
        "first": { "es": "Analiza un dataset público y saca 3 conclusiones en un gráfico.", "en": "Analyze a public dataset and turn it into 3 chart-backed takeaways." } },
      "redes": { "name": { "es": "Redes & Infraestructura", "en": "Networks & Infrastructure" }, "tag": "Linux · redes · cloud",
        "why": { "es": "Tu raíz SMR es aquí oro: montar, configurar y dejarlo funcionando. El salto es a redes avanzadas, Linux y cloud. Tu sitio: la base que sostiene todo.", "en": "Your SMR root is gold here: build, configure and keep it running. The step up is advanced networks, Linux and cloud. Your place: the foundation that holds everything." },
        "route": { "es": ["Linux a fondo y línea de comandos", "Redes: DNS, DHCP, VLAN, firewalls", "Virtualización y contenedores", "Cloud (AWS/Azure) y automatización"], "en": ["Deep Linux and the command line", "Networks: DNS, DHCP, VLAN, firewalls", "Virtualization and containers", "Cloud (AWS/Azure) and automation"] },
        "first": { "es": "Levanta un servidor Linux con un servicio web y cópialo de seguridad.", "en": "Stand up a Linux server with a web service and set up a backup." } },
      "soporte": { "name": { "es": "Soporte & Sistemas", "en": "Support & Systems" }, "tag": "hardware · helpdesk · IT",
        "why": { "es": "Te resuelve la vida arreglar lo que falla y que la gente te lo agradezca. Es tu zona de confort de SMR; el crecimiento es hacia sistemas y administración. Tu sitio: hacer que todo funcione.", "en": "You find it satisfying to fix what breaks and have people thank you for it. It's your SMR comfort zone; growth is toward systems and admin. Your place: making everything work." },
        "route": { "es": ["Certifícate en Windows/Linux (fundamentos)", "Ayuda IT y documentación", "Automatiza tareas con scripts", "Camino a administración de sistemas"], "en": ["Get a Windows/Linux fundamentals cert", "IT helpdesk and documentation", "Automate tasks with scripts", "Path to systems administration"] },
        "first": { "es": "Escribe una guía de resolución de problemas para tu entorno.", "en": "Write a troubleshooting guide for your environment." } }
    }
  },

  /* ---------- chatbot ---------- */
  /* Cada regla: k = palabras clave (mezcla ES+EN, minúsculas, sin acentos para tolerar).
     a = respuestas [es[], en[]] (elige una al azar → variedad).
     chips = ids de otras reglas para sugerir a continuación.
     act = acción opcional (openQuiz, openArcade, openContact, openProjects, openAbout,
           openNews, openPlayer, openGitHub, openCV, toggleTheme, toggleLang, copyMail, goView:xxx). */
  "chat": {
    "title": ["Asistente Web", "Web Assistant"],
    "greet": [
      "¡Hola! Soy el <b>Asistente Web</b> de Héctor. Pregúntame por <b>formación</b>, <b>qué sé</b>, <b>proyectos</b>, <b>contacto</b>, <b>FCT</b>, <b>arcade</b>, <b>test</b>, <b>temas</b>, <b>noticias</b> o <b>GitHub</b>. Y si no sé algo, te digo por dónde seguir.",
      "Hi! I'm Héctor's <b>Web Assistant</b>. Ask me about <b>education</b>, <b>skills</b>, <b>projects</b>, <b>contact</b>, <b>internships</b>, <b>arcade</b>, <b>test</b>, <b>themes</b>, <b>news</b> or <b>GitHub</b>. If I don't know something, I'll point you the right way."
    ],
    "bubble": ["¿Necesitas ayuda? 💬", "Need a hand? 💬"],
    "safety": [
      "Prefiero no entrar ahí 🙂 Puedo ayudarte con la web, la formación, los proyectos o el contacto. ¿Qué te apetece?",
      "I'd rather skip that 🙂 I can help with the site, education, projects or contact. What would you like?"
    ],
    "fallback": [
      "No tengo esa respuesta exacta, pero sí puedo hablar de: quién soy, formación, qué sé, proyectos, contacto, FCT, arcade, test, temas, noticias o GitHub. ¿Cuál te interesa?",
      "I don't have that exact answer, but I can talk about: who I am, education, skills, projects, contact, internships, arcade, test, themes, news or GitHub. Which one interests you?"
    ],
    "fallback2": [
      "Hmm, eso se me escapa. Prueba con una de estas palabras: <b>formación</b>, <b>stack</b>, <b>proyectos</b>, <b>contacto</b>, <b>arcade</b>, <b>test</b>, <b>tema</b>, <b>idioma</b>.",
      "Hmm, that's over my head. Try one of these: <b>education</b>, <b>stack</b>, <b>projects</b>, <b>contact</b>, <b>arcade</b>, <b>test</b>, <b>theme</b>, <b>language</b>."
    ],
    "thanks": [
      "¡De nada! Si quieres, prueba el <b>test de orientación</b> para ver por dónde tirar. 🚀",
      "You're welcome! If you want, try the <b>orientation test</b> to see where to head. 🚀"
    ],
    "like": ["¡Genial, gracias por el feedback! 👍", "Great, thanks for the feedback! 👍"],
    "dislike": ["Vale, lo tendré en cuenta. ¿Te ayudo con otra cosa? Si no, usa el <b>formulario</b>.", "Got it, I'll note that. Anything else? If not, use the <b>form</b>."],
    "clear": ["Conversación borrada. Empecemos de nuevo 👋", "Conversation cleared. Let's start fresh 👋"],
    "reactions": { "yes": "útil", "no": "no ayuda", "clear": "borrar conversación" },

    "labels": {
      "quien": ["Quién eres", "Who are you"], "skills": ["Qué sé", "What I know"],
      "formacion": ["Formación", "Education"], "proyectos": ["Proyectos", "Projects"],
      "contacto": ["Contacto", "Contact"], "fct": ["FCT", "Internship"], "arcade": ["Arcade", "Arcade"],
      "test": ["Test", "Test"], "tema": ["Temas", "Themes"], "idioma": ["Idioma", "Language"],
      "noticias": ["Noticias", "News"], "github": ["GitHub", "GitHub"], "gusta": ["Me gusta", "Likes"],
      "cv": ["CV", "CV"], "accesibilidad": ["Accesibilidad", "Accessibility"], "ayuda": ["Ayuda", "Help"],
      "musica": ["Música", "Music"], "ubicacion": ["Dónde vives", "Where you live"], "tiempo": ["Clima", "Weather"]
    },

    "rules": [
      { "id": "saludo", "k": ["hola", "hey", "hi", "buenas", "saludos", "hello", "hey", "que tal", "qué tal", "holi"],
        "a": { "es": ["¡Hola! Encantado de que estés por aquí. ¿Qué quieres saber?", "¡Hey! Pregunta lo que quieras: formación, proyectos, contacto…"], "en": ["Hi! Glad you're here. What do you want to know?", "Hey! Ask me anything: education, projects, contact…"] },
        "chips": ["ayuda", "quien", "formacion"] },

      { "id": "ayuda", "k": ["ayuda", "opciones", "que puedes", "que sabes decir", "help", "what can you do", "menu"],
        "a": { "es": ["Puedo responder sobre: <b>quién soy</b>, <b>formación</b>, <b>qué sé</b>, <b>proyectos</b>, <b>contacto</b>, <b>FCT</b>, <b>arcade</b>, <b>test</b>, <b>temas</b>, <b>noticias</b> y <b>GitHub</b>. También puedo <b>llevarte a una sección</b> o <b>cambiar tema/idioma</b> si me lo pides."], "en": ["I can answer about: <b>who I am</b>, <b>education</b>, <b>skills</b>, <b>projects</b>, <b>contact</b>, <b>internships</b>, <b>arcade</b>, <b>test</b>, <b>themes</b>, <b>news</b> and <b>GitHub</b>. I can also <b>take you to a section</b> or <b>change theme/language</b> if you ask."] },
        "chips": ["quien", "proyectos", "contacto"] },

      { "id": "quien", "k": ["quien eres", "quien eres", "tu eres", "tú eres", "hector", "héctor", "piquer", "presentacion", "presentación", "sobre ti", "sobre tí", "who are you", "your name", "introduction"],
        "a": { "es": ["Soy <b>Héctor Piquer Belda</b>, de Vallada. Estudio <b>1º de DAM</b> en el <b>IES Doctor Lluís Simarro</b> (Xàtiva). Vengo de <b>SMR</b> (IES Sivera Font): hardware, redes y soporte, y ahora quiero construir software.", "Un perfil técnico humilde: base de <b>SMR</b>, ahora en <b>DAM</b>, con ganas de aprender y sin postureo."], "en": ["I'm <b>Héctor Piquer Belda</b>, from Vallada. I study <b>year 1 of DAM</b> at <b>IES Doctor Lluís Simarro</b> (Xàtiva). I come from <b>SMR</b> (IES Sivera Font): hardware, networks and support, and now I want to build software.", "A humble technical profile: <b>SMR</b> base, now in <b>DAM</b>, eager to learn and without posing."] },
        "chips": ["formacion", "skills", "proyectos"] },

      { "id": "skills", "k": ["que sabes", "que sabes hacer", "skills", "habilidades", "tecnologias", "tecnologías", "stack", "lenguajes", "frameworks", "what do you know", "que dominas", "conoces"],
        "a": { "es": ["Ahora mismo: <b>HTML y CSS</b> (sólido), <b>Java</b> (en marcha), <b>JavaScript</b> (en marcha), <b>Git</b>, comandos básicos de <b>Linux</b>, <b>Windows</b> (parte gráfica), <b>redes</b> en Packet Tracer, <b>montaje y mantenimiento</b>, <b>Office</b>, <b>BlueJ</b> y <b>VS Code</b>. Frameworks: por descubrir.", "No soy experto, estoy empezando. Lo más fuerte: maquetación y la base de sistemas/redes de SMR. Lo que más me queda: frameworks y más Java."], "en": ["Right now: <b>HTML and CSS</b> (solid), <b>Java</b> (getting going), <b>JavaScript</b> (getting going), <b>Git</b>, basic <b>Linux</b> commands, <b>Windows</b> (GUI side), <b>networks</b> in Packet Tracer, <b>assembly and maintenance</b>, <b>Office</b>, <b>BlueJ</b> and <b>VS Code</b>. Frameworks: to discover.", "I'm not an expert, I'm just starting. Strongest: markup and the SMR systems/networks base. Still to come: frameworks and more Java."] },
        "chips": ["formacion", "proyectos", "accesibilidad"] },

      { "id": "formacion", "k": ["formacion", "formación", "estudio", "donde estudias", "dónde estudias", "dam", "smr", "simarro", "sivera", "ciclo", "escuela", "centro", "education", "study", "school"],
        "a": { "es": ["Estudio <b>1º de DAM</b> en el <b>IES Doctor Lluís Simarro</b> (Xàtiva). Antes hice <b>SMR</b> en el <b>IES Sivera Font</b>. El ciclo acaba en <b>junio de 2028</b>.", "De la máquina al código: primero SMR (Sistemas Microinformáticos y Redes), ahora DAM (Desarrollo de Aplicaciones Multiplataforma)."], "en": ["I'm in <b>year 1 of DAM</b> at <b>IES Doctor Lluís Simarro</b> (Xàtiva). Before that, <b>SMR</b> at <b>IES Sivera Font</b>. The cycle ends in <b>June 2028</b>.", "From machines to code: first SMR (Microcomputer Systems & Networks), now DAM (Multiplatform Application Development)."] },
        "chips": ["skills", "fct", "proyectos"] },

      { "id": "proyectos", "k": ["proyecto", "proyectos", "portfolio", "portafolio", "web", "codigo", "código", "java", "que has hecho", "qué has hecho"],
        "a": { "es": ["Lo más real: <b>esta web</b> (HTML/CSS/JS puro, con arcade propio) y prácticas de <b>Java</b> en BlueJ (arrays, bucles, métodos). En <b>Proyectos</b> tienes el detalle y mis repos en vivo.", "De momento poco, pero mío: esta web y un ejercicio de Java. El siguiente será la FCT."], "en": ["The most real: <b>this site</b> (pure HTML/CSS/JS, with my own arcade) and <b>Java</b> exercises in BlueJ (arrays, loops, methods). Go to <b>Projects</b> for details and live repos.", "Little for now, but mine: this site and a Java exercise. The next one will be the internship."] },
        "act": "goView:proyectos", "chips": ["github", "arcade", "skills"] },

      { "id": "gusta", "k": ["me gusta", "gusto", "gustos", "aficion", "aficiones", "likes", "hobby", "gimnasio", "moto", "videojuegos", "futbol", "fútbol", "musica", "música", "hobbies"],
        "a": { "es": ["Me gusta: <b>programar</b> y los <b>videojuegos</b> (a tope), la <b>moto</b> (5/5), el <b>fútbol</b> (ahora más verlo que jugar), el <b>gimnasio</b>, el <b>hardware</b> y la <b>música</b> de fondo. En <b>Me gusta</b> lo tienes con filtros y corazones.", "Lo de verdad, sin postureo: código, moto, gimnasio, hardware y música. Pulsa el corazón para guardar tus favoritos."], "en": ["I like: <b>coding</b> and <b>video games</b> (max), the <b>motorbike</b> (5/5), <b>football</b> (watching more than playing now), the <b>gym</b>, <b>hardware</b> and background <b>music</b>. Under <b>Likes</b> you have filters and hearts.", "The real stuff, no posing: code, motorbike, gym, hardware and music. Tap the heart to save your favorites."] },
        "act": "goView:gusta", "chips": ["arcade", "musica", "skills"] },

      { "id": "contacto", "k": ["contacto", "email", "correo", "escribe", "escribirte", "como te contacto", "cómo te contacto", "contact", "mail"],
        "a": { "es": ["Mi correo visible es <b>hecpiqbel@alu.edu.gva.es</b>. En <b>Contacto</b> tienes el formulario (va directo a mi correo) y un botón para abrir Gmail/Outlook o copiar el email.", "Lo más rápido: el <b>formulario</b> de Contacto. O el botón de email si prefieres tu gestor."], "en": ["My visible email is <b>hecpiqbel@alu.edu.gva.es</b>. Under <b>Contact</b> there's the form (goes straight to my inbox) and a button to open Gmail/Outlook or copy the email.", "Fastest: the <b>form</b> under Contact. Or the email button if you prefer your client."] },
        "act": "goView:contacto", "chips": ["fct", "cv", "github"] },

      { "id": "fct", "k": ["fct", "practicas", "prácticas", "internship", "buscas", "oferta", "disponible", "empleo", "trabajo"],
        "a": { "es": ["Busco <b>FCT</b> para el ciclo. No estoy desesperado: escucho ofertas donde pueda aprender de verdad y aportar. Si te encaja, usa el <b>formulario</b>.", "FCT en marcha para el ciclo. Escucho propuestas honestas, sin prisa pero sin pausa."], "en": ["I'm looking for an <b>internship</b> for the cycle. Not desperate: open to opportunities where I can genuinely learn and contribute. If it fits, use the <b>form</b>.", "Internship coming up for the cycle. Open to honest proposals, no rush but no pause."] },
        "act": "goView:contacto", "chips": ["formacion", "cv", "contacto"] },

      { "id": "cv", "k": ["cv", "curriculum", "descargar", "resume", "hoja de vida"],
        "a": { "es": ["En <b>Contacto</b> tienes el botón <b>CV ↓</b> para descargarlo.", "El CV está en la sección Contacto, botón “CV ↓”."], "en": ["Under <b>Contact</b> there's a <b>CV ↓</b> button to download it.", "The CV is in the Contact section, the “CV ↓” button."] },
        "act": "openCV", "chips": ["contacto", "fct", "proyectos"] },

      { "id": "ubicacion", "k": ["donde vives", "dónde vives", "vallada", "xativa", "xàtiva", "location", "donde estas", "dónde estás", "where do you live"],
        "a": { "es": ["Vivo en <b>Vallada</b> y estudio en el <b>IES Doctor Lluís Simarro</b> de <b>Xàtiva</b>.", "De Vallada, con el día a día en Xàtiva por el instituto."], "en": ["I live in <b>Vallada</b> and study at <b>IES Doctor Lluís Simarro</b> in <b>Xàtiva</b>.", "From Vallada, day-to-day in Xàtiva for school."] },
        "chips": ["formacion", "contacto", "tiempo"] },

      { "id": "test", "k": ["test", "orientacion", "orientación", "brujula", "brújula", "radar", "perfil", "quiz", "prueba"],
        "a": { "es": ["El <b>test</b> te da tu perfil (front, back, datos, redes o soporte) con un <b>radar</b>, una <b>ruta</b> y un primer paso. Y puedes <b>guardarlo en PDF</b>.", "¿No sabes por dónde tirar? Haz el test: seis preguntas y te digo tu perfil orientativo."], "en": ["The <b>test</b> gives you your profile (front, back, data, networks or support) with a <b>radar</b>, a <b>roadmap</b> and a first step. And you can <b>save it as PDF</b>.", "Not sure where to head? Take the test: six questions and I'll give you your rough profile."] },
        "act": "openQuiz", "chips": ["skills", "formacion", "ayuda"] },

      { "id": "arcade", "k": ["arcade", "juego", "game", "score", "record", "récord", "play", "jug", "robot"],
        "a": { "es": ["Tengo un <b>arcade</b> hecho a mano en canvas: esquiva los <b>rojos</b>, coge los <b>verdes</b> y busca los <b>dorados</b> raros (escudo, imán, slow-mo, ×2 y vida extra). Con <b>normal</b> y <b>difícil</b>, combos, vidas y top local.", "El arcade es puro canvas, sin librerías. El jugador es un robot. ¿Te atreves en difícil?"], "en": ["I have a hand-made <b>arcade</b> in canvas: dodge the <b>red</b> ones, grab the <b>green</b> ones and chase rare <b>gold</b> ones (shield, magnet, slow-mo, ×2 and extra life). With <b>normal</b> and <b>hard</b>, combos, lives and a local top.", "The arcade is pure canvas, no libraries. The player is a robot. Dare to try hard mode?"] },
        "act": "goView:arcade", "chips": ["proyectos", "musica", "gusta"] },

      { "id": "noticias", "k": ["noticias", "news", "hacker", "ia", "ai", "programacion", "programación", "actualidad"],
        "a": { "es": ["Las noticias salen de <b>Hacker News</b> vía API pública, con filtros por <b>todo / IA / dev / seguridad</b> y recarga automática. En la sección <b>Inicio</b> las tienes.", "Noticias en vivo de HN. Filtra por IA, dev o seguridad y pulsa “ver más”."], "en": ["News comes from <b>Hacker News</b> via a public API, with <b>all / AI / dev / security</b> filters and auto-refresh. They're in the <b>Home</b> section.", "Live HN news. Filter by AI, dev or security and hit “load more”."] },
        "act": "goView:inicio", "chips": ["skills", "ayuda", "github"] },

      { "id": "tema", "k": ["tema", "color", "dark", "light", "paleta", "skin", "temas", "theme"],
        "a": { "es": ["Cinco temas: <b>terminal</b> (por defecto), <b>editor</b>, <b>matrix</b>, <b>CRT</b> y <b>synthwave</b>. Pulsa el botón de tema (arriba a la derecha) o <b>Ctrl/⌘ K</b> y escribe “tema”.", "El tema que uses se guarda en tu navegador. ¿Quieres que lo cambie yo? Dime cuál."], "en": ["Five themes: <b>terminal</b> (default), <b>editor</b>, <b>matrix</b>, <b>CRT</b> and <b>synthwave</b>. Hit the theme button (top right) or <b>Ctrl/⌘ K</b> and type “theme”.", "Your theme is saved in the browser. Want me to change it? Just tell me which."] },
        "act": "toggleTheme", "chips": ["idioma", "accesibilidad", "ayuda"] },

      { "id": "idioma", "k": ["idioma", "language", "english", "espanol", "español", "ingles", "inglés", "cambia idioma"],
        "a": { "es": ["Puedo cambiar entre <b>ES</b> y <b>EN</b>. Usa el botón del globo (arriba a la derecha) o <b>Ctrl/⌘ K</b>. Si me lo pides, lo cambio yo.", "Todo se adapta al idioma que elijas, incluyéndome yo."], "en": ["I can switch between <b>ES</b> and <b>EN</b>. Use the globe button (top right) or <b>Ctrl/⌘ K</b>. If you ask, I'll switch it for you.", "Everything adapts to your chosen language, me included."] },
        "act": "toggleLang", "chips": ["tema", "ayuda", "accesibilidad"] },

      { "id": "accesibilidad", "k": ["accesibilidad", "a11y", "teclado", "foco", "reduce motion", "accesible"],
        "a": { "es": ["La web respeta <b>prefers-reduced-motion</b>, tiene foco visible, skip link, roles ARIA y navegación por teclado. Los diálogos atrapan el foco.", "Pensada para teclado y lector de pantalla. Si ves algo raro, dime."], "en": ["The site honors <b>prefers-reduced-motion</b>, has visible focus, skip link, ARIA roles and keyboard navigation. Dialogs trap focus.", "Built for keyboard and screen readers. If something looks off, tell me."] },
        "chips": ["tema", "idioma", "ayuda"] },

      { "id": "github", "k": ["github", "repos", "repositorios", "codigo fuente", "código fuente", "source"],
        "a": { "es": ["Uso la API de GitHub con un token de solo lectura y <b>cache local</b>: si hay límite, te enseño el último dato guardado y el botón “Abrir GitHub”. En <b>Proyectos</b> están los repos y los commits en vivo.", "Mis repos van en Proyectos, con métricas del caso estrella (commits, lenguaje, estrellas, último push)."], "en": ["I use the GitHub API with a read-only token and a <b>local cache</b>: if rate-limited, I show the last saved data and an “Open GitHub” button. Repos and live commits are under <b>Projects</b>.", "My repos are in Projects, with featured-case metrics (commits, language, stars, last push)."] },
        "act": "openGitHub", "chips": ["proyectos", "cv", "contacto"] },

      { "id": "musica", "k": ["musica", "música", "player", "reproductor", "cancion", "canción", "song", "lofi", "radio"],
        "a": { "es": ["El <b>reproductor</b> usa la API de iTunes para previsualizar canciones (30s). Busca por género o por lo que quieras. El sonido de interfaz se silencia aparte, arriba a la izquierda.", "No es una web de música, es un extra. Pero funciona bien."], "en": ["The <b>player</b> uses the iTunes API for 30s previews. Search by genre or anything. Interface sound is muted separately, top-left.", "It's not a music site, it's an extra. But it works well."] },
        "act": "openPlayer", "chips": ["gusta", "arcade", "ayuda"] },

      { "id": "tiempo", "k": ["tiempo", "clima", "weather", "temperatura", "temperatura actual", "hace calor", "hace frio"],
        "a": { "es": ["Detrás detecto tu ciudad por IP y te pongo la temperatura real (Open-Meteo). Si no, uso Xàtiva como base. Lo ves en el pie de página.", "El clima es de verdad: tu ciudad + Open-Meteo."], "en": ["I detect your city by IP and show the real temperature (Open-Meteo). If that fails, I fall back to Xàtiva. You'll see it in the footer.", "The weather is real: your city + Open-Meteo."] },
        "chips": ["ubicacion", "ayuda", "noticias"] },

      { "id": "error", "k": ["error", "fallo", "bug", "roto", "no funciona", "no va", "broken", "doesn't work"],
        "a": { "es": ["¿Me dices qué no funciona? En la web hay noticias, arcade, test, chat y formulario. Si es un bug real, escríbemelo por <b>Contacto</b> y lo miro.", "Cuéntame el fallo con detalle (qué pulsas, qué esperas). Si es serio, te lo arreglo."], "en": ["Can you tell me what isn't working? The site has news, arcade, test, chat and a form. If it's a real bug, write it under <b>Contact</b> and I'll look.", "Describe the bug (what you click, what you expect). If it's serious, I'll fix it."] },
        "act": "goView:contacto", "chips": ["ayuda", "accesibilidad", "contacto"] },

      { "id": "gracias", "k": ["gracias", "thanks", "thx", "genial", "nice", "bien", "great", "perfecto"],
        "a": { "es": ["¡De nada! Y si quieres, prueba el <b>test de orientación</b> para ver por dónde tirar. 🚀", "A ti. Si te he ayudado, deja un 👍 en la respuesta. 👇"], "en": ["You're welcome! If you want, try the <b>orientation test</b> to see where to head. 🚀", "Thanks to you. If I helped, leave a 👍 on the answer. 👇"] },
        "chips": ["test", "arcade", "contacto"] },

      { "id": "adios", "k": ["adios", "adiós", "bye", "hasta luego", "chao", "see you", "nos vemos"],
        "a": { "es": ["¡Hasta luego! Si quieres, déjame un mensaje en <b>Contacto</b>.", "¡Chao! Aquí me tienes cuando quieras."], "en": ["See you later! If you want, leave me a message under <b>Contact</b>.", "Bye! I'm here whenever you want."] },
        "act": "goView:contacto", "chips": ["contacto", "ayuda", "test"] }
    ]
  },

  /* ---------- robot guía (mensajes por vista) ---------- */
  "robot": {
    "inicio": ["¡Hola! Prueba el <b>test de orientación</b> de abajo.", "Hi! Try the <b>orientation test</b> below."],
    "sobre": ["Aquí estoy: del hardware al código.", "This is me: from hardware to code."],
    "formacion": ["Primero SMR, ahora DAM. Paso natural.", "SMR first, DAM now. Natural step."],
    "servicios": ["Lo que puedo hacer por ti hoy.", "What I can do for you today."],
    "proyectos": ["Cosas reales, incluida esta web.", "Real stuff, including this site."],
    "gusta": ["Pulsa los corazones para guardar favoritos.", "Tap the hearts to save your faves."],
    "arcade": ["Esquiva rojos, coge verdes. ¡Vamos!", "Dodge reds, grab greens. Go!"],
    "contacto": ["Copia mi email o usa el formulario.", "Copy my email or use the form."]
  },

  /* ---------- misc UI en runtime ---------- */
  "ui": {
    "copied": ["Copiado", "Copied"], "loading": ["cargando…", "loading…"],
    "close": ["cerrar", "close"], "min": ["minimizar", "minimize"], "max": ["expandir", "expand"],
    "soundUi": ["Sonido de interfaz", "Interface sound"], "soundUiOn": ["Sonido de interfaz ON", "Interface sound ON"],
    "soundUiOff": ["Sonido de interfaz OFF", "Interface sound OFF"],
    "player": ["Reproductor", "Player"], "assistant": ["Asistente", "Assistant"],
    "top": ["Volver arriba", "Back to top"], "menu": ["Menú", "Menu"]
  }
};
