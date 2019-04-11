export const USER_STORAGE_KEY = 'user';

/**
 * @param email
 * @param password
 * @returns {Promise<any>}
 */
const login = (email, password) => {
    return new Promise((resolve, reject) => {
        const _fakeCredentials = {
            email: "admin@admin.com",
            password: '12345678',
            token: `${_token()}.${_token()}`
        };

        if (email === _fakeCredentials.email && password === _fakeCredentials.password) {
            localStorage.setItem(USER_STORAGE_KEY, JSON.stringify({..._fakeCredentials, password: undefined}));

            return resolve(_fakeCredentials);
        }

        return reject({
            error: true,
            message: 'Bad credentials'
        });
    });
};

const logout = () => {
    localStorage.removeItem(USER_STORAGE_KEY);
};

/**
 * @returns {Promise<any>}
 */
const getUser = () => {
    return new Promise((resolve, reject) => {
        const userFromStorage = localStorage.getItem(USER_STORAGE_KEY);

        if (userFromStorage) {
            const data = JSON.parse(userFromStorage);
            return resolve(data);
        }

        return reject({
            error: true,
            message: 'User not found'
        });
    });
};

/**
 * @returns {string}
 * @private
 */
const _token = () => {
    return Math.random().toString(36).substr(2);
};

export const userService = {
    login,
    logout,
    getUser
};