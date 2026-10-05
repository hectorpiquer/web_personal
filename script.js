(function(){
"use strict";
var html=document.documentElement; html.classList.remove("no-js"); html.classList.add("js");
var reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
document.getElementById("y").textContent=new Date().getFullYear();

/* ===== LOADER ===== */
var loader=document.getElementById("loader");
function hideLoader(){if(!loader)return;loader.classList.add("hidden");setTimeout(function(){loader.style.display="none";},700);}
if(reduce){hideLoader();}else{addEventListener("load",function(){setTimeout(hideLoader,450);});setTimeout(hideLoader,2500);}

/* ===== TEMA ===== */
function setTheme(t){html.setAttribute("data-theme",t);try{localStorage.setItem("hp-theme",t);}catch(e){}var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute("content",t==="dark"?"#0a0f1c":"#fafbfc");}
var saved;try{saved=localStorage.getItem("hp-theme");}catch(e){}
setTheme(saved||html.getAttribute("data-theme")||"dark");
var th=document.querySelector(".th");if(th)th.addEventListener("click",function(){setTheme(html.getAttribute("data-theme")==="dark"?"light":"dark");});

/* ===== VISTAS ===== */
var views=[].slice.call(document.querySelectorAll(".view"));
var links=[].slice.call(document.querySelectorAll(".nav a"));
var nav=document.getElementById("nav"),burger=document.querySelector(".burger"),ink=document.querySelector(".nav-ink");
function closeNav(){if(!nav)return;nav.classList.remove("open");burger.setAttribute("aria-expanded","false");}
burger.addEventListener("click",function(){var o=nav.classList.contains("open");nav.classList.toggle("open",!o);burger.setAttribute("aria-expanded",o?"false":"true");});
function moveInk(a){if(!a||reduce||!ink)return;var r=a.getBoundingClientRect(),p=nav.getBoundingClientRect();ink.style.width=r.width+"px";ink.style.transform="translateX("+(r.left-p.left)+"px)";}
function show(id){var t=document.getElementById(id);if(!t||!t.classList.contains("view"))t=views[0];
  views.forEach(function(v){v.hidden=(v!==t);});t.hidden=false;t.classList.remove("in");void t.offsetWidth;t.classList.add("in");
  links.forEach(function(a){var on=a.getAttribute("href")==="#"+t.id;a.classList.toggle("on",on);if(on)moveInk(a);});
  closeNav();scrollTo(0,0);
  [].forEach.call(t.querySelectorAll(".bar>i"),function(b){b.style.width="0";requestAnimationFrame(function(){requestAnimationFrame(function(){b.style.width=b.dataset.w+"%";});});});
}
links.forEach(function(a){a.addEventListener("click",function(e){e.preventDefault();var id=a.getAttribute("href").slice(1);if(location.hash.slice(1)===id)show(id);else location.hash=id;});});
document.querySelectorAll(".btn[href^='#']").forEach(function(a){a.addEventListener("click",function(e){e.preventDefault();var id=a.getAttribute("href").slice(1);if(location.hash.slice(1)===id)show(id);else location.hash=id;});});
addEventListener("hashchange",function(){show(location.hash.slice(1)||"inicio");});
addEventListener("resize",function(){moveInk(document.querySelector(".nav a.on"));});

/* ===== TYPING ===== */
var roles=["desarrollador en formación","estudiante de 1º DAM","el que repara y luego programa","buscando FCT"];
var tp=document.getElementById("type"),ri=0,ci=0,del=false;
function tw(){var w=roles[ri];tp.textContent=w.slice(0,ci);if(!del&&ci<w.length){ci++;setTimeout(tw,55);}else if(!del){del=true;setTimeout(tw,1400);}else if(ci>0){ci--;setTimeout(tw,28);}else{del=false;ri=(ri+1)%roles.length;setTimeout(tw,300);}}
if(reduce){tp.textContent=roles[0];}else{tw();}

/* ===== BARRA PROGRESO + ANILLO SUBIR (FIX) ===== */
var bar=document.getElementById("bar");
var topBtn=document.getElementById("topBtn");
var ringFg=document.getElementById("ringFg");
function onScroll(){
  var y=window.scrollY||html.scrollTop||0;
  var m=(html.scrollHeight-html.clientHeight)||0;
  var p=m>0?(y/m):0;
  bar.style.width=(p*100)+"%";
  if(ringFg)ringFg.style.strokeDashoffset=(125.66*(1-p)).toFixed(2);
  if(topBtn){var vis=y>120;topBtn.hidden=!vis;topBtn.classList.toggle("idle",!vis);}
}
addEventListener("scroll",onScroll,{passive:true});
addEventListener("resize",onScroll);
if(topBtn)topBtn.addEventListener("click",function(){scrollTo({top:0,behavior:reduce?"auto":"smooth"});});

/* ===== PARALLAX ===== */
var panel=document.querySelector(".hero .panel");
if(!reduce&&panel){addEventListener("scroll",function(){var y=html.scrollTop;if(y<600)panel.style.transform="translateY("+(y*-0.05)+"px)";},{passive:true});}

/* ===== FORMULARIO ===== */
var f=document.getElementById("form");
f.addEventListener("submit",function(e){e.preventDefault();function g(i){return document.getElementById(i).value.trim();}
  var n=g("n"),em=g("e"),c=g("c"),t=g("t"),m=g("m");
  var as=t+(em?" · "+em:"")+" — "+n;var b="Nombre: "+n+"\nEmpresa: "+(em||"—")+"\nConcepto: "+t+"\nCorreo: "+c+"\n\nMensaje:\n"+m;
  location.href="mailto:hecpiqbel@alu.edu.gva.es?subject="+encodeURIComponent(as)+"&body="+encodeURIComponent(b);});

/* ===== ARCADE ===== */
var cv=document.getElementById("game"),ctx=cv.getContext("2d"),play=document.getElementById("play"),scoreEl=document.getElementById("score");
var W=cv.width,H=cv.height,car,obs,sc,run=false,raf=0,spd=2.4;
var BAD=[";","null","//","{","}","bug","<div>","NaN"],GOOD=["git","ok","push","fn","=>"];
function pick(a){return a[Math.floor(Math.random()*a.length)];}
function bump(){if(reduce)return;scoreEl.classList.remove("bump");void scoreEl.offsetWidth;scoreEl.classList.add("bump");}
function reset(){car={x:W/2-14,y:H-52,w:28,h:34};obs=[];sc=0;spd=2.4;scoreEl.textContent="0";}
function spawn(){var good=Math.random()<0.28;var txt=good?pick(GOOD):pick(BAD);var w=txt.length*9+14;obs.push({x:Math.random()*(W-w),y:-30,w:w,h:24,txt:txt,good:good});}
function key(e){if(!run)return;var k=e.key;if(k==="ArrowLeft"||k==="a")car.x-=18;if(k==="ArrowRight"||k==="d")car.x+=18;car.x=Math.max(4,Math.min(W-car.w-4,car.x));if(["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"," "].indexOf(k)>-1)e.preventDefault();}
function touch(e){if(!run)return;var r=cv.getBoundingClientRect();var x=(e.touches[0].clientX-r.left)/r.width;car.x=x<0.5?car.x-14:car.x+14;car.x=Math.max(4,Math.min(W-car.w-4,car.x));e.preventDefault();}
function loop(){ctx.fillStyle="#060b14";ctx.fillRect(0,0,W,H);ctx.strokeStyle="rgba(52,211,153,.12)";ctx.lineWidth=2;ctx.setLineDash([8,12]);ctx.lineDashOffset=-(Date.now()/28%20);ctx.beginPath();ctx.moveTo(W/2,0);ctx.lineTo(W/2,H);ctx.stroke();ctx.setLineDash([]);
  if(Math.random()<0.028+sc*0.0005)spawn();ctx.font="bold 15px monospace";ctx.textAlign="center";ctx.textBaseline="middle";
  for(var i=obs.length-1;i>=0;i--){var o=obs[i];o.y+=spd;ctx.fillStyle=o.good?"#34d399":"#f87171";ctx.fillRect(o.x,o.y,o.w,o.h);ctx.fillStyle=o.good?"#04120c":"#1a0505";ctx.fillText(o.txt,o.x+o.w/2,o.y+o.h/2);
    if(o.y>H){obs.splice(i,1);if(o.good){sc+=2;scoreEl.textContent=sc;bump();if(spd<7)spd+=0.05;}}
    if(car.x<o.x+o.w&&car.x+car.w>o.x&&car.y<o.y+o.h&&car.y+car.h>o.y){if(o.good){sc+=3;scoreEl.textContent=sc;bump();obs.splice(i,1);}else{over();return;}}}
  ctx.fillStyle="#34d399";ctx.fillRect(car.x,car.y,car.w,car.h);ctx.fillStyle="#060b14";ctx.font="bold 18px monospace";ctx.fillText(">",car.x+car.w/2,car.y+car.h/2);raf=requestAnimationFrame(loop);}
function over(){run=false;cancelAnimationFrame(raf);ctx.fillStyle="rgba(6,11,20,.82)";ctx.fillRect(0,0,W,H);ctx.fillStyle="#e6edf6";ctx.font="bold 20px monospace";ctx.textAlign="center";ctx.fillText("SEGFAULT",W/2,H/2-6);ctx.fillStyle="#34d399";ctx.font="14px monospace";ctx.fillText("puntos: "+sc,W/2,H/2+16);ctx.fillText("pulsa jugar para reiniciar",W/2,H/2+38);play.textContent="reintentar ▶";}
function start(){reset();run=true;play.textContent="jugando…";cancelAnimationFrame(raf);loop();}
play.addEventListener("click",start);addEventListener("keydown",key);cv.addEventListener("touchstart",touch,{passive:false});cv.addEventListener("touchmove",touch,{passive:false});reset();

/* ===== PANEL GITHUB (API pública, sin clave) ===== */
(function(){
  var box=document.getElementById("ghRepos");if(!box)return;
  var KEY="hp-gh-cache",TTL=10*60*1000;
  function esc(s){return (s||"").replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[c];});}
  function card(r){return "<a class='gh-card' href='"+esc(r.html_url)+"' target='_blank' rel='noopener'><p class='n'><svg viewBox='0 0 16 16' fill='currentColor'><path d='M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v11.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5z'/></svg>"+esc(r.name)+"</p><p class='d'>"+esc(r.description||"sin descripción")+"</p><div class='m'>"+(r.language?"<span class='lang'>"+esc(r.language)+"</span>":"")+"<span class='star'>★ "+(r.stargazers_count||0)+"</span></div></a>";}
  function render(list){box.innerHTML=list.map(card).join("");}
  function load(list){try{localStorage.setItem(KEY,JSON.stringify({t:Date.now(),d:list}));}catch(e){}render(list);}
  function fetchNow(){fetch("https://api.github.com/users/hectorpiquer/repos?sort=updated&per_page=6&client_id=hpb")
    .then(function(r){if(!r.ok)throw new Error("api");return r.json();})
    .then(function(list){var clean=list.filter(function(r){return r.name!=="web_personal";}).slice(0,4);if(!clean.length)clean=list.slice(0,4);load(clean);})
    .catch(function(){box.innerHTML="<div class='gh-empty'>sin conexión con GitHub ahora mismo</div>";});}
  var cached=null;try{cached=JSON.parse(localStorage.getItem(KEY));}catch(e){}
  if(cached&&Date.now()-cached.t<TTL&&cached.d.length){render(cached.d);}else{fetchNow();}
})();

