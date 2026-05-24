// generate-book-v7.js
// 原稿が固まってきた段階での再構成。
//  - 文言・章タイトル・対談コラムを原稿準拠に更新
//  - 表紙の世界観（淡黄×カラフル花）をLPに展開する5バリエーション
//  - モックアップ（lp-book-mockup-v1.html）の構造は保持

const fs = require('fs');

const ILLUST = 'illust-book.png';

// ── 確定情報（原稿・表紙より） ─────────────────────────
const TITLE   = '熱量あふれる組織のつくりかた';
const SUB1    = 'お金への思い込み';
const SUB2    = '数字の呪縛からの解放';
const Q       = 'なぜ、組織は枯れていくのか？';
const TAGLINE = '人とのつながりから熱量を取りもどし、<br>再び組織がまわりはじめる。';
const AUTHORS = '吉原史郎・宮慶優子';
const PUBLISHER = '日本能率協会マネジメントセンター';

// ── 哲学（はじめにから抽出） ──────────────────────────
const PHILOSOPHY_HTML = `
  <p>
    給料は上がった。制度も整えた。<br>
    それでも、日曜の夜になると、身体が鉛のように重くなる——。
  </p>
  <p>
    アデコ社の2025年調査では、就業者のおよそ<strong>7割が「仕事への熱意や意欲はないが、必要最低限の業務はこなしている」</strong>と回答している。お金のためだけに業務をこなす空気が、組織を覆っている。
  </p>
  <p>
    背景にあるのは、わたし達が無自覚に信じている<strong>「過剰なマネーバイアス（お金への思い込み）」</strong>。数値という結果を、人生の熱量や人とのつながりよりも優先し続けた結果、組織から「目に見えないもの」が失われていく。
  </p>
  <p>
    本書は、その呪縛からの解放を探る一冊です。<br>
    <strong>人とのつながり</strong>から、<strong>熱量を取りもどす</strong>ために。
  </p>
`;

// ── 章タイトル（原稿準拠） ─────────────────────────
const CHAPTERS = [
  { num:'INTRODUCTION', title:'はじめに',
    body:'なぜ、組織から「人生の熱量」が枯れていくのか。生命体的な組織を志向する際の構造的な矛盾、そして「人生の熱量」に主眼を置きながら財務的な持続性を共存させるという本書の視点を語る。' },
  { num:'CHAPTER 1', title:'組織から熱量が枯渇していく今、<br>本当に必要な変化とは？',
    body:'「で？」と言われた瞬間、心の糸が切れた。給料は上がったのに、日曜の夜が重い——。アデコ調査で就業者の7割が「形だけ業務」と回答する現実。背後にある「マネーバイアス」と、「ライフでワークを包む」という視点への転換。' },
  { num:'CHAPTER 2', title:'熱量あふれる組織とは？',
    body:'「人生の熱量」はお金で買えない。「人とのつながり」から自ずと湧きあがり、めぐり続けるもの。マネーバイアスの過剰な組織に「3つの風穴」を開ける具体策、そして役職階層を超えた「ヘテラルキー」という実践へ。' },
  { num:'CHAPTER 3', title:'枯渇していく人生の熱量の背景',
    body:'なぜ「過剰なマネーバイアス」はこれほど根深いのか。大阪大学・堂目卓生氏との対談を通じ、貨幣錯覚の歴史的展開を辿り、「いのちのつながり」という視点へと読者を誘う。' },
  { num:'CHAPTER 4', title:'個人と組織の新たな関係性と<br>「生成の組織」',
    body:'「ライフでワークを包む」視点が生む、個人の自律と相互依存の共存。森の菌糸ネットワークのように根っこでつながる組織の姿——「生成の組織論（Becoming）」という新たな実践知。' },
  { num:'CHAPTER 5', title:'実践企業の皆さまのストーリー',
    body:'人的資本経営最優秀賞の九州電力グループ、宮田運輸、有限会社人事・労務ほか6社の現場から。「人とのつながり」から熱量が湧きあがり、財務的成果とも共存していく——変化はこうして起きた。' },
];

// ── 6章は最近原稿が固まったので "Coming Soon" は外す ─────
const CH6 = {
  num:'CHAPTER 6', title:'「ライフでワークを包む」は<br>どこから生まれた？',
  body:'本書が拠って立つ視点「ライフでワークを包む」は、どのような道のりで生まれてきたのか。実践と探究の道のりを辿り、読者の明日の一歩へとつなげる。'
};

// ── 5名の豪華対談コラム（表紙準拠・原稿準拠） ─────────────
const ENDORSERS = [
  { name:'堂目 卓生', title:'大阪大学 特任教授',                              theme:'「お金への思い込み」を歴史から学ぶ' },
  { name:'新井 和宏', title:'武蔵野大学ウェルビーイング学部<br>客員教授',          theme:'「生きている組織」を学ぶ' },
  { name:'四井 真治', title:'地球再生型生活研究家<br>パーマカルチャーデザイナー',   theme:'40億年続く「いのち」を学ぶ' },
  { name:'西山 勝',   title:'九州電力株式会社<br>代表取締役社長執行役員',          theme:'「Will」と「つながり」が育む組織の力' },
  { name:'岩井 睦雄', title:'経済同友会<br>筆頭副代表幹事',                       theme:'「共助資本主義」を学ぶ' },
];

const AUTHORS_DATA = [
  { name:'吉原 史郎',
    title:'組織開発コンサルタント／製造業取締役',
    bio:'倒産したリゾートホテルの再生経営、三菱UFJリサーチ＆コンサルティングでの経営・組織開発コンサルティングを経て、現在は製造業の取締役として経営の現場に立つ。2016年に『ティール組織』原著を日本で初めて要約。原著者フレデリック・ラルー氏とアメリカで対話を重ね、『実務でつかむ！ティール組織（2018年）』を出版。『新訳 ホラクラシー（2023年）』監訳。' },
  { name:'宮慶 優子',
    title:'共著者',
    bio:'大手電力会社の経営企画部での経験をもとに、「なぜ人生の熱量の流れが止まるのか」という問いを抱えて探究を重ねてきた。本書では、現場と理論を架橋する役割を担う。' },
];

