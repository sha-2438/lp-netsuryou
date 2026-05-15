/**
 * generate-book-v2.js
 * 書籍LP 5デザイン案を生成する
 *
 * 出力:
 *   lp-book-02-warm.html      A: 温炉（温暖アンバー）
 *   lp-book-03-leftaxis.html  B: 軸（左軸統一型）
 *   lp-book-04-timeline.html  C: 道筋（縦線タイムライン）
 *   lp-book-05-navy.html      D: 対比（紺×橙）
 *   lp-book-06-bloom.html     E: 点火（色にじみ）
 */

const fs = require('fs');
const path = require('path');
const DIR = __dirname;

// ─── DATA ────────────────────────────────────────────────────────────────────

const CHAPTERS = [
  {
    num: 'INTRODUCTION',
    title: 'はじめに',
    body: '人生にも、職場にも、組織にも、わたし達一人ひとりの「人生の熱量」が湧きあがり、躍動していてほしい——。本書の根本にある願いと、「マネーバイアス」という問いへの向き合い方を語る。',
  },
  {
    num: 'CHAPTER 1',
    title: '組織から熱量が枯渇していく今、\n本当に必要な変化とは？',
    body: '「で？」と言われた瞬間、心の糸が切れた。給料は上がったのに、日曜の夜が重い——。組織から熱量が失われる瞬間の実例と、その背後にある「マネーバイアス」の正体に迫る。Gallup調査：仕事に熱意を持つ社員はわずか6%。',
  },
  {
    num: 'CHAPTER 2',
    title: '熱量あふれる組織とは？',
    body: '熱量はお金で買えない。では、どうすれば取り戻せるのか。「人生の熱量」が湧きあがる場、組織に織り込まれる営み、めぐり続ける学びの姿勢——「3つの風穴」から、実践へのヒントを届ける。',
  },
  {
    num: 'CHAPTER 3',
    title: '枯渇していく人生の熱量の背景',
    body: 'なぜ、わたし達はお金への思い込みから抜け出せないのか。経済思想の歴史から「マネーバイアス」の社会的・歴史的な根拠を紐解き、「いのちのつながり」という視点へと読者を誘う。',
  },
  {
    num: 'CHAPTER 4',
    title: '個人と組織の新たな関係性と\n「生成の組織」',
    body: '「ライフでワークを包む」視点が生む、個人の自律と相互依存の共存。森の菌糸ネットワークのように、根っこでつながりあう組織の姿——「生成の組織論（Becoming）」という新たな地平を開く。',
  },
  {
    num: 'CHAPTER 5',
    title: '実践企業の皆さまのストーリー',
    body: '九州電力グループ（人的資本経営最優秀賞受賞）、宮田運輸、丸善雄松堂ほか6社の現場から。「人とのつながり」から熱量が湧きあがり、組織全体へと広がっていく——変化はこうして起きた。',
  },
];

const ENDORSERS = [
  { name: '堂目 卓生',  title: '大阪大学 特任教授',                        theme: '「お金への思い込み」を歴史から学ぶ' },
  { name: '新井 和宏',  title: '武蔵野大学ウェルビーイング学部 客員教授',   theme: '人生という視点から組織を学ぶ'      },
  { name: '矢萩 大輔',  title: '有限会社人事・労務',                        theme: '現場から問い直す、組織と人'        },
  { name: '四井 真治',  title: 'パーマカルチャーデザイナー・地球再生型生活研究家', theme: '「いのちの仕組み」を学ぶ'    },
  { name: '西山 勝',    title: '九州電力 代表取締役社長',                   theme: 'これからの企業の可能性'            },
  { name: '岩井 睦雄',  title: '経済同友会 筆頭副代表幹事',                 theme: 'これからの企業の可能性'            },
];

// ─── SHARED HTML PARTS ───────────────────────────────────────────────────────

const FONTS = `<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@300;400;600;900&family=Noto+Sans+JP:wght@300;400;500;700&display=swap" rel="stylesheet">`;

