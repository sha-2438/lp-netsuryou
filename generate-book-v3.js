/**
 * generate-book-v3.js
 * 書影方向性（白×赤×有機ネットワーク）に基づいたLP 4案
 *
 * 出力:
 *   lp-book-07-coverdirect.html  A: 書影直結（白×赤ネットワーク）
 *   lp-book-08-verttype.html     B: 縦組みタイポ（書影タイポを踏襲）
 *   lp-book-09-darkred.html      C: ダーク×赤（書影を反転、劇的）
 *   lp-book-10-editorial.html    D: 活版印刷風（白×スポットカラー赤）
 */

const fs = require('fs');
const path = require('path');
const DIR = __dirname;

// ─── SHARED DATA ────────────────────────────────────────────────────────────

const CHAPTERS = [
  { num:'INTRODUCTION', title:'はじめに', body:'人生にも、職場にも、組織にも、わたし達一人ひとりの「人生の熱量」が湧きあがり、躍動していてほしい——。本書の根本にある願いと、「マネーバイアス」という問いへの向き合い方を語る。' },
  { num:'CHAPTER 1',    title:'組織から熱量が枯渇していく今、\n本当に必要な変化とは？', body:'「で？」と言われた瞬間、心の糸が切れた。給料は上がったのに、日曜の夜が重い——。組織から熱量が失われる瞬間の実例と、その背後にある「マネーバイアス」の正体に迫る。Gallup調査：仕事に熱意を持つ社員はわずか6%。' },
  { num:'CHAPTER 2',    title:'熱量あふれる組織とは？', body:'熱量はお金で買えない。では、どうすれば取り戻せるのか。「人生の熱量」が湧きあがる場、組織に織り込まれる営み、めぐり続ける学びの姿勢——「3つの風穴」から、実践へのヒントを届ける。' },
  { num:'CHAPTER 3',    title:'枯渇していく人生の熱量の背景', body:'なぜ、わたし達はお金への思い込みから抜け出せないのか。経済思想の歴史から「マネーバイアス」の社会的・歴史的な根拠を紐解き、「いのちのつながり」という視点へと読者を誘う。' },
  { num:'CHAPTER 4',    title:'個人と組織の新たな関係性と\n「生成の組織」', body:'「ライフでワークを包む」視点が生む、個人の自律と相互依存の共存。森の菌糸ネットワークのように、根っこでつながりあう組織の姿——「生成の組織論（Becoming）」という新たな地平を開く。' },
  { num:'CHAPTER 5',    title:'実践企業の皆さまのストーリー', body:'九州電力グループ（人的資本経営最優秀賞受賞）、宮田運輸、丸善雄松堂ほか6社の現場から。「人とのつながり」から熱量が湧きあがり、組織全体へと広がっていく——変化はこうして起きた。' },
];

const ENDORSERS = [
  { name:'堂目 卓生',  title:'大阪大学 特任教授',                            theme:'「お金への思い込み」を歴史から学ぶ' },
  { name:'新井 和宏',  title:'武蔵野大学ウェルビーイング学部 客員教授',       theme:'人生という視点から組織を学ぶ'      },
  { name:'矢萩 大輔',  title:'有限会社人事・労務',                            theme:'現場から問い直す、組織と人'        },
  { name:'四井 真治',  title:'パーマカルチャーデザイナー・地球再生型生活研究家', theme:'「いのちの仕組み」を学ぶ'        },
  { name:'西山 勝',    title:'九州電力 代表取締役社長',                       theme:'これからの企業の可能性'            },
  { name:'岩井 睦雄',  title:'経済同友会 筆頭副代表幹事',                     theme:'これからの企業の可能性'            },
];

// ─── ORGANIC NETWORK SVG ──────────────────────────────────────────────────────
// 書影の赤い有機ネットワーク図を参考にしたSVGイラスト
// ノード座標 & ベジェ曲線で接続

function makeNetworkSvg(strokeColor = '#c0392b', bgFill = 'none', width = '100%', nodeRadius = 4) {
  // ノード座標 (viewBox: 560×400)
  const nodes = [
    {id:'A', x:280, y:200},  // 中央ハブ
    {id:'B', x:155, y:115},
    {id:'C', x:215, y:68},
    {id:'D', x:330, y:80},
    {id:'E', x:420, y:118},
    {id:'F', x:455, y:215},
    {id:'G', x:415, y:328},
    {id:'H', x:290, y:372},
    {id:'I', x:162, y:348},
    {id:'J', x:78,  y:262},
    {id:'K', x:88,  y:162},
    {id:'L', x:192, y:188},
    {id:'M', x:252, y:304},
    {id:'N', x:358, y:222},
    {id:'O', x:330, y:328},
    {id:'P', x:370, y:150},
    {id:'Q', x:130, y:240},
  ];

  // 接続ペア [from, to, control point offset dx, dy]
  const edges = [
    ['A','B', -10,-15], ['A','L',  -8,  0], ['A','M',  -5, 12],
    ['A','N',  10,  0], ['A','D',  10,-12],
    ['B','C',   5,-12], ['B','K',  -8,  8], ['B','L',   5,  8],
    ['C','D',   8,-10], ['D','E',  10,  0], ['D','P',  15,-8],
    ['E','F',  12,  8], ['E','P',  10,-5],
    ['F','G',  10, 10], ['F','N',  10,  0],
    ['G','H',   5, 12], ['G','O',  -5,  8],
    ['H','I',  -8, 10], ['H','M',  -5,  8],
    ['I','J',  -8,  5], ['I','Q',  -5,  8],
    ['J','K',  -8, -8], ['J','Q',  -5,  5],
    ['K','L',   5,  8], ['K','Q',  -5,  5],
    ['L','M',  -5, 10], ['L','Q',   5,  5],
    ['M','O',   5,  8], ['N','O',   5, 10],
    ['N','P',  10, -5],
  ];

  const nodeMap = {};
  nodes.forEach(n => { nodeMap[n.id] = n; });

  const pathsHtml = edges.map(([from, to, cx, cy]) => {
    const a = nodeMap[from], b = nodeMap[to];
    const mx = (a.x + b.x) / 2 + cx;
    const my = (a.y + b.y) / 2 + cy;
    return `<path d="M${a.x},${a.y} Q${mx},${my} ${b.x},${b.y}" stroke="${strokeColor}" stroke-width="1.4" fill="none" opacity="0.75"/>`;
  }).join('\n    ');

  const circlesHtml = nodes.map(n => {
    const r = ['A'].includes(n.id) ? nodeRadius + 2 :
              ['B','D','F','H','J'].includes(n.id) ? nodeRadius + 1 : nodeRadius;
    return `<circle cx="${n.x}" cy="${n.y}" r="${r}" fill="${strokeColor}" opacity="0.85"/>`;
  }).join('\n    ');

  return `<svg viewBox="0 0 560 400" xmlns="http://www.w3.org/2000/svg" width="${width}" style="max-width:100%;display:block">
  ${bgFill !== 'none' ? `<rect width="560" height="400" fill="${bgFill}" rx="4"/>` : ''}
  ${pathsHtml}
  ${circlesHtml}
</svg>`;
}

// ─── SHARED HTML PARTS ───────────────────────────────────────────────────────

const FONTS = `<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@300;400;600;900&family=Noto+Sans+JP:wght@300;400;500;700&display=swap" rel="stylesheet">`;

