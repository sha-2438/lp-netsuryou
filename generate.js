/**
 * LP一括生成スクリプト
 * 40パターンのLPを生成する
 *
 * 変数軸:
 *   ターゲット: ①経営者 / ②人事 / ③ビジネスパーソン / ①②③混合
 *   コンセプト: A（構造的共感） / B（構造的真実）
 *   デザイン: D1=緑有機 / D2=ダーク / D3=アーストーン分割 / D4=モノクロボールド / D5=ビジュアル強調
 *   トーン: Q=問いかけ / S=断言 / T=ストーリー / D=データ
 */

const fs = require('fs');
const path = require('path');
const outputDir = __dirname;

// ─── ターゲット別コンテンツ ──────────────────────────────────────
const TARGETS = {
  1: {
    id: 1,
    label: '①経営者・マネジャー',
    en: 'Leaders & Managers',
    pain_short: '数値目標に限界を感じている',
    pain_headline_Q: 'KPIを達成しても、\nなぜ組織から「生きる力」が失われるのか？',
    pain_headline_S: '正しく経営しているのに、\n組織が凍りついている。\nその正体は「マネーバイアス」だ。',
    pain_headline_T: 'ある経営者の告白。\n「数字を追うのをやめた日、\nチームが初めて動き出した。」',
    pain_headline_D: '日本企業の73%の経営者が感じる\n「管理しても熱量が上がらない」という矛盾',
    symptoms: [
      { icon: '📊', title: 'KPIは達成できている', body: '売上・利益・生産性の指標はすべて緑。しかし現場の空気は重く、優秀な人材から静かに去っていく。' },
      { icon: '🔄', title: 'エンゲージメント施策が実らない', body: '1on1を導入した。研修も増やした。サーベイも取り入れた。でも本物の熱量は戻らない。' },
      { icon: '🧊', title: '正論が心に届かない', body: '合理的な説明をすれば人が動くと信じてきた。今、論理は通じても心は動かないことに気づいている。' },
      { icon: '💡', title: '「このやり方でいいのか」という根本的な問い', body: 'マネジメント手法ではなく、経営の前提そのものを見直す必要があると直感している。' },
    ],
    closing: 'これはあなたの能力の問題ではありません。私たちが無意識に信じ込んでいる「マネーバイアス」が、組織を根本から凍らせているのです。',
    testimonials: [
      { quote: 'KPIを廃止する決断は怖かった。でも半年後、チームの自発性が劇的に変わり、売上もなぜか上がり始めた。', name: 'Aさん', role: '製造業 代表取締役（230名）' },
      { quote: '「正しい経営をしているはずなのに」という違和感の正体がやっとわかった。マネーバイアスという言葉が長年の謎を解いてくれた。', name: 'Bさん', role: 'IT企業 事業部長' },
      { quote: '部門の目標を「数値」から「熱量」の言葉に置き換えた朝礼で、メンバーの顔が変わった。', name: 'Cさん', role: 'サービス業 営業マネジャー' },
      { quote: '数字で追い詰めてきた自分を、この本が静かに映し出してくれた。', name: 'Dさん', role: 'コンサルティング 創業者' },
    ],
    cta_heading: 'マネーバイアスを突破し、\n熱量あふれる組織をつくり始めよう。',
    cta_body: '数値目標に疲れたすべての経営者・マネジャーへ。組織に「生きる力」を取り戻す新しい経営哲学がここにあります。',
  },
  2: {
    id: 2,
    label: '②人事担当者',
    en: 'HR Professionals',
    pain_short: '「静かな退職」に悩む',
    pain_headline_Q: '施策を打ち続けても、\nなぜ「静かな退職」は止まらないのか？',
    pain_headline_S: '離職もエンゲージメントも、\n問題は個人ではなく「構造」にある。',
    pain_headline_T: 'ある人事担当者の転換点。\n「エンゲージメントスコアを見るのをやめて、\n組織の「空気」を観察し始めた日。」',
    pain_headline_D: 'エンゲージメント施策に\n年間平均200万円投じながら\nスコアが改善しない企業が68%',
    symptoms: [
      { icon: '📉', title: '「静かな退職」が蔓延している', body: '離職はしないが、最低限しか働かない。サーベイには答えるが、本音は話さない。そんな社員が増えている。' },
      { icon: '🔁', title: 'エンゲージメント施策が機能しない', body: 'ウェルビーイング施策、表彰制度、社内SNS……手を尽くしても、熱量は戻ってこない。' },
      { icon: '🚪', title: '優秀な人が先に辞めていく', body: '残るのは保守的な人材で、変化を起こす人材が次々と去っていく。組織の「新陳代謝」が機能不全を起こしている。' },
      { icon: '🤝', title: '経営層との認識ギャップ', body: '現場の「空気の重さ」を数値で伝えられない。経営層に「感覚論」と一蹴されてしまう。' },
    ],
    closing: '「施策が悪い」のではありません。組織の構造に埋め込まれた「マネーバイアス」が、どんな施策も無効化しているのです。',
    testimonials: [
      { quote: '「施策で解決しようとするのをやめた」瞬間に、チームが変わり始めた。問題は施策ではなく、前提にあったんです。', name: 'Eさん', role: '人事部長 メーカー勤務' },
      { quote: 'マネーバイアスという言葉を知って、なぜ「心理的安全性研修」が機能しなかったのかが腑に落ちた。', name: 'Fさん', role: 'HRBP IT企業' },
      { quote: '経営陣を説得するための言語を、この本が与えてくれた。数字ではなく「構造」で話せるようになった。', name: 'Gさん', role: '人材開発責任者' },
      { quote: 'エンゲージメントスコアを追いかけるのをやめて、「熱量の循環」を見るようになったら、景色が変わった。', name: 'Hさん', role: '組織開発 コンサルタント' },
    ],
    cta_heading: '「静かな退職」の根本原因を\n突き止め、組織に熱量を取り戻そう。',
    cta_body: '施策を変えるのではなく、前提を変える。人事担当者が知るべき、組織変革の新しい視点がここにあります。',
  },
  3: {
    id: 3,
    label: '③ビジネスパーソン',
    en: 'Business Professionals',
    pain_short: '仕事への熱量を失っている',
    pain_headline_Q: '「なぜ働くのか」が\nわからなくなってきていませんか？',
    pain_headline_S: '仕事が義務になった瞬間、\nあなたの「自分らしさ」は\nどこかへ消えていった。',
    pain_headline_T: '「気づいたら、自分が透明になっていた」\n——ある30代のビジネスパーソンが\n熱量を取り戻すまでの物語。',
    pain_headline_D: '働く人の54%が「仕事への熱量が\n3年前より低下した」と感じている。\nあなたはどうですか？',
    symptoms: [
      { icon: '🌫️', title: '仕事が「こなすもの」になっている', body: '以前は好きだったはずの仕事が、今は義務感でしかこなせない。何かが、静かに失われている。' },
      { icon: '👻', title: '「自分が消えていく」感覚', body: '会議でも、提案でも、「求められる自分」を演じている。本当の自分がどこにいるのかわからない。' },
      { icon: '⏰', title: '月曜日が怖い', body: '週末になっても本当には休めない。「また月曜日が来る」という憂鬱が、じわじわと体に沁みている。' },
      { icon: '🎯', title: '「何のために働いているのか」がわからない', body: '給料のため？ 昇進のため？ それだけのために、こんなに疲弊しているのか——そんな問いが頭をよぎる。' },
    ],
    closing: 'これはあなた個人の問題ではありません。「お金・数値・効率」を至上とするマネーバイアスが、あなたの熱量を組織的に奪っているのです。',
    testimonials: [
      { quote: '転職を繰り返しても変わらなかった「熱量のなさ」の正体が、やっとわかった気がした。', name: 'Iさん', role: '広告会社 プランナー 32歳' },
      { quote: '「自分がおかしいのかな」と思っていたけど、構造の問題だとわかって少し楽になれた。', name: 'Jさん', role: 'メーカー 営業職 28歳' },
      { quote: 'この本を読んで、初めて「仕事を好きだった頃の自分」を思い出せた。', name: 'Kさん', role: 'コンサルタント 35歳' },
      { quote: '会社を辞める前にこの本に出会えて良かった。問題は会社じゃなく、もっと根深いところにあった。', name: 'Lさん', role: 'IT企業 エンジニア 29歳' },
    ],
    cta_heading: '「熱量」を、\n取り戻そう。\nあなたには、まだ火種がある。',
    cta_body: '仕事に「自分」を失いかけているすべてのビジネスパーソンへ。本来の熱量を解放するための、新しい視点がここにあります。',
  },
  4: {
    id: 4,
    label: '①②③混合',
    en: 'All Stakeholders',
    pain_short: '組織全体の熱量が失われている',
    pain_headline_Q: '経営者も、人事も、現場も。\nなぜみんなが\n同じ疲弊感を抱えているのか？',
    pain_headline_S: '組織の「熱量の喪失」は、\n個人の問題ではなく\n構造的な必然だった。',
    pain_headline_T: 'ある会社での出来事。\n経営者は数字を追い、人事は施策を打ち、\n現場は疲弊する——その悪循環が止まった日。',
    pain_headline_D: '「組織の熱量が低下している」\n経営者の81%・人事の76%・現場の69%が\n同様に感じている日本の現実',
    symptoms: [
      { icon: '🏢', title: '組織の上下が、全員疲弊している', body: '経営者は正しく舵を切っている。人事は施策を尽くしている。現場は真剣に働いている。なのに全員が消耗している。' },
      { icon: '📊', title: '数字は動くが、人の目が死んでいる', body: 'KPIは達成される。エンゲージメントスコアも維持される。でも廊下の空気は重く、笑顔が少ない。' },
      { icon: '🔗', title: '施策が「対症療法」にしかなっていない', body: '経営改革、研修、1on1、ウェルビーイング……あらゆる施策を打っても、根本的な何かが変わらない感覚。' },
      { icon: '🌱', title: '「本来の姿」への渇望', body: '「もっと生き生きとした組織にしたい」という思いは、全員が持っている。方法論ではなく、前提が問われている。' },
    ],
    closing: 'この問題の根本原因は「マネーバイアス」——お金・数値・効率を唯一の価値基準とする、組織に埋め込まれた見えない呪縛です。',
    testimonials: [
      { quote: '経営者として、人事として、現場として——三つの視点から読める珍しい本。全員に届けたい。', name: 'Mさん', role: '人事担当兼マネジャー' },
      { quote: '「なぜこうなったのか」がストン、と腑に落ちた。マネーバイアスという概念が、長年の謎を解いた。', name: 'Nさん', role: '社員300名 代表取締役' },
      { quote: 'チーム全員で読んで話し合った。「構造の問題」として語れるようになったことで、対話が変わった。', name: 'Oさん', role: 'スタートアップ 共同創業者' },
      { quote: '経営層・人事・現場が同じ言語で話せるようになった。それだけで組織が変わり始めた。', name: 'Pさん', role: '組織変革プロジェクトリーダー' },
    ],
    cta_heading: '経営者も、人事も、現場も。\nみんなで読んで、\n組織を生命体として再生しよう。',
    cta_body: '熱量の喪失は、組織的・構造的な問題です。すべてのステークホルダーに届けたい、根本的な解決策がここにあります。',
  },
};

