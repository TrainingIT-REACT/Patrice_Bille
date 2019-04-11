import albumsTypes from "../_types/albumsTypes";

const initialState = {
    data: []
};

/**
 * @param prevData
 * @param data
 * @param loading
 * @param error
 * @returns {{data: ...*[], loading: boolean, error: boolean}}
 */
const mapReducerResponse = (prevData, data, loading = true, error = false) => {
    return {
        data: data,
        loading,
        error
    }
};

const bestAlbumsReducer = (state = initialState, action) => {
    switch (action.type) {
        case albumsTypes.FETCH_ALBUM_REQUEST:
            return mapReducerResponse(state.data, []);
        case albumsTypes.FETCH_ALBUM_SUCCESS:
            return mapReducerResponse(state.data, action.data, false);
        case albumsTypes.FETCH_ALBUM_FAILURE:
            return mapReducerResponse(state.data, [], false, true);
        default:
            return state
    }
};

export default bestAlbumsReducer;