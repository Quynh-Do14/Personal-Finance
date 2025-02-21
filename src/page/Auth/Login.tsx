import { Col, Modal, Row } from 'antd'
import { Link, useNavigate } from 'react-router-dom';
import InputTextCommon from '../../infrastructure/common/components/input/input-text';
import InputPasswordCommon from '../../infrastructure/common/components/input/input-password';
import { useState } from 'react';
import authService from '../../infrastructure/repositories/auth/service/auth.service';
import { WarningMessage } from '../../infrastructure/common/components/toast/notificationToast';
import { ButtonCommon } from '../../infrastructure/common/components/button/button-common';

type Props = {
    isLoginClick: boolean,
    setIsLoginClick: Function,
    setLoading: Function,
    setDataLogined?: any,
    setIsRegisterClick?: any
}
const LoginModal = (props: Props) => {
    const { isLoginClick, setIsLoginClick, setLoading, setDataLogined, setIsRegisterClick } = props;
    const [validate, setValidate] = useState<any>({});
    const [submittedTime, setSubmittedTime] = useState<any>();

    const [_data, _setData] = useState<any>({});
    const dataLogin = _data;

    const navigate = useNavigate();

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
        setIsLoginClick(false);
    };
    const handleOk = () => {
        setIsLoginClick(true);
    };

    const onLoginAsync = async () => {
        await setSubmittedTime(new Date());
        if (isValidData()) {
            try {
                await authService.login(
                    {
                        username: dataLogin.username,
                        password: dataLogin.password,
                    },
                    setLoading
                ).then((response) => {
                    if (response) {
                        handleCancel();
                        setDataLogined(true);
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

    const onLoginWithGoogle = () => {
        const callbackUrl = "https://idaimmo.io.vn/authenticate";
        const authUrl = "https://accounts.google.com/o/oauth2/v2/auth";
        const googleClientId = "432693947240-jj62nbj08naf6aene6dfri19hh7sntae.apps.googleusercontent.com";

        const targetUrl = `${authUrl}?redirect_uri=${encodeURIComponent(
            callbackUrl
        )}&response_type=code&client_id=${googleClientId}&scope=openid%20email%20profile`;

        console.log(targetUrl);

        window.location.href = targetUrl;
    };

    const handleRegister = () => {
        setIsRegisterClick(true);
    };

    return (
        <Modal
            open={isLoginClick}
            onOk={handleOk}
            footer={[]}
            onCancel={handleCancel}
            centered
        >
            <div className='flex flex-col gap-4'>
                <div className="flex justify-center mt-8">
                    <img src={""} alt="" />
                </div>
                <div className="">
                    <p className="text-center font-bold text-[2rem] text-[#787878]">Đăng nhập</p>
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
                            onEnterPress={onLoginAsync}
                        />
                    </Col>
                    <Col span={24}>
                        <ButtonCommon
                            onClick={onLoginAsync}
                            title={'Đăng nhập'}
                            classColor={'green'}
                            isFullWidth={true}
                        />
                    </Col>
                    <Col span={24}>
                        <ButtonCommon
                            onClick={onLoginWithGoogle} // Hàm xử lý đăng nhập Google
                            title={'Đăng nhập với Google'}
                            classColor={'red'} // Đổi màu để dễ nhận biết
                            isFullWidth={true}
                        />
                    </Col>
                </Row>
                <div className="flex justify-between gap-[10rem] py-2 text-[#787878]">
                    <Link to={""} className="">Quên mật khẩu?</Link>
                    <Link onClick={handleRegister} className="cursor-pointer" to={''}>Chưa có tài khoản</Link>
                </div>
            </div>

        </Modal>
    )
}

export default LoginModal