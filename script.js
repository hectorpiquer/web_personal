/* ==========================================================================
   HÉCTOR PIQUER · app.js — VERSIÓN FINAL LIMPIA (pégala entera)
   ========================================================================== */
(function () {
  'use strict';
  const I = window.HP_I18N || {};
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.prototype.slice.call(r.querySelectorAll(s));
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  };
  const REDUCE = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const pick = (a) => a[Math.floor(Math.random() * a.length)];
  const esc = (s) => (s || '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const norm = (s) => (s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9ñ ]/g, ' ').trim();

  const CFG = {
    githubUser: 'hectorpiquer',
    web3Key: '6cdc7e70-cc5a-4d60-8da8-65140ec5b35b',
    emailVisible: 'hecpiqbel@alu.edu.gva.es',
    xativa: { lat: 38.9916, lon: -0.5235 }
  };

  let LANG = store.get('hp_lang', (navigator.language || 'es').slice(0, 2) === 'en' ? 'en' : 'es');
  let THEME = store.get('hp_theme', 'terminal');
  const THEMES = ['terminal', 'editor', 'matrix', 'crt', 'synth'];
  const THEME_SW = { terminal: '#34d399', editor: '#0b6bcb', matrix: '#22ff88', crt: '#ffb000', synth: '#ff4d9d' };
  const VIEWS = ['inicio', 'sobre', 'formacion', 'servicios', 'proyectos', 'gusta', 'arcade', 'contacto'];

  /* ---------- TOAST ---------- */
  let toastT;
  function toast(msg, kind) { const el = $('#toast'); if (!el) return; el.textContent = msg; el.className = 'toast show ' + (kind || ''); el.hidden = false; clearTimeout(toastT); toastT = setTimeout(() => el.classList.remove('show'), 2600); }

  /* ---------- i18n ---------- */
  function t(key) { const v = I[key]; return Array.isArray(v) ? (v[LANG === 'en' ? 1 : 0] != null ? v[LANG === 'en' ? 1 : 0] : v[0]) : v; }
  function applyI18n() {
    $$('[data-i18n]').forEach(el => { const v = I[el.getAttribute('data-i18n')]; if (Array.isArray(v)) el.innerHTML = v[LANG === 'en' ? 1 : 0] != null ? v[LANG === 'en' ? 1 : 0] : v[0]; });
    $$('[data-i18n-ph]').forEach(el => { const v = I[el.getAttribute('data-i18n-ph')]; if (Array.isArray(v)) el.placeholder = v[LANG === 'en' ? 1 : 0] != null ? v[LANG === 'en' ? 1 : 0] : v[0]; });
    $$('[data-i18n-label]').forEach(el => { const v = I[el.getAttribute('data-i18n-label')]; if (Array.isArray(v)) el.setAttribute('data-tip', v[LANG === 'en' ? 1 : 0] != null ? v[LANG === 'en' ? 1 : 0] : v[0]); });
    document.documentElement.lang = LANG;
    const lc = $('#langCode'); if (lc) lc.textContent = LANG.toUpperCase();
    document.title = LANG === 'en' ? 'Héctor Piquer · From hardware to code' : 'Héctor Piquer · Hardware de origen, código por destino';
  }

  /* ---------- TEMAS ---------- */
  function setTheme(tn) {
    THEME = tn; document.documentElement.setAttribute('data-theme', tn); store.set('hp_theme', tn);
    const dot = $('#themeDot'); if (dot) dot.style.background = THEME_SW[tn];
    const nm = $('#themeName'); if (nm) nm.textContent = (I['theme.' + tn] || [tn, tn])[LANG === 'en' ? 1 : 0];
    const mt = document.querySelector('meta[name="theme-color"]'); if (mt) mt.content = getComputedStyle(document.documentElement).getPropertyValue('--bg').trim();
  }
  function buildThemeMenu() {
    const m = $('#themeMenu'); if (!m) return; m.innerHTML = '';
    THEMES.forEach(tn => {
      const b = document.createElement('button'); b.type = 'button'; b.className = 'tm-row' + (tn === THEME ? ' on' : ''); b.setAttribute('role', 'menuitem');
      b.innerHTML = '<span class="tm-sw" style="background:' + THEME_SW[tn] + '"></span><span class="tm-info"><b>' + (I['theme.' + tn] || [tn, tn])[LANG === 'en' ? 1 : 0] + '</b><span>' + (I['theme.' + tn + '.d'] || ['', ''])[LANG === 'en' ? 1 : 0] + '</span></span>';
      b.onclick = () => { setTheme(tn); blip(); buildThemeMenu(); };
      m.appendChild(b);
    });
  }

  /* ---------- POPOVERS ---------- */
  function closeAllPopovers() { $$('.popover').forEach(p => p.classList.remove('show')); $$('[aria-haspopup]').forEach(b => b.setAttribute('aria-expanded', 'false')); }
  function togglePopover(btn, menu) { const open = !menu.classList.contains('show'); closeAllPopovers(); if (open) { menu.hidden = false; requestAnimationFrame(() => menu.classList.add('show')); btn.setAttribute('aria-expanded', 'true'); } }
  function wirePopover(btn, menu) {
    btn.addEventListener('click', e => { e.stopPropagation(); togglePopover(btn, menu); });
    document.addEventListener('click', e => { if (!menu.contains(e.target) && e.target !== btn) { menu.classList.remove('show'); setTimeout(() => { if (!menu.classList.contains('show')) menu.hidden = true; }, 200); } });
  }

  /* ---------- SONIDO ---------- */
  let AC = null, soundOn = store.get('hp_sound', true);
  function blip(freq, dur, vol, type) {
    if (!soundOn || REDUCE) return;
    freq = freq || 620; dur = dur || 0.05; vol = vol || 0.05; type = type || 'triangle';
    try { AC = AC || new (window.AudioContext || window.webkitAudioContext)(); const o = AC.createOscillator(), g = AC.createGain();
      o.type = type; o.frequency.value = freq; o.connect(g); g.connect(AC.destination);
      const now = AC.currentTime; g.gain.setValueAtTime(vol, now); g.gain.exponentialRampToValueAtTime(0.0001, now + dur); o.start(now); o.stop(now + dur);
    } catch (e) {}
  }
  function syncSoundBtn() { const b = $('#soundBtn'); if (b) b.setAttribute('aria-pressed', String(soundOn)); }
  function toggleSound() { soundOn = !soundOn; store.set('hp_sound', soundOn); syncSoundBtn(); if (soundOn) blip(760, .07, .06); toast(t('ui.soundUi') + (soundOn ? ' ON' : ' OFF')); }

  /* ---------- LOADER + INTRO ---------- */
  function runLoader(cb) {
    const loader = $('#loader'), bar = $('#ldBar'), txt = $('#ldTxt'); let p = 0;
    const msgs = ['booting…', 'montando nodos…', 'cargando perfil…', 'listo ✓'];
    const iv = setInterval(() => {
      p += Math.random() * 22 + 8; if (p > 100) p = 100;
      if (bar) bar.style.width = p + '%'; if (txt) txt.textContent = msgs[Math.min(3, Math.floor(p / 26))];
      if (p >= 100) { clearInterval(iv); if (loader) { loader.classList.add('hide'); setTimeout(() => loader.remove(), 520); } setTimeout(cb, 260); }
    }, 130);
  }
  function runIntro() {
    const intro = $('#intro'); if (!intro) return;
    const cmd = $('#introCmd'), out = $('#introOut'); let done = false;
    const clk = $('#introClock'); if (clk) clk.textContent = new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    const finish = () => { if (done) return; done = true; intro.classList.add('gone'); setTimeout(() => intro.remove(), 700); };
    if (REDUCE) { finish(); return; }
    let ch = 0; const line = 'whoami';
    const type = setInterval(() => { cmd.textContent = line.slice(0, ++ch); if (ch >= line.length) { clearInterval(type); out.classList.add('show'); setTimeout(finish, 900); } }, 42);
    const sk = $('#introSkip'); if (sk) sk.onclick = () => { clearInterval(type); finish(); };
    intro.addEventListener('click', e => { if (e.target.id !== 'introSkip') finish(); });
  }

  /* ---------- ROUTING ---------- */
  function showView(id) {
    if (VIEWS.indexOf(id) === -1) id = 'inicio';
    $$('.view').forEach(v => { v.hidden = v.id !== id; });
    $$('.nav a').forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + id));
    moveInk();
    if (id !== 'arcade' && window.Arcade) Arcade.pause();
    if (id === 'arcade') setTimeout(() => { if (window.Arcade) Arcade.resize(); }, 60);
    robotFor(id);
    window.scrollTo({ top: 0, behavior: REDUCE ? 'auto' : 'smooth' });
  }
  function moveInk() { const a = $('.nav a.active'), ink = $('.nav-ink'); if (!a || !ink || matchMedia('(max-width:820px)').matches) { if (ink) ink.style.width = '0'; return; } ink.style.width = a.offsetWidth + 'px'; ink.style.transform = 'translateX(' + a.offsetLeft + 'px)'; }
  function routeFromHash() { showView((location.hash || '#inicio').slice(1)); }

  /* ---------- REVEAL ---------- */
  function initReveal() {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12 });
    $$('.rv').forEach(el => io.observe(el));
    const sb = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.querySelectorAll('.sk-fill').forEach(f => f.style.width = f.dataset.w + '%'); sb.unobserve(e.target); } }), { threshold: .2 });
    const sk = $('#skillsBars'); if (sk) sb.observe(sk);
  }

  /* ---------- SCRAMBLE + TYPEWRITER + TICKER ---------- */
  function scramble(el) {
    if (!el) return; const final = el.dataset.final || el.textContent; const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#$%&/01<>_';
    if (REDUCE) { el.textContent = final; return; }
    let frame = 0; const total = final.length;
    const iv = setInterval(() => {
      let out = ''; for (let i = 0; i < total; i++) out += i < frame / 2 ? final[i] : (final[i] === ' ' ? ' ' : chars[Math.floor(Math.random() * chars.length)]);
      el.textContent = out; frame++; if (frame / 2 >= total) { clearInterval(iv); el.textContent = final; }
    }, 40);
  }
  function typewriter() {
    const el = $('#type'); if (!el) return; const arr = (I.phrases || {})[LANG] || (I.phrases || {}).es || []; let i = 0, j = 0, del = false;
    (function step() {
      const s = arr[i] || '';
      if (!del) { el.textContent = s.slice(0, ++j); if (j === s.length) { del = true; setTimeout(step, 1600); return; } }
      else { el.textContent = s.slice(0, --j); if (j === 0) { del = false; i = (i + 1) % arr.length; } }
      setTimeout(step, del ? 26 : 46);
    })();
  }
  function renderTicker() { const tr = $('#tkTrack'); if (!tr) return; const arr = (I.ticker || {})[LANG] || (I.ticker || {}).es || []; const html = arr.map(w => '<span>' + w + '</span>').join(''); tr.innerHTML = html + html; }

  /* ---------- ROBOT ---------- */
  let robotTimer;
  function robotFor(view) {
    const b = $('#robot'); if (!b || REDUCE) return; const txt = (I.robot || {})[view]; if (!txt) return;
    const bub = $('#rbBubble'), el = $('#rbText'); el.innerHTML = pick(txt); bub.classList.add('show');
    clearTimeout(robotTimer); robotTimer = setTimeout(() => bub.classList.remove('show'), 5200);
  }

  /* ---------- NOTICIAS ---------- */
  const News = (function () {
    let page = 0, q = '', seen = {}, busy = false;
    const grid = $('#newsGrid'), more = $('#newsMore');
    function rel(ts) { const m = Math.floor((Date.now() / 1000 - ts) / 60); if (m < 60) return m + 'm'; const h = Math.floor(m / 60); if (h < 24) return h + 'h'; return Math.floor(h / 24) + 'd'; }
    function card(h) {
      const url = h.url || ('https://news.ycombinator.com/item?id=' + h.objectID);
      const src = (h.url ? (h.url.match(/https?:\/\/(?:www\.)?([^\/]+)/) || [])[1] : 'news.ycombinator.com') || 'HN';
      return '<a class="news-card" href="' + esc(url) + '" target="_blank" rel="noopener"><div class="nc-meta"><span class="src">' + esc(src) + '</span><span class="age">' + rel(h.created_at_i) + '</span></div><h4>' + esc(h.title) + '</h4><div class="nc-foot"><span><b>' + (h.points || 0) + '</b> ' + t('news.pts') + '</span><span><b>' + (h.num_comments || 0) + '</b> ' + t('news.comments') + '</span></div></a>';
    }
    function load(reset) {
      if (busy) return; busy = true; if (reset) { page = 0; seen = {}; grid.innerHTML = '<div class="news-empty">' + t('news.loading') + '</div>'; }
      fetch('https://hn.algolia.com/api/v1/search?tags=story&hitsPerPage=8&page=' + page + (q ? '&query=' + encodeURIComponent(q) : ''))
        .then(r => { if (!r.ok) throw 0; return r.json(); })
        .then(d => {
          if (reset) grid.innerHTML = '';
          const fresh = d.hits.filter(h => !seen[h.objectID] && h.title); fresh.forEach(h => seen[h.objectID] = 1);
          grid.insertAdjacentHTML('beforeend', fresh.map(card).join(''));
          if (reset && !fresh.length) grid.innerHTML = '<div class="news-empty">' + t('news.empty') + '</div>';
          more.hidden = page >= (d.nbPages || 1) - 1;
          store.set('hp_news', { t: Date.now(), html: grid.innerHTML });
        })
        .catch(() => { if (reset) grid.innerHTML = '<div class="news-empty">' + t('news.error') + '</div>'; })
        .then(() => { busy = false; });
    }
    function init() {
      $('#newsFilter').addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; $$('#newsFilter button').forEach(x => x.classList.toggle('on', x === b)); q = b.dataset.q; load(true); blip(); });
      $('#newsReload').onclick = () => { load(true); blip(); };
      more.onclick = () => { page++; load(false); };
      const c = store.get('hp_news'); if (c && c.html) grid.innerHTML = c.html;
      load(true); setInterval(() => { if (document.visibilityState === 'visible') load(true); }, 180000);
    }
    return { init };
  })();

  /* ---------- GITHUB ---------- */
  const GH = (function () {
    const list = $('#ghList');
    function headers(tok) { const h = { Accept: 'application/vnd.github+json' }; if (tok && CFG.ghToken) h.Authorization = 'Bearer ' + CFG.ghToken; return h; }
    function api(path, tok) { return fetch('https://api.github.com' + path, { headers: headers(tok) }).then(r => { if (!r.ok) throw 0; return r.json(); }); }
    function fmtDate(s) { try { return new Date(s).toLocaleDateString(LANG === 'en' ? 'en-GB' : 'es-ES', { day: '2-digit', month: 'short' }); } catch (e) { return '—'; } }
    function repoCard(r) { return '<a class="gh-repo" href="' + esc(r.html_url) + '" target="_blank" rel="noopener"><b>' + esc(r.name) + '</b><p>' + esc(r.description || '—') + '</p><div class="gh-meta"><span class="lang">' + esc(r.language || '—') + '</span><span>' + fmtDate(r.pushed_at) + '</span><span class="star">★ ' + (r.stargazers_count || 0) + '</span></div></a>'; }
    function featured(repos) {
      const guess = ['web_personal', 'portfolio', 'hectorpiquer.github.io', 'web-personal', 'web'];
      const f = repos.filter(r => guess.indexOf(r.name) > -1)[0] || repos[0]; const box = $('#caseMetrics'); if (!box || !f) return;
      const set = (m, v) => { const el = box.querySelector('[data-m="' + m + '"]'); if (el) el.textContent = v == null ? '—' : v; };
      api('/repos/' + CFG.githubUser + '/' + f.name + '/commits?per_page=1', true).then(d => set('commits', Array.isArray(d) ? d.length : '—')).catch(() => set('commits', '—'));
      api('/repos/' + CFG.githubUser + '/' + f.name + '/languages', true).then(l => { const dom = Object.keys(l).sort((a, b) => l[b] - l[a])[0]; set('lang', dom || '—'); }).catch(() => set('lang', '—'));
      set('stars', f.stargazers_count); set('push', fmtDate(f.pushed_at)); set('lh', '—');
    }
    function render() {
      list.innerHTML = '<div class="gh-status">' + t('gh.loading') + '</div>';
      api('/users/' + CFG.githubUser + '/repos?per_page=100&sort=updated', true)
        .then(rs => { const repos = (rs || []).filter(r => !r.fork).sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at)).slice(0, 8); store.set('hp_gh', { t: Date.now(), repos }); paint(repos); })
        .catch(() => {
          api('/search/repositories?q=user:' + CFG.githubUser + '&sort=updated&order=desc&per_page=100', false)
            .then(s => { const repos = (s.items || []).filter(r => !r.fork).slice(0, 8); store.set('hp_gh', { t: Date.now(), repos }); paint(repos); const n = $('.gh-note'); if (n) n.textContent = t('gh.search'); })
            .catch(() => { const c = store.get('hp_gh'); if (c && c.repos) { paint(c.repos); const n = $('.gh-note'); if (n) n.textContent = t('gh.cached'); } else { list.innerHTML = '<div class="gh-status">' + t('gh.error') + '</div>'; } });
        });
    }
    function paint(repos) { if (!repos || !repos.length) { list.innerHTML = '<div class="gh-status">' + t('gh.empty') + '</div>'; return; } list.innerHTML = repos.map(repoCard).join(''); featured(repos); }
    function init() { render(); setInterval(() => { if (document.visibilityState === 'visible') render(); }, 300000); }
    return { init };
  })();

  /* ---------- ME GUSTA ---------- */
  const Likes = (function () {
    let filter = 'all'; const saved = new Set(store.get('hp_likes', []));
    function card(l) {
      const pair = l[LANG] || l.es; const dots = [0, 1, 2, 3, 4].map(i => '<i class="' + (i < l.int ? 'on' : '') + '"></i>').join(''); const on = saved.has(l.id);
      return '<article class="like-card" data-cat="' + l.cat + '" style="--c:' + l.color + '"><button class="heart ' + (on ? 'on' : '') + '" data-id="' + l.id + '" aria-pressed="' + on + '" aria-label="' + t('likes.save') + '"><span>♥</span><span class="lbl">' + (on ? t('likes.saved') : t('likes.save')) + '</span></button><div class="lk-emoji">' + l.emoji + '</div><div class="lk-top"><h3>' + esc(pair[0]) + '</h3><span class="lk-cat">' + t('likes.f.' + l.cat) + '</span></div><p class="lk-desc">' + esc(pair[1]) + '</p><div class="lk-level">' + dots + '</div></article>';
    }
    function render() { const data = I.likes_data || []; const g = $('#likesGrid'); const vis = data.filter(l => filter === 'all' || l.cat === filter); g.innerHTML = vis.length ? vis.map(card).join('') : '<div class="news-empty">' + t('likes.empty') + '</div>'; }
    function toggle(id, btn) { if (saved.has(id)) saved.delete(id); else saved.add(id); store.set('hp_likes', Array.prototype.slice.call(saved)); const on = saved.has(id); btn.classList.toggle('on', on); btn.setAttribute('aria-pressed', on); btn.querySelector('.lbl').textContent = on ? t('likes.saved') : t('likes.save'); blip(on ? 820 : 480, .06); }
    function init() {
      render();
      $('#likesFilter').addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; $$('#likesFilter button').forEach(x => x.classList.toggle('on', x === b)); filter = b.dataset.cat; render(); blip(); });
      $('#likesGrid').addEventListener('click', e => { const b = e.target.closest('.heart'); if (b) toggle(b.dataset.id, b); });
    }
    return { init, render };
  })();

  /* ---------- RADAR + SKILLS ---------- */
  function renderRadar() {
    const box = $('#radar'); if (!box) return; const data = I.skills_data || []; const N = data.length; const cx = 170, cy = 160, R = 110;
    const ang = i => -Math.PI / 2 + i * 2 * Math.PI / N; const pt = (i, r) => [cx + Math.cos(ang(i)) * r, cy + Math.sin(ang(i)) * r];
    let rings = ''; for (let g = 1; g <= 4; g++) rings += '<polygon class="radar-grid" points="' + data.map((_, i) => pt(i, R * g / 4).join(',')).join(' ') + '"/>';
    let axes = data.map((_, i) => { const p = pt(i, R); return '<line class="radar-axis" x1="' + cx + '" y1="' + cy + '" x2="' + p[0] + '" y2="' + p[1] + '"/>'; }).join('');
    const poly = data.map((s, i) => pt(i, R * s.v / 100).join(',')).join(' ');
    const dots = data.map((s, i) => { const p = pt(i, R * s.v / 100); return '<circle class="radar-pt" cx="' + p[0] + '" cy="' + p[1] + '" r="3.4"/>'; }).join('');
    const lbls = data.map((s, i) => { const p = pt(i, R + 18); const a = p[0] < cx - 6 ? 'end' : (p[0] > cx + 6 ? 'start' : 'middle'); return '<text class="radar-lbl" x="' + p[0] + '" y="' + (p[1] + 3) + '" text-anchor="' + a + '">' + esc(s.k[LANG === 'en' ? 'en' : 'es']) + '</text>'; }).join('');
    box.innerHTML = '<svg viewBox="0 0 340 320" role="img" aria-label="radar">' + rings + axes + '<polygon class="radar-poly" points="' + poly + '"/>' + dots + lbls + '</svg>';
    const leg = $('#radarLegend'); if (leg) leg.innerHTML = data.map(s => '<li><i></i>' + esc(s.k[LANG === 'en' ? 'en' : 'es']) + '<b>' + s.v + '%</b></li>').join('');
  }
  function renderSkills() { const box = $('#skillsBars'); if (!box) return; const data = I.skills_data || []; box.innerHTML = data.map(s => '<div class="sk"><div class="sk-top"><span>' + esc(s.k[LANG === 'en' ? 'en' : 'es']) + '</span><b>' + t('sk.' + s.lbl) + '</b></div><div class="sk-bar"><span class="sk-fill" data-w="' + s.v + '"></span></div></div>').join(''); }

  /* ---------- TEST ---------- */
  const Quiz = (function () {
    const modal = $('#quizModal'); let idx = 0, score = {};
    function reset() { idx = 0; score = { front: 0, back: 0, datos: 0, redes: 0, soporte: 0 }; }
    function render() {
      const Q = I.quiz_data; if (!Q) return;
      if (idx >= Q.questions.length) return result();
      const q = Q.questions[idx]; const pct = Math.round(idx / Q.questions.length * 100); const L = LANG === 'en' ? 'en' : 'es';
      modal.innerHTML = '<div class="qz-head"><h3>' + (LANG === 'en' ? 'Orientation test' : 'Test de orientación') + '</h3><button class="qz-x" id="qzX">×</button></div><div class="qz-prog"><span style="width:' + pct + '%"></span></div><p class="qz-q">' + esc(q.q[L]) + '</p><div class="qz-opts">' + q.opts.map((o, i) => '<button class="qz-opt" data-i="' + i + '">' + esc(o.t[L]) + '</button>').join('') + '</div><div class="qz-foot"><button class="btn g" id="qzBack"' + (idx === 0 ? ' disabled' : '') + '>' + t('nav.prev') + '</button><span class="qc-res">' + (idx + 1) + '/' + Q.questions.length + '</span></div>';
      $('#qzX').onclick = () => modal.close(); $('#qzBack').onclick = () => { idx = Math.max(0, idx - 1); render(); };
      modal.querySelectorAll('.qz-opt').forEach(b => b.onclick = () => { const o = q.opts[+b.dataset.i]; Object.keys(o.w).forEach(k => score[k] += o.w[k]); blip(700, .05); idx++; render(); });
    }
    function topProfile() { let best = 'front', b = -1; Object.keys(score).forEach(k => { if (score[k] > b) { b = score[k]; best = k; } }); return best; }
    function radarSVG() { const keys = ['front', 'back', 'datos', 'redes', 'soporte']; const max = Math.max(1, keys.map(k => score[k])[0]); const N = keys.length, cx = 150, cy = 140, R = 95;
      const ang = i => -Math.PI / 2 + i * 2 * Math.PI / N; const pt = (i, r) => [cx + Math.cos(ang(i)) * r, cy + Math.sin(ang(i)) * r];
      let rings = ''; for (let g = 1; g <= 4; g++) rings += '<polygon class="radar-grid" points="' + keys.map((_, i) => pt(i, R * g / 4).join(',')).join(' ') + '"/>';
      const axes = keys.map((_, i) => { const p = pt(i, R); return '<line class="radar-axis" x1="' + cx + '" y1="' + cy + '" x2="' + p[0] + '" y2="' + p[1] + '"/>'; }).join('');
      const poly = keys.map((k, i) => pt(i, R * score[k] / max).join(',')).join(' ');
      const dots = keys.map((k, i) => { const p = pt(i, R * score[k] / max); return '<circle class="radar-pt" cx="' + p[0] + '" cy="' + p[1] + '" r="3.4"/>'; }).join('');
      const lbls = keys.map((k, i) => { const p = pt(i, R + 16); const a = p[0] < cx - 6 ? 'end' : (p[0] > cx + 6 ? 'start' : 'middle'); return '<text class="radar-lbl" x="' + p[0] + '" y="' + (p[1] + 3) + '" text-anchor="' + a + '">' + k + '</text>'; }).join('');
      return '<svg viewBox="0 0 300 280">' + rings + axes + '<polygon class="radar-poly" points="' + poly + '"/>' + dots + lbls + '</svg>';
    }
    function result() {
      const Q = I.quiz_data; const key = topProfile(); const p = Q.profiles[key]; const L = LANG === 'en' ? 'en' : 'es';
      modal.innerHTML = '<div class="qz-head"><h3>' + (LANG === 'en' ? 'Result' : 'Resultado') + '</h3><button class="qz-x" id="qzX">×</button></div><div class="qz-result"><p class="rtag">' + p.tag + '</p><h2>' + esc(p.name[L]) + '</h2><div class="qz-radar">' + radarSVG() + '</div><p class="qz-why">' + esc(p.why[L]) + '</p><ul class="qz-route">' + p.route[L].map((r, i) => '<li><span class="n">0' + (i + 1) + '</span>' + esc(r) + '</li>').join('') + '</ul><p class="qz-first"><b>' + (LANG === 'en' ? 'First step:' : 'Primer paso:') + '</b> ' + esc(p.first[L]) + '</p></div><div class="qz-foot"><button class="btn g" id="qzAgain">' + t('quiz.newOne') + '</button><button class="btn p" id="qzPdf">' + t('quiz.savePdf') + '</button></div>';
      $('#qzX').onclick = () => modal.close(); $('#qzAgain').onclick = () => { reset(); render(); }; $('#qzPdf').onclick = () => savePDF(key, p); store.set('hp_quiz', { key, date: Date.now() });
    }
    function savePDF(key, p) {
      const L = LANG === 'en' ? 'en' : 'es';
      const html = '<!doctype html><meta charset="utf-8"><title>' + t('quiz.pdfTitle') + '</title><style>body{font-family:ui-monospace,monospace;color:#111;padding:32px;line-height:1.6}h1{font-size:26px}h2{color:#0b6bcb}.tag{color:#777}ul{padding-left:18px}li{margin:6px 0}.first{background:#eef;border:1px solid #ccd;padding:12px;border-radius:8px}small{color:#999}</style><h1>' + t('quiz.pdfTitle') + '</h1><p class="tag">' + esc(p.name[L]) + ' · ' + esc(p.tag) + '</p><p>' + esc(p.why[L]) + '</p><h2>' + (LANG === 'en' ? 'Roadmap' : 'Ruta') + '</h2><ul>' + p.route[L].map((r, i) => '<li>' + (i + 1) + '. ' + esc(r) + '</li>').join('') + '</ul><p class="first"><b>' + (LANG === 'en' ? 'First step:' : 'Primer paso:') + '</b> ' + esc(p.first[L]) + '</p><p><small>' + t('quiz.pdfNote') + ' — hpb · ' + new Date().toLocaleDateString(LANG === 'en' ? 'en-GB' : 'es-ES') + '</small></p>';
      const ifr = document.createElement('iframe'); ifr.style.display = 'none'; document.body.appendChild(ifr);
      ifr.contentDocument.open(); ifr.contentDocument.write(html); ifr.contentDocument.close();
      ifr.contentWindow.onafterprint = () => ifr.remove();
      setTimeout(() => { ifr.contentWindow.focus(); ifr.contentWindow.print(); }, 300);
    }
    function showLast(key, p) {
      const L = LANG === 'en' ? 'en' : 'es';
      modal.innerHTML = '<div class="qz-head"><h3>' + (LANG === 'en' ? 'Last result' : 'Último resultado') + '</h3><button class="qz-x" id="qzX">×</button></div><div class="qz-result"><p class="rtag">' + p.tag + '</p><h2>' + esc(p.name[L]) + '</h2><p class="qz-why">' + esc(p.why[L]) + '</p><ul class="qz-route">' + p.route[L].map((r, i) => '<li><span class="n">0' + (i + 1) + '</span>' + esc(r) + '</li>').join('') + '</ul><p class="qz-first"><b>' + (LANG === 'en' ? 'First step:' : 'Primer paso:') + '</b> ' + esc(p.first[L]) + '</p></div><div class="qz-foot"><button class="btn g" id="qzAgain">' + t('quiz.newOne') + '</button><button class="btn p" id="qzPdf">' + t('quiz.savePdf') + '</button></div>';
      $('#qzX').onclick = () => modal.close(); $('#qzAgain').onclick = () => { reset(); render(); }; $('#qzPdf').onclick = () => savePDF(key, p);
    }
    function open() { reset(); const last = store.get('hp_quiz'); if (last && last.key && I.quiz_data.profiles[last.key]) showLast(last.key, I.quiz_data.profiles[last.key]); else render(); modal.showModal(); }
    function teaser() {
      const box = $('#teaser'); if (!box) return; const Q = I.quiz_data; const q = Q.questions[1]; const L = LANG === 'en' ? 'en' : 'es';
      box.innerHTML = '<p class="tz-q">' + esc(q.q[L]) + '</p>' + q.opts.map((o, i) => '<button class="tz-opt" data-i="' + i + '">' + esc(o.t[L]) + '</button>').join('');
      box.querySelectorAll('.tz-opt').forEach(b => b.onclick = () => { box.querySelectorAll('.tz-opt').forEach(x => x.classList.remove('on')); b.classList.add('on'); const o = q.opts[+b.dataset.i]; let best = 'front', m = -1; Object.keys(o.w).forEach(k => { if (o.w[k] > m) { m = o.w[k]; best = k; } }); const p = Q.profiles[best]; const foot = $('.qc-foot'); if (foot) { let res = $('.qc-res'); if (!res) { res = document.createElement('span'); res.className = 'qc-res'; foot.prepend(res); } res.textContent = t('quiz.teaserResult') + ' ' + p.name[L]; } blip(); });
    }
    function init() { const g = $('#qcGo'); if (g) g.onclick = open; teaser(); }
    return { open, init };
  })();

  /* ---------- PROYECTOS ---------- */
  function initProjects() {
    $('#projFilter').addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; $$('#projFilter button').forEach(x => x.classList.toggle('on', x === b)); const cat = b.dataset.cat; $$('#projGrid .proj').forEach(p => { p.hidden = !(cat === 'all' || p.dataset.cat === cat); }); blip(); });
    const java = 'public class ArrayStats {\n  static final int N = 100;\n\n  static void fill(int[] a) {\n    for (int i = 0; i < a.length; i++) a[i] = i;\n  }\n\n  static long sum(int[] a) {\n    long s = 0; for (int x : a) s += x; return s;\n  }\n\n  static double average(int[] a) {\n    return (double) sum(a) / a.length;\n  }\n\n  public static void main(String[] args) {\n    int[] arr = new int[N];\n    fill(arr);\n    System.out.println("Suma: " + sum(arr));\n    System.out.println("Media: " + average(arr));\n  }\n}';
    $('#projGrid').addEventListener('click', e => { const b = e.target.closest('[data-code]'); if (!b) return; const cm = $('#codeModal'); cm.innerHTML = '<div class="qz-head"><h3>Java · BlueJ</h3><button class="qz-x" id="cmX">×</button></div><pre>' + esc(java) + '</pre>'; cm.showModal(); $('#cmX').onclick = () => cm.close(); });
  }

  /* ---------- ARCADE ---------- */
  const Arcade = (function () {
    const cv = $('#arcadeCanvas'); if (!cv) return { init() {}, pause() {}, resize() {} };
    const ctx = cv.getContext('2d'); let W = 720, H = 420, dpr = 1;
    const st = { running: false, paused: false, over: false, score: 0, level: 1, combo: 1, lives: 3, best: store.get('hp_arc_best', 0), diff: 'normal', spawnAcc: 0, slow: 0, x2: 0, shield: 0, magnet: 0 };
    const player = { x: 360, y: 360, w: 40, targetX: null };
    let items = [], parts = [], floats = [], keys = { L: false, R: false }, dragging = false;
    const top = store.get('hp_arc_top', []);
    const POWERS = ['shield', 'magnet', 'slow', 'x2', 'life'];
    function css(v) { return getComputedStyle(document.documentElement).getPropertyValue(v).trim(); }
    function diffCfg() { return st.diff === 'hard' ? { spawn: 0.62, fall: 1.35, red: 0.42, gold: 0.04 } : { spawn: 0.9, fall: 1.0, red: 0.34, gold: 0.06 }; }
    function resize() { const r = cv.getBoundingClientRect(); if (!r.width) return; dpr = Math.min(2, window.devicePixelRatio || 1); W = cv.width = Math.round(r.width * dpr); H = cv.height = Math.round(r.width * 0.583 * dpr); cv.style.height = (r.width * 0.583) + 'px'; player.y = H - 60 * dpr; }
    function reset() { st.running = true; st.paused = false; st.over = false; st.score = 0; st.level = 1; st.combo = 1; st.lives = 3; st.spawnAcc = 0; st.slow = 0; st.x2 = 0; st.shield = 0; st.magnet = 0; items = []; parts = []; floats = []; player.x = W / 2; player.targetX = null; $('#arcOverlay').classList.add('hide'); syncHud(); }
    function end() { st.running = false; st.over = true; st.paused = false; const ov = $('#arcOverlay'); ov.classList.remove('hide'); $('#arcTitle').textContent = t('arc.gameover'); const rec = st.score > st.best; if (rec) { st.best = st.score; store.set('hp_arc_best', st.best); } $('#arcSub').innerHTML = st.score + (rec ? ' · <span class="rec">' + t('arc.newrec') + '</span>' : '') + ' · ' + t('arc.press'); $('#arcPlay').textContent = t('arc.again'); $('#arcPlay').hidden = false; $('#arcPause').hidden = true; pushTop(st.score); renderTop(); }
    function pushTop(s) { if (s <= 0) return; top.push(s); top.sort((a, b) => b - a); top.length = Math.min(5, top.length); store.set('hp_arc_top', top); }
    function renderTop() { const el = $('#arcTop'); el.innerHTML = top.length ? top.map((s, i) => '<li><span>#' + (i + 1) + '</span><b>' + s + '</b></li>').join('') : '<li><span>—</span><b>—</b></li>'; }
    function spawn() { const c = diffCfg(); const roll = Math.random(); let type = 'green'; if (roll < c.red) type = 'red'; else if (roll < c.red + c.gold) type = 'gold'; items.push({ x: 30 + Math.random() * (W - 60), y: -30, r: 16 * dpr, vy: (1.6 + Math.random() * 1.2 + st.level * 0.12) * c.fall * dpr, type, rot: 0, vr: (Math.random() - .5) * 0.1, pw: type === 'gold' ? pick(POWERS) : null }); }
    function burst(x, y, color, n) { n = n || 12; for (let i = 0; i < n; i++) parts.push({ x, y, vx: (Math.random() - .5) * 6 * dpr, vy: (Math.random() - .5) * 6 * dpr, life: 1, color, r: (1 + Math.random() * 3) * dpr }); }
    function floatTxt(x, y, txt, color) { floats.push({ x, y, txt, color, life: 1 }); }
    function showPower(pw) { const el = $('#arcPower'); el.hidden = false; el.innerHTML = '<span>' + t('arc.pw.' + pw) + '</span>'; setTimeout(() => { if (el) el.innerHTML = ''; }, 1200); }
    function hit(p) {
      if (p.type === 'green') { st.combo = Math.min(99, st.combo + 1); const pts = Math.round(10 * st.combo * (st.x2 ? 2 : 1)); st.score += pts; burst(p.x, p.y, css('--green')); floatTxt(p.x, p.y, '+' + pts, css('--green')); if (st.combo % 10 === 0) { st.level++; floatTxt(player.x, player.y - 40 * dpr, 'LVL ' + st.level, css('--acc')); } }
      else if (p.type === 'red') { if (st.shield > 0) { st.shield = 0; floatTxt(p.x, p.y, '🛡', css('--acc2')); burst(p.x, p.y, css('--acc2')); } else { st.lives--; st.combo = 1; burst(p.x, p.y, css('--red')); if (st.lives <= 0) return end(); } }
      else { const pw = p.pw; if (pw === 'life') { st.lives = Math.min(5, st.lives + 1); floatTxt(p.x, p.y, '+♥', css('--acc2')); } else if (pw === 'shield') { st.shield = 1; floatTxt(p.x, p.y, t('arc.pw.shield'), css('--acc2')); } else if (pw === 'magnet') { st.magnet = 420; floatTxt(p.x, p.y, t('arc.pw.magnet'), css('--acc2')); } else if (pw === 'slow') { st.slow = 360; floatTxt(p.x, p.y, t('arc.pw.slow'), css('--acc2')); } else if (pw === 'x2') { st.x2 = 480; floatTxt(p.x, p.y, t('arc.pw.x2'), css('--acc2')); } burst(p.x, p.y, css('--gold'), 16); showPower(pw); }
      syncHud();
    }
    function syncHud() { $('#arcScore').textContent = st.score; $('#arcLevel').textContent = st.level; $('#arcCombo').textContent = '×' + st.combo; $('#arcBest').textContent = st.best; $('#arcLives').textContent = '●'.repeat(Math.max(0, st.lives)); }
    function rr(x, y, w, h, r) { ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); }
    function drawRobot(x, y, s, shield) {
      ctx.save(); ctx.translate(x, y); const col = css('--acc');
      if (shield > 0) { ctx.strokeStyle = css('--acc2'); ctx.globalAlpha = .7; ctx.lineWidth = 3 * dpr; ctx.beginPath(); ctx.arc(0, 0, s * 1.1, 0, 7); ctx.stroke(); ctx.globalAlpha = 1; }
      ctx.fillStyle = css('--panel'); ctx.strokeStyle = col; ctx.lineWidth = 2.4 * dpr; rr(-s / 2, -s / 2, s, s * .8, 8 * dpr); ctx.fill(); ctx.stroke();
      ctx.fillStyle = col; ctx.fillRect(-s / 4, -s / 4, s * .18, s * .18); ctx.fillRect(s / 4 - s * .18, -s / 4, s * .18, s * .18);
      ctx.fillStyle = css('--acc2'); ctx.fillRect(-s * .22, s * .1, s * .44, s * .1);
      ctx.strokeStyle = col; ctx.beginPath(); ctx.moveTo(0, -s / 2); ctx.lineTo(0, -s / 2 - s * .28); ctx.stroke(); ctx.beginPath(); ctx.arc(0, -s / 2 - s * .32, 3 * dpr, 0, 7); ctx.fillStyle = css('--acc2'); ctx.fill();
      ctx.restore();
    }
    function drawItem(p) {
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot);
      if (p.type === 'green') { ctx.fillStyle = css('--green'); ctx.shadowColor = css('--green'); ctx.shadowBlur = 10 * dpr; ctx.font = 'bold ' + (22 * dpr) + 'px monospace'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(';', 0, 0); }
      else if (p.type === 'red') { ctx.fillStyle = css('--red'); ctx.shadowColor = css('--red'); ctx.shadowBlur = 10 * dpr; ctx.font = 'bold ' + (22 * dpr) + 'px monospace'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('!', 0, 0); }
      else { ctx.fillStyle = css('--gold'); ctx.shadowColor = css('--gold'); ctx.shadowBlur = 16 * dpr; ctx.beginPath(); ctx.arc(0, 0, p.r * .9, 0, 7); ctx.fill(); ctx.fillStyle = '#111'; ctx.font = 'bold ' + (14 * dpr) + 'px monospace'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('★', 0, 1); }
      ctx.restore();
    }
    function draw() {
      ctx.clearRect(0, 0, W, H); ctx.strokeStyle = 'rgba(255,255,255,.04)'; ctx.lineWidth = 1;
      for (let x = 0; x < W; x += 40 * dpr) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
      for (let y = 0; y < H; y += 40 * dpr) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
      items.forEach(drawItem);
      parts.forEach(q => { ctx.globalAlpha = Math.max(0, q.life); ctx.fillStyle = q.color; ctx.beginPath(); ctx.arc(q.x, q.y, q.r, 0, 7); ctx.fill(); }); ctx.globalAlpha = 1;
      drawRobot(player.x, player.y, player.w * .8 * dpr, st.shield);
      floats.forEach(f => { ctx.globalAlpha = Math.max(0, f.life); ctx.fillStyle = f.color; ctx.font = 'bold ' + (16 * dpr) + 'px monospace'; ctx.textAlign = 'center'; ctx.fillText(f.txt, f.x, f.y); }); ctx.globalAlpha = 1;
    }
    function step() {
      if (st.running && !st.paused) {
        const c = diffCfg(); st.spawnAcc++; if (st.spawnAcc > c.spawn * 60 / (1 + st.level * .1)) { st.spawnAcc = 0; spawn(); }
        const sp = 7 * dpr; if (keys.L) player.x -= sp; if (keys.R) player.x += sp;
        if (player.targetX != null) player.x += (player.targetX - player.x) * .25;
        player.x = Math.max(20 * dpr, Math.min(W - 20 * dpr, player.x));
        const slowF = st.slow > 0 ? .45 : 1;
        for (let i = items.length - 1; i >= 0; i--) { const p = items[i]; p.y += p.vy * slowF; p.rot += p.vr; if (st.magnet > 0 && p.type !== 'red') p.x += (player.x - p.x) * .06; const d = Math.hypot(p.x - player.x, p.y - player.y); if (d < p.r + player.w * .5) { hit(p); items.splice(i, 1); continue; } if (p.y > H + 40 * dpr) { if (p.type === 'green') st.combo = 1; items.splice(i, 1); } }
        if (st.slow > 0) st.slow--; if (st.x2 > 0) st.x2--; if (st.magnet > 0) st.magnet--;
        for (let i = parts.length - 1; i >= 0; i--) { const q = parts[i]; q.x += q.vx; q.y += q.vy; q.vy += .12 * dpr; q.life -= .03; if (q.life <= 0) parts.splice(i, 1); }
        for (let i = floats.length - 1; i >= 0; i--) { const f = floats[i]; f.y -= .8 * dpr; f.life -= .02; if (f.life <= 0) floats.splice(i, 1); }
        syncHud();
      }
      draw(); requestAnimationFrame(step);
    }
    function togglePause(force) { if (!st.running) return; st.paused = force != null ? force : !st.paused; $('#arcPause').textContent = st.paused ? t('arc.resume') : t('arc.pause'); const ov = $('#arcOverlay'); if (st.paused) { ov.classList.remove('hide'); $('#arcTitle').textContent = t('arc.paused'); $('#arcSub').textContent = t('arc.helpPause'); } else ov.classList.add('hide'); }
    function pause() { if (st.running && !st.over) togglePause(true); }
    function init() {
      resize(); renderTop(); syncHud(); $('#arcBest').textContent = st.best;
      window.addEventListener('resize', () => { if (st.running) resize(); });
      $('#arcPlay').onclick = () => { reset(); blip(880, .08); };
      $('#arcPause').onclick = () => togglePause();
      $('#arcSound').onclick = () => { const on = $('#arcSound').getAttribute('aria-pressed') === 'true'; $('#arcSound').setAttribute('aria-pressed', String(!on)); $('#arcSound').textContent = on ? t('arc.sound') : t('arc.soundOn'); };
      $('#arcDiff').addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; $$('#arcDiff button').forEach(x => x.classList.toggle('on', x === b)); st.diff = b.dataset.diff; blip(); });
      addEventListener('keydown', e => { if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') keys.L = true; if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') keys.R = true; if (e.key === 'p' || e.key === 'P') togglePause(); if (e.key === 'Enter' && !st.running) reset(); });
      addEventListener('keyup', e => { if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') keys.L = false; if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') keys.R = false; });
      cv.addEventListener('pointerdown', e => { dragging = true; const r = cv.getBoundingClientRect(); player.targetX = (e.clientX - r.left) * (W / r.width); });
      cv.addEventListener('pointermove', e => { if (!dragging) return; const r = cv.getBoundingClientRect(); player.targetX = (e.clientX - r.left) * (W / r.width); });
      cv.addEventListener('pointerup', () => { dragging = false; player.targetX = null; });
      cv.addEventListener('pointerleave', () => { dragging = false; player.targetX = null; });
      requestAnimationFrame(step);
    }
    return { init, pause, resize };
  })();

  /* ---------- CHATBOT ---------- */
  const Chat = (function () {
    const C = I.chat || {}; let opened = false;
    const log = $('#chatLog'), chips = $('#chatChips'), panel = $('#chatPanel'), fab = $('#chatFab'), bub = $('#chatBubble');
    function match(text) { const n = norm(text); const rules = C.rules || []; let best = null, bestScore = 0; for (const r of rules) { for (const k of (r.k || [])) { const kk = norm(k); if (kk && n.indexOf(kk) > -1) { const sc = kk.length + (n.indexOf(kk) === 0 ? 2 : 0); if (sc > bestScore) { bestScore = sc; best = r; } } } } return best; }
    function ans(rule) { const a = rule.a[LANG === 'en' ? 'en' : 'es'] || rule.a.es; return pick(a); }
    function push(text, who) { const d = document.createElement('div'); d.className = 'msg ' + who; d.innerHTML = text; log.appendChild(d); log.scrollTop = log.scrollHeight; return d; }
    function typing() { const d = document.createElement('div'); d.className = 'typing'; d.innerHTML = '<i></i><i></i><i></i>'; log.appendChild(d); log.scrollTop = log.scrollHeight; return d; }
    function chipsFor(rule) { const ids = (rule && rule.chips) || ['quien', 'formacion', 'skills', 'proyectos', 'contacto', 'arcade']; chips.innerHTML = ids.slice(0, 6).map(id => { const lbl = (C.labels || {})[id]; return lbl ? '<button class="chip" data-id="' + id + '">' + lbl[LANG === 'en' ? 1 : 0] + '</button>' : ''; }).join(''); }
    function doAction(a) {
      if (!a) return;
      if (a.indexOf('goView:') === 0) showView(a.slice(7));
      else if (a === 'openQuiz') Quiz.open();
      else if (a === 'openArcade') showView('arcade');
      else if (a === 'openGitHub') window.open('https://github.com/' + CFG.githubUser, '_blank');
      else if (a === 'openCV') { const d = document.querySelector('[download]'); if (d) d.click(); }
      else if (a === 'toggleTheme') { const i = THEMES.indexOf(THEME); setTheme(THEMES[(i + 1) % THEMES.length]); buildThemeMenu(); }
      else if (a === 'toggleLang') setLang(LANG === 'es' ? 'en' : 'es');
      else if (a === 'copyMail') copyMail();
      else if (a === 'openPlayer') Player.toggle();
    }
    function reply(text) {
      const rule = match(text); const tn = typing();
      setTimeout(() => {
        tn.remove(); let body;
        if (rule) body = ans(rule); else body = pick(C.fallback || ['?']);
        const me = push(body, 'bot'); const rec = document.createElement('div'); rec.className = 'rec'; rec.innerHTML = '<button data-r="1">👍</button><button data-r="0">👎</button>'; me.appendChild(rec);
        rec.onclick = e => { const b = e.target.closest('button'); if (!b) return; push(b.dataset.r === '1' ? pick(C.like) : pick(C.dislike), 'bot'); };
        if (rule && rule.act) doAction(rule.act);
        chipsFor(rule); log.scrollTop = log.scrollHeight;
      }, REDUCE ? 60 : 420 + Math.random() * 260);
    }
    function greet() { if (log.children.length) return; push(pick(C.greet), 'bot'); chipsFor(null); }
    function open() { panel.hidden = false; requestAnimationFrame(() => panel.classList.add('open')); bub.hidden = true; opened = true; fab.setAttribute('aria-expanded', 'true'); greet(); $('#chatText').focus(); }
    function close() { panel.classList.remove('open'); setTimeout(() => { panel.hidden = true; }, 250); fab.setAttribute('aria-expanded', 'false'); }
    function init() {
      fab.onclick = () => { panel.hidden ? open() : close(); blip(); };
      $('#chatClose').onclick = close; $('#chatMin').onclick = close;
      bub.querySelector('.cb-x').onclick = e => { e.stopPropagation(); bub.hidden = true; };
      setTimeout(() => { if (!opened) bub.hidden = false; }, 9000);
      $('#chatForm').onsubmit = e => { e.preventDefault(); const v = $('#chatText').value.trim(); if (!v) return; push(esc(v), 'me'); $('#chatText').value = ''; reply(v); };
      chips.onclick = e => { const b = e.target.closest('.chip'); if (!b) return; const lbl = (C.labels || {})[b.dataset.id]; const txt = lbl ? lbl[LANG === 'en' ? 1 : 0] : b.dataset.id; push(esc(txt), 'me'); reply(txt); };
      $('#chatClear').onclick = () => { log.innerHTML = ''; greet(); };
    }
    return { init, open };
  })();

  /* ---------- PALETA DE COMANDOS ---------- */
  const Palette = (function () {
    const pal = $('#cmdPalette'), input = $('#cmdInput'), listEl = $('#cmdList'); let items = [], filtered = [], sel = 0;
    function build() {
      items = [];
      VIEWS.forEach(v => items.push({ tag: t('pal.go'), label: (I['nav.' + v] || [v, v])[LANG === 'en' ? 1 : 0], run: () => showView(v) }));
      THEMES.forEach(tn => items.push({ tag: t('pal.theme'), label: (I['theme.' + tn] || [tn, tn])[LANG === 'en' ? 1 : 0], run: () => { setTheme(tn); buildThemeMenu(); } }));
      items.push({ tag: t('pal.lang'), label: LANG === 'es' ? 'English' : 'Español', run: () => setLang(LANG === 'es' ? 'en' : 'es') });
      items.push({ tag: t('pal.sound'), label: t('ui.soundUi'), run: toggleSound });
      items.push({ tag: t('pal.action'), label: t('quiz.ctaTitle'), run: () => Quiz.open() });
      items.push({ tag: t('pal.action'), label: t('gh.link'), run: () => window.open('https://github.com/' + CFG.githubUser, '_blank') });
      items.push({ tag: t('pal.action'), label: t('cont.cv'), run: () => { const d = document.querySelector('[download]'); if (d) d.click(); } });
      items.push({ tag: t('pal.action'), label: t('ui.player'), run: () => Player.toggle() });
      items.push({ tag: t('pal.action'), label: t('ui.assistant') || 'Asistente', run: () => Chat.open() });
    }
    function render() { const q = norm(input.value); filtered = q ? items.filter(i => norm(i.label).indexOf(q) > -1 || norm(i.tag).indexOf(q) > -1) : items; sel = Math.min(sel, Math.max(0, filtered.length - 1)); listEl.innerHTML = filtered.length ? filtered.map((i, n) => '<li class="cmd-item ' + (n === sel ? 'sel' : '') + '" data-n="' + n + '"><span class="ci-tag">' + i.tag + '</span><span>' + esc(i.label) + '</span></li>').join('') : '<div class="cmd-empty">' + t('pal.empty') + '</div>'; return filtered; }
    function open() { build(); input.value = ''; sel = 0; pal.hidden = false; requestAnimationFrame(() => pal.classList.add('open')); input.focus(); render(); }
    function close() { pal.classList.remove('open'); setTimeout(() => pal.hidden = true, 200); }
    function init() {
      $('#cmdBtn').onclick = open;
      pal.onclick = e => { if (e.target === pal) close(); };
      input.oninput = render;
      input.onclick = e => { const li = e.target.closest('.cmd-item'); if (li) { filtered[+li.dataset.n].run(); close(); } };
      input.onkeydown = e => { if (e.key === 'ArrowDown') { e.preventDefault(); sel = Math.min(sel + 1, filtered.length - 1); render(); } else if (e.key === 'ArrowUp') { e.preventDefault(); sel = Math.max(0, sel - 1); render(); } else if (e.key === 'Enter') { e.preventDefault(); if (filtered[sel]) { filtered[sel].run(); close(); } } else if (e.key === 'Escape') close(); };
      addEventListener('keydown', e => { if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); pal.hidden ? open() : close(); } });
    }
    return { init, open };
  })();

  /* ---------- REPRODUCTOR ---------- */
  const Player = (function () {
    const dock = $('#playerDock'), audio = $('#playerAudio'); let tracks = [], cur = -1;
    const genres = [['lofi'], ['rock'], ['jazz'], ['electrónica'], ['clásica'], ['hip hop'], ['pop']];
    function buildGenres() { $('#pdGenres').innerHTML = genres.map((g, i) => '<button data-term="' + g[0] + '"' + (i === 0 ? ' class="on"' : '') + '>' + g[0] + '</button>').join(''); }
    function search(term) {
      fetch('https://itunes.apple.com/search?term=' + encodeURIComponent(term) + '&media=music&limit=14')
        .then(r => r.json()).then(d => {
          tracks = (d.results || []).filter(x => x.previewUrl);
          $('#playerList').innerHTML = tracks.map((t, i) => '<div class="pd-track" data-i="' + i + '"><img loading="lazy" src="' + esc(t.artworkUrl100 || '') + '" alt=""><div class="tt"><b>' + esc(t.trackName) + '</b><span>' + esc(t.artistName) + '</span></div><span class="dur">30s</span></div>').join('') || '<div class="gh-status">—</div>';
        }).catch(() => { $('#playerList').innerHTML = '<div class="gh-status">iTunes: —</div>'; });
    }
    function play(i) { if (!tracks[i]) return; cur = i; audio.src = tracks[i].previewUrl; audio.volume = +$('#playerVol').value; audio.play().catch(() => {}); $('#playerTitle').textContent = tracks[i].trackName; $('#playerArtist').textContent = tracks[i].artistName; $('#playerArt').style.backgroundImage = 'url(' + tracks[i].artworkUrl100 + ')'; $('#playerPlay').textContent = '⏸'; $$('.pd-track').forEach((el, n) => el.classList.toggle('on', n === i)); }
    function toggle() { const open = dock.classList.contains('open'); if (!open) { dock.hidden = false; requestAnimationFrame(() => dock.classList.add('open')); $('#playerFab').setAttribute('aria-expanded', 'true'); if (!tracks.length) search('lofi'); } else { dock.classList.remove('open'); $('#playerFab').setAttribute('aria-expanded', 'false'); } }
    function init() {
      $('#playerFab').onclick = () => { toggle(); blip(); };
      $('#playerClose').onclick = toggle; buildGenres();
      $('#pdGenres').onclick = e => { const b = e.target.closest('button'); if (!b) return; $$('#pdGenres button').forEach(x => x.classList.toggle('on', x === b)); search(b.dataset.term); };
      $('#playerForm').onsubmit = e => { e.preventDefault(); search($('#playerSearch').value || 'lofi'); };
      $('#playerList').onclick = e => { const t = e.target.closest('.pd-track'); if (t) play(+t.dataset.i); };
      $('#playerPlay').onclick = () => { if (cur < 0) { play(0); return; } audio.paused ? (audio.play(), $('#playerPlay').textContent = '⏸') : (audio.pause(), $('#playerPlay').textContent = '▶'); };
      $('#playerPrev').onclick = () => play((cur - 1 + tracks.length) % tracks.length);
      $('#playerNext').onclick = () => play((cur + 1) % tracks.length);
      $('#playerVol').oninput = () => audio.volume = +$('#playerVol').value;
      audio.ontimeupdate = () => { const p = audio.duration ? audio.currentTime / audio.duration * 100 : 0; $('#playerProg').style.width = p + '%'; };
      audio.onended = () => { $('#playerPlay').textContent = '▶'; };
    }
    return { init, toggle };
  })();

  /* ---------- CLIMA ---------- */
  function loadWeather() {
    const el = $('#ftWeather'); if (!el) return; let lat = CFG.xativa.lat, lon = CFG.xativa.lon, city = 'Xàtiva';
    fetch('https://ipapi.co/json/').then(r => r.json()).then(d => { if (d.latitude && d.longitude) { lat = d.latitude; lon = d.longitude; city = d.city || 'Local'; const l = $('#ftLocal'); if (l) l.textContent = '📍 ' + city; } }).catch(() => {}).then(() => {
      fetch('https://api.open-meteo.com/v1/forecast?latitude=' + lat + '&longitude=' + lon + '&current=temperature_2m,weather_code')
        .then(r => r.json()).then(d => { const c = d.current.weather_code; const icon = c <= 2 ? '☀️' : c <= 4 ? '🌫️' : c <= 48 ? '🌧️' : c <= 67 ? '🌦️' : c <= 77 ? '❄️' : c >= 95 ? '⛈️' : '☁️'; el.textContent = icon + ' ' + Math.round(d.current.temperature_2m) + '°'; el.title = city; }).catch(() => { el.textContent = '🌡️ —'; });
    });
  }

  /* ---------- FORMULARIO ---------- */
  const Form = (function () {
    const f = $('#contactForm'); let lastSend = 0;
    const el = { name: $('#name'), company: $('#company'), email: $('#email'), subject: $('#subject'), message: $('#message'), website: $('#website') };
    function err(name, msg) { const field = f.querySelector('[name="' + name + '"]').closest('.field'); field.classList.add('bad'); const e = f.querySelector('[data-err="' + name + '"]'); if (e) e.textContent = msg; }
    function clearErrs() { $$('.field', f).forEach(x => x.classList.remove('bad')); $$('.err', f).forEach(x => x.textContent = ''); }
    function valid() {
      clearErrs(); let ok = true;
      if (el.name.value.trim().length < 2) { err('name', t('cont.nameErr')); ok = false; }
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(el.email.value)) { err('email', t('cont.mailErr')); ok = false; }
      if (!el.subject.value) { err('subject', t('cont.subjectErr')); ok = false; }
      if (el.message.value.trim().length < 10) { err('message', t('cont.msgErr')); ok = false; }
      return ok;
    }
    function saveDraft() { store.set('hp_draft', { name: el.name.value, company: el.company.value, email: el.email.value, subject: el.subject.value, message: el.message.value }); }
    function loadDraft() { const d = store.get('hp_draft'); if (d && (d.name || d.message)) { el.name.value = d.name || ''; el.company.value = d.company || ''; el.email.value = d.email || ''; el.subject.value = d.subject || ''; el.message.value = d.message || ''; const s = $('#formStatus'); s.className = 'form-status info'; s.textContent = t('cont.draft'); } }
    function send(e) {
      e.preventDefault(); if (el.website.value) return; if (!valid()) { const s = $('#formStatus'); s.className = 'form-status err'; s.textContent = t('cont.formErr'); return; }
      const now = Date.now(); if (now - lastSend < 20000) { toast(t('cont.rateLimit')); return; } lastSend = now;
      const btn = $('#formSend'); btn.disabled = true; const s = $('#formStatus'); s.className = 'form-status info'; s.textContent = t('cont.sending');
      const payload = { access_key: CFG.web3Key, subject: 'Web · ' + el.subject.value + ' · ' + el.name.value, from_name: el.name.value, name: el.name.value, company: el.company.value, email: el.email.value, subject: el.subject.value, message: el.message.value, replyto: el.email.value };
      fetch('https://api.web3forms.com/submit', { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(payload) })
        .then(r => r.json())
        .then(d => { if (d.success) { s.className = 'form-status ok'; s.textContent = t('cont.formOk'); f.reset(); store.set('hp_draft', null); toast(t('cont.formOk'), 'ok'); blip(880, .1); } else { s.className = 'form-status err'; s.textContent = t('cont.formErrMail'); } })
        .catch(() => { s.className = 'form-status err'; s.textContent = t('cont.formErrMail'); })
        .then(() => { btn.disabled = false; });
    }
    function init() { f.onsubmit = send; f.addEventListener('input', saveDraft); loadDraft(); }
    return { init };
  })();

  /* ---------- EMAIL ---------- */
  function copyMail() { if (navigator.clipboard) navigator.clipboard.writeText(CFG.emailVisible).then(() => toast(t('cont.copied'))).catch(() => toast(CFG.emailVisible)); else toast(CFG.emailVisible); }
  function initEmail() {
    const btn = $('#emailBtn'), menu = $('#emailMenu');
    btn.onclick = e => { e.stopPropagation(); const open = !menu.classList.contains('show'); closeAllPopovers(); if (open) { menu.hidden = false; requestAnimationFrame(() => menu.classList.add('show')); } };
    document.addEventListener('click', e => { if (!menu.contains(e.target) && e.target !== btn) { menu.classList.remove('show'); setTimeout(() => menu.hidden = true, 200); } });
    menu.onclick = e => { const b = e.target.closest('button'); if (!b) return; const m = b.dataset.mail; if (m === 'gmail') window.open('https://mail.google.com/mail/?view=cm&fs=1&to=' + CFG.emailVisible, '_blank'); else if (m === 'outlook') window.open('https://outlook.live.com/mail/0/compose?to=' + CFG.emailVisible, '_blank'); else copyMail(); menu.classList.remove('show'); };
    const fm = $('#ftMail'); if (fm) fm.onclick = copyMail;
  }

  /* ---------- FONDO CANVAS ---------- */
  function initBg() {
    const cv = $('#bgfx'); if (!cv) return; const ctx = cv.getContext('2d'); let W, H, pts = [];
    function size() { W = cv.width = innerWidth; H = cv.height = innerHeight; const n = Math.min(70, Math.floor(W / 24)); pts = []; for (let i = 0; i < n; i++) pts.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35 }); }
    function col() { return getComputedStyle(document.documentElement).getPropertyValue('--acc').trim() || '#34d399'; }
    function loop() {
      ctx.clearRect(0, 0, W, H); const c = col();
      for (const p of pts) { p.x += p.vx; p.y += p.vy; if (p.x < 0 || p.x > W) p.vx *= -1; if (p.y < 0 || p.y > H) p.vy *= -1; }
      ctx.lineWidth = 1;
      for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) { const a = pts[i], b = pts[j], d = Math.hypot(a.x - b.x, a.y - b.y); if (d < 120) { ctx.globalAlpha = (1 - d / 120) * .5; ctx.strokeStyle = c; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); } }
      ctx.globalAlpha = .8; ctx.fillStyle = c; for (const p of pts) { ctx.beginPath(); ctx.arc(p.x, p.y, 1.6, 0, 7); ctx.fill(); } ctx.globalAlpha = 1;
      requestAnimationFrame(loop);
    }
    size(); addEventListener('resize', size); if (!REDUCE) loop();
  }

  /* ---------- INIT ---------- */
  function init() {
    setTheme(THEME); buildThemeMenu(); applyI18n(); syncSoundBtn();
    renderTicker(); renderRadar(); renderSkills();
    wirePopover($('#langBtn'), $('#langMenu'));
    wirePopover($('#themeBtn'), $('#themeMenu'));
    $('#langMenu').onclick = e => { const b = e.target.closest('[data-lang]'); if (b) { setLang(b.dataset.lang); blip(); } };
    $('#ftLang').onclick = () => setLang(LANG === 'es' ? 'en' : 'es');
    $('#ftTheme').onclick = () => { const i = THEMES.indexOf(THEME); setTheme(THEMES[(i + 1) % THEMES.length]); buildThemeMenu(); };
    $('#soundBtn').onclick = toggleSound;
    $('#burger').onclick = () => { const n = $('#nav'); const open = n.classList.toggle('open'); $('#burger').setAttribute('aria-expanded', open); };
    $$('.nav a').forEach(a => a.onclick = () => { $('#nav').classList.remove('open'); $('#burger').setAttribute('aria-expanded', 'false'); });
    addEventListener('scroll', () => { const h = document.documentElement; const p = h.scrollTop / (h.scrollHeight - h.clientHeight) * 100; $('#bar').style.width = p + '%'; }, { passive: true });
    addEventListener('resize', moveInk);
    addEventListener('hashchange', routeFromHash);

    initBg(); initReveal(); initProjects(); initEmail();
    News.init(); GH.init(); Quiz.init(); Arcade.init(); Chat.init(); Palette.init(); Player.init(); Form.init();
    loadWeather();
    $('#ftYear').textContent = '© ' + new Date().getFullYear();
    document.addEventListener('click', e => { if (e.target.closest('.btn,.chip,.seg button,.icon-btn,.nav a,.tm-row')) blip(680, .04, .04); });

    runLoader(() => { scramble($('#inicio-title')); typewriter(); routeFromHash(); runIntro(); });

    // safety: nunca deja loader/intro bloqueando
    setTimeout(() => { const l = $('#loader'); if (l) l.classList.add('hide'); }, 4000);
    setTimeout(() => { const i = $('#intro'); if (i && !i.classList.contains('gone')) { i.classList.add('gone'); setTimeout(() => i.remove(), 700); } }, 5200);
  }

  if (document.readyState === 'loading') addEventListener('DOMContentLoaded', init); else init();
})();
