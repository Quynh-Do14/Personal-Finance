import React, { useEffect, useState } from "react";
import LayoutClient from "../../infrastructure/common/Layouts/Client-Layout";
import goalService from "../../infrastructure/repositories/goal/goal.service";
import { FullPageLoading } from "../../infrastructure/common/components/controls/loading";
import { Link } from "react-router-dom";
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
import AlertBudget from "../../infrastructure/common/components/alert/alert-budget";
import ChatBotInfo from "./common/chatInfo";
import { PaginationNoSizeCommon } from "../../infrastructure/common/components/pagination/PaginationNoSize";
import DialogConfirmCommon from "../../infrastructure/common/components/modal/dialogConfirm";
import banner2 from '../../assets/images/banner/banner2.png'

const GoalSpendingPage = () => {
    const [listGoal, setListGoal] = useState<Array<any>>([]);
    const [page, setPage] = useState<number>(1);
    const [total, setTotal] = useState<number>(0);

    const [newlistGoal, setNewListGoal] = useState<Array<any>>([]);

    const [listSpendingType, setListSpendingType] = useState<Array<any>>([]);
    const [listIncomeType, setListIncomeType] = useState<Array<any>>([]);

    const [listType, setListType] = useState<Array<any>>([]);

    const [selectedTab, setSelectedTab] = useState<"spend" | "income">("income");
    const [selectedId, setSelectedId] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [isOpenModalCreate, setIsOpenModalCreate] = useState<boolean>(false);
    const [isOpenModalCreateCategory, setIsOpenModalCreateCategory] = useState<boolean>(false);
    const [isOpenDrawerCategory, setIsOpenDrawerCategory] = useState<boolean>(false);
    const [isOpenModalDelete, setIsOpenModalDelete] = useState<boolean>(false);
    const [selectedGoalId, setSelectedGoalId] = useState<string>("");
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
    const pageSize = 6
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
        await setSubmittedTimeCategory(new Date());
        if (isValidDataCategory()) {
            if (selectedTab == 'spend') {
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
            else if (selectedTab == "income") {
                await setSubmittedTime(new Date());
                if (isValidData()) {
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
        }
        else if (selectedTab == "income") {
            await setSubmittedTime(new Date());
            if (isValidData()) {
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

    const listAction = (item: any) => {
        return (
            <Menu className='action-admin'>
                < Menu.Item className='info-admin'>
                    <a href={`/goal-spending/personal-finance/${item.id}`}>
                        <div className='info-admin-title px-1 py-2 flex items-center'>
                            <i className="fa fa-users" aria-hidden="true"></i>
                            Xem mục tiêu
                        </div>
                    </a>
                </Menu.Item>
                <Menu.Item className='info-admin' onClick={() => onOpenModalDelete(item.id)}>
                    <div className='info-admin-title px-1 py-2 flex items-center' >
                        <i className='fa fa-trash' aria-hidden='true'></i>
                        Xóa mục tiêu
                    </div>
                </Menu.Item>
            </Menu >
        )
    };

    return (
        <LayoutClient>
            <div className="personal-finance-container">
                <BannerCommon
                    title={"Tài chính cá nhân"}
                    sub={"Tài chính"}
                    backgroundUrl={banner2}
                />
                <div className="padding-common">
                    <Row gutter={[20, 20]}>
                        <Col xs={24} sm={24} md={10} lg={8} xxl={6}>
                            <ChatBotInfo />
                        </Col>
                        <Col xs={24} sm={24} md={14} lg={16} xxl={18}>
                            <AlertBudget />
                        </Col>
                        <Col xs={24} sm={24} md={10} lg={8} xxl={6}>
                            <div className="category">
                                <div className="flex flex-col gap-4">
                                    <h2 className="text-xl font-bold text-left text-gray-800">Danh sách danh mục</h2>
                                    <div className="flex justify-center gap-4">
                                        <ButtonDesign
                                            classColor={selectedTab === "income" ? "green" : "transparent"}
                                            onClick={() => setSelectedTab("income")}
                                            title={"Thu nhập"}
                                        />
                                        <ButtonDesign
                                            classColor={selectedTab === "spend" ? "green" : "transparent"}
                                            onClick={() => setSelectedTab("spend")}
                                            title={"Chi phí"}
                                        />
                                    </div>
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
                                <ButtonDesign
                                    classColor={'green'}
                                    onClick={() => onOpenModalCreateCategory(null)}
                                    title={'Thêm danh mục'}
                                />
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
                                                        {/* Thông tin mục tiêu */}
                                                        <div className="flex flex-col gap-2">
                                                            <div className="flex gap-2 items-start justify-between">
                                                                <p className="text-[20px] font-semibold text-truncate-2">{goal.name}</p>
                                                                {
                                                                    goal.achieved
                                                                        ?
                                                                        <div className='is-done'>Hoàn thành</div>
                                                                        :
                                                                        <div className='is-not-done'>Chưa đạt</div>
                                                                }
                                                            </div>
                                                            <p className="text-[14px]">Mục tiêu: {formatCurrencyVND(goal.currentAmount)} / {formatCurrencyVND(goal.goalAmount)}</p>
                                                            <p className="text-[14px]">Thời gian: {convertDateOnlyShow(goal.startDate)} - {convertDateOnlyShow(goal.endDate)}</p>
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
                                                    </div>
                                                </Dropdown>
                                            </Col>
                                        );
                                    })}
                                </Row>
                                <ButtonDesign
                                    classColor={'green'}
                                    onClick={onOpenModalCreate}
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
            <FullPageLoading isLoading={loading} />
        </LayoutClient >
    );
};

export default GoalSpendingPage;