function navHtml(dark = false) {
  return `
<nav class="${dark ? 'nav-dark' : ''}">
  <div class="nav-inner">
    <span class="nav-title">熱量あふれる組織のつくりかた</span>
    <div class="nav-links">
      <a href="#chapters">はじめに・各章</a>
      <a href="#endorsers">推薦者</a>
      <a href="#authors">著者紹介</a>
      <a href="#amazon">購入</a>
      <a href="#post-reading">読後の受け皿</a>
    </div>
    <a href="#amazon" class="nav-cta">Amazonで購入</a>
  </div>
</nav>`;
}

function endorsersHtml() {
  return `
<section id="endorsers" class="section endorsers-section">
  <div class="section-inner">
    <p class="section-eyebrow">SPECIAL CONTRIBUTORS</p>
    <h2 class="section-title fade-up">対談コラム執筆者・主な推薦者</h2>
    <div class="endorsers-grid">
      ${ENDORSERS.map(e => `
      <div class="endorser-card fade-up">
        <div class="endorser-photo">写真</div>
        <div>
          <p class="endorser-name">${e.name}</p>
          <p class="endorser-title">${e.title}</p>
          <p class="endorser-theme">${e.theme}</p>
        </div>
      </div>`).join('')}
    </div>
  </div>
</section>`;
}

function authorsHtml() {
  return `
<section id="authors" class="section authors-section">
  <div class="section-inner">
    <p class="section-eyebrow">AUTHORS</p>
    <h2 class="section-title fade-up">著者紹介</h2>
    <div class="authors-grid">
      <div class="author-card fade-up">
        <div class="author-photo">写真</div>
        <div>
          <h3 class="author-name">吉原 史郎</h3>
          <p class="author-title">（肩書きダミー）組織開発コンサルタント・製造業取締役</p>
          <p class="author-bio">倒産したリゾートホテルの再生経営、三菱UFJリサーチ＆コンサルティングでの経営・組織開発コンサルティングを経て、現在は製造業の取締役。『実務でつかむ！ティール組織（2018年）』著者。（ダミー）</p>
        </div>
      </div>
      <div class="author-card fade-up">
        <div class="author-photo">写真</div>
        <div>
          <h3 class="author-name">宮慶 優子</h3>
          <p class="author-title">（肩書きダミー）</p>
          <p class="author-bio">大手電力会社の経営企画部での経験をもとに、「なぜ人生の熱量の流れが止まるのか」という問いを抱えて探究を重ねてきた。（ダミーテキスト）</p>
        </div>
      </div>
    </div>
  </div>
</section>`;
}

function recommendersHtml() {
  return `
<section class="section recommenders-section">
  <div class="section-inner">
    <p class="section-eyebrow">ENDORSEMENTS</p>
    <h2 class="section-title fade-up">推薦者</h2>
    <div class="recommenders">
      <div class="recommender-item"><p class="recommender-name">畑中 義雄</p><p class="recommender-org">有限会社人事・労務</p></div>
      <div class="recommender-item"><p class="recommender-name">推薦者 ダミーA</p><p class="recommender-org">所属・肩書きダミー</p></div>
      <div class="recommender-item"><p class="recommender-name">推薦者 ダミーB</p><p class="recommender-org">所属・肩書きダミー</p></div>
      <div class="recommender-item"><p class="recommender-name">推薦者 ダミーC</p><p class="recommender-org">所属・肩書きダミー</p></div>
      <div class="recommender-item"><p class="recommender-name">推薦者 ダミーD</p><p class="recommender-org">所属・肩書きダミー</p></div>
    </div>
  </div>
</section>`;
}

function ctaHtml(dark = false) {
  return `
<section id="amazon" class="cta-section${dark ? ' cta-dark' : ''}">
  <div class="cta-inner">
    <h2 class="cta-title">人とのつながりから、<br>熱量を取りもどす。</h2>
    <p class="cta-body">経営陣・ミドルマネジャー自身が、自分の「人生の熱量」から始めていける——<br>そのことを、できるだけシンプルに、具体的にお伝えしていく一冊。</p>
    <a href="#" class="cta-btn">Amazonで購入する</a>
    <p class="cta-sub">電子書籍・書店でも発売予定</p>
  </div>
</section>`;
}

function postReadingHtml() {
  return `
<section id="post-reading" class="post-reading">
  <div class="post-inner">
    <p class="section-eyebrow">AFTER READING</p>
    <h2 class="section-title fade-up">読んだ後も、つながり続けよう</h2>
    <div class="post-cards">
      <div class="post-card fade-up">
        <span class="post-card-type event">📅 イベント</span>
        <span class="post-card-date">2026.07.12</span>
        <h3 class="post-card-title">「熱量あふれる組織」読者対話会 vol.1</h3>
        <p class="post-card-body">著者・吉原史郎が登壇。本書の問いを参加者とともに深める対話の場。（ダミー）</p>
        <a href="#" class="post-card-link">詳細・申込 →</a>
      </div>
      <div class="post-card fade-up">
        <span class="post-card-type article">📄 記事</span>
        <span class="post-card-date">2026.06.28</span>
        <h3 class="post-card-title">なぜ、組織から「熱量」が消えるのか</h3>
        <p class="post-card-body">マネーバイアスが組織に与える影響を、著者自身の言葉でさらに掘り下げたコラム。（ダミー）</p>
        <a href="#" class="post-card-link">記事を読む →</a>
      </div>
      <div class="post-card fade-up">
        <span class="post-card-type event">📅 イベント</span>
        <span class="post-card-date">2026.06.05</span>
        <h3 class="post-card-title">出版記念トークイベント（大阪）</h3>
        <p class="post-card-body">宮慶優子・吉原史郎の両著者が揃って登壇した出版記念イベントのレポート。（ダミー）</p>
        <a href="#" class="post-card-link">レポートを見る →</a>
      </div>
    </div>
    <div class="post-more"><a href="#">イベント・記事をすべて見る →</a></div>
    <div class="post-mail">
      <div class="post-mail-text">
        <h3 class="post-mail-title">新着情報をメールで受け取る</h3>
        <p class="post-mail-body">イベント開催のお知らせ、著者による新着コラム、関連情報などを不定期でお届けします。</p>
      </div>
      <div class="post-mail-form">
        <div class="form-row"><input class="form-input" type="text" placeholder="お名前"></div>
        <div class="form-row">
          <input class="form-input" type="email" placeholder="メールアドレス">
          <button class="form-submit">登録</button>
        </div>
        <p class="form-note">※ このフォームはモックアップです。</p>
      </div>
    </div>
  </div>
</section>`;
}

function footerHtml() {
  return `
<footer>
  <p>熱量あふれる組織のつくりかた　著：吉原史郎・宮慶優子</p>
  <p style="margin-top:.4rem">© 2026 All rights reserved.　｜　<a href="#" style="color:inherit">プライバシーポリシー</a></p>
</footer>`;
}

// ─── BASE CSS (shared across all) ────────────────────────────────────────────

