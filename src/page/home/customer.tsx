import React from 'react'
import TitleComponent from '../../infrastructure/common/components/controls/TitleComponent'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import customer1 from "../../assets/images/customer1.png"
import customer2 from "../../assets/images/customer2.png"
import customer3 from "../../assets/images/customer3.png"

import trust1 from "../../assets/images/trust1.png"
import trust2 from "../../assets/images/trust2.png"
import trust3 from "../../assets/images/trust3.png"
import trust4 from "../../assets/images/trust4.png"
import trust5 from "../../assets/images/trust5.png"

const customer = [
    {
        "name": "Nguyễn Hoàng An",
        img: customer1,
        "title": "CEO ABC Corp",
        "testimonial": "Nhờ FATS AI, tôi đã kiểm soát chi tiêu dễ dàng hơn, tiết kiệm đến 30% mỗi tháng và quản lý tài chính cá nhân hiệu quả hơn. Ứng dụng đơn giản, dễ sử dụng ngay cả khi tôi không có nhiều kiến thức về tài chính."
    },
    {
        "name": "Trần Minh Tuấn",
        img: customer2,
        "title": "Nhà đầu tư cá nhân",
        "testimonial": "Trước đây, tôi gặp nhiều khó khăn trong việc theo dõi chi tiêu và lên kế hoạch tài chính. Nhờ FATS AI, tôi dễ dàng kiểm soát tài chính cá nhân, có cái nhìn rõ ràng hơn và đưa ra quyết định đầu tư sáng suốt hơn."
    },
    {
        "name": "Lê Thanh Hà",
        img: customer3,
        "title": "Giám đốc tài chính XYZ",
        "testimonial": "FATS AI giúp tôi quản lý tài chính cá nhân dễ dàng hơn, đưa ra các gợi ý chi tiêu và tiết kiệm hợp lý. Nhờ đó, tôi kiểm soát tốt hơn ngân sách, tránh rủi ro tài chính và đạt được các mục tiêu tiết kiệm cá nhân nhanh hơn."
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
                                    src={it.img}
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