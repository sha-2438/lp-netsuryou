// generate-book-v5.js — 書籍LP 変化球5案
// 世界観ごと変える。カラバリではなく、構造・体験・文脈を変える。

const fs = require('fs');

const ILLUST   = 'illust-book.png';
const TITLE    = '熱量あふれる組織のつくりかた';
const SUBTITLE = '数字の呪縛からの解放';
const AUTHOR   = 'のっち × sha × KOHちゃん';

const CHAPTERS = [
  { n:'第１章', t:'なぜ熱量は枯れるのか',    d:'組織のなかで、情熱が失われていくメカニズムを解き明かす。' },
  { n:'第２章', t:'数字の呪縛とは何か',      d:'売上・KPI・評価制度——見えない鎖の正体。' },
  { n:'第３章', t:'熱量が生まれる瞬間',      d:'人が「やりたい」と感じるとき、何が起きているのか。' },
  { n:'第４章', t:'つながりをデザインする',   d:'関係性の質が、組織の体温を左右する。' },
  { n:'第５章', t:'熱量あふれる組織へ',      d:'実践のための問いと、小さな一歩の始め方。' },
];

const ENDORSERS = [
  { name:'Aさん', role:'某上場企業 人事部長',  text:'読み終えた瞬間、チームに会いたくなった。' },
  { name:'Bさん', role:'スタートアップ創業者', text:'数字だけ追ってきた10年間を、深く反省した。' },
  { name:'Cさん', role:'組織コンサルタント',   text:'この本は、マネジャー全員の必読書だと思う。' },
];

// ── 共通ヘルパー ─────────────────────────────────────
function illustImg(cls = 'illust-img') {
  return `<img src="${ILLUST}" alt="人とのつながりのイラスト" class="${cls}"
  onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"><div style="display:none;align-items:center;justify-content:center;background:#f0e8d8;min-height:200px;border-radius:4px;"><p style="color:#aaa;font-size:.82rem;text-align:center;padding:1rem">illust-book.png<br>（差し替え予定）</p></div>`;
}

const FADE_JS = `<script>
document.addEventListener('DOMContentLoaded',()=>{
  const io = new IntersectionObserver(es=>{
    es.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('in'); });
  },{threshold:.08});
  document.querySelectorAll('.fu').forEach(el=>io.observe(el));
});
</script>`;

function makeFile(name, css, body) {
  const html = `<!DOCTYPE html>
<html lang="ja">
<head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${TITLE}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@400;600;700;900&family=Noto+Sans+JP:wght@300;400;500;700&display=swap" rel="stylesheet">
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Noto Sans JP',sans-serif;-webkit-font-smoothing:antialiased}
img{max-width:100%;display:block}
a{text-decoration:none}
.fu{opacity:0;transform:translateY(20px);transition:opacity .7s ease,transform .7s ease}
.fu.in{opacity:1;transform:none}
${css}
</style>
</head>
<body>
${body}
${FADE_JS}
</body>
</html>`;
  fs.writeFileSync(name, html, 'utf8');
  const kb = (fs.statSync(name).size / 1024).toFixed(1);
  console.log(`✓ ${name}  (${kb} KB)`);
}


