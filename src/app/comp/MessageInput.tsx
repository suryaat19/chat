import React from 'react';

export function MessageInput({ input, setInput, onSend, onInputChange }: {
  input: string,
  setInput: (v: string) => void,
  onSend: () => void,
  onInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
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
        onChange={onInputChange ? onInputChange : e => setInput(e.target.value)}
        className="input input-bordered w-full"
      />
      <button type="submit" className="btn btn-primary ml-2">
        Send
      </button>
    </form>
  );
}
