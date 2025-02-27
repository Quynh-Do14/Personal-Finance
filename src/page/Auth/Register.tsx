import { Col, Modal, Row } from 'antd'
import { Link, useNavigate } from 'react-router-dom';
import InputTextCommon from '../../infrastructure/common/components/input/input-text';
import InputPasswordCommon from '../../infrastructure/common/components/input/input-password';
import { useState } from 'react';
import authService from '../../infrastructure/repositories/auth/service/auth.service';
import { WarningMessage } from '../../infrastructure/common/components/toast/notificationToast';
import { ButtonCommon } from '../../infrastructure/common/components/button/button-common';
import { toast, ToastContainer } from 'react-toastify';

type Props = {

    setLoading: Function,
    isRegister: boolean,
    setIsRegisterClick?: any
}
const RegisterModal = (props: Props) => {
    const { setLoading, isRegister, setIsRegisterClick } = props;
    const [validate, setValidate] = useState<any>({});
    const [submittedTime, setSubmittedTime] = useState<any>();

    const [_data, _setData] = useState<any>({});
    const dataLogin = _data;

    const setDataLogin = (data: any) => {
        Object.assign(dataLogin, { ...data });
        _setData({ ...dataLogin });
    };

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


    const handleCancel = () => {
        setIsRegisterClick(false);
    };
    const handleOk = () => {
        setIsRegisterClick(false);
    };

    const onRegisterAsync = async () => {
        await setSubmittedTime(new Date());
        if (isValidData()) {
            try {
                await authService.register(
                    {
                        name: dataLogin.name,
                        username: dataLogin.username,
                        email: dataLogin.email,
                        password: dataLogin.password,
                        confirmPassword: dataLogin.confirmPassword,
                        phoneNumber: dataLogin.phoneNumber,
                        roles: "user"
                    },
                    setLoading
                ).then((response) => {
                    if (response) {
                        handleCancel();
                        toast.success("Đăng ký thành công, vui lòng kiểm tra email (bao gồm spam) để kích hoạt tài khoản", {
                            position: "top-right", autoClose: 3000
                        });
                    }
                });
            } catch (error) {
                console.error(error);
            }
        }
        else {
            WarningMessage("Nhập thiếu thông tin", "Vui lòng nhập đầy đủ thông tin")
        };
    }

    return (
        <Modal
            open={isRegister}
            onOk={handleOk}
            footer={[]}
            onCancel={handleCancel}
            centered
        >
            <div className='flex flex-col gap-2'>
                <div className="flex justify-center mt-8">
                    <img src={""} alt="" />
                </div>
                <div className="">
                    <p className="text-center font-bold text-[28px] text-[#787878]">Đăng ký</p>
                </div>
                <Row gutter={[10, 10]}>
                    <Col span={24}>
                        <InputTextCommon
                            label={"Tên đăng nhập"}
                            attribute={"username"}
                            isRequired={true}
                            dataAttribute={dataLogin.username}
                            setData={setDataLogin}
                            disabled={false}
                            validate={validate}
                            setValidate={setValidate}
                            submittedTime={submittedTime}
                        />
                    </Col>
                    <Col span={24}>
                        <InputTextCommon
                            label={"Email"}
                            attribute={"email"}
                            isRequired={true}
                            dataAttribute={dataLogin.email}
                            setData={setDataLogin}
                            disabled={false}
                            validate={validate}
                            setValidate={setValidate}
                            submittedTime={submittedTime}
                        />
                    </Col>
                    <Col span={24}>
                        <InputTextCommon
                            label={"Họ và tên"}
                            attribute={"name"}
                            isRequired={true}
                            dataAttribute={dataLogin.name}
                            setData={setDataLogin}
                            disabled={false}
                            validate={validate}
                            setValidate={setValidate}
                            submittedTime={submittedTime}
                        />
                    </Col>
                    <Col span={24}>
                        <InputTextCommon
                            label={"Số điện thoại"}
                            attribute={"phoneNumber"}
                            isRequired={true}
                            dataAttribute={dataLogin.phoneNumber}
                            setData={setDataLogin}
                            disabled={false}
                            validate={validate}
                            setValidate={setValidate}
                            submittedTime={submittedTime}
                        />
                    </Col>
                    <Col span={24}>
                        <InputPasswordCommon
                            label={"Mật khẩu"}
                            attribute={"password"}
                            isRequired={true}
                            dataAttribute={dataLogin.password}
                            setData={setDataLogin}
                            disabled={false}
                            validate={validate}
                            setValidate={setValidate}
                            submittedTime={submittedTime}
                        />
                    </Col>
                    <Col span={24}>
                        <InputPasswordCommon
                            label={"Nhập lại mật khẩu"}
                            attribute={"confirmPassword"}
                            isRequired={true}
                            dataAttribute={dataLogin.confirmPassword}
                            setData={setDataLogin}
                            disabled={false}
                            validate={validate}
                            setValidate={setValidate}
                            submittedTime={submittedTime}
                        />
                    </Col>
                    <Col span={24}>
                        <ButtonCommon
                            onClick={onRegisterAsync}
                            title={'Đăng ký'}
                            classColor={'green'}
                            isFullWidth={true}
                        />
                    </Col>
                </Row>
            </div>
            <ToastContainer />
        </Modal>
    )
}

export default RegisterModal