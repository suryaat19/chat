export default function ChatBubble() {
    /*Write if else logic for sender receiver messages*/
    /*Both chat bubbles are below Contact and You accordingly*/
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
                <div className="chat-footer opacity-50">[Read Reciept]</div>
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
                <div className="chat-footer opacity-50">[Read-Reciept]</div>
            </div>
        </>
    )
}