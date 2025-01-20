
export const clearToken = () => {
    localStorage.removeItem("token");
};

export const isTokenStoraged = () => {
    return !!localStorage.getItem("token");
};

export const getTokenStoraged = () => {
    return localStorage.getItem("token");
};

export const saveToken = (name: string, token: string) => {
    localStorage.setItem(name, token);
};


export const getStorage = (data: string) => {
    return localStorage.getItem(data);
};

export const setStorage = (key: string, value: string) => {
    return localStorage.setItem(key, value);
};