/* ===== CHATBOT PROPIO (sin IA) ===== */
(function(){
  var fab=document.getElementById("chatFab"),win=document.getElementById("chatWin"),x=document.getElementById("chatX"),
      log=document.getElementById("chatLog"),chips=document.getElementById("chatChips"),
      inp=document.getElementById("chatIn"),send=document.getElementById("chatSend");
  if(!fab)return;var last=null;
  function norm(s){return (s||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");}
  function tok(s){return norm(s).replace(/[^a-z0-9ñ ]/g," ").split(/\s+/).filter(function(w){return w.length>2;});}
  var INT=[
    {id:"hola",k:["hola","hey","buenas","que tal","holi"],r:["¡Hola! 👋 Soy el asistente de la web de Héctor. Pregúntame por su formación, qué sabe hacer, el test o las FCT.","Eh, hola. ¿Qué quieres saber? Puedo orientarte por la web."]},
    {id:"fct",k:["fct","practica","practicas","empresa","donde trabaja"],r:["Héctor busca FCT ahora mismo; su ciclo acaba en junio de 2028. Si eres empresa, el formulario de Contacto está para eso.","Las FCT son su prioridad: quiere un sitio donde aportar desde el día uno y aprender."],follow:{cuando:["Las FCT las hará en 2º, en el curso 2027-2028."],donde:["Le vale Xàtiva/Valencia, presencial o semipresencial mientras aprenda."]}},
    {id:"sabe",k:["sabe","puede","habilidades","stack","tecnolog","que hace","que sabes"],r:["Lo que maneja ya: HTML y CSS (sólido), soporte y montaje (SMR), backups y guiones. En marcha: JS, Java y SQL. Sin humo.","HTML/CSS bien, Linux y redes de SMR, Java/JS/SQL en curso. Su fuerte es entender el porqué."]},
    {id:"quien",k:["quien eres","eres","robot","bot","persona"],r:["Soy el asistente de esta web, un muñeco de HTML/CSS/JS sin IA: respondo con patrones y me adapto a lo que preguntas.","Soy un bot hecho a mano. No pienso, pero reconozco lo que preguntas y te oriento."]},
    {id:"hardware",k:["hardware","smr","repara","pc","montaje","redes"],r:["Vino del hardware: SMR montando y reparando PCs. Ese instinto de abrir y entender lo trajo al software.","Su base es SMR, sabe de máquinas de verdad. Por eso 'vengo del hardware, me voy al código'."]},
    {id:"dam",k:["dam","estudio","estudios","ies","simarro","clase","curso"],r:["Estudia 1º de DAM en el IES Simarro (Xàtiva). Ciclo de dos años, termina en junio de 2028.","DAM en el IES Simarro. Antes SMR, ahora quiere construir software."]},
    {id:"test",k:["test","orienta","brujula","perfil","informatica perfecta"],r:["En la home tienes 'Encuentra tu informática perfecta': un test que te dice qué parte del tech encaja contigo. Sin registro.","El test está en la portada: respondes y te sale un radar con tu perfil y recomendaciones. Es íntimo."]},
    {id:"arcade",k:["arcade","juego","jugar","esquiva","game"],r:["Hay un mini-juego en canvas: esquiva los rojos y coge los verdes, en la sección Arcade. Puro canvas.","El arcade va en su sección: un 'esquiva.js' hecho a mano."]},
    {id:"proyectos",k:["proyecto","proyectos","github","codigo","repo"],r:["En Proyectos está esta web y un Java de BlueJ, y por API pública verás sus repos reales de GitHub.","Sus repos están en github.com/hectorpiquer. Esta web es el proyecto estrella."]},
    {id:"precio",k:["precio","tarifa","cuanto","cuesta","cobrar","gratis"],r:["Es un estudiante en formación, no tiene tarifas: busca aprender. Para colaborar, escríbele.","No cobra: está en fase de ganar experiencia. FCT y colaboración, por el formulario."]},
    {id:"contacto",k:["contacto","correo","email","escribir","hablar","telefono"],r:["Su correo es hecpiqbel@alu.edu.gva.es. También el formulario de Contacto y el mapa del IES Simarro.","Escríbele a hecpiqbel@alu.edu.gva.es o usa el formulario. Responde en cuanto puede."]},
    {id:"musica",k:["musica","cancion","song","deezer","reproduc"],r:["Arriba a la izquierda tienes el reproductor (♪): busca o toca un género y suena un preview. Sin cuentas.","El botón ♪ abre un mini-reproductor con previews para ambientar la visita."]},
    {id:"gracias",k:["gracias","thanks","genial","bien","vale"],r:["¡De nada! Prueba el test o el arcade.","A ti. Si te queda algo, el formulario está para eso."]},
    {id:"ayuda",k:["ayuda","que puedes","opciones","comandos","menu"],r:["Puedo contarte: quién es Héctor, qué sabe, las FCT, el test, el arcade, los proyectos o cómo contactar.","Prueba con 'qué sabe', 'fct', 'test' o 'contacto'."]},
    {id:"adios",k:["adios","chao","bye","hasta luego","nos vemos"],r:["¡Hasta luego! 👋 El arcade y el test siguen aquí.","Adiós. Si vuelves, el test te recuerda tu perfil."]}
  ];
  function esc(s){return (s||"").replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[c];});}
  function fmt(s){return esc(s).replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>").replace(/\n/g,"<br>");}
  function add(t,c){var d=document.createElement("div");d.className="msg "+c;d.innerHTML=fmt(t);log.appendChild(d);log.scrollTop=log.scrollHeight;}
  function typing(){var d=document.createElement("div");d.className="msg bot";d.innerHTML="<span class='typing'><i></i><i></i><i></i></span>";log.appendChild(d);log.scrollTop=log.scrollHeight;return d;}
  function chipsFor(id){var map={hola:["quien eres","fct","test"],test:["fct","arcade","contacto"],fct:["cuando","donde","precio"],sabe:["hardware","dam","proyectos"],ayuda:["quien eres","test","arcade"]};var arr=map[id]||["quien eres","fct","test","contacto"];chips.innerHTML="";arr.forEach(function(c){var b=document.createElement("button");b.type="button";b.textContent=c;b.onclick=function(){inp.value=c;sendMsg();};chips.appendChild(b);});}
  function match(text){var t=norm(text),best=null,score=0;INT.forEach(function(it){var s=0;it.k.forEach(function(k){if(t.indexOf(k)>-1)s+=k.length;});tok(text).forEach(function(w){it.k.forEach(function(k){if(k.indexOf(w)===0)s+=1;});});if(s>score){score=s;best=it;}});return best;}
  function reply(text){var m=match(text);if(!m){add("No te he pillado del todo 🤔 Prueba con 'quién eres', 'qué sabe', 'fct', 'test' o 'contacto'.","bot");chipsFor("ayuda");return;}
    if(last&&last.follow){var f=last.follow;for(var key in f){if(norm(text).indexOf(key)>-1){add(f[key],"bot");last=m;return;}}}
    var arr=m.r;var pick=arr[(m._i||0)%arr.length];m._i=(m._i||0)+1;add(pick,"bot");last=m;chipsFor(m.id);}
  function sendMsg(){var v=inp.value.trim();if(!v)return;inp.value="";add(v,"user");var t=typing();setTimeout(function(){t.remove();reply(v);},420);}
  add("Hola 👋 Soy el asistente de la web. Pregúntame por Héctor, sus FCT, el test o el arcade. (Sin IA, hecho a mano.)","bot");chipsFor("hola");
  fab.addEventListener("click",function(){var o=win.hidden;win.hidden=false;requestAnimationFrame(function(){win.classList.add("open");});fab.setAttribute("aria-expanded",o?"true":"false");fab.classList.add("read");if(o)setTimeout(function(){inp.focus();},120);});
  x.addEventListener("click",function(){win.classList.remove("open");win.hidden=true;fab.setAttribute("aria-expanded","false");});
  send.addEventListener("click",sendMsg);inp.addEventListener("keydown",function(e){if(e.key==="Enter"){e.preventDefault();sendMsg();}});
})();

/* ===== REPRODUCTOR (iTunes Search, sin clave, CORS-ok) + volumen ===== */
(function(){
  var fab=document.getElementById("plFab"),pl=document.getElementById("pl"),x=document.getElementById("plX"),
      q=document.getElementById("plQ"),gen=document.getElementById("plGen"),list=document.getElementById("plList"),
      play=document.getElementById("plPlay"),prev=document.getElementById("plPrev"),next=document.getElementById("plNext"),
      prog=document.getElementById("plProg"),now=document.getElementById("plNow"),aud=document.getElementById("aud"),
      vol=document.getElementById("plVol"),mute=document.getElementById("plMute");
  if(!fab)return;var tracks=[],idx=-1,playing=false,VK="hp-vol";
  var GEN=["lofi","rock","electrónica","chill","jazz","hip-hop","metal","clásica","reggaetón","indie"];
  GEN.forEach(function(g){var b=document.createElement("button");b.textContent=g;b.type="button";b.onclick=function(){q.value=g;search(g);gen.querySelectorAll("button").forEach(function(o){o.classList.remove("on");});b.classList.add("on");};gen.appendChild(b);});
  function esc(s){return (s||"").replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[c];});}
  function icon(){var v=+vol.value/100;if(aud.muted||v===0){mute.textContent="🔇";return;}mute.textContent=v<0.5?"🔈":"🔊";}
  function setVol(v,save){v=Math.max(0,Math.min(1,v));aud.volume=v;aud.muted=false;vol.value=Math.round(v*100);if(save){try{localStorage.setItem(VK,String(v));}catch(e){}}icon();}
  var saved=0.7;try{var s=parseFloat(localStorage.getItem(VK));if(!isNaN(s))saved=s;}catch(e){}
  setVol(saved,false);
  vol.addEventListener("input",function(){setVol(+vol.value/100,true);});
  mute.addEventListener("click",function(){aud.muted=!aud.muted;if(!aud.muted&&+vol.value===0)setVol(0.5,true);icon();});
  function search(term){list.innerHTML='<li class="pl-empty">buscando…</li>';
    fetch("https://itunes.apple.com/search?term="+encodeURIComponent(term)+"&media=music&entity=song&limit=8")
    .then(function(r){if(!r.ok)throw new Error("http "+r.status);return r.json();})
    .then(function(d){tracks=(d.results||[]).filter(function(t){return t.previewUrl;});render();})
    .catch(function(){list.innerHTML='<li class="pl-empty">sin resultados (¿red?)</li>';});}
  function render(){list.innerHTML="";if(!tracks.length){list.innerHTML='<li class="pl-empty">nada por aquí…</li>';return;}
    tracks.forEach(function(t,i){var li=document.createElement("li");li.className=i===idx?"cur":"";
      li.innerHTML='<img src="'+esc(t.artworkUrl100)+'" alt="" loading="lazy"><div style="min-width:0"><div class="ti">'+esc(t.trackName)+'</div><div class="ar">'+esc(t.artistName)+'</div></div><span class="go">▶</span>';
      li.addEventListener("click",function(){playAt(i);});list.appendChild(li);});}
  function playAt(i){if(i<0||i>=tracks.length)return;idx=i;aud.src=tracks[i].previewUrl;aud.play();playing=true;play.textContent="❚❚";now.textContent=tracks[i].artistName+" · "+tracks[i].trackName;fab.classList.add("on");render();}
  function togglePlay(){if(idx<0){if(tracks.length)playAt(0);return;}if(playing){aud.pause();playing=false;play.textContent="▶";}else{aud.play();playing=true;play.textContent="❚❚";}}
  play.addEventListener("click",togglePlay);
  next.addEventListener("click",function(){if(tracks.length)playAt((idx+1)%tracks.length);});
  prev.addEventListener("click",function(){if(tracks.length)playAt((idx-1+tracks.length)%tracks.length);});
  aud.addEventListener("ended",function(){if(tracks.length)playAt((idx+1)%tracks.length);});
  aud.addEventListener("timeupdate",function(){if(aud.duration)prog.style.width=(aud.currentTime/aud.duration*100)+"%";});
  q.addEventListener("keydown",function(e){if(e.key==="Enter")search(q.value.trim());});
  fab.addEventListener("click",function(){var o=pl.hidden;pl.hidden=false;requestAnimationFrame(function(){pl.classList.add("open");});fab.setAttribute("aria-expanded",o?"true":"false");if(o)setTimeout(function(){q.focus();},120);});
  x.addEventListener("click",function(){pl.classList.remove("open");pl.hidden=true;fab.setAttribute("aria-expanded","false");});
})();

