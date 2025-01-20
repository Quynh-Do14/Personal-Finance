import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";
import "../../../assets/styles/page/personalFinance.css"
import ChatButton from "../../chat/buttonChat";
import LayoutClient from "../../../infrastructure/common/Layouts/Client-Layout";
import goalService from "../../../infrastructure/repositories/goal/goal.service";
import { useParams } from "react-router-dom";
import { FullPageLoading } from "../../../infrastructure/common/components/controls/loading";
import chatService from "../../../infrastructure/repositories/chat/chat.service";
ChartJS.register(ArcElement, Tooltip, Legend);

const PersonalFinancePage = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [isOpenChatBox, setIsOpenChatBox] = useState<boolean>(false);
    const [detailGoal, setDetailGoal] = useState<any>({});
    const [dataChatBox, setDataChatBox] = useState<any[]>([]);

    const pieData = {
        labels: ["Giao thông", "Giải trí", "Thức ăn & Đồ uống"],
        datasets: [
            {
                data: [100, 150, 50],
                backgroundColor: ["#F87171", "#60A5FA", "#34D399"],
                hoverBackgroundColor: ["#EF4444", "#3B82F6", "#059669"],
            },
        ],
    };

    const onGetDetailGoalAsync = async () => {
        try {
            await goalService.GoalPersonalById(
                String(id),
                setLoading
            ).then((res) => {
                setDetailGoal(res);
            })
        }
        catch (error) {
            console.error(error);
        }
    };

    const onGetChatBoxAsync = async () => {
        try {
            await chatService.GetChatPersonal(
                String(id),
                setLoading
            ).then((res) => {
                setDataChatBox(res);
            })
        }
        catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        onGetDetailGoalAsync().then(_ => { });
        onGetChatBoxAsync().then(_ => { });
    }, [isOpenChatBox]);

    return (
        <LayoutClient>
            <div className="personal-finance-container">
                <div className="banner">
                    <div className='overlay'></div>
                    <div className="layout text-center bg-cover bg-center py-20">
                    </div>
                </div>
                <div className="personal-finance-container padding-common">
                    <div className="bg-white">
                        {/* Tổng số dư */}
                        <div className="text-center mb-6">
                            <p className="text-gray-500 text-sm">Tất cả số dư trong ví:</p>
                            <p className="text-2xl font-semibold">VND: 29,790,000₫</p>
                        </div>

                        {/* Danh sách ví */}
                        <div className="flex space-x-4 items-center mb-6">
                            <div className="flex-1 bg-gray-100 p-4 rounded-lg shadow">
                                <p className="font-semibold text-gray-800">QuynhDo</p>
                                <p className="text-gray-600">29,790,000₫</p>
                            </div>
                            <button className="flex items-center justify-center w-24 h-20 border-2 border-dashed border-gray-400 rounded-lg text-gray-600 hover:bg-gray-200">
                                +
                            </button>
                        </div>

                        {/* Bộ lọc thời gian */}
                        <div className="mb-6">
                            <div className="relative">
                                <select
                                    className="w-full border rounded-lg px-4 py-3 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    defaultValue="Tháng"
                                >
                                    <option value="Tháng">Tháng</option>
                                    <option value="Tuần">Tuần</option>
                                </select>
                            </div>
                            <p className="text-center mt-2 text-gray-600">tháng 1 năm 2025</p>
                        </div>

                        {/* Thẻ số dư */}
                        <div className="flex items-center justify-between bg-gradient-to-r from-blue-100 to-blue-50 p-6 rounded-lg shadow mb-6">
                            <div>
                                <p className="text-gray-800 font-medium">Tổng số dư</p>
                                <p className="text-red-500 text-2xl font-bold">₫-210,000 😟</p>
                            </div>
                            <div className="text-gray-500 text-2xl">ℹ️</div>
                        </div>

                        {/* Thông tin thu chi */}
                        <div className="flex items-center justify-between mb-6">
                            <div className="text-center">
                                <p className="text-red-500 font-semibold">Chi phí</p>
                                <p className="text-gray-800 text-xl font-bold">₫510,000</p>
                            </div>
                            <div className="text-center">
                                <p className="text-green-500 font-semibold">Thu nhập</p>
                                <p className="text-gray-800 text-xl font-bold">₫300,000</p>
                            </div>
                        </div>

                        {/* Tabs chi phí / thu nhập */}
                        <div className="flex justify-center space-x-4 mb-6">
                            <button className="bg-[#40BB15] text-[#FFF] px-6 py-3 rounded-lg font-semibold">
                                Chi phí
                            </button>
                            <button className="bg-[#cfcfcf] text-[#303030] px-6 py-3 rounded-lg font-semibold">
                                Thu nhập
                            </button>
                        </div>

                        {/* Biểu đồ tròn */}
                        <div className="flex justify-center mb-6">
                            <div className="w-72 h-72">
                                <Pie data={pieData} />
                            </div>
                        </div>
                        <ChatButton
                            isOpenChatBox={isOpenChatBox}
                            setIsOpenChatBox={setIsOpenChatBox}
                            dataChatBox={dataChatBox}
                        />
                    </div>
                </div>
            </div>
            <FullPageLoading isLoading={loading} />
        </LayoutClient >
    );
};

export default PersonalFinancePage;
