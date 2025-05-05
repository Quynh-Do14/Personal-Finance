// src/api/axiosInstance.ts

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
    withCredentials: true,
});

// ======= Utils =======

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
        path: '/',
    });
};

const removeToken = () => {
    Cookies.remove('token');
};

// ======= Refresh Token Queue =======

let isRefreshing = false;
let failedQueue: {
    resolve: (token: string) => void;
    reject: (error: any) => void;
}[] = [];

const processQueue = (error: any, newAccessToken: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (newAccessToken) {
            prom.resolve(newAccessToken);
        } else {
            prom.reject(error);
        }
    });
    failedQueue = [];
};

// ======= Request Interceptor =======

axiosInstance.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token?.accessToken && config.headers) {
            config.headers.Authorization = `Bearer ${token.accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// ======= Response Interceptor =======

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        const isAuthEndpoint =
            originalRequest.url?.includes(Endpoint.Auth.Login) ||
            originalRequest.url?.includes(Endpoint.Auth.Register);

        const is401 = error.response?.status === 401;
        const isRetry = originalRequest._retry;

        if (is401 && !isRetry && !isAuthEndpoint) {
            originalRequest._retry = true;

            const token = getToken();

            if (!token?.refreshToken) {
                removeToken();
                window.location.href = ROUTE_PATH.HOME_PAGE;
                return Promise.reject(error);
            }

            if (!isRefreshing) {
                isRefreshing = true;

                try {
                    const res = await axios.post(`${baseURL}${Endpoint.Auth.RefreshToken}`, {
                        refreshToken: token.refreshToken,
                    });

                    const { accessToken, refreshToken } = res.data;
                    setToken(accessToken, refreshToken);
                    processQueue(null, accessToken);

                    originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                    return axiosInstance(originalRequest);
                } catch (refreshError) {
                    processQueue(refreshError, null);
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

            return new Promise((resolve, reject) => {
                failedQueue.push({
                    resolve: (newToken: string) => {
                        originalRequest.headers.Authorization = `Bearer ${newToken}`;
                        resolve(axiosInstance(originalRequest));
                    },
                    reject: (err: any) => {
                        reject(err);
                    },
                });
            });
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