const BASE_CSS = `
*{margin:0;padding:0;box-sizing:border-box}
html{scroll-behavior:smooth}
body{font-family:'Noto Sans JP',sans-serif;font-size:16px;line-height:1.8}
nav{position:sticky;top:0;z-index:100;backdrop-filter:blur(8px);padding:.75rem 2rem}
.nav-inner{max-width:var(--w);margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:1rem;flex-wrap:wrap}
.nav-title{font-family:'Noto Serif JP',serif;font-size:.85rem;font-weight:600;white-space:nowrap}
.nav-links{display:flex;gap:1.25rem;flex-wrap:wrap}
.nav-links a{font-size:.72rem;text-decoration:none;letter-spacing:.05em;white-space:nowrap;transition:color .2s}
.nav-cta{font-size:.72rem;padding:.35rem 1rem;border-radius:2px;text-decoration:none;white-space:nowrap;letter-spacing:.05em;transition:opacity .2s}
.nav-cta:hover{opacity:.8}
.section{padding:4rem 2rem}
.section-inner{max-width:var(--w);margin:0 auto}
.section-eyebrow{font-size:.68rem;letter-spacing:.35em;margin-bottom:.5rem;display:block}
.section-title{font-family:'Noto Serif JP',serif;font-size:clamp(1.3rem,2.5vw,1.9rem);font-weight:900;line-height:1.4;margin-bottom:2.5rem}
.chapter-video{aspect-ratio:16/9;border-radius:4px;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:.75rem;font-size:.75rem}
.play-icon{width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center}
.play-icon::after{content:'';border-style:solid;border-width:9px 0 9px 16px;margin-left:3px}
.endorsers-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem}
.endorser-card{display:flex;gap:1rem;align-items:flex-start}
.endorser-photo{width:52px;height:52px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:.55rem}
.endorser-name{font-size:.9rem;font-weight:700;margin-bottom:.2rem}
.endorser-title{font-size:.72rem;line-height:1.6}
.endorser-theme{font-size:.72rem;margin-top:.3rem;font-style:italic}
.authors-grid{display:grid;grid-template-columns:1fr 1fr;gap:3rem}
.author-card{display:flex;gap:1.5rem;align-items:flex-start}
.author-photo{width:80px;height:80px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:.65rem}
.author-name{font-family:'Noto Serif JP',serif;font-size:1.1rem;font-weight:900;margin-bottom:.25rem}
.author-title{font-size:.75rem;margin-bottom:.6rem}
.author-bio{font-size:.82rem;line-height:1.9}
.recommenders{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:.75rem 1.5rem}
.recommender-item{font-size:.82rem;line-height:1.6;padding:.6rem 0}
.recommender-name{font-weight:700}
.recommender-org{font-size:.72rem}
.cta-section{padding:4rem 2rem;text-align:center}
.cta-inner{max-width:540px;margin:0 auto}
.cta-title{font-family:'Noto Serif JP',serif;font-size:clamp(1.3rem,3vw,2rem);font-weight:900;line-height:1.5;margin-bottom:1rem}
.cta-body{font-size:.9rem;line-height:1.9;margin-bottom:2rem}
.cta-btn{display:inline-block;padding:1rem 3rem;font-weight:900;font-size:1rem;border-radius:4px;text-decoration:none;transition:opacity .2s}
.cta-btn:hover{opacity:.85}
.cta-sub{font-size:.75rem;margin-top:.75rem}
.post-reading{padding:4rem 2rem}
.post-inner{max-width:var(--w);margin:0 auto}
.post-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:1.25rem;margin-bottom:1.25rem}
.post-card{border-radius:4px;padding:1.4rem;display:flex;flex-direction:column;gap:.5rem}
.post-card-type{display:inline-flex;align-items:center;gap:.4rem;font-size:.65rem;letter-spacing:.15em;font-weight:700;padding:.2rem .65rem;border-radius:50px;width:fit-content}
.post-card-date{font-size:.72rem}
.post-card-title{font-family:'Noto Serif JP',serif;font-size:.95rem;font-weight:700;line-height:1.5}
.post-card-body{font-size:.78rem;line-height:1.8;flex:1}
.post-card-link{font-size:.75rem;text-decoration:none;width:fit-content;transition:opacity .2s;margin-top:.25rem}
.post-card-link:hover{opacity:.7}
.post-more{text-align:right;margin-bottom:2.5rem}
.post-more a{font-size:.8rem;text-decoration:none;transition:opacity .2s}
.post-more a:hover{opacity:.7}
.post-mail{border-radius:6px;padding:2rem 2.5rem;display:grid;grid-template-columns:1fr 1fr;gap:2rem;align-items:center}
.post-mail-title{font-family:'Noto Serif JP',serif;font-size:1.1rem;font-weight:900;margin-bottom:.5rem}
.post-mail-body{font-size:.82rem;line-height:1.8}
.form-row{display:flex;gap:.5rem;margin-bottom:.5rem}
.form-input{flex:1;padding:.65rem .9rem;border-radius:3px;font-size:.82rem;font-family:'Noto Sans JP',sans-serif}
.form-submit{padding:.65rem 1.25rem;border:none;border-radius:3px;font-size:.82rem;cursor:pointer;white-space:nowrap;font-family:'Noto Sans JP',sans-serif;font-weight:700;transition:opacity .2s}
.form-submit:hover{opacity:.85}
.form-note{font-size:.68rem;line-height:1.7}
footer{padding:2rem;text-align:center;font-size:.75rem;line-height:2}
.fade-up{opacity:0;transform:translateY(24px);transition:opacity .6s ease,transform .6s ease}
.fade-up.visible{opacity:1;transform:translateY(0)}
@media(max-width:720px){
  .chapter-grid{grid-template-columns:1fr!important}
  .endorsers-grid{grid-template-columns:1fr 1fr}
  .authors-grid{grid-template-columns:1fr}
  .post-cards{grid-template-columns:1fr}
  .post-mail{grid-template-columns:1fr}
  .nav-links{display:none}
}
@media(max-width:480px){.endorsers-grid{grid-template-columns:1fr}}`;

const BASE_JS = `
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });
document.querySelectorAll('.fade-up').forEach(el => obs.observe(el));`;

function chapterItems() {
  return CHAPTERS.map(ch => `
    <div class="chapter-grid chapter-item fade-up">
      <div class="chapter-video"><div class="play-icon"></div><span>動画プレースホルダー</span></div>
      <div>
        <p class="chapter-num">${ch.num}</p>
        <h2 class="chapter-title">${ch.title}</h2>
        <p class="chapter-body">${ch.body}</p>
        <a href="#" class="chapter-link">詳しく見る →</a>
      </div>
    </div>`).join('');
}

// ─── DESIGN 07: 書影直結 Cover Direct ────────────────────────────────────────
// 白ベース、赤ネットワークSVGをヒーローに、書影の清潔感を踏襲

