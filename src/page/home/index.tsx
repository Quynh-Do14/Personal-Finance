import React, { useEffect, useState } from 'react'
import LayoutClient from '../../infrastructure/common/Layouts/Client-Layout'
import "../../assets/styles/page/homepage.css"
import ServiceComponent from './service'
import TagComponent from './tag'
import PricingComponent from './pricing'
import AnimatedButton from '../../infrastructure/common/components/button/animationButton'
const HomePage = () => {
    const text = "TẠO RA GIẢI PHÁP TÀI CHÍNH HIỆU QUẢ & HỮU ÍCH";
    const [displayedText, setDisplayedText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const speed = isDeleting ? 50 : 100; // Tốc độ gõ và xóa chữ
    const delay = 1000; // Thời gian chờ trước khi xóa hoặc gõ lại

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
                <div className="banner">
                    <div className='overlay'></div>
                    <div className="layout text-center bg-cover bg-center py-20">
                        <div className='flex flex-col gap-6'>
                            <h1 className="wave-text top">
                                FATS - Financial Analysis Technology Service
                            </h1>
                            <p className="neon-text top">
                                {displayedText}
                            </p>
                            <div className="btn flex justify-center space-x-4">
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
                        </div>
                    </div>
                    <TagComponent />
                </div>
                <ServiceComponent />
                <PricingComponent />
            </div>
        </LayoutClient>
    )
}

export default HomePage