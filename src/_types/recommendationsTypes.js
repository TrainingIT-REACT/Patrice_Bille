const actions = [
    'RECOMMENDATIONS_REQUEST',
    'RECOMMENDATIONS_SUCCESS',
    'RECOMMENDATIONS_FAILURE'
];

/**
 * @type {{RECOMMENDATIONS_REQUEST:*, RECOMMENDATIONS_SUCCESS:*, RECOMMENDATIONS_FAILURE:*}}
 */
const recommendationsTypes = Object.assign({});
actions.forEach(action => recommendationsTypes[action] = action);

export default recommendationsTypes;