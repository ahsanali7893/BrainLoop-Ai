# AI Chatbot

A modern, responsive AI chatbot built with Next.js, TypeScript, and Tailwind CSS. This application provides a ChatGPT-like interface with **real AI capabilities** powered by **OpenAI and Hugging Face**, featuring user authentication, persistent conversations, multiple AI models, and a beautiful user experience.

## Features

- 🤖 **Multiple AI Providers** - OpenAI GPT models and Hugging Face open-source models
- 🎯 **Model Selection** - Choose from 9+ different AI models
- 🔐 **User Authentication** - Secure signup/login with Supabase Auth
- 💾 **Persistent Storage** - Conversations and messages stored in Supabase database
- 🚀 **Modern UI/UX** - Clean, responsive design similar to ChatGPT
- 🌙 **Dark/Light Theme** - Automatic theme switching with system preference support
- 💬 **Real-time Responses** - Fast AI responses with proper error handling
- ⚡ **TypeScript** - Full type safety and better development experience
- 🎨 **Tailwind CSS** - Utility-first CSS framework for rapid styling
- 📱 **Mobile Responsive** - Works perfectly on all device sizes
- ⌨️ **Keyboard Shortcuts** - Enter to send, Shift+Enter for new line
- 🔄 **Loading States** - Smooth loading indicators and animations
- 📝 **Conversation History** - Full conversation context for better AI responses
- 🎯 **Accessibility** - ARIA labels and keyboard navigation
- ⚙️ **Easy Setup** - Simple configuration page for API key setup
- 🔒 **Row Level Security** - Secure data access with Supabase RLS policies
- 💰 **Cost Effective** - Free Hugging Face models alongside OpenAI options

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth + Real-time)
- **AI**: OpenAI GPT models + Hugging Face models
- **Icons**: Lucide React
- **UI Components**: Custom components with Radix UI primitives
- **State Management**: React hooks (useState, useEffect)
- **Authentication**: Supabase Auth
- **Database**: PostgreSQL with Row Level Security
- **Build Tool**: Next.js built-in bundler

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd ai-chatbot
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## Project Structure

```
ai-chatbot/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── chat-interface.tsx # Main chat component
│   ├── header.tsx         # Header with theme toggle
│   ├── message-input.tsx  # Message input component
│   ├── message-list.tsx   # Message list component
│   ├── message-content.tsx # Message content renderer
│   └── theme-provider.tsx # Theme context provider
├── types/                 # TypeScript type definitions
│   └── chat.ts           # Chat-related types
├── public/               # Static assets
└── package.json          # Dependencies and scripts
```

## Configuration

### Environment Variables

Create a `.env.local` file in the root directory with your API keys:

```env
# Required: Your OpenAI API key (for OpenAI models)
OPENAI_API_KEY=your_openai_api_key_here

# Required: Your Hugging Face API token (for Hugging Face models)
HUGGINGFACE_API_KEY=your_huggingface_api_token_here

# Required: Your Supabase configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Optional: Choose your preferred model
OPENAI_MODEL=gpt-3.5-turbo

# Optional: App configuration
NEXT_PUBLIC_APP_NAME="AI Chatbot"
NEXT_PUBLIC_APP_DESCRIPTION="A modern AI chatbot built with Next.js, Supabase, and multiple AI providers"
```

### Getting Your API Keys

#### OpenAI API Key
1. Visit [OpenAI Platform](https://platform.openai.com)
2. Create an account or sign in
3. Navigate to [API Keys](https://platform.openai.com/api-keys)
4. Create a new API key
5. Copy the key and add it to your `.env.local` file

#### Hugging Face API Token
1. Visit [Hugging Face](https://huggingface.co)
2. Create an account or sign in
3. Go to Settings → Access Tokens
4. Create a new token with "Read" permissions
5. Copy the token (starts with `hf_`) and add it to your `.env.local` file

#### Supabase Configuration
1. Visit [Supabase](https://supabase.com) and create a project
2. Go to Settings → API
3. Copy your Project URL and anon key
4. Add them to your `.env.local` file
5. Run the database schema from `supabase/schema.sql`

**📖 See [SUPABASE_SETUP.md](SUPABASE_SETUP.md) for detailed Supabase setup instructions.**
**📖 See [HUGGINGFACE_SETUP.md](HUGGINGFACE_SETUP.md) for detailed Hugging Face setup instructions.**

### Customization

- **Colors**: Modify the CSS variables in `app/globals.css`
- **Styling**: Update Tailwind classes in components
- **AI Integration**: Replace the `simulateAIResponse` function in `chat-interface.tsx`

## AI Integration

The chatbot is now fully integrated with OpenAI's GPT models! Here's what's included:

### ✅ **Already Implemented**

- **Real OpenAI Integration** - Uses GPT-3.5-turbo by default, supports GPT-4
- **Streaming Responses** - Real-time AI response streaming for better UX
- **Conversation Context** - Full conversation history for better responses
- **Error Handling** - Graceful fallbacks and error messages
- **API Key Validation** - Built-in setup page to test your API key

### 🚀 **Features**

- **Multiple Models** - Support for GPT-3.5-turbo, GPT-4, and GPT-4-turbo
- **Streaming** - Watch AI responses appear in real-time
- **Context Awareness** - AI remembers your conversation history
- **Smart Fallbacks** - Works even if API is temporarily unavailable
- **Easy Setup** - Visit `/setup` to configure your API key

### 📊 **Usage Tracking**

The app tracks token usage and provides insights into your API consumption.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by ChatGPT and modern chat interfaces
- Built with Next.js and Tailwind CSS
- Icons from Lucide React
- UI patterns from modern design systems # BrainLoop-Ai
