import React, { useEffect, useState } from "react";
import LayoutClient from "../../infrastructure/common/Layouts/Client-Layout";
import { FullPageLoading } from "../../infrastructure/common/components/controls/loading";
import teamService from "../../infrastructure/repositories/team/team.service";
import { configImageURL } from "../../infrastructure/helper/helper";
import { Col, Row } from "antd";
import ModalCreateTeam from "./modalCreate";
import { WarningMessage } from "../../infrastructure/common/components/toast/notificationToast";
import { Link } from "react-router-dom";
import { ButtonCommon } from "../../infrastructure/common/components/button/button-common";
import BannerCommon from "../../infrastructure/common/components/banner/BannerCommon";
import "../../assets/styles/page/team.css"
import { ButtonDesign } from "../../infrastructure/common/components/button/buttonDesign";
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
            <BannerCommon title={"Quỹ nhóm"} sub={"Tài chính"} />
            <div className="team-container padding-common">
                <div className="content">
                    <h2 className="text-xl font-bold text-center text-gray-800">Danh sách các quỹ nhóm</h2>
                    {/* Danh sách mục tiêu */}
                    <Row gutter={[20, 20]}>
                        {listTeam.map((item, index) => {
                            return (
                                <Col
                                    key={index}
                                    xs={24} sm={12} lg={8}
                                >
                                    <Link to={`/team/spending-team/${item.id}`}>
                                        <div className="box">
                                            <div
                                                className="img-bg"
                                                style={{
                                                    backgroundImage: `url(${configImageURL(item.imageCode)})`,
                                                    backgroundSize: "cover",
                                                    backgroundRepeat: "no-repeat",
                                                    backgroundPosition: "center",
                                                    width: "100%",
                                                    height: "25vh"
                                                }}>
                                            </div>
                                            <div className="text">
                                                <p className="text-truncate">{item.name}</p>
                                                <p>Trưởng nhóm: {item.teamLeader.name}</p>
                                            </div>
                                        </div>

                                    </Link>
                                </Col>

                            );
                        })}
                    </Row>
                    <ButtonDesign
                        classColor={"green"}
                        onClick={onOpenModalCreate}
                        title={"Thêm nhóm mới"}
                    />
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
