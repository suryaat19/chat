'use client';

import { useContext, useEffect, useRef, useState } from 'react';
import { createClient } from '@/app/utils/supabase/client';
import { ConversationContext } from '../context';
import { RealtimeChannel } from '@supabase/supabase-js';
import { deleteMessage, editMessage, newDirectConversation, sendMessage, handleLikeToggle, newGroupConversation } from './chatActions';


interface Message {
  message_id?: string;
  sender_id?: string;
  message?: string;
  sent?: boolean;
  timestampl?: string;
  // fallback for local messages
  id?: number;
  sender?: string;
  content?: string;
  read?: boolean;
  likes?: number; // <-- add this
}

function ChatTopBar({ conversationId, conversationData }: { conversationId: string | null, conversationData: Record<string, any> }) {
  if (!conversationId || !conversationData[conversationId]) {
    return (
      <span className="text-xl font-bold">Select a conversation</span>
    );
  }
  // Prefer nickname from contacts if present
  let displayName = conversationData[conversationId].username;
  let nickname = '';
  try {
    const contactsRaw = typeof window !== 'undefined' ? localStorage.getItem('contacts') : null;
    if (contactsRaw) {
      const contacts = JSON.parse(contactsRaw);
      const match = contacts.find((c: any) => c.name === conversationData[conversationId].username || c.full_name === conversationData[conversationId].full_name);
      if (match && match.nickname && match.nickname.trim() !== '') {
        nickname = match.nickname;
      }
    }
  } catch {}
  return (
    <>
      <span className="text-xl font-bold">{nickname || displayName}</span>
      <span className="text-xs font-light opacity-70">{conversationData[conversationId].username}</span>
    </>
  );
}

function useConversationData() {
  let conversationDataRaw: string = typeof window !== 'undefined' ? localStorage.getItem('conversations') ?? "" : "";
  let conversationData: Record<string, any> = {};
  if (conversationDataRaw) {
    try {
      const parsed = JSON.parse(conversationDataRaw);
      if (Array.isArray(parsed)) {
        parsed.forEach((conv: any) => {
          if (conv.conversation_id) {
            conversationData[conv.conversation_id] = conv;
          }
        });
      }
    } catch {}
  }
  return conversationData;
}