// 実践企業（5章で取り上げる組織）
const PRACTICE_COMPANIES = [
  { name:'九州電力株式会社',         tag:'人的資本経営 最優秀賞' },
  { name:'株式会社宮田運輸',         tag:'実践ストーリー' },
  { name:'有限会社人事・労務',       tag:'実践ストーリー' },
  { name:'丸善雄松堂株式会社',       tag:'エッセンス' },
  { name:'社会福祉法人 蒼渓会',       tag:'エッセンス' },
  { name:'KEIPE 株式会社',          tag:'エッセンス' },
];

const POST_CARDS = [
  { type:'event',   icon:'📅', label:'イベント', date:'2026.07.12', title:'「熱量あふれる組織」読者対話会 vol.1', body:'著者・吉原史郎が登壇。本書の問いを参加者とともに深める対話の場。（ダミー）', cta:'詳細・申込 →' },
  { type:'article', icon:'📄', label:'記事',     date:'2026.06.28', title:'なぜ、組織から「熱量」が消えるのか——第1章を深読みする', body:'マネーバイアスが組織に与える影響を、著者自身の言葉でさらに掘り下げたコラム。（ダミー）', cta:'記事を読む →' },
  { type:'event',   icon:'📅', label:'イベント', date:'2026.06.05', title:'出版記念トークイベント（大阪）', body:'宮慶優子・吉原史郎の両著者が揃って登壇した出版記念イベントのレポート。（ダミー）', cta:'レポートを見る →' },
];

// ── イラスト ─────────────────────────────────────────
function illustImg(extra='') {
  return `<img src="${ILLUST}" alt="本書イラスト" class="hero-illust ${extra}"
       onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"><div class="hero-illust-ph" style="display:none;align-items:center;justify-content:center;background:#f0e8d8;aspect-ratio:4/3;border-radius:4px;color:#aaa;font-size:.78rem;text-align:center;padding:1rem">illust-book.png<br>（表紙最終版・差し替え予定）</div>`;
}

// 表紙のカラフル花モチーフを表現する CSS-only アクセント
// 装飾なので画像は使わない。表紙の世界観を匂わせる装飾。
function flowerDot(color, size=6) {
  return `<span class="flower-dot" style="--c:${color};--s:${size}px"></span>`;
}

// 表紙の中央花のような小さなコンステレーション
function bloomCluster() {
  return `<span class="bloom-cluster" aria-hidden="true">
    ${flowerDot('#e0464e', 10)}${flowerDot('#f6c84c', 7)}${flowerDot('#5da5d9', 8)}${flowerDot('#9b5ba6', 6)}${flowerDot('#5fb98a', 7)}
  </span>`;
}

// ── ヒーロー組み立て ──────────────────────────────────
function buildHero(design) {
  const heroQuestion = `
    <div class="main-question">
      <span class="main-question-label">この本が向き合う、根っこの問い</span>
      <p class="main-question-text">${Q}</p>
    </div>`;

  const bookInfo = `
    <div class="main-book">
      <div class="main-book-cover">書影<br><span style="font-size:.5rem">（表紙最終版）</span></div>
      <div class="main-book-meta">
        <h1 class="main-book-title">${TITLE}</h1>
        <p class="main-book-sub">${SUB1}・${SUB2}</p>
        <p class="main-book-authors">${AUTHORS_DATA.map(a=>`<span>${a.name}</span>`).join('・')} 著　｜　${PUBLISHER}　｜　2026年 刊行予定</p>
        <a href="#chapters" class="main-book-link">本書の内容を見る ↓</a>
      </div>
    </div>`;

  const philosophy = `<div class="main-philosophy">${PHILOSOPHY_HTML}</div>`;
  const tagline    = `<p class="hero-tagline">${TAGLINE}</p>`;

  if (design.heroLayout === 'cover-faithful') {
    // A: 表紙準拠 — 中央に問い→花クラスター→イラスト→タグライン
    return `
<section id="top" class="main-section">
  <div class="main-inner hero-centered">
    ${heroQuestion}
    ${bloomCluster()}
    <figure class="hero-illust-fig hero-feature">
      ${illustImg()}
    </figure>
    ${tagline}
    <div class="main-divider"></div>
    ${philosophy}
    ${bookInfo}
  </div>
</section>`;
  }

  if (design.heroLayout === 'right-illust') {
    // C: 温炉ベース — 左に問い+哲学、右にイラスト
    return `
<section id="top" class="main-section">
  <div class="main-inner hero-2col">
    <div class="hero-left">
      ${heroQuestion}
      ${tagline}
      <div class="main-divider"></div>
      ${philosophy}
    </div>
    <aside class="hero-right">
      <figure class="hero-illust-fig">
        ${illustImg()}
        <figcaption>本書イラスト（差し替え予定）</figcaption>
      </figure>
      ${bloomCluster()}
    </aside>
  </div>
  <div class="main-inner">${bookInfo}</div>
</section>`;
  }

  if (design.heroLayout === 'editorial') {
    // B: 編集赤花 — 大判ヘッドライン的タイポ、白×赤花
    return `
<section id="top" class="main-section">
  <div class="main-inner">
    <div class="hero-editorial">
      <span class="hero-kicker">この本が向き合う、根っこの問い ${flowerDot('#e0464e',8)}</span>
      <h1 class="hero-editorial-q">${Q}</h1>
      <p class="hero-editorial-tag">${TAGLINE}</p>
    </div>
    <figure class="hero-illust-fig hero-top">
      ${illustImg()}
    </figure>
    <div class="main-divider"></div>
    ${philosophy}
    ${bookInfo}
  </div>
</section>`;
  }

  if (design.heroLayout === 'dark-premium') {
    // D: 紺×ゴールド花 — 大判フィーチャー＋プレミアム
    return `
<section id="top" class="main-section">
  <div class="main-inner">
    ${heroQuestion}
    ${tagline}
    <figure class="hero-illust-fig hero-feature framed">
      ${illustImg()}
      <figcaption>${bloomCluster()} 人とのつながりから、熱量は生まれる。</figcaption>
    </figure>
    <div class="main-divider"></div>
    ${philosophy}
    ${bookInfo}
  </div>
</section>`;
  }

  // E: 和紙×墨 — 縦書きアクセント + 口絵的イラスト
  return `
<section id="top" class="main-section">
  <div class="main-inner hero-washi">
    <aside class="washi-vertical">
      <span class="washi-label">問</span>
      <p class="washi-q">${Q.replace('？','')}</p>
    </aside>
    <div class="washi-main">
      <p class="washi-tagline">${TAGLINE}</p>
      <figure class="hero-illust-fig kuchie">
        <span class="kuchie-label">口　絵</span>
        ${illustImg()}
      </figure>
      ${bloomCluster()}
      <div class="main-divider"></div>
      ${philosophy}
      ${bookInfo}
    </div>
  </div>
</section>`;
}

