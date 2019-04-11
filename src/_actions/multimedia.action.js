import albumsTypes from "../_types/albumsTypes";
import albumDetailTypes from "../_types/albumDetailTypes";
import {multimediaService} from "../_services/multimediaService";
import {notifyActions} from "./notify.actions";
import recommendationsTypes from "../_types/recommendationsTypes";
import {arrayShuffle} from "../_helpers";

/**
 * @param page
 * @param shuffle
 * @returns {Function}
 */
const listAlbums = (page = 1, shuffle = false) => {
    const requestAction = () => ({ type: albumsTypes.FETCH_ALBUM_REQUEST });
    const successAction = (data) => ({ type: albumsTypes.FETCH_ALBUM_SUCCESS, data });
    const failureAction = (error) => ({ type: albumsTypes.FETCH_ALBUM_FAILURE, error });

    return dispatch => {
        dispatch( requestAction() );

        multimediaService.listAlbums(page)
            .then(data => {
                data = !Array.isArray(data) ? [] : data;

                if (true === shuffle && data.length > 1) {
                    data = arrayShuffle(data);
                    data = data.slice(0, 6);
                }

                dispatch( successAction(data) );
            }, error => {
                dispatch(failureAction(error));
                dispatch(notifyActions.error(error.message));
            });
    };
};

/**
 * @param id
 * @returns {Function}
 */
const albumDetail = (id) => {
    const requestAction = () => ({ type: albumDetailTypes.ALBUM_DETAIL_REQUEST });
    const successAction = (data) => ({ type: albumDetailTypes.ALBUM_DETAIL_SUCCESS, data });
    const failureAction = (error) => ({ type: albumDetailTypes.ALBUM_DETAIL_FAILURE, error });

    return dispatch => {
        dispatch (requestAction());

        multimediaService.albumDetail(id)
            .then((data) => {
                dispatch( successAction(data) );
            }, error => {
                dispatch(failureAction(error));
                dispatch(notifyActions.error(error.message));
            });
    };
};

/**
 * @returns {Function}
 */
const listBestAlbums = () => {
    return listAlbums(1, true);
};

const listRecommendations = () => {
    const requestAction = () => ({ type: recommendationsTypes.RECOMMENDATIONS_REQUEST });
    const successAction = (data) => ({ type: recommendationsTypes.RECOMMENDATIONS_SUCCESS, data });
    const failureAction = (error) => ({ type: recommendationsTypes.RECOMMENDATIONS_FAILURE, error });

    return dispatch => {
        dispatch( requestAction() );

        multimediaService.mostVotedSongs()
            .then(async (data) => {
                data = !Array.isArray(data) ? [] : data;

                if (data.length > 0) {
                    try {
                        const listAlbums = data.map(item => multimediaService.albumDetail(item.song.albumId, false));
                        const result = await Promise.all(listAlbums);

                        data = data.map((item, index) => {
                            return {
                                ...item,
                                album: result[index]
                            };
                        });

                    } catch (e) {
                        dispatch(failureAction(e));
                        dispatch(notifyActions.error(e.message));
                    }
                }

                dispatch( successAction(data) );
            }, error => {
                dispatch(failureAction(error));
                dispatch(notifyActions.error(error.message));
            });
    };
};

/**
 *
 * @type {{listAlbums: (function(*=, *=): Function), listRecommendations: (function(): Function), albumDetail: (function(*): Function), listBestAlbums: (function(): Function)}}
 */
export const multimediaAction = {
    listAlbums,
    listBestAlbums,
    albumDetail,
    listRecommendations,
};