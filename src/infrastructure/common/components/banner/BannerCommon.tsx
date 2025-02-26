import { useEffect, useState } from 'react'
import '../../../../assets/styles/components/banner.css'
import { Col, Row } from 'antd';
const BannerCommon = () => {
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
        <div className="banner-common">
            <div className='overlay'></div>
            <div className="layout text-center bg-cover bg-center py-20">
                <Row gutter={[40, 20]}>
                    <Col span={12}>
                        <div className='left-content flex flex-col gap-6 items-start'>
                            <div className="top">
                                <h1>
                                    FATS - Financial Analysis Technology Service
                                </h1>
                            </div>
                            <p className="neon-text top">
                                {displayedText}
                            </p>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className='right-content top'></div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default BannerCommon