// ── ページ全体組み立て ─────────────────────────────────
function buildPage(design) {
  const heroHTML = buildHero(design);

  const chaptersHTML = CHAPTERS.map((c,i)=>`
    <div class="chapter-item">
      <div class="chapter-video">
        <div class="play-icon"></div>
        <span>動画プレースホルダー</span>
      </div>
      <div class="chapter-text">
        <p class="chapter-num">${c.num} ${i>0?flowerDot(design.colors.flowerAccent,5):''}</p>
        <h2 class="chapter-title">${c.title}</h2>
        <p class="chapter-body">${c.body}</p>
        <a href="#" class="chapter-link">詳しく見る →</a>
      </div>
    </div>`).join('');

  const ch6HTML = `
    <div class="chapter-item">
      <div class="chapter-video">
        <div class="play-icon"></div>
        <span>動画プレースホルダー</span>
      </div>
      <div class="chapter-text">
        <p class="chapter-num">${CH6.num} ${flowerDot(design.colors.flowerAccent,5)}</p>
        <h2 class="chapter-title">${CH6.title}</h2>
        <p class="chapter-body">${CH6.body}</p>
        <a href="#" class="chapter-link">詳しく見る →</a>
      </div>
    </div>`;

  const endorsersHTML = ENDORSERS.map(e=>`
      <div class="endorser-card">
        <div class="endorser-photo">写真</div>
        <div>
          <p class="endorser-name">${e.name}</p>
          <p class="endorser-title">${e.title}</p>
          <p class="endorser-theme">${e.theme}</p>
        </div>
      </div>`).join('');

  const authorsHTML = AUTHORS_DATA.map(a=>`
      <div class="author-card">
        <div class="author-photo">写真</div>
        <div>
          <h3 class="author-name">${a.name}</h3>
          <p class="author-title">${a.title}</p>
          <p class="author-bio">${a.bio}</p>
        </div>
      </div>`).join('');

  const practiceHTML = PRACTICE_COMPANIES.map(c=>`
      <div class="practice-item">
        <p class="practice-name">${c.name}</p>
        <p class="practice-tag">${c.tag}</p>
      </div>`).join('');

  const postCardsHTML = POST_CARDS.map(p=>`
      <div class="post-card">
        <span class="post-card-type ${p.type}">${p.icon} ${p.label}</span>
        <span class="post-card-date">${p.date}</span>
        <h3 class="post-card-title">${p.title}</h3>
        <p class="post-card-body">${p.body}</p>
        <a href="#" class="post-card-link">${p.cta}</a>
      </div>`).join('');

  const D = design;

  return `<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${TITLE}｜${AUTHORS}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@300;400;600;700;900&family=Noto+Sans+JP:wght@300;400;500;700;900&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root{
  --bg:${D.colors.bg};
  --bg2:${D.colors.bg2};
  --ink:${D.colors.ink};
  --ink2:${D.colors.ink2};
  --ink3:${D.colors.ink3};
  --accent:${D.colors.accent};
  --accent2:${D.colors.accent2};
  --rule:${D.colors.rule};
  --w:880px;
}
html{scroll-behavior:smooth}
body{font-family:'Noto Sans JP',sans-serif;background:var(--bg);color:var(--ink);font-size:16px;line-height:1.85}
img{max-width:100%;display:block}

/* 花アクセント（CSS-only） */
.flower-dot{display:inline-block;width:var(--s);height:var(--s);border-radius:50%;background:var(--c);vertical-align:middle;margin:0 .1em}
.bloom-cluster{display:inline-flex;gap:.35rem;align-items:center;padding:.5rem 0;margin:1rem 0}

/* NAV */
nav{position:sticky;top:0;z-index:100;background:${D.colors.navBg};backdrop-filter:blur(8px);border-bottom:1px solid var(--rule);padding:.75rem 2rem}
.nav-inner{max-width:var(--w);margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:1rem;flex-wrap:wrap}
.nav-title{font-family:'Noto Serif JP',serif;font-size:.85rem;font-weight:700;color:${D.colors.navInk};white-space:nowrap}
.nav-links{display:flex;gap:1.25rem;flex-wrap:wrap}
.nav-links a{font-size:.72rem;color:${D.colors.navInk2};text-decoration:none;letter-spacing:.05em;white-space:nowrap;transition:color .2s}
.nav-links a:hover{color:var(--accent)}
.nav-cta{font-size:.72rem;padding:.4rem 1rem;background:${D.colors.navCtaBg};color:${D.colors.navCtaInk};border-radius:${D.shape.radius};text-decoration:none;white-space:nowrap;letter-spacing:.05em;transition:opacity .2s}
.nav-cta:hover{opacity:.85}

/* MAIN */
.main-section{padding:5rem 2rem 4.5rem;border-bottom:1px solid var(--rule);position:relative;${D.heroBg||''}}
.main-inner{max-width:var(--w);margin:0 auto;position:relative;z-index:1}
.main-question{margin-bottom:1.5rem}
.main-question-label{font-size:.68rem;letter-spacing:.35em;color:var(--accent);margin-bottom:1.25rem;display:block}
.main-question-text{font-family:'Noto Serif JP',serif;font-size:clamp(2.1rem,5.2vw,3.4rem);font-weight:900;line-height:1.4;color:var(--ink);letter-spacing:.02em}
${D.questionExtra||''}
.hero-tagline{font-family:'Noto Serif JP',serif;font-size:clamp(1rem,1.8vw,1.2rem);font-weight:600;line-height:1.8;color:var(--accent);margin:1.5rem 0 2rem;letter-spacing:.04em}
.main-divider{width:48px;height:2px;background:var(--accent);margin:2.5rem 0;border-radius:1px}
.main-philosophy{max-width:620px}
.main-philosophy p{font-size:1rem;line-height:2.1;color:var(--ink2);margin-bottom:1.15rem}
.main-philosophy p:last-child{margin-bottom:0}
.main-philosophy strong{color:var(--ink);font-weight:700;border-bottom:2px solid var(--accent2);padding-bottom:1px}
.main-book{margin-top:3.5rem;padding-top:2.5rem;border-top:1px solid var(--rule);display:flex;align-items:center;gap:2rem}
.main-book-cover{width:80px;flex-shrink:0;aspect-ratio:3/4;background:linear-gradient(150deg,${D.colors.bookCover1},${D.colors.bookCover2});border-radius:3px;display:flex;flex-direction:column;align-items:center;justify-content:center;font-size:.6rem;color:#fff;letter-spacing:.05em;box-shadow:2px 3px 12px rgba(0,0,0,.12);text-align:center;padding:.4rem;font-weight:700}
.main-book-meta{display:flex;flex-direction:column;gap:.3rem;flex:1}
.main-book-title{font-family:'Noto Serif JP',serif;font-size:1.05rem;font-weight:900;color:var(--ink);line-height:1.5}
.main-book-sub{font-size:.75rem;color:var(--ink3)}
.main-book-authors{font-size:.78rem;color:var(--ink2);line-height:1.7}
.main-book-authors span{font-weight:700;color:var(--ink)}
.main-book-link{margin-top:.3rem;font-size:.78rem;color:var(--accent);text-decoration:none;letter-spacing:.05em;display:inline-flex;align-items:center;gap:.3rem;transition:opacity .2s}
.main-book-link:hover{opacity:.7}

/* HERO ILLUST */
.hero-illust-fig{margin:0}
.hero-illust-fig figcaption{font-size:.72rem;color:var(--ink3);text-align:center;margin-top:.7rem;letter-spacing:.04em;line-height:1.6}
.hero-illust{width:100%;border-radius:${D.shape.illustRadius};${D.illustEffect||''}}

/* HERO LAYOUTS */
.hero-centered{text-align:center;max-width:760px;margin:0 auto}
.hero-centered .main-question-label{display:block}
.hero-centered .main-philosophy{text-align:left;max-width:580px;margin:0 auto}
.hero-centered .bloom-cluster{justify-content:center}
.hero-centered .hero-tagline{text-align:center}
.hero-centered .main-divider{margin:2.5rem auto}
.hero-centered .main-book{text-align:left}

.hero-2col{display:grid;grid-template-columns:1.1fr .9fr;gap:3rem;align-items:start;padding-top:1rem}
.hero-left{min-width:0}
.hero-right{min-width:0;padding-top:.5rem;display:flex;flex-direction:column;align-items:center;gap:1rem}

.hero-editorial{padding:1rem 0 2rem}
.hero-kicker{display:inline-block;font-size:.7rem;letter-spacing:.3em;color:var(--accent);margin-bottom:1.5rem}
.hero-editorial-q{font-family:'Noto Serif JP',serif;font-size:clamp(2.2rem,5.5vw,3.6rem);font-weight:900;line-height:1.35;color:var(--ink);margin-bottom:1.5rem;letter-spacing:.01em}
.hero-editorial-tag{font-family:'Noto Serif JP',serif;font-size:1.1rem;color:var(--accent);line-height:1.8;font-weight:600}

.hero-top{max-width:580px;margin:0 auto 3rem}

.hero-feature{margin:3rem 0;max-width:780px}
.hero-feature .hero-illust{box-shadow:${D.shape.illustShadow}}
.hero-feature.framed{position:relative;padding:1rem;background:#fff;border-radius:6px;box-shadow:0 8px 40px rgba(0,0,0,.12)}
.hero-feature.framed::before{content:'';position:absolute;inset:-14px;border:1px solid var(--accent);border-radius:8px;opacity:.4;pointer-events:none}
.hero-feature figcaption{padding:.8rem 0 .2rem;color:var(--ink2)}

/* 和紙レイアウト */
.hero-washi{display:grid;grid-template-columns:auto 1fr;gap:3rem;align-items:start;padding-top:1rem}
.washi-vertical{display:flex;flex-direction:column;align-items:center;gap:1.5rem;padding-top:.5rem}
.washi-label{font-family:'Noto Serif JP',serif;font-size:.85rem;letter-spacing:.3em;color:var(--accent);writing-mode:vertical-rl;border-right:1.5px solid var(--accent);padding-right:.4rem}
.washi-q{font-family:'Noto Serif JP',serif;writing-mode:vertical-rl;font-size:clamp(1.6rem,3vw,2.4rem);font-weight:900;line-height:1.7;letter-spacing:.12em;color:var(--ink);min-height:380px}
.washi-main{min-width:0}
.washi-tagline{font-family:'Noto Serif JP',serif;font-size:clamp(1rem,1.6vw,1.18rem);color:var(--accent);line-height:1.9;margin-bottom:2rem;font-weight:700}
.kuchie{border:1px solid var(--accent);background:#fff;padding:1rem;box-shadow:0 2px 18px rgba(0,0,0,.08);margin-bottom:1rem}
.kuchie .kuchie-label{display:block;font-size:.65rem;letter-spacing:.25em;color:var(--accent);margin-bottom:.6rem}

/* SECTION COMMON */
.section{padding:4rem 2rem;border-top:1px solid var(--rule);position:relative}
.section-inner{max-width:var(--w);margin:0 auto}
.section-eyebrow{font-size:.68rem;letter-spacing:.35em;color:var(--accent);margin-bottom:.5rem}
.section-title{font-family:'Noto Serif JP',serif;font-size:clamp(1.4rem,2.6vw,2rem);font-weight:900;line-height:1.4;margin-bottom:2.5rem;display:flex;align-items:center;gap:1rem;flex-wrap:wrap}
.section-title .bloom-cluster{margin:0}

/* CHAPTERS */
.chapters{padding:3rem 2rem;border-top:1px solid var(--rule)}
.chapters-inner{max-width:var(--w);margin:0 auto}
.chapters-heading{font-family:'Noto Serif JP',serif;font-size:1.15rem;font-weight:700;color:var(--ink2);margin-bottom:2.5rem;padding-bottom:1rem;border-bottom:1px solid var(--rule);letter-spacing:.1em;display:flex;align-items:center;gap:.8rem}
.chapter-item{display:grid;grid-template-columns:1fr 1fr;gap:2.5rem;align-items:start;padding:2.5rem 0;border-bottom:1px solid var(--rule)}
.chapter-item:last-child{border-bottom:none}
.chapter-video{background:${D.colors.videoBg};aspect-ratio:16/9;border-radius:${D.shape.radius};display:flex;align-items:center;justify-content:center;flex-direction:column;gap:.75rem;color:var(--ink3);font-size:.75rem}
.play-icon{width:46px;height:46px;border-radius:50%;background:rgba(255,255,255,.7);display:flex;align-items:center;justify-content:center}
.play-icon::after{content:'';border-style:solid;border-width:9px 0 9px 16px;border-color:transparent transparent transparent var(--ink2);margin-left:3px}
.chapter-num{font-size:.65rem;letter-spacing:.3em;color:var(--accent);margin-bottom:.45rem;display:flex;align-items:center;gap:.5rem}
.chapter-title{font-family:'Noto Serif JP',serif;font-size:1.1rem;font-weight:900;line-height:1.5;margin-bottom:.75rem}
.chapter-body{font-size:.88rem;line-height:1.95;color:var(--ink2)}
.chapter-link{display:inline-block;margin-top:.85rem;font-size:.75rem;color:var(--accent);text-decoration:none;border-bottom:1px solid var(--accent2);transition:color .2s}
.chapter-link:hover{color:var(--ink)}

/* ENDORSERS */
.endorsers-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.8rem 1.5rem}
.endorser-card{display:flex;gap:1rem;align-items:flex-start}
.endorser-photo{width:54px;height:54px;border-radius:50%;background:${D.colors.photoBg};flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:.55rem;color:var(--ink3)}
.endorser-name{font-size:.95rem;font-weight:700;margin-bottom:.2rem}
.endorser-title{font-size:.72rem;color:var(--ink2);line-height:1.6}
.endorser-theme{font-size:.74rem;color:var(--accent);margin-top:.4rem;font-style:italic;line-height:1.5}

/* AUTHORS */
.authors-grid{display:grid;grid-template-columns:1fr 1fr;gap:3rem}
.author-card{display:flex;gap:1.5rem;align-items:flex-start}
.author-photo{width:80px;height:80px;border-radius:50%;background:${D.colors.photoBg};flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:.65rem;color:var(--ink3)}
.author-name{font-family:'Noto Serif JP',serif;font-size:1.15rem;font-weight:900;margin-bottom:.25rem}
.author-title{font-size:.75rem;color:var(--accent);margin-bottom:.6rem}
.author-bio{font-size:.82rem;line-height:1.95;color:var(--ink2)}

/* PRACTICE COMPANIES */
.practice-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem 1.5rem}
.practice-item{padding:1rem 1.2rem;background:${D.colors.practiceBg};border-radius:${D.shape.radius};border-left:3px solid var(--accent)}
.practice-name{font-family:'Noto Serif JP',serif;font-size:.92rem;font-weight:700;line-height:1.5;margin-bottom:.3rem}
.practice-tag{font-size:.7rem;color:var(--accent);letter-spacing:.05em}

/* CTA */
.cta-section{background:var(--bg2);padding:5rem 2rem;text-align:center;border-top:1px solid var(--rule);position:relative}
.cta-inner{max-width:560px;margin:0 auto;position:relative;z-index:1}
.cta-title{font-family:'Noto Serif JP',serif;font-size:clamp(1.4rem,3.2vw,2.1rem);font-weight:900;line-height:1.55;margin-bottom:1.2rem;color:var(--ink)}
.cta-body{font-size:.9rem;color:var(--ink2);line-height:1.95;margin-bottom:2rem}
.cta-btn{display:inline-block;padding:1rem 3.2rem;background:${D.colors.btnBg};color:${D.colors.btnInk};font-weight:900;font-size:1rem;border-radius:${D.shape.btnRadius};text-decoration:none;letter-spacing:.05em;transition:opacity .2s}
.cta-btn:hover{opacity:.85}
.cta-sub{font-size:.75rem;color:var(--ink3);margin-top:.85rem}

/* POST READING */
.post-reading{padding:4rem 2rem;border-top:1px solid var(--rule);background:var(--bg)}
.post-inner{max-width:var(--w);margin:0 auto}
.post-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:1.25rem;margin-bottom:1.25rem}
.post-card{border:1px solid var(--rule);border-radius:${D.shape.radius};padding:1.4rem;background:#fff;display:flex;flex-direction:column;gap:.5rem;transition:border-color .2s,box-shadow .2s}
.post-card:hover{border-color:var(--accent);box-shadow:0 2px 12px rgba(0,0,0,.06)}
.post-card-type{display:inline-flex;align-items:center;gap:.4rem;font-size:.65rem;letter-spacing:.15em;font-weight:700;padding:.2rem .7rem;border-radius:50px;width:fit-content}
.post-card-type.event{background:${D.colors.eventBg};color:${D.colors.eventInk}}
.post-card-type.article{background:${D.colors.articleBg};color:${D.colors.articleInk}}
.post-card-date{font-size:.72rem;color:var(--ink3)}
.post-card-title{font-family:'Noto Serif JP',serif;font-size:.95rem;font-weight:700;line-height:1.5;color:var(--ink)}
.post-card-body{font-size:.78rem;line-height:1.85;color:var(--ink2);flex:1}
.post-card-link{font-size:.75rem;color:var(--accent);text-decoration:none;border-bottom:1px solid var(--accent2);width:fit-content;transition:color .2s;margin-top:.25rem}
.post-more{text-align:right;margin-bottom:2.5rem}
.post-more a{font-size:.8rem;color:var(--ink2);text-decoration:none;border-bottom:1px solid var(--rule)}
.post-mail{background:var(--bg2);border-radius:${D.shape.cardRadius};padding:2rem 2.5rem;display:grid;grid-template-columns:1fr 1fr;gap:2rem;align-items:center}
.post-mail-title{font-family:'Noto Serif JP',serif;font-size:1.1rem;font-weight:900;margin-bottom:.5rem}
.post-mail-body{font-size:.82rem;line-height:1.85;color:var(--ink2)}
.form-row{display:flex;gap:.5rem;margin-bottom:.5rem}
.form-input{flex:1;padding:.7rem .9rem;border:1px solid var(--rule);border-radius:3px;background:#fff;font-size:.82rem;font-family:'Noto Sans JP',sans-serif;color:var(--ink)}
.form-submit{padding:.7rem 1.4rem;background:var(--ink);color:#fff;border:none;border-radius:3px;font-size:.82rem;cursor:pointer;white-space:nowrap;font-weight:700}
.form-note{font-size:.68rem;color:var(--ink3);line-height:1.7}

/* FOOTER */
footer{background:${D.colors.footerBg};color:${D.colors.footerInk};padding:2rem;text-align:center;font-size:.75rem;line-height:2}
footer a{color:inherit}

/* RESPONSIVE */
@media(max-width:760px){
  .main-question-text,.hero-editorial-q{font-size:clamp(1.7rem,6.5vw,2.4rem)}
  .main-book{flex-direction:column;align-items:flex-start;gap:1rem}
  .hero-2col,.hero-washi{grid-template-columns:1fr;gap:2rem}
  .washi-q{writing-mode:horizontal-tb;min-height:auto;font-size:1.6rem}
  .washi-label{writing-mode:horizontal-tb;border-right:none;border-bottom:1.5px solid var(--accent);padding:0 0 .3rem}
  .chapter-item{grid-template-columns:1fr}
  .endorsers-grid,.practice-grid{grid-template-columns:1fr 1fr}
  .authors-grid{grid-template-columns:1fr}
  .post-cards{grid-template-columns:1fr}
  .post-mail{grid-template-columns:1fr}
  .nav-links{display:none}
}
@media(max-width:480px){
  .endorsers-grid,.practice-grid{grid-template-columns:1fr}
}
${D.extraCSS||''}
</style>
</head>
<body>

<nav>
  <div class="nav-inner">
    <span class="nav-title">${TITLE}</span>
    <div class="nav-links">
      <a href="#chapters">本書の内容</a>
      <a href="#endorsers">対談コラム</a>
      <a href="#authors">著者紹介</a>
      <a href="#practice">実践企業</a>
      <a href="#amazon">購入</a>
    </div>
    <a href="#amazon" class="nav-cta">Amazonで購入</a>
  </div>
</nav>

${heroHTML}

<section id="chapters" class="chapters">
  <div class="chapters-inner">
    <p class="chapters-heading">— 本書の内容 — ${bloomCluster()}</p>
    ${chaptersHTML}
    ${ch6HTML}
  </div>
</section>

<section id="endorsers" class="section" style="background:var(--bg2)">
  <div class="section-inner">
    <p class="section-eyebrow">SPECIAL CONTRIBUTORS</p>
    <h2 class="section-title">豪華対談コラム執筆者 ${bloomCluster()}</h2>
    <p style="font-size:.92rem;color:var(--ink2);margin-bottom:2.5rem;max-width:640px;line-height:1.95">本書では5名の対談コラムを通じて、それぞれの専門領域から「人生の熱量」と組織を多角的に学んでいきます。</p>
    <div class="endorsers-grid">${endorsersHTML}</div>
  </div>
</section>

<section id="authors" class="section">
  <div class="section-inner">
    <p class="section-eyebrow">AUTHORS</p>
    <h2 class="section-title">著者紹介</h2>
    <div class="authors-grid">${authorsHTML}</div>
  </div>
</section>

<section id="practice" class="section" style="background:var(--bg2)">
  <div class="section-inner">
    <p class="section-eyebrow">PRACTICE</p>
    <h2 class="section-title">第5章 実践企業の皆さま</h2>
    <p style="font-size:.92rem;color:var(--ink2);margin-bottom:2.5rem;max-width:640px;line-height:1.95">「人とのつながり」から「人生の熱量」が湧きあがり、財務的成果とも共存している組織の具体的な姿を、6社の実践ストーリーからお伝えします。</p>
    <div class="practice-grid">${practiceHTML}</div>
  </div>
</section>

<section id="amazon" class="cta-section">
  <div class="cta-inner">
    <h2 class="cta-title">人とのつながりから、<br>熱量を取りもどす。</h2>
    <p class="cta-body">経営陣・ミドルマネジャー自身が、自分の「人生の熱量」から始めていける——<br>そのことを、できるだけシンプルに、具体的にお伝えしていく一冊。</p>
    <a href="#" class="cta-btn">Amazonで購入する</a>
    <p class="cta-sub">電子書籍・書店でも発売予定　｜　${PUBLISHER}</p>
  </div>
</section>

<section id="post-reading" class="post-reading">
  <div class="post-inner">
    <p class="section-eyebrow">AFTER READING</p>
    <h2 class="section-title">読んだ後も、つながり続けよう</h2>
    <div class="post-cards">${postCardsHTML}</div>
    <div class="post-more"><a href="#">イベント・記事をすべて見る →</a></div>
    <div class="post-mail">
      <div class="post-mail-text">
        <h3 class="post-mail-title">新着情報をメールで受け取る</h3>
        <p class="post-mail-body">イベント開催のお知らせ、著者による新着コラム、関連情報などを不定期でお届けします。</p>
      </div>
      <div class="post-mail-form">
        <div class="form-row"><input class="form-input" type="text" placeholder="お名前"></div>
        <div class="form-row"><input class="form-input" type="email" placeholder="メールアドレス"><button class="form-submit">登録</button></div>
        <p class="form-note">※ プライバシーポリシーに同意の上でご登録ください。<br>このフォームはモックアップです。</p>
      </div>
    </div>
  </div>
</section>

<footer>
  <p>${TITLE}　著：${AUTHORS}　／　${PUBLISHER}</p>
  <p style="margin-top:.4rem">© 2026 All rights reserved.　｜　<a href="#">プライバシーポリシー</a></p>
</footer>

</body>
</html>`;
}

