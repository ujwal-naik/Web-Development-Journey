/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxSubarrayLength = function(nums, k) {
    const freq = new Map();
    let left = 0;
    let maxLength = 0;

    for (let right = 0; right < nums.length; right++) {
        const val = nums[right];
        freq.set(val, (freq.get(val) || 0) + 1);

        // Shrink window if frequency exceeds k
        while (freq.get(val) > k) {
            const leftVal = nums[left];
            freq.set(leftVal, freq.get(leftVal) - 1);
            left++;
        }

        maxLength = Math.max(maxLength, right - left + 1);
    }

    return maxLength;
};