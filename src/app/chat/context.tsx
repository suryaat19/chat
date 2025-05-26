import { createContext } from "react";

// Context to track the opened conversation
export const ConversationContext = createContext<{
    conversationId: string | null;
    setConversationId: (id: string | null) => void;
}>({
    conversationId: null,
    setConversationId: () => {},
});