function useMessages(conversationId: string | null) {
  const [messages, setMessages] = useState<Message[]>([]);
  useEffect(() => {
    async function fetchMessages() {
      if (!conversationId) {
        setMessages([]);
        return;
      }
      // Try to get from localStorage first
      let localMsgsRaw = typeof window !== 'undefined' ? localStorage.getItem(`messages_${conversationId}`) : null;
      if (localMsgsRaw) {
        try {
          const localMsgs = JSON.parse(localMsgsRaw);
          if (Array.isArray(localMsgs)) {
            setMessages(localMsgs);
          }
        } catch {}
      }
      // If not in localStorage, fetch from API
      try {
        const now = new Date().toISOString();
        const res = await fetch(`/api/chat/getMessages?conversation_id=${conversationId}&time_offset=${encodeURIComponent(now)}`);
        const data = await res.json();
        if (Array.isArray(data)) {
          // Sort ascending by timestamp
          // data.sort((a, b) => new Date(a.timestampl).getTime() - new Date(b.timestampl).getTime());
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

function MessageList({ messages, readReceiptsEnabled, onEdit, onDelete, editingId, editValue, setEditValue, onEditSave, onEditCancel, onLike, userId }: {
  messages: Message[],
  readReceiptsEnabled: boolean,
  onEdit: (msg: Message) => void,
  onDelete: (msg: Message) => void,
  editingId: string | number | null,
  editValue: string,
  setEditValue: (v: string) => void,
  onEditSave: () => void,
  onEditCancel: () => void,
  onLike: (msg: Message, like: boolean) => void,
  userId: string | null,
}) {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  return (
    <div className="overflow-y-auto space-y-3 flex-1 pr-2">
      {messages.map((msg, idx) => {
        const isOwn = msg.sent;
        const msgId = msg.message_id || msg.id || idx;
        // For now, highlight if user liked (optional, not persisted per user in DB)
        // We'll just allow like/unlike toggle for everyone
        return (
          <div key={msgId} className={`chat ${isOwn ? 'chat-end' : 'chat-start'}`}>
            <div className="chat-bubble chat-bubble-neutral text-neutral-content">
              {editingId === msgId ? (
                <form className="flex flex-col gap-2" onSubmit={e => { e.preventDefault(); onEditSave(); }}>
                  <input
                    className="input input-bordered"
                    value={editValue}
                    onChange={e => setEditValue(e.target.value)}
                    autoFocus
                  />
                  <div className="flex gap-2 mt-1">
                    <button type="submit" className="btn btn-xs btn-success">Save</button>
                    <button type="button" className="btn btn-xs btn-ghost" onClick={onEditCancel}>Cancel</button>
                  </div>
                </form>
              ) : (
                <>
                  <p>{msg.message ?? msg.content}</p>
                  <div className="text-xs opacity-70 mt-1 flex items-center gap-2">
                    {new Date(msg.timestampl ?? "").toLocaleTimeString()}
                    <span className={`ml-1 ${readReceiptsEnabled ? 'text-blue-800 font-bold' : 'text-gray-400'}`}>✓</span>
                    <button
                      className={`btn btn-xs btn-outline btn-square`}
                      title={'Like'}
                      onClick={() => onLike(msg, true)}
                    >
                      <span role="img" aria-label="like">👍</span>
                      {typeof msg.likes === 'number' && <span className="ml-1">{msg.likes}</span>}
                    </button>
                    {isOwn && (
                      <>
                        <button className="btn btn-xs btn-outline btn-square" title="Edit" onClick={() => onEdit(msg)}>
                          ✎
                        </button>
                        <button className="btn btn-xs btn-outline btn-square" title="Delete" onClick={() => onDelete(msg)}>
                          🗑
                        </button>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
}

function MessageInput({ input, setInput, onSend, onInputChange }: { input: string, setInput: (v: string) => void, onSend: () => void, onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
  return (
    <form
      className="flex mt-4"
      onSubmit={e => {
        e.preventDefault();
        onSend();
      }}
    >
      <input
        type="text"
        placeholder="Type a message..."
        value={input}
        onChange={onInputChange}
        className="input input-bordered w-full"
      />
      <button type="submit" className="btn btn-primary ml-2">
        Send
      </button>
    </form>
  );
}

export function ChatUI() {
  const [input, setInput] = useState('');
  const [readReceiptsEnabled, setReadReceiptsEnabled] = useState(true);
  const { conversationId } = useContext(ConversationContext);
  const conversationData = useConversationData();
  const [messages, setMessages] = useMessages(conversationId);
  const supabase = createClient();
  const subscriptionRef = useRef<RealtimeChannel | null>(null);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const typingTimeouts = useRef<{ [userId: string]: NodeJS.Timeout }>({});
  const [userId, setUserId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | number | null>(null);
  const [editValue, setEditValue] = useState("");

  // Get current user id for typing indicator
  useEffect(() => {
    (async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      setUserId(user?.id || null);
    })();
  }, []);

  // Typing indicator: listen for typing events
  useEffect(() => {
    if (!conversationId) return;
    const channel = supabase.channel(`typing:${conversationId}`, { config: { broadcast: { self: false } } });
    channel.on('broadcast', { event: 'typing' }, (payload) => {
      const { user_id, username } = payload.payload;
      if (!user_id || user_id === userId) return;
      setTypingUsers((prev) => {
        if (prev.includes(username)) return prev;
        return [...prev, username];
      });
      // Remove after 2.5s if no new event
      if (typingTimeouts.current[user_id]) clearTimeout(typingTimeouts.current[user_id]);
      typingTimeouts.current[user_id] = setTimeout(() => {
        setTypingUsers((prev) => prev.filter((u) => u !== username));
        delete typingTimeouts.current[user_id];
      }, 2500);
    });
    channel.subscribe();
    return () => {
      channel.unsubscribe();
      Object.values(typingTimeouts.current).forEach(clearTimeout);
      typingTimeouts.current = {};
      setTypingUsers([]);
    };
  }, [conversationId, userId]);

  // Broadcast typing event (debounced)
  const typingDebounce = useRef<NodeJS.Timeout | null>(null);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    if (!conversationId || !userId) return;
    if (typingDebounce.current) clearTimeout(typingDebounce.current);
    supabase.channel(`typing:${conversationId}`).send({
      type: 'broadcast',
      event: 'typing',
      payload: { user_id: userId, username: conversationData[conversationId]?.username || 'Someone' },
    });
    typingDebounce.current = setTimeout(() => {}, 1000);
  };

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

  useEffect(() => {
    // Subscribe to all new message events (no filter)
    const channel = supabase.channel('messages:all')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
        },
        async (payload) => {
          const newMsg = payload.new;
          console.log("New message received!", newMsg);
          // Get user's conversations from localStorage
          let userConvs: string[] = [];
          try {
            const convsRaw = typeof window !== 'undefined' ? localStorage.getItem('conversations') : null;
            if (convsRaw) {
              const convs = JSON.parse(convsRaw);
              if (Array.isArray(convs)) {
                userConvs = convs.map((c: any) => c.conversation_id);
              }
            }
          } catch {}
          // If the new message is in a conversation the user is part of
          if (userConvs.includes(newMsg.conversation_id)) {
            // If it's the currently open conversation, refresh messages
            if (conversationId === newMsg.conversation_id) {
              try {
                const now = new Date().toISOString();
                const res = await fetch(`/api/chat/getMessages?conversation_id=${conversationId}&time_offset=${encodeURIComponent(now)}`);
                const data = await res.json();
                if (Array.isArray(data)) {
                  setMessages(data);
                  localStorage.setItem(`messages_${conversationId}`, JSON.stringify(data));
                }
              } catch {}
            }
            // Always refresh conversation list (for unread badge, last message, etc)
            try {
              const res = await fetch('/api/chat/getConversations');
              const data = await res.json();
              if (Array.isArray(data)) {
                localStorage.setItem('conversations', JSON.stringify(data));
              }
            } catch {}
          }
        }
      )
      .subscribe();
    subscriptionRef.current = channel;
    return () => {
      if (subscriptionRef.current) {
        supabase.removeChannel(subscriptionRef.current);
        subscriptionRef.current = null;
      }
    };
  }, [conversationId]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const newMessage: Message = {
      id: messages.length + 1,
      sender: 'You',
      content: input,
      timestampl: new Date().toISOString(),
      read: readReceiptsEnabled,
      sent: true
    };

    await sendMessage(conversationId ?? "", newMessage.content ?? "");
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setInput('');
    if (conversationId) {
      localStorage.setItem(`messages_${conversationId}`, JSON.stringify(updatedMessages));
    }
  };

  // Edit message handler
  const handleEdit = (msg: Message) => {
    const id = msg.message_id ?? msg.id;
    setEditingId(id !== undefined ? id : null);
    setEditValue(msg.message ?? msg.content ?? "");
  };
  const handleEditCancel = () => {
    setEditingId(null);
    setEditValue("");
  };
  const handleEditSave = async () => {
    if (!editingId) return;
    // Update in state
    const updatedMessages = messages.map((msg) => {
      if ((msg.message_id || msg.id) === editingId) {
        return { ...msg, message: editValue, content: editValue };
      }
      return msg;
    });
    setMessages(updatedMessages);
    if (conversationId) {
      localStorage.setItem(`messages_${conversationId}`, JSON.stringify(updatedMessages));
    }
    // Optionally: call API to update message in DB
    if (typeof editingId === 'string') {
      await editMessage(editingId, editValue);
    }
    setEditingId(null);
    setEditValue("");
  };
  // Delete message handler
  const handleDelete = async (msg: Message) => {
    if (!window.confirm('Delete this message?')) return;
    const msgId = msg.message_id || msg.id;
    const updatedMessages = messages.filter((m) => (m.message_id || m.id) !== msgId);
    setMessages(updatedMessages);
    if (conversationId) {
      localStorage.setItem(`messages_${conversationId}`, JSON.stringify(updatedMessages));
    }
    // Optionally: call API to delete message in DB
    if (msg.message_id) {
      const res = await deleteMessage(msg.message_id);
      console.log(res);
    }
  };

  // Like handler (persist to DB and update state)
  const handleLike = async (msg: Message, like: boolean) => {
    const msgId = msg.message_id;
    if (!msgId) return;
    try {
      const res = await handleLikeToggle(msgId, like);
      setMessages(prevMsgs => prevMsgs.map(m =>
        m.message_id === msgId ? { ...m, likes: res.likes } : m
      ));
    } catch (err) {
      console.error('Failed to update like', err);
    }
  };

  return (
    <div className="flex flex-col flex-grow">
      <div className="flex h-16 mb-2 mr-2 flex-grow bg-base-100 card card-border border-2 rounded-xl border-base-300">
        <div className='card-body flex flex-col justify-center p-0 ml-5 gap-0'>
          <ChatTopBar conversationId={conversationId} conversationData={conversationData} />
        </div>
      </div>
      <div className="flex flex-col justify-between flex-grow px-6 py-4 bg-base-200 h-full rounded-2xl">
        <MessageList
          messages={messages}
          readReceiptsEnabled={readReceiptsEnabled}
          onEdit={handleEdit}
          onDelete={handleDelete}
          editingId={editingId}
          editValue={editValue}
          setEditValue={setEditValue}
          onEditSave={handleEditSave}
          onEditCancel={handleEditCancel}
          onLike={handleLike}
          userId={userId}
        />
        {typingUsers.length > 0 && (
          <div className="text-xs text-gray-500 mb-2">{typingUsers.join(', ')} typing...</div>
        )}
        <MessageInput input={input} setInput={setInput} onSend={handleSend} onInputChange={handleInputChange} />
      </div>
    </div>
  );
}

export function ChatList() {
  const [conversations, setConversations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { conversationId, setConversationId } = useContext(ConversationContext);

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
            localStorage.setItem('conversations', JSON.stringify(data));
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

  // New conversation modal state
  const [showNewConv, setShowNewConv] = useState<null | 'direct' | 'group'>(null);
  const [newConvInput, setNewConvInput] = useState("");
  const [newGroupUsers, setNewGroupUsers] = useState("");
  const [newConvError, setNewConvError] = useState("");

  const handleNewConversation = async (e: React.FormEvent) => {
    e.preventDefault();
    setNewConvError("");
    if (showNewConv === 'direct') {
      if (!newConvInput.trim()) {
        setNewConvError("Please enter a username.");
        return;
      }
      try {
        const res = await newDirectConversation(newConvInput.trim());
        if (!res.success) throw new Error("Failed to create conversation");
        setShowNewConv(null);
        setNewConvInput("");
        // Refresh conversations
        const convRes = await fetch("/api/chat/getConversations");
        const data = await convRes.json();
        if (Array.isArray(data)) {
          setConversations(data);
          localStorage.setItem('conversations', JSON.stringify(data));
        }
      } catch (err: any) {
        setNewConvError(err.message || "Failed to create conversation");
      }
    } else if (showNewConv === 'group') {
      if (!newConvInput.trim() || !newGroupUsers.trim()) {
        setNewConvError("Please enter a group name and at least one username.");
        return;
      }
      try {
        const usernames = newGroupUsers.split(',').map(u => u.trim()).filter(Boolean);
        if (usernames.length === 0) {
          setNewConvError("Please enter at least one username.");
          return;
        }
        const res = await newGroupConversation(newConvInput.trim(), usernames);
        if (!res.success) throw new Error("Failed to create group conversation");
        setShowNewConv(null);
        setNewConvInput("");
        setNewGroupUsers("");
        // Refresh conversations
        const convRes = await fetch("/api/chat/getConversations");
        const data = await convRes.json();
        if (Array.isArray(data)) {
          setConversations(data);
          localStorage.setItem('conversations', JSON.stringify(data));
        }
      } catch (err: any) {
        setNewConvError(err.message || "Failed to create group conversation");
      }
    }
  };

  return (
    <div className="w-1/3 pl-3 pr-2 overflow-scroll">
      <div className="flex items-center justify-between mb-2">
        <span className="font-bold text-lg">Conversations</span>
        <div className="flex gap-2">
          <button className="btn btn-sm btn-primary" onClick={() => { setShowNewConv('direct'); setNewConvError(""); }}>+ New Direct</button>
          <button className="btn btn-sm btn-secondary" onClick={() => { setShowNewConv('group'); setNewConvError(""); }}>+ New Group</button>
        </div>
      </div>
      {showNewConv === 'direct' && (
        <form className="mb-3 flex flex-col gap-2 p-2 bg-base-200 rounded" onSubmit={handleNewConversation}>
          <input
            className="input input-bordered input-sm"
            placeholder="Username"
            value={newConvInput}
            onChange={e => setNewConvInput(e.target.value)}
            autoFocus
          />
          <div className="flex gap-2">
            <button className="btn btn-sm btn-success" type="submit">Create</button>
            <button className="btn btn-sm btn-ghost" type="button" onClick={() => setShowNewConv(null)}>Cancel</button>
          </div>
          {newConvError && <div className="text-error text-xs">{newConvError}</div>}
        </form>
      )}
      {showNewConv === 'group' && (
        <form className="mb-3 flex flex-col gap-2 p-2 bg-base-200 rounded" onSubmit={handleNewConversation}>
          <input
            className="input input-bordered input-sm"
            placeholder="Group name"
            value={newConvInput}
            onChange={e => setNewConvInput(e.target.value)}
            autoFocus
          />
          <input
            className="input input-bordered input-sm"
            placeholder="Usernames (comma separated)"
            value={newGroupUsers}
            onChange={e => setNewGroupUsers(e.target.value)}
          />
          <div className="flex gap-2">
            <button className="btn btn-sm btn-success" type="submit">Create</button>
            <button className="btn btn-sm btn-ghost" type="button" onClick={() => setShowNewConv(null)}>Cancel</button>
          </div>
          {newConvError && <div className="text-error text-xs">{newConvError}</div>}
        </form>
      )}
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
            } catch { }
            const message = last_message?.substring(60) || "";
            const time = timestamp ? new Date(timestamp).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }) : "";
            const isActive = conversationId === conversation_id;
            return (
              <li
                key={conversation_id || full_name + idx}
                className={`list-row border-2 border-base-300 flex flex-col gap-1 cursor-pointer transition-colors ${isActive ? 'bg-base-300' : 'hover:bg-base-200'}`}
                onClick={() => setConversationId(conversation_id)}
              >
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
