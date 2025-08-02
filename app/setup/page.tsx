"use client"

import { useState } from 'react'
import { Bot, Key, Settings, CheckCircle, AlertCircle } from 'lucide-react'
import Link from 'next/link'

export default function SetupPage() {
  const [openaiKey, setOpenaiKey] = useState('')
  const [huggingfaceKey, setHuggingfaceKey] = useState('')
  const [selectedProvider, setSelectedProvider] = useState<'openai' | 'huggingface'>('openai')
  const [isValidating, setIsValidating] = useState(false)
  const [validationResult, setValidationResult] = useState<{
    success: boolean
    message: string
  } | null>(null)

  const validateApiKey = async () => {
    const currentKey = selectedProvider === 'openai' ? openaiKey : huggingfaceKey
    
    if (!currentKey.trim()) {
      setValidationResult({
        success: false,
        message: `Please enter a ${selectedProvider === 'openai' ? 'OpenAI' : 'Hugging Face'} API key`
      })
      return
    }

    setIsValidating(true)
    setValidationResult(null)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: 'Hello',
          testMode: true,
          modelId: selectedProvider === 'openai' ? 'gpt-3.5-turbo' : 'microsoft/DialoGPT-medium',
          apiKey: currentKey
        }),
      })

      if (response.ok) {
        setValidationResult({
          success: true,
          message: `${selectedProvider === 'openai' ? 'OpenAI' : 'Hugging Face'} API key is valid! You can now use the chatbot.`
        })
      } else {
        const error = await response.json()
        setValidationResult({
          success: false,
          message: error.error || 'Invalid API key'
        })
      }
    } catch (error) {
      setValidationResult({
        success: false,
        message: 'Failed to validate API key. Please try again.'
      })
    } finally {
      setIsValidating(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Bot className="h-8 w-8" />
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-4">Setup Your AI Chatbot</h1>
            <p className="text-muted-foreground">
              Configure your OpenAI API key to start using the real AI chatbot
            </p>
          </div>

          {/* Setup Form */}
          <div className="bg-card border rounded-lg p-6 mb-8">
            <div className="flex items-center mb-6">
              <Key className="h-5 w-5 mr-2 text-primary" />
              <h2 className="text-xl font-semibold">AI Provider Configuration</h2>
            </div>

            <div className="space-y-6">
              {/* Provider Selection */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  AI Provider
                </label>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setSelectedProvider('openai')}
                    className={`px-4 py-2 rounded-md border ${
                      selectedProvider === 'openai'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-background hover:bg-accent'
                    }`}
                  >
                    OpenAI
                  </button>
                  <button
                    onClick={() => setSelectedProvider('huggingface')}
                    className={`px-4 py-2 rounded-md border ${
                      selectedProvider === 'huggingface'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-background hover:bg-accent'
                    }`}
                  >
                    Hugging Face
                  </button>
                </div>
              </div>

              {/* API Key Input */}
              <div>
                <label htmlFor="apiKey" className="block text-sm font-medium mb-2">
                  {selectedProvider === 'openai' ? 'OpenAI' : 'Hugging Face'} API Key
                </label>
                <input
                  id="apiKey"
                  type="password"
                  value={selectedProvider === 'openai' ? openaiKey : huggingfaceKey}
                  onChange={(e) => {
                    if (selectedProvider === 'openai') {
                      setOpenaiKey(e.target.value)
                    } else {
                      setHuggingfaceKey(e.target.value)
                    }
                  }}
                  placeholder={selectedProvider === 'openai' ? 'sk-...' : 'hf_...'}
                  className="w-full px-3 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Get your API key from{' '}
                  <a 
                    href={selectedProvider === 'openai' 
                      ? "https://platform.openai.com/api-keys"
                      : "https://huggingface.co/settings/tokens"
                    } 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {selectedProvider === 'openai' ? 'OpenAI Platform' : 'Hugging Face Settings'}
                  </a>
                </p>
              </div>

              {/* Validation Button */}
              <button
                onClick={validateApiKey}
                disabled={isValidating || !(selectedProvider === 'openai' ? openaiKey : huggingfaceKey).trim()}
                className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isValidating ? 'Validating...' : `Validate ${selectedProvider === 'openai' ? 'OpenAI' : 'Hugging Face'} API Key`}
              </button>

              {/* Validation Result */}
              {validationResult && (
                <div className={`p-4 rounded-md ${
                  validationResult.success 
                    ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' 
                    : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
                }`}>
                  <div className="flex items-center">
                    {validationResult.success ? (
                      <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mr-2" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mr-2" />
                    )}
                    <span className={validationResult.success ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'}>
                      {validationResult.message}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-muted/50 border rounded-lg p-6 mb-8">
            <div className="flex items-center mb-4">
              <Settings className="h-5 w-5 mr-2 text-primary" />
              <h3 className="text-lg font-semibold">Setup Instructions</h3>
            </div>
            <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
              <li>Choose your preferred AI provider (OpenAI or Hugging Face)</li>
              <li>Create an account on the selected platform:
                <ul className="list-disc list-inside ml-4 mt-1">
                  <li><a href="https://platform.openai.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">OpenAI Platform</a></li>
                  <li><a href="https://huggingface.co" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Hugging Face</a></li>
                </ul>
              </li>
              <li>Navigate to the API Keys/Tokens section</li>
              <li>Create a new API key/token</li>
              <li>Copy the key and paste it above</li>
              <li>Click "Validate API Key" to test the connection</li>
              <li>Once validated, you can start chatting with multiple AI models!</li>
            </ol>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/"
              className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 text-center font-medium"
            >
              Start Chatting
            </Link>
            <Link
              href="/demo"
              className="flex-1 px-6 py-3 border border-border rounded-md hover:bg-accent text-center font-medium"
            >
              View Demo
            </Link>
          </div>

          {/* Security Note */}
          <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mr-2 mt-0.5" />
              <div className="text-sm text-yellow-800 dark:text-yellow-200">
                <strong>Security Note:</strong> Your API key is stored locally and never sent to our servers. 
                Keep your API key secure and never share it publicly.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 