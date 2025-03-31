import { notification } from "antd";
import axios from "axios";
import { ROUTE_PATH } from "../common/appRouter";
import { Endpoint } from "../common/apiLink";
const baseURL = process.env.REACT_APP_BASE_URL
const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 15000,
    withCredentials: true,
    validateStatus: function (status) {
        return status >= 200 && status < 500; // Đừng để axios tự throw với 401/403
    }
});

const getToken = () => {
    const token = localStorage.getItem('token');
    return token ? JSON.parse(token) : null;
};

axiosInstance.interceptors.request.use(
    (config) => {
        const token = getToken();
        console.log("token", token);
        if (token) {
            config.headers.Authorization = `Bearer ${token.accessToken}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error?.config;

        if (error?.response?.status === 401 && !originalRequest._retry) {
            if (localStorage.getItem('token')) {
                return await refreshToken(originalRequest);
            }
        }

        return Promise.reject(error);
    }
);

const refreshToken = async (originalRequest: any) => {
    originalRequest._retry = true;

    try {
        const token = getToken();
        const response = await axios.post(`${baseURL}${Endpoint.Auth.RefreshToken}`, {
            refreshToken: token?.refreshToken,
        });

        if (!response) {
            localStorage.removeItem('token');
            notification.error({
                message: 'Thông báo',
                description: 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.',
            });
            window.location.href = ROUTE_PATH.HOME_PAGE;
            return Promise.reject();
        }

        const { refreshToken, accessToken } = response.data;

        localStorage.setItem('token', JSON.stringify({ refreshToken, accessToken }));
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        return axios(originalRequest);
    } catch (error) {
        window.location.href = ROUTE_PATH.HOME_PAGE;
        localStorage.removeItem('token');
        notification.error({
            message: 'Thông báo',
            description: 'Bạn vui lòng đăng nhập để tiếp tục.',
        });
        return Promise.reject(error);
    }
};
export default axiosInstance;