function design07() {
  const netSvg = makeNetworkSvg('#c0392b', 'none', '420px', 4);

  const css = `
:root{--bg:#fdfcfa;--bg2:#f5f2ec;--ink:#111110;--ink2:#3a3a34;--ink3:#8a8a7a;
  --red:#c0392b;--red-l:#e06050;--rule:#e2ddd8;--w:860px}
body{background:var(--bg);color:var(--ink)}
nav{background:rgba(253,252,250,.97);border-bottom:1px solid var(--rule)}
.nav-title{color:var(--ink)}
.nav-links a{color:var(--ink2)}
.nav-links a:hover{color:var(--red)}
.nav-cta{background:var(--red);color:#fff}

/* ── HERO ── */
.hero{padding:5rem 2rem 4rem;max-width:var(--w);margin:0 auto}
.hero-question{
  font-family:'Noto Serif JP',serif;
  font-size:clamp(.9rem,1.8vw,1.1rem);font-weight:300;
  color:var(--ink3);letter-spacing:.15em;margin-bottom:2rem;
}
.hero-question em{font-style:normal;color:var(--red)}
.hero-main{display:grid;grid-template-columns:1fr auto;gap:4rem;align-items:center;margin-bottom:3rem}
.hero-text{}
.hero-label{font-size:.65rem;letter-spacing:.4em;color:var(--red);display:block;margin-bottom:1.25rem}
.hero-q{
  font-family:'Noto Serif JP',serif;
  font-size:clamp(1.8rem,4.5vw,2.8rem);font-weight:900;line-height:1.45;
  color:var(--ink);margin-bottom:2rem;
}
.hero-philosophy p{font-size:.95rem;line-height:2.1;color:var(--ink2);margin-bottom:.9rem}
.hero-philosophy strong{color:var(--red);font-weight:700}
.hero-net{flex-shrink:0;opacity:.9}
.hero-divider{border:none;border-top:1px solid var(--rule);margin:2.5rem 0}
.hero-book{display:flex;align-items:center;gap:2rem}
.hero-book-cover{width:64px;aspect-ratio:3/4;background:#e8e0d8;border-radius:3px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:.5rem;color:var(--ink3);box-shadow:3px 4px 12px rgba(0,0,0,.1)}
.hero-book-title{font-family:'Noto Serif JP',serif;font-size:.95rem;font-weight:900;line-height:1.5}
.hero-book-sub{font-size:.72rem;color:var(--ink3)}
.hero-book-authors{font-size:.78rem;color:var(--ink2)}
.hero-book-authors span{font-weight:700}
.hero-book-link{font-size:.78rem;color:var(--red);text-decoration:none;border-bottom:1px solid var(--red-l);display:inline-flex;margin-top:.35rem;transition:opacity .2s}
.hero-book-link:hover{opacity:.7}

/* ── CHAPTERS ── */
.chapters{padding:3.5rem 2rem;border-top:1px solid var(--rule)}
.chapters-inner{max-width:var(--w);margin:0 auto}
.chapters-heading{font-size:.68rem;letter-spacing:.4em;color:var(--red);padding-bottom:1.5rem;border-bottom:1px solid var(--rule);margin-bottom:0}
.chapter-item{display:grid;grid-template-columns:1fr 1fr;gap:2.5rem;align-items:start;padding:2.5rem 0;border-bottom:1px solid var(--rule)}
.chapter-item:last-child{border-bottom:none}
.chapter-video{background:#ece8e2;color:var(--ink3)}
.play-icon{background:rgba(255,255,255,.7)}
.play-icon::after{border-color:transparent transparent transparent var(--ink2)}
.chapter-num{font-size:.62rem;letter-spacing:.3em;color:var(--red);margin-bottom:.4rem}
.chapter-title{font-family:'Noto Serif JP',serif;font-size:1.05rem;font-weight:900;line-height:1.5;margin-bottom:.75rem;white-space:pre-line}
.chapter-body{font-size:.88rem;line-height:1.9;color:var(--ink2)}
.chapter-link{display:inline-block;margin-top:.75rem;font-size:.75rem;color:var(--red);text-decoration:none;border-bottom:1px solid var(--red-l);transition:color .2s}

/* ── SECTIONS ── */
.endorsers-section{background:var(--bg2);border-top:1px solid var(--rule)}
.section-eyebrow{color:var(--red)}
.endorser-photo{background:#e0dbd4;color:var(--ink3)}
.endorser-theme{color:var(--red)}
.authors-section{border-top:1px solid var(--rule)}
.author-photo{background:#e0dbd4;color:var(--ink3)}
.author-title{color:var(--red)}
.recommenders-section{background:var(--bg2);border-top:1px solid var(--rule)}
.recommender-item{border-bottom:1px solid var(--rule)}
.recommender-org{color:var(--ink3)}
.cta-section{background:var(--ink);border-top:none}
.cta-title,.cta-body{color:rgba(255,255,255,.9)}
.cta-body{color:rgba(255,255,255,.7)}
.cta-btn{background:var(--red);color:#fff}
.cta-sub{color:rgba(255,255,255,.4)}
.post-reading{background:var(--bg);border-top:1px solid var(--rule)}
.post-card{background:#fff;border:1px solid var(--rule)}
.post-card:hover{box-shadow:0 2px 12px rgba(192,57,43,.1);border-color:var(--red-l)}
.post-card-type.event{background:rgba(192,57,43,.08);color:var(--red)}
.post-card-type.article{background:rgba(30,80,30,.06);color:#2d5a3d}
.post-card-date{color:var(--ink3)}
.post-card-title{color:var(--ink)}
.post-card-body{color:var(--ink2)}
.post-card-link{color:var(--red)}
.post-more a{color:var(--ink2)}
.post-mail{background:var(--bg2)}
.post-mail-title{color:var(--ink)}
.post-mail-body{color:var(--ink2)}
.form-input{border:1px solid var(--rule);background:#fff;color:var(--ink)}
.form-input::placeholder{color:var(--ink3)}
.form-submit{background:var(--ink);color:#fff}
.form-note{color:var(--ink3)}
footer{background:var(--ink);color:rgba(255,255,255,.45)}
@media(max-width:760px){.hero-main{grid-template-columns:1fr}.hero-net{display:none}}
${BASE_CSS}`;

  const html = `${navHtml()}

<section id="top" style="border-bottom:1px solid var(--rule)">
  <div class="hero">
    <p class="hero-question fade-up">なぜ、組織は<em>枯れていく</em>のか。</p>
    <div class="hero-main">
      <div class="hero-text">
        <span class="hero-label">この本が向き合う、根っこの問い</span>
        <p class="hero-q fade-up">数字で人を動かすほど、<br>人は内側から<br>萎んでいく。</p>
        <div class="hero-philosophy fade-up">
          <p>給料は上がった。制度も整えた。それでも、日曜の夜が重い——。</p>
          <p>組織から熱量が失われていく背景には、<strong>「お金への思い込み（マネーバイアス）」</strong>がある。この本は、その呪縛からの解放を探る一冊です。</p>
        </div>
      </div>
      <div class="hero-net fade-up">${netSvg}</div>
    </div>
    <hr class="hero-divider">
    <div class="hero-book fade-up">
      <div class="hero-book-cover">書影</div>
      <div>
        <p class="hero-book-title">熱量あふれる組織のつくりかた</p>
        <p class="hero-book-sub">数字の呪縛（お金への思い込み）からの解放</p>
        <p class="hero-book-authors"><span>吉原史郎</span>・<span>宮慶優子</span> 著　｜　2026年 刊行予定</p>
        <a href="#chapters" class="hero-book-link">本書の内容を見る ↓</a>
      </div>
    </div>
  </div>
</section>

<section id="chapters" class="chapters">
  <div class="chapters-inner">
    <p class="chapters-heading">CONTENTS — 本書の内容</p>
    ${chapterItems()}
    <div class="chapter-item chapter-grid fade-up">
      <div class="chapter-video" style="background:#ece8e2;color:var(--ink3);display:flex;align-items:center;justify-content:center;flex-direction:column;gap:.5rem">
        <p style="letter-spacing:.1em;font-size:.72rem">CHAPTER 6</p><p style="font-size:.78rem">Coming Soon</p>
      </div>
      <div>
        <p class="chapter-num">CHAPTER 6</p>
        <h2 class="chapter-title">実践のためのアクション集</h2>
        <p class="chapter-body" style="color:var(--ink3)">準備中</p>
      </div>
    </div>
  </div>
</section>

${endorsersHtml()}${authorsHtml()}${recommendersHtml()}${ctaHtml()}${postReadingHtml()}${footerHtml()}`;

  return { css, html };
}

