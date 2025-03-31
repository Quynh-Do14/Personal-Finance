import React, { useState } from 'react'
import "../../assets/styles/page/payment.css"
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
import InputSelectCommon from '../../infrastructure/common/components/input/select-common'
const PaymentPage = () => {
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
    const onPaymentAsync = async () => {

    }


    return (
        <LayoutClient>
            <BannerCommon title={'Thanh toán'} sub={'Dịch vụ tài chính'} />
            <div className='payemnt-page'>
                <div className='content'>

                    <div>
                        <h2>Biểu mẫu thanh toán !</h2>
                        <h3>Vui lòng điền tất cả thông tin cần thiết theo biểu mẫu dưới đây</h3>
                    </div>
                    <div className='flex flex-col gap-5'>
                        <div className='method'>Hình thức thanh toán</div>
                        <InputSelectCommon
                            label={""}
                            attribute={"method"}
                            isRequired={true}
                            dataAttribute={dataLogin.method}
                            setData={setDataLogin}
                            disabled={false}
                            validate={validate}
                            setValidate={setValidate}
                            submittedTime={submittedTime}
                            listDataOfItem={[]}
                        />
                        <p className="signup-text">
                            Bạn đã có tài khoản?
                            <a href={ROUTE_PATH.REGISTER} className="gradient-link">Đăng nhập ngay</a>
                        </p>
                        <div className='method'>Thông tin thanh toán</div>
                        <InputTextCommon
                            label={"Họ tên"}
                            attribute={"fullName"}
                            isRequired={true}
                            dataAttribute={dataLogin.fullName}
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
                            label={"Điện thoại"}
                            attribute={"phone"}
                            isRequired={true}
                            dataAttribute={dataLogin.phone}
                            setData={setDataLogin}
                            disabled={false}
                            validate={validate}
                            setValidate={setValidate}
                            submittedTime={submittedTime}
                        />
                        <InputTextCommon
                            label={"Địa chỉ"}
                            attribute={"address"}
                            isRequired={true}
                            dataAttribute={dataLogin.address}
                            setData={setDataLogin}
                            disabled={false}
                            validate={validate}
                            setValidate={setValidate}
                            submittedTime={submittedTime}
                        />
                        <ButtonDesign
                            classColor={'green'}
                            title={'Thanh toán'}
                            onClick={onPaymentAsync}
                        />

                    </div>
                </div>
            </div>
            <FullPageLoading isLoading={loading} />
        </LayoutClient>
    )
}

export default PaymentPage