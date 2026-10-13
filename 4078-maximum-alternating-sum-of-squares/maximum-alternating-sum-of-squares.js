/**
 * @param {number[]} nums
 * @return {number}
 */
var maxAlternatingSum = function(nums) {
    // Square each element and take absolute value (though squaring makes it non-negative anyway)
    const squared = nums.map(x => BigInt(x) * BigInt(x));
    
    // Sort in ascending order
    squared.sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
    
    let n = squared.length;
    let score = 0n;
    
    // The first half (smaller elements) are subtracted, the second half (larger elements) are added
    const half = Math.floor(n / 2);
    for (let i = 0; i < half; i++) {
        score -= squared[i];
    }
    for (let i = half; i < n; i++) {
        score += squared[i];
    }
    
    return Number(score);
};