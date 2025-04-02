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
    idGoal: string
    idTeam?: string
    setLoading: Function
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
        loading,
        idGoal,
        idTeam = "",
        setLoading
    } = props;

    const handleCartClick = () => {
        setIsOpenChatBox(!isOpenChatBox)
    };
    return (
        <div className="chat-container">
            <div className="btn-chat" onClick={handleCartClick}>
                <i className="fa fa-commenting text-[24px]" aria-hidden="true"></i>
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
                idGoal={String(idGoal)}
                idTeam={String(idTeam)}
                setLoading={setLoading}
            />
            {/* <FullPageLoading isLoading={loading} /> */}
        </div>
    );
};

export default ChatButton;
