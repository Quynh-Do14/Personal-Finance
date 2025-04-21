import React from 'react'
import TitleComponent from '../../infrastructure/common/components/controls/TitleComponent'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import customerImg from "../../assets/images/customer.png"

import trust1 from "../../assets/images/trust1.png"
import trust2 from "../../assets/images/trust2.png"
import trust3 from "../../assets/images/trust3.png"
import trust4 from "../../assets/images/trust4.png"
import trust5 from "../../assets/images/trust5.png"

const customer = [
    {
        "name": "Nguyễn Hoàng An",
        "title": "CEO ABC Corp",
        "testimonial": "Nhờ nền tảng quản lý tài chính thông minh, chúng tôi đã tiết kiệm được hơn 30% chi phí vận hành, tối ưu hóa dòng tiền hiệu quả. Giao diện thân thiện, dễ sử dụng ngay cả với người không chuyên tài chính."
    },
    {
        "name": "Trần Minh Tuấn",
        "title": "Nhà đầu tư cá nhân",
        "testimonial": "Trước đây, tôi gặp khó khăn trong việc quản lý chi tiêu và đầu tư. Nhưng từ khi sử dụng nền tảng này, tôi có cái nhìn rõ ràng hơn về tài chính cá nhân và dễ dàng đưa ra quyết định đầu tư hợp lý."
    },
    {
        "name": "Lê Thanh Hà",
        "title": "Giám đốc tài chính XYZ",
        "testimonial": "Trí tuệ nhân tạo hỗ trợ tôi chuẩn hóa và đưa ra các khuyến nghị tài chính kịp thời, tránh rủi ro và tối ưu hiệu quả. Dịch vụ khách hàng rất chuyên nghiệp!"
    }
]

const trusts = [
    trust1,
    trust2,
    trust3,
    trust4,
    trust5,
]

const CustomerComponent = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 3000,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 768, // màn hình <= 768px
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 480, // màn hình <= 480px
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: false
                }
            }
        ]
    };

    const settingLogo = {
        dots: false,
        infinite: true,
        speed: 3000,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 768, // màn hình <= 768px
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 480, // màn hình <= 480px
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    return (
        <div className="customer">
            <TitleComponent
                title={'TRUST BY'}
                color={'white'}
            />
            <Slider {...settingLogo} className='slider'>
                {
                    trusts && trusts.length && trusts.concat(trusts).map((it, index) => {
                        return (
                            <div className={"slider-content"} key={index}>
                                <img
                                    src={it}
                                    alt={`Slide ${index + 1}`}
                                />

                            </div>
                        )
                    })
                }
            </Slider>
            <div className="line"></div>
            <div className="title">
                <h2>Khách hàng nói gì về fATS</h2>
            </div>
            <Slider {...settings} className='slider'>
                {
                    customer && customer.length && customer.concat(customer).map((it, index) => {
                        return (
                            <div className={"slider-content"} key={index}>
                                <img
                                    src={customerImg}
                                    alt={`Slide ${index + 1}`}
                                />
                                <div className='name'>
                                    <div>{it.name}</div>
                                    <span>{it.title}</span>
                                </div>
                                <p>{it.testimonial}</p>
                            </div>
                        )
                    })
                }
            </Slider>
        </div>
    )
}

export default CustomerComponent