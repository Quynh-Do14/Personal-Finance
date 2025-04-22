import { Endpoint } from "../../../core/common/apiLink";
import { FailMessage } from "../../common/components/toast/notificationToast";
import { RequestService } from "../../utils/response";

class PaymentService {
    // Phương thức gốc - giữ lại để tương thích ngược
    async Payment(params: string, setLoading: Function) {
        setLoading(true)
        try {
            return await RequestService
                .get(`${Endpoint.Subscription.Payment}${params}`)
                .then(response => {
                    if (response) {
                        return response
                    }
                    setLoading(false)
                    return response;
                });
        } catch (error: any) {
            console.error(error)
        } finally {
            setLoading(false);
        }
    }

    // Thêm phương thức mới hỗ trợ idempotency key
    async paymentWithIdempotency(params: string, idempotencyKey: string, setLoading: Function) {
        setLoading(true)
        console.log(`[${new Date().toISOString()}] Sending request with idempotency key: ${idempotencyKey}`);
        
        try {
            return await RequestService
                .getWithHeaders(`${Endpoint.Subscription.Payment}${params}`, {
                    'Idempotency-Key': idempotencyKey,
                    'Cache-Control': 'no-cache, no-store, must-revalidate',
                    'Pragma': 'no-cache',
                    'Expires': '0'
                })
                .then(response => {
                    console.log(`[${new Date().toISOString()}] Received response for idempotency key: ${idempotencyKey}`);
                    if (response) {
                        return response
                    }
                    setLoading(false)
                    return response;
                });
        } catch (error: any) {
            console.error(`[${new Date().toISOString()}] Error with idempotency key ${idempotencyKey}:`, error);
            throw error; // Để component xử lý lỗi
        } finally {
            setLoading(false);
        }
    }

    async Subscription(idPackage: string, setLoading: Function) {
        // Code hiện tại không thay đổi
        setLoading(true)
        try {
            return await RequestService
                .post(`${Endpoint.Subscription.Create}/${idPackage}`
                )
                .then(response => {
                    if (response) {
                        return response
                    }
                    setLoading(false)
                    return response;
                });
        } catch (error: any) {
            FailMessage("Đăng kí gói không thành công", error.response.data.message)
            console.error(error)
        } finally {
            setLoading(false);
        }
    }

    async Package(setLoading: Function) {
        // Code hiện tại không thay đổi
        setLoading(true)
        try {
            return await RequestService
                .get(Endpoint.Subscription.Package
                )
                .then(response => {
                    if (response) {
                        return response
                    }
                    setLoading(false)
                    return response;
                });
        } catch (error: any) {
            console.error(error)
        } finally {
            setLoading(false);
        }
    }
}

export default new PaymentService();