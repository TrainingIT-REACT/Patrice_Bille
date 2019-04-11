const actions = [
    'FETCH_ALBUM_REQUEST',
    'FETCH_ALBUM_SUCCESS',
    'FETCH_ALBUM_FAILURE'
];

/**
 * @type {{FETCH_ALBUM_REQUEST:*, FETCH_ALBUM_SUCCESS:*, FETCH_ALBUM_FAILURE:*}}
 */
const albumsTypes = {};
actions.forEach(action => albumsTypes[action] = action);

export default albumsTypes;