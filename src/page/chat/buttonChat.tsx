import ChatBoxCommon from ".";
import "../../assets/styles/page/chat.css"
type Props = {
    titleChat: string
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
        titleChat,
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
                <div className="relative">
                    <i className="fa fa-commenting text-[24px]" aria-hidden="true"></i>
                    <div className="message">Trò chuyện với ChatBot</div>
                </div>
            </div>

            <ChatBoxCommon
                titleChat={titleChat}
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
