// generate-book-v6.js
// モックアップ(lp-book-mockup-v1.html)の構造はそのまま尊重し、
// デザイン処理（色・タイポ・イラスト配置）だけでバリエーションをつくる。

const fs = require('fs');

const ILLUST = 'illust-book.png';

// ── 共通データ（モックアップから抜粋・継承） ───────────────
const CHAPTERS = [
  { num:'INTRODUCTION', title:'はじめに', body:'人生にも、職場にも、組織にも、わたし達一人ひとりの「人生の熱量」が湧きあがり、躍動していてほしい——。本書の根本にある願いと、「マネーバイアス」という問いへの向き合い方を語る。' },
  { num:'CHAPTER 1', title:'組織から熱量が枯渇していく今、<br>本当に必要な変化とは？', body:'「で？」と言われた瞬間、心の糸が切れた。給料は上がったのに、日曜の夜が重い——。組織から熱量が失われる瞬間の実例と、その背後にある「マネーバイアス」の正体に迫る。Gallup調査：仕事に熱意を持つ社員はわずか6%。' },
  { num:'CHAPTER 2', title:'熱量あふれる組織とは？', body:'熱量はお金で買えない。では、どうすれば取り戻せるのか。「人生の熱量」が湧きあがる場、組織に織り込まれる営み、めぐり続ける学びの姿勢——「3つの風穴」から、実践へのヒントを届ける。' },
  { num:'CHAPTER 3', title:'枯渇していく人生の熱量の背景', body:'なぜ、わたし達はお金への思い込みから抜け出せないのか。経済思想の歴史から「マネーバイアス」の社会的・歴史的な根拠を紐解き、「いのちのつながり」という視点へと読者を誘う。' },
  { num:'CHAPTER 4', title:'個人と組織の新たな関係性と<br>「生成の組織」', body:'「ライフでワークを包む」視点が生む、個人の自律と相互依存の共存。森の菌糸ネットワークのように、根っこでつながりあう組織の姿——「生成の組織論（Becoming）」という新たな地平を開く。' },
  { num:'CHAPTER 5', title:'実践企業の皆さまのストーリー', body:'九州電力グループ（人的資本経営最優秀賞受賞）、宮田運輸、丸善雄松堂ほか6社の現場から。「人とのつながり」から熱量が湧きあがり、組織全体へと広がっていく——変化はこうして起きた。' },
];

const ENDORSERS = [
  { name:'堂目 卓生', title:'大阪大学 特任教授', theme:'「お金への思い込み」を歴史から学ぶ' },
  { name:'新井 和宏', title:'武蔵野大学ウェルビーイング学部<br>客員教授', theme:'人生という視点から組織を学ぶ' },
  { name:'矢萩 大輔', title:'有限会社人事・労務', theme:'人生という視点から組織を学ぶ' },
  { name:'四井 真治', title:'パーマカルチャーデザイナー<br>地球再生型生活研究家', theme:'「いのちの仕組み」を学ぶ' },
  { name:'西山 勝',   title:'九州電力<br>代表取締役社長', theme:'これからの企業の可能性' },
  { name:'岩井 睦雄', title:'経済同友会<br>筆頭副代表幹事', theme:'これからの企業の可能性' },
];

const AUTHORS = [
  { name:'吉原 史郎', title:'（肩書きダミー）組織開発コンサルタント・製造業取締役', bio:'倒産したリゾートホテルの再生経営、三菱UFJリサーチ＆コンサルティングでの経営・組織開発コンサルティングを経て、現在は製造業の取締役として経営の現場に立つ。2016年に『ティール組織』原著を日本で初めて要約し渡米。『実務でつかむ！ティール組織（2018年）』著者。（ダミー）' },
  { name:'宮慶 優子', title:'（肩書きダミー）', bio:'大手電力会社の経営企画部での経験をもとに、「なぜ人生の熱量の流れが止まるのか」という問いを抱えて探究を重ねてきた。（ダミーテキスト）' },
];

const RECOMMENDERS = [
  { name:'畑中 義雄', org:'有限会社人事・労務' },
  { name:'推薦者 ダミー', org:'所属・肩書きダミー' },
  { name:'推薦者 ダミー', org:'所属・肩書きダミー' },
  { name:'推薦者 ダミー', org:'所属・肩書きダミー' },
  { name:'推薦者 ダミー', org:'所属・肩書きダミー' },
  { name:'推薦者 ダミー', org:'所属・肩書きダミー' },
];

