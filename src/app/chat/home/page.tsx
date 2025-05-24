import { ChatUI, ChatList } from "./chatUI";

export default function HomePage() {
    return (
        <div className="flex flex-grow">
            <ChatList />
            <ChatUI />
        </div>

    );
}