function makeFile(filename, design) {
  const html = buildPage(design);
  fs.writeFileSync(filename, html, 'utf8');
  const kb = (fs.statSync(filename).size/1024).toFixed(1);
  console.log(`✓ ${filename}  (${kb} KB)`);
}

// ════════════════════════════════════════════════════════
// 5案 — 表紙世界観（淡黄×カラフル花）を様々な度合いで展開
// ════════════════════════════════════════════════════════

// A: 表紙準拠 — 淡黄背景＋カラフル花、表紙の世界観をストレートに展開
makeFile('lp-book-23-cover.html', {
  heroLayout:'cover-faithful',
  colors:{
    bg:'#fdf6dc', bg2:'#f6ecbe',
    ink:'#1a1408', ink2:'#4a3e22', ink3:'#8c7e58',
    accent:'#c4351c', accent2:'#f6c84c',
    rule:'#e8dcb0', flowerAccent:'#e0464e',
    navBg:'rgba(253,246,220,.95)', navInk:'#1a1408', navInk2:'#4a3e22',
    navCtaBg:'#1a1408', navCtaInk:'#fdf6dc',
    videoBg:'#ece1b0', photoBg:'#e0d4a8',
    practiceBg:'rgba(255,255,255,.55)',
    eventBg:'rgba(246,200,76,.25)', eventInk:'#a07414',
    articleBg:'rgba(196,53,28,.12)', articleInk:'#c4351c',
    btnBg:'#c4351c', btnInk:'#fff',
    bookCover1:'#fdf6dc', bookCover2:'#f6c84c',
    footerBg:'#1a1408', footerInk:'rgba(253,246,220,.5)',
  },
  shape:{ radius:'4px', illustRadius:'4px', illustShadow:'0 6px 30px rgba(80,60,10,.15)', btnRadius:'4px', cardRadius:'6px' },
  heroBg:`background:linear-gradient(170deg,#fdf6dc 0%,#fbeec0 100%);`,
  extraCSS:`
.main-section::before{
  content:'';position:absolute;top:10%;right:-2%;width:140px;height:140px;
  background:radial-gradient(circle at 30% 30%,rgba(224,70,78,.15),transparent 70%),
             radial-gradient(circle at 70% 60%,rgba(246,200,76,.2),transparent 70%);
  border-radius:50%;pointer-events:none;
}
.main-section::after{
  content:'';position:absolute;bottom:8%;left:-3%;width:120px;height:120px;
  background:radial-gradient(circle at 50% 50%,rgba(93,165,217,.12),transparent 70%);
  border-radius:50%;pointer-events:none;
}
`,
});

