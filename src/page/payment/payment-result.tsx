import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import "../../assets/styles/page/payment.css"
import LayoutClient from '../../infrastructure/common/Layouts/Client-Layout';
import BannerCommon from '../../infrastructure/common/components/banner/BannerCommon';
import { ROUTE_PATH } from '../../core/common/appRouter';
import paymentService from '../../infrastructure/repositories/payment/payment.service';
import { FullPageLoading } from '../../infrastructure/common/components/controls/loading';
import succes from "../../assets/images/success.png"
import failure from "../../assets/images/failure.png"

const PaymentResultPage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    console.log("queryParams", location.search);
    const [loading, setLoading] = useState<boolean>(false);

    const vnp_TransactionNo = queryParams.get("vnp_TransactionNo");
    const vnp_TransactionStatus = queryParams.get("vnp_TransactionStatus");

    console.log("vnp_TransactionNo", vnp_TransactionNo);

    const onPaymentAsync = async () => {
        try {
            await paymentService.Payment(
                location.search,
                setLoading
            ).then((res) => {
                window.open(res.vnpayUrl, '_blank');
            })
        }
        catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (location.search) {
            onPaymentAsync().then(() => { });
        }
    }, [location.search])
    return (
        <LayoutClient>
            <div className="padding-common">
                <div className={`payment-status-container ${Number(vnp_TransactionStatus) == 0 ? "success" : "failure"}`}>
                    {Number(vnp_TransactionStatus) == 0 ? (
                        <div className="payment-status">
                            <h1>Giao dịch thành công</h1>
                            <img src={succes} alt="" width={160} />
                            <h2>Giao dịch của bạn thành công</h2>
                            <a href={ROUTE_PATH.HOME_PAGE} className="action-btn success-btn">Trang chủ</a>
                        </div>
                    ) :
                        Number(vnp_TransactionNo) == 0 ? (
                            <div className="payment-status">
                                <h1>Giao dịch đã bị hủy</h1>
                                <img src={failure} alt="" width={160} />
                                <h2>Giao dịch của bạn không thể tiếp tục</h2>
                                <a href={ROUTE_PATH.HOME_PAGE} className="action-btn failure-btn">Trang chủ</a>
                            </div>
                        )
                            :
                            (
                                <div className="payment-status">
                                    <h1>Giao dịch thất bại</h1>
                                    <img src={failure} alt="" width={160} />
                                    <h2>Giao dịch của bạn không thể tiếp tục</h2>
                                    <a href={ROUTE_PATH.HOME_PAGE} className="action-btn failure-btn">Trang chủ</a>
                                </div>



                            )}
                </div>
            </div>
            <FullPageLoading isLoading={loading} />
        </LayoutClient>
    );
}

export default PaymentResultPage