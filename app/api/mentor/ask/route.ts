import { NextRequest, NextResponse } from 'next/server';
import { ChatMistralAI } from '@langchain/mistralai';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { HumanMessage, AIMessage } from '@langchain/core/messages';

export async function POST(req: NextRequest) {
  try {
    const { message, model: modelType, chatHistory } = await req.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    if (!modelType) {
      return NextResponse.json({ error: 'Model type is required' }, { status: 400 });
    }

    let model;
    if (modelType === 'mistral') {
      if (!process.env.MISTRAL_API_KEY) {
        return NextResponse.json({ error: 'MISTRAL_API_KEY is not configured' }, { status: 500 });
      }
      model = new ChatMistralAI({
        apiKey: process.env.MISTRAL_API_KEY,
      });
    } else if (modelType === 'gemini') {
      if (!process.env.GEMINI_API_KEY) {
        return NextResponse.json({ error: 'GEMINI_API_KEY is not configured' }, { status: 500 });
      }
      model = new ChatGoogleGenerativeAI({
        modelName: 'gemini-2.0-flash',
        apiKey: process.env.GEMINI_API_KEY,
      });
    } else {
      return NextResponse.json({ error: 'Invalid model type' }, { status: 400 });
    }

    const messages = chatHistory.map((chat: any) =>
      chat.sender === 'user' ? new HumanMessage(chat.text) : new AIMessage(chat.text)
    );

    const result = await model.invoke(messages);

    return NextResponse.json({ response: result.content });
  } catch (error) {
    console.error('Error in AI mentor API:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