// B: 編集赤花 — 白ベース＋赤メインのアクセント花、洗練と編集力
makeFile('lp-book-24-editorial.html', {
  heroLayout:'editorial',
  colors:{
    bg:'#fdfbf6', bg2:'#f6efe0',
    ink:'#0b0805', ink2:'#3a2f24', ink3:'#8a8074',
    accent:'#c4351c', accent2:'#e8836e',
    rule:'#e8e0cc', flowerAccent:'#c4351c',
    navBg:'rgba(253,251,246,.96)', navInk:'#0b0805', navInk2:'#3a2f24',
    navCtaBg:'#c4351c', navCtaInk:'#fff',
    videoBg:'#ede4cf', photoBg:'#e2d6bc',
    practiceBg:'#fff',
    eventBg:'rgba(196,53,28,.1)', eventInk:'#c4351c',
    articleBg:'rgba(40,40,40,.08)', articleInk:'#3a2f24',
    btnBg:'#c4351c', btnInk:'#fff',
    bookCover1:'#fdfbf6', bookCover2:'#c4351c',
    footerBg:'#0b0805', footerInk:'rgba(253,251,246,.5)',
  },
  shape:{ radius:'2px', illustRadius:'2px', illustShadow:'0 3px 20px rgba(0,0,0,.08)', btnRadius:'2px', cardRadius:'4px' },
});

