import { Endpoint } from "../../../core/common/apiLink";
import { FailMessage, SuccessMessage } from "../../common/components/toast/notificationToast";
import { RequestService } from "../../utils/response";

class SpendService {
    async PersonalStatisticalByGoal(goalId: string, endDate: string, startDate: string, timeRange: string, setLoading: Function) {
        setLoading(true)
        try {
            return await RequestService
                .get(`${Endpoint.Spend.Personal.GetStatisticalGoal}/${goalId}`, {
                    endDate,
                    startDate,
                    timeRange
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

    async TeamStatisticalByGoal(goalId: string, teamId: string, endDate: string, startDate: string, timeRange: string, setLoading: Function) {
        setLoading(true)
        try {
            return await RequestService
                .get(`${Endpoint.Spend.Team.GetStatisticalGoal}/${goalId}/${teamId}`, {
                    endDate,
                    startDate,
                    timeRange
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
}

export default new SpendService();