import albumDetailTypes from "../_types/albumDetailTypes";

const albumDetailReducer = (state = {}, action) => {
    switch (action.type) {
        case albumDetailTypes.ALBUM_DETAIL_REQUEST:
            return {
                loading: true,
                data: null,
                error: false
            };
        case albumDetailTypes.ALBUM_DETAIL_SUCCESS:
            return {
                data: action.data,
                loading: false,
                error: false
            };
        case albumDetailTypes.ALBUM_DETAIL_FAILURE:
            return {
                error: true,
                loading: false,
                data: null
            };
        default:
            return state
    }
};

export default albumDetailReducer;