// C: 温炉×多色花 — モックアップの温かみベース＋表紙の色彩を控えめに足す
makeFile('lp-book-25-warm-bloom.html', {
  heroLayout:'right-illust',
  colors:{
    bg:'#faf6ee', bg2:'#f1ebdc',
    ink:'#1a1612', ink2:'#4a4238', ink3:'#8a8478',
    accent:'#8b6914', accent2:'#c9a84c',
    rule:'#e4ddcc', flowerAccent:'#e0464e',
    navBg:'rgba(250,246,238,.95)', navInk:'#1a1612', navInk2:'#4a4238',
    navCtaBg:'#1a1612', navCtaInk:'#faf6ee',
    videoBg:'#e0d8c4', photoBg:'#ddd4be',
    practiceBg:'#fff',
    eventBg:'rgba(139,105,20,.12)', eventInk:'#8b6914',
    articleBg:'rgba(45,90,61,.1)', articleInk:'#2d5a3d',
    btnBg:'#f90', btnInk:'#111',
    bookCover1:'#fdf6dc', bookCover2:'#c9a84c',
    footerBg:'#1a1612', footerInk:'rgba(250,246,238,.5)',
  },
  shape:{ radius:'3px', illustRadius:'4px', illustShadow:'0 4px 24px rgba(60,40,10,.12)', btnRadius:'4px', cardRadius:'6px' },
});

