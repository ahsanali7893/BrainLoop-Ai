export const config = {
  openai: {
    apiKey: process.env.OPENAI_API_KEY,
    model: process.env.OPENAI_MODEL || 'gpt-3.5-turbo',
    maxTokens: 1000,
    temperature: 0.7,
  },
  app: {
    name: process.env.NEXT_PUBLIC_APP_NAME || 'AI Chatbot',
    description: process.env.NEXT_PUBLIC_APP_DESCRIPTION || 'A modern AI chatbot built with Next.js',
  },
  features: {
    streaming: true,
    conversationHistory: true,
    markdownSupport: true,
    codeHighlighting: true,
  }
}

export const isOpenAIConfigured = () => {
  return !!config.openai.apiKey
}

export const getOpenAIConfig = () => {
  if (!isOpenAIConfigured()) {
    throw new Error('OpenAI API key not configured')
  }
  return config.openai
} 