import userTypes from "../_types/userTypes";

const userReducer = (state = {}, action) => {
    switch (action.type) {
        case userTypes.FETCH_USER_REQUEST:
            return {
                loading: true
            };
        case userTypes.FETCH_USER_SUCCESS:
            return {
                user: action.users
            };
        case userTypes.FETCH_USER_FAILURE:
            return {
                error: action.error
            };
        default:
            return state
    }
};

export default userReducer;