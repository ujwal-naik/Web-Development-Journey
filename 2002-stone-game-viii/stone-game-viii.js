/**
 * @param {number[]} stones
 * @return {number}
 */
var stoneGameVIII = function(stones) {
    const n = stones.length;
    
    // Compute prefix sums in-place
    for (let i = 1; i < n; i++) {
        stones[i] += stones[i - 1];
    }
    
    // Base case: at the last index, the player must take the full sum
    let maxDiff = stones[n - 1];
    
    // Iterate backwards from the second-to-last stone down to index 1
    for (let i = n - 2; i >= 1; i--) {
        maxDiff = Math.max(maxDiff, stones[i] - maxDiff);
    }
    
    return maxDiff;
};