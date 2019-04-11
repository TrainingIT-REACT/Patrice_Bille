import albumsTypes from "../_types/albumsTypes";

const initialState = {
    data: []
};

const albumsReducer = (state = initialState, action) => {
    switch (action.type) {
        case albumsTypes.FETCH_ALBUM_REQUEST:
            return { loading: true };
        case albumsTypes.FETCH_ALBUM_SUCCESS:
            return {
                data: action.data,
                loading: false
            };
        case albumsTypes.FETCH_ALBUM_FAILURE:
            return {
                error: true,
                loading: false
            };
        default:
            return state
    }
};

export default albumsReducer;