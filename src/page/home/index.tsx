import React from 'react'
import LayoutClient from '../../infrastructure/common/Layouts/Client-Layout'
import "../../assets/styles/page/homepage.css"
import ServiceComponent from './service'
import TagComponent from './tag'
import PricingComponent from './pricing'
const HomePage = () => {
    return (
        <LayoutClient>
            <div className="homepage-container">
                <div className="banner">
                    <div className='overlay'></div>
                    <div className="layout text-center bg-cover bg-center py-20">
                        <div>
                            <h1 className="text-[40px] text-[#FFF] font-bold mb-4">
                                Creating a Beautiful & Useful Solutions
                            </h1>
                            <p className="text-[#FFF] text-[16px] mb-8">
                                We know how large objects will act, but things on a small scale just do not act that way.
                            </p>
                            <div className="btn flex justify-center space-x-4">
                                <button className="px-6 py-3 text-[14px] rounded-[24px] w-[180px] font-semibold bg-[#40BB15] text-[#FFF]  hover:bg-[#40BB1590] duration-300">
                                    Get Quote Now
                                </button>
                                <button className="px-6 py-3 text-[14px] rounded-[24px] w-[180px] font-semibold border-2 border-[#ffffff] text-[#ffffff] hover:bg-[#f5f5f5] hover:text-[#40BB15] duration-300">
                                    Learn More
                                </button>
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