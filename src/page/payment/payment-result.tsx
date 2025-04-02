import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import "../../assets/styles/page/payment.css"
import LayoutClient from '../../infrastructure/common/Layouts/Client-Layout';
import BannerCommon from '../../infrastructure/common/components/banner/BannerCommon';
import { ROUTE_PATH } from '../../core/common/appRouter';
import paymentService from '../../infrastructure/repositories/payment/payment.service';
import { FullPageLoading } from '../../infrastructure/common/components/controls/loading';

const PaymentResultPage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    console.log("queryParams", location.search);
    const [loading, setLoading] = useState<boolean>(false);

    const vnp_TransactionNo = queryParams.get("vnp_TransactionNo");
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
            <BannerCommon title={'Thanh toán'} sub={'Dịch vụ tài chính'} />
            <div className={`payment-status-container ${Number(vnp_TransactionNo) == 0 ? "success " : "failure "}`}>
                {Number(vnp_TransactionNo) == 0 ? (
                    <div className="payment-status failure">
                        <span className="status-icon">❌</span>
                        <h2>Payment Failed</h2>
                        <a href={ROUTE_PATH.HOME_PAGE} className="action-btn failure-btn">Trang chủ</a>
                    </div>
                ) : (
                    <div className="payment-status success">
                        <span className="status-icon">✔️</span>
                        <h2>Payment Success</h2>
                        <a href={ROUTE_PATH.HOME_PAGE} className="action-btn success-btn">Trang chủ</a>
                    </div>

                )}
            </div>
            <FullPageLoading isLoading={loading} />
        </LayoutClient>
    );
}

export default PaymentResultPage