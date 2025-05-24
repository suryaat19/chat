
'use client'

import { useSearchParams } from 'next/navigation'

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const message = searchParams.get('message') || 'Sorry, something went wrong';

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">Error</h1>
      <p className="text-red-600">{message}</p>
    </div>
  );
}
