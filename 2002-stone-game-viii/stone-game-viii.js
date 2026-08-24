/**
 * @param {number[]} stones
 * @return {number}
 */
var stoneGameVIII = function(stones) {
    const n = stones.length;

    
    for (let i = 1; i < n; ++i) {
        stones[i] += stones[i - 1];
    }

    let maxDiff = stones[n - 1];

    
    for (let i = n - 2; i > 0; --i) {
        const takeScore = stones[i] - maxDiff;
        if (takeScore > maxDiff) {
            maxDiff = takeScore;
        }
    }

    return maxDiff;
};