/**
 * @param {number[]} nums
 * @return {number}
 */
var missingInteger = function(nums) {
    let sum = nums[0];
    
    // 1. Calculate sequential prefix sum
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] === nums[i - 1] + 1) {
            sum += nums[i];
        } else {
            break;
        }
    }
    
    // 2. Increment sum as long as it exists in nums
    while (nums.includes(sum)) {
        sum++;
    }
    
    return sum;
};