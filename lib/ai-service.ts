import OpenAI from 'openai'

  id: string
  name: string
  description: string
  maxTokens?: number
  temperature?: number
}

export interface AIResponse {
  content: string
  model: string
  provider: string
  usage?: {
    prompt_tokens?: number
    completion_tokens?: number
    total_tokens?: number
  }
  fallback?: boolean
}

  // Only DeepSeek model is supported
  static readonly MODELS: AIModel[] = [
    {
      id: 'deepseek-chat',
      name: 'DeepSeek Chat',
      description: 'DeepSeek V3 model for text generation and conversational AI',
      maxTokens: 2048,
      temperature: 0.7
    }
  ]

  // Generate response using DeepSeek
  async generateResponse(
    modelId: string,
    messages: Array<{ role: string; content: string }>,
    options: {
      maxTokens?: number
      temperature?: number
    } = {}
  ): Promise<AIResponse> {
    const model = AIService.MODELS.find(m => m.id === modelId)
    if (!model) {
      throw new Error(`Model ${modelId} not found or not supported (only DeepSeek is allowed)`)
    }

    const {
      maxTokens = model.maxTokens || 2048,
      temperature = model.temperature || 0.7
    } = options

    try {
      const openai = new OpenAI({
        baseURL: 'https://api.deepseek.com',
        apiKey: process.env.DEEPSEEK_API_KEY
      })
      const completion = await openai.chat.completions.create({
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          ...messages.map((msg: any) => ({ role: msg.role, content: msg.content }))
        ],
        model: 'deepseek-chat',
        max_tokens: maxTokens,
        temperature
      })
      return {
        content: completion.choices[0]?.message?.content || 'No response generated',
        model: completion.model,
        provider: 'deepseek',
        usage: completion.usage
      }
    } catch (error) {
      console.error(`Error generating response with DeepSeek:`, error)
      throw error
    }
  }

  // Get available models
  static getAvailableModels(): AIModel[] {
    return this.MODELS
  }

  // Get model by ID
  static getModelById(id: string): AIModel | undefined {
    return this.MODELS.find(model => model.id === id)
  }
}
} 