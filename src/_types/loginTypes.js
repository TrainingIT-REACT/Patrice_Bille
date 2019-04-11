const actions = [
    'LOGIN_REQUEST',
    'LOGIN_SUCCESS',
    'LOGIN_FAILURE',
    'USER_LOGOUT',
];

/**
 * @type {{LOGIN_REQUEST:*, LOGIN_SUCCESS:*, LOGIN_FAILURE:*, USER_LOGOUT:*}}
 */
const loginTypes = {};
actions.forEach(action => loginTypes[action] = action);

export default loginTypes;