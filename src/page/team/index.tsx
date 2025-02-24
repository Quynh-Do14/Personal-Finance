import React, { useEffect, useState } from "react";
import LayoutClient from "../../infrastructure/common/Layouts/Client-Layout";
import { FullPageLoading } from "../../infrastructure/common/components/controls/loading";
import teamService from "../../infrastructure/repositories/team/team.service";
import { configImageURL } from "../../infrastructure/helper/helper";
import { Col, Row } from "antd";
import ModalCreateTeam from "./modalCreate";
import { WarningMessage } from "../../infrastructure/common/components/toast/notificationToast";
import { Link } from "react-router-dom";

const TeamPage = () => {
    const [listTeam, setListTeam] = useState<Array<any>>([]);
    const [loading, setLoading] = useState(false);
    const [isOpenModalCreate, setIsOpenCreate] = useState<boolean>(false);

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

    const onGetListTeamAsync = async () => {
        const param = {
            // page: 0,
            // size: 4,
        }
        try {
            await teamService.GetTeam(
                param,
                setLoading
            ).then((res) => {
                setListTeam(res.content)
            })
        }
        catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        onGetListTeamAsync().then(_ => { });
    }, []);

    const onOpenModalCreate = () => {
        setIsOpenCreate(!isOpenModalCreate)
    }

    const onCreateTeamAsync = async () => {
        await setSubmittedTime(Date.now());
        if (isValidData()) {
            await teamService.CreateTeam({
                image: dataRequest.image,
                name: dataRequest.name,
            },
                () => {
                    setIsOpenCreate(false);
                    onGetListTeamAsync().then(_ => { });
                },
                setLoading
            )
        }
        else {
            WarningMessage("Nhập thiếu thông tin", "Vui lòng nhập đầy đủ thông tin")
        };
    }
    return (
        <LayoutClient>
            <div className="personal-finance-container">
                <div className="banner">
                    <div className='overlay'></div>
                    <div className="layout text-center bg-cover bg-center py-20">
                    </div>
                </div>
                <div className="flex flex-col gap-6 padding-common">
                    <div className="flex justify-between align-middle">
                        <h1 className="text-2xl font-bold text-center text-gray-800">Danh sách nhóm</h1>
                        <div className="flex justify-center" onClick={onOpenModalCreate}>
                            <button className="bg-[#1d9b5e] text-white px-6 py-3 rounded-lg shadow-lg hover:bg-[#41bb15e1]">
                                + Thêm nhóm mới
                            </button>
                        </div>
                    </div>

                    {/* Danh sách mục tiêu */}
                    <Row gutter={[40, 20]}>
                        {listTeam.map((item, index) => {
                            return (
                                <Col
                                    key={index}
                                    span={12}
                                >
                                    <Link to={`/goal-spending-team/${item.id}`}>
                                        <Row
                                            gutter={[20, 20]}
                                            className="p-4 bg-gray-100 rounded-lg shadow"
                                        >
                                            {/* Thông tin mục tiêu */}
                                            <Col span={6}>
                                                <img src={configImageURL(item.imageCode)} style={{ width: "100%", height: 100 }} alt="" />
                                            </Col>
                                            <Col span={18}>
                                                <div className="flex flex-col gap-2">
                                                    <p className="text-[20px] font-semibold text-[#1d1d1d] text-truncate">{item.name}</p>
                                                    <p className="text-[14px] text-[#242424]">Ngày tạo: {item.createdAt}</p>
                                                    <p className="text-[14px] text-[#242424]">Trưởng nhóm: {item.teamLeader.name}</p>
                                                </div>
                                            </Col>
                                            {/* Thanh tiến trình */}
                                        </Row>
                                    </Link>
                                </Col>

                            );
                        })}
                    </Row>

                    {/* Nút thêm mục tiêu mới */}
                    <ModalCreateTeam
                        handleOk={onCreateTeamAsync}
                        handleCancel={() => setIsOpenCreate(false)}
                        visible={isOpenModalCreate}
                        data={dataRequest}
                        setData={setDataRequest}
                        validate={validate}
                        setValidate={setValidate}
                        submittedTime={submittedTime}
                    />
                </div>
            </div>
            <FullPageLoading isLoading={loading} />
        </LayoutClient >
    );
};

export default TeamPage;
