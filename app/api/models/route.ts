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