import { useEffect, useState } from 'react';

export function useMessages(conversationId: string | null) {
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    async function fetchMessages() {
      if (!conversationId) {
        setMessages([]);
        return;
      }
      let localMsgsRaw = typeof window !== 'undefined' ? localStorage.getItem(`messages_${conversationId}`) : null;
      if (localMsgsRaw) {
        try {
          const localMsgs = JSON.parse(localMsgsRaw);
          if (Array.isArray(localMsgs)) {
            setMessages(localMsgs);
          }
        } catch {}
      }
      try {
        const now = new Date().toISOString();
        const res = await fetch(`/api/chat/getMessages?conversation_id=${conversationId}&time_offset=${encodeURIComponent(now)}`);
        const data = await res.json();
        if (Array.isArray(data)) {
          setMessages(data);
          localStorage.setItem(`messages_${conversationId}`, JSON.stringify(data));
        } else {
          setMessages([]);
        }
      } catch {
        setMessages([]);
      }
    }
    fetchMessages();
  }, [conversationId]);

  return [messages, setMessages] as const;
}
