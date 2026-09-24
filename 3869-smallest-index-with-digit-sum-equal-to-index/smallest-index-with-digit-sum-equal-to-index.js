/**
 * @param {number[]} nums
 * @return {number}
 */
var smallestIndex = function(nums) {
    for (let i = 0; i < nums.length; i++) {
        // Calculate the sum of digits of nums[i]
        const digitSum = String(nums[i])
            .split('')
            .reduce((sum, char) => sum + Number(char), 0);
        
        // Check if the digit sum equals the current index
        if (digitSum === i) {
            return i;
        }
    }
    
    return -1;
};