(function () {
  "use strict";

  /* ===== arranque ===== */
  var html = document.documentElement;
  html.classList.remove("no-js");
  html.classList.add("js");
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.getElementById("y").textContent = new Date().getFullYear();

  /* ===== loader de inicio ===== */
  var loader = document.getElementById("loader");
  function hideLoader() {
    if (!loader) return;
    loader.classList.add("hidden");
    setTimeout(function () { loader.style.display = "none"; }, 700);
  }
  if (reduce) {
    hideLoader();
  } else {
    window.addEventListener("load", function () {
      setTimeout(hideLoader, 450);
    });
    /* por si el load tarda, corte de seguridad */
    setTimeout(hideLoader, 2500);
  }

  /* ===== tema (oscuro por defecto, claro "editor") ===== */
  function setTheme(t) {
    html.setAttribute("data-theme", t);
    try { localStorage.setItem("hp-theme", t); } catch (e) {}
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", t === "dark" ? "#0a0f1c" : "#fafbfc");
  }
  var guardado;
  try { guardado = localStorage.getItem("hp-theme"); } catch (e) {}
  setTheme(guardado || html.getAttribute("data-theme") || "dark");
  var th = document.querySelector(".th");
  if (th) th.addEventListener("click", function () {
    setTheme(html.getAttribute("data-theme") === "dark" ? "light" : "dark");
  });

  /* ===== navegación por vistas (hash + hashchange) ===== */
  var views = [].slice.call(document.querySelectorAll(".view"));
  var links = [].slice.call(document.querySelectorAll(".nav a"));
  var nav = document.getElementById("nav");
  var burger = document.querySelector(".burger");
  var ink = document.querySelector(".nav-ink");

  function closeNav() {
    if (!nav) return;
    nav.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
  }
  burger.addEventListener("click", function () {
    var o = nav.classList.contains("open");
    nav.classList.toggle("open", !o);
    burger.setAttribute("aria-expanded", o ? "false" : "true");
  });

  function moveInk(a) {
    if (!a || reduce || !ink) return;
    var r = a.getBoundingClientRect(), p = nav.getBoundingClientRect();
    ink.style.width = r.width + "px";
    ink.style.transform = "translateX(" + (r.left - p.left) + "px)";
  }

  function show(id) {
    var t = document.getElementById(id);
    if (!t || !t.classList.contains("view")) t = views[0];

    /* ocultar todas y mostrar la activa reiniciando la animación */
    views.forEach(function (v) { v.hidden = (v !== t); });
    t.hidden = false;
    t.classList.remove("in");
    void t.offsetWidth; /* reflow para reiniciar @keyframes */
    t.classList.add("in");

    /* marcar enlace activo + subrayado */
    links.forEach(function (a) {
      var on = a.getAttribute("href") === "#" + t.id;
      a.classList.toggle("on", on);
      if (on) moveInk(a);
    });

    closeNav();
    scrollTo(0, 0);

    /* animar barras de nivel si la vista las tiene */
    [].forEach.call(t.querySelectorAll(".bar>i"), function (b) {
      b.style.width = "0";
      requestAnimationFrame(function () {
        requestAnimationFrame(function () { b.style.width = b.dataset.w + "%"; });
      });
    });
  }

  /* enlaces del menú */
  links.forEach(function (a) {
    a.addEventListener("click", function (e) {
      e.preventDefault();
      var id = a.getAttribute("href").slice(1);
      if (location.hash.slice(1) === id) show(id); else location.hash = id;
    });
  });

  /* enlaces tipo botón que apuntan a una vista (incluye anterior/siguiente) */
  document.querySelectorAll(".btn[href^='#']").forEach(function (a) {
    a.addEventListener("click", function (e) {
      e.preventDefault();
      var id = a.getAttribute("href").slice(1);
      if (location.hash.slice(1) === id) show(id); else location.hash = id;
    });
  });

  window.addEventListener("hashchange", function () {
    show(location.hash.slice(1) || "inicio");
  });
  addEventListener("resize", function () {
    moveInk(document.querySelector(".nav a.on"));
  });

  /* ===== typing de roles (hero) ===== */
  var roles = [
    "desarrollador en formación",
    "estudiante de 1º DAM",
    "el que repara y luego programa",
    "buscando FCT"
  ];
  var tp = document.getElementById("type"), ri = 0, ci = 0, del = false;
  function tw() {
    var w = roles[ri];
    tp.textContent = w.slice(0, ci);
    if (!del && ci < w.length) { ci++; setTimeout(tw, 55); }
    else if (!del) { del = true; setTimeout(tw, 1400); }
    else if (ci > 0) { ci--; setTimeout(tw, 28); }
    else { del = false; ri = (ri + 1) % roles.length; setTimeout(tw, 300); }
  }
  if (reduce) { tp.textContent = roles[0]; } else { tw(); }

  /* ===== barra de progreso + volver arriba ===== */
  var bar = document.getElementById("bar");
  var top = document.querySelector(".top");
  function onScroll() {
    var m = html.scrollHeight - html.clientHeight;
    bar.style.width = (m > 0 ? (html.scrollTop / m) * 100 : 0) + "%";
    top.hidden = html.scrollTop < 500;
  }
  addEventListener("scroll", onScroll, { passive: true });
  top.addEventListener("click", function () { scrollTo(0, 0); });

  /* ===== parallax suave del panel del hero ===== */
  var panel = document.querySelector(".hero .panel");
  if (!reduce && panel) {
    addEventListener("scroll", function () {
      var y = html.scrollTop;
      if (y < 600) panel.style.transform = "translateY(" + (y * -0.05) + "px)";
    }, { passive: true });
  }

  /* ===== formulario -> mailto ===== */
  var f = document.getElementById("form");
  f.addEventListener("submit", function (e) {
    e.preventDefault();
    function g(i) { return document.getElementById(i).value.trim(); }
    var n = g("n"), em = g("e"), c = g("c"), t = g("t"), m = g("m");
    var as = t + (em ? " · " + em : "") + " — " + n;
    var b = "Nombre: " + n + "\nEmpresa: " + (em || "—") +
            "\nConcepto: " + t + "\nCorreo: " + c + "\n\nMensaje:\n" + m;
    location.href = "mailto:hecpiqbel@alu.edu.gva.es?subject=" +
                    encodeURIComponent(as) + "&body=" + encodeURIComponent(b);
  });

  /* ===== ARCADE (canvas, tema terminal) ===== */
  var cv = document.getElementById("game");
  var ctx = cv.getContext("2d");
  var play = document.getElementById("play");
  var scoreEl = document.getElementById("score");
  var W = cv.width, H = cv.height, car, obs, sc, run = false, raf = 0, spd = 2.4;
  var BAD = [";", "null", "//", "{", "}", "bug", "<div>", "NaN"];
  var GOOD = ["git", "ok", "push", "fn", "=>"];
  function pick(a) { return a[Math.floor(Math.random() * a.length)]; }

  function bumpScore() {
    if (reduce) return;
    scoreEl.classList.remove("bump");
    void scoreEl.offsetWidth;
    scoreEl.classList.add("bump");
  }

  function reset() {
    car = { x: W / 2 - 14, y: H - 52, w: 28, h: 34 };
    obs = []; sc = 0; spd = 2.4; scoreEl.textContent = "0";
  }
  function spawn() {
    var good = Math.random() < 0.28;
    var txt = good ? pick(GOOD) : pick(BAD);
    var w = txt.length * 9 + 14;
    obs.push({ x: Math.random() * (W - w), y: -30, w: w, h: 24, txt: txt, good: good });
  }
  function key(e) {
    if (!run) return;
    var k = e.key;
    if (k === "ArrowLeft" || k === "a") car.x -= 18;
    if (k === "ArrowRight" || k === "d") car.x += 18;
    car.x = Math.max(4, Math.min(W - car.w - 4, car.x));
    if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", " "].indexOf(k) > -1) e.preventDefault();
  }
  function touch(e) {
    if (!run) return;
    var r = cv.getBoundingClientRect();
    var x = (e.touches[0].clientX - r.left) / r.width;
    car.x = x < 0.5 ? car.x - 14 : car.x + 14;
    car.x = Math.max(4, Math.min(W - car.w - 4, car.x));
    e.preventDefault();
  }
  function loop() {
    ctx.fillStyle = "#060b14"; ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = "rgba(52,211,153,.12)"; ctx.lineWidth = 2;
    ctx.setLineDash([8, 12]); ctx.lineDashOffset = -(Date.now() / 28 % 20);
    ctx.beginPath(); ctx.moveTo(W / 2, 0); ctx.lineTo(W / 2, H); ctx.stroke();
    ctx.setLineDash([]);
    if (Math.random() < 0.028 + sc * 0.0005) spawn();
    ctx.font = "bold 15px monospace"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
    for (var i = obs.length - 1; i >= 0; i--) {
      var o = obs[i]; o.y += spd;
      ctx.fillStyle = o.good ? "#34d399" : "#f87171";
      ctx.fillRect(o.x, o.y, o.w, o.h);
      ctx.fillStyle = o.good ? "#04120c" : "#1a0505";
      ctx.fillText(o.txt, o.x + o.w / 2, o.y + o.h / 2);
      if (o.y > H) {
        obs.splice(i, 1);
        if (o.good) { sc += 2; scoreEl.textContent = sc; bumpScore(); if (spd < 7) spd += 0.05; }
      }
      if (car.x < o.x + o.w && car.x + car.w > o.x && car.y < o.y + o.h && car.y + car.h > o.y) {
        if (o.good) {
          sc += 3; scoreEl.textContent = sc; bumpScore(); obs.splice(i, 1);
        } else { over(); return; }
      }
    }
    ctx.fillStyle = "#34d399"; ctx.fillRect(car.x, car.y, car.w, car.h);
    ctx.fillStyle = "#060b14"; ctx.font = "bold 18px monospace";
    ctx.fillText(">", car.x + car.w / 2, car.y + car.h / 2);
    raf = requestAnimationFrame(loop);
  }
  function over() {
    run = false; cancelAnimationFrame(raf);
    ctx.fillStyle = "rgba(6,11,20,.82)"; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = "#e6edf6"; ctx.font = "bold 20px monospace"; ctx.textAlign = "center";
    ctx.fillText("SEGFAULT", W / 2, H / 2 - 6);
    ctx.fillStyle = "#34d399"; ctx.font = "14px monospace";
    ctx.fillText("puntos: " + sc, W / 2, H / 2 + 16);
    ctx.fillText("pulsa jugar para reiniciar", W / 2, H / 2 + 38);
    play.textContent = "reintentar ▶";
  }
  function start() {
    reset(); run = true; play.textContent = "jugando…";
    cancelAnimationFrame(raf); loop();
  }
  play.addEventListener("click", start);
  addEventListener("keydown", key);
  cv.addEventListener("touchstart", touch, { passive: false });
  cv.addEventListener("touchmove", touch, { passive: false });
  reset();
/* ================= TEST / BRÚJULA ================= */
var AX=[
 {k:"constructor",n:"Construir"},{k:"arquitecto",n:"Sistemas"},
 {k:"analista",n:"Analizar"},{k:"disenador",n:"Diseñar"},
 {k:"comunicador",n:"Personas"},{k:"explorador",n:"Explorar"},
 {k:"independiente",n:"Libertad"},{k:"estabilidad",n:"Estabilidad"}
];
var Q=[
 {id:"origen",t:"¿De dónde vienes?",h:"No puntúa: solo cambia cómo te hablo al final.",tipo:"opt",o:[
   {l:"Del hardware (SMR, montaje, redes)",d:{},v:"hardware"},
   {l:"De otros estudios no técnicos",d:{},v:"otros"},
   {l:"De la curiosidad pura (autodidacta)",d:{},v:"curioso"},
   {l:"Ya trabajo o he tocado esto",d:{},v:"trabajo"}]},
 {id:"placer",t:"¿Qué te da más placer?",tipo:"opt",o:[
   {l:"Ver algo funcionar que antes no existía",d:{constructor:3,estabilidad:1}},
   {l:"Que tenga sentido, orden, que encaje",d:{analista:3,arquitecto:1}},
   {l:"Que la gente lo entienda y lo use",d:{comunicador:3,disenador:2}},
   {l:"Descubrir algo que no sabía",d:{explorador:3,analista:1}}]},
 {id:"ab",t:"Prefieres…",tipo:"opt",o:[
   {l:"Hacer que algo exista",d:{constructor:3,independiente:1}},
   {l:"Entender por qué algo es como es",d:{analista:3,estabilidad:1}}]},
 {id:"ab2",t:"¿Cómo trabajas mejor?",tipo:"opt",o:[
   {l:"Solo, decidiendo yo",d:{independiente:3}},
   {l:"En equipo, contrastando",d:{comunicador:2,estabilidad:1}}]},
 {id:"dia",t:"Tu día ideal estás…",tipo:"opt",o:[
   {l:"Construyendo ante una pantalla",d:{constructor:3}},
   {l:"Decidiendo cómo encaja todo",d:{arquitecto:3}},
   {l:"Extrayendo conclusiones de datos",d:{analista:3}},
   {l:"Diseñando algo claro y usable",d:{disenador:3}},
   {l:"Hablando con clientes/usuarios",d:{comunicador:3}},
   {l:"Probando algo nuevo cada día",d:{explorador:3}}]},
 {id:"s_visual",t:"¿Cuánto te atrae la interfaz / lo visual?",tipo:"esc",eje:"disenador"},
 {id:"s_sys",t:"¿Cuánto te atraen servidores, redes, cloud?",tipo:"esc",eje:"arquitecto"},
 {id:"s_data",t:"¿Cuánto te atraen datos, lógica, estadística?",tipo:"esc",eje:"analista"},
 {id:"s_people",t:"¿Cuánto te atrae traducir entre gente y máquina?",tipo:"esc",eje:"comunicador"},
 {id:"s_new",t:"¿Cuánto te atrae aprender stack nuevo vs dominar uno?",tipo:"esc",eje:"explorador"},
 {id:"riesgo",t:"¿Qué riesgo aguantas mejor?",tipo:"opt",o:[
   {l:"Nómina fija, dormir tranquilo",d:{estabilidad:3,independiente:-2}},
   {l:"Riesgo alto por libertad total",d:{independiente:3,estabilidad:-2}},
   {l:"Un punto medio",d:{estabilidad:1,independiente:1}}]},
 {id:"empresa",t:"¿Te ves montando algo tuyo (proyecto/empresa)?",tipo:"opt",o:[
   {l:"Sí, aunque sea inestable",d:{independiente:3,explorador:1,estabilidad:-1}},
   {l:"Prefiero crecer dentro de algo",d:{estabilidad:2,comunicador:1}}]},
 {id:"aburre",t:"¿Qué te aburre más?",tipo:"opt",o:[
   {l:"Repetir lo mismo siempre",d:{explorador:2,estabilidad:-2}},
   {l:"La ambigüedad de la gente",d:{analista:2,disenador:-1}},
   {l:"Código sin saber el porqué",d:{analista:2}},
   {l:"Trabajo en equipo constante",d:{independiente:2}}]},
 {id:"resolver",t:"Mañana, problema real. ¿Por dónde empiezas?",tipo:"opt",o:[
   {l:"Montar un prototipo ya",d:{constructor:3,independiente:1}},
   {l:"Pensar el modelo y los datos",d:{analista:2,arquitecto:2}},
   {l:"Preguntar al usuario",d:{comunicador:2,disenador:2}},
   {l:"Buscar qué hay hecho",d:{explorador:2,arquitecto:1}}]},
 {id:"c_hardware",when:function(a){return a.origen==="hardware"},t:"Cuando reparabas, ¿qué gustaba más?",tipo:"opt",o:[
   {l:"Montar la máquina",d:{constructor:2}},
   {l:"Instalar y configurar el sistema",d:{arquitecto:2}}]},
 {id:"c_dis",when:function(a){return (a.s_visual||0)>=3},t:"¿Lo harías pensando en que lo entienda cualquiera?",tipo:"opt",o:[
   {l:"Sí, aunque sea más lento",d:{disenador:2,comunicador:1}},
   {l:"No, primero que funcione",d:{constructor:2}}]},
 {id:"c_ind",when:function(a){return a.empresa==="si"},t:"¿Facturar tú o nómina?",tipo:"opt",o:[
   {l:"Facturar yo, libre",d:{independiente:2,estabilidad:-1}},
   {l:"Nómina, estable",d:{estabilidad:2}}]},
 {id:"c_data",when:function(a){return (a.s_data||0)>=3},t:"¿Extraer una conclusión de un caos de datos?",tipo:"opt",o:[
   {l:"Me encanta",d:{analista:2}},
   {l:"No es lo mío",d:{analista:-1,constructor:1}}]}
];
/* banco de contenido */
var NUC={
 constructor:"eres de las manos en la masa: necesitas ver algo existir",
 arquitecto:"piensas en sistemas, en cómo encajan las piezas grandes",
 analista:"necesitas entender el porqué antes de mover nada",
 disenador:"la persona al otro lado te importa tanto como el código",
 comunicador:"eres un puente natural entre humanos y máquinas",
 explorador:"vives para lo nuevo, dominar una cosa te aburre",
 independiente:"necesitas decidir, no que te digan qué hacer",
 estabilidad:"valoras el suelo firme y el trabajo bien hecho sin fuegos"
};
var NOUN={constructor:"artesano",arquitecto:"arquitecto",analista:"detective",disenador:"diseñador",comunicador:"puente",explorador:"explorador",independiente:"libre",estabilidad:"timón"};
var ADJ={constructor:"que construye",arquitecto:"que diseña sistemas",analista:"que analiza",disenador:"que diseña",comunicador:"que conecta",explorador:"que explora",independiente:"independiente",estabilidad:"firme"};
var AREAS={
 constructor:[
  {n:"Frontend",q:"Dar forma a lo que la gente toca: HTML, CSS, JS, frameworks.",s:"HTML·CSS·JS·React/Vue",w:"mdn + un framework",p:"18-30k junior"},
  {n:"Backend",q:"La lógica, la base de datos, lo que no se ve pero manda.",s:"Java·Node·SQL·APIs",w:"tu DAM te da esto",p:"20-34k junior"},
  {n:"Apps móviles",q:"Construir algo que vive en el bolsillo de alguien.",s:"Kotlin·Swift·Flutter",w:"un side project en tu móvil",p:"20-34k"},
  {n:"Embebido/robótica",q:"El puente exacto hardware+código: tu SMR vale oro aquí.",s:"C/C++·Arduino·Raspberry",w:"un microcontrolador en casa",p:"22-38k"}
 ],
 arquitecto:[
  {n:"DevOps / SRE",q:"Que todo corra, escale y no se caiga a las 3am.",s:"Linux·Docker·CI/CD·cloud",w:"tu Linux de SMR es la base",p:"28-48k"},
  {n:"Cloud",q:"Diseñar la infraestructura elástica donde vive todo.",s:"AWS/Azure·Terraform",w:"capa gratis de un cloud",p:"26-46k"},
  {n:"Redes / SysAdmin",q:"Lo que ya sabes, elevado a profesional.",s:"Redes·firewalls·scripting",w:"certif tipo CCNA/Redes",p:"24-40k"},
  {n:"Seguridad defensiva",q:"Cuidar el perímetro, auditar, endurecer.",s:"SIEM·hardening·Linux",w:"lab en casa",p:"26-46k"}
 ],
 analista:[
  {n:"Datos / BI",q:"Convertir caos de números en decisiones.",s:"SQL·Python·dashboards",w:"un dataset público",p:"24-40k"},
  {n:"Ciencia de datos",q:"Modelos, predicciones, patrones ocultos.",s:"Python·ML·stats",w:"un notebook de ejemplo",p:"30-50k"},
  {n:"QA automatizado",q:"Cazar bugs antes que nadie, con scripts.",s:"pytest·Selenium·CI",w:"automatizar un test",p:"22-38k"},
  {n:"Seguridad (análisis)",q:"Entender el ataque desde la lógica.",s:"Python·logs·CTF",w:"un CTF fácil",p:"26-46k"}
 ],
 disenador:[
  {n:"UX",q:"Que la gente no se pierda: investigación y flujos.",s:"Figma·tests de usuario",w:"rediseñar una app que uses",p:"24-40k"},
  {n:"UI",q:"La interfaz bonita y coherente.",s:"Figma·CSS·sistemas de diseño",w:"clonar una UI",p:"22-38k"},
  {n:"Accesibilidad",q:"Que funcione para todos, sin excepción.",s:"ARIA·teclado·contraste",w:"auditar tu propia web",p:"26-44k"},
  {n:"Game design",q:"Diseñar la diversión, no el motor.",s:"mecánicas·Unity/Godot",w:"un prototipo de juego",p:"22-38k"}
 ],
 comunicador:[
  {n:"Consultoría",q:"Traducir problemas de negocio a tecnología.",s:"comunicación·demos",w:"explicar tu web a un no técnico",p:"28-48k"},
  {n:"Producto (PM)",q:"Decidir qué se hace y por qué, con equipo.",s:"priorizar·métricas",w:"escribir un mini PRD",p:"30-50k"},
  {n:"Ventas técnicas",q:"Vender lo que entiendes. Se paga bien.",s:"producto·negociación",w:"'vender' tu arcade a alguien",p:"26-50k+comisión"},
  {n:"Formación",q:"Enseñar y aprender el doble.",s:"comunicar·material",w:"un tutorial corto",p:"24-40k"}
 ],
 explorador:[
  {n:"I+D / I+I",q:"Probar lo que nadie ha probado.",s:"paper·prototipos",w:"reproducir un experimento",p:"30-52k"},
  {n:"Seguridad ofensiva",q:"Atacar para entender. Adrenalina pura.",s:"CTF·Burp·Linux",w:"una máquina de HackTheBox",p:"30-55k"},
  {n:"IA aplicada",q:"El frontier ahora mismo.",s:"Python·LLMs·RAG",w:"un bot con una API",p:"32-55k"},
  {n:"XR / 3D",q:"Realidad virtual/aumentada, mundos.",s:"Unity·Blender",w:"una escena simple",p:"26-46k"}
 ],
 independiente:[
  {n:"Freelance",q:"Tú pones las reglas y las facturas.",s:"especialidad·clientes",w:"un encargo pequeño",p:"variable"},
  {n:"Producto propio",q:"Tu idea, tu SaaS, tu riesgo.",s:"mvp·marketing",w:"una landing de una idea",p:"variable"},
  {n:"Microempresa",q:"Empezar pequeño y crecer.",s:"gestión·tech",w:"un proyecto real con un cliente",p:"variable"}
 ],
 estabilidad:[
  {n:"Gran empresa",q:"Procesos, formación, techo alto.",s:"metodología·especialidad",w:"ofertas junior de empresa grande",p:"22-34k"},
  {n:"Banca / fintech",q:"Sólido, bien pagado, exigente.",s:"Java·seguridad·regulación",w:"prácticas en banca",p:"24-38k"},
  {n:"Función pública tech",q:"Estabilidad absoluta, oposiciones.",s:"temario·informática",w:"mirar temario de auxiliar",p:"22-34k"}
 ]
};
var RUTA={
 constructor:["Elige UNA área de arriba y haz un tutorial oficial entero","Monta un mini-proyecto tuyo este finde (feo pero funcionando)","Súbilo a GitHub con un README decente","Pide feedback a alguien y arregla lo que te digan","Encadena un proyecto más grande"],
 arquitecto:["Domina Linux de verdad (ya vienes de SMR)","Aprende Docker con tu propio proyecto","Monta un CI/CD que te despliegue solo","Escribe infraestructura como código (Terraform)","Practica en la capa gratis de un cloud"],
 analista:["SQL hasta la saciedad","Python + pandas con un dataset real","Haz un dashboard que cuente una historia","Aprende estadística básica de verdad","Publica el análisis con tus conclusiones"],
 disenador:["Aprende Figma (1 semana)","Rediseña una app que uses a diario","Estudia sistemas de diseño reales","Haz un test de usabilidad con 3 personas","Audita accesibilidad con teclado"],
 comunicador:["Escribe un post explicando algo técnico simple","Grábate 'vendiendo' tu arcade 2 min","Haz una demo de tu web a un no técnico","Aprende a escribir correos que se respondan","Busca un rol de soporte/consultoría junior"],
 explorador:["Elige UNA tecnología nueva y haz un hola-mundo","Participa en un CTF o un hackathon","Reproduce un experimento de un paper fácil","Mantén un 'diario de descubrimientos'","Convierte lo aprendido en un proyecto"],
 independiente:["Define UNA cosa que sabes hacer y a quién","Haz una landing simple de ese servicio","Consigue UN primer encargo aunque sea barato","Sistematiza (plantillas, precios)","Reinvierte y crece"],
 estabilidad:["Especialízate en algo que pidan empresas grandes","Saca una certificación reconocida","Practica entrevistas de empresa","Busca prácticas/FCT en empresa mediana-grande","Cuida referencias y LinkedIn"]
};
var PASO={
 constructor:"Abre tu editor y haz un botón que haga algo. Hoy.",
 arquitecto:"Instala Docker y levanta tu web dentro. Hoy.",
 analista:"Descarga un dataset público y saca UNA conclusión. Hoy.",
 disenador:"Rediseña la cabecera de tu propia web en Figma. Hoy.",
 comunicador:"Explícale a alguien que no sabe de qué va tu web. Hoy.",
 explorador:"Prueba una herramienta nueva 30 min. Hoy.",
 independiente:"Escribe en un papel qué servicio darías y a quién. Hoy.",
 estabilidad:"Busca 3 ofertas junior que te encajen y guárdalas. Hoy."
};
function entorno(i,e){
 if(i>=4&&e<=3) return {t:"Autónomo / freelance",d:"Necesitas decidir tú y aguantas la incertidumbre. Empieza por dentro de una empresa para coger red, pero tu norte es tu propio proyecto."};
 if(i>=4&&e>=4) return {t:"Startup o micro-equipo",d:"Libertad con algo de red. Encajas donde hay autonomía pero no vas a saltar al vacío sin paracaídas."};
 if(i<=3&&e>=4) return {t:"Gran empresa / consultora",d:"Suelo firme, procesos, formación. Creces dentro de una estructura clara y eso no es poco."};
 return {t:"Equipo consolidado",d:"Ni loco ni aburrido: un sitio con gente y con estabilidad, el punto medio que funciona."};
}
function label(a,b){return "el "+NOUN[a]+" "+ADJ[b];}
function cierre(o){
 if(o==="hardware") return "Vienes de abrir máquinas y saber qué pasa dentro. Eso no se aprende en ningún bootcamp: ya tienes el instinto. Ahora se trata de entender el código que corre sobre lo que tú montabas.";
 if(o==="otros") return "Vienes de otro lado, y eso es ventaja: ves lo que los técnicos dan por hecho. Tu mirada 'de fuera' vale oro en equipo y con clientes.";
 if(o==="curioso") return "Eres autodidacta: eso significa que si alguien te pone un problema, no paras hasta resolverlo. Eso vale más que cualquier título.";
 return "Ya has tocado esto de verdad, así que sabes de la parte aburrida y de la buena. Tu test solo te ordena lo que ya intuías.";
}

/* motor */
var quiz=document.getElementById("quiz"),qBody=document.getElementById("quizBody"),qStep=document.getElementById("quizStep"),qProg=document.getElementById("quizProg");
var quizOpen=false,order=[],qi=0,ans={},sum={},maxs={};
function initQuiz(){ans={};qi=0;quizOpen=true;order=[];sum={};maxs={};AX.forEach(function(x){sum[x.k]=0;maxs[x.k]=0;});
 quiz.hidden=false;requestAnimationFrame(function(){quiz.classList.add("open");});
 buildOrder();nextQ(true);}
function buildOrder(){order=Q.filter(function(q){return !q.when||q.when(ans);});}
function closeQuiz(){quizOpen=false;quiz.classList.remove("open");setTimeout(function(){quiz.hidden=true;},350);}
function pickMax(){var best=AX[0].k,bv=-1;AX.forEach(function(x){if(sum[x.k]>bv){bv=sum[x.k];best=x.k;}});return best;}
function sorted(){return AX.slice().sort(function(a,b){return sum[b.k]-sum[a.k];});}
function renderQ(q){
 qStep.textContent=(qi+1);
 var pct=Math.round((qi/order.length)*100);qProg.style.width=pct+"%";
 var html="<h2 class='q-q'>"+q.t+"</h2>";
 if(q.h)html+="<p class='q-hint'>"+q.h+"</p>";
 if(q.tipo==="esc"){
   html+="<div class='q-scale' role='group' aria-label='"+q.t+"'>";
   for(var i=1;i<=5;i++)html+="<button type='button' data-v='"+i+"' aria-pressed='"+((ans[q.id]||0)===i)+"'>"+i+"</button>";
   html+="</div><div class='q-scale-lbl'><span>nada</span><span>me encanta</span></div>";
 }else{
   html+="<div class='q-opts'>";
   q.o.forEach(function(op,idx){html+="<button class='q-opt' type='button' aria-pressed='"+(ans[q.id]===idx)+"'><span class='k'>"+String.fromCharCode(65+idx)+"</span><span>"+op.l+"</span></button>";});
   html+="</div>";
 }
 html+="<div class='q-nav'><button class='btn g' id='qBack' type='button' "+(qi===0?"disabled":"")+">← atrás</button><button class='btn p' id='qNext' type='button' disabled>siguiente ▶</button></div>";
 qBody.innerHTML=html;
 var back=document.getElementById("qBack");if(back)back.addEventListener("click",function(){if(qi>0){qi--;renderQ(order[qi]);}});
 var next=document.getElementById("qNext");
 if(q.tipo==="esc"){
   var btns=qBody.querySelectorAll(".q-scale button");
   btns.forEach(function(b){b.addEventListener("click",function(){var v=+b.dataset.v;ans[q.id]=v;
     if(q.eje){var d=(v-3);sum[q.eje]=Math.max(0,(sum[q.eje]||0)+d*0);} /* escala se suma al final */
     btns.forEach(function(x){x.setAttribute("aria-pressed","false");});b.setAttribute("aria-pressed","true");next.disabled=false;});});
 }else{
   var opts=qBody.querySelectorAll(".q-opt");
   opts.forEach(function(b,i){b.addEventListener("click",function(){ans[q.id]=i;
     opts.forEach(function(x){x.setAttribute("aria-pressed","false");});b.setAttribute("aria-pressed","true");next.disabled=false;});});
 }
 next.addEventListener("click",function(){if(qi<order.length-1){qi++;buildOrder();if(qi>=order.length){finish();return;}renderQ(order[qi]);}else finish();});
}
function nextQ(){renderQ(order[qi]);}
function finish(){
 /* aplicar escalas al sumario final (limpio, sin doble contar) */
 Q.forEach(function(q){if(q.tipo==="esc"&&q.eje){var v=ans[q.id]||0;sum[q.eje]=(sum[q.eje]||0)+v;}});
 /* máximos posibles: para escalas 5, para opt el max delta por eje */
 var mx={};AX.forEach(function(x){mx[x.k]=0;});
 order.forEach(function(q){
   if(q.tipo==="esc"&&q.eje){mx[q.eje]=Math.max(mx[q.eje]||0,5);return;}
   if(q.o)q.o.forEach(function(op){for(var k in op.d){var dv=Math.abs(op.d[k]);if(dv>(mx[k]||0))mx[k]=dv;}});
 });
 AX.forEach(function(x){var m=mx[x.k]||1;var v=sum[x.k];if(v<0)v=0;var norm=Math.round((v/m)*100);if(norm>100)norm=100;sum[x.k]=norm;});
 renderResult();
}
function drawRadar(){
 var cv=document.getElementById("radar");if(!cv)return;var ctx=cv.getContext("2d");
 var W=cv.width,H=cv.height,cx=W/2,cy=H/2,R=Math.min(W,H)/2-34;
 ctx.clearRect(0,0,W,H);
 ctx.strokeStyle="#1e2d47";ctx.lineWidth=1;
 for(var ring=1;ring<=4;ring++){ctx.beginPath();for(var i=0;i<8;i++){var a=-Math.PI/2+i*Math.PI/4;var r=R*ring/4;var x=cx+Math.cos(a)*r,y=cy+Math.sin(a)*r;if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);}ctx.closePath();ctx.stroke();}
 ctx.beginPath();for(var i=0;i<8;i++){var a=-Math.PI/2+i*Math.PI/4;ctx.moveTo(cx,cy);ctx.lineTo(cx+Math.cos(a)*R,cy+Math.sin(a)*R);}ctx.strokeStyle="#1e2d47";ctx.stroke();
 ctx.beginPath();for(var i=0;i<8;i++){var a=-Math.PI/2+i*Math.PI/4;var v=(sum[AX[i].k]||0)/100;var x=cx+Math.cos(a)*R*v,y=cy+Math.sin(a)*R*v;if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);}ctx.closePath();
 ctx.fillStyle="rgba(52,211,153,.22)";ctx.fill();ctx.strokeStyle="#34d399";ctx.lineWidth=2;ctx.stroke();
 ctx.fillStyle="#8aa0bd";ctx.font="10px monospace";ctx.textAlign="center";ctx.textBaseline="middle";
 for(var i=0;i<8;i++){var a=-Math.PI/2+i*Math.PI/4;var x=cx+Math.cos(a)*(R+18),y=cy+Math.sin(a)*(R+18);ctx.fillText(AX[i].n,x,y);}
}
function areaCard(a,surp){
 return "<div class='res-card "+(surp?"res-surprise":"")+"'><h4>"+a.n+(surp?"<span class='pill'>no lo veías venir</span>":"")+"</h4><p>"+a.q+"</p><div class='meta'><b>stack:</b> "+a.s+" · <b>mirar:</b> "+a.w+" · <b>aprox:</b> "+a.p+"</div></div>";
}
function renderResult(){
 var s=sorted(),t1=s[0].k,t2=s[1].k,t8=s[7].k;
 var ent=entorno(sum.independiente,sum.estabilidad);
 var a1=AREAS[t1]||AREAS.constructor,a2=AREAS[t2]||AREAS.analista,a8=AREAS[t8]||AREAS.explorador;
 var cards=a1.slice(0,2).map(function(a){return areaCard(a);}).join("");
 cards+=areaCard(a2[0]);
 cards+=areaCard(a8[0],true);
 var why="Tu forma es <b>"+NUC[t1]+"<b>, con un matiz claro de "+NUC[t2]+". ";
 if(ans.placer!==undefined)why+="Dijiste que tu placer es «"+order[Q.indexOf(findQ("placer"))].o[ans.placer].l+"», y eso pesa mucho. ";
 if(ans.ab!==undefined)why+="Entre «"+order[Q.indexOf(findQ("ab"))].o[ans.ab].l+"» y lo contrario, elegiste lo primero. ";
 why+="No eres una etiqueta: eres una mezcla. Lo de abajo no es un destino fijo, es por dónde tiene sentido empujar ahora.";
 var route=RUTA[t1]||RUTA.constructor;
 var html="<div class='res'><h3>tu perfil</h3><div class='res-name'>"+label(t1,t2)+"</div><div class='res-tag'>radar · "+s.map(function(x){return x.n+" "+sum[x.k];}).join(" · ")+"</div><canvas id='radar' width='320' height='320' aria-label='Radar de perfil'></canvas><div class='res-why'>"+why+"</div><div class='res-grid'>"+cards+"</div><div class='res-route'><h4>tu ruta</h4><ol>"+route.map(function(r){return "<li>"+r+"</li>";}).join("")+"</ol></div><div class='res-step'><h4>tu siguiente paso, hoy</h4><p>"+(PASO[t1]||PASO.constructor)+"</p></div><div class='res-why' style='margin-top:1.2rem'><b>tu entorno:</b> "+ent.t+". "+ent.d+"</div><div class='res-why' style='margin-top:1.2rem'><b>y una cosa más:</b> "+cierre(ans.origen||"curioso")+"</div><div class='res-close'><p>¿Dudas? ¿Querías otra cosa? ¿Quieres contarme qué te ha salido o qué esperabas? Escríbeme y hablamos.</p><div class='res-acts'><button class='btn g' id='resAgain' type='button'>repetir</button><a class='btn p' href='#contacto' id='resContact'>contactar</a></div></div></div>";
 qBody.innerHTML=html;
 drawRadar();
 document.getElementById("resAgain").addEventListener("click",function(){initQuiz();});
 document.getElementById("resContact").addEventListener("click",function(){closeQuiz();});
}
function findQ(id){for(var i=0;i<Q.length;i++)if(Q[i].id===id)return Q[i];return null;}
document.getElementById("startQuiz").addEventListener("click",initQuiz);
document.getElementById("quizClose").addEventListener("click",closeQuiz);
quiz.addEventListener("click",function(e){if(e.target===quiz)closeQuiz();});
document.addEventListener("keydown",function(e){if(!quizOpen)return;if(e.key==="Escape")closeQuiz();});
  /* primera vista */
  show(location.hash.slice(1) || "inicio");
  onScroll();
})();