// ════════════════════════════════════════════════════════
//  Design 14: 手書き温紙
//  スケッチブックのページ感。フォルダーにはさまれた一枚の紙。
//  イラストは「自分が描いたメモ」として自然に馴染む。
// ════════════════════════════════════════════════════════
function design14() {
  const css = `
:root{--bg:#f3ead8;--paper:#faf6ec;--ink:#1e1208;--red:#c0392b;--rule:rgba(160,120,60,.22);--w:800px}
body{background:var(--bg);color:var(--ink)}

/* 横罫線（ノート紙） */
body::before{
  content:'';position:fixed;inset:0;z-index:0;pointer-events:none;
  background:repeating-linear-gradient(0deg,transparent,transparent 31px,var(--rule) 32px);
}
.wrap{position:relative;z-index:1}

/* NAV */
.snav{
  padding:1rem 2rem;
  display:flex;align-items:center;gap:1rem;
  border-bottom:1.5px dashed rgba(160,120,60,.35);
}
.snav-badge{
  font-size:.72rem;letter-spacing:.14em;color:var(--red);
  border:1.5px dashed var(--red);padding:.2rem .7rem;border-radius:1px;
}
.snav-ttl{font-family:'Noto Serif JP',serif;font-size:.95rem;color:var(--ink);opacity:.65}

/* HERO */
.hero{max-width:var(--w);margin:0 auto;padding:5rem 1.5rem 3rem;text-align:center}
.hero-eyebrow{
  display:inline-block;font-size:.75rem;letter-spacing:.18em;
  color:var(--red);background:rgba(192,57,43,.08);
  padding:.28rem .9rem;border-radius:99px;margin-bottom:2rem;
}
.hero-h1{
  font-family:'Noto Serif JP',serif;
  font-size:clamp(2rem,4.8vw,3.2rem);font-weight:900;line-height:1.4;
  margin-bottom:1.4rem;
}
.hero-h1 mark{
  background:none;color:var(--red);
  border-bottom:3px solid var(--red);padding-bottom:1px;
}
.hero-body{
  max-width:500px;margin:0 auto 3.5rem;
  font-size:1rem;line-height:2.1;color:#5a3818;
}

/* 貼り付けイラスト（テープ留め） */
.tape-mount{
  max-width:600px;margin:0 auto 4rem;
  background:var(--paper);
  border:1px solid #d0bc90;
  padding:1.4rem 1.4rem 2.2rem;
  box-shadow:4px 6px 18px rgba(0,0,0,.09);
  transform:rotate(-.5deg);
  position:relative;
}
.tape-mount::before,.tape-mount::after{
  content:'';position:absolute;
  width:52px;height:16px;
  background:rgba(210,175,80,.42);
  border-radius:1px;
}
.tape-mount::before{top:-8px;left:14%;transform:rotate(-2.5deg)}
.tape-mount::after{top:-8px;right:14%;transform:rotate(2deg)}
.tape-mount .illust-img{width:100%}
.tape-caption{text-align:right;font-size:.72rem;color:#aaa;font-style:italic;margin-top:.7rem}

/* CHAPTERS —付箋スタイル */
.ch-sec{max-width:var(--w);margin:0 auto;padding:1rem 1.5rem 4rem}
.ch-sec-h{
  font-family:'Noto Serif JP',serif;font-size:1.15rem;font-weight:700;
  margin-bottom:1.5rem;padding-bottom:.5rem;
  border-bottom:1.5px dashed rgba(160,120,60,.4);
}
.ch-grid{display:grid;grid-template-columns:1fr 1fr;gap:1.2rem}
.ch-sticky{
  background:var(--paper);border:1px solid #d4c49a;
  border-radius:2px;padding:1.1rem 1.3rem;
  box-shadow:2px 4px 0 rgba(0,0,0,.04);
}
.ch-sticky:nth-child(odd){transform:rotate(-.35deg)}
.ch-sticky:nth-child(even){transform:rotate(.3deg)}
.ch-n{font-size:.7rem;letter-spacing:.12em;color:var(--red);
  padding-bottom:.45rem;margin-bottom:.5rem;
  border-bottom:1.5px dashed rgba(192,57,43,.22)}
.ch-t{font-family:'Noto Serif JP',serif;font-weight:700;font-size:.98rem;margin-bottom:.35rem}
.ch-d{font-size:.84rem;line-height:1.8;color:#5a3818}

/* ENDORSERS */
.end-sec{background:rgba(255,255,255,.45);border-top:1.5px dashed rgba(160,120,60,.3);
  border-bottom:1.5px dashed rgba(160,120,60,.3);padding:3.5rem 1.5rem}
.end-sec .inner{max-width:var(--w);margin:0 auto}
.sec-h2{font-family:'Noto Serif JP',serif;font-size:1.1rem;font-weight:700;
  margin-bottom:1.5rem}
.end-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.1rem}
.end-card{
  background:var(--paper);border:1px solid #d4c49a;
  padding:1.1rem;border-radius:2px;
  box-shadow:1px 3px 0 rgba(0,0,0,.04);
}
.end-q{font-size:.88rem;line-height:1.8;font-style:italic;margin-bottom:.7rem}
.end-who{font-size:.72rem;color:#aaa}
.end-who strong{display:block;color:var(--ink);font-size:.82rem;margin-bottom:.1rem}

/* CTA */
.cta-sec{padding:5rem 1.5rem;text-align:center}
.cta-lead{font-family:'Noto Serif JP',serif;font-size:1.35rem;margin-bottom:2rem}
.cta-btn{display:inline-block;padding:.85rem 2.6rem;background:var(--red);color:#fff;
  font-size:.95rem;letter-spacing:.08em;border-radius:1px}

footer{padding:1.2rem;text-align:center;font-size:.75rem;color:#bbb;
  border-top:1.5px dashed rgba(160,120,60,.3)}

@media(max-width:600px){
  .ch-grid,.end-grid{grid-template-columns:1fr}
  .ch-sticky:nth-child(odd),.ch-sticky:nth-child(even){transform:none}
}`;

  const body = `<div class="wrap">
<nav class="snav">
  <span class="snav-badge">本</span>
  <span class="snav-ttl">${TITLE}</span>
</nav>

<section class="hero">
  <p class="hero-eyebrow">この本が向き合う、根っこの問い</p>
  <h1 class="hero-h1">なぜ、働く人の<mark>熱量</mark>は<br>枯れていくのだろう。</h1>
  <p class="hero-body">数字を追えば追うほど、何かが失われていく。<br>その「何か」の正体を、この本は探しに行く。</p>
  <div class="tape-mount fu">
    ${illustImg()}
    <p class="tape-caption">ひとが、つながる。それだけで、何かが動き出す。</p>
  </div>
</section>

<section class="ch-sec">
  <h2 class="ch-sec-h">目次</h2>
  <div class="ch-grid">
    ${CHAPTERS.map(c=>`<div class="ch-sticky fu">
      <p class="ch-n">${c.n}</p>
      <p class="ch-t">${c.t}</p>
      <p class="ch-d">${c.d}</p>
    </div>`).join('')}
  </div>
</section>

<section class="end-sec">
  <div class="inner">
    <h2 class="sec-h2">推薦の声</h2>
    <div class="end-grid">
      ${ENDORSERS.map(e=>`<div class="end-card fu">
        <p class="end-q">「${e.text}」</p>
        <p class="end-who"><strong>${e.name}</strong>${e.role}</p>
      </div>`).join('')}
    </div>
  </div>
</section>

<section class="cta-sec">
  <p class="cta-lead fu">あなたの組織に、熱量を取り戻す。</p>
  <a href="#" class="cta-btn">Amazonで見る</a>
</section>

<footer>© 2025 ${AUTHOR}</footer>
</div>`;

  makeFile('lp-book-14-tegaki.html', css, body);
}


