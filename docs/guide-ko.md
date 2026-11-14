# Technical English Companion 한국어 안내서

[中文](../README.md) · [Español](guide-es.md) · [日本語](guide-ja.md)

이 플러그인은 Codex 또는 DeepSeek Harness(DSH)로 작업하면서 소프트웨어 개발 분야의 전문 영어를 익히도록 돕습니다. 버전 `3.0.0`은 macOS에서 중국어, 스페인어, 일본어, 한국어를 사용하는 사용자를 대상으로 합니다. DSH 검증 범위는 `0.2.2-rc.1`의 전용 진입점과 Flash／High입니다.

이전 식별자 `technical-terms-en-zh` 또는 `dsh-plugin-technical-terms-en-zh`를 사용한다면 기존 플러그인을 비활성화한 뒤 `technical-english-companion` 또는 `dsh-plugin-technical-english-companion`을 활성화하세요. 한 개만 활성화하세요. 일상 환경을 유지하면서 아래 절차를 별도 환경에서 사용할 수 있습니다.

## 다운로드

[v3.0.0 배포 페이지](https://github.com/Calliope-Nicles/technical-english-companion/releases/tag/v3.0.0) · [Codex용 ZIP](https://github.com/Calliope-Nicles/technical-english-companion/releases/download/v3.0.0/technical-english-companion-3.0.0.zip) · [DSH용 TGZ](https://github.com/Calliope-Nicles/technical-english-companion/releases/download/v3.0.0/dsh-plugin-technical-english-companion-3.0.0.tgz) · [검증용 해시 목록](https://github.com/Calliope-Nicles/technical-english-companion/releases/download/v3.0.0/SHA256SUMS)

## 동작 방식

설명은 대화의 언어를 따릅니다. 선택된 전문 용어는 영어로 표기하고, 각 답변에서 처음 나올 때 해당 답변의 언어로 짧은 뜻을 덧붙입니다. 예상 표기 예시는 `Cache(캐시)`입니다. 같은 답변에서 다시 언급할 때는 `Cache`로 통일하고, 다음 답변에서는 처음 나올 때 뜻을 다시 덧붙입니다.

답변 언어나 표현 방식을 직접 지정할 수 있습니다. “이번 답변만”이라는 요청은 다음 답변에 적용하지 않고, “앞으로”라는 요청은 지정한 범위에서 유지합니다. 코드, 명령어, 경로, 원문 인용은 그대로 보존합니다.

## Mac용 Codex에 설치

1. 공통 ZIP 파일 `technical-english-companion-3.0.0.zip`을 받아 압축을 풉니다. `.tgz` 파일은 DSH 전용입니다.
2. Codex의 플러그인 화면에서 압축을 푼 폴더의 절대 경로로 플러그인 마켓을 추가합니다. 폴더 안에는 `.codex-plugin/plugin.json`과 `.agents/plugins/marketplace.json`이 있어야 합니다.
3. `Technical English Companion` 배포처에서 `technical-english-companion`을 설치합니다. 버전이 `3.0.0`이고 활성화되어 있는지 확인합니다. 이 플러그인은 한 배포처만 활성화합니다.
4. 훅 설정에서 `SessionStart`를 검토합니다. 명령이 `/bin/cat`으로 설치 폴더 안의 `src/terminology.md`를 읽는지 확인하고, 내용을 검토한 후 훅을 신뢰하도록 설정합니다.
5. 새 대화를 열어 확인합니다.

Codex 공식 문서: [패키지 및 로컬 배포](https://developers.openai.com/plugins/build/plugins), [훅 검토 및 신뢰](https://learn.chatgpt.com/docs/hooks).

## Mac용 DSH에 설치

이 버전의 검증 환경은 macOS용 DSH `0.2.2-rc.1`입니다. 폴더 링크로 설치하면 호스트 인터페이스를 찾지 못하므로 `.tgz`의 압축을 풀지 않고 사용합니다.

1. `dsh-plugin-technical-english-companion-3.0.0.tgz`를 받아 압축을 풀지 않고 저장합니다.
2. 터미널에서 `DSH_HOME` 값을 별도의 테스트 폴더로 바꾸고, 아카이브 경로를 실제 파일 경로로 바꾼 뒤 실행합니다.

```sh
export DSH_HOME="/absolute/path/to/isolated-dsh"
companion_dsh="/Applications/DeepSeek Harness.app/Contents/Resources/runtime/cli/bin/dsh"
"$companion_dsh" plugin --profile headless add "/absolute/path/to/dsh-plugin-technical-english-companion-3.0.0.tgz" --offline --ignore-scripts
"$companion_dsh" plugin --profile headless list --depth 0
```

3. 목록의 패키지 이름이 `dsh-plugin-technical-english-companion`인지, 버전 표시가 `3.0.0`인지 확인합니다. 설치만으로는 전용 진입점이 활성화되지 않습니다.
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

현재 설정된 모델과 계정을 사용합니다. 추가 계정을 만들지 않으며, 플러그인 자체의 대화 기록, 단어 기록, 학습 진도도 저장하지 않습니다. 라이선스는 [MIT](../LICENSE)입니다.
