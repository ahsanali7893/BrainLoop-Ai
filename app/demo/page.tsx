import Link from 'next/link'
import { Bot, MessageCircle, Zap, Moon, Sun, Smartphone, Code, Palette } from 'lucide-react'

export default function DemoPage() {
  return (
    <div className="min-h-screen w-full bg-background flex flex-col">
      {/* Hero Section */}
      <section className="py-20 px-4 w-full">
        <div className="max-w-4xl mx-auto w-full text-center">
          <div className="flex justify-center mb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Bot className="h-8 w-8" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4">AI Chatbot Demo</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Experience a modern, responsive AI chatbot built with Next.js, TypeScript, and Tailwind CSS.
          </p>
          <Link 
            href="/"
            className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            Try the Chatbot
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/50 w-full">
        <div className="max-w-5xl mx-auto w-full">
          <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            <div className="bg-background p-6 rounded-lg border">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-time Chat</h3>
              <p className="text-muted-foreground">
                Instant message sending and receiving with smooth animations and loading states.
              </p>
            </div>

            <div className="bg-background p-6 rounded-lg border">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
                <Moon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Dark/Light Theme</h3>
              <p className="text-muted-foreground">
                Automatic theme switching with system preference support and manual toggle.
              </p>
            </div>

            <div className="bg-background p-6 rounded-lg border">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
                <Smartphone className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Mobile Responsive</h3>
              <p className="text-muted-foreground">
                Perfect experience on all devices with responsive design and touch-friendly interface.
              </p>
            </div>

            <div className="bg-background p-6 rounded-lg border">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
                <Code className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">TypeScript</h3>
              <p className="text-muted-foreground">
                Full type safety and better development experience with modern TypeScript.
              </p>
            </div>

            <div className="bg-background p-6 rounded-lg border">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
                <Palette className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Modern UI</h3>
              <p className="text-muted-foreground">
                Clean, modern design inspired by ChatGPT with beautiful animations and interactions.
              </p>
            </div>

            <div className="bg-background p-6 rounded-lg border">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
                <MessageCircle className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Integration</h3>
              <p className="text-muted-foreground">
                Simple API integration with OpenAI, Anthropic, or any AI service of your choice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-16 px-4 w-full">
        <div className="max-w-5xl mx-auto w-full">
          <h2 className="text-3xl font-bold text-center mb-12">Tech Stack</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900/20 p-4 rounded-lg mb-4">
                <h3 className="font-semibold text-blue-600 dark:text-blue-400">Next.js 14</h3>
              </div>
              <p className="text-sm text-muted-foreground">React Framework</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900/20 p-4 rounded-lg mb-4">
                <h3 className="font-semibold text-blue-600 dark:text-blue-400">TypeScript</h3>
              </div>
              <p className="text-sm text-muted-foreground">Type Safety</p>
            </div>
            <div className="text-center">
              <div className="bg-cyan-100 dark:bg-cyan-900/20 p-4 rounded-lg mb-4">
                <h3 className="font-semibold text-cyan-600 dark:text-cyan-400">Tailwind CSS</h3>
              </div>
              <p className="text-sm text-muted-foreground">Styling</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 dark:bg-purple-900/20 p-4 rounded-lg mb-4">
                <h3 className="font-semibold text-purple-600 dark:text-purple-400">Lucide Icons</h3>
              </div>
              <p className="text-sm text-muted-foreground">Icons</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary text-primary-foreground w-full">
        <div className="max-w-4xl mx-auto w-full text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Try?</h2>
          <p className="text-xl mb-8 opacity-90">
            Experience the modern AI chatbot interface now.
          </p>
          <Link 
            href="/"
            className="inline-flex items-center px-8 py-4 bg-background text-foreground rounded-lg hover:bg-background/90 transition-colors font-semibold"
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            Start Chatting
          </Link>
        </div>
      </section>
    </div>
  )
} 