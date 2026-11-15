// Render explicit concept references; ordinary prose is never searched or replaced.
// 渲染显式概念引用；不搜索或替换普通叙述中的本地词语。
export const outputInstructions = `The terminology rules above describe the USER-VISIBLE result. DSH renders your internal references into that result. For EACH new assistant response with the default terminology style, write EVERY mention of a selected concept as a COMPLETE reference: {{tt:English name|brief local meaning}}. Include the local meaning in EVERY reference, even if the concept already appeared in this response or in previous responses. Never omit the meaning, and never write a selected concept's English name, abbreviation, local name, or local shorthand as ordinary prose when it denotes that concept. This includes mentions inside compound phrases and beside modifiers: an old or new instance is still the same selected concept. Do not decide which mention is first. The renderer alone starts a fresh mapping for each response, shows the first gloss, and removes repeated glosses. Assistant messages in history have already been rendered; do not copy their visible notation as your internal output format. Reuse exactly the same English name for the same concept. For example: {{tt:Class|类}}定义结构；{{tt:Class|类}}可包含方法。这类问题 is ordinary prose and remains unchanged because it does not refer to the Class concept. For a selected Cache concept, write 使旧{{tt:Cache|缓存}}失效, not 使旧缓存失效. In 应更新{{tt:Cache|缓存}}，再让旧{{tt:Cache|缓存}}失效, BOTH mentions require complete references even though the second has the modifier 旧. Do not append a local translation beside a reference; its meaning is inserted by the renderer. Do not put references inside code, commands, identifiers, paths, verbatim quotations, or Markdown links. Preserve those contents exactly. When the user explicitly requests no English terminology, use their requested style without references for its stated duration. Before emitting this same response, silently review every narrative clause for mentions of the concepts you selected, including local names and compound phrases. Move each such mention into a complete reference within this generation; leave ordinary words that do not denote the concept, code, and verbatim quotations unchanged. Do not print this review or explain the internal notation to the user.`;

function codeEnd(text, start) {
  const lineStart = start === 0 || text[start - 1] === '\n';
  if (lineStart) {
    const line = text.slice(start).match(/^[^\n]*(?:\n|$)/)[0];
    const fence = line.match(/^ {0,3}(`{3,}|~{3,})/);
    if (fence) {
      let end = start + line.length;
      while (end < text.length) {
        const next = text.slice(end).match(/^[^\n]*(?:\n|$)/)[0];
        end += next.length;
        if (new RegExp(`^ {0,3}${fence[1][0]}{${fence[1].length},}[ \\t]*(?:\\n|$)$`).test(next)) return end;
      }
      return end;
    }
    if (/^(?: {4}|\t| {0,3}>)/.test(line)) return start + line.length;
  }
  if (text[start] !== '`' || text[start - 1] === '\\') return start;
  const opener = text.slice(start).match(/^`+/)[0];
  let end = start + opener.length;
  while (end < text.length) {
    const next = text.indexOf('`', end);
    if (next === -1) return start;
    const closer = text.slice(next).match(/^`+/)[0];
    end = next + closer.length;
    if (closer.length === opener.length) return end;
  }
  return start;
}

export function renderReferences(text, names = new Map(), literals = new Set()) {
  let rendered = '';
  for (let index = 0; index < text.length;) {
    const end = codeEnd(text, index);
    if (end > index) {
      rendered += text.slice(index, end);
      index = end;
      continue;
    }
    if (!text.startsWith('{{tt:', index)) {
      rendered += text[index++];
      continue;
    }
    const close = text.indexOf('}}', index + 5);
    if (close === -1) throw new Error('Terminology output: unclosed concept reference. 术语输出：概念引用未闭合。');
    const reference = text.slice(index, close + 2);
    if (literals.has(reference)) {
      rendered += reference;
      index = close + 2;
      continue;
    }
    const parts = text.slice(index + 5, close).split('|');
    const [english, meaning] = parts;
    if (parts.length > 2 || !/^[A-Za-z][A-Za-z0-9 .+#/-]*$/.test(english) || english !== english.trim()
      || meaning !== undefined && (!meaning.trim() || /[{}\n]/.test(meaning))) {
      throw new Error('Terminology output: invalid concept reference. 术语输出：概念引用格式无效。');
    }
    if (names.has(english)) {
      rendered += english;
    } else {
      if (meaning === undefined) throw new Error('Terminology output: the first reference needs a local meaning. 术语输出：首次引用缺少本地释义。');
      names.set(english, meaning);
      rendered += /\p{Script=Hangul}/u.test(meaning) ? `${english}(${meaning})`
        : /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}]/u.test(meaning) ? `${english}（${meaning}）`
          : `${english} (${meaning})`;
    }
    index = close + 2;
  }
  return rendered;
}

export async function* renderOutput(stream, request) {
  // Buffer once so the displayed deltas and the durable final blocks share the same text.
  // 缓冲一次，使显示增量与持久化最终正文使用相同文字。
  const chunks = [];
  for await (const chunk of stream) {
    request.signal.throwIfAborted();
    chunks.push(chunk);
  }
  request.signal.throwIfAborted();
  const finish = chunks.find(chunk => chunk.type === 'finish');
  if (finish?.reason.kind === 'error' || finish?.reason.kind === 'aborted') {
    yield* chunks;
    return;
  }
  const blocks = new Map();
  for (const chunk of chunks) {
    if (chunk.type === 'text-delta') blocks.set(chunk.index, (blocks.get(chunk.index) ?? '') + chunk.text);
    if (chunk.type === 'block-end' && chunk.block.type === 'text') blocks.set(chunk.index, chunk.block.text);
  }
  const literals = new Set();
  for (const message of request.messages) {
    if (message.role !== 'user') continue;
    for (const block of message.content) {
      if (block.type === 'text') for (const match of block.text.matchAll(/\{\{tt:[^{}\n]*\}\}/g)) literals.add(match[0]);
    }
  }
  const names = new Map();
  let changed = false;
  for (const [index, text] of blocks) {
    const rendered = renderReferences(text, names, literals);
    changed ||= rendered !== text;
    blocks.set(index, rendered);
  }
  // DeepSeek replay signs reasoning blocks only; unknown replay formats are not rewritten.
  // DeepSeek 回放仅对推理块签名；不改写未经核实的回放格式。
  if (changed && finish?.replayState && (finish.replayState.response.kind !== 'deepseek-messages'
    || finish.replayState.response.version !== 1)) {
    throw new Error('Terminology output: unsupported replay format. 术语输出：不支持此回放格式。');
  }
  const sent = new Set();
  for (const chunk of chunks) {
    request.signal.throwIfAborted();
    if (chunk.type === 'text-delta') {
      if (sent.has(chunk.index)) continue;
      sent.add(chunk.index);
      yield { ...chunk, text: blocks.get(chunk.index) };
    } else if (chunk.type === 'block-end' && chunk.block.type === 'text') {
      yield { ...chunk, block: { ...chunk.block, text: blocks.get(chunk.index) } };
    } else {
      yield chunk;
    }
  }
}