/* ===== TEST / BRÚJULA ===== */
var AX=[{k:"constructor",n:"Construir"},{k:"arquitecto",n:"Sistemas"},{k:"analista",n:"Analizar"},{k:"disenador",n:"Diseñar"},{k:"comunicador",n:"Personas"},{k:"explorador",n:"Explorar"},{k:"independiente",n:"Libertad"},{k:"estabilidad",n:"Estabilidad"}];
var Q=[
 {id:"origen",t:"¿De dónde vienes?",h:"No puntúa: solo cambia cómo te hablo al final.",tipo:"opt",o:[{l:"Del hardware (SMR, montaje, redes)",d:{},v:"hardware"},{l:"De otros estudios no técnicos",d:{},v:"otros"},{l:"De la curiosidad pura (autodidacta)",d:{},v:"curioso"},{l:"Ya trabajo o he tocado esto",d:{},v:"trabajo"}]},
 {id:"placer",t:"¿Qué te da más placer?",tipo:"opt",o:[{l:"Ver algo funcionar que antes no existía",d:{constructor:3,estabilidad:1}},{l:"Que tenga sentido, orden, que encaje",d:{analista:3,arquitecto:1}},{l:"Que la gente lo entienda y lo use",d:{comunicador:3,disenador:2}},{l:"Descubrir algo que no sabía",d:{explorador:3,analista:1}}]},
 {id:"ab",t:"Prefieres…",tipo:"opt",o:[{l:"Hacer que algo exista",d:{constructor:3,independiente:1}},{l:"Entender por qué algo es como es",d:{analista:3,estabilidad:1}}]},
 {id:"ab2",t:"¿Cómo trabajas mejor?",tipo:"opt",o:[{l:"Solo, decidiendo yo",d:{independiente:3}},{l:"En equipo, contrastando",d:{comunicador:2,estabilidad:1}}]},
 {id:"dia",t:"Tu día ideal estás…",tipo:"opt",o:[{l:"Construyendo ante una pantalla",d:{constructor:3}},{l:"Decidiendo cómo encaja todo",d:{arquitecto:3}},{l:"Extrayendo conclusiones de datos",d:{analista:3}},{l:"Diseñando algo claro y usable",d:{disenador:3}},{l:"Hablando con clientes/usuarios",d:{comunicador:3}},{l:"Probando algo nuevo cada día",d:{explorador:3}}]},
 {id:"s_visual",t:"¿Cuánto te atrae la interfaz / lo visual?",tipo:"esc",eje:"disenador"},
 {id:"s_sys",t:"¿Cuánto te atraen servidores, redes, cloud?",tipo:"esc",eje:"arquitecto"},
 {id:"s_data",t:"¿Cuánto te atraen datos, lógica, estadística?",tipo:"esc",eje:"analista"},
 {id:"s_people",t:"¿Cuánto te atrae traducir entre gente y máquina?",tipo:"esc",eje:"comunicador"},
 {id:"s_new",t:"¿Cuánto te atrae aprender stack nuevo vs dominar uno?",tipo:"esc",eje:"explorador"},
 {id:"riesgo",t:"¿Qué riesgo aguantas mejor?",tipo:"opt",o:[{l:"Nómina fija, dormir tranquilo",d:{estabilidad:3,independiente:-2}},{l:"Riesgo alto por libertad total",d:{independiente:3,estabilidad:-2}},{l:"Un punto medio",d:{estabilidad:1,independiente:1}}]},
 {id:"empresa",t:"¿Te ves montando algo tuyo (proyecto/empresa)?",tipo:"opt",o:[{l:"Sí, aunque sea inestable",d:{independiente:3,explorador:1,estabilidad:-1}},{l:"Prefiero crecer dentro de algo",d:{estabilidad:2,comunicador:1}}]},
 {id:"aburre",t:"¿Qué te aburre más?",tipo:"opt",o:[{l:"Repetir lo mismo siempre",d:{explorador:2,estabilidad:-2}},{l:"La ambigüedad de la gente",d:{analista:2,disenador:-1}},{l:"Código sin saber el porqué",d:{analista:2}},{l:"Trabajo en equipo constante",d:{independiente:2}}]},
 {id:"resolver",t:"Mañana, problema real. ¿Por dónde empiezas?",tipo:"opt",o:[{l:"Montar un prototipo ya",d:{constructor:3,independiente:1}},{l:"Pensar el modelo y los datos",d:{analista:2,arquitecto:2}},{l:"Preguntar al usuario",d:{comunicador:2,disenador:2}},{l:"Buscar qué hay hecho",d:{explorador:2,arquitecto:1}}]},
 {id:"c_hardware",when:function(a){return a.origen==="hardware"},t:"Cuando reparabas, ¿qué gustaba más?",tipo:"opt",o:[{l:"Montar la máquina",d:{constructor:2}},{l:"Instalar y configurar el sistema",d:{arquitecto:2}}]},
 {id:"c_dis",when:function(a){return (a.s_visual||0)>=3},t:"¿Lo harías pensando en que lo entienda cualquiera?",tipo:"opt",o:[{l:"Sí, aunque sea más lento",d:{disenador:2,comunicador:1}},{l:"No, primero que funcione",d:{constructor:2}}]},
 {id:"c_ind",when:function(a){return a.empresa===0},t:"¿Facturar tú o nómina?",tipo:"opt",o:[{l:"Facturar yo, libre",d:{independiente:2,estabilidad:-1}},{l:"Nómina, estable",d:{estabilidad:2}}]},
 {id:"c_data",when:function(a){return (a.s_data||0)>=3},t:"¿Extraer una conclusión de un caos de datos?",tipo:"opt",o:[{l:"Me encanta",d:{analista:2}},{l:"No es lo mío",d:{analista:-1,constructor:1}}]}
];
var NUC={constructor:"eres de las manos en la masa: necesitas ver algo existir",arquitecto:"piensas en sistemas, en cómo encajan las piezas grandes",analista:"necesitas entender el porqué antes de mover nada",disenador:"la persona al otro lado te importa tanto como el código",comunicador:"eres un puente natural entre humanos y máquinas",explorador:"vives para lo nuevo, dominar una cosa te aburre",independiente:"necesitas decidir, no que te digan qué hacer",estabilidad:"valoras el suelo firme y el trabajo bien hecho sin fuegos"};
var NOUN={constructor:"artesano",arquitecto:"arquitecto",analista:"detective",disenador:"diseñador",comunicador:"puente",explorador:"explorador",independiente:"libre",estabilidad:"timón"};
var ADJ={constructor:"que construye",arquitecto:"que diseña sistemas",analista:"que analiza",disenador:"que diseña",comunicador:"que conecta",explorador:"que explora",independiente:"independiente",estabilidad:"firme"};
var AREAS={
 constructor:[{n:"Frontend",q:"Dar forma a lo que la gente toca: HTML, CSS, JS.",s:"HTML·CSS·JS·React/Vue",w:"mdn + un framework",p:"18-30k junior"},{n:"Backend",q:"La lógica, la BD, lo que no se ve pero manda.",s:"Java·Node·SQL·APIs",w:"tu DAM te da esto",p:"20-34k junior"},{n:"Apps móviles",q:"Algo que vive en el bolsillo de alguien.",s:"Kotlin·Swift·Flutter",w:"un side project",p:"20-34k"},{n:"Embebido/robótica",q:"El puente hardware+código: tu SMR vale oro.",s:"C/C++·Arduino·Raspberry",w:"un micro en casa",p:"22-38k"}],
 arquitecto:[{n:"DevOps / SRE",q:"Que todo corra, escale y no se caiga.",s:"Linux·Docker·CI/CD·cloud",w:"tu Linux de SMR es la base",p:"28-48k"},{n:"Cloud",q:"Diseñar la infraestructura elástica.",s:"AWS/Azure·Terraform",w:"capa gratis de un cloud",p:"26-46k"},{n:"Redes / SysAdmin",q:"Lo que ya sabes, elevado a profesional.",s:"Redes·firewalls·scripting",w:"certif tipo CCNA/Redes",p:"24-40k"},{n:"Seguridad defensiva",q:"Cuidar el perímetro, auditar, endurecer.",s:"SIEM·hardening·Linux",w:"lab en casa",p:"26-46k"}],
 analista:[{n:"Datos / BI",q:"Convertir caos de números en decisiones.",s:"SQL·Python·dashboards",w:"un dataset público",p:"24-40k"},{n:"Ciencia de datos",q:"Modelos, predicciones, patrones ocultos.",s:"Python·ML·stats",w:"un notebook de ejemplo",p:"30-50k"},{n:"QA automatizado",q:"Cazar bugs antes que nadie, con scripts.",s:"pytest·Selenium·CI",w:"automatizar un test",p:"22-38k"},{n:"Seguridad (análisis)",q:"Entender el ataque desde la lógica.",s:"Python·logs·CTF",w:"un CTF fácil",p:"26-46k"}],
 disenador:[{n:"UX",q:"Que la gente no se pierda.",s:"Figma·tests de usuario",w:"rediseñar una app que uses",p:"24-40k"},{n:"UI",q:"La interfaz bonita y coherente.",s:"Figma·CSS·sistemas de diseño",w:"clonar una UI",p:"22-38k"},{n:"Accesibilidad",q:"Que funcione para todos.",s:"ARIA·teclado·contraste",w:"auditar tu propia web",p:"26-44k"},{n:"Game design",q:"Diseñar la diversión, no el motor.",s:"mecánicas·Unity/Godot",w:"un prototipo",p:"22-38k"}],
 comunicador:[{n:"Consultoría",q:"Traducir problemas de negocio a tecnología.",s:"comunicación·demos",w:"explicar tu web a un no técnico",p:"28-48k"},{n:"Producto (PM)",q:"Decidir qué se hace y por qué.",s:"priorizar·métricas",w:"un mini PRD",p:"30-50k"},{n:"Ventas técnicas",q:"Vender lo que entiendes. Se paga bien.",s:"producto·negociación",w:"'vender' tu arcade",p:"26-50k+comisión"},{n:"Formación",q:"Enseñar y aprender el doble.",s:"comunicar·material",w:"un tutorial corto",p:"24-40k"}],
 explorador:[{n:"I+D / I+I",q:"Probar lo que nadie ha probado.",s:"paper·prototipos",w:"reproducir un experimento",p:"30-52k"},{n:"Seguridad ofensiva",q:"Atacar para entender.",s:"CTF·Burp·Linux",w:"una máquina de HackTheBox",p:"30-55k"},{n:"IA aplicada",q:"El frontier ahora mismo.",s:"Python·LLMs·RAG",w:"un bot con una API",p:"32-55k"},{n:"XR / 3D",q:"Realidad virtual/aumentada.",s:"Unity·Blender",w:"una escena simple",p:"26-46k"}],
 independiente:[{n:"Freelance",q:"Tú pones las reglas y las facturas.",s:"especialidad·clientes",w:"un encargo pequeño",p:"variable"},{n:"Producto propio",q:"Tu idea, tu SaaS, tu riesgo.",s:"mvp·marketing",w:"una landing",p:"variable"},{n:"Microempresa",q:"Empezar pequeño y crecer.",s:"gestión·tech",w:"un proyecto con un cliente",p:"variable"}],
 estabilidad:[{n:"Gran empresa",q:"Procesos, formación, techo alto.",s:"metodología·especialidad",w:"ofertas junior",p:"22-34k"},{n:"Banca / fintech",q:"Sólido, bien pagado, exigente.",s:"Java·seguridad",w:"prácticas en banca",p:"24-38k"},{n:"Función pública tech",q:"Estabilidad absoluta.",s:"temario·informática",w:"mirar temario",p:"22-34k"}]
};
var RUTA={constructor:["Elige UNA área y haz su tutorial oficial entero","Monta un mini-proyecto este finde (feo pero funcionando)","Súbilo a GitHub con README decente","Pide feedback y arregla lo que te digan","Encadena un proyecto más grande"],arquitecto:["Domina Linux de verdad (vienes de SMR)","Aprende Docker con tu propio proyecto","Monta un CI/CD que te despliegue solo","Infraestructura como código (Terraform)","Practica en la capa gratis de un cloud"],analista:["SQL hasta la saciedad","Python + pandas con un dataset real","Un dashboard que cuente una historia","Estadística básica de verdad","Publica el análisis con conclusiones"],disenador:["Aprende Figma (1 semana)","Rediseña una app que uses a diario","Estudia sistemas de diseño reales","Test de usabilidad con 3 personas","Audita accesibilidad con teclado"],comunicador:["Un post explicando algo técnico simple","Grábate 'vendiendo' tu arcade 2 min","Demo de tu web a un no técnico","Correos que se respondan","Rol de soporte/consultoría junior"],explorador:["Una tecnología nueva, hola-mundo","Un CTF o un hackathon","Reproduce un experimento fácil","Diario de descubrimientos","Convierte lo aprendido en proyecto"],independiente:["Define UNA cosa que sabes y a quién","Landing simple de ese servicio","UN primer encargo aunque sea barato","Sistematiza (plantillas, precios)","Reinvierte y crece"],estabilidad:["Especialízate en algo que pidan grandes","Una certificación reconocida","Practica entrevistas de empresa","FCT en empresa mediana-grande","Cuida referencias y LinkedIn"]};
var PASO={constructor:"Abre tu editor y haz un botón que haga algo. Hoy.",arquitecto:"Instala Docker y levanta tu web dentro. Hoy.",analista:"Descarga un dataset público y saca UNA conclusión. Hoy.",disenador:"Rediseña la cabecera de tu web en Figma. Hoy.",comunicador:"Explícale a alguien de qué va tu web. Hoy.",explorador:"Prueba una herramienta nueva 30 min. Hoy.",independiente:"Escribe qué servicio darías y a quién. Hoy.",estabilidad:"Busca 3 ofertas junior que te encajen. Hoy."};
function entorno(i,e){if(i>=4&&e<=3)return{t:"Autónomo / freelance",d:"Necesitas decidir tú y aguantas la incertidumbre. Empieza dentro de una empresa para coger red, pero tu norte es tu proyecto."};if(i>=4&&e>=4)return{t:"Startup o micro-equipo",d:"Libertad con algo de red. Encajas donde hay autonomía sin saltar al vacío."};if(i<=3&&e>=4)return{t:"Gran empresa / consultora",d:"Suelo firme, procesos, formación. Creces dentro de una estructura clara."};return{t:"Equipo consolidado",d:"Ni loco ni aburrido: gente y estabilidad, el punto medio que funciona."};}
function label(a,b){return "el "+NOUN[a]+" "+ADJ[b];}
function cierre(o){if(o==="hardware")return "Vienes de abrir máquinas y saber qué pasa dentro. Eso no se aprende en ningún bootcamp: ya tienes el instinto. Ahora se trata de entender el código que corre sobre lo que montabas.";if(o==="otros")return "Vienes de otro lado, y eso es ventaja: ves lo que los técnicos dan por hecho. Tu mirada de fuera vale oro.";if(o==="curioso")return "Eres autodidacta: si alguien te pone un problema, no paras hasta resolverlo. Eso vale más que cualquier título.";return "Ya has tocado esto de verdad, sabes de la parte aburrida y la buena. El test solo ordena lo que intuías.";}

