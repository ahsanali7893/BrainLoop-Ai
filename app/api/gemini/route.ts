import { NextRequest, NextResponse } from 'next/server'

// Use environment variable for your Gemini API key
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

export async function POST(req: NextRequest) {
  const { message, conversationId, conversationHistory } = await req.json();

  // Prepare Gemini API request body
  const body = {
    contents: [
      ...(conversationHistory || []).map((msg: any) => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      })),
      { role: 'user', parts: [{ text: message }] }
    ]
  };

  const geminiRes = await fetch(GEMINI_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  if (!geminiRes.ok) {
    const error = await geminiRes.json();
    return NextResponse.json({ error: error.error?.message || 'Gemini API error' }, { status: 500 });
  }

  const geminiData = await geminiRes.json();
  let reply = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || '';
  // ...existing code...

  // Simulate typing effect by sending the response one character at a time (for demo, not real streaming)
  // In production, use Server-Sent Events or chunked transfer for real streaming
  // Here, just add a delay for each character (not recommended for real APIs)
  // Example: return the full response, but you can implement streaming in the frontend

  return NextResponse.json({ response: reply });
}
