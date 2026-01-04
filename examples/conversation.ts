// @ts-ignore
declare const process: any;
import Logger from '../src/logger';
import Client, { Message } from '../src';

async function main() {
  const client = new Client({
    apiKey: process.env.SYNQLY_API_KEY || '',
  });

  const conversationHistory: Message[] = [
    { role: 'system', content: 'You are a helpful assistant.' },
  ];

  const userMessages = [
    'What is the capital of France?',
    'What is its population?',
    'Tell me an interesting fact about it.',
  ];

  try {
    for (const userMessage of userMessages) {
      conversationHistory.push({ role: 'user', content: userMessage });

      const response = await client.chat.create({
        provider: 'openai',
        modelType: 'gpt-4',
        messages: conversationHistory,
      });

      const assistantMessage =
        response.content ||
        (response.messages && response.messages.length > 0
          ? response.messages[0].content
          : '');
      conversationHistory.push({
        role: 'assistant',
        content: assistantMessage,
      });

      Logger.info(`User: ${userMessage}`);
      Logger.info(`Assistant: ${assistantMessage}`);
      Logger.info('---');
    }
  } catch (error) {
    Logger.error('Error:', error);
  }
}

main();