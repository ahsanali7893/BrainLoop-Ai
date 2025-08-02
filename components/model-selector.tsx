"use client"

import { useState, useEffect } from 'react'
import { ChevronDown, Bot } from 'lucide-react'

interface AIModel {
  id: string
  name: string
  description: string
  maxTokens?: number
  temperature?: number
}

interface ModelSelectorProps {
  selectedModel: string
  onModelChange: (modelId: string) => void
  disabled?: boolean
}

export default function ModelSelector({ selectedModel, onModelChange, disabled = false }: ModelSelectorProps) {
  const [models, setModels] = useState<AIModel[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchModels()
  }, [])

  const fetchModels = async () => {
    // Only DeepSeek model is available
    setModels([
      {
        id: 'deepseek-ai/DeepSeek-R1',
        name: 'DeepSeek-R1',
        description: 'DeepSeek R1 model for text generation and conversational AI',
        maxTokens: 2048,
        temperature: 0.7
      }
    ])
    setLoading(false)
  }

  const selectedModelData = models.find(model => model.id === selectedModel)

  const getProviderIcon = () => <Bot className="h-4 w-4 text-gray-500" />

  const getProviderName = () => 'DeepSeek'

  if (loading) {
    return (
      <div className="flex items-center space-x-2 px-3 py-2 text-sm text-muted-foreground">
        <Bot className="h-4 w-4 animate-spin" />
        <span>Loading models...</span>
      </div>
    )
  }

  if (models.length === 0) {
    return (
      <div className="flex items-center space-x-2 px-3 py-2 text-sm text-muted-foreground">
        <Bot className="h-4 w-4" />
        <span>No models available</span>
      </div>
    )
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled}
        className="flex items-center justify-between w-full px-3 py-2 text-sm bg-background border rounded-md hover:bg-accent hover:text-accent-foreground disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <div className="flex items-center space-x-2">
          {selectedModelData ? (
            <>
              {getProviderIcon()}
              <span className="font-medium">{selectedModelData.name}</span>
              <span className="text-xs text-muted-foreground">(DeepSeek)</span>
            </>
          ) : (
            <>
              <Bot className="h-4 w-4" />
              <span>Select Model</span>
            </>
          )}
        </div>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-background border rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
          <button
            className={`w-full flex items-start space-x-3 p-3 text-left hover:bg-accent hover:text-accent-foreground ${!selectedModel ? 'bg-accent text-accent-foreground' : ''}`}
            onClick={() => {
              onModelChange('')
              setIsOpen(false)
            }}
          >
            <div className="flex-shrink-0 mt-0.5">
              <Bot className="h-4 w-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <span className="font-medium text-sm">Select Model</span>
                <span className="text-xs text-muted-foreground">(DeepSeek)</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Choose DeepSeek or another model for your chat.</p>
            </div>
          </button>
          {models.map((model) => (
            <button
              key={model.id}
              onClick={() => {
                onModelChange(model.id)
                setIsOpen(false)
              }}
              className={`w-full flex items-start space-x-3 p-3 text-left hover:bg-accent hover:text-accent-foreground ${
                selectedModel === model.id ? 'bg-accent text-accent-foreground' : ''
              }`}
            >
              <div className="flex-shrink-0 mt-0.5">
                {getProviderIcon()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-sm">{model.name}</span>
                  <span className="text-xs text-muted-foreground">DeepSeek</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {model.description}
                </p>
                {model.maxTokens && (
                  <p className="text-xs text-muted-foreground">
                    Max tokens: {model.maxTokens.toLocaleString()}
                  </p>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
} 