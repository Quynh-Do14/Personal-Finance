import React, { useEffect, useState } from "react";
import LayoutClient from "../../infrastructure/common/Layouts/Client-Layout";
import goalService from "../../infrastructure/repositories/goal/goal.service";
import { FullPageLoading } from "../../infrastructure/common/components/controls/loading";
import { Link } from "react-router-dom";
import { convertDateOnly, formatCurrencyVND } from "../../infrastructure/helper/helper";
import ModalCreateGoal from "./modalCreate";
import '../../assets/styles/page/personalFinance.css'
import { ButtonCommon } from "../../infrastructure/common/components/button/button-common";
import { Col, Row } from "antd";
import Constants from "../../core/common/constants";
import spendingTypeService from "../../infrastructure/repositories/type/spending-type.service";
import incomeTypeService from "../../infrastructure/repositories/type/income-type.service";
import ModalCreateCategory from "./modalCreateCategory";
import BannerCommon from "../../infrastructure/common/components/banner/BannerCommon";
import { ROUTE_PATH } from "../../core/common/appRouter";
import { WarningMessage } from "../../infrastructure/common/components/toast/notificationToast";
import { ButtonSimpleCommon } from "../../infrastructure/common/components/button/buttom-simple-common";

const GoalSpendingPage = () => {
    const [listGoal, setListGoal] = useState<Array<any>>([]);
    const [newlistGoal, setNewListGoal] = useState<Array<any>>([]);

    const [listSpendingType, setListSpendingType] = useState<Array<any>>([]);
    const [listIncomeType, setListIncomeType] = useState<Array<any>>([]);

    const [listType, setListType] = useState<Array<any>>([]);

    const [selectedTab, setSelectedTab] = useState<"spend" | "income">("spend");
    const [selectedId, setSelectedId] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [isOpenModalCreate, setIsOpenModalCreate] = useState<boolean>(false);
    const [isOpenModalCreateCategory, setIsOpenModalCreateCategory] = useState<boolean>(false);
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

        setValidate({ ...validate });

        Object.values(validate).forEach((it: any) => {
            if (it.isError === true) {
                allRequestOK = false;
            }
        });
        return allRequestOK;
    };

    const onGetListGoalAsync = async () => {
        const param = {
            page: 0,
            size: 4,
        }
        try {
            await goalService.GoalPersonal(
                param,
                setLoading
            ).then((res) => {
                setListGoal(res.content)
            })
        }
        catch (error) {
            console.error(error)
        }
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
                        endDate: convertDateOnly(dataRequest.endDate)
                    },
                    () => {
                        onGetListGoalAsync().then(_ => { });
                        onCloseModalCreate();
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

    /////

    useEffect(() => {
        if (selectedId) {
            setDataRequestCategory({
                name: selectedId.name
            })
        };
    }, [selectedId]);

    const onCreateCategoryAsync = async () => {
        await setSubmittedTimeCategory(new Date());
        if (isValidDataCategory()) {
            if (selectedTab == 'spend') {
                try {
                    await spendingTypeService.CreateUser(
                        {
                            name: dataRequestCategory.name,
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
            else if (selectedTab == "income") {
                await setSubmittedTime(new Date());
                if (isValidData()) {
                    try {
                        await incomeTypeService.CreateUser(
                            {
                                name: dataRequestCategory.name,
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
            }
        }
        else {
            WarningMessage("Nhập thiếu thông tin", "Vui lòng nhập đầy đủ thông tin")
        };
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
        }
        else if (selectedTab == "income") {
            await setSubmittedTime(new Date());
            if (isValidData()) {
                try {
                    await incomeTypeService.UpdateUser(
                        Number(selectedId.id),
                        {
                            name: dataRequestCategory.name,
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
        onGetListGoalAsync().then(_ => { });
    }, []);

    return (
        <LayoutClient>
            <div className="personal-finance-container">
                <BannerCommon />
                <div className="padding-common">
                    <Row gutter={[20, 20]}>
                        <Col xs={24} sm={24} md={10} lg={8} xxl={6}>
                            <div className="category">
                                <div className="flex flex-col gap-4">
                                    <h2 className="text-xl font-bold text-left text-gray-800">Danh sách danh mục</h2>
                                    <div className="flex justify-center gap-4">
                                        <ButtonSimpleCommon
                                            classColor={selectedTab === "spend" ? "green" : "white"}
                                            onClick={() => setSelectedTab("spend")}
                                            title={"Chi phí"}
                                        />
                                        <ButtonSimpleCommon
                                            classColor={selectedTab === "income" ? "green" : "white"}
                                            onClick={() => setSelectedTab("income")}
                                            title={"Thu nhập"}
                                        />
                                    </div>
                                    {
                                        listType.map((item, index) => {
                                            return (
                                                <div className="category-item" key={index} onClick={() => onOpenModalCreateCategory(item)}>
                                                    <div className="category-name">
                                                        <div className="icon">
                                                            <i className="fa fa-car" aria-hidden="true"></i>
                                                        </div>
                                                        <p>{item.name} </p>
                                                    </div>
                                                    <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <ButtonCommon
                                    classColor={'green'}
                                    onClick={() => onOpenModalCreateCategory(null)}
                                    isFullWidth={true}
                                    title={'Thêm danh mục'}
                                />
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={14} lg={16} xxl={18}>
                            <div className="target">
                                <Row gutter={[20, 20]} >
                                    <Col span={24}>
                                        <h2 className="text-xl font-bold text-left text-gray-800">Danh sách mục tiêu</h2>
                                    </Col>
                                    {newlistGoal.map((goal, index) => {
                                        const percentage = Math.min((goal.currentAmount / goal.goalAmount) * 100, 100);
                                        return (
                                            <Col xs={24} sm={12} md={24} lg={12}>
                                                <Link to={`/goal-spending/personal-finance/${goal.id}`}
                                                    key={index}
                                                    className="box"
                                                    style={{
                                                        background: `${goal.color.background}`
                                                    }}
                                                >
                                                    {/* Thông tin mục tiêu */}
                                                    <div className="flex flex-col gap-2">
                                                        <div className="flex gap-2 items-center">
                                                            <div className="icon">
                                                                <i className="fa fa-car" aria-hidden="true"></i>
                                                            </div>
                                                            <p className="text-[20px] font-semibold">{goal.name}</p>
                                                        </div>
                                                        <p className="text-[14px]">Mục tiêu: {formatCurrencyVND(goal.currentAmount)} / {formatCurrencyVND(goal.goalAmount)}</p>
                                                        <p className="text-[14px]">Thời gian: {goal.startDate} - {goal.endDate}</p>
                                                    </div>
                                                    {/* Thanh tiến trình */}
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
                                                </Link>
                                            </Col>
                                        );
                                    })}
                                </Row>
                                <ButtonCommon
                                    classColor={'green'}
                                    onClick={onOpenModalCreate}
                                    isFullWidth={true}
                                    title={'Thêm mục tiêu'}
                                />
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
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
            />
            <FullPageLoading isLoading={loading} />
        </LayoutClient >
    );
};

export default GoalSpendingPage;
