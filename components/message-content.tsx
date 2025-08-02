"use client"

import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'

interface MessageContentProps {
  content: string
  isUser?: boolean
  onEdit?: (newContent: string) => void
}

export default function MessageContent({ content, isUser = false, onEdit }: MessageContentProps) {
  const [editing, setEditing] = useState(false)
  const [editValue, setEditValue] = useState(content)

  const handleCopy = () => {
    navigator.clipboard.writeText(content)
  }

  if (editing) {
    return (
      <div className="bg-gray-50 p-2 rounded">
        <textarea
          className="w-full p-2 border rounded"
          value={editValue}
          onChange={e => setEditValue(e.target.value)}
        />
        <div className="flex gap-2 mt-2">
          <button className="px-2 py-1 bg-blue-500 text-white rounded" onClick={() => { setEditing(false); onEdit && onEdit(editValue); }}>Save</button>
          <button className="px-2 py-1 bg-gray-300 rounded" onClick={() => setEditing(false)}>Cancel</button>
        </div>
      </div>
    )
  }

  return (
    <div className={`prose prose-neutral dark:prose-invert whitespace-pre-wrap relative group text-base max-w-none ${isUser ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'} p-4 rounded-lg shadow-sm`}> 
      <ReactMarkdown
        children={content}
        components={{
          code(props) {
            const { inline, className, children, ...rest } = props as any;
            return !inline ? (
              <SyntaxHighlighter language={className?.replace('language-', '') || ''}>
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...rest}>{children}</code>
            )
          }
        }}
      />
      <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="px-2 py-1 text-xs bg-gray-200 rounded hover:bg-gray-300" onClick={handleCopy}>Copy</button>
        {isUser && <button className="px-2 py-1 text-xs bg-yellow-200 rounded hover:bg-yellow-300" onClick={() => setEditing(true)}>Edit</button>}
      </div>
    </div>
  )
}