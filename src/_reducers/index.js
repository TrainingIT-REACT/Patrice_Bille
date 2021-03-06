import { combineReducers } from 'redux';
import loginReducer from "./loginReducer";
import userReducer from "./userReducer";
import notifyReducer from "./notifyReducer";
import recommendationReducer from "./recommendationReducer";
import albumsReducer from "./albumsReducer";
import bestAlbumsReducer from "./bestAlbumsReducer";
import albumDetailReducer from "./albumDetailReducer";
import playerReducer from "./playerReducer";

const rootReducer = combineReducers({
    loginReducer,
    userReducer,
    notifyReducer,
    recommendationReducer,
    albumsReducer,
    bestAlbumsReducer,
    albumDetailReducer,
    playerReducer
});

export default rootReducer;