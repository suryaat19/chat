"use client"

import { useEffect } from 'react';
import { ChatUI, ChatList } from "./chatUI";

export default function HomePage() {
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
        <div className="flex flex-grow">
            <ChatList />
            <ChatUI />
        </div>

    );
}