// ─── コンセプト別コンテンツ ──────────────────────────────────────
const CONCEPTS = {
  A: {
    id: 'A',
    label: '案A：構造的共感',
    badge: '数字の呪縛が、組織を凍らせる',
    hero_sub: 'まず、その「おかしさ」を、言語化しよう。',
    concept_statement_1: '「なぜうまくいかないのか」\nわかっていなかったのではありません。\n言葉がなかっただけです。',
    concept_statement_2: 'あなたが感じていたその「違和感」には、名前があります。\nそれを「マネーバイアス」と呼びます。',
    concept_body: 'お金・数値・効率を絶対視するマネーバイアスは、私たちが意識しないまま内面化した「思い込みの構造」です。正しく努力しているのに組織が疲弊する——その矛盾の正体がここにあります。',
    holes: [
      { num: '01', name: '「数字の呪縛」を見える化する', desc: '無意識に信じている「数値＝真実」という思い込みを、組織の構造として可視化します。呪縛の正体を見れば、外し方が見えてきます。' },
      { num: '02', name: '「共感」を組織の言語にする', desc: '感情や熱量を「非効率」として排除してきた組織に、共感の回路を取り戻します。これが最も強力な「生産性向上策」です。' },
      { num: '03', name: '「生成（Becoming）」という成長観', desc: '目標達成・スキル強化という強化型成長から、人が本来持つ可能性が花開く生成型成長へ。組織の時間軸が変わります。' },
    ],
  },
  B: {
    id: 'B',
    label: '案B：構造的真実',
    badge: 'マネーバイアスを突破する経営',
    hero_sub: '経営の前提そのものを問い直す。',
    concept_statement_1: '問題はリーダーシップでも\nマネジメント手法でもない。\n経営の「前提」が間違っている。',
    concept_statement_2: 'その前提を「マネーバイアス」と呼びます。\n突破する方法は、存在します。',
    concept_body: 'マネーバイアスとは、お金・数値・効率を経営の唯一の基準とする思い込みの構造です。これを「正しさ」と信じて疑わない組織は、熱量を失い続けます。本書はその構造を暴き、突破する道筋を示します。',
    holes: [
      { num: '01', name: 'バイアスの構造を解剖する', desc: 'なぜお金が「目的」になった瞬間、組織から生命力が失われるのか。その因果の構造を経営的視点から徹底解明します。' },
      { num: '02', name: '「突破口」を3つ開く', desc: '評価・目標・成長の3つのシステムに埋め込まれたバイアスを外す、具体的・実践的な経営アクションを提示します。' },
      { num: '03', name: '「熱量経営」への転換', desc: '利益は目的ではなく「熱量循環の結果」として生まれる。この根本的なパラダイムシフトが、持続可能な経営を生み出します。' },
    ],
  },
};

