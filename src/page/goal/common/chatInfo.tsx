import { useRecoilValue } from 'recoil';
import { ProfileState } from '../../../core/atoms/profile/profileState';
import chatbot from '../../../assets/images/botChat.png'
import { ButtonSend } from '../../../infrastructure/common/components/button/buttonSend';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '../../../core/common/appRouter';
const ChatBotInfo = () => {
    const profileState = useRecoilValue(ProfileState).user;
    const navigate = useNavigate();
    if (profileState) {
        return (
            <div className='chatbot-info'>
                <img src={chatbot} alt='' width={100} />
                <div className='bot-name'>
                    <p>Bot: {profileState.character?.name}</p>
                    <ButtonSend
                        classColor={'green'}
                        onClick={() => navigate(ROUTE_PATH.SELECT_CHAT_BOT)}
                        title={'Thay đổi Bot'}
                    />
                </div>
            </div>
        )
    }
    return <div className='chatbot-info'></div>
}

export default ChatBotInfo