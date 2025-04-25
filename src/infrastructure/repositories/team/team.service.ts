import { Endpoint } from "../../../core/common/apiLink";
import { FailMessage, SuccessMessage } from "../../common/components/toast/notificationToast";
import { RequestService } from "../../utils/response";

class TeamService {
    async GetTeam(params: object, setLoading: Function) {
        setLoading(true)
        try {
            return await RequestService
                .get(Endpoint.Team.Get, {
                    ...params
                })
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
    };

    async GetTeamById(id: string, setLoading: Function) {
        setLoading(true)
        try {
            return await RequestService
                .get(`${Endpoint.Team.GetById}/${id}`)
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
    };

    async GetTeamMember(id: number, setLoading: Function) {
        setLoading(true)
        try {
            return await RequestService
                .get(`${Endpoint.Team.Member}/${id}`)
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
    };
    async AddMember(teamId: number, data: any, onBack: Function, setLoading: Function) {
        setLoading(true)
        try {
            return await RequestService
                .put(`${Endpoint.Team.AddMember}/${teamId}`, data)
                .then(response => {
                    if (response) {
                        onBack()
                        SuccessMessage("Thêm thành viên thành công", "")
                        return response
                    }
                    setLoading(false)
                    return response;
                });
        } catch (error: any) {
            FailMessage("Thêm thành viên không thành công", error.response.data.message)
            console.error(error)
        } finally {
            setLoading(false);
        }
    }
    async CreateTeam(data: object, onBack: Function, setLoading: Function) {
        setLoading(true)
        try {
            return await RequestService
                .postForm(Endpoint.Team.Create,
                    data
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
    async UpdateTeam(id: string, data: object, onBack: Function, setLoading: Function) {
        setLoading(true)
        try {
            return await RequestService
                .putForm(`${Endpoint.Team.Update}/${id}`,
                    data
                )
                .then(response => {
                    if (response) {
                        onBack()
                        SuccessMessage("Cập nhật thành công", "")
                        return response
                    }
                    setLoading(false)
                    return response;
                });
        } catch (error: any) {
            FailMessage("Cập nhật không thành công", error.response.data.message)
            console.error(error)
        } finally {
            setLoading(false);
        }
    }
    async JoinTeam(id: string, teamId: string, onBack: Function, setLoading: Function) {
        setLoading(true)
        try {
            return await RequestService
                .post(`${Endpoint.Team.Join}/${id}?teamId=${teamId}`)
                .then(response => {
                    if (response) {
                        onBack()
                        SuccessMessage("Xác nhận đã vào nhóm", "")
                        return response
                    }
                    setLoading(false)
                    return response;
                });
        } catch (error: any) {
            FailMessage("Bạn chưa thể vào nhóm", error.response.data.message)
            console.error(error)
        } finally {
            setLoading(false);
        }
    }

    async LeaveTeam(id: string, onBack: Function, setLoading: Function) {
        setLoading(true)
        try {
            return await RequestService
                .delete(`${Endpoint.Team.Leave}/${id}`)
                .then(response => {
                    if (response) {
                        onBack()
                        SuccessMessage("Bạn đã rời nhóm", "")
                        return response
                    }
                    setLoading(false)
                    return response;
                });
        } catch (error: any) {
            FailMessage("Bạn không thể rời nhóm", error.response.data.message)
            console.error(error)
        } finally {
            setLoading(false);
        }
    }

    async DeleteTeam(id: string, onBack: Function, setLoading: Function) {
        setLoading(true)
        try {
            return await RequestService
                .delete(`${Endpoint.Team.Delete}/${id}`)
                .then(response => {
                    if (response) {
                        onBack();
                        SuccessMessage("Nhóm đã bị xóa", "")
                        return response
                    }
                    setLoading(false)
                    return response;
                });
        } catch (error: any) {
            FailMessage("Xóa nhóm không thành công", error.response.data.message)
            console.error(error)
        } finally {
            setLoading(false);
        }
    }

    async LockTeam(id: string, onBack: Function, setLoading: Function) {
        setLoading(true)
        try {
            return await RequestService
                .put(`${Endpoint.Team.Lock}/${id}`)
                .then(response => {
                    if (response) {
                        onBack();
                        SuccessMessage("Nhóm đã bị khóa", "")
                        return response
                    }
                    setLoading(false)
                    return response;
                });
        } catch (error: any) {
            FailMessage("Khóa nhóm không thành công", error.response.data.message)
            console.error(error)
        } finally {
            setLoading(false);
        }
    }

    async UnLockTeam(id: string, onBack: Function, setLoading: Function) {
        setLoading(true)
        try {
            return await RequestService
                .put(`${Endpoint.Team.UnLock}/${id}`)
                .then(response => {
                    if (response) {
                        onBack();
                        SuccessMessage("Nhóm đã được mở", "")
                        return response
                    }
                    setLoading(false)
                    return response;
                });
        } catch (error: any) {
            FailMessage("Mở nhóm không thành công", error.response.data.message)
            console.error(error)
        } finally {
            setLoading(false);
        }
    }
}

export default new TeamService();
