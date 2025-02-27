import React, { useState } from 'react';
import "../../assets/styles/page/chat.css"
import { ButtonCommon } from '../../infrastructure/common/components/button/button-common';
import robot from "../../assets/images/robot.gif";
import LayoutClient from '../../infrastructure/common/Layouts/Client-Layout';
import BubbleCommon from '../../infrastructure/common/components/controls/Bubble';
import Constants from '../../core/common/constants';
import { Col, Row } from 'antd';
import authService from '../../infrastructure/repositories/auth/service/auth.service';
import { useNavigate } from 'react-router-dom';
import { FullPageLoading } from '../../infrastructure/common/components/controls/loading';
import { ROUTE_PATH } from '../../core/common/appRouter';
import BannerCommon from '../../infrastructure/common/components/banner/BannerCommon';
const SelectBotPage = () => {
    const [selectedOption, setSelectedOption] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleOptionClick = (option: any) => {
        setSelectedOption(option);
    };

    const onChangeBotAsync = async () => {
        try {
            await authService.changeBotChat(
                Number(selectedOption),
                () => {
                    navigate(ROUTE_PATH.HOME_PAGE);
                },
                setLoading
            ).then(() => { })
        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        <LayoutClient>
            <div className="select-bot-container">
                <BubbleCommon />
                <div className="padding-common">
                    <div className='bg-[#FFFFFF60] rounded-[8px] px-10 py-8'>
                        <h2 className="header">Bạn muốn BotChat có tính cách như thế nào?</h2>
                        <Row gutter={[20, 20]} className="options">
                            {
                                Constants.BotChatList.List.map((item, index) => {
                                    return (
                                        <Col xs={24} sm={12} md={8} key={index}>
                                            <div
                                                className={`option ${selectedOption === item.value ? 'selected' : ''}`}
                                                onClick={() => handleOptionClick(item.value)}
                                            >
                                                <img src={robot} alt="" width={160} />
                                                <p>{item.label}</p>
                                            </div>
                                        </Col>
                                    )
                                })
                            }
                            <Col span={24}>
                                <ButtonCommon classColor={'white'}
                                    isFullWidth={true}
                                    onClick={onChangeBotAsync}
                                    title={'Xác nhận'}
                                />
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
            <FullPageLoading isLoading={loading} />
        </LayoutClient>
    );
};

export default SelectBotPage;
