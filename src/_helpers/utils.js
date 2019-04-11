/**
 * @param a
 * @returns {*}
 */
export const arrayShuffle = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }

    return a;
};

/**
 * @param second
 * @returns {string}
 */
export const formatSecondsTime = (second) => {
    return (second - (second%=60))/60 + (9<second ? ':' : ':0') + second;
};