// ════════════════════════════════════════════════════════
//  Design 15: 縦組み文芸誌
//  書名・問いを縦書きで見せる。日本の文芸誌・書籍そのものの質感。
//  イラストは「口絵（くちえ）」として印刷物的に配置。
// ════════════════════════════════════════════════════════
function design15() {
  const css = `
:root{--bg:#f2ead4;--bg2:#e8dfc0;--ink:#080604;--red:#8c1b1b;--gold:#b89030;--w:860px}
body{background:var(--bg);color:var(--ink)}

/* NAV */
.snav{
  display:flex;justify-content:space-between;align-items:center;
  padding:1rem 2.5rem;
  border-bottom:3px double var(--red);
}
.snav-ttl{font-family:'Noto Serif JP',serif;font-size:.95rem;letter-spacing:.08em}
.snav-year{font-size:.72rem;color:var(--red);letter-spacing:.14em}

/* HERO — 縦横混植 */
.hero-layout{
  display:grid;grid-template-columns:auto 1fr;
  min-height:82vh;
  max-width:var(--w);margin:0 auto;
  padding:4rem 2rem 3rem;gap:4rem;align-items:center;
}
/* 縦書きエリア */
.v-col{
  display:flex;flex-direction:column;align-items:center;gap:2rem;
}
.v-label{
  font-size:.68rem;letter-spacing:.25em;color:var(--red);
  writing-mode:vertical-rl;
  border-right:1.5px solid var(--red);padding-right:.5rem;
}
.v-h1{
  writing-mode:vertical-rl;
  font-family:'Noto Serif JP',serif;
  font-size:clamp(1.8rem,3.5vw,2.6rem);
  font-weight:900;line-height:1.7;letter-spacing:.12em;
  color:var(--ink);
}
.v-h1 .red-vert{
  color:var(--red);
  border-left:2.5px solid var(--red);
  padding-left:.25rem;
}
/* 横書きエリア（口絵＋本文） */
.h-col{}
.kuchie-label{
  display:block;font-size:.65rem;letter-spacing:.2em;
  color:var(--gold);margin-bottom:.5rem;
}
.kuchie-frame{
  border:1px solid var(--gold);
  background:#fff;
  padding:.7rem;
  box-shadow:0 2px 16px rgba(0,0,0,.07);
  margin-bottom:1.5rem;
}
.kuchie-frame .illust-img{width:100%}
.kuchie-cap{font-size:.68rem;color:#aaa;font-style:italic;text-align:right;margin-top:.4rem}
.hero-prose{
  font-family:'Noto Serif JP',serif;
  font-size:.95rem;line-height:2.3;color:#3a2210;
  border-top:1px solid rgba(184,144,48,.35);
  padding-top:1rem;
}

/* DIVIDER */
.bunkei-rule{
  display:flex;align-items:center;gap:1rem;
  padding:.6rem 2rem;margin:0;
  border-top:1px solid var(--gold);border-bottom:1px solid var(--gold);
}
.bunkei-rule::before,.bunkei-rule::after{content:'';flex:1;height:1px;background:var(--gold);opacity:.4}
.bunkei-rule span{font-size:.65rem;letter-spacing:.22em;color:var(--gold)}

/* CHAPTERS */
.ch-sec{max-width:var(--w);margin:0 auto;padding:3rem 2rem}
.ch-head{
  font-family:'Noto Serif JP',serif;font-size:1.2rem;font-weight:700;
  padding-bottom:.6rem;margin-bottom:1.5rem;
  border-bottom:1px solid var(--gold);
  display:flex;justify-content:space-between;align-items:baseline;
}
.ch-head::after{content:'目次';font-size:.65rem;letter-spacing:.2em;color:var(--gold)}
.ch-row{
  display:grid;grid-template-columns:5rem 1fr 1fr;
  align-items:baseline;gap:1.2rem;
  padding:.85rem 0;
  border-bottom:1px solid rgba(184,144,48,.2);
}
.ch-n{font-size:.7rem;letter-spacing:.1em;color:var(--red)}
.ch-t{font-family:'Noto Serif JP',serif;font-weight:600;font-size:1rem}
.ch-d{font-size:.83rem;color:#5a3810;text-align:right}

/* ENDORSERS */
.end-sec{
  background:var(--bg2);
  border-top:3px double var(--red);border-bottom:3px double var(--red);
  padding:3rem 2rem;
}
.end-sec .inner{max-width:var(--w);margin:0 auto}
.sec-h{font-family:'Noto Serif JP',serif;font-size:1.2rem;margin-bottom:1.8rem;letter-spacing:.04em}
.end-list{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem}
.end-item{border-left:2px solid var(--gold);padding-left:1rem}
.end-q{font-family:'Noto Serif JP',serif;font-size:.92rem;line-height:1.9;margin-bottom:.6rem}
.end-q::before{content:'「';color:var(--red)}
.end-q::after{content:'」';color:var(--red)}
.end-who{font-size:.72rem;color:#999}
.end-who strong{display:block;color:var(--ink);font-size:.82rem;margin-bottom:.1rem}

/* CTA */
.cta-sec{
  background:var(--ink);color:#f2ead4;
  padding:5rem 2rem;text-align:center;
}
.cta-lead{font-family:'Noto Serif JP',serif;font-size:1.3rem;margin-bottom:2rem;letter-spacing:.04em}
.cta-btn{
  display:inline-block;padding:.85rem 2.8rem;
  border:1px solid var(--gold);color:var(--gold);
  font-size:.88rem;letter-spacing:.14em;
  transition:background .2s,color .2s;
}
.cta-btn:hover{background:var(--gold);color:var(--ink)}

footer{padding:1.2rem;text-align:center;font-size:.72rem;color:#aaa;
  border-top:3px double var(--red);background:var(--bg)}

@media(max-width:700px){
  .hero-layout{grid-template-columns:1fr;grid-template-rows:auto auto;min-height:auto}
  .v-h1{writing-mode:horizontal-tb;font-size:1.8rem}
  .v-label{writing-mode:horizontal-tb;border-right:none;border-bottom:1.5px solid var(--red);padding:0 0 .4rem}
  .v-col{align-items:flex-start}
  .ch-row{grid-template-columns:auto 1fr}
  .ch-d{text-align:left;grid-column:2}
  .end-list{grid-template-columns:1fr}
}`;

  const body = `
<nav class="snav">
  <span class="snav-ttl">${TITLE}</span>
  <span class="snav-year">2025年刊行</span>
</nav>

<section>
  <div class="hero-layout">
    <div class="v-col fu">
      <span class="v-label">根っこの問い</span>
      <h1 class="v-h1">なぜ、働く人の<span class="red-vert">熱量</span>は枯れていくのだろう。</h1>
    </div>
    <div class="h-col fu">
      <span class="kuchie-label">口　絵</span>
      <div class="kuchie-frame">
        ${illustImg()}
        <p class="kuchie-cap">ひとが、つながる。——口絵より（イラスト変更予定）</p>
      </div>
      <p class="hero-prose">
        数字を追えば追うほど、何かが失われていく。<br>
        売上、KPI、評価制度——見えない鎖の正体とは何か。<br>
        そして、熱量はどこから生まれるのか。
      </p>
    </div>
  </div>
</section>

<div class="bunkei-rule"><span>◇</span></div>

<section class="ch-sec">
  <h2 class="ch-head">本書の構成</h2>
  ${CHAPTERS.map(c=>`<div class="ch-row fu">
    <span class="ch-n">${c.n}</span>
    <span class="ch-t">${c.t}</span>
    <span class="ch-d">${c.d}</span>
  </div>`).join('')}
</section>

<div class="bunkei-rule"><span>◇</span></div>

<section class="end-sec">
  <div class="inner">
    <h2 class="sec-h">各界からの推薦</h2>
    <div class="end-list">
      ${ENDORSERS.map(e=>`<div class="end-item fu">
        <p class="end-q">${e.text}</p>
        <p class="end-who"><strong>${e.name}</strong>${e.role}</p>
      </div>`).join('')}
    </div>
  </div>
</section>

<section class="cta-sec">
  <p class="cta-lead fu">あなたの組織に、熱量を取り戻す。</p>
  <a href="#" class="cta-btn">Amazonで見る</a>
</section>

<footer>© 2025 ${AUTHOR}</footer>`;

  makeFile('lp-book-15-tategumi.html', css, body);
}


