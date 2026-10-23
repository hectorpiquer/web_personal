/* ==========================================================================
   Diccionario bilingüe. Convención: cada valor es [español, inglés].
   Las colecciones dinámicas (frases, ticker, aficiones, test, chatbot,
   temas, textos de UI en runtime) llevan sus claves propias.
   ========================================================================== */
window.HP_I18N = {

  /* ---------- a11y / genérico ---------- */
  "a11y.skip":["Saltar al contenido","Skip to content"],
  "intro.skip":["saltar intro ⏭","skip intro ⏭"],

  /* ---------- header ---------- */
  "hdr.menu":["menú","menu"],
  "hdr.cmd":["Comandos (⌘K)","Commands (⌘K)"],
  "hdr.theme":["Cambiar tema","Change theme"],
  "nav.inicio":["inicio","home"],"nav.sobre":["sobre","about"],"nav.formacion":["formación","studies"],
  "nav.servicios":["servicios","services"],"nav.proyectos":["proyectos","projects"],"nav.gusta":["me gusta","likes"],
  "nav.arcade":["arcade","arcade"],"nav.contacto":["contacto","contact"],
  "nav.prev":["← anterior","← previous"],"nav.next":["siguiente →","next →"],

  /* ---------- hero ---------- */
  "hero.badge":["buscando FCT · ciclo hasta jun 2028","looking for internship · cycle ends Jun 2028"],
  "hero.tag":["Vengo del hardware. <em>Me voy al código.</em>","I come from hardware. <em>I'm going to code.</em>"],
  "hero.desc":["Estudio 1º de DAM en el IES Dr. Lluis Simarro (Xàtiva). Antes montaba y reparaba PCs en SMR; ahora quiero construir software. Busco un sitio donde aprender de verdad y aportar desde el primer día.","I'm in my first year of Multiplatform Application Development at IES Dr. Lluis Simarro (Xàtiva). I used to build and repair PCs in SMR; now I want to build software. I'm looking for a place to genuinely learn and to contribute from day one."],
  "hero.cta1":["conóceme","meet me"],"hero.cta2":["proyectos","projects"],"hero.cta3":["escríbeme","write me"],
  "hero.panelhint":["autora: yo","built by me"],

  /* ---------- CTA test ---------- */
  "quiz.ctaTitle":["Encuentra tu informática perfecta","Find your perfect kind of IT"],
  "quiz.ctaText":["Responde estas tres y te digo si esto va contigo. Si te pica, el test completo te da tu radar, tu ruta y por dónde empezar hoy.","Answer these three and I'll tell you if this is your thing. If it hooks you, the full test gives you your radar, your roadmap and where to start today."],
  "quiz.ctaBtn":["empezar test completo ▶","start full test ▶"],

  /* ---------- noticias ---------- */
  "news.title":["Últimas noticias · IA & programación","Latest news · AI & programming"],
  "news.sub":["// vía API pública de Hacker News · en tiempo real","// via the public Hacker News API · live"],
  "news.f.all":["todo","all"],"news.f.ai":["IA","AI"],"news.f.dev":["dev","dev"],"news.f.sec":["seguridad","security"],
  "news.reload":["↻ actualizar","↻ refresh"],"news.loading":["cargando noticias…","loading news…"],
  "news.error":["No pude cargar noticias ahora. Pulsa actualizar.","Couldn't load news right now. Hit refresh."],
  "news.empty":["Sin resultados para ese filtro.","No results for that filter."],
  "news.pts":["puntos","points"],"news.comments":["comentarios","comments"],

  /* ---------- sobre ---------- */
  "sobre.h2":["Sobre mí","About me"],
  "sobre.lead":["Empecé abriendo máquinas. Ahora abro código.","I started opening machines. Now I open code."],
  "sobre.p1":["Soy <strong>Héctor Piquer Belda</strong>, de Vallada, y estudio <strong>1º de DAM</strong> en el <strong>IES Dr. Lluis Simarro</strong>. Vengo de un Grado Medio de <strong>SMR</strong> que hice en el IES Sivera Font de Canals, donde aprendí a montar, mantener y diagnosticar equipos de verdad.","I'm <strong>Héctor Piquer Belda</strong>, from Vallada, studying <strong>year 1 of DAM</strong> at <strong>IES Dr. Lluis Simarro</strong>. I come from a mid-level degree in <strong>SMR</strong>, which I did at IES Sivera Font in Canals, where I learned to build, maintain and diagnose real hardware."],
  "sobre.p2":["El hardware me gustaba, pero lo que me enganchó fue entender qué pasaba por dentro. Por eso di el salto al desarrollo: quería dejar de arreglar máquinas y empezar a <strong>construir cosas</strong>.","I liked hardware, but what hooked me was understanding what happened inside. That's why I moved into development: I wanted to stop fixing machines and start <strong>building things</strong>."],
  "sobre.p3":["No voy de experto, no lo soy. Pero soy de los que se queda hasta que lo entiende, ordena el desastre y pregunta cuando hace falta. Prefiero algo sencillo bien hecho que algo prometedor a medias.","I don't claim to be an expert — I'm not. But I'm the kind who stays until it makes sense, tidies the mess and asks when needed. I'd rather ship something simple and well-made than something ambitious and half-done."],
  "sobre.quote":["\"Prefiero entender el porqué que memorizar el cómo.\"","\"I'd rather understand the why than memorize the how.\""],
  "sobre.now":["Ahora mismo","Right now"],
  "sobre.now1":["Aprendiendo","Learning"],"sobre.now2":["Leyendo","Reading"],"sobre.now3":["Buscando","Looking for"],
  "sobre.f1":["ciclo","program"],"sobre.f2":["centro","school"],"sobre.f3":["base","background"],
  "sobre.f4":["base","based in"],"sobre.f5":["fin ciclo","ends"],"sobre.f6":["busco","seeking"],

  /* ---------- formación ---------- */
  "form.h2":["Formación","Education"],
  "form.lead":["De la máquina al código, en dos pasos.","From machines to code, in two steps."],
  "form.i1w":["en curso","in progress"],"form.i1t":["Grado Superior · DAM","Higher Vocational · DAM"],
  "form.i1s":["IES Dr. Lluis Simarro · Desarrollo de Aplicaciones Multiplataforma","IES Dr. Lluis Simarro · Multiplatform Application Development"],
  "form.i1p":["Programación orientada a objetos, bases de datos, entornos de desarrollo y buenas prácticas. El salto natural desde SMR.","Object-oriented programming, databases, development environments and best practices. The natural step up from SMR."],
  "form.i2w":["terminado","completed"],"form.i2t":["Grado Medio · SMR","Mid-level Degree · SMR"],
  "form.i2s":["IES Sivera Font · Sistemas Microinformáticos y Redes","IES Sivera Font · Microcomputer Systems and Networks"],
  "form.i2p":["Ensamblaje, mantenimiento, instalación de sistemas y redes. La base técnica que me dio curiosidad por el software.","Assembly, maintenance, OS and network installation. The technical base that sparked my curiosity for software."],
  "form.c1":["Montaje","Assembly"],"form.c2":["Mantenimiento","Maintenance"],"form.c3":["Redes","Networks"],
  "form.skills":["Nivel (autoevaluación)","Level (self-assessment)"],
  "sk.solid":["Sólido","Solid"],"sk.run":["En marcha","Getting going"],"sk.new":["Por descubrir","To discover"],
  "sk.sys":["Sistemas / Redes","Systems / Networks"],"sk.fw":["Frameworks","Frameworks"],
  "form.callT":["Autodidacta.","Self-taught."],
  "form.callP":["Además de clase, practico por mi cuenta con proyectos pequeños —como esta web— para no quedarme solo en teoría.","Besides class, I practice on my own with small projects —like this site— so I don't stop at theory."],

  /* ---------- servicios ---------- */
  "serv.h2":["En qué puedo echarte una mano","How I can lend a hand"],
  "serv.lead":["Estoy empezando, así que no te prometo una solución integral. Esto es lo que sé hacer ya, y bien:","I'm just starting, so no all-in-one promises. This is what I can do already, and do well:"],
  "serv.1t":["Maquetar una web","Build a website"],"serv.1p":["Páginas en HTML y CSS, ordenadas, rápidas y que se vean bien en el móvil.","HTML and CSS pages, tidy, fast and good-looking on mobile."],
  "serv.2t":["Soporte y equipos","Support & hardware"],"serv.2p":["Montaje, mantenimiento y configuración de PCs y redes pequeñas. Esto lo traigo de SMR.","Building, maintaining and configuring PCs and small networks. This comes from SMR."],
  "serv.2c1":["Equipos","Hardware"],"serv.2c2":["Instalación","Setup"],
  "serv.3t":["Actualizar y cuidar","Update & maintain"],"serv.3p":["Dejar programas al día y organizar copias de seguridad para no perder nada.","Keep software up to date and organize backups so nothing gets lost."],
  "serv.3c2":["Configuración","Config"],
  "serv.4t":["Automatizar lo pesado","Automate the grind"],"serv.4p":["Guiones sencillos para que un trabajo repetitivo se haga solo.","Simple scripts so repetitive work runs itself."],
  "serv.4c2":["Tareas","Tasks"],
  "serv.5t":["Contenidos y manuales","Content & manuals"],"serv.5p":["Actualizar textos e imágenes y escribir guías claras para quien no sabe de esto.","Update text and images and write clear guides for non-technical people."],
  "serv.5c1":["Contenidos","Content"],"serv.5c2":["Manuales","Manuals"],
  "serv.6t":["Mejorar lo que ya tienes","Improve what you have"],"serv.6p":["Revisar una web o un equipo y dejarlo más ordenado, rápido y cómodo.","Review a site or a machine and leave it tidier, faster and easier to use."],
  "serv.6c1":["Revisión","Review"],"serv.6c2":["Optimizar","Optimize"],
  "serv.callT":["Honestidad primero.","Honesty first."],
  "serv.callP":["No prometo proyectos enormes: prometo que aprendo rápido, me organizo y me tomo en serio cada cosa, por pequeña que sea.","I don't promise huge projects: I promise I learn fast, I stay organized and I take every task seriously, no matter how small."],

  /* ---------- proyectos ---------- */
  "proj.h2":["Proyectos","Projects"],
  "proj.lead":["Lo que he tocado de verdad. De momento poco, pero real y mío.","What I've actually built. Little for now, but real and mine."],
  "proj.f.all":["todos","all"],"proj.f.web":["web","web"],"proj.f.java":["java","java"],"proj.f.pend":["pendientes","pending"],
  "proj.1t":["Esta web personal","This personal site"],"proj.done":["terminada","done"],"proj.done2":["terminado","done"],
  "proj.1p":["HTML, CSS y JS puros, sin frameworks. Tema de terminal, cinco paletas, bilingüe, accesible, responsive y con un arcade escrito a mano.","Pure HTML, CSS and JS, no frameworks. Terminal theme, five palettes, bilingual, accessible, responsive and with a hand-written arcade."],
  "proj.code":["ver código →","view code →"],
  "proj.2t":["Ejercicio de Java (BlueJ)","Java exercise (BlueJ)"],
  "proj.2p":["Práctica de clase: relleno un array de 100 enteros y calculo suma y media con métodos propios. Me sirvió para afianzar arrays, bucles y métodos estáticos.","Class exercise: I fill an array of 100 integers and compute sum and average with my own methods. It helped me solidify arrays, loops and static methods."],
  "proj.2c":["arrays","arrays"],"proj.showcode":["ver código","view code"],
  "proj.3t":["Prácticas FCT","Internship project"],"proj.todo":["pendiente","pending"],
  "proj.3p":["El proyecto de prácticas del ciclo. En cuanto empiece, irá aquí con su resumen, sus decisiones y su código.","The internship project for the cycle. As soon as it starts, it'll go here with its summary, decisions and code."],
  "proj.3c":["por definir","to be defined"],
  "proj.empty":["No hay proyectos con ese filtro todavía.","No projects match that filter yet."],

  /* ---------- caso ---------- */
  "case.title":["Caso estrella: esta web como proyecto","Featured case: this site as a project"],
  "case.p":["Problema","Problem"],
  "case.pt":["Quería mostrar un perfil técnico —base SMR, DAM en curso— sin parecer plantilla vacía ni cajón de cosas sin hilo. Hacía falta una sola voz, y la mía venía de sistemas.","I wanted to show a technical profile —SMR background, DAM in progress— without looking like an empty template or a grab-bag of random stuff. It needed one voice, and mine comes from systems."],
  "case.s":["Solución","Solution"],
  "case.st":["Mono-página con secciones por hash, fondo de nodos en canvas que habla de redes sin ser decorativo, intro de terminal que explica quién soy en dos segundos, cuatro APIs públicas sin clave (Hacker News, Open-Meteo, GitHub, iTunes), test de orientación con radar, arcade propio y formulario real. Todo con <em>prefers-reduced-motion</em>, foco atrapado en diálogos y semántica accesible.","Single page with hash sections, a canvas node background that speaks of networks without being decorative, a terminal intro that explains who I am in two seconds, four keyless public APIs (Hacker News, Open-Meteo, GitHub, iTunes), an orientation test with a radar chart, a custom arcade and a real form. Everything honors <em>prefers-reduced-motion</em>, traps focus in dialogs and uses accessible semantics."],
  "case.r":["Resultado","Result"],
  "case.m1":["commits","commits"],"case.m2":["lenguajes","languages"],"case.m3":["estrellas","stars"],
  "case.m4":["último push","last push"],"case.m5":["Lighthouse","Lighthouse"],

  /* ---------- github ---------- */
  "gh.title":["mis repos, en vivo","my repos, live"],
  "gh.loading":["cargando repos…","loading repos…"],
  "gh.error":["No pude leer GitHub ahora (límite de API anónima). Reintenta en unos minutos.","Couldn't read GitHub right now (anonymous API limit). Try again in a few minutes."],
  "gh.empty":["Públicamente aún no tengo repos con ese criterio.","I don't have public repos matching that yet."],
  "gh.note":["// API pública de GitHub · sin clave","// public GitHub API · no key"],
  "gh.rate":["(límite de peticiones anónimas)","(anonymous rate limit)"],

  /* ---------- me gusta ---------- */
  "likes.h2":["Me gusta","Things I like"],
  "likes.lead":["Lo que hago cuando cierro el editor. Sin postureo: esto es lo que de verdad me llena el fin de semana.","What I do when I close the editor. No posing: this is what actually fills my weekends."],
  "likes.f.all":["todo","all"],"likes.f.screen":["pantalla","screen"],"likes.f.sport":["deporte","sport"],
  "likes.f.street":["calle","street"],"likes.f.table":["mesa","table"],
  "likes.note":["// pulsa el corazón para guardarlo: se queda en tu navegador, no en ningún servidor","// tap the heart to save it: it stays in your browser, not on any server"],
  "likes.save":["guardar","save"],"likes.saved":["guardado","saved"],

  /* ---------- arcade ---------- */
  "arc.h2":["Arcade","Arcade"],
  "arc.lead":["Un extra hecho a mano: esquiva los <b class=\"red\">tokens de error</b> y coge los <b class=\"green\">tokens de código</b>. Puro canvas, sin librerías, sin imágenes.","A hand-made extra: dodge the <b class=\"red\">error tokens</b> and grab the <b class=\"green\">code tokens</b>. Pure canvas, no libraries, no images."],
  "arc.normal":["modo normal","normal mode"],
  "arc.help":["Muévete con ← → (o A/D). En móvil, arrastra el dedo sobre el tablero. <kbd>P</kbd> pausa, <kbd>M</kbd> silencio.","Move with ← → (or A/D). On mobile, drag your finger on the board. <kbd>P</kbd> pause, <kbd>M</kbd> mute."],
  "arc.lg1":["token de código · +puntos y combo","code token · +points & combo"],
  "arc.lg2":["token de error · fin de partida","error token · game over"],
  "arc.lg3":["power-up · escudo, imán, slow-mo, ×2","power-up · shield, magnet, slow-mo, ×2"],
  "arc.play":["jugar ▶","play ▶"],"arc.pause":["pausa ⏸","pause ⏸"],"arc.resume":["seguir ▶","resume ▶"],
  "arc.sound":["sonido off","sound off"],"arc.soundOn":["sonido on","sound on"],
  "arc.top":["top 5 local","local top 5"],
  "arc.hud.score":["score","score"],"arc.hud.level":["nivel","level"],"arc.hud.combo":["combo","combo"],"arc.hud.best":["récord","best"],
  "arc.gameover":["GAME OVER","GAME OVER"],"arc.press":["pulsa para jugar","press to play"],
  "arc.newrec":["¡nuevo récord!","new record!"],
  "arc.pw.shield":["escudo","shield"],"arc.pw.magnet":["imán","magnet"],"arc.pw.slow":["slow-mo","slow-mo"],"arc.pw.x2":["×2","×2"],

  /* ---------- contacto ---------- */
  "cont.h2":["Contacto","Contact"],
  "cont.p":["¿Prácticas, una idea o solo saludar? Escríbeme y te contesto en cuanto pueda.","Internship, an idea or just saying hi? Write me and I'll reply as soon as I can."],
  "cont.github":["github","github"],"cont.email":["email ▾","email ▾"],"cont.copy":["Copiar correo","Copy email"],
  "cont.cv":["CV ↓","CV ↓"],
  "cont.legend":["enviar_mensaje.py","send_message.py"],
  "cont.name":["nombre","name"],"cont.company":["empresa (opcional)","company (optional)"],
  "cont.mail":["tu correo","your email"],"cont.subject":["concepto","subject"],"cont.choose":["elige","choose"],
  "cont.o1":["Prácticas / FCT","Internship / FCT"],"cont.o2":["Colaboración","Collaboration"],
  "cont.o3":["Consulta","Query"],"cont.o4":["Otro","Other"],"cont.msg":["mensaje","message"],"cont.send":["enviar ▶","send ▶"],
  "cont.privacy":["// Solo uso tus datos para responderte. Nada de listas de correo ni terceros.","// I only use your data to reply. No mailing lists, no third parties."],
  "cont.where":["Dónde encontrarme","Where to find me"],
  "cont.maps":["// Estudio en el IES Dr. Lluis Simarro (Xàtiva). Si te encaja mi perfil, aquí me tienes:","// I study at IES Dr. Lluis Simarro (Xàtiva). If my profile fits, here I am:"],
  "cont.copied":["Correo copiado al portapapeles","Email copied to clipboard"],
  "cont.formOk":["¡Mensaje enviado! Te respondo pronto.","Message sent! I'll reply soon."],
  "cont.formErr":["Revisa los campos marcados.","Please check the marked fields."],
  "cont.sending":["enviando…","sending…"],

  /* ---------- footer ---------- */
  "ft.made":["hecho a mano","hand-made"],"ft.tech":["html · css · js, sin frameworks","html · css · js, no frameworks"],

  /* ---------- temas ---------- */
  "theme.terminal":["Terminal","Terminal"],"theme.editor":["Editor","Editor"],
  "theme.matrix":["Matrix","Matrix"],"theme.crt":["CRT Ámbar","Amber CRT"],"theme.synth":["Synthwave","Synthwave"],
  "theme.terminal.d":["verde sobre azul noche","green on midnight blue"],"theme.editor.d":["claro, modo GitHub","light, GitHub mode"],
  "theme.matrix.d":["verde fósforo","phosphor green"],"theme.crt.d":["ámbar retro","retro amber"],"theme.synth.d":["neón ochentero","80s neon"],

  /* ---------- paleta de comandos ---------- */
  "pal.placeholder":["escribe un comando o una sección…","type a command or a section…"],
  "pal.go":["ir a","go to"],"pal.theme":["tema","theme"],"pal.lang":["idioma","language"],
  "pal.sound":["sonido","sound"],"pal.action":["acción","action"],"pal.empty":["sin resultados","no results"],
  "pal.hint":["Ir","Go"],

  /* ---------- frases del typewriter (arrays) ---------- */
  "phrases":{
    "es":["Estudiante de 1º de DAM · IES Dr. Lluis Simarro","Vengo de SMR: hardware, redes y soporte","Front-end en HTML/CSS/JS · back en Java/SQL","Buscando FCT para el curso 2027-28","Prefiero entender el porqué al memorizar"],
    "en":["Year 1 of Multiplatform App Dev · IES Dr. Lluis Simarro","From SMR: hardware, networks & support","Front-end in HTML/CSS/JS · back in Java/SQL","Looking for an internship for 2027-28","I'd rather understand the why than memorize"]
  },

  /* ---------- ticker (arrays) ---------- */
  "ticker":{
    "es":["HTML","CSS","JavaScript","Java","SQL","Git","Linux","Windows","Redes","Montaje","Mantenimiento","Backups","BlueJ","VS Code","Accesibilidad","Responsive"],
    "en":["HTML","CSS","JavaScript","Java","SQL","Git","Linux","Windows","Networks","Assembly","Maintenance","Backups","BlueJ","VS Code","Accessibility","Responsive"]
  },

  /* ---------- aficiones ---------- */
  "likes_data":[
    {id:"gym",cat:"deporte",emoji:"🏋️",color:"#f472b6",int:5,
      es:["Gimnasio","Entreno casi a diario. Me ayuda a desconectar del portátil y a mantener la cabeza ordenada. La constancia aquí se parece a programar: poco a poco y sin faltar."],
      en:["Gym","I train almost every day. It helps me unplug from the laptop and keep my head clear. Consistency here looks a lot like coding: little by little and never skipping."]},
    {id:"futbol",cat:"deporte",emoji:"⚽",color:"#34d399",int:3,
      es:["Fútbol","Ya no juego, pero me encanta verlo: los partidos del finde y el juego en equipo. En el código y en el campo funciona igual."],
      en:["Football","I don't play anymore, but I love watching it: weekend matches and team play. It works the same in code and on the pitch."]},
    {id:"motos",cat:"calle",emoji:"🏍️",color:"#fbbf24",int:5,
      es:["Moto","Vengo de desmontar cosas, así que la moto me viene de serie. La mecánica, la ruta y ese silencio de ir pensando sin pantallas."],
      en:["Motorbike","I come from taking things apart, so the bike feels natural. The mechanics, the route and that silence of riding while you think, no screens."]},
    {id:"videojuegos",cat:"pantalla",emoji:"🎮",color:"#a78bfa",int:5,
      es:["Videojuegos","Me gusta jugarlos, nunca he pensado en hacerlos. Juego de todo, pero me quedo con los que tienen buenas ideas."],
      en:["Video games","I like playing them — I never thought of making them. I play anything, but the ones with great ideas win."]},
    {id:"pc",cat:"pantalla",emoji:"💻",color:"#34d399",int:5,
      es:["PC & hardware","Montar, optimizar, diagnosticar. Es la raíz de todo: SMR me enseñó el porqué y ahora lo llevo al software."],
      en:["PC & hardware","Building, tuning, diagnosing. It's the root of it all: SMR taught me the why, and now I take it into software."]},
    {id:"codi",cat:"pantalla",emoji:"👨‍💻",color:"#fbbf24",int:5,
      es:["Programar","Lo que más. Aprender, romper cosas, arreglarlas y entender el porqué. Esta web es mi cuaderno de prácticas."],
      en:["Coding","The big one. Learning, breaking things, fixing them and understanding why. This site is my practice notebook."]},
    {id:"musica",cat:"mesa",emoji:"🎧",color:"#f472b6",int:4,
      es:["Música","De fondo para concentrarme y de cabeza para desconectar. El reproductor de esta web tiene mis gustos a un clic."],
      en:["Music","As background to focus and as a way to switch off. The player on this site has my taste one click away."]}
  ],

  /* ---------- test de orientación ---------- */
  "quiz_data":{
    "intro":{"es":"Te hago seis preguntas rápidas. Responde con lo que de verdad harías, no con lo que crees que suena bien.","en":"I'll ask six quick questions. Answer with what you'd really do, not what sounds good."},
    "questions":[
      {q:{es:"Abres un ordenador que no enciende. ¿Qué sientes?",en:"You open a PC that won't boot. What do you feel?"},
        opts:[{t:{es:"Curiosidad por descubrir la avería",en:"Curiosity to find the fault"},w:{soporte:3,redes:2}},
              {t:{es:"Ganas de reinstalar y dejarlo limpio",en:"Urge to reinstall and clean it up"},w:{soporte:2,datos:1}},
              {t:{es:"Me aburre; prefiero el software",en:"It bores me; I prefer software"},w:{front:2,back:2}}]},
      {q:{es:"Te dan a elegir: ¿qué proyecto te llama más?",en:"If you had to pick, which project excites you most?"},
        opts:[{t:{es:"Una web bonita que la gente use",en:"A beautiful site people use"},w:{front:3}},
              {t:{es:"Una app que guarde y procese datos",en:"An app that stores and processes data"},w:{back:3,datos:2}},
              {t:{es:"Montar una red que funcione",en:"Setting up a network that works"},w:{redes:3,soporte:1}},
              {t:{es:"Un panel con estadísticas y gráficos",en:"A dashboard with stats and charts"},w:{datos:3}}]},
      {q:{es:"¿Qué te sale más natural?",en:"What comes more naturally to you?"},
        opts:[{t:{es:"Diseñar y cuidar el detalle visual",en:"Designing and polishing visuals"},w:{front:3}},
              {t:{es:"Ordenar la lógica y la estructura",en:"Organizing logic and structure"},w:{back:3,datos:1}},
              {t:{es:"Configurar y dejarlo funcionando",en:"Configuring until it runs"},w:{soporte:3,redes:2}}]},
      {q:{es:"¿Cómo aprendes mejor?",en:"How do you learn best?"},
        opts:[{t:{es:"Maquetando y tocando estilos",en:"Building layouts and tweaking styles"},w:{front:3}},
              {t:{es:"Escribiendo funciones y clases",en:"Writing functions and classes"},w:{back:3}},
              {t:{es:"Analizando datos y sacando conclusiones",en:"Analyzing data and drawing conclusions"},w:{datos:3}},
              {t:{es:"Manchándome las manos con hardware/redes",en:"Getting my hands dirty with hardware/networks"},w:{redes:2,soporte:3}}]},
      {q:{es:"Una tarea repetitiva aparece. Tu instinto:",en:"A repetitive task shows up. Your instinct:"},
        opts:[{t:{es:"Hacer un guion que la haga sola",en:"Write a script to do it for me"},w:{datos:2,back:2}},
              {t:{es:"Automatizarlo en el sistema",en:"Automate it at the system level"},w:{soporte:2,redes:2}},
              {t:{es:"Mejorar la interfaz para que cueste menos",en:"Improve the UI so it's less painful"},w:{front:3}}]},
      {q:{es:"¿Dónde te ves en dos años?",en:"Where do you see yourself in two years?"},
        opts:[{t:{es:"Haciendo interfaces que se disfrutan",en:"Building interfaces people enjoy"},w:{front:3}},
              {t:{es:"Programando el motor de una app",en:"Programming an app's engine"},w:{back:3}},
              {t:{es:"Sacando valor de los datos",en:"Pulling value out of data"},w:{datos:3}},
              {t:{es:"Manteniendo la infraestructura que todo usa",en:"Keeping the infrastructure running"},w:{redes:3,soporte:2}}]}
    ],
    "profiles":{
      front:{name:{es:"Desarrollo Front-end",en:"Front-end Development"},tag:"HTML · CSS · JavaScript · UX",
        why:{es:"Te tira el producto final y el detalle visual. Vienes del hardware, así que entiendes el sistema, pero disfrutas cuando algo se ve y se siente bien. Tu sitio: interfaz, accesibilidad y experiencia.",en:"You're drawn to the end product and the visual detail. You come from hardware, so you get the system, but you light up when something looks and feels right. Your place: interface, accessibility and experience."},
        route:{es:["Consolida CSS (Grid/Flexbox) y accesibilidad","Aprende un framework: Vue o React","Haz 3 proyectos reales de interfaz","Estudia UX básica y rendimiento"],en:["Solidify CSS (Grid/Flexbox) and a11y","Learn a framework: Vue or React","Build 3 real interface projects","Study basic UX and performance"]},
        first:{es:"Rehaz una landing responsive y accesible en una tarde.",en:"Rebuild a responsive, accessible landing page in an afternoon."}},
      back:{name:{es:"Desarrollo Back-end",en:"Back-end Development"},tag:"Java · SQL · APIs · lógica",
        why:{es:"Te gusta ordenar la lógica y que las cosas tengan sentido por dentro. El DAM encaja perfecto: Java, bases de datos y arquitectura. Tu sitio: el motor de la aplicación.",en:"You like organizing logic and making things make sense inside. DAM fits perfectly: Java, databases and architecture. Your place: the engine of the application."},
        route:{es:["Java a fondo: POO, colecciones, excepciones","Bases de datos relacionales y SQL","APIs REST y autenticación","Testing y control de versiones"],en:["Deepen Java: OOP, collections, exceptions","Relational databases and SQL","REST APIs and authentication","Testing and version control"]},
        first:{es:"Monta una API sencilla con Spring Boot que guarde tareas.",en:"Build a simple Spring Boot API that stores tasks."}},
      datos:{name:{es:"Datos & Analítica",en:"Data & Analytics"},tag:"SQL · Python · visualización",
        why:{es:"Te mola sacar conclusiones y ver patrones donde otros ven ruido. Es un puente natural desde tu base técnica. Tu sitio: datos, informes y decisiones.",en:"You love drawing conclusions and seeing patterns where others see noise. It's a natural bridge from your technical base. Your place: data, reports and decisions."},
        route:{es:["SQL avanzado y modelado de datos","Python para análisis (pandas)","Visualización y storytelling","Fundamentos de estadística"],en:["Advanced SQL and data modeling","Python for analysis (pandas)","Visualization and storytelling","Statistics fundamentals"]},
        first:{es:"Analiza un dataset público y saca 3 conclusiones en un gráfico.",en:"Analyze a public dataset and turn it into 3 chart-backed takeaways."}},
      redes:{name:{es:"Redes & Infraestructura",en:"Networks & Infrastructure"},tag:"Linux · redes · cloud",
        why:{es:"Tu raíz SMR es aquí oro: montar, configurar y dejarlo funcionando. El salto es a redes avanzadas, Linux y cloud. Tu sitio: la base que sostiene todo.",en:"Your SMR root is gold here: build, configure and keep it running. The step up is advanced networks, Linux and cloud. Your place: the foundation that holds everything."},
        route:{es:["Linux a fondo y línea de comandos","Redes: DNS, DHCP, VLAN, firewalls","Virtualización y contenedores","Cloud (AWS/Azure) y automatización"],en:["Deep Linux and the command line","Networks: DNS, DHCP, VLAN, firewalls","Virtualization and containers","Cloud (AWS/Azure) and automation"]},
        first:{es:"Levanta un servidor Linux con un servicio web y cópialo de seguridad.",en:"Stand up a Linux server with a web service and set up a backup."}},
      soporte:{name:{es:"Soporte & Sistemas",en:"Support & Systems"},tag:"hardware · helpdesk · IT",
        why:{es:"Te resuelve la vida arreglar lo que falla y que la gente te lo agradezca. Es tu zona de confort de SMR; el crecimiento es hacia sistemas y administración. Tu sitio: hacer que todo funcione.",en:"You find it satisfying to fix what breaks and have people thank you for it. It's your SMR comfort zone; growth is toward systems and admin. Your place: making everything work."},
        route:{es:["Certifícate en Windows/Linux (fundamentos)","Ayuda IT y documentación","Automatiza tareas con scripts","Camino a administración de sistemas"],en:["Get a Windows/Linux fundamentals cert","IT helpdesk and documentation","Automate tasks with scripts","Path to systems administration"]},
        first:{es:"Escribe una guía de resolución de problemas para tu entorno.",en:"Write a troubleshooting guide for your environment."}}
    }
  },

  /* ---------- chatbot ---------- */
  "chat":{
    "greet":["¡Hola! Soy el asistente de la web de Héctor. Pregúntame lo que quieras 👇","Hi! I'm the site's assistant. Ask me anything 👇"],
    "fallback":["No tengo esa respuesta en mi base. Prueba con: <b>Quién eres</b>, <b>Qué sabes</b>, <b>Formación</b>, <b>Proyectos</b>, <b>Me gusta</b>, <b>Contacto</b> o <b>Arcade</b>.","I don't have that answer yet. Try: <b>Who are you</b>, <b>What do you know</b>, <b>Education</b>, <b>Projects</b>, <b>Likes</b>, <b>Contact</b> or <b>Arcade</b>."],
	"chips":{"es":["Qué sabes","Proyectos","Contacto"],"en":["What do you know","Projects","Contact"]},
    "rules":[
      {re:/(hola|hey|hi|buenas|saludos|hello)/i,
        r:["¡Hola! Encantado de que estés aquí. ¿Qué quieres saber?","¡Hey! Great to have you. What do you want to know?"]},
      {re:/(qu[ée]n eres|who are you|tu eres|t[ú] eres|hector|héctor)/i,
        r:["Soy <b>Héctor Piquer Belda</b>, de Vallada. Estudiante de <b>1º de DAM</b> con base de <b>SMR</b>. Vengo del hardware y me voy al código.","I'm <b>Héctor Piquer Belda</b>, from Vallada. <b>Year-1 DAM</b> student with a <b>SMR</b> background. From hardware, heading to code."]},
      {re:/(qu[ée] sabes|skills|habilidades|tecnolog[íi]as|stack|what do you know)/i,
        r:["Ahora mismo: <b>HTML, CSS, JavaScript</b> (front), <b>Java</b> y <b>SQL</b> (back), más <b>Git, Linux, redes y soporte</b> de mi etapa SMR. Estoy por descubrir frameworks.","Right now: <b>HTML, CSS, JavaScript</b> (front), <b>Java</b> and <b>SQL</b> (back), plus <b>Git, Linux, networks and support</b> from my SMR days. Frameworks are next."]},
      {re:/(formaci[óo]n|estudio|dónde estudias|dam|smr|school|education|study)/i,
        r:["Estudio <b>1º de DAM</b> en el <b>IES Dr. Lluis Simarro</b>. Antes hice <b>SMR</b> (Sistemas Microinformáticos y Redes) en el IES Sivera Font. El ciclo acaba en <b>jun 2028</b>.","I'm in <b>year 1 of DAM</b> at <b>IES Dr. Lluis Simarro</b>. Before that, <b>SMR</b> (Microcomputer Systems & Networks) at IES Sivera Font. The cycle ends <b>Jun 2028</b>."]},
      {re:/(proyecto|projects|web|github|portafolio|portfolio)/i,
        r:["Lo más real: <b>esta web</b> (HTML/CSS/JS puro, con arcade propio) y prácticas de <b>Java</b> en BlueJ. En <b>Proyectos</b> tienes el detalle y mis repos en vivo.","The most real: <b>this site</b> (pure HTML/CSS/JS, with my own arcade) and <b>Java</b> exercises in BlueJ. Go to <b>Projects</b> for details and live repos."]},
      {re:/(me gusta|afici|likes|hobby|gimnasio|moto|f[úu]tbol|videojuegos)/i,
        r:["Gimnasio, fútbol, moto, videojuegos, PC y, sobre todo, <b>programar</b>. Toca el corazón de cada tarjeta para guardarlo.","Gym, football, motorbike, video games, PC and above all <b>coding</b>. Tap the heart on each card to save it."]},
      {re:/(contacto|email|correo|escribe|write|fct|pr[áa]cticas|internship)/i,
        r:["Mi correo es <b>hecpiqbel@alu.edu.gva.es</b>. Busco <b>FCT</b> para el curso 2027-28. En <b>Contacto</b> tienes el formulario.","My email is <b>hecpiqbel@alu.edu.gva.es</b>. I'm looking for an <b>internship</b> for 2027-28. The form is under <b>Contact</b>."]},
      {re:/(arcade|juego|game|score|jug|play)/i,
        r:["Tengo un <b>arcade</b> hecho a mano en canvas: esquiva los tokens de error y coge los de código. Con power-ups y récord local.","I have a hand-made <b>arcade</b> in canvas: dodge error tokens, grab code tokens. With power-ups and a local record."]},
      {re:/(tema|color|dark|light|skin)/i,
        r:["Cinco temas: <b>terminal, editor, matrix, CRT y synthwave</b>. Pulsa el botón de tema o <b>⌘K</b> y escribe 'tema'.","Five themes: <b>terminal, editor, matrix, CRT and synthwave</b>. Hit the theme button or press <b>⌘K</b> and type 'tema'."]},
      {re:/(gracias|thanks|thx|genial|nice)/i,
        r:["¡De nada! Y si quieres, prueba el test de orientación para ver por dónde tirar. 🚀","You're welcome! If you want, try the orientation test to see where to head. 🚀"]},
      {re:/(test|orientaci|br[úu]jula|radar|perfil)/i,
        r:["El <b>test</b> te da tu perfil (front, back, datos, redes o soporte) con un radar, una ruta y un primer paso. Está en la sección de inicio.","The <b>test</b> gives you your profile (front, back, data, networks or support) with a radar, a roadmap and a first step. It's on the home view."]}
    ]
  }
};