// ─── DESIGN 08: 縦組みタイポ Vertical Type ───────────────────────────────────
// 書影の縦組み・大タイポを踏襲。「熱量」を背景に大きく配置

function design08() {
  const netSvg = makeNetworkSvg('#c0392b', 'none', '340px', 3.5);

  const css = `
:root{--bg:#faf9f7;--bg2:#f0ede7;--ink:#0e0e0c;--ink2:#3a3a34;--ink3:#909080;
  --red:#c0392b;--red-l:#e06050;--rule:#e0dbd4;--w:900px}
body{background:var(--bg);color:var(--ink)}
nav{background:rgba(250,249,247,.97);border-bottom:1px solid var(--rule)}
.nav-title{color:var(--ink)}
.nav-links a{color:var(--ink2)}
.nav-links a:hover{color:var(--red)}
.nav-cta{background:var(--ink);color:#fff}

/* ── HERO ── */
.hero{
  position:relative;overflow:hidden;
  padding:0;min-height:580px;
  border-bottom:1px solid var(--rule);
}
/* 大タイポ背景 */
.hero-bg-type{
  position:absolute;right:-40px;top:-20px;
  font-family:'Noto Serif JP',serif;font-weight:900;
  font-size:clamp(260px,38vw,400px);
  line-height:1;color:rgba(0,0,0,.04);
  pointer-events:none;user-select:none;letter-spacing:-.04em;
  writing-mode:vertical-rl;
}
.hero-inner{
  position:relative;z-index:1;
  max-width:var(--w);margin:0 auto;
  padding:5rem 2rem 4rem;
  display:grid;grid-template-columns:1fr 360px;gap:4rem;align-items:start;
}
.hero-label{font-size:.65rem;letter-spacing:.4em;color:var(--red);display:block;margin-bottom:1.5rem}
.hero-q{
  font-family:'Noto Serif JP',serif;
  font-size:clamp(1.6rem,4vw,2.6rem);font-weight:900;line-height:1.5;
  color:var(--ink);margin-bottom:.6rem;
}
.hero-q-small{
  font-family:'Noto Serif JP',serif;
  font-size:clamp(1rem,2vw,1.3rem);font-weight:300;color:var(--ink3);
  margin-bottom:2rem;border-left:3px solid var(--red);padding-left:.75rem;
}
.hero-philosophy p{font-size:.95rem;line-height:2.1;color:var(--ink2);margin-bottom:.9rem}
.hero-philosophy strong{color:var(--red);font-weight:700}
.hero-right{display:flex;flex-direction:column;gap:2rem;padding-top:3rem}
.hero-net-wrap{opacity:.92}
.hero-book{display:flex;gap:1.25rem;align-items:flex-start}
.hero-book-cover{width:56px;aspect-ratio:3/4;background:#ddd8d0;border-radius:3px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:.5rem;color:var(--ink3);box-shadow:3px 4px 10px rgba(0,0,0,.1)}
.hero-book-title{font-family:'Noto Serif JP',serif;font-size:.9rem;font-weight:900;line-height:1.5}
.hero-book-sub{font-size:.7rem;color:var(--ink3)}
.hero-book-authors{font-size:.76rem;color:var(--ink2)}
.hero-book-authors span{font-weight:700}
.hero-book-link{font-size:.76rem;color:var(--red);text-decoration:none;border-bottom:1px solid var(--red-l);display:inline-flex;margin-top:.3rem;transition:opacity .2s}
.hero-book-link:hover{opacity:.7}

/* ── CHAPTERS ── */
.chapters{padding:3.5rem 2rem;border-top:3px solid var(--red)}
.chapters-inner{max-width:var(--w);margin:0 auto}
.chapters-heading{font-family:'Noto Serif JP',serif;font-size:1rem;letter-spacing:.12em;color:var(--ink2);padding-bottom:1.5rem;border-bottom:1px solid var(--rule);margin-bottom:0}
.chapter-item{display:grid;grid-template-columns:1fr 1fr;gap:2.5rem;align-items:start;padding:2.5rem 0;border-bottom:1px solid var(--rule)}
.chapter-item:last-child{border-bottom:none}
.chapter-video{background:#e8e4dc;color:var(--ink3)}
.play-icon{background:rgba(255,255,255,.7)}
.play-icon::after{border-color:transparent transparent transparent var(--ink2)}
.chapter-num{font-size:.6rem;letter-spacing:.3em;color:var(--red);margin-bottom:.4rem}
.chapter-title{font-family:'Noto Serif JP',serif;font-size:1.05rem;font-weight:900;line-height:1.5;margin-bottom:.75rem;white-space:pre-line}
.chapter-body{font-size:.87rem;line-height:1.9;color:var(--ink2)}
.chapter-link{display:inline-block;margin-top:.75rem;font-size:.75rem;color:var(--red);text-decoration:none;border-bottom:1px solid var(--red-l)}

/* ── SECTIONS ── */
.endorsers-section{background:var(--bg2);border-top:1px solid var(--rule)}
.section-eyebrow{color:var(--red)}
.endorser-photo{background:#ddd8d0;color:var(--ink3)}
.endorser-theme{color:var(--red)}
.authors-section{border-top:1px solid var(--rule)}
.author-photo{background:#ddd8d0;color:var(--ink3)}
.author-title{color:var(--red)}
.recommenders-section{background:var(--bg2);border-top:1px solid var(--rule)}
.recommender-item{border-bottom:1px solid var(--rule)}
.recommender-org{color:var(--ink3)}
.cta-section{background:var(--red);border-top:none}
.cta-title,.cta-body{color:#fff}
.cta-body{color:rgba(255,255,255,.8)}
.cta-btn{background:#fff;color:var(--red)}
.cta-sub{color:rgba(255,255,255,.5)}
.post-reading{background:var(--bg);border-top:1px solid var(--rule)}
.post-card{background:#fff;border:1px solid var(--rule)}
.post-card:hover{box-shadow:0 2px 12px rgba(192,57,43,.1);border-color:var(--red-l)}
.post-card-type.event{background:rgba(192,57,43,.08);color:var(--red)}
.post-card-type.article{background:rgba(30,80,30,.06);color:#2d5a3d}
.post-card-date{color:var(--ink3)}
.post-card-title{color:var(--ink)}
.post-card-body{color:var(--ink2)}
.post-card-link{color:var(--red)}
.post-more a{color:var(--ink2)}
.post-mail{background:var(--bg2)}
.post-mail-title{color:var(--ink)}
.post-mail-body{color:var(--ink2)}
.form-input{border:1px solid var(--rule);background:#fff;color:var(--ink)}
.form-input::placeholder{color:var(--ink3)}
.form-submit{background:var(--red);color:#fff}
.form-note{color:var(--ink3)}
footer{background:var(--ink);color:rgba(255,255,255,.45)}
@media(max-width:760px){.hero-inner{grid-template-columns:1fr}.hero-right{display:none}}
${BASE_CSS}`;

  const html = `${navHtml()}

<section id="top" class="hero">
  <div class="hero-bg-type" aria-hidden="true">熱量</div>
  <div class="hero-inner">
    <div>
      <span class="hero-label">この本が向き合う、根っこの問い</span>
      <p class="hero-q fade-up">なぜ、働く人の<br>熱量は枯れていくのだろう。</p>
      <p class="hero-q-small fade-up">お金への思い込み——マネーバイアスからの解放</p>
      <div class="hero-philosophy fade-up">
        <p>給料は上がった。制度も整えた。それでも、日曜の夜が重い——。</p>
        <p>組織から熱量が失われていく背景には、<strong>「お金への思い込み（マネーバイアス）」</strong>がある。数字で人を動かすほど、人は内側から萎んでいく。</p>
        <p>この本は、その呪縛からの解放を探る一冊です。<br>人とのつながりから、<strong>熱量を取りもどす</strong>ために。</p>
      </div>
    </div>
    <div class="hero-right fade-up">
      <div class="hero-net-wrap">${netSvg}</div>
      <div class="hero-book">
        <div class="hero-book-cover">書影</div>
        <div>
          <p class="hero-book-title">熱量あふれる組織のつくりかた</p>
          <p class="hero-book-sub">数字の呪縛（お金への思い込み）からの解放</p>
          <p class="hero-book-authors"><span>吉原史郎</span>・<span>宮慶優子</span> 著</p>
          <a href="#chapters" class="hero-book-link">本書の内容を見る ↓</a>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="chapters" class="chapters">
  <div class="chapters-inner">
    <p class="chapters-heading">— 本書の内容 —</p>
    ${chapterItems()}
    <div class="chapter-item chapter-grid fade-up">
      <div class="chapter-video" style="background:#e8e4dc;color:var(--ink3);display:flex;align-items:center;justify-content:center;flex-direction:column;gap:.5rem">
        <p style="letter-spacing:.1em;font-size:.72rem">CHAPTER 6</p><p style="font-size:.78rem">Coming Soon</p>
      </div>
      <div>
        <p class="chapter-num">CHAPTER 6</p>
        <h2 class="chapter-title">実践のためのアクション集</h2>
        <p class="chapter-body" style="color:var(--ink3)">準備中</p>
      </div>
    </div>
  </div>
</section>

${endorsersHtml()}${authorsHtml()}${recommendersHtml()}${ctaHtml()}${postReadingHtml()}${footerHtml()}`;

  return { css, html };
}

