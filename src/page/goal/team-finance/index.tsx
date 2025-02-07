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
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import spendService from "../../../infrastructure/repositories/spend/spend.service";
import TimeFilter from "../../../infrastructure/common/components/time-filter/TimeFilter";
ChartJS.register(ArcElement, Tooltip, Legend);

const TeamFinancePage = () => {
    const tokenString = localStorage.getItem('token');

    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [loadingBot, setLoadingBot] = useState(false);

    const [isOpenChatBox, setIsOpenChatBox] = useState<boolean>(false);
    const [detailGoal, setDetailGoal] = useState<any>({});
    const [dataChatBox, setDataChatBox] = useState<any[]>([]);
    const [messages, setMessages] = useState<string>("");
    const [dailySpend, setDailySpend] = useState<any>();
    const [spendStatistics, setSpendStatistics] = useState<any>({});
    const [incomeStatistics, setIncomeStatistics] = useState<any>({});
    const [endDate, setEndDate] = useState<string>("");
    const [startDate, setStartDate] = useState<string>("");
    const [timeRange, setTimeRange] = useState<string>("daily");
    const [selectedTab, setSelectedTab] = useState<"spend" | "income">("spend");
    const [spendData, setSpendData] = useState({
        labels: [],
        datasets: [{ data: [], backgroundColor: ["#FF6384"] }],
    });

    const [incomeData, setIncomeData] = useState({
        labels: [],
        datasets: [{ data: [], backgroundColor: ["#36A2EB"] }],
    });

    // const onGetDetailGoalAsync = async () => {
    //     try {
    //         await goalService.GoalPersonalById(
    //             String(id),
    //             () => { }
    //         ).then((res) => {
    //             setDetailGoal(res);
    //         })
    //     }
    //     catch (error) {
    //         console.error(error);
    //     }
    // };

    const onGetChatBoxAsync = async () => {
        try {
            await chatService.GetChatTeam(
                String(id),
                String(1),
                () => { }
            ).then((res) => {
                setDataChatBox(res);
            })
        }
        catch (error) {
            console.error(error);
        }
    };

    const onGetSpendPersonalByGoalStatisticalDaily = async () => {
        try {
            await spendService.TeamStatisticalByGoal(
                String(id),
                String(1),
                "",
                "",
                "daily",
                setLoading
            ).then((res) => {
                setDailySpend(res.spendStatistics.totalSpend);
            })
        }
        catch (error) {
            console.error(error);
        }
    };

    const generateColors = (length: number) => {
        const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"];
        return Array.from({ length }, (_, i) => colors[i % colors.length]); // Lặp lại màu nếu thiếu
    };

    const onGetSpendPersonalByGoalStatistical = async () => {
        setLoading(true);
        try {
            const res = await spendService.TeamStatisticalByGoal(
                String(id),
                String(1),
                startDate,
                endDate,
                timeRange,
                setLoading
            );

            if (!res.spendStatistics || !Array.isArray(res.spendStatistics.spendingTypeAndAmounts)) {
                console.warn("No spending data available");
                setSpendData({ labels: [], datasets: [] });
                return;
            }

            const labels = res.spendStatistics.spendingTypeAndAmounts.map((item: any) => item.spendingType?.name || "Unknown");
            const dataValues = res.spendStatistics.spendingTypeAndAmounts.map((item: any) => item.amount || 0);
            const colors = generateColors(labels.length);

            setSpendStatistics(res.spendStatistics);
            setSpendData({
                labels: labels,
                datasets: [
                    {
                        data: dataValues,
                        backgroundColor: colors,
                    },
                ],
            });
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const onGetIncomePersonalByGoalStatistical = async () => {
        setLoading(true);
        try {
            const res = await spendService.TeamStatisticalByGoal(
                String(id),
                String(1),
                startDate,
                endDate,
                timeRange,
                () => { }
            );

            if (!res.incomeStatistics || !Array.isArray(res.incomeStatistics.inComeTypeAndAmounts)) {
                console.warn("No income data available");
                setIncomeData({ labels: [], datasets: [] });
                return;
            }

            const labels = res.incomeStatistics.inComeTypeAndAmounts.map((item: any) => item.inComeType?.name || "Unknown");
            const dataValues = res.incomeStatistics.inComeTypeAndAmounts.map((item: any) => item.amount || 0);
            const colors = generateColors(labels.length);

            setIncomeStatistics(res.incomeStatistics);
            setIncomeData({
                labels: labels,
                datasets: [
                    {
                        data: dataValues,
                        backgroundColor: colors,
                    },
                ],
            });
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // onGetDetailGoalAsync().then(_ => { });
        onGetChatBoxAsync().then(_ => { });
        onGetSpendPersonalByGoalStatisticalDaily().then(_ => { });
        onGetSpendPersonalByGoalStatistical().then(_ => { });
        onGetIncomePersonalByGoalStatistical().then(_ => { });
    }, [timeRange]);

    useEffect(() => {
        // Lấy JWT từ localStorage hoặc sessionStorage
        const tokenData = tokenString ? JSON.parse(tokenString) : null;
        const token = tokenData ? tokenData.accessToken : null;
        const baseUrl = process.env.REACT_APP_BASE_URL;

        const socket = new SockJS(`${baseUrl}/ws?token=${token}`);

        const stompClient = new Client({
            webSocketFactory: () => socket,
            debug: (str) => {
                console.log('STOMP Debug: ' + str);
            },
            connectHeaders: {
                Authorization: `Bearer ${token}`
            },
            onConnect: (frame) => {
                console.log('Connected: ' + frame);

                // Lắng nghe thông báo từ đích riêng của user
                stompClient.subscribe('/user/queue/chat', () => {
                    // onGetDetailGoalAsync();
                    onGetChatBoxAsync();
                    onGetSpendPersonalByGoalStatisticalDaily();
                    onGetSpendPersonalByGoalStatistical();
                    onGetIncomePersonalByGoalStatistical();
                });
            },
        });

        stompClient.activate();

        return () => {
            stompClient.deactivate();
        };
    }, [tokenString]);

    const handleSendMessage = async () => {
        try {
            await chatService.AddChatTeam(
                String(1),
                String(id),
                {
                    question: messages
                },
                async () => {
                    // setTimeout(async () => {
                    //     setMessages("");
                    //     await onGetChatBoxAsync();
                    // }, 10);
                    setMessages("");
                },
                // setLoadingBot
                () => { }
            ).then(() => {
            });
        }
        catch (error) {
            console.error(error);
        }
    };
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
                            <p className="text-[#40BB15] font-semibold text-[28px]">{detailGoal?.name}</p>
                            <p className="text-[24px] font-semibold">VND:{formatCurrencyVND(detailGoal?.goalAmount)}</p>
                        </div>

                        {/* Danh sách ví */}
                        <div className="flex items-center justify-between bg-[#f1f1f1] p-4 rounded-lg shadow">
                            <div className="flex flex-col gap-2">
                                <p className="text-[20px] font-semibold text-[#212121]">{detailGoal?.user?.username} </p>
                                <p className="text-[16Fpx] text-[#303030]">Mục tiêu đã đạt được: {formatCurrencyVND(detailGoal?.currentAmount)}</p>
                                <p className="text-[16Fpx] text-[#303030]">Thời hạn: {detailGoal?.startDate} - {detailGoal?.endDate} </p>
                            </div>
                            <RoundChartMiniCommon
                                completed={Number(((detailGoal?.currentAmount / detailGoal?.goalAmount) * 100).toFixed(2))}
                                total={100}
                            />
                        </div>

                        {/* Thẻ số dư */}
                        <div className="flex items-center justify-between bg-gradient-to-r from-blue-100 to-blue-50 p-6 rounded-lg shadow ">
                            <div>
                                <p className="text-[#212121] font-medium">Tổng chi tiêu hôm nay</p>
                                <p className="text-red-500 text-2xl font-bold">VND {formatCurrencyVND(dailySpend)} 😟</p>
                            </div>
                            <div className="text-gray-500 text-2xl">ℹ️</div>
                        </div>

                        {/* Bộ lọc thời gian */}
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

                        {/* Thông tin thu chi */}
                        <div className="flex items-center justify-between ">
                            <div className="text-center">
                                <p className="text-red-500 font-semibold">Chi phí</p>
                                <p className="text-[#212121] text-xl font-bold">VND {formatCurrencyVND(spendStatistics.totalSpend)}</p>
                            </div>
                            <div className="text-center">
                                <p className="text-green-500 font-semibold">Thu nhập</p>
                                <p className="text-[#212121] text-xl font-bold">VND {formatCurrencyVND(incomeStatistics.totalInCome)}</p>
                            </div>
                        </div>

                        {/* Tabs chi phí / thu nhập */}
                        <div className="flex justify-center space-x-4 mb-6">
                            <button
                                className={`px-6 py-3 rounded-lg font-semibold ${selectedTab === "spend" ? "bg-[#40BB15] text-white" : "bg-[#cfcfcf] text-[#303030]"
                                    }`}
                                onClick={() => setSelectedTab("spend")}
                            >
                                Chi phí
                            </button>
                            <button
                                className={`px-6 py-3 rounded-lg font-semibold ${selectedTab === "income" ? "bg-[#40BB15] text-white" : "bg-[#cfcfcf] text-[#303030]"
                                    }`}
                                onClick={() => setSelectedTab("income")}
                            >
                                Thu nhập
                            </button>
                        </div>

                        {/* Biểu đồ tròn */}
                        <div className="w-72 h-72">
                            <Pie data={selectedTab === "spend" ? spendData : incomeData} />
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
            <FullPageLoading isLoading={false} />
        </LayoutClient >
    );
};

export default TeamFinancePage;
