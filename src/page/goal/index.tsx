import { useEffect, useState } from "react";
import LayoutClient from "../../infrastructure/common/Layouts/Client-Layout";
import goalService from "../../infrastructure/repositories/goal/goal.service";
import { FullPageLoading } from "../../infrastructure/common/components/controls/loading";
import { configImageURL, convertDateOnly, convertDateOnlyShow, formatCurrencyVND } from "../../infrastructure/helper/helper";
import ModalCreateGoal from "./modal/modalCreate";
import '../../assets/styles/page/personalFinance.css'
import { Col, Dropdown, Menu, Row } from "antd";
import Constants from "../../core/common/constants";
import spendingTypeService from "../../infrastructure/repositories/type/spending-type.service";
import incomeTypeService from "../../infrastructure/repositories/type/income-type.service";
import ModalCreateCategory from "./modal/modalCreateCategory";
import BannerCommon from "../../infrastructure/common/components/banner/BannerCommon";
import { WarningMessage } from "../../infrastructure/common/components/toast/notificationToast";
import DrawerSelectCategory from "./common/drawerSelectCategory";
import { ButtonDesign } from "../../infrastructure/common/components/button/buttonDesign";
import AlertBudget from "../../infrastructure/common/components/budget/alert-budget";
import ChatBotInfo from "./common/chatInfo";
import { PaginationNoSizeCommon } from "../../infrastructure/common/components/pagination/PaginationNoSize";
import DialogConfirmCommon from "../../infrastructure/common/components/modal/dialogConfirm";
import banner2 from '../../assets/images/banner/banner2.png'
import BudgetInfo from "../../infrastructure/common/components/budget/budget-info.";
import chatService from "../../infrastructure/repositories/chat/chat.service";
import ChatButton from "../chat/buttonChat";
import { getTokenStoraged } from "../../infrastructure/utils/storage";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import PieChart from "./common/pieChart";
import ModalAllocation from "./modal/modalAllocation";
import staticService from "../../infrastructure/repositories/static/static.service";
import StaticComponent from "./common/static";
import BarChartStatic from "./common/barChart";
import OverviewPersonalComponent from "./common/overviewPersonal";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATH } from "../../core/common/appRouter";