const POST_CARDS = [
  { type:'event',   icon:'📅', label:'イベント', date:'2026.07.12', title:'「熱量あふれる組織」読者対話会 vol.1', body:'著者・吉原史郎が登壇。本書の問いを参加者とともに深める対話の場。（ダミー）', cta:'詳細・申込 →' },
  { type:'article', icon:'📄', label:'記事',     date:'2026.06.28', title:'なぜ、組織から「熱量」が消えるのか——第1章を深読みする', body:'マネーバイアスが組織に与える影響を、著者自身の言葉でさらに掘り下げたコラム。（ダミー）', cta:'記事を読む →' },
  { type:'event',   icon:'📅', label:'イベント', date:'2026.06.05', title:'出版記念トークイベント（大阪）', body:'宮慶優子・吉原史郎の両著者が揃って登壇した出版記念イベントのレポート。（ダミー）', cta:'レポートを見る →' },
];

// ── イラスト出し分け ─────────────────────────────
function illustImg(extraClass = '') {
  return `<img src="${ILLUST}" alt="人とのつながりのイラスト" class="hero-illust ${extraClass}"
       onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"><div class="hero-illust-ph" style="display:none;align-items:center;justify-content:center;background:#efe9d8;aspect-ratio:4/3;border-radius:4px;color:#aaa;font-size:.78rem">illust-book.png（差し替え予定）</div>`;
}

// ════════════════════════════════════════════════════════
// 共通：全セクションを生成（モックアップ準拠）
// 引数 design でヒーローのレイアウトと一部処理を切り替え
// ════════════════════════════════════════════════════════
function buildHeroHTML(design) {
  const QUESTION_LABEL  = 'この本が向き合う、根っこの問い';
  const QUESTION_TEXT   = 'なぜ、働く人の<br>熱量は枯れていくのだろう。';
  const PHILOSOPHY_HTML = `
    <p>給料は上がった。制度も整えた。<br>それでも、日曜の夜が重い——。</p>
    <p>組織から熱量が失われていく背景には、わたし達が当たり前に信じている<strong>「お金への思い込み（マネーバイアス）」</strong>がある。数字で人を動かそうとするほど、人は内側から萎んでいく。</p>
    <p>この本は、その呪縛からの解放を探る一冊です。<br>人とのつながりから、<strong>熱量を取りもどす</strong>ために。</p>
  `;
  const BOOK_INFO_HTML = `
    <div class="main-book">
      <div class="main-book-cover">書影</div>
      <div class="main-book-meta">
        <h1 class="main-book-title">熱量あふれる組織のつくりかた</h1>
        <p class="main-book-sub">数字の呪縛（お金への思い込み）からの解放</p>
        <p class="main-book-authors"><span>吉原史郎</span>・<span>宮慶優子</span> 著　｜　2026年 刊行予定</p>
        <a href="#chapters" class="main-book-link">本書の内容を見る ↓</a>
      </div>
    </div>
  `;

  // ── デザインごとのヒーロー構造 ───────────────────────
  if (design.heroLayout === 'right-illust') {
    // A: 問い+哲学を左、イラストを右に配置（2カラム）
    return `
<section id="top" class="main-section">
  <div class="main-inner hero-2col">
    <div class="hero-left">
      <div class="main-question">
        <span class="main-question-label">${QUESTION_LABEL}</span>
        <p class="main-question-text">${QUESTION_TEXT}</p>
      </div>
      <div class="main-divider"></div>
      <div class="main-philosophy">${PHILOSOPHY_HTML}</div>
    </div>
    <aside class="hero-right">
      <figure class="hero-illust-fig">
        ${illustImg()}
        <figcaption>本書の世界観（イラスト・差し替え予定）</figcaption>
      </figure>
    </aside>
  </div>
  <div class="main-inner">${BOOK_INFO_HTML}</div>
</section>`;
  }

  if (design.heroLayout === 'top-illust') {
    // B: 上部中央にイラスト → 問い → 哲学
    return `
<section id="top" class="main-section">
  <div class="main-inner">
    <figure class="hero-illust-fig hero-top">
      ${illustImg()}
    </figure>
    <div class="main-question">
      <span class="main-question-label">${QUESTION_LABEL}</span>
      <p class="main-question-text">${QUESTION_TEXT}</p>
    </div>
    <div class="main-divider"></div>
    <div class="main-philosophy">${PHILOSOPHY_HTML}</div>
    ${BOOK_INFO_HTML}
  </div>
</section>`;
  }

  if (design.heroLayout === 'inline-small') {
    // C: 問い → 哲学 → 小ぶりイラスト+書誌情報を横並びに
    return `
<section id="top" class="main-section">
  <div class="main-inner">
    <div class="main-question">
      <span class="main-question-label">${QUESTION_LABEL}</span>
      <p class="main-question-text">${QUESTION_TEXT}</p>
    </div>
    <div class="main-divider"></div>
    <div class="main-philosophy">${PHILOSOPHY_HTML}</div>
    <div class="main-book hero-book-illust">
      <div class="main-book-cover">書影</div>
      <div class="main-book-meta">
        <h1 class="main-book-title">熱量あふれる組織のつくりかた</h1>
        <p class="main-book-sub">数字の呪縛（お金への思い込み）からの解放</p>
        <p class="main-book-authors"><span>吉原史郎</span>・<span>宮慶優子</span> 著　｜　2026年 刊行予定</p>
        <a href="#chapters" class="main-book-link">本書の内容を見る ↓</a>
      </div>
      <figure class="hero-illust-fig hero-inline">
        ${illustImg()}
      </figure>
    </div>
  </div>
</section>`;
  }

  // design.heroLayout === 'feature' (D)
  // D: イラストを大きくフィーチャー（哲学テキストの後に大判で）
  return `
<section id="top" class="main-section">
  <div class="main-inner">
    <div class="main-question">
      <span class="main-question-label">${QUESTION_LABEL}</span>
      <p class="main-question-text">${QUESTION_TEXT}</p>
    </div>
    <div class="main-divider"></div>
    <div class="main-philosophy">${PHILOSOPHY_HTML}</div>
    <figure class="hero-illust-fig hero-feature">
      ${illustImg()}
      <figcaption>人とのつながりから、熱量は生まれる。</figcaption>
    </figure>
    ${BOOK_INFO_HTML}
  </div>
</section>`;
}

