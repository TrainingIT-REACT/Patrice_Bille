import recommendationsTypes from "../_types/recommendationsTypes";

const initialState = {
    data: []
};

const recommendationReducer = (state = initialState, action) => {
    switch (action.type) {
        case recommendationsTypes.RECOMMENDATIONS_REQUEST:
            return {
                data: [],
                loading: true
            };
        case recommendationsTypes.RECOMMENDATIONS_SUCCESS:
            return {
                loading: false,
                data: [
                    ...state.data,
                    ...action.data
                ]
            };
        case recommendationsTypes.RECOMMENDATIONS_FAILURE:
            return {
                data: [],
                loading: false,
                error: true
            };
        default:
            return state
    }
};

export default recommendationReducer;