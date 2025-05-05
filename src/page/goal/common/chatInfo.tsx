import { useRecoilValue } from 'recoil';
import { ProfileState } from '../../../core/atoms/profile/profileState';
import { ButtonSend } from '../../../infrastructure/common/components/button/buttonSend';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '../../../core/common/appRouter';
import Constants from '../../../core/common/constants';
const ChatBotInfo = () => {
    const profileState = useRecoilValue(ProfileState).user;
    const navigate = useNavigate();
    const botInfo = Constants.BotChatList.List.find((item) => item.value === profileState?.character?.id)

    if (profileState) {
        return (
            <div className='chatbot-info'>
                <img src={botInfo?.avatar} alt='' width={100} />
                <div className='bot-name'>
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