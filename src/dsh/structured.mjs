import { LlmError } from '@deepseek-ai/dsh-llm';

export const responseFormat = {
  type: 'json_schema',
  name: 'technical_terms',
  strict: true,
  schema: {
    type: 'object',
    properties: {
      language: { type: 'string', enum: ['zh', 'es', 'ja', 'ko'] },
      concepts: { type: 'array', items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          english: { type: 'string' },
          meaning: { type: 'string' },
        },
        required: ['id', 'english', 'meaning'], additionalProperties: false,
      } },
      content: { type: 'array', items: {
        type: 'object',
        properties: {
          kind: { type: 'string', enum: ['text', 'concept', 'literal', 'code'] },
          value: { type: 'string' },
        },
        required: ['kind', 'value'], additionalProperties: false,
      } },
    },
    required: ['language', 'concepts', 'content'], additionalProperties: false,
  },
};

export const structuredInstructions = `Return your answer as the technical_terms JSON object required by the response format. This is an internal transport format: the user sees only its rendered content. Complete the user's task normally.
Narrative language and English terminology are INDEPENDENT. A technical explanation needs a nonempty concepts table and concept segments unless an explicit instruction to omit English terminology is ACTIVE FOR THIS TURN. A request to answer in Japanese, Spanish, Korean or Chinese changes language, not terminology. "Only in this response, answer in Japanese" limits the language change to one response; it does NOT mean "omit English technical names". A past "no English in this response" expires on the very next turn: do not revive that exception when a later turn changes language. Determine the current two choices separately before writing content.
First satisfy the user's task constraints, then the terminology format. Plan the requested sentence count and required mentions BEFORE composing content. If a concept must appear in every sentence, include its concept segment in EVERY sentence; a pronoun or an entry belonging to it does not count as mentioning that concept. Count required repetitions in the final rendered explanation, not in concepts or in code.
language selects the narrative and gloss language: zh, es, ja, or ko, following the user's current instruction and its duration. Start a fresh concepts table for EVERY response. Each concept has one unique id, an accurate English name in english, and a brief local-language meaning. The meaning must accurately cover EVERY use of that concept in this answer. Check later uses against its first definition: a reading-only definition cannot later describe writing. Use distinct accurate names and entries for different operations or senses, rather than silently broadening a previously defined concept. Include every English technical name or abbreviation used in explanatory prose in that table, even secondary concepts and names explained in earlier answers.
content is an ordered sequence. A concept segment contains the concept id in value. Use a concept segment for EVERY mention of a selected concept, including later sentences, compound phrases, lists, and headings. The renderer alone decides the first gloss and later English-only occurrences. Do not add a parenthetical translation or restate a local name beside a concept reference, even at its FIRST mention: its meaning is already inserted automatically from concepts. A local spelling inside a compound is still a mention: select the accurate compound concept, rather than returning a local name or attaching a translated suffix to an English name. Technical abbreviations used incidentally in prose also require their own concept entry and concept segment; earlier answers never introduce them for this response.
Use text segments only for surrounding natural narrative and Markdown structure, with natural spaces around adjacent words. Never write a selected concept's English name, abbreviation, local name, or local shorthand inside text. Use code segments for complete fenced code blocks, including the unchanged opening and closing fences; the renderer puts these blocks on separate paragraphs. Use literal segments only for inline code, identifiers, commands, paths, URLs, and requested verbatim quotations; preserve them exactly. Ordinary narrative must never be hidden in a literal segment. Do not mechanically replace ordinary words that merely resemble a local concept name. If the user explicitly turns off English terminology, use their requested style in text segments with an empty concepts table for that instruction's stated duration; code and quotations still retain their original bytes.
Keep meanings self-contained in the response language. Do not introduce an English technical name inside another concept's meaning: explain it with local words instead. For zh, ja, and ko, meanings must contain no Latin letters; put identifiers and verbatim text in literal segments outside the meaning. For example, a Korean Server meaning can be "다른 컴퓨터에 서비스를 제공하는 컴퓨터", without mentioning Request or Client. Introduce additional technical concepts only when needed, through their own concept segments.
In Korean, attach particles according to the Korean pronunciation of the English name, including at a first mention followed by its automatic gloss. Do not choose the particle from the translated meaning or the closing parenthesis. String is pronounced 스트링 and takes 이/은/을/으로; Return value ends in 밸류 and takes 가/는/를/로. For example, use a Return value concept segment followed by "로 ", a String concept segment followed by "을 넘깁니다. ", and another String concept segment followed by "이 출력되는 것은 아닙니다." Keep the English names; do not print the pronunciation hints.
Check technical explanations against what the supplied code actually does. A function definition creates a function; only a call executes its body. Running a file containing only a definition does not call the function or print its return value. Returning text that resembles an error name is not raising that error. A Parameter is a named slot declared in a function definition; an Argument is the actual value supplied in a call. Keep these meanings distinct; do not label the supplied value as the definition's named slot.
Historical assistant messages may contain original JSON or legacy rendered text. Always produce the current internal format, not copied visible notation. Before emitting it, silently review every text segment for selected local names (including compounds and shortened forms) and English technical names or abbreviations. Move those mentions to concept segments and add any missing concept entries within this same answer. In Spanish, after selecting String, later mentions of that same data must be String concept segments, including phrases such as "ese String"; do not write "esa cadena" or "la cadena de texto" in narrative. Recheck sentence counts, repetition counts, meanings, and code explanations in this same generation. Do not print this review.
A Chinese explanation of a function and its body can be {"language":"zh","concepts":[{"id":"function","english":"Function","meaning":"函数"},{"id":"body","english":"Function body","meaning":"函数体"},{"id":"return","english":"Return value","meaning":"返回值"}],"content":[{"kind":"text","value":"这个 "},{"kind":"concept","value":"function"},{"kind":"text","value":" 没有传入数据。它的 "},{"kind":"concept","value":"body"},{"kind":"text","value":" 只有一条语句，产生固定的 "},{"kind":"concept","value":"return"},{"kind":"text","value":"；再次调用 "},{"kind":"concept","value":"function"},{"kind":"text","value":" 时，"},{"kind":"concept","value":"return"},{"kind":"text","value":" 不变。"}]}.
A Korean explanation with an incidental abbreviation can be {"language":"ko","concepts":[{"id":"api","english":"API","meaning":"프로그램 사이의 통신 규약"},{"id":"cache","english":"Cache","meaning":"자주 쓰는 데이터를 임시로 보관하는 계층"}],"content":[{"kind":"text","value":"외부 "},{"kind":"concept","value":"api"},{"kind":"text","value":"에서 받은 목록을 "},{"kind":"concept","value":"cache"},{"kind":"text","value":"에 보관합니다. 같은 "},{"kind":"concept","value":"api"},{"kind":"text","value":"가 잠시 응답하지 않아도 기존 "},{"kind":"concept","value":"cache"},{"kind":"text","value":"를 사용할 수 있습니다."}]}.
A Spanish explanation that keeps reading and writing distinct can be {"language":"es","concepts":[{"id":"index","english":"Index","meaning":"estructura auxiliar que permite localizar filas"},{"id":"read","english":"Read query","meaning":"consulta que recupera datos"},{"id":"write","english":"Write operation","meaning":"operación que cambia datos"}],"content":[{"kind":"text","value":"El "},{"kind":"concept","value":"index"},{"kind":"text","value":" puede acelerar una "},{"kind":"concept","value":"read"},{"kind":"text","value":". Al cambiar los datos, cada "},{"kind":"concept","value":"write"},{"kind":"text","value":" también debe mantener el "},{"kind":"concept","value":"index"},{"kind":"text","value":"; ese trabajo añade coste a la "},{"kind":"concept","value":"write"},{"kind":"text","value":" y no es una tarea de la "},{"kind":"concept","value":"read"},{"kind":"text","value":"."}]}.
A Spanish explanation of text can be {"language":"es","concepts":[{"id":"string","english":"String","meaning":"cadena de texto"}],"content":[{"kind":"text","value":"Una "},{"kind":"concept","value":"string"},{"kind":"text","value":" representa texto. Por ejemplo, "},{"kind":"literal","value":"\\\"alpha  beta\\\""},{"kind":"text","value":" es una "},{"kind":"concept","value":"string"},{"kind":"text","value":" que conserva sus dos espacios internos."}]}. Do not repeat its local translation in text; it belongs only in meaning.
When a Spanish conversation temporarily requests a Japanese explanation, even after an earlier expired terminology exception, the answer can be {"language":"ja","concepts":[{"id":"cache","english":"Cache","meaning":"再利用のためデータを一時的に保管する層"}],"content":[{"kind":"text","value":"元の情報が変わったときは "},{"kind":"concept","value":"cache"},{"kind":"text","value":" を更新します。期限が切れた "},{"kind":"concept","value":"cache"},{"kind":"text","value":" も、元の情報から取り直します。"}]}. Japanese narrative still uses English names with Japanese first meanings. The next ordinary Spanish follow-up returns to Spanish with normal English naming.`;

