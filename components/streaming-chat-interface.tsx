"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { useAuth } from "@/contexts/auth-context";
import { Send, Bot, User, Loader2, Menu } from "lucide-react";
import MessageList from "./message-list";
import TypingText from "./typing-text";
import MessageInput from "./message-input";
import ModelSelector from "./model-selector";
import { Message } from "@/types/chat";
// import { useEffect, useState, useRef } from 'react'
import { ConversationService } from "@/lib/conversation-service";

export default function StreamingChatInterface({ conversationId: initialConversationId }: { conversationId?: string } = {}) {
  const router = useRouter();
  const { user } = useAuth();
  // Sidebar state for conversation history
  const [conversations, setConversations] = useState<any[]>([]);
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(initialConversationId || null);

  // Fetch conversation history on mount and when user changes
  useEffect(() => {
    async function fetchConversations() {
      if (!user) return;
      try {
        // Fetch conversations with latest message for preview
        const data = await ConversationService.getConversations();
        // For each conversation, fetch its latest message for preview
        const conversationsWithPreview = await Promise.all(
          (data || []).map(async (conv: any) => {
            const messages = await ConversationService.getConversationHistory(conv.id, 1);
            return { ...conv, preview: messages[0]?.content || '' };
          })
        );
        setConversations(conversationsWithPreview);
        // If initialConversationId is set, load its messages
        if (initialConversationId) {
          const convData = await ConversationService.getConversation(initialConversationId);
          setMessages(
            (convData.messages || []).map((msg: any) => ({
              id: msg.id,
              content: msg.content,
              role: msg.role,
              timestamp: new Date(msg.created_at),
            }))
          );
        }
      } catch (err) {
        setConversations([]);
      }
    }
    fetchConversations();
  }, [user, initialConversationId]);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm your AI assistant. I can use different AI models from OpenAI and Hugging Face. How can I help you today?",
      role: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState("");
  // Set default to DeepSeek model only
  const [selectedModel, setSelectedModel] = useState("deepseek/deepseek-r1:free");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingMessage]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim() || !user) return;

    setIsLoading(true);
    setStreamingMessage("");

    let conversationId = selectedConversationId;
    try {
      // If no conversation, create one first
      if (!conversationId) {
        const newConv = await ConversationService.createConversation("New Chat", user.id);
        conversationId = newConv.id;
        setSelectedConversationId(conversationId);
        // Refresh conversations list
        const data = await ConversationService.getConversations();
        setConversations(data || []);
        setMessages([]);
      }

      // Add user message to DB
      await ConversationService.addMessage(conversationId as string, "user", content, user.id);

      const userMessage: Message = {
        id: Date.now().toString(),
        content,
        role: "user",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMessage]);

      // Prepare conversation history
      const conversationHistory = messages
        .filter((msg) => msg.role !== "system")
        .map((msg) => ({
          role: msg.role,
          content: msg.content,
        }));


      // TEMP: Use Gemini API instead of DeepSeek
      // const response = await fetch("/api/chat", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Accept: "application/json",
      //     "X-Model": selectedModel,
      //   },
      //   body: JSON.stringify({
      //     message: content,
      //     conversationId,
      //     conversationHistory,
      //     modelId: 'deepseek/deepseek-r1:free'
      //   }),
      // });

      // Gemini API call (replace with your actual Gemini endpoint and params)
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          message: content,
          conversationId,
          conversationHistory
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to get response");
      }

      const data = await response.json();

      // Add assistant message to DB
      await ConversationService.addMessage(conversationId as string, "assistant", data.response, user.id);

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        role: "assistant",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error getting AI response:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `Sorry, I encountered an error: ${
          error instanceof Error ? error.message : "Unknown error"
        }. Please try again.`,
        role: "assistant",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle navigation to conversation by id
  // If selectedConversationId changes, update the URL
  // Use dynamic import to avoid SSR issues
  useEffect(() => {
    if (selectedConversationId && selectedConversationId !== initialConversationId) {
      router.push(`/conversation/${selectedConversationId}`);
    }
  }, [selectedConversationId, initialConversationId, router]);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-full">
      {/* Mobile sidebar toggle button */}
      <button
        className="fixed top-4 left-4 z-50 md:hidden bg-primary text-primary-foreground rounded-full p-2 shadow-lg"
        onClick={() => setSidebarOpen(true)}
        aria-label="Open sidebar"
      >
        <Menu className="h-6 w-6" />
      </button>
      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 z-40 h-full w-72 bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 shadow-lg p-4 gap-4 flex-col transition-transform duration-300 ${sidebarOpen ? 'flex translate-x-0' : 'hidden -translate-x-full'} md:flex md:translate-x-0`}
        style={{ minHeight: '100vh' }}
      >
        {/* Close button for mobile */}
        <button
          className="md:hidden absolute top-4 right-4 bg-gray-200 dark:bg-gray-800 rounded-full p-1"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="text-xl font-bold mb-2">Conversations</div>
        <div className="flex-1 overflow-y-auto">
          {conversations.length === 0 ? (
            <div className="text-muted-foreground text-sm">No history yet.</div>
          ) : (
            <ul className="space-y-2">
              {conversations.map((conv) => (
                <li key={conv.id} className="group flex items-center">
                  <button
                    className={`flex-1 w-full text-left px-3 py-2 rounded-lg transition-colors font-medium text-base ${
                      selectedConversationId === conv.id
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-gray-100 dark:hover:bg-gray-900"
                    }`}
                    onClick={async () => {
                      setSelectedConversationId(conv.id);
                      // Load messages for this conversation
                      const convData = await ConversationService.getConversation(conv.id);
                      setMessages(
                        (convData.messages || []).map((msg: any) => ({
                          id: msg.id,
                          content: msg.content,
                          role: msg.role,
                          timestamp: new Date(msg.created_at),
                        }))
                      );
                    }}
                  >
                    <div className="truncate font-semibold">{conv.title || "Untitled"}</div>
                    {conv.preview && (
                      <div className="truncate text-xs text-muted-foreground mt-1">{conv.preview.split(' ').slice(0, 8).join(' ')}{conv.preview.split(' ').length > 8 ? '...' : ''}</div>
                    )}
                  </button>
                  <button
                    className="ml-2 opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition"
                    title="Delete conversation"
                    onClick={async (e) => {
                      e.stopPropagation();
                      await ConversationService.deleteConversation(conv.id);
                      setConversations(conversations.filter((c) => c.id !== conv.id));
                      if (selectedConversationId === conv.id) {
                        setSelectedConversationId(null);
                        setMessages([
                          {
                            id: "1",
                            content:
                              "Hello! I'm your AI assistant. I can use different AI models from OpenAI and Hugging Face. How can I help you today?",
                            role: "assistant",
                            timestamp: new Date(),
                          },
                        ]);
                      }
                    }}
                  >
                    🗑️
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <button
          className="mt-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90"
          onClick={async () => {
            if (!user) return;
            const newConv = await ConversationService.createConversation("New Chat", user.id);
            setSelectedConversationId(newConv.id);
            setMessages([]);
            const data = await ConversationService.getConversations();
            setConversations(data || []);
          }}
        >
          + New Chat
        </button>
      </aside>

      {/* Main chat area */}
      <main className="flex-1 flex flex-col overflow-y-auto h-full">
        {/* Header & Model Selector (always visible at the top) */}
        {/* <div className="flex flex-col gap-2 border-b bg-background/80 backdrop-blur p-4 sticky top-0 z-20">
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold tracking-tight">AI Chat</span>
            <div className="max-w-xs">
              <ModelSelector
                selectedModel={selectedModel}
                onModelChange={setSelectedModel}
                disabled={isLoading}
              />
            </div>
          </div>
        </div> */}
        <div className="flex-1 flex items-center justify-center">
          <div className="relative flex flex-col w-full h-full bg-white dark:bg-gray-950 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
            {/* Chat messages */}
            <div className="flex-1 overflow-y-auto px-6 py-4 mt-12 bg-gradient-to-b from-transparent to-gray-100 dark:to-gray-900">
              <MessageList messages={messages} />
              {streamingMessage && (
                <div className="flex items-start space-x-3 justify-start mb-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="max-w-[80%] rounded-xl px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-md animate-fade-in prose prose-neutral dark:prose-invert text-base">
                    <TypingText text={streamingMessage} speed={18} />
                    <span className="animate-pulse">▋</span>
                  </div>
                </div>
              )}
              {isLoading && !streamingMessage && (
                <div className="flex items-start space-x-3 justify-start mb-4 animate-fade-in">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="max-w-[80%] rounded-xl px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-md prose prose-neutral dark:prose-invert text-base">
                    <div className="whitespace-pre-wrap ">
                      <span className="animate-pulse">AI is typing…</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            {/* Input area */}
            <div className="border-t bg-background/80 backdrop-blur p-4 sticky bottom-0 z-10">
              <MessageInput
                onSendMessage={handleSendMessage}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
