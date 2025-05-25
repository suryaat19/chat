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


const conversations = [
  {
    full_name: "Alice Patel",
    last_message: "Hey! Are we still on for the meeting tomorrow at 10am?",
    timestamp: "2025-05-25T09:15:00"
  },
  {
    full_name: "Bob Thota",
    last_message: "I sent you the files. Let me know if you need anything else.",
    timestamp: "2025-05-25T08:50:00"
  },
  {
    full_name: "Charlie Chaudhary",
    last_message: "Can you review my latest PR when you get a chance?",
    timestamp: "2025-05-24T17:30:00"
  },
  {
    full_name: "Diana Gupta",
    last_message: "Thanks for your help earlier! The bug is fixed now.",
    timestamp: "2025-05-24T16:10:00"
  },
  {
    full_name: "Ethan Gugugaga",
    last_message: "I'll be offline this afternoon, ping me if urgent.",
    timestamp: "2025-05-24T14:45:00"
  },
  {
    full_name: "Fiona Green",
    last_message: "Lunch was great! Let's do it again soon.",
    timestamp: "2025-05-24T13:20:00"
  },
  {
    full_name: "George King",
    last_message: "Reminder: Standup is at 9:30am sharp.",
    timestamp: "2025-05-24T09:00:00"
  },
  {
    full_name: "Hannah White",
    last_message: "Can you share the project timeline doc?",
    timestamp: "2025-05-23T18:05:00"
  }
]


export function ChatList() {
  return (
    <div className="w-1/3 pl-3 pr-2 overflow-scroll">
      <ul className="list bg-base-100 rounded-box gap-2">
        {
          conversations.map(({ full_name, last_message, timestamp }) => {
            const message = last_message.substring(0, 60);
            const time = new Date(timestamp).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' });
            return (
              <li key={full_name} className="list-row border-2 border-base-300 flex flex-col gap-1">
                <div className="text-xl font-bold">{full_name}</div>
                <div className="text-xs flex justify-between items-center">
                  <span>{message.length < 60 ? message : message + "..."}</span>
                  <span className="ml-2 opacity-60">{time}</span>
                </div>
              </li>)
          })
        }
      </ul>
    </div>
    );
}