// ════════════════════════════════════════════════════════
//  Design 16: 暗幕と灯り
//  暗い背景に、イラストが灯火のように浮かぶ。
//  「失われた熱量を探す」旅の入口として、情緒的な場を作る。
// ════════════════════════════════════════════════════════
function design16() {
  const css = `
:root{--bg:#130c05;--bg2:#1c1108;--ink:#f0e6d2;--red:#e05038;--amber:#c89838;--muted:rgba(240,230,210,.45);--w:860px}
body{background:var(--bg);color:var(--ink)}

/* NAV */
.snav{
  padding:1.2rem 2.5rem;
  display:flex;align-items:center;gap:1rem;
  border-bottom:1px solid rgba(200,152,56,.15);
}
.snav-ttl{font-family:'Noto Serif JP',serif;font-size:.95rem;color:var(--amber);opacity:.7}

/* HERO */
.hero{
  min-height:92vh;display:flex;flex-direction:column;
  align-items:center;justify-content:center;
  padding:5rem 2rem;text-align:center;
  position:relative;overflow:hidden;
}
/* 背後の暖かいグロー */
.hero::before{
  content:'';position:absolute;
  top:40%;left:50%;transform:translate(-50%,-50%);
  width:80vw;height:60vh;
  background:radial-gradient(ellipse at center,rgba(180,80,30,.14) 0%,transparent 70%);
  pointer-events:none;
}
.hero-label{
  font-size:.72rem;letter-spacing:.22em;color:var(--amber);opacity:.6;
  margin-bottom:2.5rem;
}
/* イラスト（灯火） */
.illust-lantern{
  max-width:560px;width:100%;
  margin:0 auto 3.5rem;
  position:relative;
  filter:drop-shadow(0 0 48px rgba(180,80,30,.35));
}
.illust-lantern .illust-img{width:100%;border-radius:3px}

.hero-h1{
  font-family:'Noto Serif JP',serif;
  font-size:clamp(1.9rem,4.2vw,3rem);
  font-weight:900;line-height:1.45;
  color:var(--ink);max-width:640px;
}
.hero-h1 em{font-style:normal;color:var(--red)}
.hero-sub{
  max-width:500px;margin:1.5rem auto 0;
  font-size:.98rem;line-height:2.1;
  color:var(--muted);
}

/* DIVIDER */
.amber-hr{border:none;border-top:1px solid rgba(200,152,56,.18);margin:0 2.5rem}

/* CHAPTERS */
.ch-sec{max-width:var(--w);margin:0 auto;padding:3.5rem 2rem}
.sec-h{
  font-family:'Noto Serif JP',serif;font-size:1.1rem;
  color:var(--amber);margin-bottom:1.8rem;
  border-bottom:1px solid rgba(200,152,56,.2);
  padding-bottom:.55rem;letter-spacing:.04em;
}
.ch-item{
  padding:.95rem 1.2rem;margin-bottom:.5rem;
  border-left:2px solid rgba(224,80,56,.35);
  background:rgba(255,255,255,.025);
  transition:background .2s;
}
.ch-item:hover{background:rgba(255,255,255,.05)}
.ch-n{font-size:.68rem;letter-spacing:.12em;color:var(--red);margin-bottom:.3rem}
.ch-t{font-family:'Noto Serif JP',serif;font-weight:700;font-size:1rem;margin-bottom:.28rem;color:var(--ink)}
.ch-d{font-size:.84rem;line-height:1.8;color:var(--muted)}

/* ENDORSERS */
.end-sec{background:var(--bg2);padding:4rem 2rem}
.end-sec .inner{max-width:var(--w);margin:0 auto}
.end-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.1rem}
.end-card{
  border:1px solid rgba(200,152,56,.18);
  padding:1.1rem;background:rgba(255,255,255,.025);
}
.end-q{font-size:.88rem;line-height:1.8;font-style:italic;margin-bottom:.7rem;color:rgba(240,230,210,.8)}
.end-q::before{color:var(--red);content:'「'}
.end-q::after{color:var(--red);content:'」'}
.end-who{font-size:.72rem;color:rgba(240,230,210,.35)}
.end-who strong{display:block;color:rgba(240,230,210,.7);font-size:.82rem;margin-bottom:.1rem}

/* CTA */
.cta-sec{
  padding:6rem 2rem;text-align:center;
  background:linear-gradient(180deg,var(--bg2),var(--bg));
}
.cta-lead{font-family:'Noto Serif JP',serif;font-size:1.4rem;margin-bottom:2.5rem;color:var(--ink)}
.cta-btn{
  display:inline-block;padding:.9rem 2.8rem;
  border:1px solid var(--amber);color:var(--amber);
  font-size:.88rem;letter-spacing:.14em;border-radius:2px;
  transition:background .2s,color .2s;
}
.cta-btn:hover{background:var(--amber);color:var(--bg)}

footer{padding:1.2rem;text-align:center;font-size:.72rem;color:rgba(240,230,210,.2);
  border-top:1px solid rgba(200,152,56,.12)}

@media(max-width:600px){.end-grid{grid-template-columns:1fr}}`;

  const body = `
<nav class="snav">
  <span class="snav-ttl">${TITLE}</span>
</nav>

<section class="hero">
  <p class="hero-label">この本が向き合う、根っこの問い</p>
  <div class="illust-lantern fu">
    ${illustImg()}
  </div>
  <h1 class="hero-h1 fu">なぜ、働く人の熱量は<br>枯れていくのだろう。</h1>
  <p class="hero-sub fu">数字を追えば追うほど、何かが失われていく。<br>その正体を、この本は探しに行く。</p>
</section>

<hr class="amber-hr">

<section class="ch-sec">
  <h2 class="sec-h">目次</h2>
  ${CHAPTERS.map(c=>`<div class="ch-item fu">
    <p class="ch-n">${c.n}</p>
    <p class="ch-t">${c.t}</p>
    <p class="ch-d">${c.d}</p>
  </div>`).join('')}
</section>

<section class="end-sec">
  <div class="inner">
    <h2 class="sec-h">推薦の声</h2>
    <div class="end-grid">
      ${ENDORSERS.map(e=>`<div class="end-card fu">
        <p class="end-q">${e.text}</p>
        <p class="end-who"><strong>${e.name}</strong>${e.role}</p>
      </div>`).join('')}
    </div>
  </div>
</section>

<section class="cta-sec">
  <p class="cta-lead fu">あなたの組織に、熱量を取り戻す。</p>
  <a href="#" class="cta-btn">Amazonで見る</a>
</section>

<footer>© 2025 ${AUTHOR}</footer>`;

  makeFile('lp-book-16-dark.html', css, body);
}


