// @ts-ignore
declare const process: any;
import  Client from '../src';
import Logger from '../src/logger';

async function main() {
  const client = new Client({
    apiKey: process.env.SYNQLY_API_KEY || '',
  });

  try {
    // Chat with options
    const response = await client.chat.create({
      provider: 'anthropic',
      modelType: 'claude-sonnet-4',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: 'Explain quantum computing simply.' },
      ],
      temperature: 0.7,
      max_tokens: 500,
      fallback: true,
    });

    const assistantMessage = response.messages && response.messages.length > 0
      ? response.messages[0].content
      : '';

    Logger.info('Response:', assistantMessage);
    Logger.info('Provider:', response.provider);
    Logger.info('Model:', response.model);
    Logger.info('Cached:', response.cached);
    Logger.info('Tokens:', response.usage.total_tokens);
  } catch (error) {
    Logger.error('Error:', error);
  }
}

main();