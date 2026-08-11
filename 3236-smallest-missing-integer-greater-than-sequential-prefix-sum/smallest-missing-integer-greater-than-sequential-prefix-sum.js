/**
 * @param {number[]} nums
 * @return {number}
 */
var missingInteger = function(nums) {
    let sum = nums[0];
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] === nums[i - 1] + 1) {
            sum += nums[i];
        } else {
            break;
        }
    }
    
    // 2. Put all numbers in a Set for O(1) lookup speed
    const numSet = new Set(nums);
    
    // 3. Find the smallest integer >= sum that is missing from nums
    while (numSet.has(sum)) {
        sum++;
    }
    
    return sum;
};