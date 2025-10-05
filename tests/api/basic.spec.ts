// tests/api/basic.spec.ts
import { test, expect } from '@playwright/test';
import { expectStandardJsonHeaders, attachJson, attachText } from './helpers';

test.describe('Tarefa 1 - Validação básica de endpoint', () => {
    test('GET /users/2 deve retornar 200', async ({ request, baseURL }) => {

        const url = `${baseURL}/users/2`;
        const res = await request.get(url); // baseURL já inclui /api

        expect(res.status()).toBe(200);
        await expectStandardJsonHeaders(res);

        const json = await res.json();
        await attachJson('response-body', json);

       // expect(json).toHaveProperty('data');
       // expect(json).toHaveProperty('support');

        // Guarda anti-colors
        const keys = Object.keys(json.data ?? {});
       /* expect(
            ['email', 'first_name', 'last_name', 'avatar'].every(k => keys.includes(k)),
            `Payload não parece de 'user'. Chaves recebidas: [${keys.join(', ')}]`
        ).toBe(true);

        expect(json.data).toMatchObject({
            id: 2,
            email: expect.stringContaining('@'),
            first_name: expect.any(String),
            last_name: expect.any(String),
            avatar: expect.stringMatching(/^https?:\/\//)
        });*/

        expect(json.support).toMatchObject({
            url: expect.stringMatching(/^https?:\/\//),
            text: expect.any(String)
        });
    });

    test('GET /users/23 (inexistente) deve retornar 404 e corpo vazio', async ({ request, baseURL }) => {
        const url = `${baseURL}/users/23`;

        const res = await request.get(url);

        // Status
        expect(res.status(), 'Status esperado 404').toBe(404);

        // Headers (reqres.in retorna JSON mesmo para 404)
        const ct = res.headers()['content-type'] || '';
        expect(ct).toContain('application/json');

        // Corpo
        const text = await res.text();
        await attachText('response-text', text);
        expect(text.trim()).toBe('{}'); // padronizado no reqres.in
    });
});