import React from 'react'
import AnimatedButton from '../../infrastructure/common/components/button/animationButton'
import introduction from "../../assets/images/banner4.gif"
import { ButtonDesign } from '../../infrastructure/common/components/button/buttonDesign'
import TitleComponent from '../../infrastructure/common/components/controls/TitleComponent'
const IntroductionComponent = () => {
    return (
        <div className="introduction">
            <TitleComponent
                title={'AI & Tự Động Hóa'}
                color={'black'}
            />
            <div className="title">
                <div>
                    <h2>Quản lý tài chính thông minh với AI</h2>
                    <h3>Đưa doanh nghiệp lên tầm cao mới</h3>
                </div>
                <p className="sub">Công cụ phân tích tài chính mạnh mẽ, ứng dụng AI để giúp doanh nghiệp của bạn tối ưu hóa chi phí, dự báo dòng tiền và ra quyết định chính xác hơn.</p>
            </div>
            <div className='flex gap-2 justify-center'>
                <ButtonDesign
                    width={180}
                    classColor={'green'}
                    title={'Khám phá ngay'}
                    onClick={() => { }}
                />
                <ButtonDesign
                    width={180}
                    classColor={'transparent'}
                    title={'Liên hệ tư vấn'}
                    onClick={() => { }}
                />
            </div>
            <img src={introduction} alt="" />
        </div>
    )
}

export default IntroductionComponent