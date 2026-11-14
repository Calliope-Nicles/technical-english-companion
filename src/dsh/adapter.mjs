import { readFileSync } from 'node:fs';
import { LlmError, assertUsableApiKey, resolveRetryPolicy } from '@deepseek-ai/dsh-llm';
import { PiAiAdapter } from '@deepseek-ai/dsh-llm-pi-ai';
import { credentialRef } from '@deepseek-ai/dsh-credentials';
import z from '@deepseek-ai/schemastery';
import { getBuiltinModels } from '@earendil-works/pi-ai/providers/all';
import { openAIResponsesApi } from '@earendil-works/pi-ai/api/openai-responses.lazy';
import { renderStructuredOutput, restoreStructuredHistory, responseFormat, structuredInstructions } from './structured.mjs';

export const name = 'technical-english-companion-responses';
export const provider = 'technical-english-companion-deepseek';
export const inject = ['llm', 'credentials', 'systemPrompt'];
export const Config = z.object({
  baseURL: z.string().required(),
  apiKeyEnv: z.string().role('credential-ref').required(),
});

export function createAdapter({ baseURL, resolveApiKey, fetch, onProviderStreamEvent }) {
  const url = new URL(baseURL);
  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password || url.search || url.hash) {
    throw new Error('Responses baseURL must be an HTTP(S) root without credentials, query, or fragment. Responses 地址必须是不含凭据、查询或片段的 HTTP(S) 根地址。');
  }
  const models = getBuiltinModels('deepseek').filter(model => ['deepseek-flash', 'deepseek-v4-pro'].includes(model.id))
    .map(model => ({
      ...model, provider, api: 'openai-responses', baseUrl: baseURL,
      input: ['text'], maxTokens: 256000,
      compat: { supportsDeveloperRole: false, supportsMidConvoSystemMessages: true, supportsLongCacheRetention: false },
    }));
  if (models.length !== 2) throw new Error('The installed DSH model catalog is unsupported. 不支持当前 DSH 模型目录。');
  const api = openAIResponsesApi();
  const optionsFor = options => ({
    ...options,
    ...(fetch ? { fetch } : {}),
    ...(onProviderStreamEvent ? { onProviderStreamEvent } : {}),
    onPayload: payload => ({ ...payload, text: { format: responseFormat } }),
  });
  const piProvider = {
    id: provider,
    name: 'Technical English Companion · DeepSeek',
    getModels: () => models,
    auth: { apiKey: {
      name: 'DSH credentials',
      resolve: async ({ credential }) => ({ auth: { apiKey: credential.key }, source: 'DSH credentials' }),
    } },
    stream: (model, context, options) => api.stream(model, context, optionsFor(options)),
    streamSimple: (model, context, options) => api.streamSimple(model, context, optionsFor(options)),
  };
  const profile = {
    displayName: piProvider.name, piProvider, reasoning: 'high',
    modelErrors: new Map(), configuredMaxTokens: new Map(models.map(model => [model.id, model.maxTokens])),
    streamIdleTimeoutMs: 300000,
    retryPolicy: resolveRetryPolicy({ mode: 'normal', maxRetries: 0 }, name),
  };
  // Both public dispatch paths return rendered text before the host records the response.
  // 两条公共调用路径都在宿主记录回答前返回整理后的正文。
  class TerminologyAdapter extends PiAiAdapter {
    stream(request) {
      return renderStructuredOutput(super.stream(restoreStructuredHistory(request, provider)), request);
    }
    async prepareCall(...args) {
      const call = await super.prepareCall(...args);
      return { ...call, stream: request => renderStructuredOutput(call.stream(restoreStructuredHistory(request, provider)), request) };
    }
  }
  return new TerminologyAdapter({ profiles: () => new Map([[provider, profile]]), resolveApiKey });
}

export function apply(ctx, config) {
  const ref = credentialRef(config.apiKeyEnv);
  const adapter = createAdapter({
    baseURL: config.baseURL,
    // Resolve the existing reference inside the host; never export or persist its value.
    // 在宿主内部解析既有引用，不导出或持久化其值。
    resolveApiKey: async () => {
      const hit = await ctx.credentials.resolve(ref);
      if (!hit) throw new LlmError('The configured DSH credential reference is unavailable. 已配置的 DSH 凭据引用不可用。', 'MISSING_CREDENTIAL');
      return assertUsableApiKey(hit.value, name, ref);
    },
  });
  ctx.llm.registerAdapter([provider], adapter);
  ctx.systemPrompt.section({ name: 'technical-english-companion:rules', order: 100,
    text: readFileSync(new URL('../terminology.md', import.meta.url), 'utf8'), interpolate: false });
  ctx.systemPrompt.section({ name: 'technical-english-companion:structured', order: 101,
    text: structuredInstructions, interpolate: false });
}
