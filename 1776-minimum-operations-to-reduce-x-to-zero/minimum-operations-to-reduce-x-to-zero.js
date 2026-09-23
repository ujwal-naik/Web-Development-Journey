/**
 * @param {number[]} nums
 * @param {number} x
 * @return {number}
 */
var minOperations = function(nums, x) {
    let totalSum = 0;
    for (let num of nums) {
        totalSum += num;
    }
    
    let target = totalSum - x;
    if (target < 0) return -1;
    if (target === 0) return nums.length;
    
    let left = 0;
    let currentSum = 0;
    let maxLength = -1;
    
    for (let right = 0; right < nums.length; right++) {
        currentSum += nums[right];
        
        while (currentSum > target) {
            currentSum -= nums[left];
            left++;
        }
        
        if (currentSum === target) {
            maxLength = Math.max(maxLength, right - left + 1);
        }
    }
    
    return maxLength === -1 ? -1 : nums.length - maxLength;
};