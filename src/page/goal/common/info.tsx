import AnimatedNumber from '../../../infrastructure/common/components/controls/AnimatedNumber';
import sad from "../../../assets/images/sad.gif";

import happy from "../../../assets/images/happy.gif";
import BarChartStatic from './barChart';
import { Col, Row } from 'antd';
type Props = {
    dailySpend: number
    incomeStatistics: any
    spendStatistics: any
    barChartData: any
}
const InfoComponent = (props: Props) => {
    const {
        dailySpend,
        incomeStatistics,
        spendStatistics,
        barChartData,
    } = props;

    return (
        <div className="info">
            <div className="flex items-center justify-between">
                <div>
                    <p className="title">Tổng chi tiêu hôm nay</p>
                    <p className={`${dailySpend >= 0 ? "text-[#1d9b5e]" : "text-[#e05349]"} sum`}>
                        {dailySpend >= 0 ? <i className="fa fa-caret-up mr-2" aria-hidden="true"></i> : <i className="fa fa-caret-down" aria-hidden="true"></i>}
                        {dailySpend && <AnimatedNumber value={dailySpend} />}
                    </p>
                </div>
                <div >{dailySpend >= 0 ?
                    <img src={happy} alt="" width={80} />
                    :
                    <img src={sad} alt="" width={80} />
                } </div>
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
    )
}

export default InfoComponent