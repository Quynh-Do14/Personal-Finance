import React, { useEffect, useRef, useState } from "react";
import { Drawer, Tooltip } from "antd";
import "../../assets/styles/page/chat.css"
import { convertDate, convertDateShow } from "../../infrastructure/helper/helper";
import TypingIndicator from "../../infrastructure/common/components/controls/Typing";
import gptIcon from "../../assets/images/gpt-icon.png"
type Props = {
    titleChat: string
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
        titleChat,
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

        return () => {
            chatBox.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const scrollToBottom = () => {
        chatBoxRef.current?.scrollTo({ top: chatBoxRef.current.scrollHeight, behavior: "smooth" });
    };

    useEffect(() => {
        if (isAtBottom) {
            scrollToBottom();
        }
    }, [dataChatBox, isOpen]);

    const onChangeText = (e: any) => {
        setMessages(e.target.value)
    }

    const sendMessage = () => {
        handleSendMessage();
        setTimeout(() => {
            scrollToBottom(); // Cuộn xuống sau khi tin nhắn được cập nhật
        }, 100);
    };
    return (
        <Drawer
            placement="right"
            onClose={closeDrawer}
            open={isOpen}
            headerStyle={{
                display: 'none'
            }}
        >
            <div className="chat-box-container" >
                <div className="header">
                    <i onClick={closeDrawer} className="fa fa-arrow-left text-[#999] text-[20px] cursor-pointer" aria-hidden="true"></i>
                    <img src={gptIcon} alt="" />
                    <div className="status-container">
                        <div className="title">ChatGPT</div>
                        <div className="status-line">
                            <span className="dot" />
                            <span className="status-text">Online</span>
                        </div>
                    </div>
                </div>
                {/* <BubbleCommon /> */}
                <div className="chat-box" ref={chatBoxRef}>
                    {dataChatBox.map((message, index) => (
                        <div key={index} className="flex flex-col gap-2">
                            <div className={`flex justify-end`}>
                                <Tooltip title={convertDateShow(message.createdAt)} color="#003333">
                                    <div className="human-chat">
                                        {message.userMessage}
                                    </div>
                                </Tooltip>
                            </div>
                            <div key={index} className={`flex justify-start`}>
                                <Tooltip title={convertDateShow(message.createdAt)} color="#666666">
                                    <div className="ai-chat">
                                        {message.botMessage}
                                    </div>
                                </Tooltip>
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
                                        className="human-chat"
                                    >
                                        {messages}
                                    </div>
                                </div>
                                <div

                                    className={`flex justify-start`}
                                >
                                    <div
                                        className="ai-chat"
                                    >
                                        <TypingIndicator />
                                    </div>
                                </div>
                            </div>
                            :
                            null
                    }
                </div>
                {!isAtBottom && (
                    <button className="scroll-button" onClick={scrollToBottom}>
                        <i className="fa fa-arrow-down" aria-hidden="true"></i>
                    </button>
                )}
                <div className="input-chat">
                    <input
                        type="text"
                        placeholder="Nhập tin nhắn của bạn..."
                        value={messages}
                        onChange={onChangeText}
                        onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                    />
                    <button onClick={sendMessage}>
                        <i className="fa fa-paper-plane" aria-hidden="true"></i>
                    </button>
                </div>
            </div>

        </Drawer >
    );
};

export default ChatBoxCommon;