// D: 紺×ゴールド花 — 上質・プレミアム、対談コラムを際立たせる
makeFile('lp-book-26-premium.html', {
  heroLayout:'dark-premium',
  colors:{
    bg:'#fbf8f0', bg2:'#0e1830',
    ink:'#0a0e1a', ink2:'#2a2e3e', ink3:'#8088a0',
    accent:'#b8902c', accent2:'#e0c478',
    rule:'#dcd4be', flowerAccent:'#b8902c',
    navBg:'rgba(14,24,48,.96)', navInk:'#fbf8f0', navInk2:'rgba(251,248,240,.7)',
    navCtaBg:'#b8902c', navCtaInk:'#0a0e1a',
    videoBg:'#dcd2b6', photoBg:'#cec4a4',
    practiceBg:'#fff',
    eventBg:'rgba(184,144,44,.15)', eventInk:'#8a6818',
    articleBg:'rgba(14,24,48,.08)', articleInk:'#0e1830',
    btnBg:'#b8902c', btnInk:'#fff',
    bookCover1:'#0e1830', bookCover2:'#b8902c',
    footerBg:'#0a0e1a', footerInk:'rgba(251,248,240,.45)',
  },
  shape:{ radius:'3px', illustRadius:'4px', illustShadow:'0 10px 40px rgba(0,0,0,.18)', btnRadius:'3px', cardRadius:'6px' },
  extraCSS:`
.section-title{letter-spacing:-.005em}
#endorsers{background:#0e1830 !important;color:#fbf8f0}
#endorsers .section-eyebrow{color:#e0c478}
#endorsers .section-title{color:#fbf8f0}
#endorsers .endorser-name{color:#fbf8f0}
#endorsers .endorser-title{color:rgba(251,248,240,.7)}
#endorsers .endorser-theme{color:#e0c478}
#endorsers .endorser-photo{background:rgba(251,248,240,.12);color:rgba(251,248,240,.5)}
#endorsers p[style]{color:rgba(251,248,240,.75) !important}
`,
});

