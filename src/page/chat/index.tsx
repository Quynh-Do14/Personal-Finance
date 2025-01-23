import React, { useState } from "react";
import { Drawer } from "antd";
import "../../assets/styles/page/chat.css"
import { convertDate, convertDateShow } from "../../infrastructure/helper/helper";

type Props = {
    isOpen: boolean,
    closeDrawer: () => void,
    loading: boolean,
    dataChatBox: Array<any>
    handleSendMessage: () => void
    messages: string
    setMessages: Function
}

function TypingIndicator() {
    return (
        <div className="typing-indicator">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
        </div>
    );
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
            <div className="flex flex-col justify-between h-full">
                <div className="flex flex-col gap-2 overflow-auto p-2">
                    {dataChatBox.map((message, index) => (
                        <div
                            key={index}
                            className="flex flex-col gap-2"
                        >

                            <div
                                className={`flex justify-end`}
                            >
                                <div
                                    className={`max-w-[90%] break-words px-4 py-2 rounded-lg bg-[#40bb15] text-white`}
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
                                    className={`max-w-[90%] break-words px-4 py-2 rounded-lg bg-gray-300 text-black`}
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
                <div className="flex-none p-4 bg-white border-t">
                    <div className="flex items-center space-x-2">
                        <input
                            type="text"
                            placeholder="Type your message..."
                            className="flex-grow border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#40bb15]"
                            value={messages}
                            onChange={onChangeText}
                            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                        />
                        <button
                            className="bg-[#40bb15] text-white px-4 py-2 rounded-lg hover:bg-[#40bb15]"
                            onClick={handleSendMessage}
                        >
                            Gửi
                        </button>
                    </div>
                </div>
            </div>
        </Drawer >
    );
};

export default ChatBoxCommon;
