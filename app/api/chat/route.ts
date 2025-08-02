import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'
import { ConversationService } from '@/lib/conversation-service'
import OpenAI from 'openai'

export async function POST(request: NextRequest) {
  try {
    const { message, conversationId, conversationHistory = [], modelId = 'deepseek/deepseek-r1:free' } = await request.json()

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    // For now, let's skip authentication check to test the AI functionality
    // TODO: Implement proper authentication handling
    let user = null
    try {
      const supabase = createServerClient()
      const { data: { user: authUser }, error: authError } = await supabase.auth.getUser()
      if (!authError && authUser) {
        user = authUser
      }
    } catch (error) {
      console.log('Authentication check failed, continuing without user:', error)
    }

    // Only DeepSeek R1 model is supported
    if (modelId !== 'deepseek/deepseek-r1:free') {
      return NextResponse.json(
        { error: `Model ${modelId} not supported. Only DeepSeek-R1 is available.` },
        { status: 400 }
      )
    }

    // Prepare messages for OpenRouter API
    const messages = [
      { role: 'system', content: 'You are a helpful assistant.' },
      ...conversationHistory.map((msg: any) => ({ role: msg.role, content: msg.content })),
      { role: 'user', content: message }
    ]

    // Call DeepSeek R1 via OpenRouter API
    const openrouterApiKey = process.env.OPENROUTER_API_KEY || process.env.DEEPSEEK_API_KEY
    if (!openrouterApiKey) {
      return NextResponse.json(
        { error: 'OpenRouter/DeepSeek API key not configured.' },
        { status: 500 }
      )
    }

    const openai = new OpenAI({
      baseURL: 'https://openrouter.ai/api/v1',
      apiKey: openrouterApiKey,
      defaultHeaders: {
        "HTTP-Referer": process.env.SITE_URL || '',
        "X-Title": process.env.SITE_NAME || ''
      }
    })

    const completion = await openai.chat.completions.create({
      model: 'deepseek/deepseek-r1:free',
      messages,
      max_tokens: 2048,
      temperature: 0.7
    })
    const aiContent = completion.choices?.[0]?.message?.content || 'No response generated.'

    // Save messages to database if conversationId is provided and user is authenticated
    if (conversationId && user) {
      try {
        // Save user message
        await ConversationService.addMessage(conversationId, 'user', message)
        // Save AI response
        await ConversationService.addMessage(conversationId, 'assistant', aiContent)
      } catch (dbError) {
        console.error('Failed to save messages to database:', dbError)
        // Continue even if database save fails
      }
    }

    return NextResponse.json({ 
      response: aiContent,
      timestamp: new Date().toISOString(),
      model: 'deepseek/deepseek-r1:free',
      provider: 'deepseek',
      usage: completion.usage || undefined
    })

  } catch (error: any) {
    console.error('Chat API error:', error)

    // Handle specific API errors
    if (error?.status === 401) {
      return NextResponse.json(
        { error: 'Invalid API key. Please check your API configuration.', details: error?.message || error?.toString() },
        { status: 401 }
      )
    }

    if (error?.status === 429) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.', details: error?.message || error?.toString() },
        { status: 429 }
      )
    }

    // Fallback to simulated response if AI service fails, but include error details for debugging
    const fallbackResponses = [
      "I'm having trouble connecting to my AI service right now, but I can still help with some basic responses.",
      "There seems to be a temporary issue with my AI connection. Let me provide a helpful response based on common knowledge.",
      "I'm experiencing some technical difficulties, but I'll do my best to assist you.",
    ]

    const fallbackResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)] +
      " This is a fallback response. Please check your AI API configuration."

    return NextResponse.json({
      response: fallbackResponse,
      timestamp: new Date().toISOString(),
      fallback: true,
      error: error?.message || error?.toString() || 'Unknown error'
    })
  }
} 