var quiz=document.getElementById("quiz"),qBody=document.getElementById("quizBody"),qStep=document.getElementById("quizStep"),qProg=document.getElementById("quizProg");
var quizOpen=false,order=[],qi=0,ans={},sum={};
function initQuiz(){ans={};qi=0;quizOpen=true;order=[];sum={};AX.forEach(function(x){sum[x.k]=0;});quiz.hidden=false;requestAnimationFrame(function(){quiz.classList.add("open");});buildOrder();renderQ(order[qi]);}
function buildOrder(){order=Q.filter(function(q){return !q.when||q.when(ans);});}
function closeQuiz(){quizOpen=false;quiz.classList.remove("open");setTimeout(function(){quiz.hidden=true;},350);}
function findQ(id){for(var i=0;i<Q.length;i++)if(Q[i].id===id)return Q[i];return null;}
function renderQ(q){qStep.textContent=(qi+1);qProg.style.width=Math.round((qi/order.length)*100)+"%";
  var h="<h2 class='q-q'>"+q.t+"</h2>";if(q.h)h+="<p class='q-hint'>"+q.h+"</p>";
  if(q.tipo==="esc"){h+="<div class='q-scale' role='group' aria-label='"+q.t+"'>";for(var i=1;i<=5;i++)h+="<button type='button' data-v='"+i+"' aria-pressed='"+((ans[q.id]||0)===i)+"'>"+i+"</button>";h+="</div><div class='q-scale-lbl'><span>nada</span><span>me encanta</span></div>";}
  else{h+="<div class='q-opts'>";q.o.forEach(function(op,idx){h+="<button class='q-opt' type='button' aria-pressed='"+(ans[q.id]===idx)+"'><span class='k'>"+String.fromCharCode(65+idx)+"</span><span>"+op.l+"</span></button>";});h+="</div>";}
  h+="<div class='q-nav'><button class='btn g' id='qBack' type='button' "+(qi===0?"disabled":"")+">← atrás</button><button class='btn p' id='qNext' type='button' disabled>siguiente ▶</button></div>";
  qBody.innerHTML=h;
  var back=document.getElementById("qBack");if(back)back.addEventListener("click",function(){if(qi>0){qi--;renderQ(order[qi]);}});
  var next=document.getElementById("qNext");
  if(q.tipo==="esc"){var btns=qBody.querySelectorAll(".q-scale button");btns.forEach(function(b){b.addEventListener("click",function(){ans[q.id]=+b.dataset.v;btns.forEach(function(x){x.setAttribute("aria-pressed","false");});b.setAttribute("aria-pressed","true");next.disabled=false;});});}
  else{var opts=qBody.querySelectorAll(".q-opt");opts.forEach(function(b,i){b.addEventListener("click",function(){ans[q.id]=i;opts.forEach(function(x){x.setAttribute("aria-pressed","false");});b.setAttribute("aria-pressed","true");next.disabled=false;});});}
  next.addEventListener("click",function(){if(qi<order.length-1){qi++;buildOrder();if(qi>=order.length){finish();return;}renderQ(order[qi]);}else finish();});
}
function finish(){Q.forEach(function(q){if(q.tipo==="esc"&&q.eje)sum[q.eje]=(sum[q.eje]||0)+(ans[q.id]||0);});
  var mx={};AX.forEach(function(x){mx[x.k]=0;});
  order.forEach(function(q){if(q.tipo==="esc"&&q.eje){mx[q.eje]=Math.max(mx[q.eje]||0,5);return;}if(q.o)q.o.forEach(function(op){for(var k in op.d){var dv=Math.abs(op.d[k]);if(dv>(mx[k]||0))mx[k]=dv;}});});
  AX.forEach(function(x){var m=mx[x.k]||1,v=sum[x.k];if(v<0)v=0;var n=Math.round((v/m)*100);if(n>100)n=100;sum[x.k]=n;});
  renderResult();}
