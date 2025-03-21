import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";
import "../../../assets/styles/page/goal.css"
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
import BannerCommon from "../../../infrastructure/common/components/banner/BannerCommon";
import { ButtonCommon } from "../../../infrastructure/common/components/button/button-common";
import { Col, Row } from "antd";
import happy from "../../../assets/images/happy.gif";
import sad from "../../../assets/images/sad.gif";
import robot from "../../../assets/images/robot.gif";
import AnimatedNumber from "../../../infrastructure/common/components/controls/AnimatedNumber";
import StaticComponent from "../common/static";
import { ButtonSimpleCommon } from "../../../infrastructure/common/components/button/buttom-simple-common";

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
    const [selectedTab, setSelectedTab] = useState<"spend" | "income">("income");
    const [selectedType, setSelectedType] = useState<"type" | "">("type");

    const [dataTable, setDataTable] = useState<any[]>([]);
    const [dataTableMember, setDataTableMember] = useState<any[]>([]);
    const [spendDataTable, setSpendDataTable] = useState<any[]>([]);

    const [spendMemberDataTable, setSpendMemberDataTable] = useState<any[]>([]);
    const [spendData, setSpendData] = useState({
        labels: [],
        datasets: [{ data: [], backgroundColor: ["#FF6384"] }],
    });

    const [incomeMemberDataTable, setIncomeMemberDataTable] = useState<any[]>([]);
    const [incomeDataTable, setIncomeDataTable] = useState<any[]>([]);
    const [incomeData, setIncomeData] = useState({
        labels: [],
        datasets: [{ data: [], backgroundColor: ["#36A2EB"] }],
    });

    // const onGetDetailGoalAsync = async () => {
    //     try {
    //         await goalService.GoalTeamById(
    //             Number(id),
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
                () => { }
            ).then((res) => {
                setDataChatBox(res);
            })
        }
        catch (error) {
            console.error(error);
        }
    };

    const onGetSpendTeamByGoalStatisticalDaily = async () => {
        try {
            await spendService.TeamStatisticalByGoal(
                String(id),
                "",
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

    const onGetSpendTeamByGoalStatistical = async () => {
        setLoading(true);
        try {
            const res = await spendService.TeamStatisticalByGoal(
                String(id),
                selectedType,
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

    const onGetIncomeTeamByGoalStatistical = async () => {
        setLoading(true);
        try {
            const res = await spendService.TeamStatisticalByGoal(
                String(id),
                selectedType,
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
        // onGetDetailGoalAsync().then(_ => { });
        onGetChatBoxAsync().then(_ => { });
        onGetSpendTeamByGoalStatisticalDaily().then(_ => { });
        onGetSpendTeamByGoalStatistical().then(_ => { });
        onGetIncomeTeamByGoalStatistical().then(_ => { });
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
                    onGetSpendTeamByGoalStatisticalDaily();
                    onGetSpendTeamByGoalStatistical();
                    onGetIncomeTeamByGoalStatistical();
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
                String(id),
                {
                    question: messages
                },
                async () => {
                    // setTimeout(async () => {
                    //     setMessages("");
                    //     await onGetChatBoxAsync();
                    // }, 10);
                    await onGetChatBoxAsync();
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

    return (
        <LayoutClient>
            <BannerCommon />
            <div className="goal-container padding-common">
                <div className="bg-[#FFF] flex flex-col gap-6 overflow-hidden">
                    {/* Danh sách ví */}
                    <div className="overview">
                        <div className="content">
                            <div className="flex flex-col gap-2">
                                <p className="title">{detailGoal.name} </p>
                                <p className="sub">Mục tiêu: {formatCurrencyVND(detailGoal.goalAmount)}</p>
                                <p className="sub">Số tiền đã đã đạt được: {formatCurrencyVND(detailGoal.currentAmount)}</p>
                                <p className="sub">Thời hạn: {detailGoal.startDate} - {detailGoal.endDate} </p>
                            </div>
                            <RoundChartMiniCommon
                                completed={Number(((detailGoal.currentAmount / detailGoal.goalAmount) * 100).toFixed(2))}
                                total={100}
                            />
                        </div>
                        <img src={robot} alt="" width={160} />
                    </div>

                    {/* Thẻ số dư */}
                    <div className="info">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="title">Tổng chi tiêu hôm nay</p>
                                <p className={`${dailySpend >= 0 ? "text-[#1d9b5e]" : "text-[#e05349]"} sum`}>
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

                        <div className="more">
                            <div className="text-left text-[#e05349]">
                                <p className="">Chi phí</p>
                                <p className=""><i className="fa fa-caret-down" aria-hidden="true"></i>{spendStatistics.totalSpend && <AnimatedNumber value={spendStatistics.totalSpend} />}</p>
                            </div>
                            <div className="text-right text-[#1d9b5e]">
                                <p className="">Thu nhập</p>
                                <p className=""><i className="fa fa-caret-up" aria-hidden="true"></i>{incomeStatistics.totalInCome && <AnimatedNumber value={incomeStatistics.totalInCome} />}</p>
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
                            onGetSpendTeamByGoalStatistical();
                            onGetIncomeTeamByGoalStatistical();
                        }}
                    />

                    {/* Tabs chi phí / thu nhập */}
                    <div className="flex justify-center gap-4 mb-6">
                        <ButtonSimpleCommon
                            classColor={selectedTab === "income" ? "green" : "white"}
                            onClick={() => setSelectedTab("income")}
                            title={"Thu nhập"}
                        />
                        <ButtonSimpleCommon
                            classColor={selectedTab === "spend" ? "green" : "white"}
                            onClick={() => setSelectedTab("spend")}
                            title={"Chi phí"}
                        />
                    </div>
                    {/* Thông tin thu chi */}
                    <StaticComponent
                        selectedTab={selectedTab}
                        dataTable={dataTable}
                        spendData={spendData}
                        incomeData={incomeData}
                        spendStatistics={spendStatistics}
                        incomeStatistics={incomeStatistics}
                    />
                    <ChatButton
                        titleChat={detailGoal.name}
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
            <FullPageLoading isLoading={false} />
        </LayoutClient >
    );
};

export default TeamFinancePage;
