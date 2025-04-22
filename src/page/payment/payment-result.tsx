import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import "../../assets/styles/page/payment.css"
import LayoutClient from '../../infrastructure/common/Layouts/Client-Layout';
import { ROUTE_PATH } from '../../core/common/appRouter';
import paymentService from '../../infrastructure/repositories/payment/payment.service';
import { FullPageLoading } from '../../infrastructure/common/components/controls/loading';
import succes from "../../assets/images/success.png"
import failure from "../../assets/images/failure.png"
import loadingGif from "../../assets/images/loading.gif"
import { PaymentRequestIdStore } from '../../infrastructure/utils/PaymentRequestIdStore';

const PaymentResultPage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    
    const [loading, setLoading] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [respone, setRespone] = useState<any>({});
    const [hasProcessed, setHasProcessed] = useState<boolean>(false);
    
    const vnp_TransactionNo = queryParams.get("vnp_TransactionNo");
    const vnp_ResponseCode = queryParams.get("vnp_ResponseCode");
    const vnp_OrderInfo = queryParams.get("vnp_OrderInfo");
    const vnp_TxnRef = queryParams.get("vnp_TxnRef");

    const transactionId = `${vnp_TxnRef || ''}_${vnp_TransactionNo || ''}`;

    const decodeFromBase64 = (base64: string): string => {
        const binary = atob(base64);
        const bytes = Uint8Array.from(binary, char => char.charCodeAt(0));
        const decoder = new TextDecoder();
        return decoder.decode(bytes);
    };

    const decoded_vnp_OrderInfo = vnp_OrderInfo ? decodeFromBase64(String(vnp_OrderInfo)) : "";

    useEffect(() => {
        // Kiểm tra nếu không có thông tin giao dịch
        if (!location.search || !transactionId) {
            return;
        }
        
        // Nếu đã xử lý giao dịch này trước đó
        if (PaymentRequestIdStore.hasBeenProcessed(transactionId)) {
            console.log(`[${new Date().toISOString()}] Transaction ${transactionId} already processed, loading from storage`);
            
            const storedResponse = localStorage.getItem(`payment_result_${transactionId}`);
            if (storedResponse) {
                try {
                    const parsedResponse = JSON.parse(storedResponse);
                    setRespone(parsedResponse);
                    setHasProcessed(true);
                    setIsLoading(true);
                    return;
                } catch (error) {
                    console.error("Error parsing stored response", error);
                }
            }
        }
        
        // Generate một ID duy nhất cho request này
        const requestIdempotencyKey = `${transactionId}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        
        const processPayment = async () => {
            try {
                console.log(`[${new Date().toISOString()}] Processing payment for transaction ${transactionId} with idempotency key ${requestIdempotencyKey}`);
                
                setLoading(true);
                // Thêm idempotency key vào headers
                const res = await paymentService.paymentWithIdempotency(
                    location.search, 
                    requestIdempotencyKey,
                    setLoading
                );
                
                // Đánh dấu giao dịch đã được xử lý
                PaymentRequestIdStore.markRequestProcessed(transactionId);
                
                // Lưu kết quả
                localStorage.setItem(`payment_result_${transactionId}`, JSON.stringify(res));
                
                setRespone(res);
                setHasProcessed(true);
            } catch (error) {
                console.error(`[${new Date().toISOString()}] Payment error:`, error);
                setHasProcessed(true);
            } finally {
                setIsLoading(true);
                setLoading(false);
            }
        };
        
        processPayment();
    }, [transactionId]); // Chỉ phụ thuộc vào transactionId

    const condition = () => {
        if (respone) {
            if (respone?.rspCode === "00") {
                if (Number(vnp_ResponseCode) == 0) {
                    return (
                        <div className={`payment-status-container success`}>
                            <div className="payment-status">
                                <h1>Giao dịch thành công</h1>
                                <h2>{decoded_vnp_OrderInfo}</h2>
                                <img src={succes} alt="" width={160} />
                                <h2>Giao dịch của bạn thành công</h2>
                                <Link to={ROUTE_PATH.HOME_PAGE} className="action-btn success-btn">Trang chủ</Link>                            </div>
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
                                <Link to={ROUTE_PATH.HOME_PAGE} className="action-btn failure-btn">Trang chủ</Link>
                            </div>
                        </div>
                    )
                }
            }
            else if (respone?.rspCode === "01") {
                return (
                    <div className={`payment-status-container failure`}>
                        <div className="payment-status">
                            <h1>Giao dịch thất bại</h1>
                            <h2>{decoded_vnp_OrderInfo}</h2>
                            <img src={failure} alt="" width={160} />
                            <h2>Không tìm thấy giao dịch</h2>
                            <Link to={ROUTE_PATH.HOME_PAGE} className="action-btn failure-btn">Trang chủ</Link>
                        </div>
                    </div>
                )
            }
            else if (respone?.rspCode === "02") {
                return (
                    <div className={`payment-status-container failure`}>
                        <div className="payment-status">
                            <h1>Giao dịch thất bại</h1>
                            <h2>{decoded_vnp_OrderInfo}</h2>
                            <img src={failure} alt="" width={160} />
                            <h2>Giao dịch đã được thanh toán</h2>
                            <Link to={ROUTE_PATH.HOME_PAGE} className="action-btn failure-btn">Trang chủ</Link>
                        </div>
                    </div>
                )
            }
            else if (respone?.rspCode === "04") {
                return (
                    <div className={`payment-status-container failure`}>
                        <div className="payment-status">
                            <h1>Giao dịch thất bại</h1>
                            <h2>{decoded_vnp_OrderInfo}</h2>
                            <img src={failure} alt="" width={160} />
                            <h2>Số tiền không hợp lệ</h2>
                            <Link to={ROUTE_PATH.HOME_PAGE} className="action-btn failure-btn">Trang chủ</Link>
                        </div>
                    </div>
                )
            }
            else if (respone?.rspCode === "97") {
                return (
                    <div className={`payment-status-container failure`}>
                        <div className="payment-status">
                            <h1>Giao dịch thất bại</h1>
                            <h2>{decoded_vnp_OrderInfo}</h2>
                            <img src={failure} alt="" width={160} />
                            <h2>Chữ kí không hợp lệ</h2>
                            <Link to={ROUTE_PATH.HOME_PAGE} className="action-btn failure-btn">Trang chủ</Link>
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
                    <Link to={ROUTE_PATH.HOME_PAGE} className="action-btn failure-btn">Trang chủ</Link>
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