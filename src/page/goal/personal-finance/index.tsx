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
import { formatCurrencyVND } from "../../../infrastructure/helper/helper";
import RoundChartMiniCommon from "../../../infrastructure/common/components/mini-chart/round-chart";
ChartJS.register(ArcElement, Tooltip, Legend);

const PersonalFinancePage = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [loadingBot, setLoadingBot] = useState(false);

    const [isOpenChatBox, setIsOpenChatBox] = useState<boolean>(false);
    const [detailGoal, setDetailGoal] = useState<any>({});
    const [dataChatBox, setDataChatBox] = useState<any[]>([]);
    const [messages, setMessages] = useState<string>("");

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
                setLoadingBot
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
    }, []);

    const handleSendMessage = async () => {
        try {
            await chatService.AddChatPersonal(
                String(id),
                {
                    question: messages
                },
                async () => {
                    setTimeout(async () => {
                        setMessages("");
                        await onGetChatBoxAsync();
                    }, 10);
                },
                setLoadingBot
            ).then(() => {
            });
        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        <LayoutClient>
            <div className="personal-finance-container">
                <div className="banner">
                    <div className='overlay'></div>
                    <div className="layout text-center bg-cover bg-center py-20">
                    </div>
                </div>
                <div className="personal-finance-container padding-common">
                    <div className="bg-white flex flex-col gap-6">
                        {/* Tổng số dư */}
                        <div className="flex flex-col gap-2 items-center justify-center">
                            <p className="text-[#40BB15] font-semibold text-[28px]">{detailGoal.name}</p>
                            <p className="text-[24px] font-semibold">VND:{formatCurrencyVND(detailGoal.goalAmount)}</p>
                        </div>

                        {/* Danh sách ví */}
                        <div className="flex items-center justify-between bg-[#f1f1f1] p-4 rounded-lg shadow">
                            <div className="flex flex-col gap-2">
                                <p className="text-[20px] font-semibold text-[#212121]">{detailGoal.user?.username} </p>
                                <p className="text-[16Fpx] text-[#303030]">Mục tiêu đã đạt được: {formatCurrencyVND(detailGoal.currentAmount)}</p>
                                <p className="text-[16Fpx] text-[#303030]">Thời hạn: {detailGoal.startDate} - {detailGoal.endDate} </p>
                            </div>
                            <RoundChartMiniCommon
                                completed={detailGoal.currentAmount}
                                total={detailGoal.goalAmount}
                            />
                        </div>

                        {/* Bộ lọc thời gian */}
                        {/* <div className="">
                            <div className="relative">
                                <select
                                    className="w-full border rounded-lg px-4 py-3 text-[#303030] focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    defaultValue="Tháng"
                                >
                                    <option value="Tháng">Tháng</option>
                                    <option value="Tuần">Tuần</option>
                                </select>
                            </div>
                            <p className="text-center mt-2 text-[#303030]">tháng 1 năm 2025</p>
                        </div> */}

                        {/* Thẻ số dư */}
                        <div className="flex items-center justify-between bg-gradient-to-r from-blue-100 to-blue-50 p-6 rounded-lg shadow ">
                            <div>
                                <p className="text-[#212121] font-medium">Tổng chi tiêu hôm nay</p>
                                <p className="text-red-500 text-2xl font-bold">₫-210,000 😟</p>
                            </div>
                            <div className="text-gray-500 text-2xl">ℹ️</div>
                        </div>

                        {/* Thông tin thu chi */}
                        <div className="flex items-center justify-between ">
                            <div className="text-center">
                                <p className="text-red-500 font-semibold">Chi phí</p>
                                <p className="text-[#212121] text-xl font-bold">₫510,000</p>
                            </div>
                            <div className="text-center">
                                <p className="text-green-500 font-semibold">Thu nhập</p>
                                <p className="text-[#212121] text-xl font-bold">₫300,000</p>
                            </div>
                        </div>

                        {/* Tabs chi phí / thu nhập */}
                        <div className="flex justify-center space-x-4 ">
                            <button className="bg-[#40BB15] text-[#FFF] px-6 py-3 rounded-lg font-semibold">
                                Chi phí
                            </button>
                            <button className="bg-[#cfcfcf] text-[#303030] px-6 py-3 rounded-lg font-semibold">
                                Thu nhập
                            </button>
                        </div>

                        {/* Biểu đồ tròn */}
                        <div className="flex justify-center ">
                            <div className="w-72 h-72">
                                <Pie data={pieData} />
                            </div>
                        </div>
                        <ChatButton
                            isOpenChatBox={isOpenChatBox}
                            setIsOpenChatBox={setIsOpenChatBox}
                            dataChatBox={dataChatBox}
                            handleSendMessage={handleSendMessage}
                            messages={messages}
                            setMessages={setMessages}
                            loading={loadingBot}
                        />
                    </div>
                </div>
            </div>
            <FullPageLoading isLoading={loading} />
        </LayoutClient >
    );
};

export default PersonalFinancePage;
