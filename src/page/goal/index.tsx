import React, { useEffect, useState } from "react";
import LayoutClient from "../../infrastructure/common/Layouts/Client-Layout";
import goalService from "../../infrastructure/repositories/goal/goal.service";
import { FullPageLoading } from "../../infrastructure/common/components/controls/loading";
import { Link } from "react-router-dom";
import { convertDateOnly, formatCurrencyVND } from "../../infrastructure/helper/helper";
import ModalCreateGoal from "./modalCreate";

const GoalSpendingPage = () => {
    const [listGoal, setListGoal] = useState<Array<any>>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [isOpenModalCreate, setIsOpenModalCreate] = useState<boolean>(false);

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
    useEffect(() => {
        onGetListGoalAsync().then(_ => { });
    }, [])

    const onOpenModalCreate = () => {
        setIsOpenModalCreate(!isOpenModalCreate)
    }

    const onCloseModalCreate = () => {
        setIsOpenModalCreate(false)
    }
    const onCreateGoalAsync = async () => {
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
            ).then((res) => {
            })
        }
        catch (error) {
            console.error(error)
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
                <div className="padding-common">
                    <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Danh mục mục tiêu</h1>

                    {/* Danh sách mục tiêu */}
                    <div className="space-y-4">
                        {listGoal.map((goal) => {
                            const percentage = Math.min((goal.currentAmount / goal.goalAmount) * 100, 100);
                            return (
                                <Link to={`/personal-finance/${goal.id}`}
                                    key={goal.id}
                                    className="p-4 bg-gray-100 rounded-lg shadow flex flex-col md:flex-row md:items-center justify-between"
                                >
                                    {/* Thông tin mục tiêu */}
                                    <div className="flex flex-col gap-2">
                                        <p className="text-[20px] font-semibold text-[#1d1d1d]">{goal.name}</p>
                                        <p className="text-[14px] text-[#242424]">Số tiền mục tiêu: {formatCurrencyVND(goal.goalAmount)}</p>
                                        <p className="text-[14px] text-[#242424]">Đã đạt được: {formatCurrencyVND(goal.currentAmount)}</p>
                                        <p className="text-[14px] text-[#242424]">Ngày tạo: {goal.startDate}</p>
                                        <p className="text-[14px] text-[#242424]">Ngày kết thúc: {goal.endDate}</p>
                                    </div>
                                    {/* Thanh tiến trình */}
                                    <div className="w-full md:w-1/2 mt-4 md:mt-0 md:ml-4">
                                        <div className="relative w-full h-4 bg-[#dedede] rounded-full overflow-hidden">
                                            <div
                                                className="absolute top-0 left-0 h-full bg-[#40bb15]"
                                                style={{ width: `${percentage}%` }}
                                            ></div>
                                        </div>
                                        <p className="text-right text-sm text-[#242424] mt-1">
                                            {percentage.toFixed(0)}%
                                        </p>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>

                    {/* Nút thêm mục tiêu mới */}
                    <div className="flex justify-center mt-6" onClick={onOpenModalCreate}>
                        <button className="bg-[#40bb15] text-white px-6 py-3 rounded-lg shadow-lg hover:bg-[#41bb15e1]">
                            + Thêm mục tiêu mới
                        </button>
                    </div>
                </div>
            </div>
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
