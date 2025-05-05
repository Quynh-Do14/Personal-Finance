import { useRecoilValue } from 'recoil';
import { ProfileState } from '../../core/atoms/profile/profileState';
import { ButtonSend } from '../../infrastructure/common/components/button/buttonSend';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '../../core/common/appRouter';
import Constants from '../../core/common/constants';
import ChatBoxCommon from '.';
type Props = {
    titleChat: string
    isOpenChatBox: boolean
    setIsOpenChatBox: Function
    dataChatBox: Array<any>
    handleSendMessage: () => void
    messagesLoading: string
    setMessagesLoading: Function
    messages: string
    setMessages: Function
    loading: boolean
    idGoal: string
    idTeam?: string
    setLoading: Function
}

const OpenChatBot = (props: Props) => {
    const {
        titleChat,
        isOpenChatBox,
        setIsOpenChatBox,
        dataChatBox,
        handleSendMessage,
        messagesLoading,
        setMessagesLoading,
        messages,
        setMessages,
        loading,
        idGoal,
        idTeam = "",
        setLoading
    } = props;

    const profileState = useRecoilValue(ProfileState).user;
    const navigate = useNavigate();
    const botInfo = Constants.BotChatList.List.find((item) => item.value === profileState?.character?.id)

    const handleCartClick = () => {
        setIsOpenChatBox(!isOpenChatBox)
    };

    if (profileState) {
        return (
            <div className='open-chatbot'>
                <img src={botInfo?.avatar} alt='' width={100} />
                <div className='bot-name'>
                    <ButtonSend
                        classColor={'green'}
                        onClick={handleCartClick}
                        title={'Trò chuyện'}
                        width={120}
                    />
                    <p>Bắt đầu trò chuyện với ChatBot</p>
                </div>
                <ChatBoxCommon
                    titleChat={titleChat}
                    isOpen={isOpenChatBox}
                    closeDrawer={() => setIsOpenChatBox(false)}
                    loading={loading}
                    dataChatBox={dataChatBox}
                    handleSendMessage={handleSendMessage}
                    messagesLoading={messagesLoading}
                    setMessagesLoading={setMessagesLoading}
                    messages={messages}
                    setMessages={setMessages}
                    idGoal={String(idGoal)}
                    idTeam={String(idTeam)}
                    setLoading={setLoading}
                />
            </div>
        )
    }
    return <div className='chatbot-info'></div>
}

export default OpenChatBot