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
                .get(`${Endpoint.Static.Team.GetStatisticalGoal}/${goalId}`, {
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
        const url = goalId ? `${Endpoint.Static.Common.GetByTime}/${goalId}` : Endpoint.Static.Common.GetByTime
        setLoading(true)
        try {
            return await RequestService
                .get(url, {
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