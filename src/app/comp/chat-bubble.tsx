export default function ChatBubble() {
    /*Write if else logic for sender receiver messages*/
    /*Both chat bubbles are below Contact and You accordingly*/
    /*Like feature added*/
    return(
        <>
            <div className="chat chat-start">
                <div className="chat-image avatar">
                    <div className="w-10 bg-amber-700 rounded-full">
                        <img alt="" src=""/>
                    </div>
                </div>
                <div className="chat-header">
                    [sender-name]
                    <time className="text-xs opacity-50">[time-sent]</time>
                </div>
                <div className="chat-bubble w-[14rem]">Hello, This is a message.</div>
                <div className="chat-footer opacity-50">
                    <label className="swap">
                        <input type="checkbox" />
                        <svg className="swap-on size-[1.5em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="red" stroke="currentColor"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></g></svg>
                        <svg className="swap-off size-[1.5em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></g></svg>
                    </label>
                [Read Reciept]</div>
            </div>
            <div className="chat chat-end">
                <div className="chat-image avatar">
                    <div className="w-10 bg-amber-400 rounded-full">
                        <img alt="" src=""/>
                    </div>
                </div>
                <div className="chat-header">[your-name]
                    <time className="text-xs opacity-50">[time-you-responded]</time>
                </div>
                <div className="chat-bubble w-[14rem]">Hey there! This is also a message. I guess I know</div>
                <div className="chat-footer opacity-50">
                    <label className="swap">
                        <input type="checkbox" />
                        <svg className="swap-on size-[1.5em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="red" stroke="currentColor"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></g></svg>
                        <svg className="swap-off size-[1.5em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></g></svg>
                    </label>
                [Read-Reciept]</div>
            </div>
        </>
    )
}