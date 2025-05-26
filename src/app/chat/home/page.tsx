"use client"

import { useEffect, useState, createContext, useContext } from 'react';
import { ChatUI, ChatList } from "./chatUI";
import {ConversationContext} from '../context';



export default function HomePage() {
    const [conversationId, setConversationId] = useState<string | null>(null);

    useEffect(() => {
        async function fetchAndStoreContacts() {
            try {
                const res = await fetch('/api/getContacts');
                const data = await res.json();
                if (Array.isArray(data)) {
                    localStorage.setItem('contacts', JSON.stringify(data));
                }
            } catch (e) {
                // Optionally handle error
            }
        }
        fetchAndStoreContacts();
    }, []);

    return (
        <ConversationContext.Provider value={{ conversationId, setConversationId }}>
            <div className="flex flex-grow">
                <ChatList />
                <ChatUI />
            </div>
        </ConversationContext.Provider>
    );
}

