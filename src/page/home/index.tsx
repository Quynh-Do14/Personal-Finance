import React, { useEffect, useState } from 'react'
import LayoutClient from '../../infrastructure/common/Layouts/Client-Layout'
import "../../assets/styles/page/homepage.css"
import ServiceComponent from './service'
import PricingComponent from './pricing'
import AnimatedButton from '../../infrastructure/common/components/button/animationButton'
import { Col, Row } from 'antd'
import AnimatedNumber from '../../infrastructure/common/components/controls/AnimatedNumber'
import Constants from '../../core/common/constants'
import TagFlipComponent from '../../infrastructure/common/components/controls/TagFlip'
import SpendingComponent from './spending'
import SloganComponent from './slogan'
import IntroductionComponent from './introduction'
const HomePage = () => {
    const text = "TẠO RA GIẢI PHÁP TÀI CHÍNH HIỆU QUẢ & HỮU ÍCH";
    const [displayedText, setDisplayedText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const speed = isDeleting ? 50 : 100;
    const delay = 1000;

    useEffect(() => {
        let index = displayedText.length;
        let timeout: NodeJS.Timeout;

        const type = () => {
            if (!isDeleting) {
                if (index < text.length) {
                    setDisplayedText((prev) => prev + text[index]);
                    timeout = setTimeout(type, speed);
                } else {
                    timeout = setTimeout(() => setIsDeleting(true), delay);
                }
            } else {
                if (index > 0) {
                    setDisplayedText((prev) => prev.slice(0, -1));
                    timeout = setTimeout(type, speed);
                } else {
                    setIsDeleting(false);
                    timeout = setTimeout(type, delay);
                }
            }
        };

        timeout = setTimeout(type, speed);
        return () => clearTimeout(timeout);
    }, [displayedText, isDeleting]);
    return (
        <LayoutClient>
            <div className="homepage-container">
                {/* <div className="banner">
                    <div className='overlay'></div>
                    <div className="layout text-center bg-cover bg-center py-20">
                        <Row gutter={[40, 20]}>
                            <Col xs={24} md={24} lg={12}>
                                <div className='left-content flex flex-col gap-6 items-start'>
                                    <div className="top">
                                        <h1>
                                            FATS - Financial Analysis Technology Service
                                        </h1>
                                    </div>
                                    <p className="neon-text top">
                                        {displayedText}
                                    </p>
                                    <div className="btn flex justify-center gap-2 flex-wrap">
                                        <AnimatedButton
                                            classColor={'green'}
                                            label={'Khám phá ngay'}
                                            onClick={() => { }}
                                        />
                                        <AnimatedButton
                                            classColor={'white'}
                                            label={'Xem thêm'}
                                            onClick={() => { }}
                                        />
                                    </div>
                                    <div className='figure'>
                                        <div className='figure-content'>
                                            <div className='number'>
                                                <AnimatedNumber value={500} />+
                                            </div>
                                            <p>Thành viên</p>
                                        </div>
                                        <div className='figure-content'>
                                            <div className='line'></div>
                                        </div>
                                        <div className='figure-content'>
                                            <div className='number'>
                                                <AnimatedNumber value={95} />%
                                            </div>
                                            <p>Độ hài lòng</p>
                                        </div>
                                        <div className='figure-content'>
                                            <div className='line'></div>
                                        </div>
                                        <div className='figure-content'>
                                            <div className='number'>
                                                <AnimatedNumber value={92} />%
                                            </div>
                                            <p>Đánh giá tích cực</p>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col xs={24} md={24} lg={12}>
                                <div className='right-content top'>
                                    {Constants.Slogan.List.map((service, index) => (
                                        <TagFlipComponent
                                            timeout={service.timeout}
                                            title={service.title}
                                            description={service.description}
                                            index={index}
                                        />
                                    ))}
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div> */}
                <IntroductionComponent />
                <SloganComponent />
                {/* <ServiceComponent /> */}
                <PricingComponent />
                <SpendingComponent />
            </div>
        </LayoutClient >
    )
}

export default HomePage