import { notifyConstants } from '../_constants/notify.constants';

const success = (message) => {
    return {
        type: notifyConstants.SUCCESS, message
    };
};

const error = (message) => {
    return {
        type: notifyConstants.ERROR, message
    };
};

const clear = () => {
    return {
        type: notifyConstants.CLEAR
    };
};

/**
 *
 * @type {{success: (function(*): {type: string, message: *}), clear: (function(): {type: string}), error: (function(*): {type: string, message: *})}}
 */
export const notifyActions = {
    success,
    error,
    clear
};