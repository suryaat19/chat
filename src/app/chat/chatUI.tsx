'use client';

import { useEffect, useRef, useState } from 'react';

interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export default function ChatUI() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      sender: 'You',
      content: input,
      timestamp: new Date().toLocaleTimeString(),
      read: true
    };

    setMessages([...messages, newMessage]);
    setInput('');
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col justify-between flex-grow px-6 py-4 bg-base-200 h-full">
      <div className="overflow-y-auto space-y-3 flex-1 pr-2">
        {messages.map((msg) => (
          <div key={msg.id} className="chat chat-end">
            <div className="chat-bubble">
              <p>{msg.content}</p>
              <div className="text-xs opacity-70 mt-1">
                {msg.timestamp} {msg.read && '✓'}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form
        className="flex mt-4"
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage();
        }}
      >
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="input input-bordered w-full"
        />
        <button type="submit" className="btn btn-primary ml-2">
          Send
        </button>
      </form>
    </div>
  );
}