function buildPageHTML(design) {
  const heroHTML = buildHeroHTML(design);

  const chaptersHTML = CHAPTERS.map(c => `
    <div class="chapter-item">
      <div class="chapter-video">
        <div class="play-icon"></div>
        <span>動画プレースホルダー</span>
      </div>
      <div class="chapter-text">
        <p class="chapter-num">${c.num}</p>
        <h2 class="chapter-title">${c.title}</h2>
        <p class="chapter-body">${c.body}</p>
        <a href="#" class="chapter-link">詳しく見る →</a>
      </div>
    </div>`).join('');

  const comingChapter = `
    <div class="chapter-item">
      <div class="chapter-coming">
        <p style="font-size:.8rem;color:var(--ink3);margin-bottom:.5rem;letter-spacing:.1em">CHAPTER 6</p>
        <p style="font-family:'Noto Serif JP',serif;font-size:1rem;font-weight:600;margin-bottom:.5rem">実践のためのアクション集</p>
        <p style="font-size:.78rem;color:var(--ink3)">Coming Soon</p>
      </div>
      <div class="chapter-text">
        <p class="chapter-num">CHAPTER 6</p>
        <h2 class="chapter-title">実践のためのアクション集</h2>
        <p class="chapter-body" style="color:var(--ink3)">ライフソース・アート、ライフソース・プリンシプルなど、日々の実践に使えるツールと問いを収録予定。（準備中）</p>
      </div>
    </div>`;

  const endorsersHTML = ENDORSERS.map(e => `
      <div class="endorser-card">
        <div class="endorser-photo">写真</div>
        <div>
          <p class="endorser-name">${e.name}</p>
          <p class="endorser-title">${e.title}</p>
          <p class="endorser-theme">${e.theme}</p>
        </div>
      </div>`).join('');

  const authorsHTML = AUTHORS.map(a => `
      <div class="author-card">
        <div class="author-photo">写真</div>
        <div>
          <h3 class="author-name">${a.name}</h3>
          <p class="author-title">${a.title}</p>
          <p class="author-bio">${a.bio}</p>
        </div>
      </div>`).join('');

  const recommendersHTML = RECOMMENDERS.map(r => `
      <div class="recommender-item">
        <p class="recommender-name">${r.name}</p>
        <p class="recommender-org">${r.org}</p>
      </div>`).join('');

  const postCardsHTML = POST_CARDS.map(p => `
      <div class="post-card">
        <span class="post-card-type ${p.type}">${p.icon} ${p.label}</span>
        <span class="post-card-date">${p.date}</span>
        <h3 class="post-card-title">${p.title}</h3>
        <p class="post-card-body">${p.body}</p>
        <a href="#" class="post-card-link">${p.cta}</a>
      </div>`).join('');

  return `<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>熱量あふれる組織のつくりかた｜吉原史郎・宮慶優子</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@300;400;600;900&family=Noto+Sans+JP:wght@300;400;500;700&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root{
  --bg:${design.colors.bg};
  --bg2:${design.colors.bg2};
  --ink:${design.colors.ink};
  --ink2:${design.colors.ink2};
  --ink3:${design.colors.ink3};
  --gold:${design.colors.gold};
  --gold-light:${design.colors.goldLight};
  --rule:${design.colors.rule};
  --accent:${design.colors.accent};
  --cta-bg:${design.colors.ctaBg};
  --cta-ink:${design.colors.ctaInk};
  --w:860px;
}
html{scroll-behavior:smooth}
body{font-family:'Noto Sans JP',sans-serif;background:var(--bg);color:var(--ink);font-size:16px;line-height:1.8}
img{max-width:100%;display:block}

/* NAV */
nav{position:sticky;top:0;z-index:100;background:${design.colors.navBg};backdrop-filter:blur(8px);border-bottom:1px solid var(--rule);padding:.75rem 2rem}
.nav-inner{max-width:var(--w);margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:1rem;flex-wrap:wrap}
.nav-title{font-family:'Noto Serif JP',serif;font-size:.85rem;font-weight:600;color:${design.colors.navInk};white-space:nowrap}
.nav-links{display:flex;gap:1.25rem;flex-wrap:wrap}
.nav-links a{font-size:.72rem;color:${design.colors.navInk2};text-decoration:none;letter-spacing:.05em;white-space:nowrap;transition:color .2s}
.nav-links a:hover{color:var(--gold)}
.nav-cta{font-size:.72rem;padding:.35rem 1rem;background:${design.colors.navCtaBg};color:${design.colors.navCtaInk};border-radius:${design.shape.radius};text-decoration:none;white-space:nowrap;letter-spacing:.05em;transition:background .2s}
.nav-cta:hover{background:var(--gold)}

/* MAIN */
.main-section{padding:5rem 2rem 4.5rem;border-bottom:1px solid var(--rule)}
.main-inner{max-width:var(--w);margin:0 auto}
.main-question{margin-bottom:3rem}
.main-question-label{font-size:.68rem;letter-spacing:.35em;color:var(--gold);margin-bottom:1.25rem;display:block}
.main-question-text{font-family:'Noto Serif JP',serif;font-size:clamp(2rem,5vw,3.2rem);font-weight:900;line-height:1.45;color:var(--ink);letter-spacing:.02em}
${design.questionExtra || ''}
.main-divider{width:40px;height:2px;background:var(--gold-light);margin:2.5rem 0}
.main-philosophy{max-width:580px}
.main-philosophy p{font-size:1rem;line-height:2.1;color:var(--ink2);margin-bottom:1.1rem}
.main-philosophy p:last-child{margin-bottom:0}
.main-philosophy strong{color:var(--ink);font-weight:700}
.main-book{margin-top:3.5rem;padding-top:2.5rem;border-top:1px solid var(--rule);display:flex;align-items:center;gap:2rem}
.main-book-cover{width:72px;flex-shrink:0;aspect-ratio:3/4;background:#e8e4dc;border-radius:3px;display:flex;align-items:center;justify-content:center;font-size:.55rem;color:var(--ink3);letter-spacing:.05em;box-shadow:2px 3px 10px rgba(0,0,0,.1)}
.main-book-meta{display:flex;flex-direction:column;gap:.3rem;flex:1}
.main-book-title{font-family:'Noto Serif JP',serif;font-size:1rem;font-weight:900;color:var(--ink);line-height:1.5}
.main-book-sub{font-size:.75rem;color:var(--ink3)}
.main-book-authors{font-size:.8rem;color:var(--ink2)}
.main-book-authors span{font-weight:700;color:var(--ink)}
.main-book-link{margin-top:.3rem;font-size:.78rem;color:var(--gold);text-decoration:none;letter-spacing:.05em;display:inline-flex;align-items:center;gap:.3rem;transition:opacity .2s}
.main-book-link:hover{opacity:.7}

/* HERO ILLUST FIG */
.hero-illust-fig{margin:0}
.hero-illust-fig figcaption{font-size:.7rem;color:var(--ink3);text-align:center;margin-top:.6rem;letter-spacing:.02em}
.hero-illust{width:100%;border-radius:${design.shape.illustRadius};${design.illustEffect || ''}}

/* A: 2カラム */
.hero-2col{display:grid;grid-template-columns:1.05fr .95fr;gap:3rem;align-items:center}
.hero-left{min-width:0}
.hero-right{min-width:0}

/* B: 上部中央 */
.hero-top{max-width:560px;margin:0 auto 3rem}

/* C: 書誌情報の横にイラスト */
.hero-book-illust{align-items:stretch;gap:2rem}
.hero-book-illust .hero-inline{flex:1;min-width:0}
.hero-book-illust .main-book-meta{flex:0 0 auto;max-width:280px}

/* D: イラスト大判フィーチャー */
.hero-feature{margin:3rem 0;max-width:760px}
.hero-feature .hero-illust{box-shadow:${design.shape.illustShadow}}

/* SECTION COMMON */
.section{padding:4rem 2rem;border-top:1px solid var(--rule)}
.section-inner{max-width:var(--w);margin:0 auto}
.section-eyebrow{font-size:.68rem;letter-spacing:.35em;color:var(--gold);margin-bottom:.5rem}
.section-title{font-family:'Noto Serif JP',serif;font-size:clamp(1.3rem,2.5vw,1.9rem);font-weight:900;line-height:1.4;margin-bottom:2.5rem}

/* CHAPTERS */
.chapters{padding:3rem 2rem;border-top:1px solid var(--rule)}
.chapters-inner{max-width:var(--w);margin:0 auto}
.chapters-heading{font-family:'Noto Serif JP',serif;font-size:1.1rem;font-weight:600;color:var(--ink2);margin-bottom:2.5rem;padding-bottom:1rem;border-bottom:1px solid var(--rule);letter-spacing:.1em}
.chapter-item{display:grid;grid-template-columns:1fr 1fr;gap:2.5rem;align-items:start;padding:2.5rem 0;border-bottom:1px solid var(--rule)}
.chapter-item:last-child{border-bottom:none}
.chapter-video{background:${design.colors.videoBg};aspect-ratio:16/9;border-radius:${design.shape.radius};display:flex;align-items:center;justify-content:center;flex-direction:column;gap:.75rem;color:var(--ink3);font-size:.75rem}
.play-icon{width:44px;height:44px;border-radius:50%;background:rgba(255,255,255,.7);display:flex;align-items:center;justify-content:center}
.play-icon::after{content:'';border-style:solid;border-width:9px 0 9px 16px;border-color:transparent transparent transparent var(--ink2);margin-left:3px}
.chapter-num{font-size:.65rem;letter-spacing:.3em;color:var(--gold);margin-bottom:.4rem}
.chapter-title{font-family:'Noto Serif JP',serif;font-size:1.05rem;font-weight:900;line-height:1.5;margin-bottom:.75rem}
.chapter-body{font-size:.88rem;line-height:1.9;color:var(--ink2)}
.chapter-link{display:inline-block;margin-top:.75rem;font-size:.75rem;color:var(--gold);text-decoration:none;border-bottom:1px solid var(--gold-light);transition:color .2s}
.chapter-link:hover{color:var(--ink)}
.chapter-coming{background:var(--bg2);border-radius:${design.shape.radius};padding:1.5rem;font-size:.85rem;color:var(--ink3);text-align:center}

/* ENDORSERS */
.endorsers-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem}
.endorser-card{display:flex;gap:1rem;align-items:flex-start}
.endorser-photo{width:52px;height:52px;border-radius:50%;background:${design.colors.photoBg};flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:.55rem;color:var(--ink3)}
.endorser-name{font-size:.9rem;font-weight:700;margin-bottom:.2rem}
.endorser-title{font-size:.72rem;color:var(--ink2);line-height:1.6}
.endorser-theme{font-size:.72rem;color:var(--gold);margin-top:.3rem;font-style:italic}

/* AUTHORS */
.authors-grid{display:grid;grid-template-columns:1fr 1fr;gap:3rem}
.author-card{display:flex;gap:1.5rem;align-items:flex-start}
.author-photo{width:80px;height:80px;border-radius:50%;background:${design.colors.photoBg};flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:.65rem;color:var(--ink3)}
.author-name{font-family:'Noto Serif JP',serif;font-size:1.1rem;font-weight:900;margin-bottom:.25rem}
.author-title{font-size:.75rem;color:var(--gold);margin-bottom:.6rem}
.author-bio{font-size:.82rem;line-height:1.9;color:var(--ink2)}

/* RECOMMENDERS */
.recommenders{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:.75rem 1.5rem}
.recommender-item{font-size:.82rem;line-height:1.6;padding:.6rem 0;border-bottom:1px solid var(--rule)}
.recommender-name{font-weight:700}
.recommender-org{font-size:.72rem;color:var(--ink3)}

/* CTA */
.cta-section{background:var(--cta-bg);color:var(--cta-ink);padding:4rem 2rem;text-align:center;border-top:1px solid var(--rule);${design.ctaExtra || ''}}
.cta-inner{max-width:540px;margin:0 auto;position:relative;z-index:1}
.cta-title{font-family:'Noto Serif JP',serif;font-size:clamp(1.3rem,3vw,2rem);font-weight:900;line-height:1.5;margin-bottom:1rem;color:var(--cta-ink)}
.cta-body{font-size:.9rem;color:${design.colors.ctaBody};line-height:1.9;margin-bottom:2rem}
.cta-btn{display:inline-block;padding:1rem 3rem;background:${design.colors.btnBg};color:${design.colors.btnInk};font-weight:900;font-size:1rem;border-radius:${design.shape.btnRadius};text-decoration:none;letter-spacing:.05em;transition:opacity .2s}
.cta-btn:hover{opacity:.85}
.cta-sub{font-size:.75rem;color:${design.colors.ctaBody};margin-top:.75rem;opacity:.8}

/* POST READING */
.post-reading{padding:4rem 2rem;border-top:1px solid var(--rule);background:var(--bg)}
.post-inner{max-width:var(--w);margin:0 auto}
.post-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:1.25rem;margin-bottom:1.25rem}
.post-card{border:1px solid var(--rule);border-radius:${design.shape.radius};padding:1.4rem;background:#fff;display:flex;flex-direction:column;gap:.5rem;transition:border-color .2s,box-shadow .2s}
.post-card:hover{border-color:var(--gold-light);box-shadow:0 2px 12px rgba(0,0,0,.06)}
.post-card-type{display:inline-flex;align-items:center;gap:.4rem;font-size:.65rem;letter-spacing:.15em;font-weight:700;padding:.2rem .65rem;border-radius:50px;width:fit-content}
.post-card-type.event{background:rgba(139,105,20,.1);color:var(--gold)}
.post-card-type.article{background:rgba(45,90,61,.1);color:var(--accent)}
.post-card-date{font-size:.72rem;color:var(--ink3)}
.post-card-title{font-family:'Noto Serif JP',serif;font-size:.95rem;font-weight:700;line-height:1.5;color:var(--ink)}
.post-card-body{font-size:.78rem;line-height:1.8;color:var(--ink2);flex:1}
.post-card-link{font-size:.75rem;color:var(--gold);text-decoration:none;border-bottom:1px solid var(--gold-light);width:fit-content;transition:color .2s;margin-top:.25rem}
.post-card-link:hover{color:var(--ink)}
.post-more{text-align:right;margin-bottom:2.5rem}
.post-more a{font-size:.8rem;color:var(--ink2);text-decoration:none;border-bottom:1px solid var(--rule);transition:color .2s}
.post-more a:hover{color:var(--gold)}
.post-mail{background:var(--bg2);border-radius:${design.shape.cardRadius};padding:2rem 2.5rem;display:grid;grid-template-columns:1fr 1fr;gap:2rem;align-items:center}
.post-mail-title{font-family:'Noto Serif JP',serif;font-size:1.1rem;font-weight:900;margin-bottom:.5rem}
.post-mail-body{font-size:.82rem;line-height:1.8;color:var(--ink2)}
.form-row{display:flex;gap:.5rem;margin-bottom:.5rem}
.form-input{flex:1;padding:.65rem .9rem;border:1px solid var(--rule);border-radius:3px;background:#fff;font-size:.82rem;font-family:'Noto Sans JP',sans-serif;color:var(--ink)}
.form-input::placeholder{color:var(--ink3)}
.form-submit{padding:.65rem 1.25rem;background:var(--ink);color:#fff;border:none;border-radius:3px;font-size:.82rem;cursor:pointer;white-space:nowrap;font-family:'Noto Sans JP',sans-serif;font-weight:700;transition:background .2s}
.form-submit:hover{background:var(--gold)}
.form-note{font-size:.68rem;color:var(--ink3);line-height:1.7}

/* FOOTER */
footer{background:${design.colors.footerBg};color:${design.colors.footerInk};padding:2rem;text-align:center;font-size:.75rem;line-height:2}
footer a{color:inherit}

/* RESPONSIVE */
@media(max-width:720px){
  .main-question-text{font-size:clamp(1.7rem,6vw,2.4rem)}
  .main-book{flex-direction:column;align-items:flex-start;gap:1rem}
  .hero-2col{grid-template-columns:1fr;gap:2rem}
  .hero-book-illust{flex-direction:column}
  .hero-book-illust .main-book-meta{max-width:none}
  .chapter-item{grid-template-columns:1fr}
  .endorsers-grid{grid-template-columns:1fr 1fr}
  .authors-grid{grid-template-columns:1fr}
  .post-cards{grid-template-columns:1fr}
  .post-mail{grid-template-columns:1fr}
  .nav-links{display:none}
}
@media(max-width:480px){.endorsers-grid{grid-template-columns:1fr}}
${design.extraCSS || ''}
</style>
</head>
<body>

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
</nav>

${heroHTML}

<section id="chapters" class="chapters">
  <div class="chapters-inner">
    <p class="chapters-heading">— 本書の内容 —</p>
    ${chaptersHTML}
    ${comingChapter}
  </div>
</section>

<section id="endorsers" class="section" style="background:var(--bg2)">
  <div class="section-inner">
    <p class="section-eyebrow">SPECIAL CONTRIBUTORS</p>
    <h2 class="section-title">対談コラム執筆者・主な推薦者</h2>
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

<section class="section" style="background:var(--bg2)">
  <div class="section-inner">
    <p class="section-eyebrow">ENDORSEMENTS</p>
    <h2 class="section-title">推薦者</h2>
    <div class="recommenders">${recommendersHTML}</div>
  </div>
</section>

<section id="amazon" class="cta-section">
  ${design.ctaDecor || ''}
  <div class="cta-inner">
    <h2 class="cta-title">人とのつながりから、<br>熱量を取りもどす。</h2>
    <p class="cta-body">経営陣・ミドルマネジャー自身が、自分の「人生の熱量」から始めていける——<br>そのことを、できるだけシンプルに、具体的にお伝えしていく一冊。</p>
    <a href="#" class="cta-btn">Amazonで購入する</a>
    <p class="cta-sub">電子書籍・書店でも発売予定</p>
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
        <div class="form-row">
          <input class="form-input" type="email" placeholder="メールアドレス">
          <button class="form-submit">登録</button>
        </div>
        <p class="form-note">※ プライバシーポリシーに同意の上でご登録ください。<br>このフォームはモックアップです。実装時に差し替えます。</p>
      </div>
    </div>
  </div>
</section>

<footer>
  <p>熱量あふれる組織のつくりかた　著：吉原史郎・宮慶優子</p>
  <p style="margin-top:.4rem">© 2026 All rights reserved.　｜　<a href="#">プライバシーポリシー</a></p>
</footer>

</body>
</html>`;
}

