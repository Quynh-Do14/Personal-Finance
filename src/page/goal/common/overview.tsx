import React from 'react'
import RoundChartMiniCommon from '../../../infrastructure/common/components/mini-chart/round-chart'
import { convertDateOnlyShow, formatCurrencyVND } from '../../../infrastructure/helper/helper'
import robot from "../../../assets/images/robot.gif";

type Props = {
    detailGoal: any
}
const OverviewComponent = (props: Props) => {
    const { detailGoal } = props;
    return (
        <div> <div className="overview">
            <div className="content">
                <div className="flex flex-col gap-2">
                    <p className="title">{detailGoal.name} </p>
                    <p className="sub">Mục tiêu: {formatCurrencyVND(detailGoal.goalAmount)}</p>
                    <p className="sub">Số tiền đã đã đạt được: {formatCurrencyVND(detailGoal.currentAmount)}</p>
                    <p className="sub">Thời hạn: {convertDateOnlyShow(detailGoal.startDate)} - {convertDateOnlyShow(detailGoal.endDate)} </p>
                </div>
                <RoundChartMiniCommon
                    completed={Number(((detailGoal.currentAmount / detailGoal.goalAmount) * 100).toFixed(2))}
                    total={100}
                />
            </div>
            <img src={robot} alt="" width={160} />
        </div></div>
    )
}

export default OverviewComponent