/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var resultArray = function(nums, k) {
    const ans = new Array(k).fill(0);
    // dp[r] stores the number of subarrays ending at the previous index
    // with product % k == r
    let dp = new Array(k).fill(0);

    for (const num of nums) {
        const val = num % k;
        const nextDp = new Array(k).fill(0);

        // Subarray containing only the current element
        nextDp[val] += 1;

        // Extend previous subarrays by the current element
        for (let r = 0; r < k; r++) {
            if (dp[r] > 0) {
                const newRem = (r * val) % k;
                nextDp[newRem] += dp[r];
            }
        }

        // Accumulate into the total counts
        for (let r = 0; r < k; r++) {
            ans[r] += nextDp[r];
        }

        dp = nextDp;
    }

    return ans;
};