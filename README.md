<img src="assets/pitaya-icon.png" alt="像素小火龙果图标" width="80" height="80">

**Technical English Companion**

[中文](#中文) · [Español](#español) · [日本語](#日本語) · [한국어](#한국어)

# 中文

**专业英语术语伴学 · Mac v3.0.1 发行说明**

[下载 v3.0.1](https://github.com/Calliope-Nicles/technical-english-companion/releases/tag/v3.0.1)

**Technical English Companion** 帮助学生和编程初学者在做项目时熟悉专业英语，支持中文、西班牙语、日语和韩语对话。

## 本版更新

- 兼容 macOS 的 DSH `0.2.2-rc.3`，保留 `0.2.2-rc.1`，修复宿主升级后因精确版本限制被拒绝加载的问题。
- 改进 DSH 默认入口的复合短语标记，明确“旧／新”等修饰不改变同一概念的标记要求；补充同次生成检查，不追加自动纠正请求。
- 沿用已测试 `3.0.1-local.2` 的运行内容。共享术语规则、Codex 钩子和 DSH 专用入口保持既有行为。

例如，同条回答首次写 `Cache（缓存）`，后续使用 `Cache`，复合短语可写“使旧 Cache 失效”。代码、命令、路径和要求原样保留的引用保持原文。

## 安装包与验证范围

| 文件 | 用途 |
| --- | --- |
| `technical-english-companion-3.0.1.zip` | Codex 共用源码包，先解压 |
| `dsh-plugin-technical-english-companion-3.0.1.tgz` | DSH 安装包，保持未解压 |
| `SHA256SUMS` | 两份归档的完整性校验值 |

- DSH `0.2.2-rc.3`：32 项开发检查通过；当前 Mac 的原生安装、进程重开及默认入口启用已确认。Flash／High 对原问题的一条中文真实复测通过术语检查；这一条不代表多轮、四语或技术建议准确性全部通过。
- DSH `0.2.2-rc.1`：沿用 v3.0.0 专用入口／Flash High 的既有四语结果。专用入口未因本次修订改变，其他模型及其他 DSH 版本不由本次结果扩展支持。
- Codex：沿用既有插件及会话开始钩子；本版核对封装与规则输出，桌面和真实问答结果复用未变内容的原验证。Windows 未纳入本版范围。

生成说明会帮助模型遵守规则；默认入口仍依赖模型完整标记，不能据单条通过保证任意回答都不漏标。

## DSH 安装与升级

1. 保存本版 `.tgz`，不要解压。
2. 在终端将路径换成实际文件位置，使用 DSH 自带命令安装：

```sh
companion_dsh="/Applications/DeepSeek Harness.app/Contents/Resources/runtime/cli/bin/dsh"
"$companion_dsh" plugin --profile desktop add "/absolute/path/to/dsh-plugin-technical-english-companion-3.0.1.tgz" --offline --ignore-scripts
```

3. 完全退出并重开 DSH。在插件详情核对 `v3.0.1`、包开关开启、默认 `technical-english-companion` 组件运行中。默认安装包含两个组件，专用入口初始关闭，显示“共 2 个 · 1 运行中 · 1 已停用”符合预期。
4. 保留已有模型，使用新对话。当前默认入口的真实复测使用 Flash／High，无需为此另设专用连接。

从旧标识 `dsh-plugin-technical-terms-en-zh` 切换时，先停用旧插件，保持只有一份术语规则来源启用。已经使用新标识的旧版本可直接更新；旧对话已经加载的内容不因升级而清除。

## DSH 专用入口

已有专用入口配置可继续使用。它需要既有的 Responses API（支持结构化请求和回答的接口）连接及 Credential reference（宿主已保存凭据的名称），并显式选择 `technical-english-companion-responses` 和 `technical-english-companion-deepseek`。`apiKeyEnv` 接收引用名称，不填写秘密值。

专用入口仍使用 Flash／High，完整回答收到后显示整理结果，不自动追加纠正调用。配置方式沿用 [v3.0.0 的专用入口说明](https://github.com/Calliope-Nicles/technical-english-companion/releases/tag/v3.0.0)，安装文件改用本版 `3.0.1`；包内三语指南也包含完整步骤。默认入口与专用入口只启用其一，切换后新建对话。

## Codex 安装

1. 解压共用 ZIP，在插件页添加插件市场，填写解压后目录的绝对路径；目录内应有 `.codex-plugin/plugin.json` 和 `.agents/plugins/marketplace.json`。
2. 从 **Technical English Companion** 来源安装 `technical-english-companion`，核对版本 `3.0.1` 并启用。
3. 按宿主提示审阅并信任 SessionStart（会话开始钩子）。命令使用 `/bin/cat` 读取本插件目录下的 `src/terminology.md`，然后新建对话使用。

从旧标识 `technical-terms-en-zh` 切换时先停用旧插件。更新后遵循宿主的重新审阅提示，保持只有一份规则来源启用。

## 停用与卸载

Codex 可在插件页停用或卸载。DSH 可使用插件总开关停用本包组件；卸载桌面配置中的本包可运行：

```sh
"$companion_dsh" plugin --profile desktop remove dsh-plugin-technical-english-companion
```

使用独立配置时，将 `desktop` 换成对应配置名。卸载后不再加载专用入口选择配置，再从新对话检查规则撤销；旧对话由宿主保留。

安装不新增账号或运行依赖，无需 Python；真实提问使用已有模型与账号计费。插件不建立自己的词汇、学习进度或对话数据库，DSH 仍按宿主机制保存聊天。许可证为 MIT。


---

# Español

**[Technical English Companion · Guía en español](docs/guide-es.md)**

Esta extensión ayuda a aprender vocabulario de desarrollo de software mientras usas Codex o DeepSeek Harness (DSH). La versión `3.0.1` está dirigida a usuarios de chino, español, japonés y coreano en macOS. Admite DSH `0.2.2-rc.1` y `0.2.2-rc.3`. En `0.2.2-rc.3`, una pregunta real en chino con la entrada predeterminada y Flash / High pasó la comprobación de términos; las pruebas anteriores de los cuatro idiomas corresponden a `0.2.2-rc.1` y a la entrada dedicada.

Si vienes del identificador anterior `technical-terms-en-zh` o `dsh-plugin-technical-terms-en-zh`, desactívalo antes de activar `technical-english-companion` o `dsh-plugin-technical-english-companion`. Mantén una sola copia habilitada. Puedes conservar tu instalación habitual y seguir el procedimiento siguiente en un entorno independiente.

## Descargas

[Versión v3.0.1](https://github.com/Calliope-Nicles/technical-english-companion/releases/tag/v3.0.1) · [Paquete para Codex (.zip)](https://github.com/Calliope-Nicles/technical-english-companion/releases/download/v3.0.1/technical-english-companion-3.0.1.zip) · [Paquete para DSH (.tgz)](https://github.com/Calliope-Nicles/technical-english-companion/releases/download/v3.0.1/dsh-plugin-technical-english-companion-3.0.1.tgz) · [Sumas de verificación](https://github.com/Calliope-Nicles/technical-english-companion/releases/download/v3.0.1/SHA256SUMS)

## Cómo funciona

La explicación sigue el idioma de la conversación. Los términos técnicos seleccionados aparecen en inglés, con una definición breve en el idioma de la respuesta la primera vez. Ejemplo de formato esperado: `Cache (caché)`. En las menciones posteriores de la misma respuesta se usa `Cache`; en una nueva respuesta se vuelve a incluir la definición.

Puedes indicar otro idioma o pedir que no se añadan términos en inglés. Una petición limitada a «esta respuesta» no se extiende a la siguiente; una petición como «a partir de ahora» se mantiene dentro del alcance que indiques. El código, los comandos, las rutas y las citas literales se conservan tal como están.

## Instalar en Codex para Mac

1. Obtén y descomprime el ZIP común `technical-english-companion-3.0.1.zip`. El archivo `.tgz` está destinado únicamente a DSH.
2. En el apartado de complementos de Codex, añade un mercado de complementos usando la ruta absoluta de la carpeta descomprimida. Debe contener `.codex-plugin/plugin.json` y `.agents/plugins/marketplace.json`.
3. Busca el origen `Technical English Companion` e instala `technical-english-companion`. Comprueba la versión `3.0.1` y que esté habilitado. Mantén habilitado un solo origen de este complemento.
4. En la configuración de hooks, revisa `SessionStart`. El comando debe usar `/bin/cat` para leer `src/terminology.md` dentro de la carpeta instalada. Revisa el contenido y confía en el hook antes de usarlo.
5. Abre una conversación nueva para comprobar el resultado.

Documentación oficial de Codex: [empaquetado e instalación local](https://developers.openai.com/plugins/build/plugins) y [revisión de hooks](https://learn.chatgpt.com/docs/hooks).

## Instalar en DSH para Mac

Esta versión admite DSH `0.2.2-rc.1` y `0.2.2-rc.3` en macOS. La prueba real de `0.2.2-rc.3` se limita a una respuesta en chino con Flash / High y no equivale a una prueba completa de los cuatro idiomas. Usa el archivo `.tgz` sin descomprimirlo; la instalación por enlace a una carpeta puede no resolver la interfaz del anfitrión.

1. Guarda `dsh-plugin-technical-english-companion-3.0.1.tgz` sin descomprimir.
2. En Terminal, sustituye la ruta de `DSH_HOME` por una carpeta de prueba independiente y la ruta del archivo por la de tu descarga.

```sh
export DSH_HOME="/absolute/path/to/isolated-dsh"
companion_dsh="/Applications/DeepSeek Harness.app/Contents/Resources/runtime/cli/bin/dsh"
"$companion_dsh" plugin --profile headless add "/absolute/path/to/dsh-plugin-technical-english-companion-3.0.1.tgz" --offline --ignore-scripts
"$companion_dsh" plugin --profile headless list --depth 0
```

3. Comprueba que la lista incluya `dsh-plugin-technical-english-companion` y la versión `3.0.1`. Instalar el paquete no activa por sí solo la entrada dedicada.

Para usar la entrada predeterminada, conserva el modelo que ya tengas configurado, comprueba que el componente `technical-english-companion` esté en ejecución y abre una conversación nueva. La prueba de esta entrada usó Flash / High; no exige crear una conexión dedicada. Los pasos 4–7 siguientes solo se necesitan para la entrada dedicada.
4. Necesitas una conexión existente compatible con Responses API (interfaz de solicitudes y respuestas estructuradas) y una Credential reference (nombre de una credencial ya guardada por DSH). El inicio de sesión de la aplicación no garantiza estos requisitos. Sin una conexión y una referencia compatibles, esta entrada no puede utilizarse; no necesitas abrir otra cuenta.
5. Crea `$DSH_HOME/companion-test.yml` con el contenido siguiente. Sustituye la ruta por la de tu almacén existente, la dirección por la de tu servicio compatible y `EXISTING_CREDENTIAL_REFERENCE` por el nombre existente. `apiKeyEnv` recibe ese nombre, nunca la clave secreta. No copies el contenido del almacén.

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

6. Desde una carpeta de trabajo de prueba, ejecuta la primera pregunta. Las solicitudes reales se facturan en la cuenta existente. Esta entrada usa Flash con nivel High; acumula la respuesta completa antes de mostrarla y no añade llamadas automáticas de corrección.

```sh
companion_pkg="$DSH_HOME/profiles/headless/node_modules/dsh-plugin-technical-english-companion"
"$companion_dsh" headless \
  --patch "$companion_pkg/cordis.responses.patch.yml" \
  --patch "$DSH_HOME/companion-test.yml" \
  --json "Explica para qué sirve la caché. Solo explica; no uses herramientas."
```

7. La salida contiene eventos JSON. Copia el `sessionId` del evento `"type":"session"` al valor de `companion_session` y continúa con el segundo comando. Conserva los dos argumentos `--patch` en cada turno; deben preceder a `--json`. Usar la misma carpeta sin `--session-id` crea otra conversación.

```sh
companion_session="session-REPLACE_WITH_THE_RETURNED_ID"
"$companion_dsh" headless \
  --patch "$companion_pkg/cordis.responses.patch.yml" \
  --patch "$DSH_HOME/companion-test.yml" \
  --session-id "$companion_session" --json "Da otro ejemplo de cuándo actualizar la caché. Solo explica; no uses herramientas."
```

La entrada dedicada es `technical-english-companion-responses`; su configuración desactiva la entrada predeterminada. Este procedimiento verifica el uso por terminal, y no equivale a una prueba completa de la interfaz de escritorio.

## Probar el uso

Haz una pregunta normal, sin pegar las reglas del complemento:

> Explica en tres frases para qué sirve la caché, qué ocurre cuando caduca y cuándo conviene actualizarla. Menciona la caché en cada frase. Solo explica; no leas archivos ni uses herramientas.

Comprueba que la respuesta esté en español, que la primera mención incluya una definición y que las siguientes usen el mismo nombre en inglés. Luego pregunta:

> Da otro ejemplo de cuándo actualizar la caché.

La nueva respuesta debe incluir de nuevo la definición en su primera mención. Para comprobar una excepción temporal, puedes pedir:

> Solo en esta respuesta, usa únicamente español, sin términos en inglés.

La siguiente pregunta normal vuelve al formato predeterminado.

## Desactivar o desinstalar

En Codex, usa el interruptor o la acción de desinstalación del complemento. Para quitar el paquete del perfil de prueba de DSH, usa el siguiente comando en la misma terminal. Abre una conversación nueva para comprobar el resultado.

```sh
"$companion_dsh" plugin --profile headless remove dsh-plugin-technical-english-companion
```

Para dejar de usar la entrada dedicada, omite ambos argumentos `--patch` en las conversaciones nuevas. Después de quitar el paquete, no vuelvas a cargar `cordis.responses.patch.yml` ni la configuración que selecciona su proveedor.

El complemento utiliza el modelo y la cuenta que ya tengas configurados. No crea una cuenta adicional ni guarda su propio historial de conversaciones, vocabulario o progreso. Licencia: [MIT](LICENSE).


---

# 日本語

**[Technical English Companion 日本語ガイド](docs/guide-ja.md)**

このプラグインは、Codex または DeepSeek Harness（DSH）で作業を進めながら、ソフトウェア開発の専門英語に慣れるためのものです。バージョン `3.0.1` は macOS 上の中国語、スペイン語、日本語、韓国語を対象とし、DSH `0.2.2-rc.1` と `0.2.2-rc.3` に対応します。`0.2.2-rc.3` の既定の入口と Flash／High では、中国語の実際の質問 1 件で用語表記を確認しました。既存の四言語の結果は `0.2.2-rc.1` の専用入口に対応します。

旧識別子 `technical-terms-en-zh` または `dsh-plugin-technical-terms-en-zh` を使用している場合は、旧版を無効にしてから `technical-english-companion` または `dsh-plugin-technical-english-companion` を有効にします。一つだけを有効にしてください。日常の環境を保ったまま、以下の手順を独立した環境で利用できます。

## ダウンロード

[v3.0.1 公開ページ](https://github.com/Calliope-Nicles/technical-english-companion/releases/tag/v3.0.1) · [Codex 用 ZIP](https://github.com/Calliope-Nicles/technical-english-companion/releases/download/v3.0.1/technical-english-companion-3.0.1.zip) · [DSH 用 TGZ](https://github.com/Calliope-Nicles/technical-english-companion/releases/download/v3.0.1/dsh-plugin-technical-english-companion-3.0.1.tgz) · [検証用ハッシュ一覧](https://github.com/Calliope-Nicles/technical-english-companion/releases/download/v3.0.1/SHA256SUMS)

## 動作

説明文は会話の言語に合わせます。選ばれた専門用語は英語で表記し、各回答の最初の登場時に、その回答の言語による短い意味を添えます。表記の例は `Cache（キャッシュ）` です。同じ回答内で再び登場するときは `Cache` を使い、次の回答では最初に意味を添え直します。

回答言語や表記方法を明示的に指定できます。「今回の回答だけ」という指定は次の回答へ持ち越さず、「今後は」という指定は指定された範囲で継続します。コード、コマンド、パス、原文の引用はそのまま保ちます。

## Mac 版 Codex へのインストール

1. 共通 ZIP `technical-english-companion-3.0.1.zip` を入手して展開します。`.tgz` は DSH 専用です。
2. Codex のプラグイン画面から、展開したフォルダーの絶対パスを使ってプラグインマーケットを追加します。そのフォルダーには `.codex-plugin/plugin.json` と `.agents/plugins/marketplace.json` が必要です。
3. 配布元 `Technical English Companion` から `technical-english-companion` をインストールし、バージョンが `3.0.1` で有効になっていることを確認します。このプラグインは一つの配布元だけを有効にします。
4. フック設定で `SessionStart` を確認します。コマンドが `/bin/cat` を使い、インストール先の `src/terminology.md` を読むことを確認し、内容を確認したうえでフックを信頼します。
5. 新しい会話を開いて動作を確認します。

Codex 公式ドキュメント：[パッケージとローカル配布](https://developers.openai.com/plugins/build/plugins)、[フックの確認と信頼](https://learn.chatgpt.com/docs/hooks)。

## Mac 版 DSH へのインストール

この版は macOS の DSH `0.2.2-rc.1` と `0.2.2-rc.3` に対応します。`0.2.2-rc.3` の実モデル検証は Flash／High の中国語回答 1 件に限られ、四言語すべての検証ではありません。ホストのインターフェースを解決できない場合があるフォルダーリンクは使わず、`.tgz` を展開せずに使います。

1. `dsh-plugin-technical-english-companion-3.0.1.tgz` を展開せずに保存します。
2. ターミナルで、`DSH_HOME` の値を独立したテスト用フォルダーに、アーカイブのパスを実際の保存先に置き換えて実行します。

```sh
export DSH_HOME="/absolute/path/to/isolated-dsh"
companion_dsh="/Applications/DeepSeek Harness.app/Contents/Resources/runtime/cli/bin/dsh"
"$companion_dsh" plugin --profile headless add "/absolute/path/to/dsh-plugin-technical-english-companion-3.0.1.tgz" --offline --ignore-scripts
"$companion_dsh" plugin --profile headless list --depth 0
```

3. 一覧に `dsh-plugin-technical-english-companion` とバージョン `3.0.1` があることを確認します。インストールだけでは、専用入口は有効になりません。

既定の入口を使う場合は、設定済みのモデルを保ち、`technical-english-companion` が実行中であることを確認して新しい会話を開きます。この入口の実測は Flash／High を使い、専用の接続設定は不要です。以下の手順 4〜7 は専用入口を使う場合だけ必要です。
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

現在設定しているモデルとアカウントを使います。追加のアカウントは作成せず、プラグイン独自の会話履歴、単語記録、学習進捗も保存しません。ライセンスは [MIT](LICENSE) です。


---

# 한국어

**[Technical English Companion 한국어 안내서](docs/guide-ko.md)**

이 플러그인은 Codex 또는 DeepSeek Harness(DSH)로 작업하면서 소프트웨어 개발 분야의 전문 영어를 익히도록 돕습니다. 버전 `3.0.1`은 macOS의 중국어, 스페인어, 일본어, 한국어 사용자를 대상으로 하며 DSH `0.2.2-rc.1`과 `0.2.2-rc.3`을 지원합니다. `0.2.2-rc.3`의 기본 진입점과 Flash／High에서는 실제 중국어 질문 1건의 용어 표기를 확인했습니다. 기존 네 언어 결과는 `0.2.2-rc.1`의 전용 진입점에 해당합니다.

이전 식별자 `technical-terms-en-zh` 또는 `dsh-plugin-technical-terms-en-zh`를 사용한다면 기존 플러그인을 비활성화한 뒤 `technical-english-companion` 또는 `dsh-plugin-technical-english-companion`을 활성화하세요. 한 개만 활성화하세요. 일상 환경을 유지하면서 아래 절차를 별도 환경에서 사용할 수 있습니다.

## 다운로드

[v3.0.1 배포 페이지](https://github.com/Calliope-Nicles/technical-english-companion/releases/tag/v3.0.1) · [Codex용 ZIP](https://github.com/Calliope-Nicles/technical-english-companion/releases/download/v3.0.1/technical-english-companion-3.0.1.zip) · [DSH용 TGZ](https://github.com/Calliope-Nicles/technical-english-companion/releases/download/v3.0.1/dsh-plugin-technical-english-companion-3.0.1.tgz) · [검증용 해시 목록](https://github.com/Calliope-Nicles/technical-english-companion/releases/download/v3.0.1/SHA256SUMS)

## 동작 방식

설명은 대화의 언어를 따릅니다. 선택된 전문 용어는 영어로 표기하고, 각 답변에서 처음 나올 때 해당 답변의 언어로 짧은 뜻을 덧붙입니다. 예상 표기 예시는 `Cache(캐시)`입니다. 같은 답변에서 다시 언급할 때는 `Cache`로 통일하고, 다음 답변에서는 처음 나올 때 뜻을 다시 덧붙입니다.

답변 언어나 표현 방식을 직접 지정할 수 있습니다. “이번 답변만”이라는 요청은 다음 답변에 적용하지 않고, “앞으로”라는 요청은 지정한 범위에서 유지합니다. 코드, 명령어, 경로, 원문 인용은 그대로 보존합니다.

## Mac용 Codex에 설치

1. 공통 ZIP 파일 `technical-english-companion-3.0.1.zip`을 받아 압축을 풉니다. `.tgz` 파일은 DSH 전용입니다.
2. Codex의 플러그인 화면에서 압축을 푼 폴더의 절대 경로로 플러그인 마켓을 추가합니다. 폴더 안에는 `.codex-plugin/plugin.json`과 `.agents/plugins/marketplace.json`이 있어야 합니다.
3. `Technical English Companion` 배포처에서 `technical-english-companion`을 설치합니다. 버전이 `3.0.1`이고 활성화되어 있는지 확인합니다. 이 플러그인은 한 배포처만 활성화합니다.
4. 훅 설정에서 `SessionStart`를 검토합니다. 명령이 `/bin/cat`으로 설치 폴더 안의 `src/terminology.md`를 읽는지 확인하고, 내용을 검토한 후 훅을 신뢰하도록 설정합니다.
5. 새 대화를 열어 확인합니다.

Codex 공식 문서: [패키지 및 로컬 배포](https://developers.openai.com/plugins/build/plugins), [훅 검토 및 신뢰](https://learn.chatgpt.com/docs/hooks).

## Mac용 DSH에 설치

이 버전은 macOS용 DSH `0.2.2-rc.1`과 `0.2.2-rc.3`을 지원합니다. `0.2.2-rc.3`의 실제 모델 검증은 Flash／High의 중국어 답변 1건이며 네 언어 전체 검증은 아닙니다. 폴더 링크는 호스트 인터페이스를 찾지 못할 수 있으므로 `.tgz`의 압축을 풀지 않고 사용하세요.

1. `dsh-plugin-technical-english-companion-3.0.1.tgz`를 받아 압축을 풀지 않고 저장합니다.
2. 터미널에서 `DSH_HOME` 값을 별도의 테스트 폴더로 바꾸고, 아카이브 경로를 실제 파일 경로로 바꾼 뒤 실행합니다.

```sh
export DSH_HOME="/absolute/path/to/isolated-dsh"
companion_dsh="/Applications/DeepSeek Harness.app/Contents/Resources/runtime/cli/bin/dsh"
"$companion_dsh" plugin --profile headless add "/absolute/path/to/dsh-plugin-technical-english-companion-3.0.1.tgz" --offline --ignore-scripts
"$companion_dsh" plugin --profile headless list --depth 0
```

3. 목록의 패키지 이름이 `dsh-plugin-technical-english-companion`인지, 버전 표시가 `3.0.1`인지 확인합니다. 설치만으로는 전용 진입점이 활성화되지 않습니다.

기본 진입점을 쓰려면 기존 모델 설정을 유지하고 `technical-english-companion` 구성 요소가 실행 중인지 확인한 뒤 새 대화를 여세요. 이 진입점의 실제 검증은 Flash／High로 진행했으며 별도 전용 연결 설정은 필요하지 않습니다. 아래 4–7단계는 전용 진입점을 사용할 때만 필요합니다.
4. 기존 Responses API(구조화된 요청과 답변을 처리하는 인터페이스) 연결과 Credential reference(DSH에 이미 저장된 인증 정보를 가리키는 이름)가 필요합니다. 앱 로그인만으로 이 조건이 충족되지는 않습니다. 호환되는 연결과 이름이 없다면 이 진입점을 사용할 수 없습니다. 새 계정은 필요하지 않습니다.
5. 아래 내용으로 `$DSH_HOME/companion-test.yml`을 만듭니다. 경로는 기존 인증 정보 파일의 경로로, 주소는 호환 서비스의 주소로, `EXISTING_CREDENTIAL_REFERENCE`는 기존 이름으로 바꿉니다. `apiKeyEnv`에는 비밀 키 자체가 아닌 이름을 넣습니다. 인증 정보 파일의 내용을 복사하지 마세요.

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

6. 테스트용 작업 폴더에서 첫 질문을 실행합니다. 실제 요청은 기존 계정에 과금됩니다. 이 진입점은 Flash의 High 설정을 사용하며, 전체 답변을 받은 뒤 표시합니다. 자동 수정을 위한 추가 요청은 보내지 않습니다.

```sh
companion_pkg="$DSH_HOME/profiles/headless/node_modules/dsh-plugin-technical-english-companion"
"$companion_dsh" headless \
  --patch "$companion_pkg/cordis.responses.patch.yml" \
  --patch "$DSH_HOME/companion-test.yml" \
  --json "캐시의 역할을 설명해 주세요. 설명만 하고 도구는 사용하지 마세요."
```

7. 출력에는 JSON 형식의 이벤트가 포함됩니다. `"type":"session"` 이벤트의 `sessionId`를 `companion_session` 값에 복사하고 다음 명령으로 대화를 이어갑니다. 매번 두 `--patch`를 `--json`보다 앞에 지정하세요. 같은 폴더를 사용해도 `--session-id`를 생략하면 새 대화가 만들어집니다.

```sh
companion_session="session-REPLACE_WITH_THE_RETURNED_ID"
"$companion_dsh" headless \
  --patch "$companion_pkg/cordis.responses.patch.yml" \
  --patch "$DSH_HOME/companion-test.yml" \
  --session-id "$companion_session" --json "캐시를 갱신하는 상황을 하나 더 예로 들어 주세요. 설명만 하고 도구는 사용하지 마세요."
```

전용 진입점은 `technical-english-companion-responses`이며 이 설정은 기본 진입점을 비활성화합니다. 이 절차는 터미널 사용을 확인하는 것이며, 전체 데스크톱 화면 시험을 대신하지 않습니다.

## 사용 확인

플러그인 규칙을 붙여 넣지 말고 평소처럼 질문합니다.

> 캐시의 역할, 만료되었을 때의 영향, 갱신하는 시점을 세 문장으로 설명해 주세요. 각 문장에서 캐시를 언급해 주세요. 설명만 하고 파일을 읽거나 도구를 호출하지 마세요.

답변이 한국어로 작성되고, 첫 언급에 뜻이 붙으며, 이후에는 같은 영어 이름을 사용하는지 확인합니다. 이어서 질문합니다.

> 캐시를 갱신하는 상황을 하나 더 예로 들어 주세요.

새 답변에서는 첫 언급에 뜻이 다시 붙어야 합니다. 다음과 같이 일시적인 예외를 요청할 수도 있습니다.

> 이번 답변만 영어 전문 용어를 붙이지 말고 한국어로만 설명해 주세요.

다음의 일반적인 질문에서는 기본 표기로 돌아갑니다.

## 비활성화 및 제거

Codex에서는 플러그인 관리 화면에서 비활성화하거나 제거할 수 있습니다. DSH 테스트 프로필에서 패키지를 제거하려면 같은 터미널에서 다음 명령을 실행하세요. 새 대화에서 결과를 확인하세요.

```sh
"$companion_dsh" plugin --profile headless remove dsh-plugin-technical-english-companion
```

전용 진입점을 사용하지 않는 새 대화에서는 두 `--patch`를 모두 생략하세요. 패키지를 제거한 뒤에는 `cordis.responses.patch.yml`과 전용 연결을 선택하는 설정을 다시 불러오지 마세요.

현재 설정된 모델과 계정을 사용합니다. 추가 계정을 만들지 않으며, 플러그인 자체의 대화 기록, 단어 기록, 학습 진도도 저장하지 않습니다. 라이선스는 [MIT](LICENSE)입니다.
