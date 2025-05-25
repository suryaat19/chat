export function useConversationData() {
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
