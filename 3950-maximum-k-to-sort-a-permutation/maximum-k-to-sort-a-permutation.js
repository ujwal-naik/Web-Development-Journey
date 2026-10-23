/**
 * @param {number[]} nums
 * @return {number}
 */
var sortPermutation = function(nums) {
    let k = -1;
    
    for (let i = 0; i < nums.length; i++) {
        // Check if the element is not in its correct position
        if (nums[i] !== i) {
            if (k === -1) {
                k = nums[i];
            } else {
                k &= nums[i];
            }
        }
    }
    
    // If all elements are already in their correct positions, return 0
    return k === -1 ? 0 : k;
};