function makeFile(filename, design) {
  const html = buildPageHTML(design);
  fs.writeFileSync(filename, html, 'utf8');
  const kb = (fs.statSync(filename).size / 1024).toFixed(1);
  console.log(`✓ ${filename}  (${kb} KB)`);
}

// ════════════════════════════════════════════════════════
// 4つのデザイン定義 — 同じ構造、違う処理
// ════════════════════════════════════════════════════════

// A: 温炉（モックアップ準拠の温かみ＋イラスト右配置）
makeFile('lp-book-19-warm.html', {
  heroLayout: 'right-illust',
  colors: {
    bg:'#faf6ee', bg2:'#f1ebdc', ink:'#1a1612', ink2:'#4a4238', ink3:'#8a8478',
    gold:'#8b6914', goldLight:'#c9a84c', rule:'#e4ddcc', accent:'#2d5a3d',
    navBg:'rgba(250,246,238,.95)', navInk:'#1a1612', navInk2:'#4a4238',
    navCtaBg:'#1a1612', navCtaInk:'#fff',
    videoBg:'#e0d8c4', photoBg:'#ddd4be',
    ctaBg:'#f1ebdc', ctaInk:'#1a1612', ctaBody:'#4a4238',
    btnBg:'#f90', btnInk:'#111',
    footerBg:'#1a1612', footerInk:'rgba(255,255,255,.5)',
  },
  shape:{ radius:'3px', illustRadius:'4px', illustShadow:'0 4px 24px rgba(60,40,10,.12)', btnRadius:'4px', cardRadius:'6px' },
});