function drawRadar(){var cv=document.getElementById("radar");if(!cv)return;var ctx=cv.getContext("2d");var W=cv.width,H=cv.height,cx=W/2,cy=H/2,R=Math.min(W,H)/2-34;ctx.clearRect(0,0,W,H);ctx.strokeStyle="#1e2d47";ctx.lineWidth=1;for(var ring=1;ring<=4;ring++){ctx.beginPath();for(var i=0;i<8;i++){var a=-Math.PI/2+i*Math.PI/4,r=R*ring/4,x=cx+Math.cos(a)*r,y=cy+Math.sin(a)*r;if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);}ctx.closePath();ctx.stroke();}ctx.beginPath();for(var i=0;i<8;i++){var a=-Math.PI/2+i*Math.PI/4;ctx.moveTo(cx,cy);ctx.lineTo(cx+Math.cos(a)*R,cy+Math.sin(a)*R);}ctx.strokeStyle="#1e2d47";ctx.stroke();ctx.beginPath();for(var i=0;i<8;i++){var a=-Math.PI/2+i*Math.PI/4,v=(sum[AX[i].k]||0)/100,x=cx+Math.cos(a)*R*v,y=cy+Math.sin(a)*R*v;if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);}ctx.closePath();ctx.fillStyle="rgba(52,211,153,.22)";ctx.fill();ctx.strokeStyle="#34d399";ctx.lineWidth=2;ctx.stroke();ctx.fillStyle="#8aa0bd";ctx.font="10px monospace";ctx.textAlign="center";ctx.textBaseline="middle";for(var i=0;i<8;i++){var a=-Math.PI/2+i*Math.PI/4,x=cx+Math.cos(a)*(R+18),y=cy+Math.sin(a)*(R+18);ctx.fillText(AX[i].n,x,y);}}
function areaCard(a,surp){return "<div class='res-card "+(surp?"res-surprise":"")+"'><h4>"+a.n+(surp?"<span class='pill'>no lo veías venir</span>":"")+"</h4><p>"+a.q+"</p><div class='meta'><b>stack:</b> "+a.s+" · <b>mirar:</b> "+a.w+" · <b>aprox:</b> "+a.p+"</div></div>";}
function renderResult(){var s=AX.slice().sort(function(a,b){return sum[b.k]-sum[a.k];});var t1=s[0].k,t2=s[1].k,t8=s[7].k;
  var ent=entorno(sum.independiente,sum.estabilidad);
  var a1=AREAS[t1]||AREAS.constructor,a2=AREAS[t2]||AREAS.analista,a8=AREAS[t8]||AREAS.explorador;
  var cards=a1.slice(0,2).map(function(a){return areaCard(a);}).join("")+areaCard(a2[0])+areaCard(a8[0],true);
  var why="Tu forma es <b>"+NUC[t1]+"</b>, con un matiz claro de "+NUC[t2]+". ";
  if(ans.placer!==undefined)why+="Dijiste que tu placer es «"+findQ("placer").o[ans.placer].l+"», y eso pesa mucho. ";
  if(ans.ab!==undefined)why+="Entre «"+findQ("ab").o[ans.ab].l+"» y lo contrario, elegiste lo primero. ";
  why+="No eres una etiqueta: eres una mezcla. Lo de abajo no es un destino fijo, es por dónde empujar ahora.";
  var route=RUTA[t1]||RUTA.constructor;
  var html="<div class='res'><h3>tu perfil</h3><div class='res-name'>"+label(t1,t2)+"</div><div class='res-tag'>radar · "+s.map(function(x){return x.n+" "+sum[x.k];}).join(" · ")+"</div><canvas id='radar' width='320' height='320' aria-label='Radar de perfil'></canvas><div class='res-why'>"+why+"</div><div class='res-grid'>"+cards+"</div><div class='res-route'><h4>tu ruta</h4><ol>"+route.map(function(r){return "<li>"+r+"</li>";}).join("")+"</ol></div><div class='res-step'><h4>tu siguiente paso, hoy</h4><p>"+(PASO[t1]||PASO.constructor)+"</p></div><div class='res-why' style='margin-top:1.2rem'><b>tu entorno:</b> "+ent.t+". "+ent.d+"</div><div class='res-why' style='margin-top:1.2rem'><b>y una cosa más:</b> "+cierre(ans.origen||"curioso")+"</div><div class='res-close'><p>¿Dudas? ¿Querías otra cosa? ¿Quieres contarme qué te ha salido? Escríbeme y hablamos.</p><div class='res-acts'><button class='btn g' id='resAgain' type='button'>repetir</button><a class='btn p' href='#contacto' id='resContact'>contactar</a></div></div>";
  qBody.innerHTML=html;drawRadar();
  document.getElementById("resAgain").addEventListener("click",function(){initQuiz();});
  document.getElementById("resContact").addEventListener("click",function(){closeQuiz();});}
