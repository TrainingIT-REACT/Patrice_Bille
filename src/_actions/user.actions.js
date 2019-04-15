import { history } from "../_helpers";
import loginTypes from "../_types/loginTypes";
import userTypes from "../_types/userTypes";
import {userService} from "../_services/userService";
import { notifyActions } from './notify.actions';

/**
 * @param email
 * @param password
 * @returns {Function}
 */
const login = (email, password) => {
    const request = (user) => ({ type: loginTypes.LOGIN_REQUEST, user });
    const success = (user) => ({ type: loginTypes.LOGIN_SUCCESS, user });
    const failure = (error) => ({ type: loginTypes.LOGIN_FAILURE, error });

    return dispatch => {
        dispatch(request({ email }));

        userService.login(email, password)
            .then(user => {
                dispatch(success(user));
                history.push('/');
            }, error => {
                dispatch(failure(error));
                dispatch(notifyActions.error(error.message));
            });
    };
};

const logout = () => {
    userService.logout();

    return {
        type: loginTypes.USER_LOGOUT
    }
};

/**
 * @returns {Function}
 */
const getUser = () => {
    const request = () => ({ type: userTypes.FETCH_USER_REQUEST });
    const success = (user) => ({ type: userTypes.FETCH_USER_SUCCESS, user });
    const failure = (error) => ({ type: userTypes.FETCH_USER_FAILURE, error });

    return dispatch => {
        dispatch(request());

        userService.getUser()
            .then(user => {
                dispatch(success(user));
            }, error => dispatch(failure(error.message)));
    };
};

export const userActions = {
    login,
    getUser,
    logout,
};