// B: 編集赤（白背景+赤アクセント、書影の方向性に近い）
makeFile('lp-book-20-editorial.html', {
  heroLayout: 'top-illust',
  colors: {
    bg:'#fdfbf6', bg2:'#f5efe2', ink:'#0e0a06', ink2:'#3a302a', ink3:'#8a8478',
    gold:'#b8331f', goldLight:'#d96249', rule:'#e8e2d2', accent:'#2d5a3d',
    navBg:'rgba(253,251,246,.95)', navInk:'#0e0a06', navInk2:'#3a302a',
    navCtaBg:'#b8331f', navCtaInk:'#fff',
    videoBg:'#ece3d0', photoBg:'#e2d8c0',
    ctaBg:'#0e0a06', ctaInk:'#fdfbf6', ctaBody:'rgba(253,251,246,.7)',
    btnBg:'#d96249', btnInk:'#fff',
    footerBg:'#0e0a06', footerInk:'rgba(253,251,246,.45)',
  },
  shape:{ radius:'2px', illustRadius:'2px', illustShadow:'0 2px 18px rgba(0,0,0,.08)', btnRadius:'2px', cardRadius:'4px' },
  questionExtra: `.main-question-text strong, .main-question-text em{color:#b8331f;font-style:normal;font-weight:900}`,
});

