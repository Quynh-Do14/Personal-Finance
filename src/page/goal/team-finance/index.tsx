import React, { useEffect, useState } from "react";
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
import { useLocation, useParams } from "react-router-dom";
import { FullPageLoading } from "../../../infrastructure/common/components/controls/loading";
import chatService from "../../../infrastructure/repositories/chat/chat.service";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import TimeFilter from "../../../infrastructure/common/components/time-filter/TimeFilter";
import BannerCommon from "../../../infrastructure/common/components/banner/BannerCommon";
import { Col, Row } from "antd";
import StaticComponent from "../common/static";
import { ButtonDesign } from "../../../infrastructure/common/components/button/buttonDesign";
import OverviewComponent from "../common/overview";
import BarChartStatic from "../common/barChart";
import { getTokenStoraged } from "../../../infrastructure/utils/storage";
import staticService from "../../../infrastructure/repositories/static/static.service";
import PieChart from "../common/pieChart";

ChartJS.register(ArcElement, Tooltip, Legend);

const TeamFinancePage = () => {
    const tokenString = getTokenStoraged();

    const { id } = useParams();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const idTeam = queryParams.get("idTeam");
    const [loading, setLoading] = useState(false);
    const [loadingBot, setLoadingBot] = useState(false);

    const [isOpenChatBox, setIsOpenChatBox] = useState<boolean>(false);
    const [detailGoal, setDetailGoal] = useState<any>({});
    const [dataChatBox, setDataChatBox] = useState<any[]>([]);
    const [messages, setMessages] = useState<string>("");
    const [imageBill, setImageBill] = useState<any>();
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
    const [barChartData, setBarChartData] = useState<any>({
        labels: [],
        datasets: [{ data: [], backgroundColor: ["#FF6384"] }],
    });
    const onGetDetailGoalAsync = async () => {
        console.log("vào");
        try {
            await goalService.GoalTeamById(
                Number(id),
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
            await chatService.GetChatTeam(
                String(id),
                () => {
                    onGetDetailGoalAsync()
                }
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
            await staticService.TeamStatisticalByGoal(
                String(id),
                "",
                "",
                "",
                "daily",
                setLoading
            ).then((res) => {
                setDailySpend(res.incomeStatistics.totalInCome - res.spendStatistics.totalSpend);
                setBarChartData({
                    labels: ["Thu nhập", "Chi tiêu"],
                    datasets: [{
                        data: [
                            res.incomeStatistics.totalInCome,
                            res.spendStatistics.totalSpend
                        ],
                        backgroundColor: ["#2483DD", "#E14C76"]
                    }],
                })
            })
        }
        catch (error) {
            console.error(error);
        }
    };

    const generateColors = (length: number) => {
        const colors = [
            "#FFC371", // Cam nhẹ (tươi tắn)
            "#A88BEB", // Tím pastel (hài hòa với hồng)
            "#FF69B4", // Hồng tươi (hot pink)
            "#F4EAD5",  // Be nhạt (làm nền cực dịu)
            "#607D8B", // Xám xanh (trung tính)
        ];
        return Array.from({ length }, (_, i) => colors[i % colors.length]); // Lặp lại màu nếu thiếu
    };

    const onGetSpendTeamByGoalStatistical = async () => {
        setLoading(true);
        try {
            const res = await staticService.TeamStatisticalByGoal(
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
            const res = await staticService.TeamStatisticalByGoal(
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
        onGetDetailGoalAsync().then(_ => { });
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
                    onGetDetailGoalAsync();
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

    const upLoadBillAsync = async () => {
        try {
            await chatService.GetBillPersonal(
                String(id),
                {
                    question: messages
                },
                () => { },
            ).then(() => {
            });
        }
        catch (error) {
            console.error(error);
        }
    }
    return (
        <LayoutClient>
            <BannerCommon title={"Quỹ nhóm"} sub={"Tài chính"} />
            <div className="goal-container padding-common">
                <div className="flex flex-col gap-6 overflow-hidden">
                    <Row gutter={[20, 20]}>
                        <Col sm={24} md={14} lg={16}>
                            <BarChartStatic
                                barChartData={barChartData}
                            />
                        </Col>
                        <Col sm={24} md={10} lg={8}>
                            <OverviewComponent
                                detailGoal={detailGoal}
                                dailySpend={dailySpend}
                                incomeStatistics={incomeStatistics}
                                spendStatistics={spendStatistics}
                                barChartData={barChartData}
                            />
                        </Col>
                        <Col sm={24} md={14} lg={16}>
                            <StaticComponent
                                selectedTab={selectedTab}
                                dataTable={dataTable}

                                spendStatistics={spendStatistics}
                                incomeStatistics={incomeStatistics}
                                setTimeRange={setTimeRange}
                                setStartDate={setStartDate}
                                setEndDate={setEndDate}
                                startDate={startDate}
                                endDate={endDate}
                                onGetSpendPersonalByGoalStatistical={onGetSpendTeamByGoalStatistical}
                                onGetIncomePersonalByGoalStatistical={onGetIncomeTeamByGoalStatistical}
                                setSelectedTab={setSelectedTab}
                            />
                        </Col>
                        <Col sm={24} md={10} lg={8}>
                            <PieChart
                                selectedTab={selectedTab}
                                spendData={spendData}
                                incomeData={incomeData}
                            />
                        </Col>
                    </Row>
                    <ChatButton
                        titleChat={detailGoal.name}
                        isOpenChatBox={isOpenChatBox}
                        setIsOpenChatBox={setIsOpenChatBox}
                        dataChatBox={dataChatBox}
                        handleSendMessage={handleSendMessage}
                        messages={messages}
                        setMessages={setMessages}
                        idGoal={String(id)}
                        idTeam={String(idTeam)}
                        loading={loadingBot}
                        setLoading={setLoadingBot}
                    />
                </div>
            </div>
            <FullPageLoading isLoading={false} />
        </LayoutClient >
    );
};

export default TeamFinancePage;