// ════════════════════════════════════════════════════════
//  Design 17: 問いの連鎖
//  1問1画面の没入スクロール体験。問いに問いを重ねて、
//  イラストが「答え」として現れる。構造ごと変化球。
// ════════════════════════════════════════════════════════
function design17() {
  const css = `
:root{--bg:#f9f7f3;--bg-q2:#f3ede2;--bg-q3:#eee6d4;--bg-ans:#fdf6ea;--ink:#0e0c09;--red:#c0392b;--muted:#888;--w:760px}
body{background:var(--bg);color:var(--ink)}

/* 固定ナビ */
.snav{
  position:fixed;top:0;left:0;right:0;z-index:100;
  display:flex;align-items:center;justify-content:space-between;
  padding:.9rem 2rem;
  background:rgba(249,247,243,.94);backdrop-filter:blur(8px);
  border-bottom:1px solid rgba(0,0,0,.07);
}
.snav-ttl{font-size:.82rem;color:var(--muted);letter-spacing:.04em}
.snav-count{font-size:.72rem;color:var(--muted);letter-spacing:.12em}

/* SCENE 共通 */
.scene{
  min-height:100vh;display:flex;align-items:center;
  padding:7rem 2rem 5rem;position:relative;
}
.scene-inner{max-width:var(--w);margin:0 auto;width:100%}
.scene-num{
  position:absolute;bottom:2.5rem;right:2rem;
  font-size:.7rem;letter-spacing:.18em;color:var(--muted);
}

/* SCENE 1 — 根っこの問い */
.scene-1{background:var(--bg)}
.big-q{
  font-family:'Noto Serif JP',serif;
  font-size:clamp(2.2rem,5.5vw,4rem);
  font-weight:900;line-height:1.3;
  color:var(--ink);
}
.big-q .red{
  color:var(--red);
  border-bottom:3px solid var(--red);
}
.scroll-cue{
  position:absolute;bottom:2.5rem;left:50%;transform:translateX(-50%);
  font-size:.72rem;color:var(--muted);letter-spacing:.12em;text-align:center;
}
.scroll-cue::after{content:'↓';display:block;margin-top:.3rem;font-size:1.1rem}

/* SCENE 2, 3 — 問いの展開 */
.scene-2{background:var(--bg-q2)}
.scene-3{background:var(--bg-q3)}
.mid-q{
  font-family:'Noto Serif JP',serif;
  font-size:clamp(1.7rem,3.8vw,2.8rem);
  font-weight:900;line-height:1.4;
  margin-bottom:1.6rem;color:var(--ink);
}
.mid-q .red{color:var(--red)}
.scene-body{
  max-width:560px;font-size:1rem;line-height:2.05;color:#3d2c18;
  border-left:2px solid rgba(192,57,43,.25);padding-left:1.2rem;
}

/* SCENE 4 — イラストが「答え」として現れる */
.scene-4{
  background:var(--bg-ans);
  flex-direction:column;justify-content:center;
  text-align:center;
  min-height:100vh;
}
.illust-answer{
  max-width:600px;width:100%;
  margin:0 auto 3rem;
  filter:drop-shadow(0 6px 24px rgba(0,0,0,.09));
}
.illust-answer .illust-img{width:100%;border-radius:3px}
.answer-h{
  font-family:'Noto Serif JP',serif;
  font-size:clamp(1.5rem,3.2vw,2.2rem);
  font-weight:700;line-height:1.5;
  color:var(--ink);max-width:500px;margin:0 auto;
}
.answer-h em{font-style:normal;color:var(--red)}

/* SCENE 5 — 章立て */
.scene-5{background:var(--bg);align-items:flex-start;padding-top:8rem}
.ch-label{font-size:.7rem;letter-spacing:.22em;color:var(--red);margin-bottom:1.8rem;display:block}
.ch-list{list-style:none;width:100%}
.ch-list li{
  display:flex;gap:1.5rem;align-items:baseline;
  padding:.9rem 0;border-bottom:1px solid rgba(0,0,0,.06);
}
.ch-n{font-size:.68rem;letter-spacing:.1em;color:var(--red);min-width:4.5rem}
.ch-t{font-family:'Noto Serif JP',serif;font-weight:700;font-size:1.02rem}
.ch-d{font-size:.83rem;color:var(--muted);margin-left:auto;text-align:right;max-width:220px}

/* ENDORSERS */
.end-sec{padding:5rem 2rem;border-top:1px solid rgba(0,0,0,.07)}
.end-sec .inner{max-width:var(--w);margin:0 auto}
.end-label{font-size:.7rem;letter-spacing:.22em;color:var(--red);margin-bottom:2rem;display:block}
.end-row{padding:1.1rem 0;border-bottom:1px solid rgba(0,0,0,.06)}
.end-row p{font-family:'Noto Serif JP',serif;font-size:.98rem;line-height:1.8;margin-bottom:.4rem}
.end-row p::before{color:var(--red);content:'「'}
.end-row p::after{color:var(--red);content:'」'}
.end-row small{font-size:.75rem;color:var(--muted)}

/* CTA */
.cta-sec{
  min-height:60vh;display:flex;flex-direction:column;
  align-items:center;justify-content:center;
  padding:4rem 2rem;text-align:center;
  background:#f0e6d4;
}
.cta-lead{font-family:'Noto Serif JP',serif;font-size:1.45rem;margin-bottom:2.5rem}
.cta-btn{display:inline-block;padding:1rem 3rem;background:var(--red);color:#fff;
  font-size:.98rem;letter-spacing:.1em;border-radius:2px}

footer{padding:1.2rem;text-align:center;font-size:.72rem;color:var(--muted);
  border-top:1px solid rgba(0,0,0,.06)}

@media(max-width:600px){
  .scene{padding:6rem 1.2rem 4rem}
  .ch-d{display:none}
}`;

  const body = `
<nav class="snav">
  <span class="snav-ttl">${TITLE}</span>
  <span class="snav-count" id="cnt">01 / 04</span>
</nav>

<!-- SCENE 1 -->
<section class="scene scene-1" data-n="01">
  <div class="scene-inner">
    <h1 class="big-q fu">
      なぜ、働く人の<br>
      <span class="red">熱量</span>は<br>
      枯れていくのだろう。
    </h1>
  </div>
  <span class="scroll-cue">scroll</span>
</section>

<!-- SCENE 2 -->
<section class="scene scene-2" data-n="02">
  <div class="scene-inner">
    <h2 class="mid-q fu">数字を追うほど、<br><span class="red">何か</span>が遠ざかっていく。</h2>
    <p class="scene-body fu">KPI、評価、予算——見えない鎖は、いつのまにか「やりたい」という感覚を静かに奪っていく。</p>
  </div>
  <span class="scene-num">02 / 04</span>
</section>

<!-- SCENE 3 -->
<section class="scene scene-3" data-n="03">
  <div class="scene-inner">
    <h2 class="mid-q fu">では、<span class="red">熱量</span>は<br>どこから生まれるのか。</h2>
    <p class="scene-body fu">それは、つながりの中にある。人と人の間に灯る、小さな火の連鎖の中に。</p>
  </div>
  <span class="scene-num">03 / 04</span>
</section>

<!-- SCENE 4 — イラストが答えとして現れる -->
<section class="scene scene-4" data-n="04">
  <div class="illust-answer fu">
    ${illustImg()}
  </div>
  <p class="answer-h fu">ひとが、つながる。<br>それだけで、<em>熱量</em>は生まれる。</p>
  <span class="scene-num">04 / 04</span>
</section>

<!-- SCENE 5 — 章立て -->
<section class="scene scene-5">
  <div class="scene-inner">
    <span class="ch-label">本書の構成</span>
    <ul class="ch-list">
      ${CHAPTERS.map(c=>`<li class="fu">
        <span class="ch-n">${c.n}</span>
        <span class="ch-t">${c.t}</span>
        <span class="ch-d">${c.d}</span>
      </li>`).join('')}
    </ul>
  </div>
</section>

<!-- ENDORSERS -->
<section class="end-sec">
  <div class="inner">
    <span class="end-label">推薦の声</span>
    ${ENDORSERS.map(e=>`<div class="end-row fu">
      <p>${e.text}</p>
      <small>${e.name}｜${e.role}</small>
    </div>`).join('')}
  </div>
</section>

<!-- CTA -->
<section class="cta-sec">
  <p class="cta-lead fu">あなたの組織に、熱量を取り戻す。</p>
  <a href="#" class="cta-btn">Amazonで見る</a>
</section>

<footer>© 2025 ${AUTHOR}</footer>

<script>
// シーンカウンター更新
const scenes = document.querySelectorAll('.scene[data-n]');
const cnt = document.getElementById('cnt');
const sio = new IntersectionObserver(es=>{
  es.forEach(e=>{if(e.isIntersecting && e.intersectionRatio > .4){
    cnt.textContent = e.target.dataset.n + ' / 04';
  }});
},{threshold:.4});
scenes.forEach(s=>sio.observe(s));
</script>`;

  makeFile('lp-book-17-questions.html', css, body);
}