var _sq=document.getElementById("startQuiz"); if(_sq) _sq.addEventListener("click",initQuiz);
document.getElementById("quizClose").addEventListener("click",closeQuiz);
quiz.addEventListener("click",function(e){if(e.target===quiz)closeQuiz();});
document.addEventListener("keydown",function(e){if(!quizOpen)return;if(e.key==="Escape")closeQuiz();});
/* ===== BLOQUE B: ROBOT DE LOGROS + TEASER ===== */
(function(){
  var robot=document.getElementById("robot"),bubble=document.getElementById("robotBubble");
  if(!robot)return;
  var GKEY="hp-logros",SEEN={};
  function getG(){try{return JSON.parse(localStorage.getItem(GKEY))||[];}catch(e){return[];}}
  function setG(a){try{localStorage.setItem(GKEY,JSON.stringify(a));}catch(e){}}
  var timer=null;
  function toast(html){bubble.innerHTML=html;robot.classList.add("show");clearTimeout(timer);timer=setTimeout(function(){robot.classList.remove("show");},4600);}
  function logro(id,tit,txt){var a=getG();if(a.indexOf(id)>-1)return; a.push(id);setG(a);toast("<b>"+tit+"</b> "+txt);}

  /* saludo al entrar */
  setTimeout(function(){toast("<b>¡hola!</b> soy tu guía. Explora y te aviso de lo que logres.");},1200);

  /* logros por vista */
  function track(id){SEEN[id]=1;var n=Object.keys(SEEN).length;
    if(n===3)logro("explorador","🧭 Explorador","has visto 3 secciones, vas cogiendo el tranquillo.");
    if(n===8)logro("completo","🏆 Web completa","has recorrido todas las páginas. Eres de los que miran hasta el pie de página.");
  }
  function curView(){var h=(location.hash||"#inicio").slice(1);track(h||"inicio");}
  addEventListener("hashchange",curView);curView();

  /* formulario */
  var f=document.getElementById("form");if(f)f.addEventListener("submit",function(){logro("mensajero","✉️ Mensajero","acabas de enviar un mensaje. Ya falta menos para esa FCT.");});

  /* tema */
  var th=document.querySelector(".th");if(th)th.addEventListener("click",function(){logro("tematico","🎨 Cambiate","ya has probado los dos temas. El editor y la terminal, ambos tuyos.");});

  /* arcade: observo el score */
  var sc=document.getElementById("score");
  if(sc&&window.MutationObserver){new MutationObserver(function(){if(+sc.textContent>0)logro("jugon","🕹️ Jugón","has puntuado en el arcade. Coordinación la tienes.");}).observe(sc,{childList:true,characterData:true,subtree:true});}

  /* test: observo si aparece resultado */
  var qb=document.getElementById("quizBody");
  if(qb&&window.MutationObserver){new MutationObserver(function(m){m.forEach(function(r){[].forEach.call(r.addedNodes,function(n){if(n.nodeType===1&&n.querySelector&&n.querySelector(".res"))logro("orientado","🧠 Orientado","has completado el test. Ya sabes por dónde tirar.");});});}).observe(qb,{childList:true,subtree:true});}

  /* ===== TEASER ===== */
  var teaser=document.getElementById("teaser"),go=document.getElementById("qcGo");
  if(!teaser)return;
  var T=[
    {q:"¿De dónde vienes?",o:["Del hardware","Otros estudios","Autodidacta","Ya trabajo"]},
    {q:"¿Qué te da más placer?",o:["Ver algo funcionar","Que tenga sentido","Que la gente lo entienda","Descubrir algo nuevo"]},
    {q:"Prefieres…",o:["Hacer que algo exista","Entender por qué es como es"]}
  ];
  var ansT=[null,null,null];
  function mini(){
    var e={constructor:0,analista:0,comunicador:0,disenador:0,arquitecto:0,explorador:0};
    if(ansT[0]===0){e.constructor+=1;e.arquitecto+=1;} if(ansT[0]===2){e.explorador+=1;e.constructor+=1;}
    if(ansT[1]===0)e.constructor+=2; if(ansT[1]===1){e.analista+=2;e.arquitecto+=1;} if(ansT[1]===2){e.comunicador+=2;e.disenador+=1;} if(ansT[1]===3){e.explorador+=2;e.analista+=1;}
    if(ansT[2]===0)e.constructor+=2; if(ansT[2]===1){e.analista+=2;e.disenador+=1;}
    var best="constructor",bv=-1;for(var k in e){if(e[k]>bv){bv=e[k];best=k;}}
    var map={constructor:"Frontend / Backend",analista:"Datos / QA",comunicador:"Consultoría / Producto",disenador:"UX / UI",arquitecto:"DevOps / Sistemas",explorador:"Seguridad / I+D"};
    return map[best]||"Frontend";
  }
  function render(){
    teaser.innerHTML="";
    T.forEach(function(item,i){
      var w=document.createElement("div");
      var q=document.createElement("div");q.className="tz-q";q.textContent=(i+1)+". "+item.q;w.appendChild(q);
      var opts=document.createElement("div");opts.className="tz-opts";
      item.o.forEach(function(op,idx){var b=document.createElement("button");b.type="button";b.textContent=op;b.className=ansT[i]===idx?"on":"";b.onclick=function(){ansT[i]=idx;render();};opts.appendChild(b);});
      w.appendChild(opts);teaser.appendChild(w);
    });
    var done=ansT[0]!==null&&ansT[1]!==null&&ansT[2]!==null;
    if(done){var r=document.createElement("div");r.className="tz-result";r.innerHTML="Pinta a <b>"+mini()+"</b>. Haz el test completo para tu radar y tu ruta.";teaser.appendChild(r);go.textContent="ver mi perfil completo ▶";}
  }
  render();
  go.addEventListener("click",function(){
    if(ansT[0]===null||ansT[1]===null||ansT[2]===null){initQuiz();return;}
    ans={origen:ansT[0],placer:ansT[1],ab:ansT[2]};
    quizOpen=true;order=[];sum={};AX.forEach(function(x){sum[x.k]=0;});
    quiz.hidden=false;requestAnimationFrame(function(){quiz.classList.add("open");});
    buildOrder();
    qi=order.findIndex(function(q){return ans[q.id]===undefined;});if(qi<0)qi=0;
    renderQ(order[qi]);
  });
})();

show(location.hash.slice(1)||"inicio");onScroll();
})();
