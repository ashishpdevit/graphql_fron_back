export const getToken = () => {
    return localStorage.getItem('token');
};

export const setToken = (token) => {
    localStorage.setItem('token', token);
};

export const setUserName = (data) => {
    localStorage.setItem('username', data?.username?.charAt(0).toUpperCase() +
        data?.username?.slice(1));

};

export const getUserName = () => {
    return localStorage.getItem('username');
};

export const removeToken = () => {
    localStorage.removeItem('token');
};

export const isAuthenticated = () => {
    const token = getToken(); // Assume getToken retrieves token from local storage
    return !!token;
};
