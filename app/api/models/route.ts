import OpenAI from 'openai'

export interface AIModel {
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
  usage?: any
  fallback?: boolean
  reasoning_content?: string
}

export class AIService {
  static readonly MODELS: AIModel[] = [
    {
      id: 'deepseek-chat',
      name: 'DeepSeek Chat',
      description: 'DeepSeek V3 model for text generation and conversational AI',
      maxTokens: 2048,
      temperature: 0.7
    },
    {
      id: 'deepseek-reasoner',
      name: 'DeepSeek Reasoner',
      description: 'DeepSeek R1 model for advanced reasoning and text generation',
      maxTokens: 2048,
      temperature: 0.7
    }
  ]

  async generateResponse(
    modelId: string,
    messages: Array<{ role: string; content: string }>,
    options: {
      maxTokens?: number;
      temperature?: number;
      frequency_penalty?: number;
      presence_penalty?: number;
      top_p?: number;
      stop?: string[];
      stream?: boolean;
    } = {}
  ): Promise<AIResponse> {
    const model = AIService.MODELS.find(m => m.id === modelId)
    if (!model) {
      throw new Error(`Model ${modelId} not found or not supported (only DeepSeek is allowed)`)
    }

    const {
      maxTokens = model.maxTokens || 2048,
      temperature = model.temperature || 0.7,
      frequency_penalty = 0,
      presence_penalty = 0,
      top_p = 1,
      stop,
      stream = false
    } = options

    try {
      const openai = new OpenAI({
        baseURL: 'https://openrouter.ai/api/v1/chat/completions',
        apiKey: process.env.DEEPSEEK_API_KEY
      })
      // Remove reasoning_content from previous assistant messages before sending to DeepSeek
      const cleanedMessages = messages.map((msg: any) => {
        if (msg.role === 'assistant' && msg.reasoning_content) {
          const { reasoning_content, ...rest } = msg
          return rest
        }
        return msg
      })
      const completion = await openai.chat.completions.create({
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          ...cleanedMessages.map((msg: any) => ({ role: msg.role, content: msg.content }))
        ],
        model: modelId,
        max_tokens: maxTokens,
        temperature,
        frequency_penalty,
        presence_penalty,
        top_p,
        stop,
        stream
      }) as any;
      // DeepSeek returns a ChatCompletion object, not a stream, unless stream=true
      // Defensive: handle both cases
      if (completion.choices && Array.isArray(completion.choices)) {
        return {
          content: completion.choices[0]?.message?.content || 'No response generated',
          model: completion.model || modelId,
          provider: modelId,
          usage: completion.usage
        }
      } else {
        // Fallback for unexpected response shape
        return {
          content: 'No response generated',
          model: modelId,
          provider: modelId,
          usage: null,
          fallback: true
        }
      }
    } catch (error) {
      console.error(`Error generating response with DeepSeek:`, error)
      return {
        content: 'Sorry, there was an error generating a response.',
        model: modelId,
        provider: modelId,
        usage: null,
        fallback: true
      }
    }
  }

  static getAvailableModels(): AIModel[] {
    return this.MODELS
  }

  static getModelById(id: string): AIModel | undefined {
    return this.MODELS.find(model => model.id === id)
  }
}

export async function GET(request: Request) {
  try {
    // Only DeepSeek model is available
    // Only DeepSeek model is available, no select model, no Hugging Face
    const models = [
      {
        id: 'deepseek-chat',
        name: 'DeepSeek Chat',
        description: 'DeepSeek V3 model for text generation and conversational AI',
        maxTokens: 2048,
        temperature: 0.7
      },
      {
        id: 'deepseek-reasoner',
        name: 'DeepSeek Reasoner',
        description: 'DeepSeek R1 model for advanced reasoning and text generation',
        maxTokens: 2048,
        temperature: 0.7
      }
    ]
    return Response.json({ models })
  } catch (error) {
    console.error('Failed to fetch models:', error)
    return Response.json(
      { error: 'Failed to fetch models' },
      { status: 500 }
    )
  }
}