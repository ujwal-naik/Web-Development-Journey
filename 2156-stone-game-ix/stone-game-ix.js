/**
 * @param {number[]} stones
 * @return {boolean}
 */
var stoneGameIX = function(stones) {
    const count = [0, 0, 0];
    for (const x of stones) {
        count[x % 3]++;
    }

    const [c0, c1, c2] = count;

    if (c0 % 2 === 0) {
        return c1 >= 1 && c2 >= 1;
    }

    return Math.abs(c1 - c2) > 2;
};