// ─── DESIGN 09: ダーク×赤 Dark × Red ────────────────────────────────────────
// 書影を反転。漆黒の背景に赤ネットワークが浮かび上がる劇的な版

function design09() {
  const netSvg = makeNetworkSvg('#e04040', 'none', '480px', 4.5);

  const css = `
:root{--bg:#080808;--bg2:#111110;--bg3:#181816;
  --ink-inv:#f0eeea;--ink2-inv:rgba(240,238,234,.65);--ink3-inv:rgba(240,238,234,.3);
  --red:#e04040;--red-l:#f07060;--rule:rgba(255,255,255,.08);--w:860px}
body{background:var(--bg);color:var(--ink-inv)}
nav{background:rgba(8,8,8,.97);border-bottom:1px solid var(--rule)}
.nav-title{color:var(--ink-inv)}
.nav-links a{color:var(--ink2-inv)}
.nav-links a:hover{color:var(--red)}
.nav-cta{background:var(--red);color:#fff}

/* ── HERO ── */
.hero{padding:5rem 2rem 0;border-bottom:1px solid var(--rule)}
.hero-inner{max-width:var(--w);margin:0 auto}
.hero-net{margin:0 auto 3rem;display:flex;justify-content:center;opacity:.92}
.hero-text{max-width:680px;margin:0 auto;text-align:center;padding-bottom:4rem}
.hero-label{font-size:.65rem;letter-spacing:.4em;color:var(--red);display:block;margin-bottom:1.5rem}
.hero-q{
  font-family:'Noto Serif JP',serif;
  font-size:clamp(1.8rem,4.5vw,3rem);font-weight:900;line-height:1.45;
  color:var(--ink-inv);margin-bottom:2rem;
}
.hero-philosophy p{font-size:.97rem;line-height:2.1;color:var(--ink2-inv);margin-bottom:.9rem;text-align:left}
.hero-philosophy strong{color:var(--red-l);font-weight:700}
.hero-divider{border:none;border-top:1px solid var(--rule);margin:2.5rem 0}
.hero-book{display:flex;align-items:center;gap:2rem;max-width:540px;margin:0 auto}
.hero-book-cover{width:60px;aspect-ratio:3/4;background:#2a2826;border-radius:3px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:.5rem;color:var(--ink3-inv);box-shadow:3px 4px 12px rgba(0,0,0,.5)}
.hero-book-title{font-family:'Noto Serif JP',serif;font-size:.9rem;font-weight:900;color:var(--ink-inv);line-height:1.5}
.hero-book-sub{font-size:.7rem;color:var(--ink3-inv)}
.hero-book-authors{font-size:.76rem;color:var(--ink2-inv)}
.hero-book-authors span{font-weight:700;color:var(--ink-inv)}
.hero-book-link{font-size:.76rem;color:var(--red);text-decoration:none;border-bottom:1px solid rgba(224,64,64,.4);display:inline-flex;margin-top:.35rem;transition:opacity .2s}
.hero-book-link:hover{opacity:.7}

/* ── CHAPTERS ── */
.chapters{padding:3.5rem 2rem;border-top:1px solid var(--rule)}
.chapters-inner{max-width:var(--w);margin:0 auto}
.chapters-heading{font-size:.68rem;letter-spacing:.4em;color:var(--red);padding-bottom:1.5rem;border-bottom:1px solid var(--rule);margin-bottom:0}
.chapter-item{display:grid;grid-template-columns:1fr 1fr;gap:2.5rem;align-items:start;padding:2.5rem 0;border-bottom:1px solid var(--rule)}
.chapter-item:last-child{border-bottom:none}
.chapter-video{background:#1a1a18;color:var(--ink3-inv)}
.play-icon{background:rgba(255,255,255,.08)}
.play-icon::after{border-color:transparent transparent transparent rgba(240,238,234,.5)}
.chapter-num{font-size:.6rem;letter-spacing:.3em;color:var(--red);margin-bottom:.4rem}
.chapter-title{font-family:'Noto Serif JP',serif;font-size:1.05rem;font-weight:900;line-height:1.5;margin-bottom:.75rem;color:var(--ink-inv);white-space:pre-line}
.chapter-body{font-size:.87rem;line-height:1.9;color:var(--ink2-inv)}
.chapter-link{display:inline-block;margin-top:.75rem;font-size:.75rem;color:var(--red);text-decoration:none;border-bottom:1px solid rgba(224,64,64,.35)}

/* ── SECTIONS ── */
.endorsers-section{background:var(--bg2);border-top:1px solid var(--rule)}
.section-eyebrow{color:var(--red)}
.section-title{color:var(--ink-inv)}
.endorser-photo{background:#2a2826;color:var(--ink3-inv)}
.endorser-name{color:var(--ink-inv)}
.endorser-title{color:var(--ink2-inv)}
.endorser-theme{color:var(--red-l)}
.authors-section{background:var(--bg3);border-top:1px solid var(--rule)}
.author-photo{background:#2a2826;color:var(--ink3-inv)}
.author-name{color:var(--ink-inv)}
.author-title{color:var(--red)}
.author-bio{color:var(--ink2-inv)}
.recommenders-section{background:var(--bg2);border-top:1px solid var(--rule)}
.recommender-item{border-bottom:1px solid var(--rule)}
.recommender-name{color:var(--ink-inv)}
.recommender-org{color:var(--ink3-inv)}
.cta-section{background:var(--red);border-top:none}
.cta-title{color:#fff}
.cta-body{color:rgba(255,255,255,.8)}
.cta-btn{background:#fff;color:var(--red)}
.cta-sub{color:rgba(255,255,255,.5)}
.post-reading{background:var(--bg2);border-top:1px solid var(--rule)}
.post-inner .section-title{color:var(--ink-inv)}
.post-card{background:#1a1a18;border:1px solid var(--rule)}
.post-card:hover{box-shadow:0 2px 16px rgba(224,64,64,.15);border-color:var(--red)}
.post-card-type.event{background:rgba(224,64,64,.12);color:var(--red)}
.post-card-type.article{background:rgba(255,255,255,.05);color:var(--ink2-inv)}
.post-card-date{color:var(--ink3-inv)}
.post-card-title{color:var(--ink-inv)}
.post-card-body{color:var(--ink2-inv)}
.post-card-link{color:var(--red)}
.post-more a{color:var(--ink2-inv)}
.post-mail{background:var(--bg3)}
.post-mail-title{color:var(--ink-inv)}
.post-mail-body{color:var(--ink2-inv)}
.form-input{border:1px solid var(--rule);background:#111;color:var(--ink-inv)}
.form-input::placeholder{color:var(--ink3-inv)}
.form-submit{background:var(--red);color:#fff}
.form-note{color:var(--ink3-inv)}
footer{background:#040404;color:rgba(255,255,255,.3)}
${BASE_CSS}`;

  const html = `${navHtml(true)}

<section id="top" class="hero">
  <div class="hero-inner">
    <div class="hero-net fade-up">${netSvg}</div>
    <div class="hero-text">
      <span class="hero-label">この本が向き合う、根っこの問い</span>
      <p class="hero-q fade-up">なぜ、働く人の<br>熱量は枯れていくのだろう。</p>
      <div class="hero-philosophy fade-up">
        <p>給料は上がった。制度も整えた。それでも、日曜の夜が重い——。</p>
        <p>組織から熱量が失われていく背景には、<strong>「お金への思い込み（マネーバイアス）」</strong>がある。数字で人を動かすほど、人は内側から萎んでいく。</p>
        <p>この本は、その呪縛からの解放を探る一冊です。<br>人とのつながりから、<strong>熱量を取りもどす</strong>ために。</p>
      </div>
      <div class="hero-divider"></div>
      <div class="hero-book fade-up">
        <div class="hero-book-cover">書影</div>
        <div>
          <p class="hero-book-title">熱量あふれる組織のつくりかた</p>
          <p class="hero-book-sub">数字の呪縛（お金への思い込み）からの解放</p>
          <p class="hero-book-authors"><span>吉原史郎</span>・<span>宮慶優子</span> 著　｜　2026年 刊行予定</p>
          <a href="#chapters" class="hero-book-link">本書の内容を見る ↓</a>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="chapters" class="chapters">
  <div class="chapters-inner">
    <p class="chapters-heading">CONTENTS — 本書の内容</p>
    ${chapterItems()}
    <div class="chapter-item chapter-grid fade-up">
      <div class="chapter-video" style="background:#1a1a18;color:rgba(240,238,234,.25);display:flex;align-items:center;justify-content:center;flex-direction:column;gap:.5rem">
        <p style="letter-spacing:.1em;font-size:.72rem">CHAPTER 6</p><p style="font-size:.78rem">Coming Soon</p>
      </div>
      <div>
        <p class="chapter-num">CHAPTER 6</p>
        <h2 class="chapter-title">実践のためのアクション集</h2>
        <p class="chapter-body" style="color:rgba(240,238,234,.3)">準備中</p>
      </div>
    </div>
  </div>
</section>

${endorsersHtml()}${authorsHtml()}${recommendersHtml()}${ctaHtml()}${postReadingHtml()}${footerHtml()}`;

  return { css, html };
}

