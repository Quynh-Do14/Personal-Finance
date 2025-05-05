// src/utils/axiosInstance.ts
import axios from 'axios';
import Cookies from 'js-cookie';
import { notification } from 'antd';
import { Endpoint } from '../common/apiLink';
import { ROUTE_PATH } from '../common/appRouter';

const baseURL = process.env.REACT_APP_BASE_URL;

const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
    timeout: 15000,
    withCredentials: true,
});

// Utils token
const getToken = () => {
    const token = Cookies.get('token');
    return token ? JSON.parse(token) : null;
};

const removeToken = () => {
    Cookies.remove('token');
};

// Interceptor request
axiosInstance.interceptors.request.use((config) => {
    const token = getToken();
    if (token?.accessToken && config.headers) {
        config.headers.Authorization = `Bearer ${token.accessToken}`;
    }
    return config;
});

// Interceptor response
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        const status = error.response?.status;

        // Nếu 401 (hết hạn token) -> tự động đăng xuất
        if (status === 401 && !originalRequest._retry) {
            removeToken();
            notification.error({
                message: 'Thông báo',
                description: 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.',
            });
            window.location.href = ROUTE_PATH.LOGIN;
            return Promise.reject(error);
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
