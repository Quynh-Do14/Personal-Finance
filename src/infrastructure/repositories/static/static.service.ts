import { Endpoint } from "../../../core/common/apiLink";
import { FailMessage, SuccessMessage } from "../../common/components/toast/notificationToast";
import { RequestService } from "../../utils/response";

class StaticService {
    async PersonalStatisticalByGoal(goalId: string, endDate: string, startDate: string, timeRange: string, setLoading: Function) {
        setLoading(true)
        try {
            return await RequestService
                .get(`${Endpoint.Static.Personal.GetStatisticalGoal}`, {
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

    async TeamStatisticalByGoal(goalId: string, byStat: "type" | "user", endDate: string, startDate: string, timeRange: string, setLoading: Function) {
        setLoading(true)
        try {
            return await RequestService
                .get(`${Endpoint.Static.Team.GetStatisticalGoal}`, {
                    endDate,
                    startDate,
                    timeRange,
                    byStat
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

    async getStatisticalByTime(goalId: string, type: "week" | "month", setLoading: Function) {
        setLoading(true)
        try {
            return await RequestService
                .get(`${Endpoint.Static.Common.GetByTime}`, {
                    timeRange: type
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

export default new StaticService();