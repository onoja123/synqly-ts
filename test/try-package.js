/* eslint-disable no-console */

const { Client, APIError } = require('../dist');

const BASE_URL = 'http://localhost:4000';
const API_KEY = process.env.SYNQLY_API_KEY;

async function runNoKey() {
  console.log('--- Smoke test WITHOUT key (expected to fail) ---');
  const client = new Client({ apiKey: 'placeholder', baseURL: BASE_URL });

  // Purposely remove the auth header.
  delete client.http.defaults.headers.common['x-synqly-key'];

  try {
    await client.chat.create({
      provider: 'openai',
      modelType: 'gpt-4',
      messages: [{ role: 'user', content: 'Hello!' }],
    });
    console.error('Unexpected success without key');
    process.exitCode = 1;
  } catch (err) {
    console.error('Expected error (no key):', err?.message || err);
    if (err instanceof APIError) {
      console.error('StatusCode:', err.statusCode);
      if (err.responseBody) {
        console.error('ResponseBody:', JSON.stringify(err.responseBody, null, 2));
      }
    }
  }
}

async function runWithKey() {
  console.log('--- Smoke test WITH key ---');

  if (!API_KEY) {
    console.log('Skipping with-key test: set SYNQLY_API_KEY');
    return;
  }

  const client = new Client({ apiKey: API_KEY, baseURL: BASE_URL });

  try {
    const res = await client.chat.create({
      provider: 'openai',
      modelType: 'gpt-4',
      messages: [{ role: 'user', content: 'Hello!' }],
    });
    console.log('Success response:', JSON.stringify(res, null, 2));
  } catch (err) {
    console.error('Fatal error:', err?.message || err);
    if (err instanceof APIError) {
      console.error('StatusCode:', err.statusCode);
      if (err.responseBody) {
        console.error('ResponseBody:', JSON.stringify(err.responseBody, null, 2));
      }
    }
    process.exitCode = 1;
  }
}

async function main() {
  await runNoKey();
  await runWithKey();
}

main().catch((e) => {
  console.error('Unhandled fatal error:', e);
  process.exitCode = 1;
});
