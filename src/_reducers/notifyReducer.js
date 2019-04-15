import { notifyConstants } from '../_constants/notify.constants';

const notifyReducer = (state = {}, action) => {
    switch (action.type) {
        case notifyConstants.SUCCESS:
            return {
                type: 'alert-success',
                message: action.message
            };
        case notifyConstants.ERROR:
            return {
                type: 'alert-danger',
                message: action.message
            };
        case notifyConstants.CLEAR:
            return {};
        default:
            return state
    }
};

export default notifyReducer;