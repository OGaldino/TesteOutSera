import { expect, APIResponse, test } from '@playwright/test';

export async function expectStandardJsonHeaders(
  res: APIResponse,
  opts: { requireDate?: boolean } = {}
) {
  const headers = res.headers(); // chaves em minúsculas
  const contentType = headers['content-type'] || '';

  // Deve ser JSON (aceita charset)
  expect(contentType.toLowerCase()).toContain('application/json');

  // Aceita content-length OU transfer-encoding: chunked
  const hasContentLength = Object.prototype.hasOwnProperty.call(headers, 'content-length');
  const hasChunked =
    typeof headers['transfer-encoding'] === 'string' &&
    headers['transfer-encoding'].toLowerCase().includes('chunked');

  expect(
    hasContentLength || hasChunked
  ).toBeTruthy();

  // Se vier compactado, aceitar valores comuns
  if (headers['content-encoding']) {
    const enc = headers['content-encoding'].toLowerCase();
    expect(['gzip', 'br', 'deflate']).toContain(enc);
  }

  // Date costuma existir (como no seu response). Deixe opcional se quiser rodar em mocks.
  if (opts.requireDate !== false) {
    expect(headers).toHaveProperty('date');
  }
}

// Se já tiver attachJson/attachText, mantenha como estão
export async function attachJson(name: string, data: unknown) {
  await test.info().attach(name, {
    body: Buffer.from(JSON.stringify(data, null, 2)),
    contentType: 'application/json',
  });
}

export async function attachText(name: string, text: string) {
  await test.info().attach(name, {
    body: Buffer.from(text, 'utf-8'),
    contentType: 'text/plain',
  });
}