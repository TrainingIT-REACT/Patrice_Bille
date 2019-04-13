import playerTypes from "../_types/playerTypes";

const initialState = {
    playlist: []
};

const playerReducer = (state = initialState, action) => {
    if (action.type === playerTypes.PLAYER_SUCCESS) {
        return {
            playlist: action.playlist
        };
    }

    return state;
};

export default playerReducer;