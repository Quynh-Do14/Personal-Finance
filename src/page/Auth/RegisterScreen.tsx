import React, { useState } from 'react'
import "../../assets/styles/page/login.css"
import LayoutClient from '../../infrastructure/common/Layouts/Client-Layout'
import InputTextCommon from '../../infrastructure/common/components/input/input-text'
import { Link, useNavigate } from 'react-router-dom'
import InputPasswordCommon from '../../infrastructure/common/components/input/input-password'
import authService from '../../infrastructure/repositories/auth/service/auth.service'
import { WarningMessage } from '../../infrastructure/common/components/toast/notificationToast'
import { FullPageLoading } from '../../infrastructure/common/components/controls/loading'
import { ButtonDesign } from '../../infrastructure/common/components/button/buttonDesign'
import { ROUTE_PATH } from '../../core/common/appRouter'
import BannerCommon from '../../infrastructure/common/components/banner/BannerCommon'

const RegisterScreen = () => {
    const [validate, setValidate] = useState<any>({});
    const [submittedTime, setSubmittedTime] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);
    const [remember, setRemember] = useState<boolean>(true);

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
                    () => {
                    },
                    setLoading
                ).then((response) => {
                    if (response) {
                        navigate(ROUTE_PATH.LOGIN)
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
        <LayoutClient>
            <BannerCommon title={'Đăng Kí'} sub={'Thành viên'} />
            <div className='auth-screen'>
                <div className='content'>

                    <div>
                        <h2>Biểu mẫu thông tin !</h2>
                        <h3>Vui lòng điền tất cả thông tin cần thiết theo biểu mẫu dưới đây</h3>
                    </div>
                    <div className='flex flex-col gap-5'>
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
                        <div className="remember-forgot">
                            <label className="custom-checkbox">
                                <input
                                    type="checkbox"
                                    checked={remember}
                                    onChange={() => setRemember(!remember)}
                                />
                                <span className="checkmark" />
                                Ghi nhớ tài khoản
                            </label>

                        </div>
                        <ButtonDesign
                            classColor={'green'}
                            title={'Đăng kí'}
                            onClick={onRegisterAsync}
                        />
                        <p className="signup-text">
                            Bạn đã có tài khoản?
                            <a href={ROUTE_PATH.LOGIN} className="gradient-link">Đăng nhập ngay</a>
                        </p>
                    </div>
                </div>
            </div>
            <FullPageLoading isLoading={loading} />
        </LayoutClient>
    )
}

export default RegisterScreen