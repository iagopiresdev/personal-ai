"use client";

import { openaicall } from '@/app/api/chat/test';
import { UserButton } from '@clerk/nextjs';
import { useChat } from 'ai/react';

export default function ChatClient() {
  const { messages, input, handleInputChange, handleSubmit: handleChatSubmit } = useChat();

  const handleOpenAICall = async (content: string) => {
    const response = await openaicall(content);
    console.log(response);
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await handleOpenAICall(input);
    handleChatSubmit(event);
  }

  return (
    <div>
        <UserButton />
      <h1>Chat</h1>
      <ul>
        {messages.map((m, index) => (
          <li key={index}>
            {m.role === 'user' ? 'User: ' : 'AI: '}
            {m.content}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <label>
          Say something...
          <input value={input} onChange={handleInputChange} />
        </label>
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

