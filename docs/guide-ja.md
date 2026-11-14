# Technical English Companion 日本語ガイド

[中文](../README.md) · [Español](guide-es.md) · [한국어](guide-ko.md)

このプラグインは、Codex または DeepSeek Harness（DSH）で作業を進めながら、ソフトウェア開発の専門英語に慣れるためのものです。バージョン `3.0.0` は、macOS 上で中国語、スペイン語、日本語、韓国語を使うユーザーを対象としています。DSH の検証範囲は `0.2.2-rc.1` の専用入口と Flash／High です。

旧識別子 `technical-terms-en-zh` または `dsh-plugin-technical-terms-en-zh` を使用している場合は、旧版を無効にしてから `technical-english-companion` または `dsh-plugin-technical-english-companion` を有効にします。一つだけを有効にしてください。日常の環境を保ったまま、以下の手順を独立した環境で利用できます。

## ダウンロード

[v3.0.0 公開ページ](https://github.com/Calliope-Nicles/technical-english-companion/releases/tag/v3.0.0) · [Codex 用 ZIP](https://github.com/Calliope-Nicles/technical-english-companion/releases/download/v3.0.0/technical-english-companion-3.0.0.zip) · [DSH 用 TGZ](https://github.com/Calliope-Nicles/technical-english-companion/releases/download/v3.0.0/dsh-plugin-technical-english-companion-3.0.0.tgz) · [検証用ハッシュ一覧](https://github.com/Calliope-Nicles/technical-english-companion/releases/download/v3.0.0/SHA256SUMS)

## 動作

説明文は会話の言語に合わせます。選ばれた専門用語は英語で表記し、各回答の最初の登場時に、その回答の言語による短い意味を添えます。表記の例は `Cache（キャッシュ）` です。同じ回答内で再び登場するときは `Cache` を使い、次の回答では最初に意味を添え直します。

回答言語や表記方法を明示的に指定できます。「今回の回答だけ」という指定は次の回答へ持ち越さず、「今後は」という指定は指定された範囲で継続します。コード、コマンド、パス、原文の引用はそのまま保ちます。

## Mac 版 Codex へのインストール

1. 共通 ZIP `technical-english-companion-3.0.0.zip` を入手して展開します。`.tgz` は DSH 専用です。
2. Codex のプラグイン画面から、展開したフォルダーの絶対パスを使ってプラグインマーケットを追加します。そのフォルダーには `.codex-plugin/plugin.json` と `.agents/plugins/marketplace.json` が必要です。
3. 配布元 `Technical English Companion` から `technical-english-companion` をインストールし、バージョンが `3.0.0` で有効になっていることを確認します。このプラグインは一つの配布元だけを有効にします。
4. フック設定で `SessionStart` を確認します。コマンドが `/bin/cat` を使い、インストール先の `src/terminology.md` を読むことを確認し、内容を確認したうえでフックを信頼します。
5. 新しい会話を開いて動作を確認します。

Codex 公式ドキュメント：[パッケージとローカル配布](https://developers.openai.com/plugins/build/plugins)、[フックの確認と信頼](https://learn.chatgpt.com/docs/hooks)。

## Mac 版 DSH へのインストール

この版の検証環境は macOS の DSH `0.2.2-rc.1` です。フォルダーへのリンクではホストのインターフェースを解決できないため、`.tgz` を展開せずに使います。

1. `dsh-plugin-technical-english-companion-3.0.0.tgz` を展開せずに保存します。
2. ターミナルで、`DSH_HOME` の値を独立したテスト用フォルダーに、アーカイブのパスを実際の保存先に置き換えて実行します。

```sh
export DSH_HOME="/absolute/path/to/isolated-dsh"
companion_dsh="/Applications/DeepSeek Harness.app/Contents/Resources/runtime/cli/bin/dsh"
"$companion_dsh" plugin --profile headless add "/absolute/path/to/dsh-plugin-technical-english-companion-3.0.0.tgz" --offline --ignore-scripts
"$companion_dsh" plugin --profile headless list --depth 0
```

3. 一覧に `dsh-plugin-technical-english-companion` とバージョン `3.0.0` があることを確認します。インストールだけでは、専用入口は有効になりません。
4. 既存の Responses API（構造化した要求と回答を扱うインターフェース）接続と、Credential reference（DSH に保存済みの認証情報を指す名前）が必要です。アプリへのログインだけでは、この条件を満たすとは限りません。対応する接続と名前がなければ、この入口は利用できません。追加アカウントの作成は不要です。
5. 次の内容で `$DSH_HOME/companion-test.yml` を作成します。保存先を既存の認証情報ファイルのパスに、接続先を対応するサービスのアドレスに、`EXISTING_CREDENTIAL_REFERENCE` を既存の名前に置き換えます。`apiKeyEnv` に指定するのは名前であり、秘密のキー自体ではありません。認証情報ファイルの内容はコピーしません。

```yaml
- id: credentials
  disabled: false
  config:
    path: "/absolute/path/to/existing/.credentials.yaml"
- id: agent-default-model
  config:
    provider: technical-english-companion-deepseek
    model: deepseek-flash
- id: technical-english-companion-responses
  config:
    baseURL: "https://api.deepseek.com"
    apiKeyEnv: EXISTING_CREDENTIAL_REFERENCE
```

6. テスト用の作業フォルダーで最初の質問を実行します。実際の要求は既存アカウントの課金対象です。この入口は Flash の High 設定を使い、回答全体を受け取ってから表示します。自動修正のための追加要求は行いません。

```sh
companion_pkg="$DSH_HOME/profiles/headless/node_modules/dsh-plugin-technical-english-companion"
"$companion_dsh" headless \
  --patch "$companion_pkg/cordis.responses.patch.yml" \
  --patch "$DSH_HOME/companion-test.yml" \
  --json "キャッシュの役割を説明してください。説明だけを行い、ツールは使わないでください。"
```

7. 出力には JSON 形式のイベントが含まれます。`"type":"session"` のイベントにある `sessionId` を `companion_session` にコピーして、次のコマンドで会話を続けます。毎回、二つの `--patch` を `--json` より前に指定します。同じフォルダーでも、`--session-id` を省くと別の会話になります。

```sh
companion_session="session-REPLACE_WITH_THE_RETURNED_ID"
"$companion_dsh" headless \
  --patch "$companion_pkg/cordis.responses.patch.yml" \
  --patch "$DSH_HOME/companion-test.yml" \
  --session-id "$companion_session" --json "キャッシュを更新する場面をもう一つ挙げてください。説明だけを行い、ツールは使わないでください。"
```

専用入口は `technical-english-companion-responses` で、この設定は既定の入口を無効にします。この手順はターミナルでの利用を確認するもので、デスクトップ画面全体の試験を代替しません。

## 使い方の確認

プラグインのルールを貼り付けず、通常の質問を送ります。

> キャッシュの役割、有効期限が切れた場合の影響、更新するタイミングを3文で説明してください。各文でキャッシュに触れてください。説明だけを行い、ファイルの読み取りやツールの呼び出しはしないでください。

日本語で回答され、最初の登場時に意味が添えられ、その後は同じ英語名で統一されることを確認します。続けて質問します。

> キャッシュを更新する場面をもう一つ挙げてください。

新しい回答では、最初の登場時に意味を添え直すことを確認します。一時的な例外は、次のように指定できます。

> 今回の回答だけ、英語の専門用語を付けず、日本語のみで説明してください。

次の通常の質問では既定の表記に戻ります。

## 無効化とアンインストール

Codex ではプラグイン管理画面から無効化またはアンインストールできます。DSH のテスト用プロファイルから削除するには、同じターミナルで次のコマンドを実行します。結果は新しい会話で確認してください。

```sh
"$companion_dsh" plugin --profile headless remove dsh-plugin-technical-english-companion
```

専用入口を使わない新しい会話では、二つの `--patch` を両方省きます。削除後は、`cordis.responses.patch.yml` と専用接続先を選ぶ設定を再び読み込まないでください。

現在設定しているモデルとアカウントを使います。追加のアカウントは作成せず、プラグイン独自の会話履歴、単語記録、学習進捗も保存しません。ライセンスは [MIT](../LICENSE) です。