// C: 静寂セリフ（最大の余白、控えめ、洗練）
makeFile('lp-book-21-quiet.html', {
  heroLayout: 'inline-small',
  colors: {
    bg:'#fcfbf8', bg2:'#f4f1ea', ink:'#16140f', ink2:'#5a5448', ink3:'#9a9486',
    gold:'#7a5a14', goldLight:'#b89838', rule:'#ece6d8', accent:'#2d5a3d',
    navBg:'rgba(252,251,248,.96)', navInk:'#16140f', navInk2:'#5a5448',
    navCtaBg:'transparent', navCtaInk:'#16140f',
    videoBg:'#ece6d8', photoBg:'#dfd8c6',
    ctaBg:'#fcfbf8', ctaInk:'#16140f', ctaBody:'#5a5448',
    btnBg:'#16140f', btnInk:'#fcfbf8',
    footerBg:'#16140f', footerInk:'rgba(252,251,248,.5)',
  },
  shape:{ radius:'2px', illustRadius:'2px', illustShadow:'0 1px 12px rgba(0,0,0,.06)', btnRadius:'2px', cardRadius:'3px' },
  extraCSS:`
.main-section{padding:7rem 2rem 6rem}
.main-question{margin-bottom:4rem}
.main-question-label{letter-spacing:.45em}
.main-philosophy{max-width:520px}
.hero-book-illust .hero-inline{max-width:260px}
.nav-cta{border:1px solid var(--ink);background:transparent !important;color:var(--ink) !important}
.nav-cta:hover{background:var(--ink) !important;color:#fff !important}
.section-eyebrow{letter-spacing:.45em}
`,
});

