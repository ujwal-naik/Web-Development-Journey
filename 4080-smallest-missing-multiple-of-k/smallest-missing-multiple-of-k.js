/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var missingMultiple = function(nums, k) {
    
    let max = 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] > max) max = nums[i];
    }

    
    const seen = new Uint8Array(max + 1);
    for (let i = 0; i < nums.length; i++) {
        seen[nums[i]] = 1;
    }

    let multiple = k;
    while (multiple <= max && seen[multiple]) {
        multiple += k;
    }

    return multiple;
};