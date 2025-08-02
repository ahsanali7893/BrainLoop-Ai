"use client"
import StreamingChatInterface from '@/components/streaming-chat-interface'
import Header from '@/components/header'
import ProtectedRoute from '@/components/protected-route'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function ConversationPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  useEffect(() => {
    // Optionally, you could fetch and validate the conversation here
  }, [params.id]);

  return (
    <ProtectedRoute>
      <div className="flex h-screen flex-col bg-background">
        <Header />
        <div className="flex-1 overflow-hidden">
          <StreamingChatInterface conversationId={params.id} />
        </div>
      </div>
    </ProtectedRoute>
  )
}
