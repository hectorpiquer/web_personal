/* ==========================================================================
   HÉCTOR PIQUER · script.js
   Todo vanilla, sin dependencias. Respeta prefers-reduced-motion.
   ========================================================================== */
   
(function () {
  "use strict";
  const D = document;
  const root = D.documentElement;
  root.classList.remove("no-js"); root.classList.add("js");

  const $  = (s, c = D) => c.querySelector(s);
  const $$ = (s, c = D) => Array.from(c.querySelectorAll(s));
  const REDUCE = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- almacenamiento ---------- */
  const K = "hp.";
  const store = {
    get(k, f) { try { const v = localStorage.getItem(K + k); return v === null ? f : JSON.parse(v); } catch (e) { return f; } },
    set(k, v) { try { localStorage.setItem(K + k, JSON.stringify(v)); } catch (e) {} }
  };

  /* ---------- idioma / i18n ---------- */
  const I18N = window.HP_I18N || {};
  let LANG = store.get("lang", null);
  if (!LANG) {
    const nav = (navigator.language || "es").toLowerCase();
    LANG = nav.startsWith("en") ? "en" : "es";
  }
  const t = (key) => {
    const v = I18N[key];
    if (Array.isArray(v) && v.length === 2) return v[LANG === "en" ? 1 : 0];
    return v;
  };
  const setLang = (l) => { LANG = l; store.set("lang", l); };

  function applyI18n() {
    root.lang = LANG;
    $$("[data-i18n]").forEach((el) => {
      const v = t(el.dataset.i18n);
      if (typeof v === "string") el.innerHTML = v;
    });
    $$("[data-i18n-label]").forEach((el) => {
      const v = t(el.dataset.i18nLabel);
      if (typeof v === "string") el.setAttribute("aria-label", v);
    });
    const lc = $("#langCode"); if (lc) lc.textContent = LANG.toUpperCase();
    const ph = $("#plQ"); if (ph) ph.placeholder = LANG === "en" ? "search song or artist…" : "busca canción o artista…";
    const ci = $("#chatIn"); if (ci) ci.placeholder = LANG === "en" ? "write to me…" : "escríbeme…";
    const pi = $("#palInput"); if (pi) pi.placeholder = t("pal.placeholder");
    const ac = $("#arcSound"); if (ac) ac.textContent = SOUND_ON ? t("arc.soundOn") : t("arc.sound");
    renderLikes(); buildTicker(); renderThemeMenu(); buildPalette();
    if (arcade) arcade.updateHud();
  }

  /* ---------- motor de sonido (WebAudio sintetizado) ---------- */
  let SOUND_ON = store.get("sound", false);
  let AC = null;
  function audio() {
    if (!SOUND_ON) return null;
    if (!AC) { try { AC = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { return null; } }
    if (AC.state === "suspended") AC.resume();
    return AC;
  }
  function blip(freq = 440, dur = 0.08, type = "square", vol = 0.05) {
    const ac = audio(); if (!ac) return;
    const o = ac.createOscillator(), g = ac.createGain();
    o.type = type; o.frequency.value = freq;
    g.gain.setValueAtTime(vol, ac.currentTime);
    g.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + dur);
    o.connect(g).connect(ac.destination); o.start(); o.stop(ac.currentTime + dur);
  }
  const sfx = {
    click: () => blip(660, 0.06, "square", 0.04),
    hover: () => blip(880, 0.03, "sine", 0.02),
    good:  () => { blip(660, 0.07, "triangle", 0.06); setTimeout(() => blip(990, 0.08, "triangle", 0.06), 60); },
    bad:   () => blip(120, 0.25, "sawtooth", 0.07),
    pow:   () => { blip(523, 0.06, "square", 0.05); setTimeout(() => blip(784, 0.06, "square", 0.05), 55); setTimeout(() => blip(1046, 0.09, "square", 0.05), 110); }
  };

  /* ---------- temas ---------- */
  const THEMES = ["terminal", "editor", "matrix", "crt", "synth"];
  const THEME_SWATCH = {
    terminal: ["#34d399", "#0a0f1c", "#fbbf24"],
    editor:   ["#1a7f37", "#ffffff", "#9a6700"],
    matrix:   ["#22e06b", "#020a04", "#d8ffd0"],
    crt:      ["#ffa129", "#100a02", "#ffe4a8"],
    synth:    ["#22d3ee", "#0b0518", "#f472b6"]
  };
  let THEME = store.get("theme", "terminal");
  if (!THEMES.includes(THEME)) THEME = "terminal";
  function setTheme(name) {
    THEME = name; store.set("theme", name); root.setAttribute("data-theme", name);
    const meta = D.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", getComputedStyle(root).getPropertyValue("--theme-color").trim() || "#0a0f1c");
    const nf = $("#nfTheme"); if (nf) nf.textContent = name;
    $$(".theme-menu .popover-btn").forEach((b) => b.setAttribute("aria-checked", b.dataset.theme === name ? "true" : "false"));
    const dn = $("#themeName"); if (dn) dn.textContent = t("theme." + name);
    if (arcade) arcade.recolor();
  }
  function renderThemeMenu() {
    const menu = $("#themeMenu"); if (!menu) return;
    menu.innerHTML = "";
    THEMES.forEach((name) => {
      const c = THEME_SWATCH[name];
      const b = D.createElement("button");
      b.type = "button"; b.className = "popover-btn"; b.dataset.theme = name;
      b.setAttribute("role", "menuitemradio");
      b.setAttribute("aria-checked", name === THEME ? "true" : "false");
      b.innerHTML =
        `<span class="tm-sw" style="background:${c[1]}">
           <i style="background:linear-gradient(135deg,${c[0]},${c[2]})"></i>
         </span>
         <span class="tm-meta"><span>${t("theme." + name)}</span><small>${t("theme." + name + ".d")}</small></span>`;
      b.addEventListener("click", () => { sfx.click(); setTheme(name); closeMenus(); });
      menu.appendChild(b);
    });
  }

  /* ---------- menús flotantes ---------- */
  function closeMenus() {
    const lm = $("#langMenu"), tm = $("#themeMenu");
    if (lm) { lm.hidden = true; $("#langBtn").setAttribute("aria-expanded", "false"); }
    if (tm) { tm.hidden = true; $("#themeBtn").setAttribute("aria-expanded", "false"); }
    const mm = $("#mailMenu"); if (mm) { mm.hidden = true; $("#mailBtn").setAttribute("aria-expanded", "false"); }
  }
  function toggleMenu(btn, menu) {
    const open = !menu.hidden;
    closeMenus();
    if (!open) { menu.hidden = false; btn.setAttribute("aria-expanded", "true"); }
  }

  /* ---------- loader + intro ---------- */
  function runLoader() {
    const bar = $("#ldBar"), txt = $("#ldTxt"), loader = $("#loader");
    if (!loader) return;
    const msgs = ["cargando fuentes…", "montando nodos…", "leyendo GitHub…", "listo ✓"];
    let p = 0, mi = 0;
    const it = setInterval(() => {
      p += 12 + Math.random() * 18; if (p > 100) p = 100;
      if (bar) bar.style.width = p + "%";
      if (p > mi * 25 && mi < msgs.length) { if (txt) txt.textContent = msgs[mi]; mi++; }
      if (p >= 100) { clearInterval(it); setTimeout(() => loader.classList.add("hidden"), 350); }
    }, 130);
  }
  function runIntro() {
    const intro = $("#intro"); if (!intro) return;
    const done = () => { intro.classList.add("gone"); setTimeout(() => intro.remove(), 500); store.set("introSeen", true); };
    if (REDUCE || store.get("introSeen", false)) { done(); return; }
    const cmd = $("#introCmd"), out = $("#introOut"), skip = $("#introSkip");
    const text = "whoami --verbose && start portfolio";
    let i = 0;
    const type = setInterval(() => {
      cmd.textContent = text.slice(0, ++i);
      if (i >= text.length) {
        clearInterval(type);
        setTimeout(() => { out.classList.add("show"); }, 260);
      }
    }, 38);
    const clock = $("#introClock");
    const tick = () => { if (clock) clock.textContent = new Date().toLocaleTimeString(LANG === "en" ? "en-GB" : "es-ES", { hour: "2-digit", minute: "2-digit" }); };
    tick(); const ct = setInterval(tick, 1000);
    const finish = () => { clearInterval(ct); clearInterval(type); done(); };
    skip.addEventListener("click", finish);
    setTimeout(finish, 3400);
  }

  /* ---------- título scramble ---------- */
  function scramble(el) {
    if (!el || REDUCE) return;
    const final = el.dataset.final || el.textContent;
    const chars = "!<>-_\\/[]{}—=+*^?#01ABCDEF";
    let frame = 0;
    const q = final.split("").map(() => ({ to: final[Math.floor(Math.random() * final.length)], end: Math.floor(Math.random() * 28) + 12 }));
    const tick = () => {
      let out = "", done = 0;
      for (let i = 0; i < q.length; i++) {
        const c = q[i];
        if (frame >= c.end) { done++; out += final[i]; }
        else if (c.to === undefined || frame > c.end - 8 && Math.random() > 0.6) { c.to = final[i]; out += final[i]; }
        else out += chars[Math.floor(Math.random() * chars.length)];
      }
      el.textContent = out;
      if (done === q.length) return;
      frame++; requestAnimationFrame(tick);
    };
    tick();
  }

  /* ---------- typewriter frases ---------- */
  let typeTimer = null;
  function typewriter() {
    const el = $("#type"); if (!el) return;
    const list = (I18N.phrases && I18N.phrases[LANG]) || [""];
    clearInterval(typeTimer);
    if (REDUCE) { el.textContent = list[0]; return; }
    let pi = 0, ci = 0, del = false;
    const step = () => {
      const cur = list[pi];
      if (!del) { el.textContent = cur.slice(0, ++ci); if (ci === cur.length) { del = true; return typeTimer = setTimeout(step, 1700); } }
      else { el.textContent = cur.slice(0, --ci); if (ci === 0) { del = false; pi = (pi + 1) % list.length; } }
      typeTimer = setTimeout(step, del ? 28 : 55);
    };
    step();
  }

  /* ---------- ticker ---------- */
  function buildTicker() {
    const track = $("#tkTrack"); if (!track) return;
    const items = (I18N.ticker && I18N.ticker[LANG]) || [];
    const one = items.map((x) => `<span><b>▸</b> ${x}</span>`).join("");
    track.innerHTML = one + one;
  }

  /* ---------- fondo canvas: red de nodos ---------- */
  function backgroundFX() {
    const cv = $("#bgfx"); if (!cv) return;
    const ctx = cv.getContext("2d");
    let w, h, dpr, nodes = [], raf, mx = -999, my = -999;
    const COL = () => getComputedStyle(root).getPropertyValue("--node").trim() || "52,211,153";
    function resize() {
      dpr = Math.min(devicePixelRatio || 1, 2);
      w = cv.width = innerWidth * dpr; h = cv.height = innerHeight * dpr;
      cv.style.width = innerWidth + "px"; cv.style.height = innerHeight + "px";
      const n = Math.min(70, Math.floor(innerWidth / 22));
      nodes = Array.from({ length: n }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.18 * dpr, vy: (Math.random() - 0.5) * 0.18 * dpr,
        r: (Math.random() * 1.6 + 0.6) * dpr
      }));
    }
    function draw() {
      ctx.clearRect(0, 0, w, h);
      const col = COL();
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        a.x += a.vx; a.y += a.vy;
        if (a.x < 0 || a.x > w) a.vx *= -1;
        if (a.y < 0 || a.y > h) a.vy *= -1;
        const dm = Math.hypot(a.x - mx * dpr, a.y - my * dpr);
        const near = dm < 140 * dpr;
        ctx.beginPath();
        ctx.fillStyle = `rgba(${col},${near ? 0.9 : 0.5})`;
        ctx.arc(a.x, a.y, a.r * (near ? 1.7 : 1), 0, 7); ctx.fill();
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j], d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 120 * dpr) { ctx.strokeStyle = `rgba(${col},${(1 - d / (120 * dpr)) * 0.22})`; ctx.lineWidth = dpr; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
        }
        if (near) { ctx.strokeStyle = `rgba(${col},${(1 - dm / (140 * dpr)) * 0.4})`; ctx.lineWidth = dpr; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mx * dpr, my * dpr); ctx.stroke(); }
      }
      raf = requestAnimationFrame(draw);
    }
    resize();
    if (REDUCE) { draw(); cancelAnimationFrame(raf); return; }
    draw();
    addEventListener("resize", resize);
    addEventListener("mousemove", (e) => { mx = e.clientX; my = e.clientY; }, { passive: true });
    addEventListener("mouseleave", () => { mx = my = -999; });
  }

  /* ---------- reveal on scroll + barras skills ---------- */
  function reveals() {
    const io = new IntersectionObserver((ents) => {
      ents.forEach((en) => {
        if (!en.isIntersecting) return;
        en.target.classList.add("in");
        if (en.target.classList.contains("sk")) {
          const bar = en.target.querySelector(".bar > i");
          if (bar) bar.style.width = bar.dataset.w + "%";
        }
        io.unobserve(en.target);
      });
    }, { threshold: 0.15 });
    $$(".rv").forEach((el) => io.observe(el));
  }

  /* ---------- router por hash + nav ---------- */
  const VIEWS = ["inicio", "sobre", "formacion", "servicios", "proyectos", "gusta", "arcade", "contacto"];
  function showView(id) {
    if (!VIEWS.includes(id)) id = "inicio";
    VIEWS.forEach((v) => { const s = $("#" + v); if (s) s.hidden = v !== id; });
    const link = $(`.nav a[href="#${id}"]`);
    $$(".nav a").forEach((a) => a.classList.toggle("on", a === link));
    moveInk(link);
    scrollTo({ top: 0, behavior: REDUCE ? "auto" : "smooth" });
    history.replaceState(null, "", "#" + id);
    if (id === "gusta") renderLikes();
    if (id === "arcade") arcade && arcade.recolor();
  }
  function moveInk(link) {
    const ink = $(".nav-ink"); if (!ink || !link || innerWidth < 820) return;
    const nav = $("#nav"); const r = link.getBoundingClientRect(), nr = nav.getBoundingClientRect();
    ink.style.width = r.width + "px"; ink.style.transform = `translateX(${r.left - nr.left}px)`;
  }
  function router() {
    addEventListener("hashchange", () => showView(location.hash.replace("#", "") || "inicio"));
    $$(".nav a").forEach((a) => a.addEventListener("click", (e) => { e.preventDefault(); const id = a.getAttribute("href").slice(1); showView(id); $("#nav").classList.remove("open"); $("#burger").setAttribute("aria-expanded", "false"); }));
    $$('a[href^="#"]').forEach((a) => { if (a.closest(".nav")) return; a.addEventListener("click", (e) => { const id = a.getAttribute("href").slice(1); if (VIEWS.includes(id)) { e.preventDefault(); showView(id); } }); });
    showView(location.hash.replace("#", "") || "inicio");
    addEventListener("resize", () => moveInk($(".nav a.on")));
  }

  /* ---------- progreso + anillo + volver arriba ---------- */
  function scrollUI() {
    const bar = $("#bar"), ring = $("#ringFg"), top = $("#topBtn");
    const C = 125.66;
    const upd = () => {
      const st = scrollY, h = document.documentElement.scrollHeight - innerHeight;
      const p = h > 0 ? st / h : 0;
      if (bar) bar.style.width = (p * 100) + "%";
      if (ring) ring.style.strokeDashoffset = C * (1 - p);
      if (top) { top.classList.toggle("idle", st < innerHeight * 0.6); top.hidden = st < 300; }
    };
    addEventListener("scroll", () => requestAnimationFrame(upd), { passive: true });
    upd();
    top && top.addEventListener("click", () => { sfx.click(); scrollTo({ top: 0, behavior: REDUCE ? "auto" : "smooth" }); });
  }

  /* ---------- me gusta (Modificado: sin filtros ni favoritos) ---------- */
  function renderLikes() {
    const grid = $("#likesGrid"); if (!grid) return;
    const data = I18N.likes_data || [];
    grid.innerHTML = "";
    
    data.forEach((d, idx) => {
      const txt = d[LANG] || d.es;
      const li = D.createElement("article");
      li.className = "like rv in"; li.dataset.cat = d.cat; li.style.setProperty("--lc", d.color);
      li.style.transitionDelay = (idx * 40) + "ms";
      
      li.innerHTML =
        `<div class="lk-top">
           <span class="lk-emoji">${d.emoji}</span>
           <span class="lk-cat">${d.cat}</span>
         </div>
         <h3>${txt[0]}</h3>
         <p>${txt[1]}</p>
         <div class="lk-meta">
           <span>${LANG === "en" ? "level" : "nivel"} ${d.int}/5</span>
           <span class="lk-bar"><i data-w="${d.int * 20}"></i></span>
         </div>`;
      grid.appendChild(li);
      requestAnimationFrame(() => { const bar = li.querySelector(".lk-bar i"); if (bar) bar.style.width = bar.dataset.w + "%"; });
    });

    if (!REDUCE && matchMedia("(pointer:fine)").matches) {
      $$(".like", grid).forEach((card) => {
        card.addEventListener("mousemove", (e) => {
          const r = card.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
          card.style.transform = `perspective(800px) rotateY(${px * 8}deg) rotateX(${-py * 8}deg) translateY(-4px)`;
        });
        card.addEventListener("mouseleave", () => { card.style.transform = ""; });
      });
    }
  }

  /* ---------- filtros genéricos ---------- */
  function filterGroup(sel, targetSel, attr) {
    const grp = $(sel); if (!grp) return;
    grp.addEventListener("click", (e) => {
      const b = e.target.closest("button[data-" + attr + "]"); if (!b) return;
      $$("button", grp).forEach((x) => x.classList.toggle("on", x === b));
      sfx.click();
      const val = b.dataset[attr];
      if (sel === "#projFilter") filterProjects(val);
      else if (sel === "#newsFilter") loadNews(val);
    });
  }
  function filterProjects(f) {
    $$("#projGrid .proj").forEach((p) => { p.hidden = !(f === "all" || p.dataset.tags.split(" ").includes(f)); });
    const empty = $("#projGrid").querySelector(".proj-empty");
    const visible = $$("#projGrid .proj").some((p) => !p.hidden);
    if (!visible && !empty) { const e = D.createElement("p"); e.className = "news-empty proj-empty"; e.textContent = t("proj.empty"); $("#projGrid").appendChild(e); }
    if (visible && empty) empty.remove();
  }

  /* ---------- ARCADE ---------- */
  let arcade = null;
  function Arcade() {
    const cv = $("#game"); if (!cv) return null;
    const ctx = cv.getContext("2d");
    const W = 360, H = 520; let dpr = 1;
    function size() { dpr = Math.min(devicePixelRatio || 1, 2); cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); }
    size(); addEventListener("resize", size);
    let COL = {};
    function recolor() { const cs = getComputedStyle(root); COL = { acc: cs.getPropertyValue("--acc").trim() || "#34d399", acc2: cs.getPropertyValue("--acc2").trim() || "#fbbf24", err: "#f87171", txt: cs.getPropertyValue("--txt").trim() || "#fff" }; }
    recolor();

    let best = store.get("gameBest", 0);
    let top = store.get("gameTop", []);
    const P = { x: W / 2, y: H - 40, w: 30, h: 18, speed: 5.4, target: W / 2 };
    let tokens = [], parts = [], powers = [], running = false, over = false, paused = false;
    let score = 0, level = 1, combo = 0, spawn = 0, frame = 0;
    let keys = { l: false, r: false };
    const pw = { shield: 0, magnet: 0, slow: 0, x2: 0 };
    const PW = { shield: ["🛡️", "shield"], magnet: ["🧲", "magnet"], slow: ["🐢", "slow"], x2: ["✦", "x2"] };

    function reset() { tokens = []; parts = []; powers = []; score = 0; level = 1; combo = 0; spawn = 0; frame = 0; over = false; paused = false; pw.shield = pw.magnet = pw.slow = pw.x2 = 0; P.x = P.target = W / 2; updateHud(); }
    function start() { reset(); running = true; over = false; $("#play").textContent = LANG === "en" ? "again ▶" : "otra vez ▶"; $("#arcPause").disabled = false; loop(); }
    function updateHud() {
      const s = $("#arcScore"), l = $("#arcLevel"), c = $("#arcCombo"), b = $("#arcBest");
      if (s) s.textContent = score; if (l) l.textContent = level; if (c) c.textContent = "×" + (1 + Math.floor(combo / 5)); if (b) b.textContent = best;
      const pwEl = $("#arcPowers"); if (pwEl) {
        pwEl.innerHTML = "";
        [["shield", pw.shield], ["magnet", pw.magnet], ["slow", pw.slow], ["x2", pw.x2]].forEach(([k, v]) => {
          if (v > 0) { const s = D.createElement("span"); s.className = "pw"; s.textContent = `${PW[k][0]} ${Math.ceil(v / 60)}s`; pwEl.appendChild(s); }
        });
      }
    }
    function spawnToken() {
      const roll = Math.random();
      const type = roll < 0.62 ? "good" : roll < 0.82 ? "bad" : "power";
      tokens.push({ x: 20 + Math.random() * (W - 40), y: -20, r: type === "power" ? 12 : 10, type, v: 1.6 + level * 0.35 + Math.random(), char: type === "power" ? PW[["shield", "magnet", "slow", "x2"][Math.floor(Math.random() * 4)]][1] : (type === "good" ? "✓" : "✕"), pw: ["shield", "magnet", "slow", "x2"][Math.floor(Math.random() * 4)] });
    }
    function burst(x, y, color) { for (let i = 0; i < 10; i++) parts.push({ x, y, vx: (Math.random() - 0.5) * 4, vy: (Math.random() - 0.5) * 4 - 1, life: 30, c: color }); }
    function endGame() {
      running = false; over = true; sfx.bad();
      if (score > best) { best = score; store.set("gameBest", best); toast(t("arc.newrec")); }
      top = [...top, score].sort((a, b) => b - a).slice(0, 5); store.set("gameTop", top); renderTop();
      $("#play").textContent = t("arc.play"); $("#arcPause").disabled = true;
    }
    function renderTop() { const ol = $("#arcTop"); if (!ol) return; ol.innerHTML = top.length ? top.map((s) => `<li>${s}</li>`).join("") : `<li>—</li>`; }
    renderTop();

    function loop() {
      if (!running) return;
      frame++;
      if (keys.l) P.target -= P.speed; if (keys.r) P.target += P.speed;
      P.target = Math.max(P.w / 2, Math.min(W - P.w / 2, P.target));
      P.x += (P.target - P.x) * 0.3;
      spawn -= (pw.slow > 0 ? 0.5 : 1);
      if (spawn <= 0) { spawnToken(); spawn = Math.max(22, 55 - level * 3); }
      const speedMul = pw.slow > 0 ? 0.5 : 1;
      for (let i = tokens.length - 1; i >= 0; i--) {
        const tk = tokens[i]; tk.y += tk.v * speedMul;
        if (pw.magnet > 0 && tk.type === "good") tk.x += (P.x - tk.x) * 0.06;
        const d = Math.hypot(tk.x - P.x, tk.y - P.y);
        if (d < tk.r + P.w / 2) {
          if (tk.type === "good") { combo++; const gain = (10 + combo) * (pw.x2 > 0 ? 2 : 1); score += gain; sfx.good(); burst(tk.x, tk.y, COL.acc); }
          else if (tk.type === "power") { pw[tk.pw] = 360; sfx.pow(); burst(tk.x, tk.y, COL.acc2); }
          else { if (pw.shield > 0) { pw.shield = 0; sfx.bad(); burst(tk.x, tk.y, COL.err); } else { endGame(); return; } }
          tokens.splice(i, 1); updateHud(); continue;
        }
        if (tk.y > H + 20) { if (tk.type === "good") combo = 0; tokens.splice(i, 1); }
      }
      level = 1 + Math.floor(score / 120);
      Object.keys(pw).forEach((k) => { if (pw[k] > 0) pw[k]--; });
      if (frame % 10 === 0) updateHud();
      draw();
      rafId = requestAnimationFrame(loop);
    }
    let rafId;
    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.strokeStyle = "rgba(255,255,255,.05)"; ctx.lineWidth = 1;
      for (let x = 0; x < W; x += 30) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
      tokens.forEach((tk) => {
        ctx.save(); ctx.translate(tk.x, tk.y);
        if (tk.type === "good") { ctx.fillStyle = COL.acc; ctx.shadowColor = COL.acc; ctx.shadowBlur = 12; ctx.beginPath(); ctx.arc(0, 0, tk.r, 0, 7); ctx.fill(); ctx.fillStyle = "#04120c"; ctx.font = "bold 12px monospace"; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText("✓", 0, 1); }
        else if (tk.type === "bad") { ctx.fillStyle = COL.err; ctx.shadowColor = COL.err; ctx.shadowBlur = 10; ctx.beginPath(); ctx.moveTo(0, -tk.r); ctx.lineTo(tk.r, 0); ctx.lineTo(0, tk.r); ctx.lineTo(-tk.r, 0); ctx.closePath(); ctx.fill(); ctx.fillStyle = "#fff"; ctx.font = "bold 11px monospace"; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText("✕", 0, 1); }
        else { ctx.fillStyle = COL.acc2; ctx.shadowColor = COL.acc2; ctx.shadowBlur = 16; ctx.beginPath(); ctx.arc(0, 0, tk.r, 0, 7); ctx.fill(); ctx.fillStyle = "#1a1200"; ctx.font = "14px monospace"; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText(PW[tk.pw][0], 0, 1); }
        ctx.restore();
      });
      for (let i = parts.length - 1; i >= 0; i--) { const p = parts[i]; p.x += p.vx; p.y += p.vy; p.vy += 0.1; p.life--; ctx.globalAlpha = Math.max(0, p.life / 30); ctx.fillStyle = p.c; ctx.fillRect(p.x, p.y, 3, 3); ctx.globalAlpha = 1; if (p.life <= 0) parts.splice(i, 1); }
      if (pw.shield > 0) { ctx.strokeStyle = COL.acc2; ctx.globalAlpha = 0.5 + Math.sin(frame / 6) * 0.3; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(P.x, P.y, P.w, 0, 7); ctx.stroke(); ctx.globalAlpha = 1; }
      ctx.save(); ctx.translate(P.x, P.y);
      ctx.fillStyle = COL.acc; ctx.shadowColor = COL.acc; ctx.shadowBlur = 14;
      ctx.beginPath(); ctx.moveTo(0, -P.h / 2 - 4); ctx.lineTo(P.w / 2, P.h / 2); ctx.lineTo(0, P.h / 2 - 4); ctx.lineTo(-P.w / 2, P.h / 2); ctx.closePath(); ctx.fill();
      ctx.restore();
      if (over) {
        ctx.fillStyle = "rgba(3,6,12,.7)"; ctx.fillRect(0, 0, W, H);
        ctx.fillStyle = COL.err; ctx.font = "bold 30px monospace"; ctx.textAlign = "center"; ctx.fillText(t("arc.gameover"), W / 2, H / 2 - 10);
        ctx.fillStyle = COL.txt; ctx.font = "14px monospace"; ctx.fillText("score " + score + " · " + (LANG === "en" ? "best" : "récord") + " " + best, W / 2, H / 2 + 22);
      } else if (!running) {
        ctx.fillStyle = COL.txt; ctx.font = "13px monospace"; ctx.textAlign = "center"; ctx.globalAlpha = 0.6 + Math.sin(frame / 20) * 0.4; ctx.fillText(t("arc.press"), W / 2, H / 2); ctx.globalAlpha = 1;
      }
    }
    addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") keys.l = true;
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") keys.r = true;
    });
    addEventListener("keyup", (e) => {
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") keys.l = false;
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") keys.r = false;
    });
    cv.addEventListener("pointermove", (e) => { const r = cv.getBoundingClientRect(); P.target = (e.clientX - r.left) / r.width * W; });
    cv.addEventListener("pointerdown", () => { if (!running) start(); });
    $("#play").addEventListener("click", () => { sfx.click(); start(); });
    $("#arcPause").addEventListener("click", () => { togglePause(); });
    addEventListener("keydown", (e) => {
      if (location.hash.replace("#","") !== "arcade") return;
      if (e.key === "p" || e.key === "P") togglePause();
      if (e.key === "m" || e.key === "M") toggleSound();
    });
    function togglePause() { if (!running) return; paused = !paused; $("#arcPause").textContent = paused ? t("arc.resume") : t("arc.pause"); if (paused) cancelAnimationFrame(rafId); else loop(); }
    return { recolor, updateHud };
  }

  /* ---------- TEST ---------- */
  function Quiz() {
    const wrap = $("#quiz"), body = $("#quizBody"), stepEl = $("#quizStep"), prog = $("#quizProg");
    if (!wrap) return;
    const Q = I18N.quiz_data; let answers = [], idx = 0, lastFocus = null;
    function open() { lastFocus = D.activeElement; answers = []; idx = 0; wrap.hidden = false; requestAnimationFrame(() => wrap.classList.add("open")); render(); $("#quizClose").focus(); }
    function close() { wrap.classList.remove("open"); setTimeout(() => { wrap.hidden = true; lastFocus && lastFocus.focus(); }, 300); }
    function render() {
      if (idx === 0) return intro();
      if (idx > Q.questions.length) return result();
      const q = Q.questions[idx - 1];
      stepEl.textContent = idx + "/" + Q.questions.length;
      prog.style.width = (idx / (Q.questions.length + 1) * 100) + "%";
      body.innerHTML = `<p class="q-q">${q.q[LANG] || q.q.es}</p><div class="q-opts"></div>
        <div class="q-nav"><button class="btn g" id="qBack" type="button">←</button><span></span></div>`;
      const opts = body.querySelector(".q-opts");
      q.opts.forEach((o, i) => {
        const b = D.createElement("button"); b.type = "button"; b.className = "q-opt"; b.setAttribute("aria-pressed", answers[idx - 1] === i ? "true" : "false");
        b.innerHTML = `<span class="k">${i + 1}</span> ${o.t[LANG] || o.t.es}`;
        b.addEventListener("click", () => { answers[idx - 1] = i; sfx.click(); idx++; render(); });
        opts.appendChild(b);
      });
      $("#qBack").addEventListener("click", () => { if (idx > 1) { idx--; render(); } else close(); });
    }
    function intro() {
      stepEl.textContent = "0/" + Q.questions.length; prog.style.width = "4%";
      body.innerHTML = `<p class="q-q">${LANG === "en" ? "Orientation test" : "Test de orientación"}</p><p class="q-hint">${Q.intro[LANG] || Q.intro.es}</p>
        <div class="q-nav"><button class="btn g" id="qCancel" type="button">${LANG === "en" ? "Cancel" : "Cancelar"}</button><button class="btn p" id="qStart" type="button">${LANG === "en" ? "Start ▶" : "Empezar ▶"}</button></div>`;
      $("#qCancel").addEventListener("click", close);
      $("#qStart").addEventListener("click", () => { sfx.click(); idx = 1; render(); });
    }
    function result() {
      stepEl.textContent = "✓"; prog.style.width = "100%";
      const w = { front: 0, back: 0, datos: 0, redes: 0, soporte: 0 };
      answers.forEach((oi, qi) => { if (oi == null) return; const ww = Q.questions[qi].opts[oi].w; Object.keys(ww).forEach((k) => (w[k] += ww[k])); });
      const max = Math.max(1, ...Object.values(w));
      const order = Object.entries(w).sort((a, b) => b[1] - a[1]);
      const win = order[0][0]; const p = Q.profiles[win];
      body.innerHTML = `<div class="res">
        <h3>${LANG === "en" ? "Your profile" : "Tu perfil"}</h3>
        <p class="res-name">${p.name[LANG] || p.name.es}</p>
        <p class="res-tag">${p.tag}</p>
        <canvas id="radar" width="260" height="260"></canvas>
        <p class="res-why">${p.why[LANG] || p.why.es}</p>
        <div class="res-grid">${surprise(order)}</div>
        <div class="res-route"><h4>${LANG === "en" ? "Your roadmap" : "Tu ruta"}</h4><ol>${(p.route[LANG] || p.route.es).map((s) => `<li>${s}</li>`).join("")}</ol></div>
        <div class="res-step"><h4>${LANG === "en" ? "Start today" : "Empieza hoy"}</h4><p>${p.first[LANG] || p.first.es}</p></div>
        <div class="res-close"><p>${LANG === "en" ? "Share it or write to me — I'd love to hear your answer." : "Compártelo o escríbeme — me encantará leer tu respuesta."}</p>
        <div class="res-acts"><button class="btn g" id="qAgain" type="button">${LANG === "en" ? "Redo" : "Repetir"}</button><a class="btn p" href="#contacto" id="qGo">${t("hero.cta3")}</a></div></div>
      </div>`;
      drawRadar(w, max);
      $("#qAgain").addEventListener("click", () => { idx = 1; render(); });
      $("#qGo").addEventListener("click", (e) => { e.preventDefault(); close(); showView("contacto"); });
    }
    function surprise(order) {
      const second = order[1] && order[1][1] > 0 ? order[1][0] : null;
      if (!second) return "";
      const p = Q.profiles[second];
      return `<div class="res-card res-surprise"><h4>${LANG === "en" ? "Also close to" : "También cerca de"}: ${p.name[LANG] || p.name.es} <span class="pill">${p.tag}</span></h4><p>${p.why[LANG] || p.why.es}</p></div>`;
    }
    function drawRadar(w, max) {
      const cv = $("#radar"); if (!cv) return; const c = cv.getContext("2d"); const cx = 130, cy = 130, R = 96;
      const cs = getComputedStyle(root); const acc = cs.getPropertyValue("--acc").trim(); const mut = cs.getPropertyValue("--mut").trim();
      const cats = [["front", "front"], ["back", "back"], ["datos", "datos"], ["redes", "redes"], ["soporte", "soporte"]];
      c.clearRect(0, 0, 260, 260);
      for (let ring = 1; ring <= 3; ring++) { c.beginPath(); for (let i = 0; i <= 5; i++) { const a = -Math.PI / 2 + (i / 5) * Math.PI * 2; const r = (R * ring) / 3; const x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r; i ? c.lineTo(x, y) : c.moveTo(x, y); } c.closePath(); c.strokeStyle = "rgba(150,150,150,.25)"; c.stroke(); }
      c.beginPath();
      cats.forEach((k, i) => { const a = -Math.PI / 2 + (i / 5) * Math.PI * 2; const v = (w[k[0]] / max) * R * 0.95 + 6; const x = cx + Math.cos(a) * v, y = cy + Math.sin(a) * v; i ? c.lineTo(x, y) : c.moveTo(x, y); });
      c.closePath(); c.fillStyle = acc + "33"; c.fill(); c.strokeStyle = acc; c.lineWidth = 2; c.stroke();
      c.fillStyle = mut; c.font = "11px monospace"; c.textAlign = "center";
      cats.forEach((k, i) => { const a = -Math.PI / 2 + (i / 5) * Math.PI * 2; const x = cx + Math.cos(a) * (R + 16), y = cy + Math.sin(a) * (R + 16); c.fillText(k[0], x, y + 4); });
    }
    addEventListener("keydown", (e) => { if (wrap.hidden) return; if (e.key === "Escape") close(); });
    $("#quizClose").addEventListener("click", close);
    return { open };
  }
  let quiz = null;

  /* ---------- CHATBOT (Conectado a IA vía Cloudflare) ---------- */
  function Chatbot() {
    const win = $("#chatWin"), log = $("#chatLog"), chips = $("#chatChips"), fab = $("#chatFab");
    if (!win) return;
    const C = I18N.chat || {}; let open = false, greeted = false;

    function add(text, who) { 
      const m = D.createElement("div"); 
      m.className = "msg " + who; 
      m.innerHTML = text; 
      log.appendChild(m); 
      log.scrollTop = log.scrollHeight; 
    }

    async function reply(text) {
      const m = D.createElement("div"); 
      m.className = "msg bot typing"; 
      m.innerHTML = '<span style="font-size:0.8rem; color:var(--mut);">escribiendo...</span>'; 
      log.appendChild(m); 
      log.scrollTop = log.scrollHeight;

      try {
        const workerUrl = "https://hpb-chat.hectorpiquer2611.workers.dev/"; 
        
        const res = await fetch(workerUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: text })
        });
        
        const data = await res.json();
        
        m.classList.remove("typing");
        m.innerHTML = data.reply || "Lo siento, no he podido responder.";
        
      } catch (e) {
        m.classList.remove("typing");
        m.innerHTML = "Ups, parece que mi cerebro artificial está desconectado. Prueba a preguntarme otra cosa o usa el formulario de contacto.";
      }
      log.scrollTop = log.scrollHeight;
    }

    function buildChips() { 
      chips.innerHTML = ""; 
      ((C.chips && C.chips[LANG]) || []).forEach((c) => { 
        const b = D.createElement("button"); 
        b.type = "button"; 
        b.textContent = c; 
        b.addEventListener("click", () => { send(c); }); 
        chips.appendChild(b); 
      }); 
    }

    function send(text) { 
      text = (text || "").trim(); 
      if (!text) return; 
      add(text, "user"); 
      const inp = $("#chatIn"); 
      if (inp) inp.value = ""; 
      reply(text); 
    }

    function toggle() { 
      open = !open; 
      if (open) { 
        win.hidden = false; 
        requestAnimationFrame(() => win.classList.add("open")); 
        fab.setAttribute("aria-expanded", "true"); 
        fab.classList.add("read"); 
        if (!greeted) { 
          add(C.greet[LANG === "en" ? 1 : 0], "bot"); 
          buildChips(); 
          greeted = true; 
        } 
        setTimeout(() => $("#chatIn").focus(), 200); 
      } else { 
        win.classList.remove("open"); 
        fab.setAttribute("aria-expanded", "false"); 
        setTimeout(() => { if (!open) win.hidden = true; }, 300); 
      } 
    }

    fab.addEventListener("click", () => { sfx.click(); toggle(); });
    $("#chatX").addEventListener("click", toggle);
    $("#chatSend").addEventListener("click", () => send($("#chatIn").value));
    $("#chatIn").addEventListener("keydown", (e) => { if (e.key === "Enter") send(e.target.value); });
    
    return { toggle };
  }

  /* ---------- REPRODUCTOR (iTunes) ---------- */
  function Player() {
    const win = $("#pl"), list = $("#plList"), gen = $("#plGen"), aud = $("#aud"), fab = $("#plFab");
    if (!win) return;
    let open = false, tracks = [], cur = -1, timer = null;
    const GEN = LANG === "en" ? ["Rock", "Pop", "Hip-Hop", "Electronic", "Metal", "Jazz", "Lo-fi"] : ["Rock", "Pop", "Hip-Hop", "Electrónica", "Metal", "Jazz", "Lo-fi"];
    function buildGen() { gen.innerHTML = ""; GEN.forEach((g, i) => { const b = D.createElement("button"); b.type = "button"; b.textContent = g; if (i === 0) b.classList.add("on"); b.addEventListener("click", () => { $$("#plGen button").forEach((x) => x.classList.remove("on")); b.classList.add("on"); search(g); }); gen.appendChild(b); }); }
    async function search(q) {
      list.innerHTML = `<li class="pl-empty">…</li>`;
      try {
        const url = `https://itunes.apple.com/search?term=${encodeURIComponent(q)}&media=music&entity=song&limit=12`;
        const r = await fetch(url);
        if (!r.ok) throw new Error("http " + r.status);
        const j = await r.json();
        tracks = (j.results || []).filter((t) => t.previewUrl);
        if (!tracks.length) { list.innerHTML = `<li class="pl-empty">${LANG === "en" ? "No results" : "Sin resultados"}</li>`; return; }
        list.innerHTML = "";
        tracks.forEach((t, i) => { const li = D.createElement("li"); li.dataset.i = i;
          const art = (t.artworkUrl100 || "").replace("100x100", "60x60");
          li.innerHTML = `<img loading="lazy" src="${art}" alt=""><div style="min-width:0;flex:1"><div class="ti">${escapeHtml(t.trackName)}</div><div class="ar">${escapeHtml(t.artistName)}</div></div><span class="go">▶</span>`;
          li.addEventListener("click", () => play(i)); list.appendChild(li); });
      } catch (e) { 
        list.innerHTML = '<li class="pl-empty" style="padding:2rem 1rem; line-height:1.6; text-align:center;">' +
          '<div style="font-size:2rem; margin-bottom:0.5rem;">🚫</div>' +
          '<b style="color:var(--acc);">' + (LANG === "en" ? "Connection blocked" : "Conexión bloqueada") + '</b><br>' +
          '<span style="font-size:0.8rem;">' + (LANG === "en" ? "Your network or ad-blocker is blocking the iTunes API." : "Tu red o el bloqueador de anuncios está bloqueando la API de iTunes.") + '</span><br>' +
          '<button onclick="this.parentElement.innerHTML=\'…\'; document.getElementById(\'plQ\').dispatchEvent(new KeyboardEvent(\'keydown\', {key: \'Enter\'}));" style="margin-top:1rem; background:var(--acc); color:#000; border:none; padding:0.4rem 1rem; border-radius:6px; cursor:pointer; font-family:var(--mono); font-weight:bold;">' + (LANG === "en" ? "Retry" : "Reintentar") + '</button>' +
        '</li>'; 
      }
    }
    function play(i) {
      cur = i; const t = tracks[i]; aud.src = t.previewUrl; aud.volume = ($("#plVol").value / 100) * (mute ? 0 : 1); aud.play().catch(() => {});
      $$("#plList li").forEach((li) => li.classList.toggle("cur", +li.dataset.i === i));
      $("#plNow").textContent = t.trackName; fab.classList.add("on");
      clearInterval(timer); timer = setInterval(() => { const pr = $("#plProg"); if (aud.duration) pr.style.width = (aud.currentTime / aud.duration * 100) + "%"; if (aud.ended) next(); }, 400);
    }
    function togglePlay() { if (cur < 0) { if (tracks[0]) play(0); return; } if (aud.paused) { aud.play(); $("#plPlay").textContent = "⏸"; } else { aud.pause(); $("#plPlay").textContent = "▶"; } }
    function next() { if (!tracks.length) return; play((cur + 1) % tracks.length); }
    function prev() { if (!tracks.length) return; play((cur - 1 + tracks.length) % tracks.length); }
    let mute = false;
    function toggle() { open = !open; if (open) { win.hidden = false; requestAnimationFrame(() => win.classList.add("open")); buildGen(); if (!tracks.length) search(GEN[0]); fab.setAttribute("aria-expanded", "true"); } else { win.classList.remove("open"); aud.pause(); fab.setAttribute("aria-expanded", "false"); setTimeout(() => { if (!open) win.hidden = true; }, 300); } }
    function minimize() { open = false; win.classList.remove("open"); fab.setAttribute("aria-expanded", "false"); setTimeout(() => { if (!open) win.hidden = true; }, 300); }
    fab.addEventListener("click", () => { sfx.click(); toggle(); });
    $("#plX").addEventListener("click", toggle);
    $("#plMin").addEventListener("click", minimize);
    $("#plPlay").addEventListener("click", togglePlay);
    $("#plNext").addEventListener("click", next);
    $("#plPrev").addEventListener("click", prev);
    $("#plVol").addEventListener("input", (e) => { aud.volume = (e.target.value / 100) * (mute ? 0 : 1); });
    $("#plMute").addEventListener("click", () => { mute = !mute; aud.muted = mute; $("#plMute").textContent = mute ? "🔇" : "🔊"; });
    $("#plQ").addEventListener("keydown", (e) => { if (e.key === "Enter") search(e.target.value); });
    aud.addEventListener("ended", next);
    return {};
  }

  /* ---------- NOTICIAS (Hacker News) ---------- */
  async function loadNews(q) {
    const grid = $("#newsGrid"); if (!grid) return;
    if (!q) q = "";
    grid.innerHTML = `<div class="news-card skel-card"><div class="skel w70"></div><div class="skel w40"></div></div><div class="news-card skel-card"><div class="skel w70"></div><div class="skel w40"></div></div>`;
    try {
      const term = q ? `q=${encodeURIComponent(q)}` : "tags=story";
      const url = `https://hn.algolia.com/api/v1/search_by_date?${term}&hitsPerPage=6&numericFilters=points>30`;
      const r = await fetch(url); const j = await r.json();
      const hits = (j.hits || []).filter((h) => h.title);
      if (!hits.length) { grid.innerHTML = `<div class="news-empty">${t("news.empty")}</div>`; return; }
      grid.innerHTML = "";
      hits.forEach((h) => {
        const a = D.createElement("a"); a.className = "news-card"; a.href = h.url || `https://news.ycombinator.com/item?id=${h.objectID}`; a.target = "_blank"; a.rel = "noopener";
        const ago = timeAgo(h.created_at);
        a.innerHTML = `<span class="nt">${escapeHtml(h.title)}</span>
          <span class="nm"><span class="pts">▲ ${h.points || 0} ${t("news.pts")}</span><span class="src">${escapeHtml(h.author || "HN")}</span><span>${ago}</span></span>`;
        grid.appendChild(a);
      });
    } catch (e) { grid.innerHTML = `<div class="news-empty">${t("news.error")}</div>`; }
  }
  function timeAgo(iso) {
    const d = (Date.now() - new Date(iso)) / 1000; const u = LANG === "en" ? ["s", "m", "h", "d"] : ["s", "min", "h", "d"];
    if (d < 60) return Math.floor(d) + u[0]; if (d < 3600) return Math.floor(d / 60) + u[1];
    if (d < 86400) return Math.floor(d / 3600) + u[2]; return Math.floor(d / 86400) + u[3];
  }
  const escapeHtml = (s) => (s || "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* ---------- GITHUB (Modificado: con caché y fallback) ---------- */
  const GH_USER = "hectorpiquer";
  
  async function ghFetch(url) {
    const res = await fetch(url, { headers: { Accept: "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28" } });
    if (!res.ok) { const err = new Error("gh " + res.status); err.status = res.status; throw err; }
    return res.json();
  }
  
  async function ghWithRetry(url, tries = 3) {
    for (let i = 0; i < tries; i++) {
      try { return await ghFetch(url); }
      catch (e) { if (e.status === 404) throw e; if (i < tries - 1) await new Promise((r) => setTimeout(r, 700 * (i + 1))); else throw e; }
    }
  }

  async function loadGitHub() {
    const grid = $("#ghRepos"), note = $("#ghNote");
    
    const fallbackRepos = [{
      name: "web_personal",
      description: "Esta misma web. HTML, CSS y JS puros sin frameworks.",
      html_url: "https://github.com/hectorpiquer/web_personal",
      language: "JavaScript",
      stargazers_count: 0,
      forks_count: 0,
      pushed_at: new Date().toISOString()
    }];
    
    const renderRepos = (list) => {
      if (!list || !list.length) { grid.innerHTML = `<div class="gh-empty">${t("gh.empty")}</div>`; return; }
      grid.innerHTML = "";
      list.slice(0, 6).forEach((r) => {
        const a = D.createElement("a"); a.className = "gh-card"; a.href = r.html_url; a.target = "_blank"; a.rel = "noopener";
        const lang = r.language ? `<span class="lang">${escapeHtml(r.language)}</span>` : "";
        const up = r.pushed_at ? timeAgo(r.pushed_at) : "";
        a.innerHTML = `<p class="n"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5z"/></svg>${escapeHtml(r.name)}</p>
          <p class="d">${escapeHtml(r.description || (LANG === "en" ? "No description" : "Sin descripción"))}</p>
          <div class="m">${lang}<span class="star">★ ${r.stargazers_count}</span><span>⑂ ${r.forks_count}</span><span class="up">${up}</span></div>`;
        grid.appendChild(a);
      });
    };

    const updateMetrics = (commits, langs, stars, updated) => {
      setText("#caseCommits", commits);
      setText("#caseLangs", langs);
      setText("#caseStars", stars);
      setText("#caseUpdated", updated);
    };

    try {
      const repos = await ghWithRetry(`https://api.github.com/users/${GH_USER}/repos?per_page=100&sort=updated`);
      const list = (Array.isArray(repos) ? repos : []).filter((r) => !r.fork).sort((a, b) => (b.stargazers_count - a.stargazers_count) || (new Date(b.pushed_at) - new Date(a.pushed_at)));
      
      if (note) { note.hidden = false; note.textContent = LANG === "en" ? "// public GitHub API · no key" : "// API pública de GitHub · sin clave"; }
      
      renderRepos(list);
      store.set("gh_cache_repos", list);

      try {
        const wp = await ghWithRetry(`https://api.github.com/repos/${GH_USER}/web_personal`);
        if (wp) {
          const langs = await ghWithRetry(`https://api.github.com/repos/${GH_USER}/web_personal/languages`).catch(() => ({}));
          const top = Object.keys(langs || {}).sort((a, b) => langs[b] - langs[a])[0] || "—";
          
          let totalCommits = 0, page = 1;
          while (page <= 5) {
            const data = await ghWithRetry(`https://api.github.com/repos/${GH_USER}/web_personal/commits?per_page=100&page=${page}`);
            if (!Array.isArray(data)) break;
            totalCommits += data.length;
            if (data.length < 100) break;
            page++;
          }
          
          updateMetrics(totalCommits >= 500 ? "500+" : totalCommits, top, wp.stargazers_count, wp.pushed_at ? timeAgo(wp.pushed_at) : "—");
          store.set("gh_cache_metrics", { commits: totalCommits, langs: top, stars: wp.stargazers_count, updated: wp.pushed_at });
        }
      } catch (e) {
        const cacheM = store.get("gh_cache_metrics", null);
        if (cacheM) updateMetrics(cacheM.commits, cacheM.langs, cacheM.stars, cacheM.updated ? timeAgo(cacheM.updated) : "—");
      }

    } catch (e) {
      const cacheR = store.get("gh_cache_repos", null);
      const cacheM = store.get("gh_cache_metrics", null);
      
      if (cacheR && cacheR.length > 0) {
        renderRepos(cacheR);
        if (note) { note.hidden = false; note.textContent = "// Datos guardados (límite de API)"; }
      } else {
        renderRepos(fallbackRepos);
        if (note) { note.hidden = false; note.textContent = "// API bloqueada por la red. Mostrando datos básicos."; }
      }
      
      if (cacheM) {
        updateMetrics(cacheM.commits, cacheM.langs, cacheM.stars, cacheM.updated ? timeAgo(cacheM.updated) : "—");
      } else {
        updateMetrics("> 100", "JavaScript", "0", "reciente");
      }
    }
  }
  function setText(sel, v) { const el = $(sel); if (el) el.textContent = v; }

  /* ---------- UBICACIÓN (IP del usuario) + CLIMA (Open-Meteo) ---------- */
  async function loadUserLocation() {
    const locEl = $("#nfLoc");
    let lat = 38.8935, lon = -0.691, place = "Vallada, València";
    try {
      const r = await fetch("https://ipwho.is/");
      const j = await r.json();
      if (j && j.success !== false && j.latitude != null && j.longitude != null) {
        lat = j.latitude; lon = j.longitude;
        place = [j.city, j.region, j.country].filter(Boolean).join(", ");
      }
    } catch (e) {}
    if (locEl) locEl.textContent = place;
    loadWeatherAt(lat, lon);
  }
  async function loadWeatherAt(lat, lon) {
    const el = $("#nfWeather"); if (!el) return;
    try {
      const r = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
      const j = await r.json(); const cw = j.current_weather;
      const code = cw.weathercode; let ico = "🌡️";
      if (code === 0) ico = "☀️"; else if (code <= 3) ico = "⛅"; else if (code <= 48) ico = "🌫️"; else if (code <= 67) ico = "🌧️"; else if (code <= 77) ico = "🌨️"; else if (code <= 95) ico = "⛈️"; else ico = "🌩️";
      el.textContent = `${ico} ${Math.round(cw.temperature)}°C`;
    } catch (e) { el.textContent = "—"; }
  }

  /* ---------- neofetch footer ---------- */
  function neofetch() {
    const up = $("#nfUp"), time = $("#nfTime");
    const start = Date.now();
    const tick = () => {
      if (time) time.textContent = new Date().toLocaleTimeString(LANG === "en" ? "en-GB" : "es-ES", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
      if (up) { const s = Math.floor((Date.now() - start) / 1000); up.textContent = `${Math.floor(s / 60)}m ${s % 60}s`; }
    };
    tick(); setInterval(tick, 1000);
    const y = $("#y"); if (y) y.textContent = new Date().getFullYear();
  }

  /* ---------- TOAST ---------- */
  let toastEl;
  function toast(msg) {
    if (!toastEl) { toastEl = D.createElement("div"); toastEl.className = "toast"; D.body.appendChild(toastEl); }
    toastEl.textContent = msg; toastEl.classList.add("show");
    clearTimeout(toast._t); toast._t = setTimeout(() => toastEl.classList.remove("show"), 2200);
  }

  /* ---------- contacto: copiar email + formulario ---------- */
  const WEB3FORMS_KEY = "6cdc7e70-cc5a-4d60-8da8-65140ec5b35b";
  function contact() {
    const mailBtn = $("#mailBtn"), mailMenu = $("#mailMenu");
    if (mailBtn && mailMenu) {
      mailBtn.addEventListener("click", (e) => { e.stopPropagation(); toggleMenu(mailBtn, mailMenu); });
      mailMenu.addEventListener("click", async (e) => {
        const b = e.target.closest("button[data-mail]"); if (!b) return;
        const addr = "hecpiqbel@alu.edu.gva.es";
        if (b.dataset.mail === "copy") { try { await navigator.clipboard.writeText(addr); } catch (e) { const ta = D.createElement("textarea"); ta.value = addr; D.body.appendChild(ta); ta.select(); try { D.execCommand("copy"); } catch (x) {} ta.remove(); } toast(t("cont.copied")); sfx.good(); closeMenus(); }
        else { window.open(`mailto:${addr}?subject=${encodeURIComponent(LANG === "en" ? "From the web" : "Desde la web")}`, "_blank"); closeMenus(); }
      });
    }
    const form = $("#form");
    if (!form) return;
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const n = $("#n"), c = $("#c"), m = $("#m"), tSel = $("#t");
      let ok = true;
      [[n, n.value.trim().length > 1], [c, /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(c.value)], [tSel, !!tSel.value], [m, m.value.trim().length > 4]].forEach(([el, good]) => { el.closest(".fld").classList.toggle("bad", !good); if (!good) ok = false; });
      if ($("#web").value) { $("#formMsg").textContent = "🚫"; return; }
      const msg = $("#formMsg");
      if (!ok) { msg.textContent = t("cont.formErr"); msg.className = "form-msg err"; return; }
      msg.textContent = t("cont.sending"); msg.className = "form-msg";
      const btn = form.querySelector('button[type="submit"]'); btn.disabled = true;
      try {
        if (WEB3FORMS_KEY) {
          const r = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: { "Content-Type": "application/json", "Accept": "application/json" },
            body: JSON.stringify({
              access_key: WEB3FORMS_KEY,
              from_name: "Web personal",
              subject: "Web personal: " + tSel.value,
              name: n.value,
              email: c.value,
              message: m.value
            })
          });
          const j = await r.json();
          if (!r.ok || !j.success) throw 0;
        } else {
          window.open(`mailto:hecpiqbel@alu.edu.gva.es?subject=${encodeURIComponent(tSel.value)}&body=${encodeURIComponent(m.value + "\n\n" + n.value + " <" + c.value + ">")}`, "_blank");
        }
        msg.textContent = t("cont.formOk"); msg.className = "form-msg ok"; form.reset(); sfx.good();
      } catch (err) { msg.textContent = LANG === "en" ? "Couldn't send. Try the email button." : "No pude enviar. Prueba el botón de email."; msg.className = "form-msg err"; }
      btn.disabled = false;
    });
  }

  /* ---------- paleta de comandos ---------- */
  function buildPalette() {
    const list = $("#palList"); if (!list) return;
    const cmds = [];
    VIEWS.forEach((v) => cmds.push({ ic: "➜", label: `${t("pal.go")} · ${t("nav." + v)}`, run: () => showView(v) }));
    THEMES.forEach((th) => cmds.push({ ic: "🎨", label: `${t("pal.theme")} · ${t("theme." + th)}`, run: () => setTheme(th) }));
    cmds.push({ ic: "🌐", label: `${t("pal.lang")} · ES`, run: () => setLang("es") });
    cmds.push({ ic: "🌐", label: `${t("pal.lang")} · EN`, run: () => setLang("en") });
    cmds.push({ ic: "🔊", label: `${t("pal.sound")} · ${LANG === "en" ? "toggle" : "alternar"}`, run: () => toggleSound() });
    cmds.push({ ic: "❓", label: `${t("pal.action")} · ${LANG === "en" ? "test" : "test de orientación"}`, run: () => quiz && quiz.open() });
    cmds.push({ ic: "🎮", label: `${t("pal.action")} · Arcade`, run: () => showView("arcade") });
    cmds.push({ ic: "💬", label: `${t("pal.action")} · ${LANG === "en" ? "assistant" : "asistente"}`, run: () => $("#chatFab").click() });
    list._cmds = cmds;
  }
  let palSel = 0;
  function openPalette() {
    const p = $("#palette"), inp = $("#palInput"), list = $("#palList"); if (!p) return;
    lastPalFocus = D.activeElement; p.hidden = false; requestAnimationFrame(() => p.classList.add("open")); inp.value = ""; palSel = 0; palFilter(""); inp.focus();
  }
  let lastPalFocus;
  function closePalette() { const p = $("#palette"); p.classList.remove("open"); setTimeout(() => { p.hidden = true; lastPalFocus && lastPalFocus.focus(); }, 200); }
  function palFilter(q) {
    const list = $("#palList"); const cmds = list._cmds || [];
    const items = cmds.filter((c) => c.label.toLowerCase().includes(q.toLowerCase()));
    if (palSel >= items.length) palSel = 0;
    list.innerHTML = "";
    if (!items.length) { const li = D.createElement("li"); li.textContent = t("pal.empty"); list.appendChild(li); return; }
    items.forEach((c, i) => { const li = D.createElement("li"); li.setAttribute("role", "option"); li.setAttribute("aria-selected", i === palSel); li.innerHTML = `<span class="pal-ic">${c.ic}</span>${escapeHtml(c.label)}<span class="pal-hint">${t("pal.hint")}</span>`; li.dataset.i = i; li._c = c; li.addEventListener("click", () => { c.run(); closePalette(); }); list.appendChild(li); });
    list._items = items;
  }
  function palMove(d) { const list = $("#palList"); const items = list._items || []; if (!items.length) return; palSel = (palSel + d + items.length) % items.length; palFilter($("#palInput").value); }
  function palRun() { const list = $("#palList"); const items = list._items || []; if (items[palSel]) { items[palSel]._c.run(); closePalette(); } }

  /* ---------- sonido toggle ---------- */
  function toggleSound() { SOUND_ON = !SOUND_ON; store.set("sound", SOUND_ON); const b = $("#soundBtn"); if (b) { b.textContent = SOUND_ON ? "🔊" : "🔇"; b.setAttribute("aria-pressed", SOUND_ON); } const ac = $("#arcSound"); if (ac) ac.textContent = SOUND_ON ? t("arc.soundOn") : t("arc.sound"); if (SOUND_ON) sfx.click(); }

  /* ---------- robot guía (Modificado: sin botón de mute) ---------- */
  function robotGuide() {
    const rb = $("#robot"), bub = $("#robotBubble"); if (!rb) return;
    const msgs = {
      inicio: LANG === "en" ? "Hi! Try the <b>orientation test</b> below." : "¡Hola! Prueba el <b>test de orientación</b> de abajo.",
      sobre: LANG === "en" ? "This is me: from hardware to code." : "Aquí estoy: del hardware al código.",
      formacion: LANG === "en" ? "SMR first, DAM now. Natural step." : "Primero SMR, ahora DAM. Paso natural.",
      servicios: LANG === "en" ? "What I can do for you today." : "Lo que puedo hacer por ti hoy.",
      proyectos: LANG === "en" ? "Real stuff, including this site." : "Cosas reales, incluida esta web.",
      gusta: LANG === "en" ? "Things I love doing off-screen." : "Cosas que me encantan fuera de la pantalla.",
      arcade: LANG === "en" ? "Dodge errors, grab code. Go!" : "Esquiva errores, coge código. ¡Vamos!",
      contacto: LANG === "en" ? "Copy my email or use the form." : "Copia mi email o usa el formulario."
    };
    function show(view) { if (REDUCE) return; bub.innerHTML = msgs[view] || msgs.inicio; rb.classList.add("show"); }
    function hide() { rb.classList.remove("show"); }
    
    addEventListener("hashchange", () => { const v = location.hash.replace("#", "") || "inicio"; show(v); });
    let tHide;
    addEventListener("scroll", () => { clearTimeout(tHide); tHide = setTimeout(hide, 1400); }, { passive: true });
    setTimeout(() => show(location.hash.replace("#", "") || "inicio"), 4200);
  }

  /* ---------- avatar: pupilas siguen el ratón ---------- */
  function avatarEyes() {
    const av = $("#heroPanel"); if (!av || REDUCE) return;
    const pupils = $$(".av-pupil", av);
    av.addEventListener("mousemove", (e) => {
      const r = av.getBoundingClientRect();
      const dx = Math.max(-3, Math.min(3, ((e.clientX - r.left) / r.width - 0.5) * 6));
      const dy = Math.max(-2, Math.min(2, ((e.clientY - r.top) / r.height - 0.5) * 4));
      pupils.forEach((p) => { p.style.transform = `translate(${dx}px, ${dy}px)`; });
    });
    av.addEventListener("mouseleave", () => pupils.forEach((p) => (p.style.transform = "")));
  }

  /* ---------- init ---------- */
  function init() {
    setTheme(THEME);
    applyI18n();
    runLoader();
    runIntro();
    scramble($("#inicio-title"));
    typewriter();
    backgroundFX();
    reveals();
    router();
    scrollUI();
    arcade = Arcade();
    quiz = Quiz();
    Player();
    Chatbot();
    buildPalette();
    filterGroup("#projFilter", null, "f");
    filterGroup("#newsFilter", null, "q");
    loadNews("");
    loadGitHub();
    loadUserLocation();
    neofetch();
    contact();
    robotGuide();
    avatarEyes();

    // botones header
    $("#burger") && $("#burger").addEventListener("click", () => { const n = $("#nav"); const o = n.classList.toggle("open"); $("#burger").setAttribute("aria-expanded", o); });
    $("#cmdBtn") && $("#cmdBtn").addEventListener("click", openPalette);
    $("#langBtn") && $("#langBtn").addEventListener("click", (e) => { e.stopPropagation(); toggleMenu($("#langBtn"), $("#langMenu")); });
    $$("#langMenu [data-lang]").forEach((b) => b.addEventListener("click", () => { setLang(b.dataset.lang); applyI18n(); closeMenus(); }));
    $("#themeBtn") && $("#themeBtn").addEventListener("click", (e) => { e.stopPropagation(); toggleMenu($("#themeBtn"), $("#themeMenu")); });
    $("#soundBtn") && $("#soundBtn").addEventListener("click", toggleSound);
    $("#arcSound") && $("#arcSound").addEventListener("click", toggleSound);

    // CTA test + botón chat desde chips
    $("#qcGo") && $("#qcGo").addEventListener("click", () => { sfx.click(); quiz && quiz.open(); });
    $("#newsReload") && $("#newsReload").addEventListener("click", () => { sfx.click(); loadNews($("#newsFilter .on").dataset.q); });

    // cerrar menús al hacer click fuera / esc
    D.addEventListener("click", (e) => { if (!e.target.closest(".lang-wrap, .theme-wrap, .mail-wrap")) closeMenus(); });
    D.addEventListener("keydown", (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); openPalette(); return; }
      if (e.key === "Escape") { closeMenus(); if (!$("#palette").hidden) closePalette(); }
      if (!$("#palette").hidden) {
        if (e.key === "ArrowDown") { e.preventDefault(); palMove(1); }
        else if (e.key === "ArrowUp") { e.preventDefault(); palMove(-1); }
        else if (e.key === "Enter") { e.preventDefault(); palRun(); }
      }
    });
    $("#palInput") && $("#palInput").addEventListener("input", (e) => { palSel = 0; palFilter(e.target.value); });
    $("#palette") && $("#palette").addEventListener("click", (e) => { if (e.target === $("#palette")) closePalette(); });

    // hover sfx en botones
    if (!REDUCE) $$(".btn, .icon-btn, .nav a, .seg button, .q-opt, .tz-opts button").forEach((el) => el.addEventListener("mouseenter", () => sfx.hover()));

    // re-render al cambiar pestaña (por si el juego quedó pausado)
    D.addEventListener("visibilitychange", () => { if (D.hidden && arcade) {} });
  }

  if (D.readyState === "loading") D.addEventListener("DOMContentLoaded", init);
  else init();
})();
