import { configImageURL, formatCurrencyVND } from '../../../infrastructure/helper/helper';
import TimeFilter from '../../../infrastructure/common/components/time-filter/TimeFilter';
import { ButtonDesign } from '../../../infrastructure/common/components/button/buttonDesign';
import categoryOther from '../../../assets/images/category/another.png'
import SelectFilterCommon from '../../../infrastructure/common/components/input/select-filter';
import Constants from '../../../core/common/constants';
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
    isType?: boolean;
    selectedType: "type" | "user"
    setSelectedType: (value: "type" | "user") => void;

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
        setSelectedTab,
        isType = false,
        selectedType,
        setSelectedType
    } = props;
    const onChangeType = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const mapValue: Record<string, "type" | "user"> = {
            "1": "type",
            "2": "user"
        };
        const selected = mapValue[e.target.value];
        if (selected) {
            setSelectedType(selected);
        }
    }
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
            {
                isType
                &&
                <SelectFilterCommon
                    label={""}
                    listDataOfItem={Constants.MenuTabFinance.List}
                    onChange={onChangeType}
                />
            }

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
                    selectedType == "type"
                        ?
                        <table>
                            <thead className="bg-[#cce5ff]">
                                <tr className="text-[16px]">
                                    <th className="px-1 py-1"></th>
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
                                                className={`${index % 2 === 0 ? "bg-[#ccf2dd]" : "bg-[#cce5ff]"
                                                    } hover:bg-[#b3d8ff]`}
                                            >
                                                <td className="px-1 py-1 flex justify-center">
                                                    <div className='cate'>
                                                        <img src={selectedTab === "spend"
                                                            ?
                                                            configImageURL(item?.spendingType?.imageCode) || categoryOther
                                                            :
                                                            configImageURL(item?.inComeType?.imageCode) || categoryOther
                                                        }
                                                        />
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">{
                                                    selectedTab === "spend"
                                                        ?
                                                        item?.spendingType?.name
                                                        :
                                                        item?.inComeType?.name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">{formatCurrencyVND(item.amount)}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{Number(percent * 100).toFixed(2)}%</td>
                                            </tr>
                                        )
                                    })}
                            </tbody>
                        </table>
                        :
                        <table>
                            <thead className="bg-[#cce5ff]">
                                <tr className="text-[16px]">
                                    <th className="px-6 py-4">Thành viên</th>
                                    <th className="px-6 py-4">Chi tiêu</th>
                                    <th className="px-6 py-4">Tỉ lệ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    dataTable.map((item, index) => {
                                        const percent = item.amount / (selectedTab === "spend" ? spendStatistics?.totalInCome : incomeStatistics?.totalInCome)
                                        return (
                                            <tr
                                                className={`${index % 2 === 0 ? "bg-[#ccf2dd]" : "bg-[#cce5ff]"
                                                    } hover:bg-[#b3d8ff]`}
                                            >
                                                <td className="px-6 py-4 whitespace-nowrap">{item?.user?.name}</td>
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