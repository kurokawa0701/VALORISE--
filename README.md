# VALORISE コーポレートサイト（黒基調・複数ページ版）

HTML/CSS/JavaScript のみ。ビルドツール・フレームワーク不使用で、Cloudflare Pages にそのままアップロードできます。

## ファイル構成

```
index.html      HOME（ヒーロー／90%モデル／ABOUT／FOUR REASONS／SERVICE／回遊カード／CTA）
company.html    COMPANY（会社概要／運営会社／MEMBER／アクセス）
service.html    SERVICE（3事業／新サービス／技術領域／依頼の流れ）
recruit.html    RECRUIT（3つの数字／FOUR REASONS／募集要項／選考フロー）
news.html       NEWS（カテゴリ絞り込み／記事一覧／LOAD MORE）
qa.html         Q&A（3カテゴリのアコーディオン）
contact.html    CONTACT（お問い合わせフォーム）
privacy.html    プライバシーポリシー（仮ページ）
style.css       デザイントークン＋全ページ共通スタイル
script.js       モバイルドロワー／フォーム検証／スクロール演出
```

既存の `index.html` のトーンを基準に下層ページを追加したものです。既存セクションの見た目は変更していません。変更したのはリンク先（`#アンカー` → `.html`）と、`main` への `id="main"`、スキップリンクの追加のみです。

## デザインの方針と、なぜその値か

- **黒基調のまま**：`--bg: #000` を土台に、面の区切りは背景色ではなく `--bg-panel: #0b0d0f` と 1px 罫線（`--line`）で作ります。下層ページで白基調に切り替えると、HOME と別サイトに見えてしまうためです。
- **英字は Barlow Condensed、和文は Noto Sans JP**。数字・ラベル・ナビゲーションはすべて英字フォント側に寄せ、和文は本文に限定しています。文字の大小と字間（`letter-spacing`）で強弱をつけ、`font-weight` は 500〜700 に収めています。
- **セクション余白は3段階**（`--sec-lg` 140px ／ `--sec-md` 108px ／ `--sec-sm` 76px）。重要度の低いセクションほど狭くしています。SERVICE の「主軸を支える3つの事業」や各ページの「流れ」を `--sec-sm` にしているのは、主軸事業より下の階層だと視覚的に示すためです。
- **角丸ゼロ**。全ページで `border-radius` を使っていません。既存 HOME が角丸なしで統一されているためです。
- **`@keyframes` はゼロ**。動きはすべて `transition` で処理しています（スクロール演出・アコーディオンの＋記号・ボタンのホバー）。演出を増やしたくなった場合も、`data-r` / `data-delay` の遅延の組み合わせで対応してください。
- **セクションの型を連続させない**：仕様表（`spec-table`）→ 非対称2カラム（`feature` 5fr:7fr）→ 大きなコピー1行（`statement`）→ 行リスト（`row-list`）→ CTA、のように型を切り替えています。SERVICE の2つ目の `feature` は `feature--rev`（7fr:5fr）で左右を反転させています。
- **カードグリッドは1ページ1回まで**。`reason-grid` は HOME と RECRUIT に1回ずつだけです。
- **JSが動かなくても崩れない**：`data-r` / `data-fade` / `data-bar` は、JS が `js-reveal` クラスを付けるまで通常表示のままです。JS無効・`prefers-reduced-motion`・非表示タブでは演出なしで全要素が見えます。
- **Q&A は `<details>` / `<summary>`** で実装。JS なしで開閉します。
- **日本語の改行**：`body` に `word-break: auto-phrase` を指定し、自動折り返しが文節単位で起きるようにしています（「宣伝文句にな／ります」のような語中改行を防ぐ）。Chromium系のみ有効で、Safari・Firefox では通常の折り返しにフォールバックします。そのうえで、各ページのリード文（`.page-head__lead`）と `.statement` には**文の切れ目に手動で `<br>`** を入れています。`<br>` を入れたリードには `.page-head__lead--wide`（max-width 46em）を併用しないと、34em で先に折り返してしまうので注意してください。

