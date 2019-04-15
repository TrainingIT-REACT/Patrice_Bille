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

/**
 * @param arr
 * @param comp
 * @returns {*[]}
 */
export const getUniqueItems = (arr, comp) => {
    return arr
        .map(e => e[comp])
        .map((e, i, final) => final.indexOf(e) === i && i)
        .filter(e => arr[e]).map(e => arr[e]);

};