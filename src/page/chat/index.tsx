import React, { useState } from "react";
import { Drawer } from "antd";
type Message = {
    text: string;
    sender: "user" | "bot";
};

type Props = {
    isOpen: boolean,
    closeDrawer: () => void,
    setLoading: Function,
    dataChatBox: Array<any>
}


const ChatBoxCommon = (props: Props) => {
    const {
        isOpen,
        closeDrawer,
        setLoading,
        dataChatBox
    } = props;
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState<string>("");

    const handleSendMessage = (): void => {

    };

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
                            className="flex flex-col gap-2 overflow-auto"
                        >

                            <div
                                className={`flex justify-end`}
                            >
                                <div
                                    className={`max-w-[90%] break-words px-4 py-2 rounded-lg bg-[#40bb15] text-white`}
                                >
                                    {message.userMessage}
                                </div>
                            </div>

                            <div
                                key={index}
                                className={`flex "justify-start"}`}
                            >
                                <div
                                    className={`max-w-[90%] break-words px-4 py-2 rounded-lg bg-gray-300 text-black"
                                        }`}
                                >
                                    {message.botMessage}
                                </div>
                            </div>
                        </div>

                    ))}
                </div>
                <div className="flex-none p-4 bg-white border-t">
                    <div className="flex items-center space-x-2">
                        <input
                            type="text"
                            placeholder="Type your message..."
                            className="flex-grow border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#40bb15]"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
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
