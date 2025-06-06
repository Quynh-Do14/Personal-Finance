import { Endpoint } from "../../../core/common/apiLink";
import { FailMessage, SuccessMessage } from "../../common/components/toast/notificationToast";
import { RequestService } from "../../utils/response";

class IncomeService {
    async GetIncome(idGoal: string, params: object, setLoading: Function) {
        setLoading(true)
        const url = idGoal ? `${Endpoint.Income.Get}/${idGoal}` : Endpoint.Income.Get
        try {
            return await RequestService
                .get(url, {
                    ...params
                })
                .then(response => {
                    if (response) {
                        return response
                    }
                    setLoading(false)
                    return response;
                });
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false);
        }
    };
    async CreateIncome(idGoal: string, data: object, onBack: Function, setLoading: Function) {
        setLoading(true)
        const url = idGoal ? `${Endpoint.Income.Create}/${idGoal}` : Endpoint.Income.Create
        try {
            return await RequestService
                .post(url, {
                    ...data
                }
                )
                .then(response => {
                    if (response) {
                        onBack()
                        SuccessMessage("Thêm mới thành công", "")
                        return response
                    }
                    setLoading(false)
                    return response;
                });
        } catch (error: any) {
            FailMessage("Thêm mới không thành công", error.response.data.message)
            console.error(error)
        } finally {
            setLoading(false);
        }
    }
}

export default new IncomeService();