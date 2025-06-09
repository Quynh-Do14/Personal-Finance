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
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FullPageLoading } from "../../../infrastructure/common/components/controls/loading";
import chatService from "../../../infrastructure/repositories/chat/chat.service";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import BannerCommon from "../../../infrastructure/common/components/banner/BannerCommon";
import { Col, Row } from "antd";
import StaticComponent from "../common/static";
import OverviewComponent from "../common/overview";
import BarChartStatic from "../common/barChart";
import { getTokenStoraged } from "../../../infrastructure/utils/storage";
import staticService from "../../../infrastructure/repositories/static/static.service";
import PieChart from "../common/pieChart";
import AlertBudget from "../../../infrastructure/common/components/budget/alert-budget";
import banner2 from '../../../assets/images/banner/banner2.png'
import OpenChatBot from "../../chat/openChat";
import { ROUTE_PATH } from "../../../core/common/appRouter";
import DialogConfirmCommon from "../../../infrastructure/common/components/modal/dialogConfirm";

ChartJS.register(ArcElement, Tooltip, Legend);

const TeamFinancePage = () => {
    const accessToken = getTokenStoraged();

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
    const [messagesLoading, setMessagesLoading] = useState<string>("");

    const [dailySpend, setDailySpend] = useState<any>();
    const [spendStatistics, setSpendStatistics] = useState<any>({});
    const [incomeStatistics, setIncomeStatistics] = useState<any>({});
    const [endDate, setEndDate] = useState<string>("");
    const [startDate, setStartDate] = useState<string>("");
    const [timeRange, setTimeRange] = useState<string>("daily");
    const [selectedTab, setSelectedTab] = useState<"spend" | "income">("income");
    const [selectedType, setSelectedType] = useState<"type" | "user">("type");
    const [isOpenModalOutDate, setIsOpenModalOutDate] = useState<boolean>(false);

    const [dataTable, setDataTable] = useState<any[]>([]);
    const [dataTableMember, setDataTableMember] = useState<any[]>([]);
    const [spendDataTable, setSpendDataTable] = useState<any[]>([]);

    const [statisticsByTime, setStatisticsByTime] = useState<any>({
        labels: [],
        datasets: [{ data: [], backgroundColor: "" }],
    });

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
    const navigate = useNavigate();

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
                "type",
                "",
                "",
                "daily",
                () => { }
            ).then((res) => {
                setDailySpend(res.incomeStatistics.totalIncome - res.spendStatistics.totalSpend);
                setBarChartData({
                    labels: ["Thu nhập", "Chi tiêu"],
                    datasets: [{
                        data: [
                            res.incomeStatistics.totalIncome,
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

    const onGetStaticByTimeAsync = async () => {
        try {
            await staticService.getStatisticalByTime(
                String(id),
                "week",
                () => { }
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


    const onGetSpendTeamByGoalStatistical = async () => {
        try {
            const res = await staticService.TeamStatisticalByGoal(
                String(id),
                selectedType,
                startDate,
                endDate,
                timeRange,
                () => { }
            );

            // if (!res.spendStatistics || !Array.isArray(res.spendStatistics.spendingTypeAndAmounts)) {
            //     console.warn("No spending data available");
            //     setSpendData({ labels: [], datasets: [] });
            //     return;
            // }
            if (selectedType == "type") {
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
            }
            else if (selectedType == "user") {
                const labels = res.spendStatistics.userAndAmounts.map((item: any) => item.user?.name || "Unknown");
                const dataValues = res.spendStatistics.userAndAmounts.map((item: any) => item.amount || 0);
                const colors = generateColors(labels.length);
                setSpendDataTable(res.spendStatistics.userAndAmounts);
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
            }
        } catch (error) {
            console.error(error);
        } finally {
        }
    };

    const onGetIncomeTeamByGoalStatistical = async () => {
        try {
            const res = await staticService.TeamStatisticalByGoal(
                String(id),
                selectedType,
                startDate,
                endDate,
                timeRange,
                () => { }
            );

            // if (!res.incomeStatistics || !Array.isArray(res.incomeStatistics.incomeTypeAndAmounts)) {
            //     console.warn("No income data available");
            //     setIncomeData({ labels: [], datasets: [] });
            //     return;
            // }
            if (selectedType == "type") {
                const labels = res.incomeStatistics.incomeTypeAndAmounts.map((item: any) => item.incomeType?.name || "Unknown");
                const dataValues = res.incomeStatistics.incomeTypeAndAmounts.map((item: any) => item.amount || 0);
                const colors = generateColors(labels.length);
                setIncomeDataTable(res.incomeStatistics.incomeTypeAndAmounts);
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
            }
            else if (selectedType == "user") {
                const labels = res.incomeStatistics.userAndAmounts.map((item: any) => item.user?.name || "Unknown");
                const dataValues = res.incomeStatistics.userAndAmounts.map((item: any) => item.amount || 0);
                const colors = generateColors(labels.length);
                setIncomeDataTable(res.incomeStatistics.userAndAmounts);
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
            }

        } catch (error) {
            console.error(error);
        } finally {
        }
    };

    useEffect(() => {
        onGetDetailGoalAsync().then(_ => { });
        onGetChatBoxAsync().then(_ => { });
        onGetSpendTeamByGoalStatisticalDaily().then(_ => { });
        onGetStaticByTimeAsync().then(_ => { });
    }, [timeRange]);

    useEffect(() => {
        onGetSpendTeamByGoalStatistical().then(_ => { });
        onGetIncomeTeamByGoalStatistical().then(_ => { });
    }, [timeRange, selectedType, selectedTab])
    useEffect(() => {
        // Lấy JWT từ localStorage hoặc sessionStorage
        const token = accessToken ? accessToken : null;
        const baseUrl = process.env.REACT_APP_BASE_URL;

        const wsBaseUrl = process.env.REACT_APP_BASE_URL?.replace('/hdkt', '');
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
                console.log('Connected: ' + frame);

                // Lắng nghe thông báo từ đích riêng của user
                stompClient.subscribe('/user/queue/chat', () => {
                    onGetDetailGoalAsync().then(_ => { });
                    onGetChatBoxAsync().then(_ => { });
                    onGetSpendTeamByGoalStatisticalDaily().then(_ => { });
                    onGetSpendTeamByGoalStatistical().then(_ => { });
                    onGetIncomeTeamByGoalStatistical().then(_ => { });
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
                await chatService.AddChatTeam(
                    String(id),
                    {
                        question: messages
                    },
                    async () => {

                    },
                    setLoadingBot,
                    () => {
                        setIsOpenModalOutDate(false)
                    }
                ).then(() => { });
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

    ///
    const onCloseModalOutDate = () => {
        setIsOpenModalOutDate(false)
    }

    const onRedirectModalOutDate = () => {
        setIsOpenModalOutDate(false)
        navigate(ROUTE_PATH.PAYMENT_INFO)
    }
    ///

    return (
        <LayoutClient>
            <BannerCommon
                title={"Quỹ nhóm"}
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
                                onGetSpendPersonalByGoalStatistical={onGetSpendTeamByGoalStatistical}
                                onGetIncomePersonalByGoalStatistical={onGetIncomeTeamByGoalStatistical}
                                setSelectedTab={setSelectedTab}
                                isType={true}
                                selectedType={selectedType}
                                setSelectedType={setSelectedType}
                                goadId={String(id)}
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
                        idTeam={String(idTeam)}
                        loading={loadingBot}
                        setLoading={setLoadingBot}
                    />
                    <DialogConfirmCommon
                        message={"Nâng cấp tài khoản để sử dụng nhiều tính năng hơn"}
                        titleCancel={"Bỏ qua"}
                        titleOk={"Nâng cấp"}
                        visible={isOpenModalOutDate}
                        handleCancel={onCloseModalOutDate}
                        handleOk={onRedirectModalOutDate}
                        title={"Số lần chat của bạn đã hết"}
                    />
                </div>
            </div>
            <FullPageLoading isLoading={loading} />
        </LayoutClient >
    );
};

export default TeamFinancePage;
