import RoundChartMiniCommon from '../../../infrastructure/common/components/mini-chart/round-chart'
import { convertDateOnlyShow, } from '../../../infrastructure/helper/helper'
import AnimatedNumber from '../../../infrastructure/common/components/controls/AnimatedNumber';

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
const OverviewPersonalComponent = (props: Props) => {
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
            <p className="title-box">Tổng quan </p>
            <div className={`${dailySpend >= 0 ? "green-bg" : "red-bg"} info`} >
                <div className="flex items-center justify-between">
                    <div>
                        <p className="title">Tổng chi tiêu hôm nay</p>
                        <p className="sum">
                            {dailySpend >= 0 ? <i className="fa fa-caret-up mr-2" aria-hidden="true"></i> : <i className="fa fa-caret-down" aria-hidden="true"></i>}
                            {dailySpend && <AnimatedNumber value={dailySpend} />}₫
                        </p>
                    </div>
                </div>
                <div className="more">
                    <div>
                        <p className="">Thu nhập</p>
                        <p className=""><i className="fa fa-caret-up mr-2" aria-hidden="true"></i>{incomeStatistics.totalInCome && <AnimatedNumber value={incomeStatistics.totalInCome} />}₫</p>
                    </div>
                    <div>
                        <p className="">Chi phí</p>
                        <p className=""><i className="fa fa-caret-down mr-2" aria-hidden="true"></i>{spendStatistics.totalSpend && <AnimatedNumber value={spendStatistics.totalSpend} />}₫</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default OverviewPersonalComponent