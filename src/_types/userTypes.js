const actions = [
    'FETCH_USER_REQUEST',
    'FETCH_USER_SUCCESS',
    'FETCH_USER_FAILURE'
];

/**
 * @type {{FETCH_USER_REQUEST:*, FETCH_USER_SUCCESS:*, FETCH_USER_FAILURE:*}}
 */
const userTypes = {};
actions.forEach(action => userTypes[action] = action);

export default userTypes;