const GoalSpendingPage = () => {
    const [listGoal, setListGoal] = useState<Array<any>>([]);
    const [totalGoal, setTotalGoal] = useState<Array<any>>([]);

    const [page, setPage] = useState<number>(1);
    const [total, setTotal] = useState<number>(0);

    const [newlistGoal, setNewListGoal] = useState<Array<any>>([]);

    const [listSpendingType, setListSpendingType] = useState<Array<any>>([]);
    const [listIncomeType, setListIncomeType] = useState<Array<any>>([]);

    const [listType, setListType] = useState<Array<any>>([]);

    const [selectedTab, setSelectedTab] = useState<"spend" | "income">("spend");
    const [selectedId, setSelectedId] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [isOpenModalCreate, setIsOpenModalCreate] = useState<boolean>(false);
    const [isOpenModalCreateCategory, setIsOpenModalCreateCategory] = useState<boolean>(false);
    const [isOpenDrawerCategory, setIsOpenDrawerCategory] = useState<boolean>(false);
    const [isOpenModalDelete, setIsOpenModalDelete] = useState<boolean>(false);
    const [selectedGoalId, setSelectedGoalId] = useState<string>("");
    const [isOpenModalAllocation, setIsOpenModalAllocation] = useState<boolean>(false);
    const [isOpenModalAchive, setIsOpenModalAchive] = useState<boolean>(false);

    ///Chat AI
    const [isOpenChatBox, setIsOpenChatBox] = useState<boolean>(false);
    const [dataChatBox, setDataChatBox] = useState<any[]>([]);
    const [messages, setMessages] = useState<string>("");
    const [messagesLoading, setMessagesLoading] = useState<string>("");
    const [loadingBot, setLoadingBot] = useState(false);
    ///Chat AI

    ///Thống kê
    const [dailyTotal, setDailyTotal] = useState<any>();
    const [dailyIncome, setDailyIncome] = useState<any>();
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
    ///Thống kê

    //
    const [validate, setValidate] = useState<any>({});
    const [submittedTime, setSubmittedTime] = useState<any>();
    const [_dataRequest, _setDataRequest] = useState<any>({});
    const dataRequest = _dataRequest;

    const setDataRequest = (data: any) => {
        Object.assign(dataRequest, { ...data });
        _setDataRequest({ ...dataRequest })
    }
    const isValidData = () => {
        let allRequestOK = true;

        setValidate({ ...validate });

        Object.values(validate).forEach((it: any) => {
            if (it.isError === true) {
                allRequestOK = false;
            }
        });
        return allRequestOK;
    };
    //
    const [isOpenModalOutDate, setIsOpenModalOutDate] = useState<boolean>(false);

    const [validateCategory, setValidateCategory] = useState<any>({});
    const [submittedTimeCategory, setSubmittedTimeCategory] = useState<any>();
    const [_dataRequestCategory, _setDataRequestCategory] = useState<any>({});
    const dataRequestCategory = _dataRequestCategory;

    const setDataRequestCategory = (data: any) => {
        Object.assign(dataRequestCategory, { ...data });
        _setDataRequestCategory({ ...dataRequestCategory })
    }
    const isValidDataCategory = () => {
        let allRequestOK = true;

        setValidateCategory({ ...validateCategory });

        Object.values(validateCategory).forEach((it: any) => {
            if (it.isError === true) {
                allRequestOK = false;
            }
        });
        return allRequestOK;
    };
    const navigate = useNavigate();
    const pageSize = 4
    const onGetListGoalAsync = async () => {
        const param = {
            page: page - 1,
            size: pageSize,
        }
        try {
            await goalService.GoalPersonal(
                param,
                setLoading
            ).then((res) => {
                setListGoal(res.content)
                setTotal(res.page.totalElements)
            })
            await goalService.GoalPersonal(
                {},
                setLoading
            ).then((res) => {
                setTotalGoal(res.content)
            })
        }
        catch (error) {
            console.error(error)
        }
    }

    const onChangePage = (value: any) => {
        setPage(value)
    }

    const onOpenModalCreate = () => {
        setIsOpenModalCreate(!isOpenModalCreate);
    };

    const onCloseModalCreate = () => {
        setIsOpenModalCreate(false);
    }

    const onCreateGoalAsync = async () => {
        await setSubmittedTime(new Date());
        if (isValidData()) {
            try {
                await goalService.AddGoalPersonal(
                    {
                        name: dataRequest.name,
                        goalAmount: dataRequest.goalAmount,
                        startDate: convertDateOnly(dataRequest.startDate),
                        endDate: convertDateOnly(dataRequest.endDate),
                        allocation: dataRequest.allocation,
                    },
                    () => {
                        onGetListGoalAsync().then(_ => { });
                        onCloseModalCreate();
                        setDataRequest({
                            name: "",
                            goalAmount: "",
                            startDate: convertDateOnly(""),
                            endDate: convertDateOnly("")
                        })
                    },
                    setLoading
                ).then(() => { })
            }
            catch (error) {
                console.error(error)
            }
        }
        else {
            WarningMessage("Nhập thiếu thông tin", "Vui lòng nhập đầy đủ thông tin")
        };
    }

    // Danh mục
    const onGetSpendingTypeAsync = async () => {
        try {
            await spendingTypeService.GetUser(
                {},
                () => { }
            ).then((res) => {
                setListSpendingType(res.content);
            })
        }
        catch (error) {
            console.error(error);
        }
    };

    const onGetIncomeTypeAsync = async () => {
        try {
            await incomeTypeService.GetUser(
                {},
                () => { }
            ).then((res) => {
                setListIncomeType(res.content);
            })
        }
        catch (error) {
            console.error(error);
        }
    };
    /////
    const onOpenModalCreateCategory = (id: any) => {
        setSelectedId(id);
        setIsOpenModalCreateCategory(!isOpenModalCreateCategory);
    };


    const onCloseModalCreateCategory = () => {
        setIsOpenModalCreateCategory(false);
    };

    const onCloseDrawerCategory = () => {
        setIsOpenDrawerCategory(false);
    }
    /////

    useEffect(() => {
        if (selectedId) {
            setDataRequestCategory({
                name: selectedId.name,
                imageCode: selectedId.imageCode
            })
        };
    }, [selectedId]);

    const onCreateCategoryAsync = async () => {

        if (selectedTab == 'spend') {
            await setSubmittedTimeCategory(new Date());
            if (isValidDataCategory()) {
                try {
                    await spendingTypeService.CreateUser(
                        {
                            name: dataRequestCategory.name,
                            iconId: dataRequestCategory.iconId || 1
                        },
                        () => {
                            onGetSpendingTypeAsync().then(_ => { });
                            onCloseModalCreateCategory();
                            setDataRequestCategory({
                                name: "",
                                iconId: "",
                                imageCode: ""
                            })
                        },
                        setLoading
                    ).then(() => { })
                }
                catch (error) {
                    console.error(error)
                }
            }
            else {
                WarningMessage("Nhập thiếu thông tin", "Vui lòng nhập đầy đủ thông tin")
            };
        }
        else if (selectedTab == "income") {
            await setSubmittedTimeCategory(new Date());
            if (isValidDataCategory()) {
                try {
                    await incomeTypeService.CreateUser(
                        {
                            name: dataRequestCategory.name,
                            iconId: dataRequestCategory.iconId || 1
                        },
                        () => {
                            onGetIncomeTypeAsync().then(_ => { });
                            onCloseModalCreateCategory();
                            setDataRequestCategory({
                                name: "",
                                iconId: "",
                                imageCode: ""
                            })
                        },
                        setLoading
                    ).then(() => { })
                }
                catch (error) {
                    console.error(error)
                }
            }
            else {
                WarningMessage("Nhập thiếu thông tin", "Vui lòng nhập đầy đủ thông tin")
            };
        }
    }


    const onUpdateCategoryAsync = async () => {
        if (selectedTab == 'spend') {
            await setSubmittedTimeCategory(new Date());
            if (isValidDataCategory()) {
                try {
                    await spendingTypeService.UpdateUser(
                        Number(selectedId.id),
                        {
                            name: dataRequestCategory.name,
                            iconId: dataRequestCategory.iconId || 1
                        },
                        () => {
                            onGetSpendingTypeAsync().then(_ => { });
                            onCloseModalCreateCategory();
                        },
                        setLoading
                    ).then(() => { })
                }
                catch (error) {
                    console.error(error)
                }
            }
            else {
                WarningMessage("Nhập thiếu thông tin", "Vui lòng nhập đầy đủ thông tin")
            };
        }
        else if (selectedTab == "income") {
            await setSubmittedTimeCategory(new Date());
            if (isValidDataCategory()) {
                try {
                    await incomeTypeService.UpdateUser(
                        Number(selectedId.id),
                        {
                            name: dataRequestCategory.name,
                            iconId: dataRequestCategory.iconId || 1
                        },
                        () => {
                            onGetIncomeTypeAsync().then(_ => { });
                            onCloseModalCreateCategory();
                        },
                        setLoading
                    ).then(() => { })
                }
                catch (error) {
                    console.error(error)
                }
            }
            else {
                WarningMessage("Nhập thiếu thông tin", "Vui lòng nhập đầy đủ thông tin")
            };
        }
    }

    const onDeleteCategoryAsync = async () => {
        if (selectedTab == 'spend') {
            try {
                await spendingTypeService.DeleteUser(
                    Number(selectedId.id),
                    () => {
                        onGetSpendingTypeAsync().then(_ => { });
                        onCloseModalCreateCategory();
                    },
                    setLoading
                ).then(() => { })
            }
            catch (error) {
                console.error(error)
            }
        }
        else if (selectedTab == "income") {

            try {
                await incomeTypeService.DeleteUser(
                    Number(selectedId.id),
                    () => {
                        onGetIncomeTypeAsync().then(_ => { });
                        onCloseModalCreateCategory();
                    },
                    setLoading
                ).then(() => { })
            }
            catch (error) {
                console.error(error)
            }
        }
    }
    // Danh mục

    useEffect(() => {
        if (selectedTab === "spend") {
            setListType(listSpendingType);
        }
        else {
            setListType(listIncomeType);
        }
    }, [selectedTab, listSpendingType, listIncomeType]);

    const assignRandomColors = (data: any[], colors: any[]) => {
        return data.map((item, index) => ({
            ...item,
            color: colors[index % colors.length]
        }));
    };
    useEffect(() => {
        const newData = assignRandomColors(listGoal, Constants.RandomColor.List);
        setNewListGoal(newData)
    }, [listGoal]);

    useEffect(() => {
        onGetIncomeTypeAsync().then(_ => { });
        onGetSpendingTypeAsync().then(_ => { });
    }, []);

    useEffect(() => {
        onGetListGoalAsync().then(_ => { });
    }, [page]);

    //Xóa goal
    const onOpenModalDelete = (id: string) => {
        setIsOpenModalDelete(!isOpenModalDelete);
        setSelectedGoalId(id)
    }

    const onCloseModalDelete = () => {
        setIsOpenModalDelete(false);
    }

    const onDeleteGoalAsync = async () => {
        await setSubmittedTime(Date.now());
        if (isValidData()) {
            await goalService.DeleteGoalPersonal(
                selectedGoalId,
                () => {
                    onCloseModalDelete();
                    onGetListGoalAsync().then(_ => { });
                },
                setLoading
            )
        }
        else {
            WarningMessage("Nhập thiếu thông tin", "Vui lòng nhập đầy đủ thông tin")
        };
    }
    //Xóa goal

    //Phân bổ
    const onOpenModalAllocation = () => {
        if (newlistGoal.length > 1) {
            setIsOpenModalAllocation(!isOpenModalAllocation);
        }
        else {
            WarningMessage("Bạn chưa có mục tiêu nào", "Vui lòng thêm mục tiêu")
        }
    }

    const onCloseModalAllocation = () => {
        setIsOpenModalAllocation(false);
    }
    //Phân bổ


    //Hoàn thành
    const onOpenModalAchive = (id: string) => {
        setIsOpenModalAchive(!isOpenModalAchive);
        setSelectedGoalId(id)
    }

    const onCloseModalAchive = () => {
        setIsOpenModalAchive(false);
    }

    const onAchievedGoalAsync = async () => {
        await setSubmittedTime(Date.now());
        try {
            if (isValidData()) {
                await goalService.AchievedGoalPersonal(
                    selectedGoalId,
                    () => {
                        onCloseModalAchive();
                        onGetListGoalAsync().then(_ => { });
                    },
                    setLoading
                )
            }
            else {
                WarningMessage("Nhập thiếu thông tin", "Vui lòng nhập đầy đủ thông tin")
            }
        }
        catch (error) {
            console.error(error);
        }
        finally {
            onCloseModalAchive();
        }
    }
    //Hoàn thành

    //Chat với AI
    const onGetChatBoxAsync = async () => {
        try {
            await chatService.GetChatPersonal(
                String(''),
                () => { }
            ).then((res) => {
                setDataChatBox(res);
            })
        }
        catch (error) {
            console.error(error);
        }
    };
    const handleSendMessage = async () => {
        if (messages) {
            setMessages("");
            try {
                await chatService.AddChatPersonal(
                    String(""),
                    {
                        question: messages
                    },
                    async () => {
                        setMessagesLoading("")
                    },
                    setLoadingBot,
                    () => {
                        setIsOpenModalOutDate(true)
                    }
                ).then(() => {
                });
            }
            catch (error) {
                console.error(error);
            }
        }
    };
    //Chat với AI

    //Thống kê
    const onGetSpendPersonalByGoalStatisticalDaily = async () => {
        try {
            await staticService.PersonalStatisticalByGoal(
                String(""),
                "",
                "",
                "daily",
                () => { }
            ).then((res) => {
                setDailyTotal(res.incomeStatistics.totalIncome - res.spendStatistics.totalSpend);
                setDailyIncome(res.incomeStatistics.totalIncome);
                setDailySpend(res.spendStatistics.totalSpend);

                setBarChartData({
                    labels: ["Thu nhập", "Chi tiêu"],
                    datasets: [{
                        data: [
                            res.incomeStatistics.totalIncome,
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


    const onGetSpendPersonalByGoalStatistical = async () => {
        try {
            const res = await staticService.PersonalStatisticalByGoal(
                String(""),
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
        }
    };

    const onGetIncomePersonalByGoalStatistical = async () => {
        try {
            const res = await staticService.PersonalStatisticalByGoal(
                String(""),
                endDate,
                startDate,
                timeRange,
                () => { }
            );
            if (!res.incomeStatistics || !Array.isArray(res.incomeStatistics.incomeTypeAndAmounts)) {
                console.warn("No income data available");
                setIncomeData({ labels: [], datasets: [] });
                return;
            }

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
        } catch (error) {
            console.error(error);
        } finally {
        }
    };

    const onGetStaticByTimeAsync = async () => {
        try {
            await staticService.getStatisticalByTime(
                String(""),
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

    useEffect(() => {
        if (selectedTab === "spend") {
            setDataTable(spendDataTable);
        }
        else {
            setDataTable(incomeDataTable);
        }
    }, [selectedTab, incomeDataTable, spendDataTable]);

    //Thống kê

    ///Set Realtime
    const accessToken = getTokenStoraged();
    useEffect(() => {
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
                // Lắng nghe thông báo từ đích riêng của user
                stompClient.subscribe('/user/queue/chat', () => {
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
    ///Set Realtime

    const listAction = (item: any) => {
        return (
            <Menu className='action-admin'>
                {/* < Menu.Item className='info-admin'>
                    <a href={`/goal-spending/personal-finance/${item.id}`}>
                        <div className='info-admin-title px-1 py-2 flex items-center'>
                            <i className="fa fa-users" aria-hidden="true"></i>
                            Xem mục tiêu
                        </div>
                    </a>
                </Menu.Item> */}
                <Menu.Item className='info-admin' onClick={() => onOpenModalAchive(item.id)}>
                    <div className='info-admin-title px-1 py-2 flex items-center' >
                        <i className="fa fa-check-square" aria-hidden="true"></i>
                        Hoàn thành mục tiêu
                    </div>
                </Menu.Item>
                {
                    item.startDate
                    &&
                    <Menu.Item className='info-admin' onClick={() => onOpenModalDelete(item.id)}>
                        <div className='info-admin-title px-1 py-2 flex items-center' >
                            <i className='fa fa-trash' aria-hidden='true'></i>
                            Xóa mục tiêu
                        </div>
                    </Menu.Item>
                }

            </Menu >
        )
    };

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
            <div className="personal-finance-container">
                <BannerCommon
                    title={"Tài chính cá nhân"}
                    sub={"Tài chính"}
                    backgroundUrl={banner2}
                />
                <div className="padding-common">
                    <Row gutter={[20, 20]} >
                        <Col xs={24} sm={24} md={10} lg={8} xxl={6}>
                            <ChatBotInfo
                                titleChat={""}
                                isOpenChatBox={isOpenChatBox}
                                setIsOpenChatBox={setIsOpenChatBox}
                                dataChatBox={dataChatBox}
                                handleSendMessage={handleSendMessage}
                                messagesLoading={messagesLoading}
                                setMessagesLoading={setMessagesLoading}
                                messages={messages}
                                setMessages={setMessages}
                                idGoal={String("")}
                                loading={loadingBot}
                                setLoading={setLoadingBot} />

                        </Col>
                        <Col xs={24} sm={24} md={14} lg={8} xxl={8}>
                            <BudgetInfo />
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={8} xxl={10}>
                            <AlertBudget />
                        </Col>

                        <Col xs={24} sm={24} md={10} lg={8} xxl={6}>
                            <div className="category">
                                <div className="flex flex-col gap-4">
                                    <h2 className="text-xl font-bold text-left text-gray-800">Danh sách danh mục</h2>
                                    <div className="flex justify-center gap-4">
                                        <ButtonDesign
                                            classColor={selectedTab === "spend" ? "green" : "transparent"}
                                            onClick={() => setSelectedTab("spend")}
                                            title={"Chi phí"}
                                        />
                                        <ButtonDesign
                                            classColor={selectedTab === "income" ? "green" : "transparent"}
                                            onClick={() => setSelectedTab("income")}
                                            title={"Thu nhập"}
                                        />
                                    </div>
                                    <div className="item-list">
                                        {
                                            listType.map((item, index) => {
                                                return (
                                                    <div className="category-item" key={index} onClick={() => onOpenModalCreateCategory(item)}>
                                                        <div className="category-name">
                                                            <img src={configImageURL(item.imageCode)} alt="" width={40} />
                                                            <p>{item.name} </p>
                                                        </div>
                                                        <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>

                                </div>
                                <div className="flex justify-center gap-2 flex-wrap">
                                    <ButtonDesign
                                        classColor={'green'}
                                        onClick={() => onOpenModalCreateCategory(null)}
                                        title={'Thêm danh mục'}
                                        width={200}
                                    />
                                </div>
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={14} lg={16} xxl={18}>
                            <div className="target">
                                <Row gutter={[20, 20]} >
                                    <Col span={24}>
                                        <div className="flex justify-between w-full gap-2 flex-wrap">
                                            <h2 className="text-xl font-bold text-left text-gray-800">Danh sách mục tiêu</h2>
                                            {
                                                newlistGoal.length
                                                    ?
                                                    <PaginationNoSizeCommon
                                                        total={total}
                                                        currentPage={page}
                                                        onChangePage={onChangePage}
                                                        pageSize={pageSize}
                                                    />
                                                    :
                                                    null
                                            }
                                        </div>
                                    </Col>
                                    {newlistGoal.map((goal, index) => {
                                        const percentage = Math.min((goal.currentAmount / goal.goalAmount) * 100, 100);
                                        return (
                                            <Col xs={24} sm={12} md={24} lg={12}>
                                                <Dropdown overlay={() => listAction(goal)} trigger={['click']}>
                                                    <div
                                                        key={index}
                                                        className="box"
                                                        style={{
                                                            background: `${goal.color.background}`
                                                        }}
                                                    >
                                                        <div className="flex flex-col gap-2">
                                                            <div className="flex gap-2 items-start justify-between">
                                                                <p className="text-[20px] font-semibold text-truncate-2">{goal.name}</p>
                                                                {
                                                                    goal.startDate
                                                                    && (
                                                                        goal.achieved
                                                                            ?
                                                                            <div className='is-done'>Hoàn thành</div>
                                                                            :
                                                                            <div className='is-not-done'>Chưa đạt</div>
                                                                    )
                                                                }
                                                            </div>
                                                            {
                                                                goal.allocationPercentage > 0
                                                                &&
                                                                <p className="text-[14px]">Phân bổ: {goal.allocationPercentage}% thặng dư</p>
                                                            }
                                                            {
                                                                goal.startDate
                                                                    ?
                                                                    <p className="text-[14px]">Mục tiêu: {formatCurrencyVND(goal.currentAmount)} / {formatCurrencyVND(goal.goalAmount)}</p>
                                                                    :
                                                                    <p className="text-[14px]">Đã tiết kiệm: {formatCurrencyVND(goal.currentAmount)}</p>
                                                            }
                                                            {
                                                                goal.startDate
                                                                &&
                                                                <p className="text-[14px]">Thời gian: {convertDateOnlyShow(goal.startDate)} - {convertDateOnlyShow(goal.endDate)}</p>
                                                            }
                                                        </div>
                                                        {
                                                            goal.startDate
                                                                ?
                                                                <div className="w-full">
                                                                    <div className="relative w-full h-2 bg-[#ffffff] rounded-full overflow-hidden">
                                                                        <div
                                                                            style={{
                                                                                background: `${goal.color.line}`,
                                                                                width: `${percentage}%`
                                                                            }}
                                                                            className="absolute top-0 left-0 h-full"
                                                                        ></div>
                                                                    </div>
                                                                    <p className="text-right text-sm text-[#242424] mt-1">
                                                                        {percentage.toFixed(0)}%
                                                                    </p>
                                                                </div>
                                                                :
                                                                <p className="text-[14px]">Quỹ này là nơi lưu trữ phần dư được tích lũy từ thặng dư hàng ngày</p>
                                                        }

                                                    </div>
                                                </Dropdown>
                                            </Col>
                                        );
                                    })}
                                </Row>
                                <div className="flex justify-center gap-2 flex-wrap">
                                    <ButtonDesign
                                        classColor={'green'}
                                        onClick={onOpenModalCreate}
                                        title={'Thêm mục tiêu'}
                                        width={200}
                                    />
                                    <ButtonDesign
                                        classColor={'transparent'}
                                        onClick={onOpenModalAllocation}
                                        title={'Phân bổ mục tiêu'}
                                        width={200}
                                    />
                                </div>
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={10} lg={8}>
                            <OverviewPersonalComponent
                                detailGoal={""}
                                dailyTotal={dailyTotal}
                                dailyIncome={dailyIncome}
                                dailySpend={dailySpend}
                                incomeStatistics={incomeStatistics}
                                spendStatistics={spendStatistics}
                                barChartData={barChartData}
                            />
                        </Col>
                        <Col xs={24} sm={24} md={14} lg={16} className="overflow-auto">
                            <BarChartStatic
                                statisticsByTime={statisticsByTime}
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
                                goadId={""}
                            />
                        </Col>
                        <Col xs={24} sm={24} md={10} lg={8}>
                            <PieChart
                                selectedTab={selectedTab}
                                spendData={spendData}
                                incomeData={incomeData}
                            />
                        </Col>
                    </Row>
                </div>
            </div>
            <ChatButton
                titleChat={""}
                isOpenChatBox={isOpenChatBox}
                setIsOpenChatBox={setIsOpenChatBox}
                dataChatBox={dataChatBox}
                handleSendMessage={handleSendMessage}
                messagesLoading={messagesLoading}
                setMessagesLoading={setMessagesLoading}
                messages={messages}
                setMessages={setMessages}
                idGoal={String("")}
                loading={loadingBot}
                setLoading={setLoadingBot}
            />
            <ModalCreateCategory
                selectedId={selectedId}
                selectedTab={selectedTab}
                handleOk={selectedId ? onUpdateCategoryAsync : onCreateCategoryAsync}
                handleCancel={onCloseModalCreateCategory}
                visible={isOpenModalCreateCategory}
                data={dataRequestCategory}
                setData={setDataRequestCategory}
                validate={validateCategory}
                setValidate={setValidateCategory}
                submittedTime={submittedTimeCategory}
                onDeleteCategoryAsync={onDeleteCategoryAsync}
                setIsOpenDrawerCategory={setIsOpenDrawerCategory}
            />
            <ModalCreateGoal
                handleOk={onCreateGoalAsync}
                handleCancel={onCloseModalCreate}
                visible={isOpenModalCreate}
                data={dataRequest}
                setData={setDataRequest}
                validate={validate}
                setValidate={setValidate}
                submittedTime={submittedTime}
                isPersonal={true}
            />
            <ModalAllocation
                handleCancel={onCloseModalAllocation}
                visible={isOpenModalAllocation}
                newlistGoal={totalGoal}
                onGetListGoalAsync={onGetListGoalAsync}
                setLoading={setLoading}
            />
            <DrawerSelectCategory
                visible={isOpenDrawerCategory}
                data={dataRequestCategory}
                setData={setDataRequestCategory}
                handleCancel={onCloseDrawerCategory}
            />
            <DialogConfirmCommon
                title={"Xóa mục tiêu"}
                message={"Bạn muốn xóa mục tiêu?"}
                titleCancel={"Hủy"}
                titleOk={"Đồng ý"}
                handleOk={onDeleteGoalAsync}
                handleCancel={onCloseModalDelete}
                visible={isOpenModalDelete}
            />
            <DialogConfirmCommon
                title={"Hoàn thành mục tiêu"}
                message={"Bạn muốn hoàn thành mục tiêu?"}
                titleCancel={"Hủy"}
                titleOk={"Đồng ý"}
                handleOk={onAchievedGoalAsync}
                handleCancel={onCloseModalAchive}
                visible={isOpenModalAchive}
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
            <FullPageLoading isLoading={loading} />
        </LayoutClient >
    );
};

export default GoalSpendingPage;