import { readFileSync } from 'node:fs';
import { isAgentLoopRequest } from '@deepseek-ai/dsh-llm';
import { outputInstructions, renderOutput } from './output.mjs';

export const name = 'technical-english-companion';
export const inject = ['systemPrompt'];

export function apply(ctx) {
  const text = readFileSync(new URL('../terminology.md', import.meta.url), 'utf8');

  // Cordis removes this registration when the plugin unloads.
  // Cordis 会在插件卸载时移除此注册。
  ctx.systemPrompt.section({
    name: `${name}:rules`,
    order: 100,
    text,
    interpolate: false,
  });
  ctx.systemPrompt.section({
    name: `${name}:output`,
    order: 101,
    text: outputInstructions,
    interpolate: false,
  });
  // Agent LLM services live in isolated contexts; this profile-level listener owns no LLM service.
  // 智能体模型服务位于隔离上下文；此配置档案级监听器不依赖根层模型服务。
  ctx.on('llm/stream', (request, next) => {
    if (!isAgentLoopRequest(request)) return next();
    return renderOutput(next(), request);
  }, { global: true });
}
