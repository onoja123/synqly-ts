import Client from '../src';

describe('Synqly SDK Basic Chat', () => {
  const apiKey = process.env.SYNQLY_API_KEY;
  const baseURL = process.env.SYNQLY_BASE_URL;
  const client = apiKey
    ? new Client({ apiKey, baseURL })
    : null;

  const testFn = client ? it : it.skip;

  testFn('should return a chat completion with content', async () => {
    const response = await client!.chat.create({
      provider: 'openai',
      modelType: 'gpt-4',
      messages: [
        { role: 'user', content: 'Hello!' },
      ],
    });
    expect(response).toHaveProperty('content');
    expect(typeof response.content).toBe('string');
    expect(response.content).toBeDefined();
    if (response.content) {
      expect(response.content.length).toBeGreaterThan(0);
    }
  });
});
