import React, { useEffect, useRef, useState } from "react";
import { Drawer } from "antd";
import "../../assets/styles/page/chat.css"
import { convertDate, convertDateShow } from "../../infrastructure/helper/helper";
import BubbleCommon from "../../infrastructure/common/components/controls/Bubble";
import TypingIndicator from "../../infrastructure/common/components/controls/Typing";

type Props = {
    isOpen: boolean,
    closeDrawer: () => void,
    loading: boolean,
    dataChatBox: Array<any>
    handleSendMessage: () => void
    messages: string
    setMessages: Function
}

const ChatBoxCommon = (props: Props) => {
    const {
        isOpen,
        closeDrawer,
        loading = false,
        dataChatBox,
        handleSendMessage,
        messages,
        setMessages
    } = props;

    const chatBoxRef = useRef<HTMLDivElement>(null);
    const [isAtBottom, setIsAtBottom] = useState(true);

    useEffect(() => {
        const chatBox = chatBoxRef.current;
        if (!chatBox) return;

        const handleScroll = () => {
            const isNearBottom = chatBox.scrollHeight - chatBox.scrollTop <= chatBox.clientHeight + 10;
            setIsAtBottom(isNearBottom);
        };

        chatBox.addEventListener("scroll", handleScroll);
        return () => chatBox.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToBottom = () => {
        chatBoxRef.current?.scrollTo({ top: chatBoxRef.current.scrollHeight, behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [isOpen, handleSendMessage]);
    
    const onChangeText = (e: any) => {
        setMessages(e.target.value)
    }
    return (
        <Drawer
            title="Trò chuyện với Bot"
            placement="right"
            onClose={closeDrawer}
            open={isOpen}
        >
            <div className="chat-box-container flex flex-col justify-between h-full relative">
                <BubbleCommon />
                <div className="chat-box flex flex-col gap-2 overflow-auto p-2" ref={chatBoxRef}>
                    {dataChatBox.map((message, index) => (
                        <div
                            key={index}
                            className="flex flex-col gap-2"
                        >

                            <div
                                className={`flex justify-end`}
                            >
                                <div
                                    className={`max-w-[90%] break-words px-4 py-2 rounded-[16px] bg-[#40bb15] text-white shadow-lg z-10`}
                                >
                                    {message.userMessage}
                                    <div className="text-[10px] text-right mt-1">{convertDateShow(message.createdAt)} </div>
                                </div>
                            </div>
                            <div
                                key={index}
                                className={`flex justify-start`}
                            >
                                <div
                                    className={`max-w-[90%] break-words px-4 py-2 rounded-[16px] bg-[#eeeeee] text-[#242424] shadow-lg z-10`}
                                >
                                    {message.botMessage}
                                    <div className="text-[10px] text-left mt-1">{convertDateShow(message.createdAt)} </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    {
                        loading
                            ?
                            <div
                                className="flex flex-col gap-2"
                            >

                                <div
                                    className={`flex justify-end`}
                                >
                                    <div
                                        className={`max-w-[90%] break-words px-4 py-2 rounded-lg bg-[#40bb15] text-white`}
                                    >
                                        {messages}
                                    </div>
                                </div>
                                <div

                                    className={`flex justify-start`}
                                >
                                    <div
                                        className={`max-w-[90%] break-words px-4 py-2 rounded-lg bg-gray-300 text-black`}
                                    >
                                        <TypingIndicator />
                                    </div>
                                </div>
                            </div>
                            :
                            null
                    }

                </div>
                <button className="scroll-button" onClick={scrollToBottom}>
                    <i className="fa fa-arrow-down" aria-hidden="true"></i>
                </button>
                <div className="flex-none p-4 border-t">
                    <div className="flex items-center space-x-2">
                        <input
                            type="text"
                            placeholder="Nhập tin nhắn của bạn..."
                            className="flex-grow border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#40bb15]"
                            value={messages}
                            onChange={onChangeText}
                            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                        />
                        <button
                            className="bg-[#40bb15] text-white px-4 py-2 rounded-lg hover:bg-[#40bb15]"
                            onClick={handleSendMessage}
                        >
                            <i className="fa fa-paper-plane" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
            </div>

        </Drawer >
    );
};

export default ChatBoxCommon;
