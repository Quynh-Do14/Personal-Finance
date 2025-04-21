import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import "../../assets/styles/page/payment.css"
import LayoutClient from '../../infrastructure/common/Layouts/Client-Layout';
import { ROUTE_PATH } from '../../core/common/appRouter';
import paymentService from '../../infrastructure/repositories/payment/payment.service';
import { FullPageLoading } from '../../infrastructure/common/components/controls/loading';
import succes from "../../assets/images/success.png"
import failure from "../../assets/images/failure.png"
import loadingGif from "../../assets/images/loading.gif"

const PaymentResultPage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    console.log("queryParams", location.search);
    const [loading, setLoading] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [respone, setRespone] = useState<any>({});

    const vnp_TransactionNo = queryParams.get("vnp_TransactionNo");
    const vnp_TransactionStatus = queryParams.get("vnp_TransactionStatus");
    const vnp_ResponseCode = queryParams.get("vnp_ResponseCode");
    const vnp_OrderInfo = queryParams.get("vnp_OrderInfo");
    console.log("vnp_TransactionNo", vnp_TransactionNo);
    console.log("vnp_ResponseCode", vnp_ResponseCode);

    const decodeFromBase64 = (base64: string): string => {
        const binary = atob(base64);
        const bytes = Uint8Array.from(binary, char => char.charCodeAt(0));
        const decoder = new TextDecoder();
        return decoder.decode(bytes);
    };
    const decoded_vnp_OrderInfo = decodeFromBase64(String(vnp_OrderInfo))

    const onPaymentAsync = async () => {
        try {
            await paymentService.Payment(
                location.search,
                setLoading
            ).then((res) => {
                setRespone(res)
            })
        }
        catch (error) {
            console.error(error);
        }
        finally {
            setIsLoading(true)
        }
    }

    useEffect(() => {
        if (location.search) {
            onPaymentAsync().then(() => { });
        }
    }, [location.search])

    const condition = () => {
        if (respone) {
            if (respone?.RspCode == "00") {
                if (Number(vnp_ResponseCode) == 0) {
                    return (
                        <div className={`payment-status-container success`}>
                            <div className="payment-status">
                                <h1>Giao dịch thành công</h1>
                                <h2>{decoded_vnp_OrderInfo}</h2>
                                <img src={succes} alt="" width={160} />
                                <h2>Giao dịch của bạn thành công</h2>
                                <a href={ROUTE_PATH.HOME_PAGE} className="action-btn success-btn">Trang chủ</a>
                            </div>
                        </div>
                    )
                }
                else {
                    return (
                        <div className={`payment-status-container failure`}>
                            <div className="payment-status">
                                <h1>Giao dịch thất bại</h1>
                                <h2>{decoded_vnp_OrderInfo}</h2>
                                <img src={failure} alt="" width={160} />
                                <h2>Giao dịch của bạn không thể tiếp tục</h2>
                                <a href={ROUTE_PATH.HOME_PAGE} className="action-btn failure-btn">Trang chủ</a>
                            </div>
                        </div>
                    )
                }
            }
            else if (respone?.RspCode == "01") {
                return (
                    <div className={`payment-status-container failure`}>
                        <div className="payment-status">
                            <h1>Giao dịch thất bại</h1>
                            <h2>{decoded_vnp_OrderInfo}</h2>
                            <img src={failure} alt="" width={160} />
                            <h2>Không tìm thấy giao dịch</h2>
                            <a href={ROUTE_PATH.HOME_PAGE} className="action-btn failure-btn">Trang chủ</a>
                        </div>
                    </div>
                )
            }
            else if (respone?.RspCode == "02") {
                return (
                    <div className={`payment-status-container failure`}>
                        <div className="payment-status">
                            <h1>Giao dịch thất bại</h1>
                            <h2>{decoded_vnp_OrderInfo}</h2>
                            <img src={failure} alt="" width={160} />
                            <h2>Giao dịch đã được thanh toán</h2>
                            <a href={ROUTE_PATH.HOME_PAGE} className="action-btn failure-btn">Trang chủ</a>
                        </div>
                    </div>
                )
            }
            else if (respone?.RspCode == "04") {
                return (
                    <div className={`payment-status-container failure`}>
                        <div className="payment-status">
                            <h1>Giao dịch thất bại</h1>
                            <h2>{decoded_vnp_OrderInfo}</h2>
                            <img src={failure} alt="" width={160} />
                            <h2>Số tiền không hợp lệ</h2>
                            <a href={ROUTE_PATH.HOME_PAGE} className="action-btn failure-btn">Trang chủ</a>
                        </div>
                    </div>
                )
            }
            else if (respone?.RspCode == "97") {
                return (
                    <div className={`payment-status-container failure`}>
                        <div className="payment-status">
                            <h1>Giao dịch thất bại</h1>
                            <h2>{decoded_vnp_OrderInfo}</h2>
                            <img src={failure} alt="" width={160} />
                            <h2>Chữ kí không hợp lệ</h2>
                            <a href={ROUTE_PATH.HOME_PAGE} className="action-btn failure-btn">Trang chủ</a>
                        </div>
                    </div>
                )
            }
        }
        return (
            <div className={`payment-status-container failure`}>
                <div className="payment-status">
                    <h1>Giao dịch thất bại</h1>
                    <h2>{decoded_vnp_OrderInfo}</h2>
                    <img src={failure} alt="" width={160} />
                    <h2>Giao dịch của bạn không thể tiếp tục</h2>
                    <a href={ROUTE_PATH.HOME_PAGE} className="action-btn failure-btn">Trang chủ</a>
                </div>
            </div>
        )
    }
    return (
        <LayoutClient>
            {
                isLoading
                    ?
                    <div className="padding-common">
                        {condition()}
                    </div>
                    :
                    <div className="padding-common">
                        <div className={`payment-status-container loading`}>
                            <div className="payment-status">
                                <h1>Giao dịch của bạn đang xử lí</h1>
                                <h2>{decoded_vnp_OrderInfo}</h2>
                                <img src={loadingGif} alt="" width={160} />
                            </div>
                        </div>
                    </div>
            }
            <FullPageLoading isLoading={loading} />
        </LayoutClient>
    );
}

export default PaymentResultPage