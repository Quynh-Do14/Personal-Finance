import React from 'react'
import RoundChartMiniCommon from '../../../infrastructure/common/components/mini-chart/round-chart'
import { convertDateOnlyShow, formatCurrencyVND } from '../../../infrastructure/helper/helper'
import AnimatedNumber from '../../../infrastructure/common/components/controls/AnimatedNumber';
import sad from "../../../assets/images/sad.gif";

import happy from "../../../assets/images/happy.gif";
import BarChartStatic from './barChart';

import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type Props = {
    detailGoal: any

    dailySpend: number
    incomeStatistics: any
    spendStatistics: any
    barChartData: any
}
const OverviewComponent = (props: Props) => {
    const {
        detailGoal,

        dailySpend,
        incomeStatistics,
        spendStatistics,
        barChartData,
    } = props;
    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 6000,
        arrows: false,
    }

    return (
        <div className="overview box-common">
            <div className='flex justify-between gap-2 flex-wrap'>
                <p className="title-box">{detailGoal.name} </p>
                <div className='is-done'>
                    Chưa đạt
                </div>
            </div>
            <div className='target'>
                <div className="label">Số tiền mục tiêu</div>
                <div className="value"> {formatCurrencyVND(detailGoal.goalAmount)}</div>

            </div>
            <Slider {...settings} className='slider'>
                <div className='content'>
                    <div>
                        <div className="label">Số dư hiện tại</div>
                        <div className="value"> {formatCurrencyVND(detailGoal.currentAmount)}</div>
                    </div>
                    <div className="label">Thời hạn: {convertDateOnlyShow(detailGoal.startDate)} - {convertDateOnlyShow(detailGoal.endDate)}</div>
                </div>
                <div className="info">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="title">Tổng chi tiêu hôm nay</p>
                            <p className={`${dailySpend >= 0 ? "text-[#1d9b5e]" : "text-[#e05349]"} sum`}>
                                {dailySpend >= 0 ? <i className="fa fa-caret-up mr-2" aria-hidden="true"></i> : <i className="fa fa-caret-down" aria-hidden="true"></i>}
                                {dailySpend && <AnimatedNumber value={dailySpend} />}
                            </p>
                        </div>
                    </div>
                    <div className="more">
                        <div className="text-left text-[#1d9b5e]">
                            <p className="">Thu nhập</p>
                            <p className=""><i className="fa fa-caret-up mr-2" aria-hidden="true"></i>{incomeStatistics.totalInCome && <AnimatedNumber value={incomeStatistics.totalInCome} />}</p>
                        </div>
                        <div className="text-right text-[#e05349]">
                            <p className="">Chi phí</p>
                            <p className=""><i className="fa fa-caret-down mr-2" aria-hidden="true"></i>{spendStatistics.totalSpend && <AnimatedNumber value={spendStatistics.totalSpend} />}</p>
                        </div>
                    </div>
                </div>
                <div className="content">
                    <RoundChartMiniCommon
                        completed={Number(((detailGoal.currentAmount / detailGoal.goalAmount) * 100).toFixed(2))}
                        total={100}
                    />
                </div>
            </Slider>

        </div>
    )
}

export default OverviewComponent