// ════════════════════════════════════════════════════════
//  Design 18: コミュニティ新聞
//  本のテーマを「地域新聞の一面」として紙面化。
//  「つながり」の書籍が、まさにつながりで作られた紙面から届く感覚。
// ════════════════════════════════════════════════════════
function design18() {
  const css = `
:root{--bg:#f8f3e8;--bg2:#efe8d4;--ink:#100e09;--red:#b01818;--rule:#c8b888;--w:1000px}
body{background:var(--bg);color:var(--ink)}

/* マストヘッド */
.masthead{
  background:var(--ink);color:#f8f3e8;
  padding:.75rem 2rem;
  display:flex;align-items:center;justify-content:space-between;
}
.mh-name{font-family:'Noto Serif JP',serif;font-size:1rem;letter-spacing:.1em}
.mh-date{font-size:.68rem;color:rgba(248,243,232,.45);letter-spacing:.12em}

/* 赤帯 */
.red-band{
  background:var(--red);padding:.35rem 2rem;
  font-size:.68rem;letter-spacing:.22em;color:#fff;
}

/* 紙面 */
.page{max-width:var(--w);margin:0 auto;padding:1.5rem 2rem 3rem}

.np-rule{border:none;border-top:2px solid var(--ink);margin:.4rem 0}
.np-rule-thin{border:none;border-top:1px solid var(--rule);margin:.4rem 0}
.np-rule-double{border:none;border-top:3px double var(--ink);margin:.6rem 0}

/* ヘッドライン段 */
.headline-block{
  display:grid;grid-template-columns:1.1fr 1fr;
  gap:2rem;padding:1.2rem 0 1.5rem;
  border-bottom:2px solid var(--ink);
}
.headline-hl{
  font-family:'Noto Serif JP',serif;
  font-size:clamp(1.9rem,3.5vw,2.9rem);
  font-weight:900;line-height:1.28;
  border-right:1px solid var(--rule);padding-right:1.5rem;
}
.headline-hl .kicker{
  display:block;font-size:.65rem;letter-spacing:.22em;
  color:var(--red);margin-bottom:.7rem;
  font-family:'Noto Sans JP',sans-serif;font-weight:400;
}
.headline-hl .red-word{color:var(--red)}
.headline-lede{font-size:.95rem;line-height:1.95;color:#3a2c14}

/* 特集写真 — 全幅 */
.feature-photo{margin:1rem 0}
.feature-photo .illust-img{width:100%;max-height:380px;object-fit:cover}
.photo-cap{
  font-size:.68rem;color:#999;font-style:italic;
  border-top:1px solid var(--rule);padding-top:.35rem;margin-top:.35rem;
}

/* 3段組 */
.grid3{
  display:grid;grid-template-columns:1fr 1fr 1fr;gap:0;
  border-top:2px solid var(--ink);border-bottom:1px solid var(--ink);
  margin:1.2rem 0;
}
.col3{padding:1.1rem;border-right:1px solid var(--rule)}
.col3:last-child{border-right:none}
.col3-eyebrow{font-size:.65rem;letter-spacing:.18em;color:var(--red);margin-bottom:.4rem;display:block}
.col3-h{font-family:'Noto Serif JP',serif;font-weight:700;font-size:1rem;
  margin-bottom:.45rem;padding-bottom:.35rem;
  border-bottom:1.5px solid var(--ink);}
.col3 p{font-size:.84rem;line-height:1.85;color:#3a2c14}

/* 目次段 */
.toc-block{
  display:grid;grid-template-columns:1fr 1fr;gap:2rem;
  padding:1.2rem 0;border-top:2px solid var(--ink);
}
.toc-heading{
  font-family:'Noto Serif JP',serif;font-size:1.1rem;font-weight:700;
  grid-column:1/-1;
  border-bottom:1px solid var(--rule);padding-bottom:.4rem;margin-bottom:.2rem;
}
.toc-row{
  display:flex;gap:1rem;align-items:baseline;
  padding:.55rem 0;border-bottom:1px dotted var(--rule);
}
.toc-n{font-size:.68rem;letter-spacing:.1em;color:var(--red);min-width:4rem}
.toc-t{font-family:'Noto Serif JP',serif;font-weight:600;font-size:.9rem}

/* 推薦コメント帯 */
.pullquote-belt{
  background:var(--bg2);
  border-top:3px solid var(--ink);border-bottom:3px solid var(--ink);
  padding:1.2rem 0;margin:1.2rem 0;
  display:grid;grid-template-columns:repeat(3,1fr);gap:0;
}
.pq{border-right:1px solid var(--rule);padding:1rem 1.3rem}
.pq:last-child{border-right:none}
.pq p{font-family:'Noto Serif JP',serif;font-size:.88rem;line-height:1.85;margin-bottom:.5rem}
.pq p::before{color:var(--red);content:'「'}
.pq p::after{color:var(--red);content:'」'}
.pq small{font-size:.68rem;color:#999}
.pq small strong{display:block;color:var(--ink);font-size:.78rem;margin-bottom:.1rem}

/* CTA — 広告欄風 */
.ad-cta{
  background:var(--red);color:#fff;
  padding:1.5rem 2rem;
  display:flex;align-items:center;justify-content:space-between;
  border:2px solid var(--red);
}
.ad-cta-copy{font-family:'Noto Serif JP',serif;font-size:1.25rem}
.ad-cta-btn{
  display:inline-block;padding:.7rem 2rem;
  border:1.5px solid #fff;color:#fff;
  font-size:.88rem;letter-spacing:.1em;white-space:nowrap;
}

/* フッター */
footer{
  background:var(--ink);color:rgba(248,243,232,.35);
  padding:.9rem 2rem;font-size:.68rem;
  display:flex;justify-content:space-between;
}

@media(max-width:720px){
  .headline-block,.grid3,.toc-block,.pullquote-belt{grid-template-columns:1fr}
  .headline-hl{border-right:none;border-bottom:1px solid var(--rule);padding:0 0 1rem;margin-bottom:1rem}
  .col3{border-right:none;border-bottom:1px solid var(--rule)}
  .pq{border-right:none;border-bottom:1px solid var(--rule)}
  .ad-cta{flex-direction:column;gap:1rem;text-align:center}
}`;

  const body = `
<header class="masthead">
  <span class="mh-name">${TITLE}</span>
  <span class="mh-date">2025年刊行</span>
</header>
<div class="red-band">特集：なぜ、働く人の熱量は枯れていくのか</div>

<main class="page">
  <hr class="np-rule">

  <div class="headline-block fu">
    <h1 class="headline-hl">
      <span class="kicker">巻頭特集</span>
      なぜ、働く人の<span class="red-word">熱量</span>は枯れていくのだろう。
    </h1>
    <p class="headline-lede">
      売上、KPI、評価制度——私たちは数字を追い続けた。<br>
      しかし追えば追うほど、何かが失われていく気がする。<br>
      その「何か」の正体とは何か。本書はその問いから始まる。
    </p>
  </div>

  <div class="feature-photo fu">
    ${illustImg()}
    <p class="photo-cap">ひとが、つながる。それだけで、何かが動き出す。——本書口絵より（イラスト変更予定）</p>
  </div>

  <hr class="np-rule-thin">

  <div class="grid3">
    <div class="col3 fu">
      <span class="col3-eyebrow">問い ① 呪縛</span>
      <h3 class="col3-h">数字の鎖とは何か</h3>
      <p>売上・KPI・評価制度が人の「やりたい」を静かに奪っていくメカニズムを解剖する。</p>
    </div>
    <div class="col3 fu">
      <span class="col3-eyebrow">問い ② 起点</span>
      <h3 class="col3-h">熱量が生まれる瞬間</h3>
      <p>人が「やりたい」と感じるとき、何が起きているのか。脳と感情と関係性の交差点を探る。</p>
    </div>
    <div class="col3 fu">
      <span class="col3-eyebrow">問い ③ 設計</span>
      <h3 class="col3-h">つながりをデザインする</h3>
      <p>関係性の質が、組織の体温を左右する。熱量あふれるチームに共通する「つながりのかたち」。</p>
    </div>
  </div>

  <hr class="np-rule-double">

  <div class="toc-block">
    <h2 class="toc-heading">目次</h2>
    ${CHAPTERS.map(c=>`<div class="toc-row fu">
      <span class="toc-n">${c.n}</span>
      <span class="toc-t">${c.t}</span>
    </div>`).join('')}
  </div>

  <hr class="np-rule">

  <div class="pullquote-belt">
    ${ENDORSERS.map(e=>`<div class="pq fu">
      <p>${e.text}</p>
      <small><strong>${e.name}</strong>${e.role}</small>
    </div>`).join('')}
  </div>

  <div class="ad-cta fu">
    <p class="ad-cta-copy">あなたの組織に、熱量を取り戻す。</p>
    <a href="#" class="ad-cta-btn">Amazonで見る →</a>
  </div>
</main>

<footer>
  <span>© 2025 ${AUTHOR}</span>
  <span>${TITLE}</span>
</footer>`;

  makeFile('lp-book-18-newspaper.html', css, body);
}


// ════════════════════════════════════════════════════════
//  実行
// ════════════════════════════════════════════════════════
design14();
design15();
design16();
design17();
design18();

console.log(`
✅ 書籍LP v5（変化球5案）を生成しました
   A: 手書き温紙     → lp-book-14-tegaki.html     ノート紙×テープ貼り付けイラスト
   B: 縦組み文芸誌   → lp-book-15-tategumi.html   縦書き×口絵スタイル
   C: 暗幕と灯り     → lp-book-16-dark.html       暗背景×グロー、イラストが灯火
   D: 問いの連鎖     → lp-book-17-questions.html  1問1画面スクロール体験
   E: コミュニティ新聞→ lp-book-18-newspaper.html  地域新聞の一面スタイル
`);
