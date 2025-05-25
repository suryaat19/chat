import React from 'react';

export function MessageList({ messages, readReceiptsEnabled, messagesEndRef }: {
  messages: any[],
  readReceiptsEnabled: boolean,
  messagesEndRef: React.RefObject<HTMLDivElement>
}) {
  return (
    <>
      {messages.map((msg, idx) => (
        <div key={msg.message_id || msg.id || idx} className={`chat ${msg.sent ? 'chat-end' : 'chat-start'}`}>
          <div className={`chat-bubble ${msg.sent ? 'chat-bubble-primary text-primary-content' : 'chat-bubble-neutral text-neutral-content'}`}>
            <p>{msg.message ?? msg.content}</p>
            <div className="text-xs opacity-70 mt-1">
              {new Date(msg.timestampl ?? "").toLocaleTimeString()}
              <span className={`ml-1 ${readReceiptsEnabled ? 'text-green-500 font-bold' : 'text-gray-400'}`}>
                ✓
              </span>
            </div>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </>
  );
}