// E: 和紙×墨×淡花 — 縦書きアクセント＋静謐な和の世界観
makeFile('lp-book-27-washi.html', {
  heroLayout:'washi-vertical',
  colors:{
    bg:'#fbf6e6', bg2:'#f0e8c8',
    ink:'#0a0806', ink2:'#3a322a', ink3:'#8a8074',
    accent:'#7a1818', accent2:'#c89030',
    rule:'#dcd2b4', flowerAccent:'#7a1818',
    navBg:'rgba(251,246,230,.95)', navInk:'#0a0806', navInk2:'#3a322a',
    navCtaBg:'#7a1818', navCtaInk:'#fbf6e6',
    videoBg:'#e5dbb8', photoBg:'#d8cdab',
    practiceBg:'#fff',
    eventBg:'rgba(200,144,48,.16)', eventInk:'#8a6014',
    articleBg:'rgba(122,24,24,.1)', articleInk:'#7a1818',
    btnBg:'#7a1818', btnInk:'#fff',
    bookCover1:'#fbf6e6', bookCover2:'#7a1818',
    footerBg:'#0a0806', footerInk:'rgba(251,246,230,.5)',
  },
  shape:{ radius:'2px', illustRadius:'2px', illustShadow:'0 2px 18px rgba(0,0,0,.1)', btnRadius:'2px', cardRadius:'3px' },
  extraCSS:`
.main-section{padding:5rem 2rem 4rem}
/* 和紙の質感 */
body{background:
  radial-gradient(circle at 20% 30%,rgba(255,250,230,.5) 0%,transparent 50%),
  radial-gradient(circle at 80% 70%,rgba(248,234,200,.4) 0%,transparent 50%),
  var(--bg);
  background-attachment:fixed;
}
`,
});

console.log(`
✅ 書籍LP v7（原稿準拠・5案）を生成しました

   表紙の世界観（淡黄×カラフル花）をLPに展開する5バリエーション。
   全案、文言・章タイトル・対談コラム5名は原稿準拠に統一。

   A: 表紙準拠         → lp-book-23-cover.html          淡黄背景+カラフル花、中央集約ヒーロー
   B: 編集赤花         → lp-book-24-editorial.html      白×赤、編集的タイポ大判
   C: 温炉×多色花      → lp-book-25-warm-bloom.html     既存の温炉+表紙のアクセント
   D: 紺×ゴールド花    → lp-book-26-premium.html        プレミアム・対談コラムをダーク反転
   E: 和紙×墨×淡花    → lp-book-27-washi.html          縦書きアクセント+静謐な和

   ※ 共通の更新：
     - 問い：「なぜ、組織は枯れていくのか？」（×働く人の熱量）
     - タグライン「人とのつながりから熱量を取りもどし、再び組織がまわりはじめる」
     - 章タイトル原稿準拠（第3章「枯渇していく人生の熱量の背景」等）
     - 5名の対談コラムを正確に反映
     - Adecco調査「7割が形だけ業務」を引用追加
     - 実践企業6社を独立セクション化
     - 出版社（日本能率協会マネジメントセンター）追記
`);
