import StreamingChatInterface from '@/components/streaming-chat-interface'
import Header from '@/components/header'
import ProtectedRoute from '@/components/protected-route'

export default function Home() {
  return (
    <ProtectedRoute>
      <div className="flex h-screen flex-col bg-background">
        <Header />
        <div className="flex-1 overflow-hidden">
          <StreamingChatInterface />
        </div>
      </div>
    </ProtectedRoute>
  )
} 