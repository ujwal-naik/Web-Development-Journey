/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var firstStableIndex = function(nums, k) {
    const n = nums.length;
    const suffMin = new Array(n);
    
    // Step 1: Precompute suffix minimums
    suffMin[n - 1] = nums[n - 1];
    for (let i = n - 2; i >= 0; i--) {
        suffMin[i] = Math.min(nums[i], suffMin[i + 1]);
    }
    
    // Step 2: Traverse from left to right tracking running prefix maximum
    let prefMax = -Infinity;
    for (let i = 0; i < n; i++) {
        prefMax = Math.max(prefMax, nums[i]);
        if (prefMax - suffMin[i] <= k) {
            return i;
        }
    }
    
    return -1;
};