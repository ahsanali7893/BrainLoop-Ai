import { supabase } from './supabase'

export class ConversationService {
  // Get all conversations for the current user
  static async getConversations() {
    const { data: conversations, error } = await supabase
      .from('conversations')
      .select('*')
      .order('updated_at', { ascending: false })

    if (error) {
      throw new Error(`Failed to fetch conversations: ${error.message}`)
    }

    return conversations
  }

  // Get a single conversation with all its messages
  static async getConversation(id: string) {
    const { data: conversation, error: conversationError } = await supabase
      .from('conversations')
      .select('*')
      .eq('id', id)
      .single()

    if (conversationError) {
      throw new Error(`Failed to fetch conversation: ${conversationError.message}`)
    }

    const { data: messages, error: messagesError } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', id)
      .order('created_at', { ascending: true })

    if (messagesError) {
      throw new Error(`Failed to fetch messages: ${messagesError.message}`)
    }

    return {
      conversation,
      messages
    }
  }

  // Create a new conversation

  static async createConversation(title: string, userId?: string) {
    // userId should be provided from the authenticated context (API/backend)
    if (!userId) {
      throw new Error('User ID is required to create a conversation (RLS enforced)')
    }
    const { data: conversation, error } = await supabase
      .from('conversations')
      .insert({
        title,
        user_id: userId
      })
      .select()
      .single()

    if (error) {
      throw new Error(`Failed to create conversation: ${error.message}`)
    }

    return conversation
  }

  // Add a message to a conversation
  static async addMessage(conversationId: string, role: 'user' | 'assistant' | 'system', content: string, userId?: string) {
    // userId should be provided from the authenticated context (API/backend)
    if (!userId) {
      throw new Error('User ID is required to add a message (RLS enforced)')
    }
    const { data: message, error } = await supabase
      .from('messages')
      .insert({
        conversation_id: conversationId,
        role,
        content
      })
      .select()
      .single()

    if (error) {
      throw new Error(`Failed to add message: ${error.message}`)
    }

    return message
  }

  // Get conversation history for AI context
  static async getConversationHistory(conversationId: string, limit: number = 10) {
    const { data: messages, error } = await supabase
      .from('messages')
      .select('role, content')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) {
      throw new Error(`Failed to fetch conversation history: ${error.message}`)
    }

    // Reverse to get chronological order
    return messages.reverse()
  }

  // Delete a conversation and all its messages
  static async deleteConversation(id: string) {
    const { error } = await supabase
      .from('conversations')
      .delete()
      .eq('id', id)

    if (error) {
      throw new Error(`Failed to delete conversation: ${error.message}`)
    }
  }

  // Update conversation title
  static async updateConversationTitle(id: string, title: string) {
    const { data: conversation, error } = await supabase
      .from('conversations')
      .update({ title })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      throw new Error(`Failed to update conversation: ${error.message}`)
    }

    return conversation
  }
} 