function invalid(reason) {
  return new LlmError(`Terminology output is invalid (${reason}). 术语输出无效（${reason}）。`, 'TERMINOLOGY_FORMAT');
}

function objectWith(value, keys) {
  if (!value || typeof value !== 'object' || Array.isArray(value)
    || Object.keys(value).length !== keys.length || keys.some(key => !Object.hasOwn(value, key))) throw invalid('object-fields');
}

const fencedCode = /^(`{3,}|~{3,})[^\r\n]*\r?\n((?:[\s\S]*\r?\n)?)\1[ \t]*(?:\r?\n)?$/;

export function renderStructured(text, version = 3, codeBlocks = []) {
  let document;
  try {
    document = JSON.parse(text);
  } catch (error) {
    if (!(error instanceof SyntaxError)) throw error;
    throw invalid('json');
  }
  objectWith(document, ['language', 'concepts', 'content']);
  if (!['zh', 'es', 'ja', 'ko'].includes(document.language)
    || !Array.isArray(document.concepts) || !Array.isArray(document.content) || !document.content.length) throw invalid('language-or-lists');
  const concepts = new Map();
  const meanings = new Map();
  for (const concept of document.concepts) {
    objectWith(concept, ['id', 'english', 'meaning']);
    for (const value of Object.values(concept)) {
      if (typeof value !== 'string' || !value.trim() || value !== value.trim() || /[\r\n]/.test(value)) throw invalid('concept-fields');
    }
    if (version >= 3 && document.language !== 'es' && /[A-Za-z]/.test(concept.meaning)) throw invalid('gloss-language');
    if (!/[A-Za-z]/.test(concept.english) || concepts.has(concept.id)
      || meanings.has(concept.english) && meanings.get(concept.english) !== concept.meaning) throw invalid('concept-table');
    concepts.set(concept.id, concept);
    meanings.set(concept.english, concept.meaning);
  }
  for (const segment of document.content) {
    objectWith(segment, ['kind', 'value']);
    if (typeof segment.value !== 'string') throw invalid('segment-value');
  }
  // Recover exact selected English mentions only; local words and protected segments are not searched.
  // 仅恢复本条已选英文名的精确出现，不搜索本地词或受保护片段。
  const names = new Map([...concepts.values()].map(concept => [concept.english, concept.id]));
  const pattern = names.size ? new RegExp('(?<![A-Za-z0-9_])(' + [...names.keys()]
    .sort((a, b) => b.length - a.length).map(name => name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|') + ')(?![A-Za-z0-9_])', 'g') : null;
  const content = version < 3 || !pattern ? document.content : document.content.flatMap(segment => {
    if (segment.kind !== 'text') return [segment];
    const parts = [];
    let offset = 0;
    for (const match of segment.value.matchAll(pattern)) {
      parts.push({ kind: 'text', value: segment.value.slice(offset, match.index) },
        { kind: 'concept', value: names.get(match[0]) });
      offset = match.index + match[0].length;
    }
    parts.push({ kind: 'text', value: segment.value.slice(offset) });
    return parts;
  });
  const introduced = new Set();
  let rendered = '', previousKind;
  for (const segment of content) {
    let value = segment.value;
    if (segment.kind === 'concept') {
      if (!concepts.has(value)) throw invalid('concept-reference');
      const { english, meaning } = concepts.get(value);
      value = introduced.has(english) ? english
        : document.language === 'es' ? `${english} (${meaning})`
          : document.language === 'ko' ? `${english}(${meaning})` : `${english}（${meaning}）`;
      introduced.add(english);
    } else if (segment.kind === 'code') {
      const match = value.match(fencedCode);
      if (!match) throw invalid('code-block');
      // A unique byte-identical body identifies the user's original complete fenced block.
      // 逐字节相同且来源唯一的主体，用于找到用户提供的完整原始围栏块。
      if (version >= 3) {
        const originals = [...new Set(codeBlocks.filter(code => code.match(fencedCode)?.[2] === match[2]))];
        if (originals.length === 1) value = originals[0];
      }
    } else if (segment.kind !== 'text' && segment.kind !== 'literal') throw invalid('segment-kind');
    if (!value) continue;
    // Add structure outside code bytes; legacy literals keep their original rendering.
    // 仅在代码字节之外补充结构，旧 literal 保持原有整理结果。
    if (rendered && (previousKind === 'code' || segment.kind === 'code')) {
      const breaks = rendered.match(/\n*$/)[0].length + value.match(/^\n*/)[0].length;
      rendered += '\n'.repeat(Math.max(0, 2 - breaks));
    } else if (version >= 2 && document.language === 'es'
      && (previousKind === 'concept' && segment.kind === 'literal' && !/^[\s,.;:!?…)\]}»”’]/u.test(value)
        || previousKind === 'literal' && segment.kind === 'concept' && !/[\s([{¿¡«“‘]$/u.test(rendered))) {
      // Separate Spanish prose units without changing the quoted bytes or legacy records.
      // 分隔西语叙述中的相邻单元，不改引用字节或旧记录。
      rendered += ' ';
    }
    rendered += value;
    previousKind = segment.kind;
  }
  return rendered;
}

export function restoreStructuredHistory(request, provider) {
  const messages = request.messages.map(message => {
    if (message.role !== 'assistant' || message.source.provider !== provider) return message;
    const replay = message.source.replayState;
    const envelope = replay?.response.technicalEnglishCompanionEnvelope;
    if (envelope === undefined) return message;
    const texts = message.content.filter(block => block.type === 'text');
    if (envelope === null || ![1, 2, 3].includes(envelope.version) || typeof envelope.text !== 'string' || texts.length !== 1
      || envelope.version === 3 && (!Array.isArray(envelope.codeBlocks) || envelope.codeBlocks.some(code => typeof code !== 'string' || !fencedCode.test(code)))
      || renderStructured(envelope.text, envelope.version, envelope.codeBlocks) !== texts[0].text) {
      throw new LlmError('Structured history does not match its saved visible text. 结构历史与已保存正文不匹配。', 'INVALID_REPLAY_STATE');
    }
    const { technicalEnglishCompanionEnvelope, ...nativeResponse } = replay.response;
    return { ...message,
      content: message.content.map(block => block.type === 'text' ? { ...block, text: envelope.text } : block),
      source: { ...message.source, replayState: { ...replay, response: nativeResponse } },
    };
  });
  return messages.every((message, index) => message === request.messages[index]) ? request : { ...request, messages };
}

export async function* renderStructuredOutput(stream, request) {
  // Buffer the internal envelope so neither display nor durable text sees raw JSON.
  // 缓冲内部对象，避免显示正文和持久化正文接收到原始 JSON。
  const chunks = [];
  for await (const chunk of stream) {
    request.signal?.throwIfAborted();
    chunks.push(chunk);
  }
  request.signal?.throwIfAborted();
  const finish = chunks.find(chunk => chunk.type === 'finish');
  if (!finish) throw invalid('missing-finish');
  if (['error', 'aborted', 'max-tokens'].includes(finish.reason.kind)) {
    for (const chunk of chunks) if (chunk.type === 'usage') yield chunk;
    const { replayState, ...terminal } = finish;
    yield terminal;
    return;
  }
  const texts = new Map();
  for (const chunk of chunks) {
    if (chunk.type === 'text-delta') texts.set(chunk.index, (texts.get(chunk.index) ?? '') + chunk.text);
    if (chunk.type === 'block-end' && chunk.block.type === 'text') texts.set(chunk.index, chunk.block.text);
  }
  if (!texts.size) {
    if (!chunks.some(chunk => chunk.type === 'block-end' && chunk.block.type === 'tool-call')) throw invalid('missing-content');
    yield* chunks;
    return;
  }
  if (texts.size !== 1 || finish.replayState?.response.kind !== 'pi-ai'
    || finish.replayState.response.version !== 2) throw invalid('text-layout-or-replay');
  const [index, text] = texts.entries().next().value;
  // Native context injections also use the user role; take the latest human-origin message.
  // 宿主注入的上下文也使用用户角色，因此按来源取得最后一条真实用户消息。
  const latestUser = request.messages.findLast(message => message.role === 'user'
    && (message.source === undefined || message.source.kind === 'user'));
  const sourceText = latestUser?.content.filter(block => block.type === 'text').map(block => block.text).join('\n') ?? '';
  const codeBlocks = [...sourceText.matchAll(/^(`{3,}|~{3,})[^\r\n]*\r?\n[\s\S]*?^\1[ \t]*(?=\r?$)/gm)].map(match => match[0]);
  const rendered = renderStructured(text, 3, codeBlocks);
  let sent = false;
  // Native pi-ai text metadata contains item identity, while durable content owns the text.
  // 原生 pi-ai 文本元数据仅保存项目身份，正文以持久化内容为准。
  for (const chunk of chunks) {
    request.signal?.throwIfAborted();
    if (chunk.type === 'text-delta' && chunk.index === index) {
      if (!sent) yield { ...chunk, text: rendered };
      sent = true;
    } else if (chunk.type === 'block-end' && chunk.block.type === 'text') {
      yield { ...chunk, block: { ...chunk.block, text: rendered } };
    } else if (chunk.type === 'finish') {
      // Replay the model's original envelope instead of teaching the next turn plain-text output.
      // 回放模型原始结构，避免下一轮从整理后的历史学习普通正文格式。
      yield { ...chunk, replayState: { ...chunk.replayState, response: { ...chunk.replayState.response,
        technicalEnglishCompanionEnvelope: { version: 3, text, codeBlocks },
      } } };
    } else yield chunk;
  }
}
