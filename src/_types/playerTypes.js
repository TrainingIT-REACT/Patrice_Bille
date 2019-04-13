const actions = [
    'PLAYER_SUCCESS',
];

/**
 * @type {{PLAYER_SUCCESS:*}}
 */
const playerTypes = {};
actions.forEach(action => playerTypes[action] = action);

export default playerTypes;