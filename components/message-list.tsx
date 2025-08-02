"use client"

import { Bot, User } from 'lucide-react'
import { Message } from '@/types/chat'
import MessageContent from './message-content'

interface MessageListProps {
  messages: Message[]
}

export default function MessageList({ messages }: MessageListProps) {
  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex items-start space-x-3 ${
            message.role === 'user' ? 'justify-end' : 'justify-start'
          }`}
        >
          {message.role === 'assistant' && (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Bot className="h-4 w-4" />
            </div>
          )}
          <div
            className={`max-w-[80%] rounded-lg px-4 py-2 ${
              message.role === 'user'
                ? ' text-white dark:text-gray-900'
                : 'bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-100'
            }`}
            data-message-type={message.role}
          >
            <MessageContent content={message.content} isUser={message.role === 'user'} />
            <div className="mt-1 text-xs opacity-70 text-gray-500 dark:text-gray-300">
              {message.timestamp.toLocaleTimeString()}
            </div>
          </div>
          {message.role === 'user' && (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
              <User className="h-4 w-4" />
            </div>
          )}
        </div>
      ))}
    </div>
  )
} 