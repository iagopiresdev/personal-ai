import { OpenAIStream, StreamingTextResponse } from 'ai';
import OpenAI from 'openai';
 
// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
 
// Set the runtime to edge for best performance
export const runtime = 'edge';
 
export async function POST(req: Request) {
  const { messages } = await req.json()
  console.log(messages)
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: messages,
  })

  for await (const chunk of response) {
    console.log(chunk.choices[0].delta.content);
  }

  const stream = OpenAIStream(response)
  return new StreamingTextResponse(stream)
}