// ─── DESIGN 10: 活版印刷風 Editorial Letterpress ──────────────────────────────
// 純白×鋭い黒タイポ×赤スポットカラーのみ。書影の清潔感を最大化した版

function design10() {
  const netSvg = makeNetworkSvg('#c0392b', 'none', '100%', 3.5);

  const css = `
:root{--bg:#ffffff;--bg2:#f8f6f3;--ink:#080808;--ink2:#404040;--ink3:#909090;
  --red:#c0392b;--rule:#d8d8d8;--w:820px}
body{background:var(--bg);color:var(--ink)}
nav{background:rgba(255,255,255,.97);border-bottom:2px solid var(--ink)}
.nav-title{color:var(--ink);font-size:.82rem;letter-spacing:.06em}
.nav-links a{color:var(--ink2)}
.nav-links a:hover{color:var(--red)}
.nav-cta{background:var(--ink);color:#fff;border-radius:0}

/* ── HERO: 2カラム活版レイアウト ── */
.hero{
  max-width:var(--w);margin:0 auto;
  padding:4rem 2rem 3rem;
  display:grid;grid-template-columns:1fr 1fr;
  gap:0;border-bottom:2px solid var(--ink);
}
.hero-left{
  padding-right:3rem;
  border-right:1px solid var(--rule);
  display:flex;flex-direction:column;justify-content:space-between;
}
.hero-right{
  padding-left:3rem;
  display:flex;flex-direction:column;gap:2rem;
}
.hero-label{font-size:.62rem;letter-spacing:.4em;color:var(--red);display:block;margin-bottom:1.25rem;text-transform:uppercase}
.hero-q{
  font-family:'Noto Serif JP',serif;
  font-size:clamp(1.7rem,3.5vw,2.4rem);font-weight:900;line-height:1.5;
  color:var(--ink);margin-bottom:1.5rem;
}
.hero-q-accent{color:var(--red)}
.hero-philosophy{margin-bottom:2rem}
.hero-philosophy p{font-size:.9rem;line-height:2.1;color:var(--ink2);margin-bottom:.75rem}
.hero-philosophy strong{color:var(--red);font-weight:700}
.hero-book{border-top:1px solid var(--rule);padding-top:1.5rem;display:flex;gap:1.25rem;align-items:flex-start}
.hero-book-cover{width:52px;aspect-ratio:3/4;background:#e8e4dc;border-radius:2px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:.5rem;color:var(--ink3);box-shadow:2px 3px 8px rgba(0,0,0,.1)}
.hero-book-title{font-family:'Noto Serif JP',serif;font-size:.88rem;font-weight:900;line-height:1.5}
.hero-book-sub{font-size:.68rem;color:var(--ink3)}
.hero-book-authors{font-size:.74rem;color:var(--ink2)}
.hero-book-authors span{font-weight:700}
.hero-book-link{font-size:.74rem;color:var(--red);text-decoration:none;border-bottom:1px solid var(--red);display:inline-flex;margin-top:.3rem;transition:opacity .2s}
.hero-book-link:hover{opacity:.6}
.hero-net-box{
  border:1px solid var(--rule);padding:1.25rem;
  background:var(--bg2);border-radius:2px;
}
.hero-net-caption{font-size:.65rem;letter-spacing:.12em;color:var(--ink3);margin-top:.75rem;text-align:center}

/* ── CHAPTERS ── */
.chapters{padding:3.5rem 2rem;border-top:none}
.chapters-inner{max-width:var(--w);margin:0 auto}
.chapters-heading{
  font-family:'Noto Serif JP',serif;font-size:.85rem;font-weight:300;
  letter-spacing:.2em;color:var(--ink2);
  padding-bottom:1.25rem;border-bottom:2px solid var(--ink);
  margin-bottom:0;
}
.chapter-item{
  display:grid;grid-template-columns:1fr 1fr;gap:2.5rem;align-items:start;
  padding:2.5rem 0;border-bottom:1px solid var(--rule);
}
.chapter-item:last-child{border-bottom:none}
.chapter-video{background:#f0ede8;color:var(--ink3)}
.play-icon{background:rgba(255,255,255,.8)}
.play-icon::after{border-color:transparent transparent transparent var(--ink2)}
.chapter-num{font-size:.6rem;letter-spacing:.3em;color:var(--red);margin-bottom:.4rem;text-transform:uppercase}
.chapter-title{font-family:'Noto Serif JP',serif;font-size:1rem;font-weight:900;line-height:1.5;margin-bottom:.75rem;white-space:pre-line}
.chapter-body{font-size:.86rem;line-height:1.95;color:var(--ink2)}
.chapter-link{display:inline-block;margin-top:.75rem;font-size:.74rem;color:var(--red);text-decoration:none;border-bottom:1px solid var(--red);transition:opacity .2s}
.chapter-link:hover{opacity:.6}

/* ── SECTIONS ── */
.endorsers-section{background:var(--bg2);border-top:2px solid var(--ink)}
.section-eyebrow{color:var(--red);letter-spacing:.4em}
.endorser-photo{background:#e0dbd4;color:var(--ink3)}
.endorser-theme{color:var(--red)}
.authors-section{border-top:1px solid var(--rule)}
.author-photo{background:#e0dbd4;color:var(--ink3)}
.author-title{color:var(--red)}
.recommenders-section{background:var(--bg2);border-top:1px solid var(--rule)}
.recommender-item{border-bottom:1px solid var(--rule)}
.recommender-org{color:var(--ink3)}
.cta-section{background:var(--ink);border-top:2px solid var(--ink)}
.cta-title{color:#fff}
.cta-body{color:rgba(255,255,255,.7)}
.cta-btn{background:var(--red);color:#fff;border-radius:0}
.cta-sub{color:rgba(255,255,255,.4)}
.post-reading{background:var(--bg);border-top:1px solid var(--rule)}
.post-card{background:var(--bg2);border:1px solid var(--rule)}
.post-card:hover{box-shadow:0 2px 10px rgba(0,0,0,.08);border-color:var(--red)}
.post-card-type.event{background:rgba(192,57,43,.08);color:var(--red)}
.post-card-type.article{background:rgba(0,0,0,.04);color:var(--ink2)}
.post-card-date{color:var(--ink3)}
.post-card-title{color:var(--ink)}
.post-card-body{color:var(--ink2)}
.post-card-link{color:var(--red);border-bottom:1px solid var(--red)}
.post-more a{color:var(--ink2);border-bottom:1px solid var(--rule)}
.post-mail{background:var(--bg2);border:1px solid var(--rule)}
.post-mail-title{color:var(--ink)}
.post-mail-body{color:var(--ink2)}
.form-input{border:1px solid var(--rule);background:#fff;color:var(--ink)}
.form-input::placeholder{color:var(--ink3)}
.form-submit{background:var(--ink);color:#fff;border-radius:0}
.form-note{color:var(--ink3)}
footer{background:var(--ink);color:rgba(255,255,255,.4)}
@media(max-width:720px){
  .hero{grid-template-columns:1fr}
  .hero-left{padding-right:0;border-right:none;border-bottom:1px solid var(--rule);padding-bottom:2rem;margin-bottom:2rem}
  .hero-right{padding-left:0}
}
${BASE_CSS}`;

  const html = `${navHtml()}

<section id="top">
  <div class="hero">
    <div class="hero-left">
      <div>
        <span class="hero-label">この本が向き合う、根っこの問い</span>
        <h1 class="hero-q fade-up">なぜ、働く人の<br>熱量は<br><span class="hero-q-accent">枯れていくのだろう。</span></h1>
        <div class="hero-philosophy fade-up">
          <p>給料は上がった。制度も整えた。それでも、日曜の夜が重い——。</p>
          <p>組織から熱量が失われていく背景には、<strong>「お金への思い込み（マネーバイアス）」</strong>がある。数字で人を動かすほど、人は内側から萎んでいく。</p>
          <p>この本は、その呪縛からの解放を探る一冊です。</p>
        </div>
      </div>
      <div class="hero-book fade-up">
        <div class="hero-book-cover">書影</div>
        <div>
          <p class="hero-book-title">熱量あふれる組織のつくりかた</p>
          <p class="hero-book-sub">数字の呪縛（お金への思い込み）からの解放</p>
          <p class="hero-book-authors"><span>吉原史郎</span>・<span>宮慶優子</span> 著</p>
          <a href="#chapters" class="hero-book-link">本書の内容を見る ↓</a>
        </div>
      </div>
    </div>
    <div class="hero-right fade-up">
      <div class="hero-net-box">
        ${netSvg}
        <p class="hero-net-caption">人とのつながりが、組織の熱量を生む</p>
      </div>
    </div>
  </div>
</section>

<section id="chapters" class="chapters">
  <div class="chapters-inner">
    <p class="chapters-heading">— 本書の内容 —</p>
    ${chapterItems()}
    <div class="chapter-item chapter-grid fade-up">
      <div class="chapter-video" style="background:#f0ede8;color:var(--ink3);display:flex;align-items:center;justify-content:center;flex-direction:column;gap:.5rem">
        <p style="letter-spacing:.1em;font-size:.72rem">CHAPTER 6</p><p style="font-size:.78rem">Coming Soon</p>
      </div>
      <div>
        <p class="chapter-num">CHAPTER 6</p>
        <h2 class="chapter-title">実践のためのアクション集</h2>
        <p class="chapter-body" style="color:var(--ink3)">準備中</p>
      </div>
    </div>
  </div>
</section>

${endorsersHtml()}${authorsHtml()}${recommendersHtml()}${ctaHtml()}${postReadingHtml()}${footerHtml()}`;

  return { css, html };
}

