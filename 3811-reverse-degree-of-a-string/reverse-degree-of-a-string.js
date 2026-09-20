/**
 * @param {string} s
 * @return {number}
 */
var reverseDegree = function(s) {
    let total = 0;

    for (let i = 0; i < s.length; i++) {
        // 'z'.charCodeAt(0) is 122.
        // For 'a' (97): 122 - 97 + 1 = 26
        // For 'z' (122): 122 - 122 + 1 = 1
        const reverseAlphaPos = 123 - s.charCodeAt(i);
        const strPos = i + 1; // 1-indexed position

        total += reverseAlphaPos * strPos;
    }

    return total;
};