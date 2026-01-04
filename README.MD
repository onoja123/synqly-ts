## Synqly

Official TypeScript/JavaScript SDK for Synqly, a unified LLM gateway with intelligent routing and fallbacks.

## Features

* Unified access to OpenAI, Anthropic, Google, and more
* Simple, idiomatic Go API
* Multi-turn conversations
* Configurable parameters (temperature, max tokens, etc.)
* Built-in error handling
* Uses Synqly production endpoints by default
* No vendor lock-in


## Installation

```bash
npm install synqly
```
```bash
yarn add synqly
```
```bash
pnpm add synqly
```

## Quick Start

### TypeScript / JavaScript

```ts
import { Client, Logger } from 'synqly';

const client = new Client({
  apiKey: 'sk_synqly_your_key_here',
});

const response = await client.chat.create({
  provider: 'openai',
  modelType: 'gpt-4',
  messages: [
    { role: 'user', content: 'Hello!' },
  ],
});

Logger.info(response.content);
```

### Using Environment Variables

```ts
import { Client, Logger } from 'synqly';

const client = new Client({
  apiKey: process.env.SYNQLY_API_KEY!,
});

Logger.info('Synqly client initialized');
```

```bash
# .env
SYNQLY_API_KEY=sk_synqly_your_key_here
```

## Client

### `new Client({ apiKey })`

Creates a Synqly client.

**Parameters**

* `apiKey` **(required)** — Your Synqly API key

That’s it. No base URL, no config overload.

```ts
const client = new Client({
  apiKey: 'sk_synqly_your_key_here',
});
```

## Chat Completion

```ts
const response = await client.chat.create({
  provider: 'openai',
  modelType: 'gpt-4',
  messages: [
    { role: 'system', content: 'You are helpful.' },
    { role: 'user', content: 'Explain LLMs in one sentence.' },
  ],
});

Logger.info(response.content);
```

## Error Handling

```ts
import { APIError, ValidationError, SynqlyError, Logger } from 'synqly';

try {
  await client.chat.create({ ... });
} catch (error) {
  if (error instanceof APIError) {
    Logger.error(error.message);
  } else if (error instanceof ValidationError) {
    Logger.error(error.message);
  } else if (error instanceof SynqlyError) {
    Logger.error(error.message);
  } else {
    Logger.error(error as any);
  }
}
```

## License

MIT

---

## Support

- Documentation: https://synqly.xyz/docs
- Issues: https://github.com/onoja123/synqly-ts/issues
- Email: support@synqly.com

## Links

- [npm Package](https://www.npmjs.com/)
- [GitHub Repository](https://github.com/onoja123/synqly-ts)
- [Documentation](https://synqly.xyz/docs)
- [API Reference](https://synqly.xyz/docs/api-reference)

---

Made with ❤️ by Synqly