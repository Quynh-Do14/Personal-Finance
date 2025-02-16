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
import happy from "../../../assets/images/happy.gif";
import sad from "../../../assets/images/sad.gif";
import robot from "../../../assets/images/robot.gif";

import { Col, Row } from "antd";
import AnimatedNumber from "../../../infrastructure/common/components/controls/AnimatedNumber";

ChartJS.register(ArcElement, Tooltip, Legend);

const PersonalFinancePage = () => {
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
    const [spendDataTable, setSpendDataTable] = useState<any[]>([]);
    const [dataTable, setDataTable] = useState<any[]>([]);
    const [spendData, setSpendData] = useState({
        labels: [],
        datasets: [{ data: [], backgroundColor: ["#FF6384"] }],
    });
    const [incomeDataTable, setIncomeDataTable] = useState<any[]>([]);
    const [incomeData, setIncomeData] = useState({
        labels: [],
        datasets: [{ data: [], backgroundColor: ["#36A2EB"] }],
    });

    const onGetDetailGoalAsync = async () => {
        try {
            await goalService.GoalPersonalById(
                String(id),
                () => { }
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
            await spendService.PersonalStatisticalByGoal(
                String(id),
                "",
                "",
                "daily",
                () => { }
            ).then((res) => {
                setDailySpend(res.incomeStatistics.totalInCome - res.spendStatistics.totalSpend);
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
            const res = await spendService.PersonalStatisticalByGoal(
                String(id),
                startDate,
                endDate,
                timeRange,
                () => { }
            );

            if (!res.spendStatistics || !Array.isArray(res.spendStatistics.spendingTypeAndAmounts)) {
                setSpendData({ labels: [], datasets: [] });
                return;
            }

            const labels = res.spendStatistics.spendingTypeAndAmounts.map((item: any) => item.spendingType?.name || "Unknown");
            const dataValues = res.spendStatistics.spendingTypeAndAmounts.map((item: any) => item.amount || 0);
            const colors = generateColors(labels.length);
            setSpendDataTable(res.spendStatistics.spendingTypeAndAmounts);
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
            const res = await spendService.PersonalStatisticalByGoal(
                String(id),
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
            setIncomeDataTable(res.incomeStatistics.inComeTypeAndAmounts);
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
        onGetDetailGoalAsync().then(_ => { });
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
                // Lắng nghe thông báo từ đích riêng của user
                stompClient.subscribe('/user/queue/chat', () => {
                    onGetDetailGoalAsync();
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
            await chatService.AddChatPersonal(
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
                setLoadingBot
            ).then(() => {
            });
        }
        catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        if (selectedTab === "spend") {
            setDataTable(spendDataTable);
        }
        else {
            setDataTable(incomeDataTable);
        }
    }, [selectedTab, incomeDataTable, spendDataTable]);
    console.log("spendStatistics", spendStatistics, incomeStatistics);

    return (
        <LayoutClient>
            <div className="personal-finance-container">
                <div className="banner">
                    <div className='overlay'></div>
                    <div className="layout text-center bg-cover bg-center py-20">
                    </div>
                </div>
                <div className="personal-finance-container padding-common">
                    <div className="bg-[#FFF] flex flex-col gap-6">
                        {/* Danh sách ví */}
                        <div className="overview">
                            <div className="content flex items-center justify-between p-4 rounded-lg shadow">
                                <div className="flex flex-col gap-2">
                                    <p className="text-[24px] font-semibold text-[#ffffff]">{detailGoal.name} - {detailGoal.user?.username} </p>
                                    <p className="text-[16px] font-light text-[#ffffff]">Mục tiêu: {formatCurrencyVND(detailGoal.goalAmount)}</p>
                                    <p className="text-[16px] font-light text-[#ffffff]">Số tiền đã đã đạt được: {formatCurrencyVND(detailGoal.currentAmount)}</p>
                                    <p className="text-[16px] font-light text-[#ffffff]">Thời hạn: {detailGoal.startDate} - {detailGoal.endDate} </p>
                                </div>
                                <RoundChartMiniCommon
                                    completed={Number(((detailGoal.currentAmount / detailGoal.goalAmount) * 100).toFixed(2))}
                                    total={100}
                                />
                            </div>
                            <img src={robot} alt="" width={160} />
                        </div>

                        {/* Thẻ số dư */}
                        <div className="flex flex-col gap-4 justify-between bg-gradient-to-r from-blue-100 to-blue-50 p-6 rounded-lg shadow">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-[#212121] font-medium">Tổng chi tiêu hôm nay</p>
                                    <p className={`${dailySpend >= 0 ? "text-[#40BB15]" : "text-[#e05349]"} text-2xl font-bold`}>
                                        {dailySpend >= 0 ? <i className="fa fa-caret-up" aria-hidden="true"></i> : <i className="fa fa-caret-down" aria-hidden="true"></i>}
                                        {dailySpend && <AnimatedNumber value={dailySpend} />}
                                    </p>
                                </div>
                                <div >{dailySpend >= 0 ?
                                    <img src={happy} alt="" width={80} />
                                    :
                                    <img src={sad} alt="" width={80} />
                                } </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="text-left text-[#e05349]">
                                    <p className=" font-semibold">Chi phí</p>
                                    <p className="text-xl font-bold"><i className="fa fa-caret-down" aria-hidden="true"></i>{spendStatistics.totalSpend && <AnimatedNumber value={spendStatistics.totalSpend} />}</p>
                                </div>
                                <div className="text-right text-[#40BB15]">
                                    <p className="font-semibold">Thu nhập</p>
                                    <p className="text-xl font-bold"><i className="fa fa-caret-up" aria-hidden="true"></i>{incomeStatistics.totalInCome && <AnimatedNumber value={incomeStatistics.totalInCome} />}</p>
                                </div>
                            </div>
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
                        {/* Thông tin thu chi */}


                        {/* Biểu đồ tròn */}
                        {
                            dataTable.length
                                ?
                                <Row gutter={[40, 20]}>
                                    <Col md={24} lg={8} className="w-full">
                                        <Pie data={selectedTab === "spend" ? spendData : incomeData} />
                                    </Col>
                                    <Col md={24} lg={16} className="overflow-x-auto">
                                        <table className="w-full text-left text-sm font-light text-[#FFF]">
                                            <thead className="bg-[#41bb15ba] text-[#FFF]">
                                                <tr className="text-[16px]">
                                                    <th className="px-6 py-4">Danh mục</th>
                                                    <th className="px-6 py-4">Chi tiêu</th>
                                                    <th className="px-6 py-4">Tỉ lệ</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    dataTable.map((item, index) => {
                                                        const percent = item.amount / (selectedTab === "spend" ? spendStatistics.totalSpend : incomeStatistics.totalInCome)
                                                        return (
                                                            (
                                                                <tr
                                                                    key={index}
                                                                    className={`${index % 2 === 0 ? "bg-[#40BB15]" : "bg-[#41bb15ba]"} hover:bg-[#41bb158c]`}
                                                                >
                                                                    <td className="px-6 py-4 text-[14px] font-semibold text-[#FFF]">{selectedTab === "spend" ? item?.spendingType?.name : item?.inComeType?.name}</td>
                                                                    <td className="px-6 py-4 text-[14px] font-semibold text-[#FFF]">{formatCurrencyVND(item.amount)}</td>
                                                                    <td className="px-6 py-4 text-[14px] font-semibold text-[#FFF]">{Number(percent * 100).toFixed(2)}%</td>
                                                                </tr>
                                                            )
                                                        )
                                                    })}
                                            </tbody>
                                        </table>
                                    </Col>
                                </Row>
                                :
                                <div className="text-center font-semibold text-md text-[#242424]">Chưa có dữ liệu chi tiêu !!!</div>
                        }

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

export default PersonalFinancePage;