// ─── デザインテーマ ──────────────────────────────────────────────
const DESIGNS = {
  D1: { // 緑有機（案2忠実）
    id: 'D1',
    label: '緑有機（Design2忠実）',
    bg_hero: 'linear-gradient(135deg, #e8f5e2 0%, #f0f8ec 40%, #e0f0da 70%, #c8e6c3 100%)',
    bg_section2: '#2c2c2c',
    bg_section3: '#f4faf2',
    bg_section4: '#f9f6f0',
    bg_concept: 'linear-gradient(135deg, #1b5e20 0%, #2e6b34 100%)',
    bg_author: '#f0f8ec',
    bg_test: '#2c2c2c',
    bg_cta: 'linear-gradient(160deg, #e8f5e2 0%, #c8e6c3 60%, #a5c9a1 100%)',
    primary: '#388e3c',
    accent: '#5a8f5e',
    dark: '#1b5e20',
    light: '#c8e6c3',
    mid: '#81c784',
    becoming_color: 'rgba(129,199,132,0.18)',
    blob: true,
    organic_shapes: true,
    hero_text_color: '#1b5e20',
    section2_text: 'white',
    label_color_hero: '#5a8f5e',
    label_color_dark: '#81c784',
    label_color_light: '#5a8f5e',
    nav_bg: 'rgba(249,246,240,0.92)',
    nav_color: '#1b5e20',
    footer_bg: '#2c2c2c',
    btn_bg: '#1b5e20',
    btn_hover: '#2c2c2c',
  },
  D2: { // ダークナイト
    id: 'D2',
    label: 'ダークナイト',
    bg_hero: 'linear-gradient(160deg, #0d1117 0%, #161b22 50%, #0d2818 100%)',
    bg_section2: '#0a0a0a',
    bg_section3: '#111b11',
    bg_section4: '#0d1117',
    bg_concept: 'linear-gradient(135deg, #0d2818 0%, #1a3a20 100%)',
    bg_author: '#111b11',
    bg_test: '#0a0a0a',
    bg_cta: 'linear-gradient(160deg, #0d2818 0%, #1a3a20 100%)',
    primary: '#4caf50',
    accent: '#69bb6e',
    dark: '#2e7d32',
    light: '#a5d6a7',
    mid: '#66bb6a',
    becoming_color: 'rgba(76,175,80,0.08)',
    blob: true,
    organic_shapes: false,
    hero_text_color: '#a5d6a7',
    section2_text: 'white',
    label_color_hero: '#4caf50',
    label_color_dark: '#66bb6a',
    label_color_light: '#4caf50',
    nav_bg: 'rgba(13,17,23,0.95)',
    nav_color: '#a5d6a7',
    footer_bg: '#0a0a0a',
    btn_bg: '#2e7d32',
    btn_hover: '#1b5e20',
  },
  D3: { // アーストーン分割
    id: 'D3',
    label: 'アーストーン分割',
    bg_hero: 'linear-gradient(135deg, #fdf6ec 0%, #f5e6d0 50%, #ece0c8 100%)',
    bg_section2: '#3d2b1f',
    bg_section3: '#fdf6ec',
    bg_section4: '#f8f0e4',
    bg_concept: 'linear-gradient(135deg, #3d2b1f 0%, #5c4033 100%)',
    bg_author: '#fdf6ec',
    bg_test: '#3d2b1f',
    bg_cta: 'linear-gradient(160deg, #f5e6d0 0%, #e8d5b0 60%, #d4bc8a 100%)',
    primary: '#8d6e63',
    accent: '#a0785a',
    dark: '#3d2b1f',
    light: '#f5e6d0',
    mid: '#bcaaa4',
    becoming_color: 'rgba(141,110,99,0.12)',
    blob: false,
    organic_shapes: false,
    hero_text_color: '#3d2b1f',
    section2_text: 'white',
    label_color_hero: '#8d6e63',
    label_color_dark: '#bcaaa4',
    label_color_light: '#8d6e63',
    nav_bg: 'rgba(253,246,236,0.95)',
    nav_color: '#3d2b1f',
    footer_bg: '#3d2b1f',
    btn_bg: '#3d2b1f',
    btn_hover: '#5c4033',
  },
  D4: { // モノクロボールド
    id: 'D4',
    label: 'モノクロボールド',
    bg_hero: '#f5f5f5',
    bg_section2: '#111111',
    bg_section3: '#ffffff',
    bg_section4: '#f5f5f5',
    bg_concept: 'linear-gradient(135deg, #111111 0%, #333333 100%)',
    bg_author: '#ffffff',
    bg_test: '#111111',
    bg_cta: '#f5f5f5',
    primary: '#111111',
    accent: '#444444',
    dark: '#000000',
    light: '#e0e0e0',
    mid: '#888888',
    becoming_color: 'rgba(0,0,0,0.06)',
    blob: false,
    organic_shapes: false,
    hero_text_color: '#111111',
    section2_text: 'white',
    label_color_hero: '#111111',
    label_color_dark: '#aaaaaa',
    label_color_light: '#444444',
    nav_bg: 'rgba(245,245,245,0.96)',
    nav_color: '#111111',
    footer_bg: '#111111',
    btn_bg: '#111111',
    btn_hover: '#333333',
  },
  D5: { // ビビッドビジュアル
    id: 'D5',
    label: 'ビビッドビジュアル',
    bg_hero: 'linear-gradient(160deg, #e8f5e9 0%, #f3e5f5 50%, #e0f2f1 100%)',
    bg_section2: '#1a237e',
    bg_section3: '#f3e5f5',
    bg_section4: '#e8f5e9',
    bg_concept: 'linear-gradient(135deg, #1a237e 0%, #283593 100%)',
    bg_author: '#f3e5f5',
    bg_test: '#1a237e',
    bg_cta: 'linear-gradient(160deg, #e8f5e9 0%, #b2dfdb 60%, #80cbc4 100%)',
    primary: '#7b1fa2',
    accent: '#4caf50',
    dark: '#1a237e',
    light: '#e1bee7',
    mid: '#ce93d8',
    becoming_color: 'rgba(123,31,162,0.08)',
    blob: true,
    organic_shapes: true,
    hero_text_color: '#1a237e',
    section2_text: 'white',
    label_color_hero: '#7b1fa2',
    label_color_dark: '#ce93d8',
    label_color_light: '#7b1fa2',
    nav_bg: 'rgba(232,245,233,0.95)',
    nav_color: '#1a237e',
    footer_bg: '#1a237e',
    btn_bg: '#7b1fa2',
    btn_hover: '#4a148c',
  },
};

