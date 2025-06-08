import { Endpoint } from "../../../core/common/apiLink";
import { FailMessage, SuccessMessage } from "../../common/components/toast/notificationToast";
import { RequestService } from "../../utils/response";

class SpendService {
    async GetSpend(idGoal: string, params: object, setLoading: Function) {
        setLoading(true)
        const url = idGoal ? `${Endpoint.Spending.Team.Get}/${idGoal}` : Endpoint.Spending.Personal.Get
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
    async CreateSpend(idGoal: string, data: object, onBack: Function, setLoading: Function) {
        setLoading(true)
        const url = idGoal ? `${Endpoint.Spending.Team.Create}/${idGoal}` : Endpoint.Spending.Personal.Create
        try {
            return await RequestService
                .post(url,
                    { ...data }
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

export default new SpendService();