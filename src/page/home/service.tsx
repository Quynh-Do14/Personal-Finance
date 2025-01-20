import { Col, Row } from "antd";
import React from "react";

const services = [
    { title: "Investment Trading", description: "The quick fox jumps over the lazy dog", },
    { title: "Support On Raising Funds", description: "The quick fox jumps over the lazy dog", },
    { title: "Financial Analysis", description: "The quick fox jumps over the lazy dog", },
    { title: "Taxation Planning", description: "The quick fox jumps over the lazy dog", },
    { title: "Save Money and Time", description: "The quick fox jumps over the lazy dog", },
    { title: "Outsourced Consulting", description: "The quick fox jumps over the lazy dog", },
];

const ServiceComponent = () => {
    return (
        <div className="padding-common mt-[80px]">
            <div className="mx-auto text-center">
                <div className="flex flex-col gap-2 mb-10">
                    <h2 className="text-[40px] font-bold text-[#252B42]">Better Strategy</h2>
                    <h3 className="text-[40px] font-semibold text-[#252B42]">With Quality Business</h3>
                    <p className="text-[16px] text-[#737373]">
                        Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics
                    </p>
                </div>

                <Row gutter={[30, 30]}>
                    {services.map((service, index) => (
                        <Col
                            lg={8} md={12} sm={12} xs={24}
                            key={index}
                        >
                            <div className="tag-content h-full bg-white border-[1px] border-[#F2F2F2] shadow-lg px-6 py-10 flex items-start text-center gap-6 hover:shadow-xl transition-shadow">
                                <svg width="48" height="40" viewBox="0 0 48 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_1479_8236)">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M45.9167 38.6667C45.9167 38.6667 49.0001 38.6667 49.0001 35.5556C49.0001 32.4445 45.9167 23.1112 33.5834 23.1112C21.2501 23.1112 18.1667 32.4445 18.1667 35.5556C18.1667 38.6667 21.2501 38.6667 21.2501 38.6667H45.9167ZM21.3179 35.5556H45.8489C45.8634 35.5539 45.8777 35.5518 45.8921 35.5494L45.9167 35.5432C45.9106 34.7218 45.4018 32.3387 43.5734 30.192C41.8714 28.1791 38.8806 26.2223 33.5834 26.2223C28.2893 26.2223 25.2985 28.1823 23.5934 30.192C21.765 32.3387 21.2532 34.7249 21.2501 35.5432C21.2726 35.5475 21.2953 35.5517 21.3179 35.5556ZM33.5834 16.8889C35.2189 16.8889 36.7874 16.2334 37.9439 15.0665C39.1004 13.8996 39.7501 12.3169 39.7501 10.6667C39.7501 9.01647 39.1004 7.43382 37.9439 6.26693C36.7874 5.10004 35.2189 4.44448 33.5834 4.44448C31.9479 4.44448 30.3794 5.10004 29.2229 6.26693C28.0664 7.43382 27.4167 9.01647 27.4167 10.6667C27.4167 12.3169 28.0664 13.8996 29.2229 15.0665C30.3794 16.2334 31.9479 16.8889 33.5834 16.8889ZM42.8334 10.6667C42.8334 11.8924 42.5942 13.106 42.1293 14.2384C41.6644 15.3708 40.9831 16.3997 40.1242 17.2664C39.2652 18.133 38.2455 18.8205 37.1232 19.2896C36.001 19.7586 34.7981 20 33.5834 20C32.3687 20 31.1659 19.7586 30.0436 19.2896C28.9213 18.8205 27.9016 18.133 27.0427 17.2664C26.1837 16.3997 25.5024 15.3708 25.0375 14.2384C24.5727 13.106 24.3334 11.8924 24.3334 10.6667C24.3334 8.19135 25.308 5.81738 27.0427 4.06704C28.7774 2.3167 31.1302 1.33337 33.5834 1.33337C36.0367 1.33337 38.3894 2.3167 40.1242 4.06704C41.8589 5.81738 42.8334 8.19135 42.8334 10.6667ZM21.0527 23.9823C19.8194 23.5904 18.548 23.3328 17.2602 23.2138C16.5367 23.1444 15.8102 23.1101 15.0834 23.1112C2.75008 23.1112 -0.333252 32.4445 -0.333252 35.5556C-0.333252 37.6307 0.693498 38.6667 2.75008 38.6667H15.7494C15.2923 37.6955 15.0644 36.6306 15.0834 35.5556C15.0834 32.4134 16.2458 29.2027 18.4442 26.5209C19.1935 25.6063 20.0661 24.7507 21.0527 23.9823ZM14.8367 26.2223C9.69375 26.2845 6.77383 28.2134 5.09341 30.192C3.25266 32.3512 2.75008 34.7436 2.75008 35.5556H12.0001C12.0001 32.3045 12.996 29.0658 14.8367 26.2223ZM4.29175 12.2223C4.29175 9.74691 5.2663 7.37294 7.00101 5.6226C8.73572 3.87226 11.0885 2.88893 13.5417 2.88893C15.995 2.88893 18.3478 3.87226 20.0825 5.6226C21.8172 7.37294 22.7917 9.74691 22.7917 12.2223C22.7917 14.6976 21.8172 17.0716 20.0825 18.8219C18.3478 20.5723 15.995 21.5556 13.5417 21.5556C11.0885 21.5556 8.73572 20.5723 7.00101 18.8219C5.2663 17.0716 4.29175 14.6976 4.29175 12.2223ZM13.5417 6.00004C11.9062 6.00004 10.3377 6.65559 9.18126 7.82249C8.02478 8.98938 7.37508 10.572 7.37508 12.2223C7.37508 13.8725 8.02478 15.4551 9.18126 16.622C10.3377 17.7889 11.9062 18.4445 13.5417 18.4445C15.1772 18.4445 16.7458 17.7889 17.9022 16.622C19.0587 15.4551 19.7084 13.8725 19.7084 12.2223C19.7084 10.572 19.0587 8.98938 17.9022 7.82249C16.7458 6.65559 15.1772 6.00004 13.5417 6.00004Z" fill="#40bb15" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_1479_8236">
                                            <rect width="48" height="39.5295" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                                <div className="flex flex-col gap-1 items-start text-left">
                                    <h3 className="text-[20px] font-semibold text-[#171717]">{service.title}</h3>
                                    <p className="text-[#2b2b2b] text-[16px]">{service.description}</p>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            </div>
        </div >
    );
};

export default ServiceComponent;