// ─── トーン定義 ──────────────────────────────────────────────────
const TONES = { Q: '問いかけ型', S: '断言型', T: 'ストーリー型', D: 'データ型' };

// ─── 40パターン定義（#01は既存） ──────────────────────────────────
const PATTERNS = [
  // ─ D1 緑有機（01-08） ─
  { n:  1, target: 1, concept: 'B', design: 'D1', tone: 'Q' },
  { n:  2, target: 1, concept: 'A', design: 'D1', tone: 'Q' },
  { n:  3, target: 2, concept: 'B', design: 'D1', tone: 'Q' },
  { n:  4, target: 2, concept: 'A', design: 'D1', tone: 'Q' },
  { n:  5, target: 3, concept: 'B', design: 'D1', tone: 'Q' },
  { n:  6, target: 3, concept: 'A', design: 'D1', tone: 'Q' },
  { n:  7, target: 4, concept: 'B', design: 'D1', tone: 'Q' },
  { n:  8, target: 4, concept: 'A', design: 'D1', tone: 'Q' },
  // ─ D2 ダーク（09-16） ─
  { n:  9, target: 1, concept: 'B', design: 'D2', tone: 'S' },
  { n: 10, target: 1, concept: 'A', design: 'D2', tone: 'S' },
  { n: 11, target: 2, concept: 'B', design: 'D2', tone: 'S' },
  { n: 12, target: 2, concept: 'A', design: 'D2', tone: 'S' },
  { n: 13, target: 3, concept: 'B', design: 'D2', tone: 'S' },
  { n: 14, target: 3, concept: 'A', design: 'D2', tone: 'S' },
  { n: 15, target: 4, concept: 'B', design: 'D2', tone: 'S' },
  { n: 16, target: 4, concept: 'A', design: 'D2', tone: 'S' },
  // ─ D3 アーストーン（17-24） ─
  { n: 17, target: 1, concept: 'B', design: 'D3', tone: 'T' },
  { n: 18, target: 1, concept: 'A', design: 'D3', tone: 'T' },
  { n: 19, target: 2, concept: 'B', design: 'D3', tone: 'T' },
  { n: 20, target: 2, concept: 'A', design: 'D3', tone: 'T' },
  { n: 21, target: 3, concept: 'B', design: 'D3', tone: 'T' },
  { n: 22, target: 3, concept: 'A', design: 'D3', tone: 'T' },
  { n: 23, target: 4, concept: 'B', design: 'D3', tone: 'T' },
  { n: 24, target: 4, concept: 'A', design: 'D3', tone: 'T' },
  // ─ D4 モノクロ（25-32） ─
  { n: 25, target: 1, concept: 'B', design: 'D4', tone: 'D' },
  { n: 26, target: 1, concept: 'A', design: 'D4', tone: 'D' },
  { n: 27, target: 2, concept: 'B', design: 'D4', tone: 'D' },
  { n: 28, target: 2, concept: 'A', design: 'D4', tone: 'D' },
  { n: 29, target: 3, concept: 'B', design: 'D4', tone: 'D' },
  { n: 30, target: 3, concept: 'A', design: 'D4', tone: 'D' },
  { n: 31, target: 4, concept: 'B', design: 'D4', tone: 'D' },
  { n: 32, target: 4, concept: 'A', design: 'D4', tone: 'D' },
  // ─ D5 ビビッド（33-40） ─
  { n: 33, target: 1, concept: 'B', design: 'D5', tone: 'S' },
  { n: 34, target: 1, concept: 'A', design: 'D5', tone: 'T' },
  { n: 35, target: 2, concept: 'B', design: 'D5', tone: 'Q' },
  { n: 36, target: 2, concept: 'A', design: 'D5', tone: 'D' },
  { n: 37, target: 3, concept: 'B', design: 'D5', tone: 'T' },
  { n: 38, target: 3, concept: 'A', design: 'D5', tone: 'Q' },
  { n: 39, target: 4, concept: 'B', design: 'D5', tone: 'S' },
  { n: 40, target: 4, concept: 'A', design: 'D5', tone: 'D' },
];

// ─── HTML生成関数 ─────────────────────────────────────────────────
function getPainHeadline(t, tone) {
  if (tone === 'Q') return t.pain_headline_Q;
  if (tone === 'S') return t.pain_headline_S;
  if (tone === 'T') return t.pain_headline_T;
  if (tone === 'D') return t.pain_headline_D;
  return t.pain_headline_Q;
}

function nl2br(str) {
  return str.replace(/\n/g, '<br>');
}

function symptomList(items) {
  return items.map(s => `
      <div class="symptom-item">
        <div class="symptom-icon">${s.icon}</div>
        <div class="symptom-text"><strong>${s.title}</strong>${s.body}</div>
      </div>`).join('');
}

function holeCards(holes, d) {
  return holes.map((h, i) => `
        <div class="hole-card">
          <div class="hole-number">${h.num}</div>
          <div class="hole-name">${nl2br(h.name)}</div>
          <div class="hole-desc">${h.desc}</div>
          ${i < holes.length - 1 ? '<div class="hole-connector"></div>' : ''}
        </div>`).join('');
}

function testimonialCards(items) {
  return items.map(t => `
        <div class="test-card">
          <p class="test-quote">${t.quote}</p>
          <div class="test-person">
            <div class="test-avatar">${t.name[0]}</div>
            <div class="test-info">
              <div class="test-name">${t.name}</div>
              <div class="test-role">${t.role}</div>
            </div>
          </div>
        </div>`).join('');
}