function navHtml() {
  return `
<nav>
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
  const cards = ENDORSERS.map(e => `
      <div class="endorser-card fade-up">
        <div class="endorser-photo">写真</div>
        <div>
          <p class="endorser-name">${e.name}</p>
          <p class="endorser-title">${e.title}</p>
          <p class="endorser-theme">${e.theme}</p>
        </div>
      </div>`).join('');
  return `
<section id="endorsers" class="section endorsers-section">
  <div class="section-inner">
    <p class="section-eyebrow">SPECIAL CONTRIBUTORS</p>
    <h2 class="section-title fade-up">対談コラム執筆者・主な推薦者</h2>
    <div class="endorsers-grid">${cards}
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
          <p class="author-bio">倒産したリゾートホテルの再生経営、三菱UFJリサーチ＆コンサルティングでの経営・組織開発コンサルティングを経て、現在は製造業の取締役として経営の現場に立つ。『実務でつかむ！ティール組織（2018年）』著者。（ダミー）</p>
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
      <div class="recommender-item"><p class="recommender-name">推薦者 ダミーE</p><p class="recommender-org">所属・肩書きダミー</p></div>
    </div>
  </div>
</section>`;
}

function ctaHtml() {
  return `
<section id="amazon" class="cta-section">
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
        <h3 class="post-card-title">なぜ、組織から「熱量」が消えるのか——第1章を深読みする</h3>
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
        <p class="form-note">※ このフォームはモックアップです。実装時に差し替えます。</p>
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

// ─── BASE SHARED CSS (common reset + component styles used by all) ────────────

const BASE_CSS = `
/* RESET */
*{margin:0;padding:0;box-sizing:border-box}
html{scroll-behavior:smooth}
body{font-family:'Noto Sans JP',sans-serif;font-size:16px;line-height:1.8}

/* NAV */
nav{position:sticky;top:0;z-index:100;backdrop-filter:blur(8px);padding:.75rem 2rem;}
.nav-inner{max-width:var(--w);margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:1rem;flex-wrap:wrap}
.nav-title{font-family:'Noto Serif JP',serif;font-size:.85rem;font-weight:600;white-space:nowrap}
.nav-links{display:flex;gap:1.25rem;flex-wrap:wrap}
.nav-links a{font-size:.72rem;text-decoration:none;letter-spacing:.05em;white-space:nowrap;transition:color .2s}
.nav-cta{font-size:.72rem;padding:.35rem 1rem;border-radius:2px;text-decoration:none;white-space:nowrap;letter-spacing:.05em;transition:opacity .2s}
.nav-cta:hover{opacity:.8}

/* SECTION COMMON */
.section{padding:4rem 2rem}
.section-inner{max-width:var(--w);margin:0 auto}
.section-eyebrow{font-size:.68rem;letter-spacing:.35em;margin-bottom:.5rem;display:block}
.section-title{font-family:'Noto Serif JP',serif;font-size:clamp(1.3rem,2.5vw,1.9rem);font-weight:900;line-height:1.4;margin-bottom:2.5rem}

/* VIDEO PLACEHOLDER */
.chapter-video{aspect-ratio:16/9;border-radius:4px;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:.75rem;font-size:.75rem}
.play-icon{width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center}
.play-icon::after{content:'';border-style:solid;border-width:9px 0 9px 16px;margin-left:3px}

/* ENDORSERS */
.endorsers-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem}
.endorser-card{display:flex;gap:1rem;align-items:flex-start}
.endorser-photo{width:52px;height:52px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:.55rem}
.endorser-name{font-size:.9rem;font-weight:700;margin-bottom:.2rem}
.endorser-title{font-size:.72rem;line-height:1.6}
.endorser-theme{font-size:.72rem;margin-top:.3rem;font-style:italic}

/* AUTHORS */
.authors-grid{display:grid;grid-template-columns:1fr 1fr;gap:3rem}
.author-card{display:flex;gap:1.5rem;align-items:flex-start}
.author-photo{width:80px;height:80px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:.65rem}
.author-name{font-family:'Noto Serif JP',serif;font-size:1.1rem;font-weight:900;margin-bottom:.25rem}
.author-title{font-size:.75rem;margin-bottom:.6rem}
.author-bio{font-size:.82rem;line-height:1.9}

/* RECOMMENDERS */
.recommenders{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:.75rem 1.5rem}
.recommender-item{font-size:.82rem;line-height:1.6;padding:.6rem 0}
.recommender-name{font-weight:700}
.recommender-org{font-size:.72rem}

/* CTA */
.cta-section{padding:4rem 2rem;text-align:center}
.cta-inner{max-width:540px;margin:0 auto}
.cta-title{font-family:'Noto Serif JP',serif;font-size:clamp(1.3rem,3vw,2rem);font-weight:900;line-height:1.5;margin-bottom:1rem}
.cta-body{font-size:.9rem;line-height:1.9;margin-bottom:2rem}
.cta-btn{display:inline-block;padding:1rem 3rem;font-weight:900;font-size:1rem;border-radius:4px;text-decoration:none;letter-spacing:.05em;transition:opacity .2s}
.cta-btn:hover{opacity:.85}
.cta-sub{font-size:.75rem;margin-top:.75rem}

/* POST READING */
.post-reading{padding:4rem 2rem}
.post-inner{max-width:var(--w);margin:0 auto}
.post-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:1.25rem;margin-bottom:1.25rem}
.post-card{border-radius:4px;padding:1.4rem;display:flex;flex-direction:column;gap:.5rem;transition:box-shadow .2s}
.post-card-type{display:inline-flex;align-items:center;gap:.4rem;font-size:.65rem;letter-spacing:.15em;font-weight:700;padding:.2rem .65rem;border-radius:50px;width:fit-content}
.post-card-date{font-size:.72rem}
.post-card-title{font-family:'Noto Serif JP',serif;font-size:.95rem;font-weight:700;line-height:1.5}
.post-card-body{font-size:.78rem;line-height:1.8;flex:1}
.post-card-link{font-size:.75rem;text-decoration:none;border-bottom:1px solid;width:fit-content;transition:opacity .2s;margin-top:.25rem}
.post-card-link:hover{opacity:.7}
.post-more{text-align:right;margin-bottom:2.5rem}
.post-more a{font-size:.8rem;text-decoration:none;border-bottom:1px solid;transition:opacity .2s}
.post-more a:hover{opacity:.7}
.post-mail{border-radius:6px;padding:2rem 2.5rem;display:grid;grid-template-columns:1fr 1fr;gap:2rem;align-items:center}
.post-mail-title{font-family:'Noto Serif JP',serif;font-size:1.1rem;font-weight:900;margin-bottom:.5rem}
.post-mail-body{font-size:.82rem;line-height:1.8}
.form-row{display:flex;gap:.5rem;margin-bottom:.5rem}
.form-input{flex:1;padding:.65rem .9rem;border-radius:3px;font-size:.82rem;font-family:'Noto Sans JP',sans-serif}
.form-submit{padding:.65rem 1.25rem;border:none;border-radius:3px;font-size:.82rem;cursor:pointer;white-space:nowrap;font-family:'Noto Sans JP',sans-serif;font-weight:700;transition:opacity .2s}
.form-submit:hover{opacity:.85}
.form-note{font-size:.68rem;line-height:1.7}

/* FOOTER */
footer{padding:2rem;text-align:center;font-size:.75rem;line-height:2}

/* FADE UP ANIMATION */
.fade-up{opacity:0;transform:translateY(24px);transition:opacity .6s ease,transform .6s ease}
.fade-up.visible{opacity:1;transform:translateY(0)}

/* RESPONSIVE */
@media(max-width:720px){
  .chapter-grid{grid-template-columns:1fr!important}
  .endorsers-grid{grid-template-columns:1fr 1fr}
  .authors-grid{grid-template-columns:1fr}
  .post-cards{grid-template-columns:1fr}
  .post-mail{grid-template-columns:1fr}
  .nav-links{display:none}
}
@media(max-width:480px){
  .endorsers-grid{grid-template-columns:1fr}
}`;

const BASE_JS = `
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });
document.querySelectorAll('.fade-up').forEach(el => obs.observe(el));`;

// ─── DESIGN A: 温炉 Warm Amber ────────────────────────────────────────────────

function designA() {
  const css = `
:root{
  --bg:#faf7f2;
  --bg2:#f0e8db;
  --ink:#2a1a0e;
  --ink2:#5c3d20;
  --ink3:#a07850;
  --amber:#c86b1a;
  --amber-l:#e8a055;
  --rule:#e0d4c0;
  --accent:#8b4010;
  --w:860px;
}
body{background:var(--bg);color:var(--ink)}
nav{background:rgba(250,247,242,.96);border-bottom:1px solid var(--rule)}
.nav-title{color:var(--ink)}
.nav-links a{color:var(--ink2)}
.nav-links a:hover,.nav-cta:hover{color:var(--amber)}
.nav-cta{background:var(--amber);color:#fff}

/* ── MAIN ── */
.main-section{padding:5rem 2rem 5rem;border-bottom:3px solid var(--amber-l)}
.main-inner{max-width:var(--w);margin:0 auto}
.main-label{font-size:.68rem;letter-spacing:.35em;color:var(--amber);display:block;margin-bottom:1.5rem}
.main-question{
  padding-left:1.75rem;
  border-left:5px solid var(--amber);
  margin-bottom:3rem;
}
.main-question-text{
  font-family:'Noto Serif JP',serif;
  font-size:clamp(2rem,5vw,3rem);
  font-weight:900;line-height:1.45;
  color:var(--ink);
}
.main-divider{width:48px;height:2px;background:var(--amber-l);margin:2.5rem 0}
.main-philosophy{max-width:580px}
.main-philosophy p{font-size:1rem;line-height:2.1;color:var(--ink2);margin-bottom:1rem}
.main-philosophy p:last-child{margin-bottom:0}
.main-philosophy strong{color:var(--amber);font-weight:700}
.main-book{
  margin-top:3.5rem;padding-top:2rem;
  border-top:1px solid var(--rule);
  display:flex;align-items:center;gap:2rem;
  background:var(--bg2);padding:1.5rem 2rem;
  border-radius:6px;
}
.main-book-cover{width:60px;aspect-ratio:3/4;background:#d8c8b0;border-radius:3px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:.5rem;color:var(--ink3);box-shadow:2px 3px 8px rgba(0,0,0,.12)}
.main-book-title{font-family:'Noto Serif JP',serif;font-size:.95rem;font-weight:900;color:var(--ink);line-height:1.5}
.main-book-sub{font-size:.72rem;color:var(--ink3)}
.main-book-authors{font-size:.78rem;color:var(--ink2)}
.main-book-authors span{font-weight:700;color:var(--ink)}
.main-book-link{font-size:.78rem;color:var(--amber);text-decoration:none;display:inline-flex;align-items:center;gap:.3rem;border-bottom:1px solid var(--amber-l);transition:opacity .2s}
.main-book-link:hover{opacity:.7}

/* ── CHAPTERS ── */
.chapters{padding:3rem 2rem;border-top:1px solid var(--rule)}
.chapters-inner{max-width:var(--w);margin:0 auto}
.chapters-heading{font-family:'Noto Serif JP',serif;font-size:1rem;color:var(--ink2);letter-spacing:.12em;padding-bottom:1rem;border-bottom:1px solid var(--rule);margin-bottom:0}
.chapter-item{display:grid;grid-template-columns:1fr 1fr;gap:2.5rem;align-items:start;padding:2.75rem 0;border-bottom:1px solid var(--rule)}
.chapter-item:nth-child(even){background:var(--bg2);margin:0 -2rem;padding:2.75rem 2rem}
.chapter-item:last-child{border-bottom:none}
.chapter-video{background:#d8cdb8;color:var(--ink3)}
.play-icon{background:rgba(255,255,255,.65)}
.play-icon::after{border-color:transparent transparent transparent var(--ink2)}
.chapter-num{font-size:.65rem;letter-spacing:.3em;color:var(--amber);margin-bottom:.4rem}
.chapter-title{font-family:'Noto Serif JP',serif;font-size:1.05rem;font-weight:900;line-height:1.5;margin-bottom:.75rem;white-space:pre-line}
.chapter-body{font-size:.88rem;line-height:1.9;color:var(--ink2)}
.chapter-link{display:inline-block;margin-top:.75rem;font-size:.75rem;color:var(--amber);text-decoration:none;border-bottom:1px solid var(--amber-l);transition:color .2s}
.chapter-link:hover{color:var(--ink)}
.chapter-coming{background:var(--bg2);border-radius:4px;padding:1.5rem;text-align:center}

/* ── SECTIONS ── */
.endorsers-section{background:var(--bg2)}
.section-eyebrow{color:var(--amber)}
.endorser-photo{background:#d8c8b0;color:var(--ink3)}
.endorser-theme{color:var(--amber)}
.author-photo{background:#d8c8b0;color:var(--ink3)}
.author-title{color:var(--amber)}
.recommenders-section{background:var(--bg)}
.recommender-item{border-bottom:1px solid var(--rule)}
.recommender-org{color:var(--ink3)}

/* ── CTA ── */
.cta-section{background:var(--amber);border-top:none}
.cta-title{color:#fff}
.cta-body{color:rgba(255,255,255,.85)}
.cta-btn{background:#fff;color:var(--amber)}
.cta-sub{color:rgba(255,255,255,.6)}

/* ── POST READING ── */
.post-reading{background:var(--bg);border-top:1px solid var(--rule)}
.post-card{background:#fff;border:1px solid var(--rule)}
.post-card:hover{box-shadow:0 2px 12px rgba(200,107,26,.12);border-color:var(--amber-l)}
.post-card-type.event{background:rgba(200,107,26,.1);color:var(--amber)}
.post-card-type.article{background:rgba(90,60,10,.08);color:var(--accent)}
.post-card-date{color:var(--ink3)}
.post-card-title{color:var(--ink)}
.post-card-body{color:var(--ink2)}
.post-card-link{color:var(--amber);border-color:var(--amber-l)}
.post-more a{color:var(--ink2);border-color:var(--rule)}
.post-more a:hover{color:var(--amber)}
.post-mail{background:var(--bg2)}
.post-mail-title{color:var(--ink)}
.post-mail-body{color:var(--ink2)}
.form-input{border:1px solid var(--rule);background:#fff;color:var(--ink)}
.form-input::placeholder{color:var(--ink3)}
.form-submit{background:var(--amber);color:#fff}
.form-note{color:var(--ink3)}

footer{background:var(--ink);color:rgba(255,255,255,.5)}
${BASE_CSS}`;

  const html = `${navHtml()}

<!-- MAIN: 思想・世界観 -->
<section id="top" class="main-section">
  <div class="main-inner">
    <span class="main-label">この本が向き合う、根っこの問い</span>
    <div class="main-question fade-up">
      <p class="main-question-text">なぜ、働く人の<br>熱量は枯れていくのだろう。</p>
    </div>
    <div class="main-divider"></div>
    <div class="main-philosophy fade-up">
      <p>給料は上がった。制度も整えた。<br>それでも、日曜の夜が重い——。</p>
      <p>組織から熱量が失われていく背景には、わたし達が当たり前に信じている<strong>「お金への思い込み（マネーバイアス）」</strong>がある。数字で人を動かそうとするほど、人は内側から萎んでいく。</p>
      <p>この本は、その呪縛からの解放を探る一冊です。<br>人とのつながりから、<strong>熱量を取りもどす</strong>ために。</p>
    </div>
    <div class="main-book fade-up">
      <div class="main-book-cover">書影</div>
      <div>
        <p class="main-book-title">熱量あふれる組織のつくりかた</p>
        <p class="main-book-sub">数字の呪縛（お金への思い込み）からの解放</p>
        <p class="main-book-authors"><span>吉原史郎</span>・<span>宮慶優子</span> 著　｜　2026年 刊行予定</p>
        <a href="#chapters" class="main-book-link" style="margin-top:.5rem;display:inline-flex">本書の内容を見る ↓</a>
      </div>
    </div>
  </div>
</section>

<!-- CHAPTERS -->
<section id="chapters" class="chapters">
  <div class="chapters-inner">
    <p class="chapters-heading">— 本書の内容 —</p>
    ${CHAPTERS.map((ch, i) => `
    <div class="chapter-item chapter-grid fade-up">
      <div class="chapter-video"><div class="play-icon"></div><span>動画プレースホルダー</span></div>
      <div class="chapter-text">
        <p class="chapter-num">${ch.num}</p>
        <h2 class="chapter-title">${ch.title}</h2>
        <p class="chapter-body">${ch.body}</p>
        <a href="#" class="chapter-link">詳しく見る →</a>
      </div>
    </div>`).join('')}
    <div class="chapter-item chapter-grid fade-up">
      <div class="chapter-coming" style="color:var(--ink3);font-size:.85rem;aspect-ratio:16/9;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:.5rem">
        <p style="letter-spacing:.1em;font-size:.75rem">CHAPTER 6</p>
        <p style="font-family:'Noto Serif JP',serif;font-weight:600">実践のためのアクション集</p>
        <p style="font-size:.75rem">Coming Soon</p>
      </div>
      <div class="chapter-text">
        <p class="chapter-num">CHAPTER 6</p>
        <h2 class="chapter-title">実践のためのアクション集</h2>
        <p class="chapter-body" style="color:var(--ink3)">ライフソース・アート、ライフソース・プリンシプルなど、日々の実践に使えるツールと問いを収録予定。（準備中）</p>
      </div>
    </div>
  </div>
</section>

${endorsersHtml()}
${authorsHtml()}
${recommendersHtml()}
${ctaHtml()}
${postReadingHtml()}
${footerHtml()}`;

  return { css, html };
}

// ─── DESIGN B: 左軸統一 Left Axis ────────────────────────────────────────────

function designB() {
  const css = `
:root{
  --bg:#f8f8f5;
  --bg2:#eeede8;
  --ink:#181816;
  --ink2:#464640;
  --ink3:#909085;
  --green:#3a5e20;
  --green-l:#6a9040;
  --rule:#e0e0d8;
  --accent:#2d5a3d;
  --w:980px;
}
body{background:var(--bg);color:var(--ink)}
nav{background:rgba(248,248,245,.97);border-bottom:1px solid var(--rule)}
.nav-title{color:var(--ink)}
.nav-links a{color:var(--ink2)}
.nav-links a:hover{color:var(--green)}
.nav-cta{background:var(--green);color:#fff}

/* ── MAIN ── */
.main-section{padding:6rem 2rem 5rem;border-bottom:1px solid var(--rule)}
.main-inner{max-width:var(--w);margin:0 auto;display:grid;grid-template-columns:1fr 420px;gap:6rem;align-items:start}
.main-left{}
.main-label{font-size:.65rem;letter-spacing:.4em;color:var(--green);display:block;margin-bottom:2rem}
.main-question-text{
  font-family:'Noto Serif JP',serif;
  font-size:clamp(2.2rem,5.5vw,3.8rem);
  font-weight:900;line-height:1.35;
  color:var(--ink);
  margin-bottom:2.5rem;
}
.main-divider{width:32px;height:3px;background:var(--green);margin-bottom:2.5rem}
.main-philosophy p{font-size:.95rem;line-height:2.2;color:var(--ink2);margin-bottom:1rem}
.main-philosophy strong{color:var(--ink);font-weight:700}
.main-right{padding-top:1rem}
.main-book-cover{width:100%;aspect-ratio:3/4;background:#ddd8cc;border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:.6rem;color:var(--ink3);box-shadow:6px 8px 24px rgba(0,0,0,.1);margin-bottom:1.5rem}
.main-book-title{font-family:'Noto Serif JP',serif;font-size:.95rem;font-weight:900;line-height:1.5;margin-bottom:.4rem}
.main-book-sub{font-size:.72rem;color:var(--ink3);margin-bottom:.5rem}
.main-book-authors{font-size:.78rem;color:var(--ink2);margin-bottom:.8rem}
.main-book-authors span{font-weight:700;color:var(--ink)}
.main-book-link{font-size:.78rem;color:var(--green);text-decoration:none;display:inline-flex;align-items:center;border-bottom:1px solid var(--green-l);transition:opacity .2s}
.main-book-link:hover{opacity:.7}

/* ── CHAPTERS (左軸レイアウト) ── */
.chapters{padding:3rem 2rem;border-top:1px solid var(--rule)}
.chapters-inner{max-width:var(--w);margin:0 auto}
.chapters-heading{font-size:.68rem;letter-spacing:.35em;color:var(--green);padding-bottom:2rem;border-bottom:1px solid var(--rule);margin-bottom:0}
.chapter-item{display:grid;grid-template-columns:160px 1fr;gap:3rem;align-items:start;padding:2.5rem 0;border-bottom:1px solid var(--rule)}
.chapter-item:last-child{border-bottom:none}
.chapter-left{text-align:right;padding-top:.2rem}
.chapter-num{font-size:.62rem;letter-spacing:.3em;color:var(--green);margin-bottom:.3rem}
.chapter-title-short{font-family:'Noto Serif JP',serif;font-size:.78rem;font-weight:700;color:var(--ink3);line-height:1.5}
.chapter-right{}
.chapter-title{font-family:'Noto Serif JP',serif;font-size:1.1rem;font-weight:900;line-height:1.5;margin-bottom:.75rem;white-space:pre-line}
.chapter-body{font-size:.88rem;line-height:1.9;color:var(--ink2);margin-bottom:.75rem}
.chapter-video{background:#ddd8cc;color:var(--ink3);margin-bottom:.75rem}
.play-icon{background:rgba(255,255,255,.65)}
.play-icon::after{border-color:transparent transparent transparent var(--ink2)}
.chapter-link{font-size:.75rem;color:var(--green);text-decoration:none;border-bottom:1px solid var(--green-l);transition:color .2s}
.chapter-coming{background:var(--bg2);border-radius:4px;padding:1.5rem;text-align:center;color:var(--ink3)}

/* ── SECTIONS ── */
.endorsers-section{background:var(--bg2)}
.section-eyebrow{color:var(--green)}
.endorser-photo{background:#ddd8cc;color:var(--ink3)}
.endorser-theme{color:var(--green)}
.author-photo{background:#ddd8cc;color:var(--ink3)}
.author-title{color:var(--green)}
.recommenders-section{background:var(--bg)}
.recommender-item{border-bottom:1px solid var(--rule)}
.recommender-org{color:var(--ink3)}

.cta-section{background:var(--bg2);border-top:1px solid var(--rule)}
.cta-title{color:var(--ink)}
.cta-body{color:var(--ink2)}
.cta-btn{background:var(--ink);color:#fff}
.cta-sub{color:var(--ink3)}

.post-reading{background:var(--bg);border-top:1px solid var(--rule)}
.post-card{background:#fff;border:1px solid var(--rule)}
.post-card:hover{box-shadow:0 2px 12px rgba(58,94,32,.1);border-color:var(--green-l)}
.post-card-type.event{background:rgba(58,94,32,.08);color:var(--green)}
.post-card-type.article{background:rgba(45,90,61,.08);color:var(--accent)}
.post-card-date{color:var(--ink3)}
.post-card-title{color:var(--ink)}
.post-card-body{color:var(--ink2)}
.post-card-link{color:var(--green);border-color:var(--green-l)}
.post-more a{color:var(--ink2);border-color:var(--rule)}
.post-more a:hover{color:var(--green)}
.post-mail{background:var(--bg2)}
.post-mail-title{color:var(--ink)}
.post-mail-body{color:var(--ink2)}
.form-input{border:1px solid var(--rule);background:#fff;color:var(--ink)}
.form-input::placeholder{color:var(--ink3)}
.form-submit{background:var(--green);color:#fff}
.form-note{color:var(--ink3)}

footer{background:var(--ink);color:rgba(255,255,255,.5)}
@media(max-width:860px){.main-inner{grid-template-columns:1fr}.main-right{display:none}}
${BASE_CSS}`;

  const chapterItemsHtml = CHAPTERS.map(ch => `
    <div class="chapter-item fade-up">
      <div class="chapter-left">
        <p class="chapter-num">${ch.num}</p>
        <p class="chapter-title-short">${ch.title.split('\n')[0].slice(0,16)}…</p>
      </div>
      <div class="chapter-right">
        <h2 class="chapter-title">${ch.title}</h2>
        <div class="chapter-video"><div class="play-icon"></div><span>動画プレースホルダー</span></div>
        <p class="chapter-body">${ch.body}</p>
        <a href="#" class="chapter-link">詳しく見る →</a>
      </div>
    </div>`).join('');

  const html = `${navHtml()}

<section id="top" class="main-section">
  <div class="main-inner">
    <div class="main-left">
      <span class="main-label">この本が向き合う、根っこの問い</span>
      <p class="main-question-text fade-up">なぜ、働く人の<br>熱量は<br>枯れていくのだろう。</p>
      <div class="main-divider"></div>
      <div class="main-philosophy fade-up">
        <p>給料は上がった。制度も整えた。<br>それでも、日曜の夜が重い——。</p>
        <p>組織から熱量が失われていく背景には、<strong>「お金への思い込み（マネーバイアス）」</strong>がある。数字で人を動かすほど、人は内側から萎んでいく。</p>
        <p>この本は、その呪縛からの解放を探る一冊です。人とのつながりから、<strong>熱量を取りもどす</strong>ために。</p>
      </div>
    </div>
    <div class="main-right fade-up">
      <div class="main-book-cover">書影プレースホルダー</div>
      <h1 class="main-book-title">熱量あふれる組織のつくりかた</h1>
      <p class="main-book-sub">数字の呪縛（お金への思い込み）からの解放</p>
      <p class="main-book-authors"><span>吉原史郎</span>・<span>宮慶優子</span> 著　｜　2026年 刊行予定</p>
      <a href="#chapters" class="main-book-link">本書の内容を見る ↓</a>
    </div>
  </div>
</section>

<section id="chapters" class="chapters">
  <div class="chapters-inner">
    <p class="chapters-heading">CONTENTS — 本書の内容</p>
    ${chapterItemsHtml}
    <div class="chapter-item fade-up">
      <div class="chapter-left">
        <p class="chapter-num">CHAPTER 6</p>
        <p class="chapter-title-short">準備中</p>
      </div>
      <div class="chapter-right">
        <h2 class="chapter-title">実践のためのアクション集</h2>
        <div class="chapter-coming">
          <p style="font-size:.78rem">Coming Soon — 準備中</p>
        </div>
      </div>
    </div>
  </div>
</section>

${endorsersHtml()}
${authorsHtml()}
${recommendersHtml()}
${ctaHtml()}
${postReadingHtml()}
${footerHtml()}`;

  return { css, html };
}

// ─── DESIGN C: 縦線タイムライン Timeline ─────────────────────────────────────

function designC() {
  const css = `
:root{
  --bg:#f9f8f5;
  --bg2:#eceaf4;
  --ink:#1a1a38;
  --ink2:#40406a;
  --ink3:#8080a8;
  --indigo:#3d4f8a;
  --indigo-l:#6878c0;
  --amber:#c86b1a;
  --rule:#d8d6e8;
  --w:860px;
}
body{background:var(--bg);color:var(--ink)}
nav{background:rgba(249,248,245,.97);border-bottom:1px solid var(--rule)}
.nav-title{color:var(--ink)}
.nav-links a{color:var(--ink2)}
.nav-links a:hover{color:var(--indigo)}
.nav-cta{background:var(--indigo);color:#fff}

/* ── MAIN ── */
.main-section{padding:5.5rem 2rem 5rem;border-bottom:1px solid var(--rule)}
.main-inner{max-width:var(--w);margin:0 auto}
.main-label{font-size:.65rem;letter-spacing:.4em;color:var(--indigo);display:block;margin-bottom:1.5rem}
.main-question-text{
  font-family:'Noto Serif JP',serif;
  font-size:clamp(1.9rem,5vw,3rem);
  font-weight:900;line-height:1.45;
  color:var(--ink);
  margin-bottom:2.5rem;
}
.main-question-text em{font-style:normal;color:var(--indigo)}
.main-divider{width:40px;height:2px;background:var(--indigo-l);margin-bottom:2.5rem}
.main-philosophy{max-width:600px}
.main-philosophy p{font-size:.97rem;line-height:2.15;color:var(--ink2);margin-bottom:1rem}
.main-philosophy p:last-child{margin-bottom:0}
.main-philosophy strong{color:var(--indigo);font-weight:700}
.main-book{margin-top:3.5rem;padding:1.5rem 2rem;border-radius:6px;background:var(--bg2);display:flex;align-items:center;gap:2rem}
.main-book-cover{width:60px;aspect-ratio:3/4;background:#c8c6e0;border-radius:3px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:.5rem;color:var(--ink3);box-shadow:2px 3px 8px rgba(0,0,0,.1)}
.main-book-title{font-family:'Noto Serif JP',serif;font-size:.95rem;font-weight:900;line-height:1.5}
.main-book-sub{font-size:.72rem;color:var(--ink3)}
.main-book-authors{font-size:.78rem;color:var(--ink2)}
.main-book-authors span{font-weight:700;color:var(--ink)}
.main-book-link{font-size:.78rem;color:var(--indigo);text-decoration:none;border-bottom:1px solid var(--indigo-l);display:inline-flex;margin-top:.3rem;transition:opacity .2s}
.main-book-link:hover{opacity:.7}

/* ── TIMELINE CHAPTERS ── */
.chapters{padding:4rem 2rem;border-top:1px solid var(--rule)}
.chapters-inner{max-width:var(--w);margin:0 auto}
.chapters-heading{font-size:.68rem;letter-spacing:.4em;color:var(--indigo);padding-bottom:1.5rem;border-bottom:1px solid var(--rule);margin-bottom:3rem}
.timeline{position:relative;padding-left:0}
.timeline::before{content:'';position:absolute;left:50%;top:0;bottom:0;width:2px;background:var(--rule);transform:translateX(-50%)}
.timeline-item{display:grid;grid-template-columns:1fr 40px 1fr;gap:1.5rem;align-items:start;margin-bottom:3.5rem;position:relative}
.timeline-item.left .timeline-content{grid-column:1;text-align:right;padding-right:1rem}
.timeline-item.left .timeline-video{grid-column:1;text-align:right}
.timeline-item.left .timeline-empty{grid-column:3}
.timeline-item.right .timeline-content{grid-column:3;padding-left:1rem}
.timeline-item.right .timeline-video{grid-column:3}
.timeline-item.right .timeline-empty{grid-column:1}
.timeline-dot{grid-column:2;width:40px;height:40px;border-radius:50%;background:var(--indigo);color:#fff;display:flex;align-items:center;justify-content:center;font-size:.6rem;font-weight:700;letter-spacing:.02em;flex-shrink:0;z-index:1;box-shadow:0 0 0 4px var(--bg)}
.timeline-num{font-size:.6rem;letter-spacing:.2em;color:var(--indigo);margin-bottom:.3rem}
.timeline-title{font-family:'Noto Serif JP',serif;font-size:1rem;font-weight:900;line-height:1.5;margin-bottom:.6rem;white-space:pre-line}
.timeline-body{font-size:.84rem;line-height:1.9;color:var(--ink2);margin-bottom:.6rem}
.timeline-link{font-size:.75rem;color:var(--indigo);text-decoration:none;border-bottom:1px solid var(--indigo-l);transition:opacity .2s}
.timeline-link:hover{opacity:.7}
.timeline-video-el{background:#c8c6e0;color:var(--ink3);aspect-ratio:16/9;border-radius:4px;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:.5rem;font-size:.7rem;margin-top:.6rem}
.chapter-coming{background:var(--bg2);border-radius:4px;padding:1.5rem;text-align:center;color:var(--ink3);font-size:.85rem}
@media(max-width:720px){
  .timeline::before{left:20px}
  .timeline-item{grid-template-columns:40px 1fr!important}
  .timeline-dot{grid-column:1!important;grid-row:1}
  .timeline-content,.timeline-video{grid-column:2!important;text-align:left!important;padding:0 0 0 .5rem!important}
  .timeline-empty{display:none}
}

/* ── SECTIONS ── */
.endorsers-section{background:var(--bg2)}
.section-eyebrow{color:var(--indigo)}
.endorser-photo{background:#c8c6e0;color:var(--ink3)}
.endorser-theme{color:var(--indigo)}
.author-photo{background:#c8c6e0;color:var(--ink3)}
.author-title{color:var(--indigo)}
.recommenders-section{background:var(--bg)}
.recommender-item{border-bottom:1px solid var(--rule)}
.recommender-org{color:var(--ink3)}

.cta-section{background:var(--indigo);border-top:none}
.cta-title{color:#fff}
.cta-body{color:rgba(255,255,255,.85)}
.cta-btn{background:var(--amber);color:#fff}
.cta-sub{color:rgba(255,255,255,.6)}

.post-reading{background:var(--bg);border-top:1px solid var(--rule)}
.post-card{background:#fff;border:1px solid var(--rule)}
.post-card:hover{box-shadow:0 2px 12px rgba(61,79,138,.12);border-color:var(--indigo-l)}
.post-card-type.event{background:rgba(61,79,138,.08);color:var(--indigo)}
.post-card-type.article{background:rgba(200,107,26,.08);color:var(--amber)}
.post-card-date{color:var(--ink3)}
.post-card-title{color:var(--ink)}
.post-card-body{color:var(--ink2)}
.post-card-link{color:var(--indigo);border-color:var(--indigo-l)}
.post-more a{color:var(--ink2);border-color:var(--rule)}
.post-more a:hover{color:var(--indigo)}
.post-mail{background:var(--bg2)}
.post-mail-title,.post-mail-body{color:var(--ink2)}
.post-mail-title{color:var(--ink)}
.form-input{border:1px solid var(--rule);background:#fff;color:var(--ink)}
.form-input::placeholder{color:var(--ink3)}
.form-submit{background:var(--indigo);color:#fff}
.form-note{color:var(--ink3)}
footer{background:var(--ink);color:rgba(255,255,255,.5)}
${BASE_CSS}`;

  const timelineItems = CHAPTERS.map((ch, i) => {
    const side = i % 2 === 0 ? 'left' : 'right';
    const dotLabel = ch.num === 'INTRODUCTION' ? 'Intro' : `CH${i}`;
    if (side === 'left') {
      return `
    <div class="timeline-item left fade-up">
      <div class="timeline-content">
        <p class="timeline-num">${ch.num}</p>
        <h2 class="timeline-title">${ch.title}</h2>
        <p class="timeline-body">${ch.body}</p>
        <a href="#" class="timeline-link">詳しく見る →</a>
        <div class="timeline-video-el"><div class="play-icon" style="background:rgba(255,255,255,.6)"><div style="width:0;height:0;border-style:solid;border-width:7px 0 7px 12px;border-color:transparent transparent transparent #8080a8;margin-left:2px"></div></div><span>動画プレースホルダー</span></div>
      </div>
      <div class="timeline-dot">${dotLabel}</div>
      <div class="timeline-empty"></div>
    </div>`;
    } else {
      return `
    <div class="timeline-item right fade-up">
      <div class="timeline-empty"></div>
      <div class="timeline-dot">${dotLabel}</div>
      <div class="timeline-content">
        <p class="timeline-num">${ch.num}</p>
        <h2 class="timeline-title">${ch.title}</h2>
        <p class="timeline-body">${ch.body}</p>
        <a href="#" class="timeline-link">詳しく見る →</a>
        <div class="timeline-video-el"><div class="play-icon" style="background:rgba(255,255,255,.6)"><div style="width:0;height:0;border-style:solid;border-width:7px 0 7px 12px;border-color:transparent transparent transparent #8080a8;margin-left:2px"></div></div><span>動画プレースホルダー</span></div>
      </div>
    </div>`;
    }
  }).join('');

  const html = `${navHtml()}

<section id="top" class="main-section">
  <div class="main-inner">
    <span class="main-label">この本が向き合う、根っこの問い</span>
    <p class="main-question-text fade-up">なぜ、働く人の熱量は<br><em>枯れていく</em>のだろう。</p>
    <div class="main-divider"></div>
    <div class="main-philosophy fade-up">
      <p>給料は上がった。制度も整えた。<br>それでも、日曜の夜が重い——。</p>
      <p>組織から熱量が失われていく背景には、<strong>「お金への思い込み（マネーバイアス）」</strong>がある。数字で人を動かすほど、人は内側から萎んでいく。</p>
      <p>この本は、その呪縛からの解放を探る一冊です。<br>人とのつながりから、<strong>熱量を取りもどす</strong>ために。</p>
    </div>
    <div class="main-book fade-up">
      <div class="main-book-cover">書影</div>
      <div>
        <h1 class="main-book-title">熱量あふれる組織のつくりかた</h1>
        <p class="main-book-sub">数字の呪縛（お金への思い込み）からの解放</p>
        <p class="main-book-authors"><span>吉原史郎</span>・<span>宮慶優子</span> 著　｜　2026年 刊行予定</p>
        <a href="#chapters" class="main-book-link">本書の内容を見る ↓</a>
      </div>
    </div>
  </div>
</section>

<section id="chapters" class="chapters">
  <div class="chapters-inner">
    <p class="chapters-heading">CONTENTS — 本書の内容</p>
    <div class="timeline">
      ${timelineItems}
      <div class="timeline-item right fade-up">
        <div class="timeline-empty"></div>
        <div class="timeline-dot" style="background:var(--rule);color:var(--ink3)">CH6</div>
        <div class="timeline-content">
          <p class="timeline-num">CHAPTER 6</p>
          <h2 class="timeline-title">実践のためのアクション集</h2>
          <div class="chapter-coming">Coming Soon — 準備中</div>
        </div>
      </div>
    </div>
  </div>
</section>

${endorsersHtml()}
${authorsHtml()}
${recommendersHtml()}
${ctaHtml()}
${postReadingHtml()}
${footerHtml()}`;

  return { css, html };
}

// ─── DESIGN D: 紺×橙 Navy × Orange ─────────────────────────────────────────

function designD() {
  const css = `
:root{
  --bg:#f7f6f3;
  --bg2:#1a2540;
  --ink:#1a2540;
  --ink-inv:#f0eeea;
  --ink2:#364872;
  --ink3:#8090b0;
  --orange:#e8612a;
  --orange-l:#f0a060;
  --rule:#dde0e8;
  --rule-inv:rgba(255,255,255,.12);
  --w:860px;
}
body{background:var(--bg);color:var(--ink)}
nav{background:var(--bg2);border-bottom:1px solid var(--rule-inv)}
.nav-title{color:var(--ink-inv)}
.nav-links a{color:rgba(255,255,255,.65)}
.nav-links a:hover{color:var(--orange)}
.nav-cta{background:var(--orange);color:#fff}

/* ── MAIN (dark bg) ── */
.main-section{background:var(--bg2);padding:5.5rem 2rem 5rem}
.main-inner{max-width:var(--w);margin:0 auto}
.main-label{font-size:.65rem;letter-spacing:.4em;color:var(--orange);display:block;margin-bottom:1.5rem}
.main-question{margin-bottom:3rem}
.main-question-text{
  font-family:'Noto Serif JP',serif;
  font-size:clamp(2rem,5vw,3.2rem);
  font-weight:900;line-height:1.45;
  color:var(--ink-inv);
}
.main-divider{width:40px;height:2px;background:var(--orange);margin:2.5rem 0}
.main-philosophy p{font-size:1rem;line-height:2.1;color:rgba(240,238,234,.75);margin-bottom:1rem}
.main-philosophy p:last-child{margin-bottom:0}
.main-philosophy strong{color:var(--orange-l);font-weight:700}
.main-book{margin-top:3.5rem;padding:1.75rem 2rem;border:1px solid var(--rule-inv);border-radius:6px;display:flex;align-items:center;gap:2rem}
.main-book-cover{width:64px;aspect-ratio:3/4;background:#3a4f70;border-radius:3px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:.5rem;color:rgba(255,255,255,.4);box-shadow:2px 3px 8px rgba(0,0,0,.3)}
.main-book-title{font-family:'Noto Serif JP',serif;font-size:.95rem;font-weight:900;color:var(--ink-inv);line-height:1.5}
.main-book-sub{font-size:.72rem;color:rgba(255,255,255,.45)}
.main-book-authors{font-size:.78rem;color:rgba(255,255,255,.65)}
.main-book-authors span{font-weight:700;color:var(--ink-inv)}
.main-book-link{font-size:.78rem;color:var(--orange);text-decoration:none;border-bottom:1px solid rgba(232,97,42,.4);display:inline-flex;margin-top:.35rem;transition:opacity .2s}
.main-book-link:hover{opacity:.7}

/* ── CHAPTERS ── */
.chapters{padding:3.5rem 2rem;border-top:4px solid var(--orange)}
.chapters-inner{max-width:var(--w);margin:0 auto}
.chapters-heading{font-size:.68rem;letter-spacing:.4em;color:var(--orange);padding-bottom:1.5rem;border-bottom:1px solid var(--rule);margin-bottom:0}
.chapter-item{display:grid;grid-template-columns:1fr 1fr;gap:2.5rem;align-items:start;padding:2.5rem 0;border-bottom:1px solid var(--rule)}
.chapter-item:last-child{border-bottom:none}
.chapter-video{background:#ddd8d0;color:#aaa}
.play-icon{background:rgba(255,255,255,.6)}
.play-icon::after{border-color:transparent transparent transparent #888}
.chapter-num{font-size:.62rem;letter-spacing:.3em;color:var(--orange);margin-bottom:.4rem}
.chapter-title{font-family:'Noto Serif JP',serif;font-size:1.05rem;font-weight:900;line-height:1.5;margin-bottom:.75rem;white-space:pre-line}
.chapter-body{font-size:.88rem;line-height:1.9;color:var(--ink2)}
.chapter-link{display:inline-block;margin-top:.75rem;font-size:.75rem;color:var(--orange);text-decoration:none;border-bottom:1px solid var(--orange-l);transition:color .2s}
.chapter-coming{background:var(--bg);border-radius:4px;padding:1.5rem;text-align:center;color:#aaa;font-size:.85rem}

/* ── SECTIONS ── */
.endorsers-section{background:var(--bg2)}
.endorsers-section .section-title,.endorsers-section .section-eyebrow ~ h2{color:var(--ink-inv)}
.endorsers-section .section-eyebrow{color:var(--orange)}
.endorsers-section .section-title{color:var(--ink-inv)}
.endorser-photo{background:#3a4f70;color:rgba(255,255,255,.4)}
.endorser-name{color:var(--ink-inv)}
.endorser-title{color:rgba(255,255,255,.55)}
.endorser-theme{color:var(--orange-l)}
.authors-section{background:var(--bg)}
.author-photo{background:#d8d5cc;color:#aaa}
.author-title{color:var(--orange)}
.recommenders-section{background:var(--bg)}
.recommender-item{border-bottom:1px solid var(--rule)}
.recommender-org{color:#aaa}

.cta-section{background:var(--bg);border-top:1px solid var(--rule)}
.cta-title{color:var(--ink)}
.cta-body{color:var(--ink2)}
.cta-btn{background:var(--orange);color:#fff}
.cta-sub{color:#aaa}

.post-reading{background:var(--bg2);border-top:none}
.post-inner .section-title{color:var(--ink-inv)}
.post-inner .section-eyebrow{color:var(--orange)}
.post-card{background:rgba(255,255,255,.06);border:1px solid var(--rule-inv)}
.post-card:hover{box-shadow:0 2px 12px rgba(232,97,42,.18);border-color:var(--orange)}
.post-card-type.event{background:rgba(232,97,42,.15);color:var(--orange)}
.post-card-type.article{background:rgba(255,255,255,.08);color:rgba(255,255,255,.6)}
.post-card-date{color:rgba(255,255,255,.4)}
.post-card-title{color:var(--ink-inv)}
.post-card-body{color:rgba(255,255,255,.55)}
.post-card-link{color:var(--orange);border-color:rgba(232,97,42,.35)}
.post-more a{color:rgba(255,255,255,.45);border-color:var(--rule-inv)}
.post-more a:hover{color:var(--orange)}
.post-mail{background:rgba(255,255,255,.06);border:1px solid var(--rule-inv)}
.post-mail-title{color:var(--ink-inv)}
.post-mail-body{color:rgba(255,255,255,.55)}
.form-input{border:1px solid var(--rule-inv);background:rgba(255,255,255,.07);color:var(--ink-inv)}
.form-input::placeholder{color:rgba(255,255,255,.3)}
.form-submit{background:var(--orange);color:#fff}
.form-note{color:rgba(255,255,255,.3)}

footer{background:#0e1628;color:rgba(255,255,255,.4)}
${BASE_CSS}`;

  const html = `${navHtml()}

<section id="top" class="main-section">
  <div class="main-inner">
    <span class="main-label">この本が向き合う、根っこの問い</span>
    <div class="main-question fade-up">
      <p class="main-question-text">なぜ、働く人の<br>熱量は枯れていくのだろう。</p>
    </div>
    <div class="main-divider"></div>
    <div class="main-philosophy fade-up">
      <p>給料は上がった。制度も整えた。<br>それでも、日曜の夜が重い——。</p>
      <p>組織から熱量が失われていく背景には、<strong>「お金への思い込み（マネーバイアス）」</strong>がある。数字で人を動かすほど、人は内側から萎んでいく。</p>
      <p>この本は、その呪縛からの解放を探る一冊です。<br>人とのつながりから、<strong>熱量を取りもどす</strong>ために。</p>
    </div>
    <div class="main-book fade-up">
      <div class="main-book-cover">書影</div>
      <div>
        <h1 class="main-book-title">熱量あふれる組織のつくりかた</h1>
        <p class="main-book-sub">数字の呪縛（お金への思い込み）からの解放</p>
        <p class="main-book-authors"><span>吉原史郎</span>・<span>宮慶優子</span> 著　｜　2026年 刊行予定</p>
        <a href="#chapters" class="main-book-link">本書の内容を見る ↓</a>
      </div>
    </div>
  </div>
</section>

<section id="chapters" class="chapters">
  <div class="chapters-inner">
    <p class="chapters-heading">CONTENTS — 本書の内容</p>
    ${CHAPTERS.map(ch => `
    <div class="chapter-item chapter-grid fade-up">
      <div class="chapter-video"><div class="play-icon"></div><span>動画プレースホルダー</span></div>
      <div>
        <p class="chapter-num">${ch.num}</p>
        <h2 class="chapter-title">${ch.title}</h2>
        <p class="chapter-body">${ch.body}</p>
        <a href="#" class="chapter-link">詳しく見る →</a>
      </div>
    </div>`).join('')}
    <div class="chapter-item chapter-grid fade-up">
      <div class="chapter-coming">CHAPTER 6 Coming Soon</div>
      <div>
        <p class="chapter-num">CHAPTER 6</p>
        <h2 class="chapter-title">実践のためのアクション集</h2>
        <p class="chapter-body" style="color:#aaa">準備中</p>
      </div>
    </div>
  </div>
</section>

${endorsersHtml()}
${authorsHtml()}
${recommendersHtml()}
${ctaHtml()}
${postReadingHtml()}
${footerHtml()}`;

  return { css, html };
}

// ─── DESIGN E: 点火 Color Bloom ──────────────────────────────────────────────

function designE() {
  const css = `
:root{
  --bg:#f9f8f6;
  --bg2:#f2f0eb;
  --ink:#1a1a18;
  --ink2:#4a4a42;
  --ink3:#9a9a8a;
  --ember:#c85a10;
  --ember-l:#e89050;
  --rule:#e2ddd8;
  --w:860px;
  /* bloom colors (applied when .lit) */
  --bloom-gold:#8b6914;
  --bloom-amber:#c86b1a;
}
body{background:var(--bg);color:var(--ink)}
nav{background:rgba(249,248,246,.97);border-bottom:1px solid var(--rule)}
.nav-title{color:var(--ink)}
.nav-links a{color:var(--ink2)}
.nav-links a:hover{color:var(--ember)}
.nav-cta{background:var(--ink);color:#fff}
.nav-cta:hover{background:var(--ember)}

/* ── MAIN ── */
.main-section{padding:5.5rem 2rem 5rem;border-bottom:1px solid var(--rule)}
.main-inner{max-width:var(--w);margin:0 auto}
.main-label{font-size:.65rem;letter-spacing:.4em;color:var(--ember);display:block;margin-bottom:1.5rem}
.main-question-text{
  font-family:'Noto Serif JP',serif;
  font-size:clamp(2rem,5vw,3.2rem);
  font-weight:900;line-height:1.45;
  color:var(--ink);margin-bottom:2.5rem;
}
.main-divider{width:40px;height:2px;background:var(--ember-l);margin-bottom:2.5rem}
.main-philosophy{max-width:580px}
.main-philosophy p{font-size:1rem;line-height:2.1;color:var(--ink2);margin-bottom:1rem}
.main-philosophy p:last-child{margin-bottom:0}
.main-philosophy strong{color:var(--ember);font-weight:700}
.main-book{margin-top:3.5rem;padding:1.5rem 2rem;background:var(--bg2);border-radius:6px;display:flex;align-items:center;gap:2rem}
.main-book-cover{width:62px;aspect-ratio:3/4;background:#ddd8d0;border-radius:3px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:.5rem;color:var(--ink3);box-shadow:2px 3px 8px rgba(0,0,0,.1)}
.main-book-title{font-family:'Noto Serif JP',serif;font-size:.95rem;font-weight:900;line-height:1.5}
.main-book-sub{font-size:.72rem;color:var(--ink3)}
.main-book-authors{font-size:.78rem;color:var(--ink2)}
.main-book-authors span{font-weight:700;color:var(--ink)}
.main-book-link{font-size:.78rem;color:var(--ember);text-decoration:none;border-bottom:1px solid var(--ember-l);display:inline-flex;margin-top:.35rem;transition:opacity .2s}
.main-book-link:hover{opacity:.7}

/* ── BLOOM ANIMATION ── */
/* Elements start gray/muted, gain color when .lit */
.bloom-el{
  filter:saturate(0) brightness(.9);
  transition:filter 1.2s ease, color 1.2s ease, background-color 1.2s ease;
}
.bloom-el.lit{filter:saturate(1) brightness(1)}

/* Chapters start as thin border, bloom to accent */
.chapter-item{
  display:grid;grid-template-columns:1fr 1fr;gap:2.5rem;align-items:start;
  padding:2.5rem 0;border-bottom:1px solid var(--rule);
  border-left:4px solid transparent;
  padding-left:0;
  transition:border-left-color .8s ease;
}
.chapter-item.lit{border-left-color:var(--ember-l);padding-left:1.5rem}
.chapter-item:last-child{border-bottom:none}

/* ── CHAPTER STYLES ── */
.chapters{padding:3.5rem 2rem;border-top:1px solid var(--rule)}
.chapters-inner{max-width:var(--w);margin:0 auto}
.chapters-heading{font-size:.68rem;letter-spacing:.4em;color:var(--ember);padding-bottom:1.5rem;border-bottom:1px solid var(--rule);margin-bottom:0}
.chapter-video{background:#ddd8d0;color:var(--ink3)}
.play-icon{background:rgba(255,255,255,.65)}
.play-icon::after{border-color:transparent transparent transparent var(--ink2)}
.chapter-num{font-size:.62rem;letter-spacing:.3em;color:var(--ember);margin-bottom:.4rem;transition:color 1s ease}
.chapter-item:not(.lit) .chapter-num{color:var(--ink3)}
.chapter-title{font-family:'Noto Serif JP',serif;font-size:1.05rem;font-weight:900;line-height:1.5;margin-bottom:.75rem;white-space:pre-line}
.chapter-body{font-size:.88rem;line-height:1.9;color:var(--ink2)}
.chapter-link{display:inline-block;margin-top:.75rem;font-size:.75rem;color:var(--ember);text-decoration:none;border-bottom:1px solid var(--ember-l);transition:color .2s}
.chapter-link:hover{color:var(--ink)}
.chapter-coming{background:var(--bg2);border-radius:4px;padding:1.5rem;text-align:center;color:var(--ink3);font-size:.85rem}

/* Endorsers bloom */
.endorsers-section{background:var(--bg2)}
.section-eyebrow{color:var(--ember)}
.endorser-photo{background:#ddd8d0;color:var(--ink3)}
.endorser-theme{color:var(--ember)}
.endorser-card .endorser-theme{color:var(--ink3);transition:color 1s ease}
.endorser-card.lit .endorser-theme{color:var(--ember)}
.author-photo{background:#ddd8d0;color:var(--ink3)}
.author-title{color:var(--ember)}
.recommenders-section{background:var(--bg)}
.recommender-item{border-bottom:1px solid var(--rule)}
.recommender-org{color:var(--ink3)}

.cta-section{background:var(--bg2);border-top:1px solid var(--rule)}
.cta-title{color:var(--ink)}
.cta-body{color:var(--ink2)}
.cta-btn{background:var(--ember);color:#fff}
.cta-sub{color:var(--ink3)}

.post-reading{background:var(--bg);border-top:1px solid var(--rule)}
.post-card{background:#fff;border:1px solid var(--rule)}
.post-card:hover{box-shadow:0 2px 12px rgba(200,90,16,.12);border-color:var(--ember-l)}
.post-card-type.event{background:rgba(200,90,16,.08);color:var(--ember)}
.post-card-type.article{background:rgba(60,80,40,.06);color:#3a5020}
.post-card-date{color:var(--ink3)}
.post-card-title{color:var(--ink)}
.post-card-body{color:var(--ink2)}
.post-card-link{color:var(--ember);border-color:var(--ember-l)}
.post-more a{color:var(--ink2);border-color:var(--rule)}
.post-more a:hover{color:var(--ember)}
.post-mail{background:var(--bg2)}
.post-mail-title{color:var(--ink)}
.post-mail-body{color:var(--ink2)}
.form-input{border:1px solid var(--rule);background:#fff;color:var(--ink)}
.form-input::placeholder{color:var(--ink3)}
.form-submit{background:var(--ink);color:#fff}
.form-submit:hover{background:var(--ember)}
.form-note{color:var(--ink3)}
footer{background:var(--ink);color:rgba(255,255,255,.5)}
${BASE_CSS}`;

  const bloomJs = `
// Bloom: chapter items and endorser cards gain .lit on scroll
const bloomObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if(e.isIntersecting) {
      e.target.classList.add('lit');
    }
  });
}, { threshold: 0.2 });
document.querySelectorAll('.chapter-item, .bloom-el, .endorser-card').forEach(el => bloomObs.observe(el));`;

  const html = `${navHtml()}

<section id="top" class="main-section">
  <div class="main-inner">
    <span class="main-label">この本が向き合う、根っこの問い</span>
    <p class="main-question-text fade-up">なぜ、働く人の<br>熱量は枯れていくのだろう。</p>
    <div class="main-divider"></div>
    <div class="main-philosophy fade-up">
      <p>給料は上がった。制度も整えた。<br>それでも、日曜の夜が重い——。</p>
      <p>組織から熱量が失われていく背景には、<strong>「お金への思い込み（マネーバイアス）」</strong>がある。数字で人を動かすほど、人は内側から萎んでいく。</p>
      <p>この本は、その呪縛からの解放を探る一冊です。<br>人とのつながりから、<strong>熱量を取りもどす</strong>ために。</p>
    </div>
    <div class="main-book fade-up">
      <div class="main-book-cover">書影</div>
      <div>
        <h1 class="main-book-title">熱量あふれる組織のつくりかた</h1>
        <p class="main-book-sub">数字の呪縛（お金への思い込み）からの解放</p>
        <p class="main-book-authors"><span>吉原史郎</span>・<span>宮慶優子</span> 著　｜　2026年 刊行予定</p>
        <a href="#chapters" class="main-book-link">本書の内容を見る ↓</a>
      </div>
    </div>
  </div>
</section>

<section id="chapters" class="chapters">
  <div class="chapters-inner">
    <p class="chapters-heading">CONTENTS — 本書の内容</p>
    ${CHAPTERS.map(ch => `
    <div class="chapter-item chapter-grid fade-up">
      <div class="chapter-video bloom-el"><div class="play-icon"></div><span>動画プレースホルダー</span></div>
      <div>
        <p class="chapter-num">${ch.num}</p>
        <h2 class="chapter-title">${ch.title}</h2>
        <p class="chapter-body">${ch.body}</p>
        <a href="#" class="chapter-link">詳しく見る →</a>
      </div>
    </div>`).join('')}
    <div class="chapter-item chapter-grid fade-up">
      <div class="chapter-coming bloom-el">CHAPTER 6 Coming Soon</div>
      <div>
        <p class="chapter-num">CHAPTER 6</p>
        <h2 class="chapter-title">実践のためのアクション集</h2>
        <p class="chapter-body" style="color:var(--ink3)">準備中</p>
      </div>
    </div>
  </div>
</section>

${endorsersHtml()}
${authorsHtml()}
${recommendersHtml()}
${ctaHtml()}
${postReadingHtml()}
${footerHtml()}`;

  return { css, html, js: bloomJs };
}

// ─── PAGE BUILDER ─────────────────────────────────────────────────────────────

function buildPage(title, label, design) {
  const { css, html, js = '' } = design;
  return `<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>熱量あふれる組織のつくりかた｜${label}</title>
${FONTS}
<style>
${css}
</style>
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

// ─── GENERATE ────────────────────────────────────────────────────────────────

const FILES = [
  { file: 'lp-book-02-warm.html',     label: 'A: 温炉',       design: designA() },
  { file: 'lp-book-03-leftaxis.html', label: 'B: 軸',         design: designB() },
  { file: 'lp-book-04-timeline.html', label: 'C: 道筋',       design: designC() },
  { file: 'lp-book-05-navy.html',     label: 'D: 対比',       design: designD() },
  { file: 'lp-book-06-bloom.html',    label: 'E: 点火',       design: designE() },
];

FILES.forEach(({ file, label, design }) => {
  const content = buildPage('熱量あふれる組織のつくりかた', label, design);
  const filepath = path.join(DIR, file);
  fs.writeFileSync(filepath, content, 'utf8');
  console.log(`✓ ${file}  (${(content.length / 1024).toFixed(1)} KB)`);
});

console.log('\n✅ 書籍LP 5デザイン案を生成しました');
console.log('   A: 温炉   → lp-book-02-warm.html      温暖アンバー、左ボーダーアクセント');
console.log('   B: 軸     → lp-book-03-leftaxis.html  左軸統一、2カラム・オリーブグリーン');
console.log('   C: 道筋   → lp-book-04-timeline.html  縦線タイムライン、インディゴ');
console.log('   D: 対比   → lp-book-05-navy.html      紺×橙コントラスト（ダーク）');
console.log('   E: 点火   → lp-book-06-bloom.html     スクロールで色にじみ演出');
