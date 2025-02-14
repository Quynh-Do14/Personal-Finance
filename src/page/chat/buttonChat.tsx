import ChatBoxCommon from ".";
import "../../assets/styles/page/chat.css"
import { useState } from "react";
import { FullPageLoading } from "../../infrastructure/common/components/controls/loading";
type Props = {
    isOpenChatBox: boolean
    setIsOpenChatBox: Function
    dataChatBox: Array<any>
    handleSendMessage: () => void
    messages: string
    setMessages: Function
    loading: boolean
}


const ChatButton = (props: Props) => {
    const {
        isOpenChatBox,
        setIsOpenChatBox,
        dataChatBox,
        handleSendMessage,
        messages,
        setMessages,
        loading
    } = props;

    const handleCartClick = () => {
        setIsOpenChatBox(!isOpenChatBox)
    };
    return (
        <div className="chat-container">
            <div className="btn-chat" onClick={handleCartClick}>
                <i className="fa fa-commenting" aria-hidden="true"></i>
            </div>
            <ChatBoxCommon
                isOpen={isOpenChatBox}
                closeDrawer={() => setIsOpenChatBox(false)}
                loading={loading}
                dataChatBox={dataChatBox}
                handleSendMessage={handleSendMessage}
                messages={messages}
                setMessages={setMessages}
            />
            {/* <FullPageLoading isLoading={loading} /> */}
        </div>
    );
};

export default ChatButton;
