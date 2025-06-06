import { useEffect, useState } from "react";
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
import chatService from "../../../infrastructure/repositories/chat/chat.service";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import BannerCommon from "../../../infrastructure/common/components/banner/BannerCommon";
import StaticComponent from "../common/static";
import OverviewComponent from "../common/overview";
import { Col, Row } from "antd";
import BarChartStatic from "../common/barChart";
import { getTokenStoraged } from "../../../infrastructure/utils/storage";
import staticService from "../../../infrastructure/repositories/static/static.service";
import PieChart from "../common/pieChart";
import AlertBudget from "../../../infrastructure/common/components/budget/alert-budget";
import banner2 from '../../../assets/images/banner/banner2.png'
import OpenChatBot from "../../chat/openChat";

ChartJS.register(ArcElement, Tooltip, Legend);

const PersonalFinancePage = () => {
    const accessToken = getTokenStoraged();

    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [loadingBot, setLoadingBot] = useState(false);

    const [isOpenChatBox, setIsOpenChatBox] = useState<boolean>(false);

    const [detailGoal, setDetailGoal] = useState<any>({});
    const [dataChatBox, setDataChatBox] = useState<any[]>([]);
    const [messages, setMessages] = useState<string>("");
    const [messagesLoading, setMessagesLoading] = useState<string>("");

    const [dailySpend, setDailySpend] = useState<any>();
    const [spendStatistics, setSpendStatistics] = useState<any>({});
    const [incomeStatistics, setIncomeStatistics] = useState<any>({});
    const [statisticsByTime, setStatisticsByTime] = useState<any>({
        labels: [],
        datasets: [{ data: [], backgroundColor: "" }],
    });

    const [endDate, setEndDate] = useState<string>("");
    const [startDate, setStartDate] = useState<string>("");
    const [timeRange, setTimeRange] = useState<string>("daily");
    const [selectedTab, setSelectedTab] = useState<"spend" | "income">("income");
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
    const [barChartData, setBarChartData] = useState<any>({
        labels: [],
        datasets: [{ data: [], backgroundColor: [] }],
    });

    const onGetDetailGoalAsync = async () => {
        try {
            await goalService.GoalPersonalById(
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
            await staticService.PersonalStatisticalByGoal(
                String(id),
                "",
                "",
                "daily",
                () => { }
            ).then((res) => {
                setDailySpend(res.incomeStatistics.totalInCome - res.spendStatistics.totalSpend);
                setBarChartData({
                    labels: ["Thu nhập", "Chi tiêu"],
                    datasets: [{
                        data: [
                            res.incomeStatistics.totalInCome,
                            res.spendStatistics.totalSpend
                        ],
                        backgroundColor: ["#2483DD", "#E14C76"],
                        borderRadius: 8
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


    const onGetStaticByTimeAsync = async () => {
        try {
            await staticService.getStatisticalByTime(
                String(id),
                "week",
                setLoading
            ).then((res) => {
                const labels = res?.map((item: any) => item?.dayOfWeek);
                const dataIncome = res?.map((item: any) => item.totalIncome || 0);
                const dataSpend = res?.map((item: any) => item.totalSpend || 0);
                
                setStatisticsByTime({
                    labels: labels,
                    datasets: [
                        {
                            label: 'Thu',
                            data: dataIncome,
                            backgroundColor: "#006699",
                            barThickness: 20,
                            borderRadius: 10,
                            categoryPercentage: 0.5,
                            barPercentage: 0.8,
                        },
                        {
                            label: 'Chi',
                            data: dataSpend,
                            backgroundColor: "#006633",
                            barThickness: 20,
                            borderRadius: 10,
                            categoryPercentage: 0.5,
                            barPercentage: 0.8,
                        },
                    ],
                });
            })
        }
        catch (error) {
            console.error(error);
        }
    };


    const onGetSpendPersonalByGoalStatistical = async () => {
        setLoading(true);
        try {
            const res = await staticService.PersonalStatisticalByGoal(
                String(id),
                endDate,
                startDate,
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
            const res = await staticService.PersonalStatisticalByGoal(
                String(id),
                endDate,
                startDate,
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
        onGetStaticByTimeAsync().then(_ => { });
    }, [timeRange]);

    useEffect(() => {
        // Lấy JWT từ localStorage hoặc sessionStorage
        const token = accessToken ? accessToken : null;
        const baseUrl = process.env.REACT_APP_BASE_URL;

        const wsBaseUrl = process.env.REACT_APP_BASE_URL?.replace('/api/v1/hdkt', '');
        const socket = new SockJS(`${wsBaseUrl}/ws?token=${token}`);

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
                    onGetStaticByTimeAsync().then(_ => { });
                });
            },
        });

        stompClient.activate();

        return () => {
            stompClient.deactivate();
        };
    }, [accessToken]);

    const handleSendMessage = async () => {
        if (messages) {
            setMessages("");
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
                        setMessagesLoading("")
                    },
                    setLoadingBot
                ).then(() => {
                });
            }
            catch (error) {
                console.error(error);
            }
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
            <BannerCommon
                title={"Tài chính cá nhân"}
                sub={"Tài chính"}
                backgroundUrl={banner2}
            />
            <div className="goal-container padding-common">
                <div className="flex flex-col gap-6 overflow-hidden">
                    <Row gutter={[20, 20]}>
                        <Col sm={24} md={14} lg={16}>
                            <AlertBudget />
                        </Col>
                        <Col sm={24} md={10} lg={8}>
                            <OpenChatBot
                                titleChat={detailGoal.name}
                                isOpenChatBox={isOpenChatBox}
                                setIsOpenChatBox={setIsOpenChatBox}
                                dataChatBox={dataChatBox}
                                handleSendMessage={handleSendMessage}
                                messagesLoading={messagesLoading}
                                setMessagesLoading={setMessagesLoading}
                                messages={messages}
                                setMessages={setMessages}
                                idGoal={String(id)}
                                loading={loadingBot}
                                setLoading={setLoadingBot}
                            />
                        </Col>
                        <Col sm={24} md={14} lg={16}>
                            <BarChartStatic
                                statisticsByTime={statisticsByTime}
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
                                onGetSpendPersonalByGoalStatistical={onGetSpendPersonalByGoalStatistical}
                                onGetIncomePersonalByGoalStatistical={onGetIncomePersonalByGoalStatistical}
                                setSelectedTab={setSelectedTab}
                                selectedType={"type"}
                                setSelectedType={() => { }}
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
                        messagesLoading={messagesLoading}
                        setMessagesLoading={setMessagesLoading}
                        messages={messages}
                        setMessages={setMessages}
                        idGoal={String(id)}
                        loading={loadingBot}
                        setLoading={setLoadingBot}
                    />
                </div>
            </div>
            {/* <FullPageLoading isLoading={loading} /> */}
        </LayoutClient >
    );
};

export default PersonalFinancePage;
