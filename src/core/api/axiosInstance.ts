import axios from 'axios';
import Cookies from 'js-cookie';
import { notification } from 'antd';
import { Endpoint } from '../common/apiLink';
import { ROUTE_PATH } from '../common/appRouter';

const baseURL = process.env.REACT_APP_BASE_URL;

const axiosInstance = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    timeout: 15000,
});

// Utils
const getToken = (): { accessToken: string; refreshToken: string } | null => {
    try {
        const token = Cookies.get('token');
        return token ? JSON.parse(token) : null;
    } catch {
        Cookies.remove('token');
        return null;
    }
};

const setToken = (accessToken: string, refreshToken: string) => {
    Cookies.set('token', JSON.stringify({ accessToken, refreshToken }), {
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
        expires: 7,
    });
};

const removeToken = () => {
    Cookies.remove('token');
};

// Biến toàn cục để tránh gọi refresh nhiều lần
let isRefreshing = false;
let subscribers: ((token: string) => void)[] = [];

const onRefreshed = (newAccessToken: string) => {
    subscribers.forEach((callback) => callback(newAccessToken));
    subscribers = [];
};

const addSubscriber = (callback: (token: string) => void) => {
    subscribers.push(callback);
};

// Interceptor request: thêm accessToken vào header
axiosInstance.interceptors.request.use((config) => {
    const token = getToken();
    if (token?.accessToken && config.headers && !config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${token.accessToken}`;
    }
    return config;
});

// Interceptor response: tự động gọi refresh token nếu accessToken hết hạn
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        const token = getToken();

        const isAuthEndpoint =
            originalRequest?.url?.includes(Endpoint.Auth.Login) ||
            originalRequest?.url?.includes(Endpoint.Auth.Register);

        const is401 = error.response?.status === 401;
        const isRetry = originalRequest._retry;

        if (is401 && !isRetry && !isAuthEndpoint) {
            originalRequest._retry = true;

            // Nếu không có refreshToken => remove token và redirect
            if (!token?.refreshToken) {
                removeToken();
                if (originalRequest.headers?.Authorization) {
                    delete originalRequest.headers.Authorization;
                }
                window.location.href = ROUTE_PATH.HOME_PAGE;
                return Promise.reject(error);
            }

            // Nếu chưa refresh, bắt đầu refresh
            if (!isRefreshing) {
                isRefreshing = true;
                try {
                    const res = await axios.post(`${baseURL}${Endpoint.Auth.RefreshToken}`, {
                        refreshToken: token.refreshToken,
                    });

                    const { accessToken, refreshToken } = res.data;
                    setToken(accessToken, refreshToken);
                    onRefreshed(accessToken);
                } catch (refreshError) {
                    removeToken();
                    notification.error({
                        message: 'Thông báo',
                        description: 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.',
                    });
                    window.location.href = ROUTE_PATH.HOME_PAGE;
                    return Promise.reject(refreshError);
                } finally {
                    isRefreshing = false;
                }
            }

            // Queue các request đợi token mới
            return new Promise((resolve) => {
                addSubscriber((newAccessToken: string) => {
                    if (originalRequest.headers) {
                        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    }
                    resolve(axiosInstance(originalRequest));
                });
            });
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
