'use client';

import { useEffect, useRef, useState } from 'react';
import { createClient } from '@/app/utils/supabase/client';


interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
  read: boolean;
}


export function ChatUI() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [readReceiptsEnabled, setReadReceiptsEnabled] = useState(true); // Default to true
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchUserSetting = async () => {
      const supabase = createClient();
      const { data: { user }, error } = await supabase.auth.getUser();

      if (user && user.user_metadata) {
        setReadReceiptsEnabled(!!user.user_metadata.read_receipts_enabled);
      }
    };
    fetchUserSetting();
  }, []);

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      sender: 'You',
      content: input,
      timestamp: new Date().toLocaleTimeString(),
      read: readReceiptsEnabled // apply setting here
    };

    setMessages([...messages, newMessage]);
    setInput('');
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);



  return (<div className="flex flex-col flex-grow">
    <div className="flex h-16 mb-2 mr-2 flex-grow bg-base-100 card card-border border-2 rounded-xl border-base-300">
      <div className='card-body flex justify-center p-0 ml-5 text-xl font-bold'>
          {"Alice Johnson"}
      </div>
    </div>
    <div className="flex flex-col justify-between flex-grow px-6 py-4 bg-base-200 h-full rounded-2xl">
      <div className="overflow-y-auto space-y-3 flex-1 pr-2">
        {messages.map((msg) => (
          <div key={msg.id} className="chat chat-end">
            <div className="chat-bubble chat-bubble-neutral">
              <p>{msg.content}</p>
              <div className="text-xs opacity-70 mt-1">
               {msg.timestamp}
               <span className={`ml-1 ${readReceiptsEnabled ? 'text-green-500 font-bold' : 'text-gray-400'}`}>
                    ✓
               </span>
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
  </div>
  );
}

export function ChatList() {
  const [conversations, setConversations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchConversations() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch("/api/chat/getConversations");
        if (!res.ok) {
          setError("Failed to load conversations");
          setConversations([]);
        } else {
          const data = await res.json();
          console.log(data);
          if (Array.isArray(data)) {
            setConversations(data);
          } else {
            setConversations([]);
          }
        }
      } catch (e) {
        setError("Failed to load conversations");
        setConversations([]);
      }
      setLoading(false);
    }
    fetchConversations();
  }, []);

  return (
    <div className="w-1/3 pl-3 pr-2 overflow-scroll">
      <ul className="list bg-base-100 rounded-box gap-2">
        {loading ? (
          <li className="text-center py-4">Loading...</li>
        ) : error ? (
          <li className="text-error text-center py-4">{error}</li>
        ) : (
          conversations.map(({ full_name, last_message, timestamp, conversation_id, username }, idx) => {
            // Prefer nickname from localStorage contacts if present
            let displayName = username;
            try {
              const contactsRaw = typeof window !== 'undefined' ? localStorage.getItem('contacts') : null;
              if (contactsRaw) {
                const contacts = JSON.parse(contactsRaw);
                // Try to match by name or full_name
                const match = contacts.find((c: any) => c.name === username || c.full_name === full_name);
                if (match) {
                  displayName = match.nickname && match.nickname.trim() !== '' ? match.nickname : (match.full_name || match.name || full_name);
                }
              }
            } catch {}
            const message = last_message?.substring(0, 60) || "";
            const time = timestamp ? new Date(timestamp).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }) : "";
            return (
              <li key={conversation_id || full_name + idx} className="list-row border-2 border-base-300 flex flex-col gap-1">
                <div className="text-xl font-bold">{displayName}</div>
                <div className="text-xs flex justify-between items-center">
                  <span>{message.length < 60 ? message : message + "..."}</span>
                  <span className="ml-2 opacity-60">{time}</span>
                </div>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
}
