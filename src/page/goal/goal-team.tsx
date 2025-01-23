import React, { useEffect, useState } from "react";
import LayoutClient from "../../infrastructure/common/Layouts/Client-Layout";
import goalService from "../../infrastructure/repositories/goal/goal.service";
import { FullPageLoading } from "../../infrastructure/common/components/controls/loading";
import { useParams } from "react-router-dom";
import { formatCurrencyVND } from "../../infrastructure/helper/helper";

const GoalSpendingTeamPage = () => {
    const [listGoal, setListGoal] = useState<Array<any>>([]);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    const onGetListGoalAsync = async () => {
        try {
            await goalService.GoalTeam(
                String(id),
                setLoading
            ).then((res) => {
                setListGoal(res.content);
            })
        }
        catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        onGetListGoalAsync().then(_ => { });
    }, []);
    console.log("listGoal", listGoal);

    return (
        <LayoutClient>
            <div className="personal-finance-container">
                <div className="banner">
                    <div className='overlay'></div>
                    <div className="layout text-center bg-cover bg-center py-20">
                    </div>
                </div>
                <div className="padding-common">
                    <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Danh mục mục tiêu</h1>

                    {/* Danh sách mục tiêu */}
                    <div className="space-y-4">
                        {listGoal.map((goal) => {
                            const percentage = Math.min((goal.currentAmount / goal.goalAmount) * 100, 100);
                            return (
                                <div
                                    key={goal.id}
                                    className="p-4 bg-gray-100 rounded-lg shadow flex flex-col md:flex-row md:items-center justify-between"
                                >
                                    {/* Thông tin mục tiêu */}
                                    <div className="flex flex-col gap-2">
                                        <p className="text-[20px] font-semibold text-[#1d1d1d]">{goal.name}</p>
                                        <p className="text-[14px] text-[#242424]">Số tiền mục tiêu: {formatCurrencyVND(goal.goalAmount)}</p>
                                        <p className="text-[14px] text-[#242424]">Đã đạt được: {formatCurrencyVND(goal.currentAmount)}</p>
                                        <p className="text-[14px] text-[#242424]">Ngày tạo: {goal.startDate}</p>
                                        <p className="text-[14px] text-[#242424]">Ngày kết thúc: {goal.endDate}</p>
                                    </div>
                                    {/* Thanh tiến trình */}
                                    <div className="w-full md:w-1/2 mt-4 md:mt-0 md:ml-4">
                                        <div className="relative w-full h-4 bg-[#dedede] rounded-full overflow-hidden">
                                            <div
                                                className="absolute top-0 left-0 h-full bg-[#40bb15]"
                                                style={{ width: `${percentage}%` }}
                                            ></div>
                                        </div>
                                        <p className="text-right text-sm text-[#242424] mt-1">
                                            {percentage.toFixed(0)}%
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Nút thêm mục tiêu mới */}
                    <div className="flex justify-center mt-6">
                        <button className="bg-[#40bb15] text-white px-6 py-3 rounded-lg shadow-lg hover:bg-[#41bb15e1]">
                            + Thêm mục tiêu mới
                        </button>
                    </div>
                </div>
            </div>
            <FullPageLoading isLoading={loading} />
        </LayoutClient >
    );
};

export default GoalSpendingTeamPage;