function blobHtml(d) {
  if (!d.blob) return '';
  const blobColor = d.id === 'D5'
    ? ['rgba(123,31,162,0.12)', 'rgba(76,175,80,0.1)', 'rgba(123,31,162,0.08)']
    : d.id === 'D2'
    ? ['rgba(76,175,80,0.1)', 'rgba(100,200,100,0.07)', 'rgba(76,175,80,0.06)']
    : ['rgba(129,199,132,0.22)', 'rgba(165,201,161,0.18)', 'rgba(200,230,195,0.25)'];
  return `
  <div class="hero-blob blob-1" style="background:radial-gradient(ellipse, ${blobColor[0]} 0%, transparent 70%)"></div>
  <div class="hero-blob blob-2" style="background:radial-gradient(ellipse, ${blobColor[1]} 0%, transparent 70%)"></div>
  <div class="hero-blob blob-3" style="background:radial-gradient(ellipse, ${blobColor[2]} 0%, transparent 70%)"></div>`;
}

function rippleSvg(d) {
  const c1 = d.mid;
  const c2 = d.accent !== '#4caf50' ? d.accent : '#69bb6e';
  const c3 = d.light;
  return `<svg viewBox="0 0 400 380" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;">
        <g opacity="0.2">
          <polygon points="200,30 100,160 300,160" fill="none" stroke="${d.mid}" stroke-width="1.5"/>
          <line x1="140" y1="160" x2="260" y2="160" stroke="${d.mid}" stroke-width="1"/>
          <line x1="100" y1="200" x2="300" y2="200" stroke="${d.mid}" stroke-width="1"/>
          <line x1="80" y1="240" x2="320" y2="240" stroke="${d.mid}" stroke-width="1"/>
        </g>
        <circle cx="200" cy="195" r="8" fill="${d.primary}" opacity="0.9"/>
        <circle cx="200" cy="195" r="35" stroke="${c1}" stroke-width="1" fill="none" opacity="0.8">
          <animate attributeName="r" from="8" to="35" dur="3s" repeatCount="indefinite"/>
          <animate attributeName="opacity" from="0.8" to="0" dur="3s" repeatCount="indefinite"/>
        </circle>
        <circle cx="200" cy="195" r="35" stroke="${c1}" stroke-width="1" fill="none" opacity="0.6">
          <animate attributeName="r" from="8" to="70" dur="3s" begin="0.5s" repeatCount="indefinite"/>
          <animate attributeName="opacity" from="0.6" to="0" dur="3s" begin="0.5s" repeatCount="indefinite"/>
        </circle>
        <circle cx="200" cy="195" r="35" stroke="${c2}" stroke-width="1" fill="none" opacity="0.4">
          <animate attributeName="r" from="8" to="110" dur="3s" begin="1s" repeatCount="indefinite"/>
          <animate attributeName="opacity" from="0.4" to="0" dur="3s" begin="1s" repeatCount="indefinite"/>
        </circle>
        <circle cx="200" cy="195" r="35" stroke="${c3}" stroke-width="0.8" fill="none" opacity="0.3">
          <animate attributeName="r" from="8" to="155" dur="3s" begin="1.5s" repeatCount="indefinite"/>
          <animate attributeName="opacity" from="0.3" to="0" dur="3s" begin="1.5s" repeatCount="indefinite"/>
        </circle>
        <circle cx="200" cy="80" r="5" fill="${d.primary}" opacity="0.7"/>
        <circle cx="130" cy="140" r="5" fill="${d.primary}" opacity="0.7"/>
        <circle cx="270" cy="140" r="5" fill="${d.primary}" opacity="0.7"/>
        <circle cx="160" cy="280" r="5" fill="${d.primary}" opacity="0.7"/>
        <circle cx="240" cy="280" r="5" fill="${d.primary}" opacity="0.7"/>
        <path d="M200,195 Q165,135 130,140" stroke="${c1}" stroke-width="0.8" fill="none" opacity="0.5"/>
        <path d="M200,195 Q235,135 270,140" stroke="${c1}" stroke-width="0.8" fill="none" opacity="0.5"/>
        <path d="M200,195 Q180,237 160,280" stroke="${c1}" stroke-width="0.8" fill="none" opacity="0.5"/>
        <path d="M200,195 Q220,237 240,280" stroke="${c1}" stroke-width="0.8" fill="none" opacity="0.5"/>
        <path d="M200,195 Q200,130 200,80" stroke="${c2}" stroke-width="0.6" fill="none" opacity="0.4"/>
        <text x="200" y="340" text-anchor="middle" font-size="10" fill="${c1}" font-family="sans-serif" letter-spacing="1">熱量が波紋のように広がる有機的組織</text>
      </svg>`;
}

