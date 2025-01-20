import ChatBoxCommon from ".";
import "../../assets/styles/page/chat.css"
import { useState } from "react";
import { FullPageLoading } from "../../infrastructure/common/components/controls/loading";
type Props = {
    isOpenChatBox: boolean
    setIsOpenChatBox: Function
    dataChatBox: Array<any>
}
const ChatButton = (props: Props) => {
    const {
        isOpenChatBox,
        setIsOpenChatBox,
        dataChatBox
    } = props;
    const [loading, setLoading] = useState<boolean>(false);

    const handleCartClick = () => {
        setIsOpenChatBox(!isOpenChatBox)
    };


    return (
        <div className="chat-container">
            <div className="btn-chat" onClick={handleCartClick}>
                +
            </div>
            <ChatBoxCommon
                isOpen={isOpenChatBox}
                closeDrawer={() => setIsOpenChatBox(false)}
                setLoading={setLoading}
                dataChatBox={dataChatBox}
            />
            <FullPageLoading isLoading={loading} />
        </div>
    );
};

export default ChatButton;