// D: 大判モダン（強コントラスト、イラスト大判フィーチャー）
makeFile('lp-book-22-bold.html', {
  heroLayout: 'feature',
  colors: {
    bg:'#f6f3ec', bg2:'#ebe5d4', ink:'#0a0a0a', ink2:'#3a3a3a', ink3:'#888',
    gold:'#a64d28', goldLight:'#d4814f', rule:'#dfd9c8', accent:'#2d5a3d',
    navBg:'rgba(10,10,10,.92)', navInk:'#f6f3ec', navInk2:'rgba(246,243,236,.7)',
    navCtaBg:'#a64d28', navCtaInk:'#fff',
    videoBg:'#dfd5c0', photoBg:'#d4cab4',
    ctaBg:'#0a0a0a', ctaInk:'#f6f3ec', ctaBody:'rgba(246,243,236,.7)',
    btnBg:'#d4814f', btnInk:'#0a0a0a',
    footerBg:'#0a0a0a', footerInk:'rgba(246,243,236,.4)',
  },
  shape:{ radius:'3px', illustRadius:'4px', illustShadow:'0 8px 36px rgba(0,0,0,.16)', btnRadius:'3px', cardRadius:'6px' },
  extraCSS:`
.nav-links a{color:rgba(246,243,236,.65) !important}
.nav-links a:hover{color:#d4814f !important}
.main-question-text{font-weight:900;letter-spacing:0}
.hero-feature{position:relative;padding:1rem;background:#fff;border-radius:6px;box-shadow:0 8px 40px rgba(0,0,0,.1)}
.hero-feature::before{content:'';position:absolute;inset:-12px;border:1px solid var(--gold-light);border-radius:8px;opacity:.5;pointer-events:none}
.hero-feature figcaption{font-size:.75rem;color:var(--ink2);padding:.8rem 0 .2rem}
.section-title{font-weight:900;letter-spacing:-.01em}
`,
});

console.log(`
✅ 書籍LP v6（モックアップ構造尊重・処理バリエーション4案）を生成
   A: 温炉             → lp-book-19-warm.html       温かみベース＋右配置イラスト
   B: 編集赤           → lp-book-20-editorial.html  白×赤アクセント＋上部中央イラスト
   C: 静寂セリフ        → lp-book-21-quiet.html      最大余白＋書誌情報横の小ぶりイラスト
   D: 大判モダン        → lp-book-22-bold.html       強コントラスト＋大判フィーチャー

   ※ 全案ともモックアップと同じ全セクション構造を保持
     （nav / 問い+哲学+書誌 / 6章 / 推薦者 / 著者 / 推薦者 / CTA / 読後 / footer）
`);
