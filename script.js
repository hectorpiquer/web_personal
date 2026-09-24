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

  /* primera vista */
  show(location.hash.slice(1) || "inicio");
  onScroll();
})();