// ─── PAGE BUILDER & GENERATE ─────────────────────────────────────────────────

function buildPage(label, design) {
  const { css, html, js = '' } = design;
  return `<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>熱量あふれる組織のつくりかた｜${label}</title>
${FONTS}
<style>${css}</style>
</head>
<body>
${html}
<script>
${BASE_JS}
${js}
</script>
</body>
</html>`;
}

const FILES = [
  { file:'lp-book-07-coverdirect.html', label:'A: 書影直結', design:design07() },
  { file:'lp-book-08-verttype.html',    label:'B: 縦組みタイポ', design:design08() },
  { file:'lp-book-09-darkred.html',     label:'C: ダーク×赤', design:design09() },
  { file:'lp-book-10-editorial.html',   label:'D: 活版印刷風', design:design10() },
];

FILES.forEach(({ file, label, design }) => {
  const content = buildPage(label, design);
  fs.writeFileSync(path.join(DIR, file), content, 'utf8');
  console.log(`✓ ${file}  (${(content.length/1024).toFixed(1)} KB)`);
});

console.log('\n✅ 書籍LP v3 — 書影方向性反映 4案を生成しました');
console.log('   A: 書影直結   → lp-book-07-coverdirect.html  白×赤ネットSVG、クリーン');
console.log('   B: 縦組みタイポ → lp-book-08-verttype.html    「熱量」大タイポ背景、書影ライク');
console.log('   C: ダーク×赤  → lp-book-09-darkred.html      漆黒×赤ネット、書影反転版');
console.log('   D: 活版印刷風 → lp-book-10-editorial.html    白×2カラム活版、赤スポットカラー');