## COMPANY の MEMBER セクションについて

「数字を出せない会社は、数字で語らない。」の休憩セクションの直後、ACCESS の前に置いています（`#member`）。**縦写真＋横テキストの行リスト**で組んでいます。

当初は RECRUIT に置いていましたが、COMPANY へ移しました。「会社概要 → 運営会社の考え方 → 単価開示の宣言 → **その判断をしている人たち** → 所在地」という流れになり、宣言のすぐ後に責任者の顔が来ます。NEWS の人事お知らせからも `company.html#member` へリンクしています。

- **写真**：現在は枠と斜線テクスチャだけです。`.member__photo` 内の `<span class="bg bg--hero-lines"></span>` を削除し、`<img src="assets/member-01.jpg" alt="…" width="600" height="800" decoding="async" loading="lazy">` に置き換えてください。**3:4（縦長）でトリミングされます。**
- **白黒／カラーの切り替え**：`style.css` の `.member__photo img` に `filter: grayscale(1) contrast(1.04)` を指定しています。**カラー写真をそのまま入れても白黒で表示される**ので、まず全員分を入れてから、この1行を消してカラーでも配色が成立するか確認してください。一部だけカラーにするのは避けてください（列が不揃いに見えます）。
- **写真が未定のメンバーを載せる場合**は、`.member__photo` の中に `<span class="bg bg--hero-lines"></span><span class="member__soon">COMING SOON</span>` を入れると、枠だけの状態で成立します。写真が届いたらこの2つの `<span>` を削除して `<img>` に差し替えてください。
- **並び順**：事業部長 → CTO → プロジェクトエグゼクティブ → AIプロダクト開発責任者 → DX・マーケティング統括責任者。事業・技術・請負・AI開発・AI運用の順で、読み進めるほど「少人数で回せている理由」に寄っていく構成にしています。
- **堀江誠二さんの写真が未設置**です（COMING SOON 表示中）。3:4の縦写真をご用意ください。

## NEWS ページについて

