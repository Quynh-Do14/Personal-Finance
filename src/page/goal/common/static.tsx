import { formatCurrencyVND } from '../../../infrastructure/helper/helper';
import TimeFilter from '../../../infrastructure/common/components/time-filter/TimeFilter';
import { ButtonDesign } from '../../../infrastructure/common/components/button/buttonDesign';
type Props = {
    selectedTab: "spend" | "income"
    dataTable: any[]
    spendStatistics: any
    incomeStatistics: any

    setTimeRange: (value: string) => void;
    setStartDate: (value: string) => void;
    setEndDate: (value: string) => void;
    startDate: string
    endDate: string
    onGetSpendPersonalByGoalStatistical: Function
    onGetIncomePersonalByGoalStatistical: Function
    setSelectedTab: (tab: "income" | "spend") => void;
}
const StaticComponent = (props: Props) => {
    const {
        selectedTab,
        dataTable,
        spendStatistics,
        incomeStatistics,

        setTimeRange,
        setStartDate,
        setEndDate,
        startDate,
        endDate,
        onGetSpendPersonalByGoalStatistical,
        onGetIncomePersonalByGoalStatistical,
        setSelectedTab
    } = props;
    return (
        <div className='static box-common'>
            <p className='title-box'>Các khoản thu chi</p>
            <TimeFilter
                setTimeRange={setTimeRange}
                startDate={startDate}
                endDate={endDate}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
                fetchData={() => {
                    onGetSpendPersonalByGoalStatistical();
                    onGetIncomePersonalByGoalStatistical();
                }}
            />

            {/* Tabs chi phí / thu nhập */}
            <div className="flex justify-center gap-4 mb-6">
                <ButtonDesign
                    classColor={selectedTab === "income" ? "green" : "transparent"}
                    onClick={() => setSelectedTab("income")}
                    title={"Thu nhập"}
                    width={160}
                />
                <ButtonDesign
                    classColor={selectedTab === "spend" ? "green" : "transparent"}
                    onClick={() => setSelectedTab("spend")}
                    title={"Chi phí"}
                    width={160}
                />
            </div>

            {
                dataTable.length
                    ?
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
                    :
                    <div className="text-center font-semibold text-md text-[#242424]">Chưa có dữ liệu chi tiêu !!!</div>
            }
        </div>
    )
}

export default StaticComponent