# 🚀 Supabase Backend Setup Guide

This guide will help you set up Supabase as the backend for your AI chatbot, providing authentication, database storage, and real-time features.

## 📋 Prerequisites

- A Supabase account (free tier available)
- Node.js 18+ installed
- Your AI chatbot project ready

## 🔧 Step 1: Create a Supabase Project

1. **Visit Supabase**
   - Go to [https://supabase.com](https://supabase.com)
   - Sign up or log in to your account

2. **Create New Project**
   - Click "New Project"
   - Choose your organization
   - Enter project details:
     - **Name**: `ai-chatbot` (or your preferred name)
     - **Database Password**: Create a strong password
     - **Region**: Choose closest to your users
   - Click "Create new project"

3. **Wait for Setup**
   - Supabase will provision your database (takes 1-2 minutes)
   - You'll receive an email when ready

## 🗄️ Step 2: Set Up Database Schema

1. **Open SQL Editor**
   - In your Supabase dashboard, go to "SQL Editor"
   - Click "New query"

2. **Run the Schema**
   - Copy the contents of `supabase/schema.sql`
   - Paste it into the SQL editor
   - Click "Run" to execute

3. **Verify Tables**
   - Go to "Table Editor" in the sidebar
   - You should see three tables:
     - `users` (extends auth.users)
     - `conversations`
     - `messages`

## 🔑 Step 3: Get Your API Keys

1. **Go to Settings**
   - In your Supabase dashboard, click "Settings" (gear icon)
   - Click "API" in the sidebar

2. **Copy Your Keys**
   - **Project URL**: Copy the "Project URL"
   - **Anon Key**: Copy the "anon public" key
   - Keep these secure - you'll need them for your app

## ⚙️ Step 4: Configure Your Environment

1. **Create Environment File**
   ```bash
   cp env.example .env.local
   ```

2. **Add Supabase Configuration**
   ```bash
   # Edit .env.local and add your Supabase keys
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   
   # Also add your OpenAI key
   OPENAI_API_KEY=your-openai-api-key-here
   ```

## 🔐 Step 5: Configure Authentication

1. **Enable Email Auth**
   - Go to "Authentication" → "Providers"
   - Ensure "Email" is enabled
   - Configure any additional providers if desired

2. **Set Up Email Templates** (Optional)
   - Go to "Authentication" → "Email Templates"
   - Customize confirmation and reset emails

3. **Configure Redirect URLs**
   - Go to "Authentication" → "URL Configuration"
   - Add your app URLs:
     - Site URL: `http://localhost:3000` (development)
     - Redirect URLs: `http://localhost:3000/auth/callback`

## 🚀 Step 6: Test Your Setup

1. **Start Your App**
   ```bash
   npm run dev
   ```

2. **Test Authentication**
   - Visit [http://localhost:3000](http://localhost:3000)
   - You should be redirected to login
   - Create an account and test sign in/out

3. **Test Database**
   - Send a message in the chat
   - Check Supabase dashboard → "Table Editor"
   - You should see conversations and messages being created

## 📊 Step 7: Monitor Your App

### **Database Monitoring**
- **Table Editor**: View and edit data directly
- **Logs**: Monitor database queries and errors
- **Analytics**: Track usage and performance

### **Authentication Monitoring**
- **Users**: View registered users
- **Sessions**: Monitor active sessions
- **Logs**: Track authentication events

## 🔧 Advanced Configuration

### **Row Level Security (RLS)**
The schema includes RLS policies that ensure:
- Users can only access their own data
- Conversations are private to each user
- Messages are protected by conversation ownership

### **Real-time Features**
Enable real-time subscriptions for live updates:
```typescript
// Subscribe to new messages
const subscription = supabase
  .channel('messages')
  .on('postgres_changes', 
    { event: 'INSERT', schema: 'public', table: 'messages' },
    (payload) => {
      console.log('New message:', payload.new)
    }
  )
  .subscribe()
```

### **Storage** (Optional)
Add file upload capabilities:
1. Go to "Storage" in Supabase dashboard
2. Create a new bucket called "uploads"
3. Configure RLS policies for the bucket

## 🚨 Troubleshooting

### **"Invalid API key" Error**
- Check your environment variables
- Ensure you're using the correct anon key (not service role)
- Restart your development server

### **"Authentication required" Error**
- Verify your Supabase URL and anon key
- Check that the user is properly authenticated
- Ensure RLS policies are correctly configured

### **Database Connection Issues**
- Check your Supabase project status
- Verify your database password
- Check network connectivity

### **RLS Policy Errors**
- Ensure all tables have RLS enabled
- Check that policies are correctly written
- Verify user authentication is working

## 📈 Performance Optimization

### **Database Indexes**
The schema includes indexes for:
- `conversations.user_id` - Fast user conversation lookup
- `conversations.updated_at` - Fast recent conversations
- `messages.conversation_id` - Fast message retrieval
- `messages.created_at` - Fast chronological ordering

### **Connection Pooling**
For production, consider:
- Using connection pooling
- Implementing caching strategies
- Monitoring query performance

## 🔒 Security Best Practices

1. **Environment Variables**
   - Never commit `.env.local` to version control
   - Use different keys for development and production
   - Rotate keys regularly

2. **RLS Policies**
   - Always enable RLS on user data
   - Test policies thoroughly
   - Use least privilege principle

3. **API Security**
   - Validate all inputs
   - Use prepared statements
   - Implement rate limiting

## 🚀 Deployment

### **Vercel Deployment**
1. Push your code to GitHub
2. Connect to Vercel
3. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `OPENAI_API_KEY`

### **Update Redirect URLs**
1. Go to Supabase dashboard
2. Update site URL to your production domain
3. Add production redirect URLs

## 📚 Additional Resources

- **Supabase Documentation**: [https://supabase.com/docs](https://supabase.com/docs)
- **Next.js with Supabase**: [https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs](https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs)
- **RLS Policies**: [https://supabase.com/docs/guides/auth/row-level-security](https://supabase.com/docs/guides/auth/row-level-security)

---

🎉 **Congratulations!** Your AI chatbot now has a powerful Supabase backend with authentication, database storage, and real-time capabilities. Users can sign up, have persistent conversations, and enjoy a secure, scalable experience. 