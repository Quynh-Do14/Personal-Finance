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
import banner3 from '../../assets/images/banner/banner3.png'
const ForgotPasswordScreen = () => {
    const [validate, setValidate] = useState<any>({});
    const [submittedTime, setSubmittedTime] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);

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
                        navigate(ROUTE_PATH.HOME_PAGE)
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
            <BannerCommon
                title={'Đăng Nhập'}
                sub={'Thành viên'}
                backgroundUrl={banner3}
            />
            <div className='auth-screen'>
                <div className='content'>
                    <div>
                        <h2>Chào mừng trở lại !</h2>
                        <h3>Nhập thông tin để có quyền truy cập không giới hạn vào dữ liệu và thông tin</h3>
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
                        <div className="remember-forgot">
                            <label className="custom-checkbox">
                                {/* <input
                                    type="checkbox"
                                    checked={remember}
                                    onChange={() => setRemember(!remember)}
                                />
                                <span className="checkmark" />
                                Ghi nhớ tài khoản */}
                            </label>

                            <a href="/forgot-password" className="forgot-link">Quên mật khẩu</a>
                        </div>
                        <ButtonDesign
                            classColor={'green'}
                            title={'Đăng nhập'}
                            onClick={onLoginAsync}
                        />

                        <div className="divider">
                            <div className="line" />
                            <span className="divider-text">Hay đăng nhập</span>
                            <div className="line" />
                        </div>

                        <p className="signup-text">
                            <a href={ROUTE_PATH.LOGIN} className="gradient-link">Quay lại</a>
                        </p>
                    </div>
                </div>
            </div>
            <FullPageLoading isLoading={loading} />
        </LayoutClient>
    )
}

export default ForgotPasswordScreen