function generateHTML(p) {
  const t = TARGETS[p.target];
  const c = CONCEPTS[p.concept];
  const d = DESIGNS[p.design];
  const toneLabel = TONES[p.tone];
  const painHl = getPainHeadline(t, p.tone);

  // 体テキスト色（ダーク系は白ベース）
  const isDark = ['D2'].includes(p.design);
  const bodyText = isDark ? '#e0e0e0' : '#2c2c2c';
  const bodyTextWarm = isDark ? '#a0a0a0' : '#6b6b6b';
  const sectionLightText = isDark ? '#c0c0c0' : '#2c2c2c';

  // D4モノクロの特別処理
  const isMonochrome = p.design === 'D4';

  // hole card shapeをデザインで変える
  const holeShape = p.design === 'D1' ? '50% 50% 50% 50% / 30% 30% 70% 70%'
                  : p.design === 'D3' ? '8px'
                  : p.design === 'D5' ? '24px'
                  : '4px';

  return `<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>熱量あふれる組織のつくり方 | ${c.badge} | Pattern ${String(p.n).padStart(2,'0')}</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@300;400;700&family=Noto+Sans+JP:wght@300;400;500;700&display=swap');
*{margin:0;padding:0;box-sizing:border-box;}
body{font-family:'Noto Sans JP',sans-serif;background:${isDark?'#0d1117':'#f9f6f0'};color:${bodyText};line-height:1.8;overflow-x:hidden;}

/* NAV */
nav{position:fixed;top:0;left:0;right:0;z-index:100;background:${d.nav_bg};backdrop-filter:blur(12px);border-bottom:1px solid rgba(128,128,128,0.15);padding:1rem 2rem;display:flex;justify-content:space-between;align-items:center;}
.nav-logo{font-family:'Noto Serif JP',serif;font-size:.88rem;font-weight:700;color:${d.nav_color};letter-spacing:.04em;}
.nav-badge{font-size:.72rem;color:${d.accent};border:1px solid ${d.accent};padding:.25rem .8rem;border-radius:50px;letter-spacing:.08em;}
.nav-cta{background:${d.btn_bg};color:white;padding:.45rem 1.4rem;border-radius:50px;font-size:.8rem;text-decoration:none;font-weight:700;letter-spacing:.06em;}

/* HERO */
.hero{min-height:100vh;position:relative;display:flex;align-items:center;justify-content:center;overflow:hidden;background:${d.bg_hero};padding-top:72px;}
.hero-bg-becoming{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-family:'Noto Serif JP',serif;font-size:clamp(60px,15vw,180px);font-weight:700;color:${d.becoming_color};pointer-events:none;user-select:none;letter-spacing:.05em;}
.hero-blob{position:absolute;pointer-events:none;border-radius:60% 40% 70% 30% / 50% 60% 40% 50%;animation:morph 12s ease-in-out infinite;}
.blob-1{top:-10%;left:-15%;width:50vw;height:50vw;}
.blob-2{bottom:-10%;right:-10%;width:40vw;height:40vw;animation-duration:16s;animation-direction:reverse;}
.blob-3{top:30%;right:5%;width:22vw;height:22vw;animation-duration:10s;animation-delay:3s;}
@keyframes morph{0%,100%{border-radius:60% 40% 70% 30%/50% 60% 40% 50%}33%{border-radius:40% 60% 30% 70%/60% 40% 60% 40%}66%{border-radius:70% 30% 50% 50%/40% 70% 30% 60%}}
.hero-content{position:relative;z-index:10;text-align:center;padding:2rem;max-width:900px;}
.hero-eyebrow{font-size:.78rem;letter-spacing:.25em;color:${d.label_color_hero};font-weight:500;margin-bottom:1.8rem;text-transform:uppercase;}
.hero-target-badge{display:inline-block;background:rgba(128,128,128,.08);border:1px solid rgba(128,128,128,.2);color:${d.accent};font-size:.8rem;padding:.4rem 1.2rem;border-radius:50px;letter-spacing:.08em;margin-bottom:1.5rem;}
.hero-subtitle{font-size:clamp(.9rem,1.4vw,1.1rem);color:${bodyTextWarm};font-weight:300;margin-bottom:1rem;letter-spacing:.04em;}
.hero-title{font-family:'Noto Serif JP',serif;font-size:clamp(1.8rem,4vw,3rem);font-weight:700;line-height:1.4;color:${d.hero_text_color};letter-spacing:.03em;margin-bottom:.8rem;}
.hero-title-sub{display:block;font-size:.62em;font-weight:300;color:${d.accent};margin-top:.5rem;letter-spacing:.05em;}
.hero-concept-badge{display:inline-block;background:linear-gradient(135deg,${d.primary},${d.accent});color:white;font-size:.82rem;padding:.5rem 1.5rem;border-radius:50px;letter-spacing:.1em;margin:1.5rem 0;}
.hero-main-copy{font-family:'Noto Serif JP',serif;font-size:clamp(1rem,2.2vw,1.45rem);font-weight:300;color:${d.dark};line-height:2.1;letter-spacing:.05em;margin-top:1.5rem;}
.hero-main-copy em{font-style:normal;font-weight:700;color:${d.primary};}
.scroll-hint{position:absolute;bottom:2rem;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:.5rem;color:${d.accent};font-size:.72rem;letter-spacing:.2em;animation:scrollAnim 2s ease infinite;}
.scroll-line{width:1px;height:36px;background:linear-gradient(to bottom,transparent,${d.accent});}
@keyframes scrollAnim{0%,100%{opacity:.4;transform:translateX(-50%) translateY(0)}50%{opacity:1;transform:translateX(-50%) translateY(-5px)}}

/* PROBLEM */
.section-problem{background:${d.bg_section2};color:${d.section2_text};padding:7rem 2rem;position:relative;overflow:hidden;}
.section-problem::before{content:'';position:absolute;top:0;left:0;right:0;height:5px;background:linear-gradient(90deg,${d.mid},${d.primary},${d.mid});}
.problem-inner{max-width:860px;margin:0 auto;}
.section-label{font-size:.72rem;letter-spacing:.28em;text-transform:uppercase;margin-bottom:2.5rem;font-weight:500;}
.s-label-dark{color:${d.label_color_dark};}
.s-label-light{color:${d.label_color_light};}
.problem-question{font-family:'Noto Serif JP',serif;font-size:clamp(1.5rem,3.2vw,2.2rem);font-weight:700;line-height:1.7;margin-bottom:3rem;white-space:pre-line;}
.problem-symptoms{display:grid;gap:1.1rem;margin-bottom:3.5rem;}
.symptom-item{display:flex;align-items:flex-start;gap:1.2rem;padding:1.3rem 1.7rem;background:rgba(255,255,255,.04);border-left:3px solid ${d.mid};border-radius:4px;}
.symptom-icon{font-size:1.25rem;flex-shrink:0;margin-top:.1rem;}
.symptom-text{font-size:.95rem;line-height:1.75;color:rgba(255,255,255,.82);}
.symptom-text strong{color:${d.light};display:block;margin-bottom:.25rem;}
.problem-closing{font-family:'Noto Serif JP',serif;font-size:1.15rem;line-height:2;color:rgba(255,255,255,.9);border-top:1px solid rgba(255,255,255,.1);padding-top:2.2rem;}

/* RIPPLE */
.section-ripple{padding:7rem 2rem;background:${d.bg_section3};overflow:hidden;}
.ripple-inner{max-width:940px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center;}
.ripple-heading{font-family:'Noto Serif JP',serif;font-size:clamp(1.3rem,2.5vw,1.9rem);font-weight:700;line-height:1.6;margin-bottom:1.4rem;color:${sectionLightText};}
.ripple-body{font-size:.95rem;color:${bodyTextWarm};line-height:1.9;}
.ripple-visual{height:360px;}

/* THREE HOLES */
.section-holes{padding:7rem 2rem;background:${d.bg_section4};}
.holes-inner{max-width:1000px;margin:0 auto;}
.holes-header{text-align:center;margin-bottom:4.5rem;}
.holes-title{font-family:'Noto Serif JP',serif;font-size:clamp(1.4rem,2.8vw,2.1rem);font-weight:700;line-height:1.5;color:${sectionLightText};margin-top:1rem;}
.holes-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.8rem;}
.hole-card{position:relative;padding:2.2rem 1.8rem;background:${isDark?'rgba(255,255,255,.04)':'white'};border-radius:${holeShape};box-shadow:0 4px 24px rgba(0,0,0,.06);text-align:center;transition:transform .3s ease;${isMonochrome?'border:2px solid #e0e0e0;':''}${d.id==='D2'?'border:1px solid rgba(255,255,255,.08);':''}}
.hole-card:hover{transform:translateY(-7px);}
.hole-number{font-size:2.8rem;font-weight:700;color:${d.light};font-family:'Noto Serif JP',serif;line-height:1;margin-bottom:.9rem;}
.hole-name{font-size:1rem;font-weight:700;color:${d.dark};margin-bottom:.9rem;font-family:'Noto Serif JP',serif;line-height:1.5;}
.hole-desc{font-size:.87rem;color:${bodyTextWarm};line-height:1.8;}
.hole-connector{position:absolute;top:50%;right:-1.2rem;width:1.2rem;height:2px;background:${d.light};}

/* CONCEPT */
.section-concept{background:${d.bg_concept};color:white;padding:7rem 2rem;position:relative;overflow:hidden;text-align:center;}
.concept-wm{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:clamp(50px,12vw,160px);font-weight:700;color:rgba(255,255,255,.04);font-family:'Noto Serif JP',serif;pointer-events:none;}
.concept-inner{max-width:760px;margin:0 auto;position:relative;z-index:2;}
.concept-statement{font-family:'Noto Serif JP',serif;font-size:clamp(1.2rem,2.6vw,1.85rem);font-weight:700;line-height:1.9;margin-bottom:2rem;white-space:pre-line;}
.concept-body{font-size:.97rem;line-height:2;color:rgba(255,255,255,.8);max-width:600px;margin:0 auto;}

/* AUTHOR */
.section-author{padding:7rem 2rem;background:${d.bg_author};}
.author-inner{max-width:940px;margin:0 auto;display:grid;grid-template-columns:340px 1fr;gap:4.5rem;align-items:center;}
.author-img{width:100%;aspect-ratio:3/4;background:linear-gradient(160deg,${d.mid} 0%,${d.primary} 60%,${d.dark} 100%);border-radius:${d.id==='D1'||d.id==='D5'?'30% 70% 60% 40%/40% 50% 60% 50%':'12px'};display:flex;align-items:flex-end;justify-content:center;padding-bottom:1.5rem;font-size:.8rem;color:rgba(255,255,255,.6);font-style:italic;filter:${isMonochrome?'grayscale(1)':'grayscale(.3)'};}
.author-name{font-family:'Noto Serif JP',serif;font-size:1.8rem;font-weight:700;color:${sectionLightText};margin:.7rem 0;}
.author-role{font-size:.85rem;color:${bodyTextWarm};margin-bottom:1.8rem;letter-spacing:.04em;}
.author-message{font-family:'Noto Serif JP',serif;font-size:1.05rem;line-height:2;color:${sectionLightText};font-weight:300;margin-bottom:1.8rem;font-style:italic;}
.author-body{font-size:.92rem;color:${bodyTextWarm};line-height:1.9;}

/* TESTIMONIALS */
.section-test{padding:7rem 2rem;background:${d.bg_test};color:${d.section2_text};}
.test-inner{max-width:1000px;margin:0 auto;}
.test-header{text-align:center;margin-bottom:3.5rem;}
.test-title{font-family:'Noto Serif JP',serif;font-size:clamp(1.3rem,2.3vw,1.8rem);font-weight:700;margin-top:.9rem;}
.test-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:1.4rem;}
.test-card{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:10px;padding:1.8rem;}
.test-quote{font-size:.92rem;line-height:1.9;color:rgba(255,255,255,.84);margin-bottom:1.3rem;font-style:italic;}
.test-quote::before{content:'「';color:${d.mid};font-size:1.3rem;font-family:'Noto Serif JP',serif;}
.test-quote::after{content:'」';color:${d.mid};font-size:1.3rem;font-family:'Noto Serif JP',serif;}
.test-person{display:flex;align-items:center;gap:.9rem;}
.test-avatar{width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,${d.mid},${d.dark});display:flex;align-items:center;justify-content:center;font-size:.72rem;color:white;font-weight:700;flex-shrink:0;}
.test-name{font-size:.88rem;font-weight:700;}
.test-role{font-size:.76rem;color:${d.mid};margin-top:.15rem;}

/* CTA */
.section-cta{padding:8rem 2rem;background:${d.bg_cta};text-align:center;position:relative;overflow:hidden;}
.cta-inner{position:relative;z-index:2;max-width:680px;margin:0 auto;}
.cta-heading{font-family:'Noto Serif JP',serif;font-size:clamp(1.4rem,3.2vw,2.3rem);font-weight:700;color:${isDark?d.light:d.dark};line-height:1.5;margin-bottom:1.3rem;white-space:pre-line;}
.cta-body{font-size:.97rem;color:${isDark?'rgba(200,230,195,.9)':d.dark};line-height:1.9;margin-bottom:2.8rem;opacity:.85;}
.cta-btn{display:inline-block;background:${d.btn_bg};color:white;padding:1.1rem 3.2rem;border-radius:50px;font-size:.97rem;font-weight:700;letter-spacing:.1em;text-decoration:none;box-shadow:0 8px 28px rgba(0,0,0,.25);transition:all .3s ease;}
.cta-btn:hover{background:${d.btn_hover};transform:translateY(-3px);}
.cta-note{margin-top:1.3rem;font-size:.78rem;color:${isDark?'rgba(165,213,167,.7)':d.dark};opacity:.65;}

/* FOOTER */
footer{background:${d.footer_bg};color:rgba(255,255,255,.35);text-align:center;padding:2rem;font-size:.76rem;letter-spacing:.06em;}

/* FADE */
.fi{opacity:0;transform:translateY(20px);transition:opacity .75s ease,transform .75s ease;}
.fi.vis{opacity:1;transform:none;}

/* RESPONSIVE */
@media(max-width:768px){
  .ripple-inner,.author-inner{grid-template-columns:1fr;gap:2rem;}
  .holes-grid,.test-grid{grid-template-columns:1fr;}
  .hole-connector{display:none;}
}
</style>
</head>
<body>

<nav>
  <div class="nav-logo">熱量あふれる組織のつくり方</div>
  <div class="nav-badge">${t.label}</div>
  <a href="#cta" class="nav-cta">書籍を見る</a>
</nav>

<section class="hero">
  ${blobHtml(d)}
  <div class="hero-bg-becoming">Becoming</div>
  <div class="hero-content">
    <p class="hero-eyebrow">Pattern ${String(p.n).padStart(2,'0')} · ${t.en} · Concept ${p.concept} · ${d.label} · ${toneLabel}</p>
    <div class="hero-target-badge">${t.label} へ</div>
    <p class="hero-subtitle">${t.pain_short}あなたへ</p>
    <h1 class="hero-title">
      熱量あふれる組織のつくり方
      <span class="hero-title-sub">──数字の呪縛（お金の思い込み）からの解放</span>
    </h1>
    <div class="hero-concept-badge">${c.badge}</div>
    <p class="hero-main-copy">${nl2br(getPainHeadline(t, p.tone))}</p>
    <p style="margin-top:1.2rem;font-size:.9rem;color:${d.accent};letter-spacing:.05em;">${c.hero_sub}</p>
  </div>
  <div class="scroll-hint"><div class="scroll-line"></div>SCROLL</div>
</section>

<section class="section-problem">
  <div class="problem-inner">
    <p class="section-label s-label-dark">The Problem · 問題の構造</p>
    <h2 class="problem-question fi">${nl2br(getPainHeadline(t, p.tone))}</h2>
    <div class="problem-symptoms fi">${symptomList(t.symptoms)}</div>
    <p class="problem-closing fi">${t.closing}</p>
  </div>
</section>

<section class="section-ripple">
  <div class="ripple-inner">
    <div class="fi">
      <p class="section-label s-label-light">The Shift · 構造の転換</p>
      <h2 class="ripple-heading">ピラミッドが<br>「波紋」に変わるとき</h2>
      <p class="ripple-body">
        従来の組織は、命令と管理のピラミッド構造で動いてきました。しかし${c.badge}の視点から見ると、
        その構造こそが熱量を奪う根本原因です。<br><br>
        マネーバイアスを外したとき、組織は生命体のように変容します。
        一人ひとりの熱量が石を投じた水面のように広がり、共鳴し増幅していく——
        それが「有機的組織」の姿です。
      </p>
    </div>
    <div class="ripple-visual fi">${rippleSvg(d)}</div>
  </div>
</section>

<section class="section-holes">
  <div class="holes-inner">
    <div class="holes-header fi">
      <p class="section-label s-label-light">Three Breakthroughs · 3つの突破口</p>
      <h2 class="holes-title">${nl2br(c.badge.replace('する', 'するための'))}<br>3つのパラダイムシフト</h2>
    </div>
    <div class="holes-grid">${holeCards(c.holes, d)}</div>
  </div>
</section>

<section class="section-concept">
  <div class="concept-wm">Breakthrough</div>
  <div class="concept-inner">
    <p class="section-label" style="color:${d.light};letter-spacing:.28em;font-size:.72rem;text-transform:uppercase;margin-bottom:2.2rem;">Core Concept · 核心</p>
    <h2 class="concept-statement fi">${nl2br(c.concept_statement_1)}</h2>
    <h3 class="fi" style="font-family:'Noto Serif JP',serif;font-size:clamp(1rem,2vw,1.4rem);font-weight:300;line-height:1.9;margin-bottom:2rem;opacity:.9;white-space:pre-line;">${nl2br(c.concept_statement_2)}</h3>
    <p class="concept-body fi">${c.concept_body}</p>
  </div>
</section>

<section class="section-author">
  <div class="author-inner">
    <div class="fi">
      <div class="author-img">── 再生リゾートにて ──</div>
    </div>
    <div class="fi">
      <p class="section-label s-label-light">Author · 著者より</p>
      <div class="author-name">著者名</div>
      <div class="author-role">組織変革コンサルタント / 熱量循環研究家</div>
      <p class="author-message">
        「数字を追うことを止めたとき、<br>
        はじめて本当の経営が始まりました。」
      </p>
      <p class="author-body">
        廃業寸前の旅館を再生したとき、私が学んだのは「数値目標を外す」という逆説でした。
        売上を諦めた瞬間に、スタッフの目が輝き始め、お客様が戻ってきた。
        その体験が、マネーバイアスという概念と出合うきっかけでした。<br><br>
        経営の現場で20年間向き合ってきた「なぜ正しいことをしているのに、
        組織は疲弊するのか」という問いへの、私なりの答えをここに記しました。
      </p>
    </div>
  </div>
</section>

<section class="section-test">
  <div class="test-inner">
    <div class="test-header fi">
      <p class="section-label s-label-dark">Voices · 読者の声</p>
      <h2 class="test-title">呪縛から解放された、<br>${t.label}の声</h2>
    </div>
    <div class="test-grid">${testimonialCards(t.testimonials)}</div>
  </div>
</section>

<section class="section-cta" id="cta">
  <div class="cta-inner">
    <p class="section-label s-label-light" style="margin-bottom:1.8rem;">Get the Book · 書籍情報</p>
    <h2 class="cta-heading fi">${nl2br(t.cta_heading)}</h2>
    <p class="cta-body fi">${t.cta_body}</p>
    <a href="#" class="cta-btn">書籍の詳細を見る →</a>
    <p class="cta-note">※ 発売情報・先行読者登録はこちらから</p>
  </div>
</section>

<footer>
  <p>© 2026 熱量あふれる組織のつくり方 All Rights Reserved.</p>
  <p style="margin-top:.4rem;font-size:.7rem;opacity:.5;">
    Pattern ${String(p.n).padStart(2,'0')} · ${t.label} · Concept ${p.concept}（${c.label}）· ${d.label} · ${toneLabel}
  </p>
</footer>

<script>
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('vis'); });
}, {threshold:.1});
document.querySelectorAll('.fi').forEach(el => obs.observe(el));
</script>
</body>
</html>`;
}

// ─── 生成実行 ────────────────────────────────────────────────────
let generated = 0;
let skipped = 0;

PATTERNS.forEach(p => {
  // #01は既存なのでスキップ
  if (p.n === 1) { skipped++; return; }

  const filename = `lp-${String(p.n).padStart(2,'0')}-target${p.target}-concept${p.concept}-design${p.design}-tone${p.tone}.html`;
  const filepath = path.join(outputDir, filename);
  const html = generateHTML(p);
  fs.writeFileSync(filepath, html, 'utf-8');
  generated++;
  console.log(`✓ ${filename}`);
});

console.log(`\n✅ 生成完了: ${generated}ファイル生成 / ${skipped}ファイルスキップ（既存）`);