[スペースデータのお知らせページ](https://spacedata.jp/news)の構成（カテゴリ絞り込みチップ → 左サムネイル＋右テキストの横長カード → LOAD MORE）を参考に、VALORISE の黒基調・角丸ゼロのトークンで組み直したものです。

ページは2セクション構成です。**同じ型を連続させないため、2つで表示形式を変えています。**

### 1. TOPICS（お知らせ）— `#topics`

YouTube以外の発表を置く場所です。プレスリリース、採用情報、サイト更新など。**日付＋カテゴリ＋見出し＋本文の行リスト**で、サムネイルはありません。下の動画セクションと同じ横長カードにすると、同じ型が2回続いて単調になるためです。

- **追加方法**：`.topic-list` の先頭に `<article class="topic">` ブロックをコピーし、日付・カテゴリ・見出し・本文を書き換えます。JS・CSSの変更は不要です。
- **カテゴリの文言は自由**です。絞り込み機能は付けていないので、`.topic__cat` の中身を好きに書けます（現在は「サイト」「プレスリリース」「採用情報」「お知らせ」）。
- 件数が増えて長くなったら、`.topic-list` を `<div class="topic-list" id="topic-list">` にして `script.js` の LOAD MORE と同じ仕組みを流用できます。

### 2. MOVIE（動画）— `#movie`

**[YouTube公式チャンネル](https://www.youtube.com/@VALORISE2026-5) の全12本**（2026/05/22〜2026/08/07、毎週金曜19:00 JST 公開）。日付・タイトル・尺はチャンネルから取得した実データ、説明文は各動画の目次（チャプター）に基づいてこちらで要約したものです。背景を `--bg-panel` にして TOPICS と面で区切っています。

- **動画の追加**：`#news-list` の先頭に `<article class="news-item" data-cat="…" data-r>` を1件足します。`data-cat` は `ai` / `pay` / `career` / `work` のいずれか。カテゴリを増やす場合は `#news-filter` にボタンを1つ足し、`data-filter` を合わせてください。JS 側の変更は不要です。
- **サムネイル**：`https://i.ytimg.com/vi/<動画ID>/hqdefault.jpg` を直接読み込んでいます（YouTube からのホットリンク）。`hqdefault` は 4:3 ですが、CSS の 16:9 枠に `object-fit: cover` で収めているため、上下の黒帯がちょうど切り落とされます。自社サーバーに持ちたい場合は画像を `assets/` に保存し、`src` を差し替えてください。
- **リンク先**：サムネイルと「YouTubeで見る」がどちらも動画ページに直接飛びます。記事詳細ページは作っていません。
- **表示件数**：`script.js` の `STEP = 5` で初期表示件数と LOAD MORE の追加件数を変えられます。
- **JS 無効時**：絞り込みチップは非表示のまま、動画は全件表示されます。LOAD MORE ボタンも出ません。

## 触ってはいけない前提

- 見出しに `font-weight: 900` を使わない（500〜700に制限）。強弱は文字サイズ・余白・背景で表現する。
- `border-radius` を新しく増やさない（現在ゼロ）。
- `@keyframes` を追加しない（現在ゼロ）。演出は `transition` と `data-delay` で作る。
- カードグリッド（`.reason-grid`）を1ページで2回以上使わない。
- セクションの `padding` を直接 px で書かず、`.section` / `.section--lg` / `.section--sm` を使う。同じ余白が半数を超えたら設計ミス。
- インラインスタイルを書かない。微調整が必要になったらユーティリティクラスを足す。

## 公開前に必須の対応（TODO：必須）

1. **画面上の `※要差し替え` バッジはすべて削除済みです。** 会社情報（設立・資本金・役員・社員数・所在地・電話番号・ISO認証・派遣事業許可）は運営会社の[会社情報ページ](https://neighborengineers.jp/company/)の記載を反映しました。ただし**次の項目は「情報が無いまま画面から消えている」状態**で、警告表示は出ません。公開前に必ず追記してください。
   - **recruit.html：勤務時間・休日休暇の行を削除しています。** 募集要項として本来必要な項目なので、`<dl class="spec-table">` 内に `<div><dt>HOURS</dt><dd>…</dd></div>` の形で行を追加してください。試用期間の記載も外しています。
   - **recruit.html：BENEFITS が「社会保険完備」のみ**です。資格支援制度・報奨金など実際の制度を追記してください。
   - **privacy.html：制定日・最終改定日の行を削除しています。** プライバシーポリシーには通常必要です。文末に追記してください。
   - **privacy.html：個人情報保護管理者の記載がありません。** 開示請求の窓口は住所・電話まで入っていますが、管理者の部署名・氏名は未記載です。
   - **privacy.html：Cookieの説明が一般論のみ**です。Google Analytics 等を導入する場合はツール名とオプトアウト方法を明記してください。
   - **service.html / index.html：技術スタックは想定ベース**です。実案件で使用している技術に精査してください。
   - **service.html「02 コンサルティング事業」の本文は私が書いたドラフト**です。堀江誠二さんの経歴（IT/OTコンサル11年、製造・物流領域のDX、構想から事業化まで）を根拠に組み立てていますが、実際のサービス内容と食い違っていないか確認してください。
   - **社員数は「2025年7月現在」の数値**です（company.html）。最新の数字に更新してください。
   - **recruit.html の MEMBER 紹介文5件は、役割から推定して書いたドラフトです。** 前職・実績・具体的な数字は一切使っていませんが、実在の方についての記述なので、**公開前に必ずご本人の確認を取ってください。**
   - **`assets/member-enoya-hold.jpg` が宙に浮いています。** 榎屋さんの写真を600×800に切り出したものですが、掲載枠が未定のため HTML には入れていません。掲載する場合は誰と入れ替えるか、役職は何かを決めてください。掲載しない場合はこのファイルを削除してください（未使用のまま公開されます）。
   - **COMPANY の ACCESS に写真がありません。** 築地オフィスの外観写真があれば `--preset wide --out access.jpg` で処理して追加できます（現在は住所のテキストのみ）。
   - **news.html の TOPICS 4件はすべてサンプルです。** 日付・見出し・本文とも実在の発表ではありません。公開前に実際のお知らせへ差し替えてください。
   - **news.html の MOVIE の説明文は、各動画の目次から要約したドラフトです。** 動画そのものは視聴していないため、内容と食い違っていないか確認してください。日付・タイトル・尺は実データです。
   - **news.html のサムネイルは YouTube からのホットリンク**です。動画を非公開にすると画像も表示されなくなります。

   なお CSS の `.todo` / `.stack__todo` クラスは残してあります。今後 未確定項目を画面上で目立たせたい場合は `<span class="todo">※要差し替え</span>` を書けばそのまま使えます。
2. **プライバシーポリシー本文** — `privacy.html` は仮の文面です。ネイバーズ株式会社の正式な内容に、法務確認のうえ差し替えてください。現在 `<meta name="robots" content="noindex">` を入れてあります。差し替え後に外してください。
3. **お問い合わせフォームの送信先** — `script.js` は現在バリデーションのみで、送信処理は未接続です。該当箇所に TODO コメントがあります。Formspree 等のフォームAPI、またはサーバーレス関数へ `fetch()` で接続してください。
4. **SNSリンク** — フッターの ZENN / X はドメイントップに向いています。実アカウントURLに差し替えてください。
5. **`company.html` の BUSINESS 欄に「教育事業」「地域特化型集客支援」が残っています。** `service.html` からは両方とも削除したため、2ページ間で記載が食い違っています。会社の事業としては残すのか、サイト全体から外すのかを決めてください。
6. **index.html の技術スタック** — `※要差し替え` が残っています。service.html 側は実案件ベースの想定で記載しているので、内容を突き合わせて統一してください。

## 推奨（必須ではない）

- OGP画像・favicon の設置（現在なし）。
- 各ページの `meta description` は仮の文面です。実際の訴求に合わせて調整してください。
- 写真素材を入れる場合は、1枚 400KB 以内・1ページ 2.5MB 以内を目安に。`<img>` には `alt` / `width` / `height` / `decoding="async"` / `loading="lazy"` を必ず付けてください（ファーストビューのみ `fetchpriority="high"` で lazy を外す）。

## 検証したこと・していないこと

- 監査スクリプト（コントラスト比、リンク切れ、タグの整合性、見出しレベル、未定義アンカー、インラインスタイルの有無、余白の均一度、角丸・keyframes の種類数）を全7ページに対して実行し、**NG 0件・WARN 0件** を確認済みです。
- **実ブラウザでのレンダリング確認はできていません。** 本セッションの環境からブラウザを起動できませんでした。お手元でファイルを開いて、レイアウト崩れがないか確認してください。特に以下は目視推奨です。
  - スマートフォン幅（375px）での見出しの折り返し
  - COMPANY / RECRUIT の仕様表（`spec-table`）のラベル列（デスクトップ 224px 固定）
  - CONTACT フォームの送信ボタン押下時のエラー表示
  - SERVICE の非対称2カラム（5fr:7fr と 7fr:5fr）の左右バランス

## 画像の用意（tools/）

画像用のスクリプトは、公開ディレクトリを汚さないよう**このフォルダの外**（`../tools/`）に置いています。Cloudflare Pages / GitHub Pages にアップロードするのは `valorise/` の中身だけです。

```
tools/make_ogp.py           OGP画像を直接描画（生成AI不要・APIキー不要）※実行済み
tools/images.json           画像スロットの定義（ファイル名・寸法・容量上限・プロンプト）
tools/generate_images.py    OpenAI gpt-image-1 で生成 → トリミング → 圧縮 → assets/ へ
tools/optimize_photo.py     実写をトリミング → 圧縮 → assets/ へ（生成はしない）
tools/1_check.bat           ダブルクリック用。Pythonとプロンプトの確認（API課金なし）
tools/2_generate.bat        ダブルクリック用。generate_images.py を実行
tools/requirements.txt      openai / pillow
```

### OGP画像（作成済み）

`assets/ogp.jpg`（1200×630 / 67KB）を `tools/make_ogp.py` で生成済みです。**生成AIもAPIキーも使っていません。** 黒背景・上部の冷たいグロー・縦の細線という、サイト本体と同じ要素だけで Pillow が直接描画しています。文言や配色を変えたい場合はスクリプト冒頭の定数を編集して再実行してください。

```bash
python tools/make_ogp.py
```

**書体について**：サイトのロゴは Barlow Condensed ですが、生成環境に無かったため近い condensed 系フォントで代用しています。ヘッダーのロゴと完全に一致させたい場合は、[Google Fonts](https://fonts.google.com/specimen/Barlow+Condensed) から `BarlowCondensed-Bold.ttf` を取得して `tools/` に置き、再実行してください。スクリプトが自動でそちらを優先します。

**OGPのURLについて**：全8ページの `<head>` に `og:` / `twitter:` タグを追加しました。`og:url` と `og:image` は **`https://valorise.jp` 決め打ち**です。独自ドメインが異なる場合は、全ページを一括置換してください。相対パスではSNSのクローラが画像を取得できないため、絶対URLである必要があります。

### 使い方

```bash
pip install -r tools/requirements.txt
export OPENAI_API_KEY="sk-..."        # Windows は set / $env:OPENAI_API_KEY

python tools/generate_images.py --list       # スロット一覧
python tools/generate_images.py --dry-run    # プロンプト確認（APIを呼ばない）
python tools/generate_images.py              # 生成対象5件をまとめて生成
python tools/generate_images.py --only hero --force

# 実写（MEMBER・オフィス外観）
python tools/optimize_photo.py 撮影/haida.jpg --preset member --out member-01.jpg
python tools/optimize_photo.py 撮影/office.jpg --preset wide --out access.jpg
```

いずれも **1枚 400KB 以内**に収まるよう、品質を段階的に落として保存します。それでも超える場合は寸法を縮小し、その旨を警告として出します（HTML の `width`/`height` も合わせて直してください）。

### 設置済みの画像

| ファイル | 使用箇所 | 寸法 | 容量 |
|---|---|---|---|
| `assets/logo-mark.png` | index ヒーローのエンブレム | 840×840 | 145KB |
| `assets/service-dev.jpg` | service 01 システム開発 | 1200×800 | 63KB |
| `assets/service-consulting.jpg` | service 02 コンサルティング事業 | 1200×800 | 96KB |
| `assets/service-infra.jpg` | service 03 インフラ事業 | 1200×800 | 119KB |
| `assets/member-01/02/04/05.jpg` | recruit MEMBER 4名 | 600×800 | 各70〜93KB |
| `assets/ogp.jpg` | 全ページ OGP | 1200×630 | 67KB |

**TOPページの背景はすべてCSSです。写真は使っていません。** ヒーローの視覚的な主役はブランドエンブレム（`assets/logo-mark.png`）で、右側に大きく配置しています。

| クラス | 役割 |
|---|---|
| `.bg--hero` | 右上からの冷たいグロー＋上下のグラデーション |
| `.bg--hero-lines` | 細い縦線 |
| `.scrim--bottom` | 下方向を暗く落とす |
| `.hero__mark` | エンブレム。`clamp(180px, 24vw, 420px)`。1000px以下では見出しの下へ移動 |
| `.bg--about` | 45度のグラデーション＋右上の淡いグロー |
| `.bg--about-edge` | 斜めに差し込む光の帯。右半分だけに出す |
| `.bg--about-lines` | 115度の斜線 |

一度AI生成の写真（夜のビル、コンクリート、オフィスで議論する3人）を試しましたが、いずれも撤去しました。建築物は構造が破綻し、人物写真（`community.jpg`）は**生成AIで作られた実在しない3人**だったためです。TOPに写真を入れ直す場合は実写を推奨します。

**バーや光の帯は等間隔にしていません。**均等に並べると「よくあるテック背景」に見えるため、間隔と濃度を意図的にばらつかせています。数値を触る場合もこの点は保ってください。

白文字とのコントラストは、文字が載る領域を計算して **ヒーロー左下 17.8:1 / ABOUT 左半分 16.8:1** を確認済みです（基準は本文4.5:1）。グラデーションの数値を変えたら再計測してください。

**ロゴについて**：`assets/logo-icon.png`（1080×1080）は背景が黒で塗りつぶされた画像で、透過されていません。写真の上に置くと黒い四角が見えるため、黒を抜いて透過PNG化し、176pxに縮小した `assets/logo-mark.png`（10KB）を作ってヒーローで使っています。作り直す場合は `logo-icon.png` が元データです。`logo-lockup-web.png` は白背景なので、この黒基調のサイトではそのまま使えません。

**ヘッダーのロゴは今も文字**（Barlow Condensed の「VALORISE」）です。エンブレム画像に差し替えることもできますが、ヘッダーは全ページに出るので、切り替えると印象がかなり変わります。

**未使用ファイル**：`assets/hero.jpg`、`assets/about.jpg`、`assets/community.jpg`、`assets/member-enoya-hold.jpg`、`assets/logo-lockup-web.png` はどこからも参照されていません。`logo-icon.png`（エンブレムの元データ）は残してください。

SERVICE の2枚は `.feature__aside` の上部にパネルの罫線まで見開きで配置しています（`.feature__photo`）。`height: auto` を必ず併記してください。書かないとHTMLの `height` 属性が残り、`aspect-ratio` が無視されます。

`assets/member-enoya-hold.jpg` は榎屋さんの切り出し済み写真です。掲載枠が未定のため、どこからも参照していません。

### AI生成するもの / しないもの

**生成する（5件）**：`hero.jpg`（indexヒーロー背景）、`about.jpg`（ABOUT背景）、`service-infra.jpg`、`service-dev.jpg`、`ogp.jpg`（OGP）。

いずれも**人物・文字・ロゴを含まない抽象的な背景**に限定しています。プロンプトには文字の載る側を暗く空けるよう指定を入れてあり（ヒーローは左下、ABOUTは左半分）、これを外すと本文が読めなくなります。OGPの「VALORISE」の文字は、AIに書かせず PIL で合成しています（AIは文字を正しく描けないため）。`tools/` に `BarlowCondensed-Bold.ttf` を置くとロゴと同じ書体で合成されます。無い場合は文字合成をスキップして警告します。

**生成しない（6件）**：

- `access.jpg` — 実在するビル（築地2-12-10 ビルネット築地ビル）の写真である必要があります。生成すると存在しない建物になり、記載住所と矛盾します。
- `member-01〜05.jpg` — 実在の社員です。AI生成画像を本人として掲載すると閲覧者を誤導します。

`service-infra.jpg` / `service-dev.jpg` は生成対象に入れていますが、**実際に構築した構成図やコンソール画面のキャプチャがあればそちらを使ってください。**生成画像はあくまで代替です。

## デプロイ（Cloudflare Pages）

1. Cloudflare ダッシュボード → Pages → 新規作成 → 「直接アップロード」でこのフォルダ一式をドラッグ＆ドロップ
2. 独自ドメインをカスタムドメインとして接続
3. 上記「公開前に必須の対応」を反映後、正式公開
