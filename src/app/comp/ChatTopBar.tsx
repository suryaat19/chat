import React from 'react';

export function ChatTopBar({ conversationId, conversationData }: { conversationId: string | null, conversationData: Record<string, any> }) {
  if (!conversationId || !conversationData[conversationId]) {
    return (
      <span className="text-xl font-bold">Select a conversation</span>
    );
  }
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
