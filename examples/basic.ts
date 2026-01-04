import Client from '../src';
import Logger from '../src/logger';

async function main() {
  const client = new Client({
    apiKey: process.env.SYNQLY_API_KEY || '',
  });

  try {
    const response = await client.chat.create({
      provider: 'openai',
      modelType: 'gpt-4',
      messages: [
        { role: 'user', content: 'Hello!' },
      ],
    });

    Logger.info(`Response: ${response.content}`);
    Logger.info(`Cached: ${response.cached}`);
    Logger.info(`Tokens: ${response.usage.total_tokens}`);
  } catch (error) {
    Logger.error(`Error: ${error}`);
  }
}

main();