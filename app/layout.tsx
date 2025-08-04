import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { AuthProvider } from '@/contexts/auth-context'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BrainLoop AI - Chat with Gemini | Modern AI Chatbot',
  description: 'Chat with BrainLoop AI, your intelligent assistant powered by Google Gemini. Enjoy real-time, secure, and private conversations. Built with Next.js, React, and Supabase. Try it now at https://brain-loop-ai.vercel.app/',
  keywords: [
    'AI chatbot',
    'Gemini AI',
    'Google Gemini',
    'BrainLoop AI',
    'Next.js chatbot',
    'React AI',
    'Supabase',
    'ChatGPT alternative',
    'AI assistant',
    'Modern chatbot',
    'Real-time chat',
    'Secure AI chat',
    'Private AI chatbot',
    'brain-loop-ai.vercel.app',
    'brain loop ai',
    'AI conversation',
    'Best AI chatbot',
    'Free AI chatbot',
    'SEO',
    'OpenAI',
    'Google AI',
  ],
  authors: [{ name: 'BrainLoop AI Team', url: 'https://brain-loop-ai.vercel.app/' }],
  creator: 'BrainLoop AI',
  openGraph: {
    title: 'BrainLoop AI - Chat with Gemini | Modern AI Chatbot',
    description: 'Chat with BrainLoop AI, your intelligent assistant powered by Google Gemini. Real-time, secure, and private conversations.',
    url: 'https://brain-loop-ai.vercel.app/',
    siteName: 'BrainLoop AI',
    images: [
      {
        url: 'https://brain-loop-ai.vercel.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'BrainLoop AI - Chat with Gemini',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BrainLoop AI - Chat with Gemini',
    description: 'Chat with BrainLoop AI, your intelligent assistant powered by Google Gemini.',
    site: '@brainloopai',
    creator: '@brainloopai',
    images: ['https://brain-loop-ai.vercel.app/og-image.png'],
  },
  metadataBase: new URL('https://brain-loop-ai.vercel.app'),
  alternates: {
    canonical: 'https://brain-loop-ai.vercel.app/',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      // maxVideoPreview: -1,
      // maxImagePreview: 'large',
      // maxSnippet: -1,
    },
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
} 