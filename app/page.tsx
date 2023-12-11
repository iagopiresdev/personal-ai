'use client'

import { Send } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Message {
  role: string;
  content: string;
}

export default function OpenAIChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Fetch initial messages when the component mounts
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    const response = await fetch('/api/chat', {
      method: 'GET',
    });
  
    if (!response.ok) {
      console.error('Failed to fetch messages:', response.statusText);
      return;
    }
  
    const data = await response.json();
    setMessages(data.messages);
  };

  const sendMessage = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages: [...messages, { role: 'user', content: newMessage }] }),
    });

    const data = await response.json();
    setMessages(data.messages);
    setNewMessage('');
  };

  return ( 
    <div className="flex flex-col h-screen">
      <div className="flex-grow flex flex-col">
        <div className="flex-grow flex flex-col-reverse overflow-y-auto">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-2`}>
              <div
                className={`rounded-lg px-4 py-2 ${
                  message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-900'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-row">
        <form onSubmit={sendMessage} className="flex-grow flex">
          <input
            type="text"
            className="flex-grow px-4 py-2"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(event) => setNewMessage(event.target.value)}
          />
          <button type="submit" className="px-4 py-2">
            <Send />
          </button>
        </form>
      </div>
    </div>
  );
}