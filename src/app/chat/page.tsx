// export default function ChatHomePage() {
//     return <>Main</>;
// }

'use client';

import dynamic from 'next/dynamic';

const ChatUI = dynamic(() => import('./chatUI'), { ssr: false });

export default function ChatHomePage() {
  return (
    <div className="flex flex-col h-full w-full">
      <ChatUI />
    </div>
  );
}
