import { Col, Row } from "antd";
import React from "react";

const PricingComponent = () => {
    const plans = [
        {
            title: "FREE",
            price: "0",
            features: [
                { text: "Unlimited product updates", available: true },
                { text: "Unlimited product updates", available: true },
                { text: "Unlimited product updates", available: true },
                { text: "1GB Cloud storage", available: false },
                { text: "Email and community support", available: false },
            ],
            button: "Try for free",
            highlighted: false,
        },
        {
            title: "STANDARD",
            price: "9.99",
            features: [
                { text: "Unlimited product updates", available: true },
                { text: "Unlimited product updates", available: true },
                { text: "Unlimited product updates", available: true },
                { text: "1GB Cloud storage", available: true },
                { text: "Email and community support", available: false },
            ],
            button: "Try for free",
            highlighted: true,
        },
        {
            title: "PREMIUM",
            price: "19.99",
            features: [
                { text: "Unlimited product updates", available: true },
                { text: "Unlimited product updates", available: true },
                { text: "Unlimited product updates", available: true },
                { text: "1GB Cloud storage", available: true },
                { text: "Email and community support", available: true },
            ],
            button: "Try for free",
            highlighted: false,
        },
    ];

    return (
        <div className="pricing-container">
            <div className="mx-auto text-center">
                <div className="flex flex-col gap-2 mb-10">
                    <h2>Bảng giá dịch vụ</h2>
                    <p>
                        Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics
                    </p>
                </div>
                <Row gutter={[40, 30]} align={"middle"}>
                    {plans.map((plan, index) => (
                        <Col
                            lg={8} md={12} sm={12} xs={24}
                            key={index}
                        >
                            <div
                                key={index}
                                className={`box`}
                            >
                                <h3 className="text-xl font-semibold mb-4">{plan.title}</h3>
                                <p className="text-[32px] font-bold mb-4">
                                    <span className="text-[18px] font-medium">Organize across all apps by hand</span>
                                </p>
                                <p className="text-[32px] font-bold mb-4">
                                    {plan.price} <span className="text-[18px] font-medium">$</span> <span className="text-[14px]">/Month</span>
                                </p>
                                <ul className="flex flex-col gap-4">
                                    {plan.features.map((feature, idx) => (
                                        <li
                                            key={idx}
                                            className={`flex items-center font-semibold ${feature.available ? "text-[#1d9b5e]" : "text-[#252B42]"
                                                }`}
                                        >
                                            <span className="mr-2">{feature.available ?
                                                <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <rect x="0.5" width="32" height="32" rx="16" fill="#2DC071" />
                                                    <g clip-path="url(#clip0_1479_8362)">
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M24.7957 10.2043C24.8604 10.269 24.9118 10.3457 24.9469 10.4302C24.9819 10.5147 25 10.6053 25 10.6968C25 10.7883 24.9819 10.8789 24.9469 10.9634C24.9118 11.0479 24.8604 11.1246 24.7957 11.1893L15.0578 20.9271C14.9932 20.9919 14.9164 21.0433 14.8319 21.0783C14.7474 21.1134 14.6568 21.1314 14.5654 21.1314C14.4739 21.1314 14.3833 21.1134 14.2988 21.0783C14.2143 21.0433 14.1375 20.9919 14.0729 20.9271L9.20398 16.0582C9.07337 15.9276 9 15.7504 9 15.5657C9 15.381 9.07337 15.2039 9.20398 15.0733C9.33459 14.9427 9.51173 14.8693 9.69644 14.8693C9.88115 14.8693 10.0583 14.9427 10.1889 15.0733L14.5654 19.4511L23.8107 10.2043C23.8754 10.1396 23.9521 10.0882 24.0366 10.0531C24.1211 10.018 24.2117 10 24.3032 10C24.3947 10 24.4853 10.018 24.5698 10.0531C24.6543 10.0882 24.731 10.1396 24.7957 10.2043Z" fill="white" />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_1479_8362">
                                                            <rect width="16" height="11" fill="white" transform="translate(8.5 10)" />
                                                        </clipPath>
                                                    </defs>
                                                </svg>

                                                :
                                                <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <rect x="0.5" width="32" height="32" rx="16" fill="#BDBDBD" />
                                                    <g clip-path="url(#clip0_1479_8377)">
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M24.7957 10.2043C24.8604 10.269 24.9118 10.3457 24.9469 10.4302C24.9819 10.5147 25 10.6053 25 10.6968C25 10.7883 24.9819 10.8789 24.9469 10.9634C24.9118 11.0479 24.8604 11.1246 24.7957 11.1893L15.0578 20.9271C14.9932 20.9919 14.9164 21.0433 14.8319 21.0783C14.7474 21.1134 14.6568 21.1314 14.5654 21.1314C14.4739 21.1314 14.3833 21.1134 14.2988 21.0783C14.2143 21.0433 14.1375 20.9919 14.0729 20.9271L9.20398 16.0582C9.07337 15.9276 9 15.7504 9 15.5657C9 15.381 9.07337 15.2039 9.20398 15.0733C9.33459 14.9427 9.51173 14.8693 9.69644 14.8693C9.88115 14.8693 10.0583 14.9427 10.1889 15.0733L14.5654 19.4511L23.8107 10.2043C23.8754 10.1396 23.9521 10.0882 24.0366 10.0531C24.1211 10.018 24.2117 10 24.3032 10C24.3947 10 24.4853 10.018 24.5698 10.0531C24.6543 10.0882 24.731 10.1396 24.7957 10.2043Z" fill="white" />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_1479_8377">
                                                            <rect width="16" height="11" fill="white" transform="translate(8.5 10)" />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            }</span>
                                            {feature.text}
                                        </li>
                                    ))}
                                    <li>
                                        <button
                                            className={`py-2 px-4 rounded bg-[#1d9b5e] text-[#FFF] font-semibold w-full`}
                                        >
                                            {plan.button}
                                        </button>
                                    </li>
                                </ul>

                            </div>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
};

export default PricingComponent;
