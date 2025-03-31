import { Col, Row } from 'antd';
import React from 'react'
import { Doughnut, Bar } from 'react-chartjs-2';
import { formatCurrencyVND } from '../../../infrastructure/helper/helper';
type Props = {
    selectedTab: "spend" | "income"
    dataTable: any[]
    spendData: any
    incomeData: any
    spendStatistics: any
    incomeStatistics: any
}
const StaticComponent = (props: Props) => {
    const {
        selectedTab,
        dataTable,
        spendData,
        incomeData,
        spendStatistics,
        incomeStatistics
    } = props;
    return (
        <div className='static'>

            {
                dataTable.length
                    ?
                    <Row gutter={[40, 20]}>
                        <Col sm={24} md={18} lg={8} className="w-full">
                            <Doughnut data={selectedTab === "spend" ? spendData : incomeData} />
                        </Col>
                        <Col sm={24} md={24} lg={16} className="overflow-x-auto w-full">
                            <table>
                                <thead className="bg-[#003333eb] text-[#FFF]">
                                    <tr className="text-[16px]">
                                        <th className="px-6 py-4">Danh mục</th>
                                        <th className="px-6 py-4">Chi tiêu</th>
                                        <th className="px-6 py-4">Tỉ lệ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        dataTable.map((item, index) => {
                                            const percent = item.amount / (selectedTab === "spend" ? spendStatistics?.totalSpend : incomeStatistics?.totalInCome)
                                            return (
                                                <tr
                                                    key={index}
                                                    className={`${index % 2 === 0 ? "bg-[#003333]" : "bg-[#003333eb]"} hover:bg-[#003333c3]`}
                                                >
                                                    <td className="px-6 py-4">{selectedTab === "spend" ? item?.spendingType?.name : item?.inComeType?.name}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">{formatCurrencyVND(item.amount)}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">{Number(percent * 100).toFixed(2)}%</td>
                                                </tr>
                                            )
                                        })}
                                </tbody>
                            </table>
                        </Col>
                    </Row>
                    :
                    <div className="text-center font-semibold text-md text-[#242424]">Chưa có dữ liệu chi tiêu !!!</div>
            }
        </div>
    )
}

export default StaticComponent