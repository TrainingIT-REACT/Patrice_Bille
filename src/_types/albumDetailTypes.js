const actions = [
    'ALBUM_DETAIL_REQUEST',
    'ALBUM_DETAIL_SUCCESS',
    'ALBUM_DETAIL_FAILURE'
];

/**
 * @type {{ALBUM_DETAIL_REQUEST:*, ALBUM_DETAIL_SUCCESS:*, ALBUM_DETAIL_FAILURE:*}}
 */
const albumDetailTypes = {};
actions.forEach(action => albumDetailTypes[action] = action);

export default albumDetailTypes;