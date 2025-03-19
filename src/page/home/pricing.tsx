import { Col, Row } from "antd";
import React from "react";

const PricingComponent = () => {
    const plans = [
        {
            title: "Quản Lý Dòng Tiền",
            sub: "Cash Flow Management",
            price: "1.499.000vnđ",
            features: [
                "Theo dõi dòng tiền theo thời gian thực",
                "Đồng bộ dữ liệu tự động",
                "Quản lý công nợ phải thu / phải trả",
                "Cảnh báo dòng tiền"
            ],
            button: "Try for free",
            highlighted: false,
        },
        {
            title: "Lập Kế Hoạch Ngắn Hạn",
            sub: "Short-term Planning",
            price: "1.499.000vnđ",
            features: [
                "Dự báo dòng tiền trong 30-90 ngày",
                "Kế hoạch thanh toán và thu hồi",
                "Mô phỏng kịch bản dòng tiền"
            ],
            button: "Try for free",
            highlighted: true,
        },
        {
            title: "Lập Kế Hoạch Dài Hạn",
            sub: "Long-term Planning",
            price: "2.499.000vnđ",
            features: [
                "Dự báo tài chính 1-5 năm",
                "Lập kế hoạch đầu tư",
                "Theo dõi mục tiêu tài chính"
            ],
            button: "Try for free",
            highlighted: false,
        },
    ];

    return (
        <div className="pricing-container">
            <div className="title">
                <div>
                    <h2>Dịch vụ tài chính</h2>
                    <h3>toàn diện - Hiệu quả - chính xác</h3>
                </div>
                <p className="sub">FATS cung cấp giải pháp tài chính toàn diện, giúp quản lý kế toán, tài chính cá nhân và định giá doanh nghiệp, tối ưu lợi nhuận và kiểm soát dòng tiền hiệu quả.</p>
            </div>
            <Row gutter={[40, 20]}>
                {plans.map((plan, index) => (
                    <Col lg={8} md={12} sm={12} xs={24} key={index}>
                        <div key={index} className={`box`}>
                            <div>
                                <h3>{plan.title}</h3>
                                <p className="sub">{plan.sub}</p>
                                <span className="text-[18px] font-normal text-[#666666]">Chỉ từ</span>
                                <p className="text-[24px] font-semibold">
                                    {plan.price}<span className="text-[18px] font-normal text-[#666666]"> / tháng</span>
                                </p>
                            </div>
                            <button>Liên Hệ Tư Vấn Ngay</button>
                            <ul className="flex flex-col gap-4">
                                <li>Dịch vụ bao gồm</li>
                                {plan.features.map((feature, idx) => (
                                    <li
                                        key={idx}
                                        className={`flex items-center`}>
                                        <span className="mr-2">
                                            <i className="fa fa-thumb-tack" aria-hidden="true"></i>
                                        </span>
                                        {feature}
                                    </li>
                                ))}

                            </ul>
                            <div className="show-more">Xem thêm <i className="fa fa-arrow-right" aria-hidden="true"></i></div>
                        </div>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default PricingComponent;
